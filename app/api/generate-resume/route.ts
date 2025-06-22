import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { ResumeSchema, type Resume } from "@/lib/schema";
import { z } from "zod";

// Input schema for the API request
const GenerateResumeRequestSchema = z.object({
    userProfile: ResumeSchema,
    jobDescription: z.string().min(1, "Job description is required"),
});

// Schema for section selection response
const SectionSelectionSchema = z.array(
    z.object({
        section: ResumeSchema.omit({
            basics: true,
            $schema: true,
            meta: true,
        }).keyof(),
        weight: z.number().int().gte(10).lte(50),
    }),
);

const pickSectionsTask = (jobDescription: string, userProfile: Resume) => `
## Scenario

I am applying for a job and need your help creating a tailored resume.
The resume should emphasize how my skills and experiences align with the job requirements.
Below, I've included both the job description and my professional profile.

## Job Description

${jobDescription}

## My Profile

My profile is encoded as a JSON object that conforms to the JSON Resume Schema (https://jsonresume.org/schema/):

${JSON.stringify(userProfile)}

## Your Task

I want my resume to be a "Greatest Hits" version of my professional background, not a full "Discography".

Identify the 3-4 most relevant top-level sections of my resume (excluding the 'basics' section). Your selection should be guided by:

- The specific job requirements
- The content of my profile
- Common resume conventions for the target industry or role

    For example:
    - A research scientist applying to an academic position would likely emphasize **publications**, **education**, and **projects**
    - A cybersecurity professional might prioritize **certifications**, **work experience**, and **selected projects**
    - A software engineer might focus on **work experience**, **skills**, and **projects**

Unless the relevant section is clearly empty or misaligned with the role, you may assume the following:

- **Work experience** is expected in most resumes, particularly for applicants with any professional background in the target field.
- **Education** is a common requirement or credential, and is typically included unless the applicant is highly experienced and the role places little emphasis on academic background.
- **Skills** are almost always expected, as they help recruiters quickly evaluate technical and domain-specific fit.

### What you need to deliver

Return your answer as an array of objects representing the sections you identified, each with:
- 'section': the top-level key from the JSON Resume Schema (excluding 'basics')
- 'weight': an integer between 10 and 50 representing an estimated percentage of a single-page resume that the section should occupy, based on its relevance and typical resume formatting.

The total of all weights must **not exceed 85**, as the top 15% of the page is reserved for the 'basics' section (name, contact info, headline, etc.).

Example:
\`[
    { "section": "skills", "weight": 10 }
    { "section": "work", "weight": 50 },
    { "section": "projects", "weight": 25 },
]\`

Sections like \`skills\`, \`certificates\`, \`languages\`, \`interests\`, and
\`volunteer\` are typically supporting sections and should rarely exceed 5-12%
individually. These sections are best used to complement more substantive
sections like \`work\`, \`projects\`, \`education\`, or \`publications\`.
`;

const pickSectionSystemPrompt = `
You are a professional career consultant specialized in crafting tailored,
concise resumes optimized to match specific job descriptions. Pick the most
relevant sections from the JSON Resume Schema based on the provided job
description and user profile. Your selections should prioritize sections that
showcase the candidate's fit for the role, while adhering to common resume
conventions.
`;

const createSectionTask = (
    section: keyof Omit<Resume, "basics" | "$schema" | "meta">,
    weight: number,
    jobDescription: string,
    userProfile: Resume,
) => `
## Scenario

I am applying for a job and need your help creating a tailored resume.
The resume should emphasize how my skills and experiences align with the job requirements.
Below, I've included both the job description and my professional profile.

## Job Description

${jobDescription}

## Original "${String(section)}" Data

This data comes from my professional profile, encoded using the JSON Resume
schema. It includes the raw value for the "${String(section)}" section of my
professional background. You should not use all of it, extract only the entries
and points that are most relevant to the job description and requirements.

${JSON.stringify(userProfile[section])}

## Your Task

Your goal is to generate a tailored version of the "${String(section)}" section for my
resume.

1. **Select the most relevant entries** from the original data, based on alignment with the job description and the relative importance of this section.  
   - This section is allocated approximately **${weight}% of a single-page letter-size resume**, so choose entries accordingly. If the entries
     do not fill ${weight}% of the page, do not fill the resulting object with newlines.
   - Prioritize quality over quantity — some entries may be omitted entirely.

2. **Extract the most compelling details** within each selected entry. Focus on achievements, outcomes, or responsibilities that strongly match the job requirements or keywords.

3. **Rephrase these details** using clear, professional, and concise language that matches standard resume conventions and tone for the target industry.
   - When possible, incorporate keywords from the job description when rephrasing the details.
   - Wherever possible, include quantifiable results or specific technologies, **only if the data supports it**. Do not fabricate or hallucinate specific details.

4. **Output a valid JSON object** conforming to the expected schema for this section (e.g., using \`highlights\` arrays for bullet points where applicable).
   - Do **not** include fields like \`"startDate"\` or \`"endDate"\` unless they were part of the original data.  
   - Omit any entry or fields within an entry that feel irrelevant, redundant, or too minor to contribute meaningfully.

Respond only with the resulting JSON object. Do not include any explanation or commentary.
`;

const createSectionSystemPrompt = (
    section: keyof Omit<Resume, "basics" | "$schema" | "meta">,
) => `
You are a professional career consultant specialized in crafting tailored,
concise resumes optimized to match specific job descriptions. Your tone should
be formal, clear, and focused on relevance and impact.

Generate output strictly in valid JSON following the JSON Resume schema.
Include only fields that are **relevant** and strengthen the candidate's fit
for the job. *Omit fields that do not add clear value.*

Use ISO 8601 date formats: YYYY-MM-DD, or YYYY-MM if day unknown, or
YYYY if month unknown. If a date is "present" or missing, omit that field.
Format all text fields using professional resume conventions
(e.g., capitalize job titles and proper nouns).

The resume must fit on a single letter-size page. Prioritize impactful
achievements, relevant skills, and keywords from the job description. Use
concise phrasing and bullet points where appropriate.

- Keep the output **brief and focused** — **4 entries maximum**, unless a higher limit is explicitly stated.
- Within each entry:
  - **Avoid excessive lists** (e.g., limit \`keywords\` or \`skills\` to no more than **5 items**).
  - **Limit \`highlights\` to 2-6 bullet points**, each written concisely (ideally < 200 characters).
- If a section tends to be brief (e.g., skills, certifications, awards, interests), **keep the total output under ~1,500 characters**.
- **Do not generate exhaustive or repetitive lists**. Focus only on standout and job-relevant content.
- If a section has too many entries, **prioritize quality and relevance** over quantity.

If uncertain about the relevance or accuracy of any data field, exclude it
rather than guessing. Avoid fabricating or hallucinating details.

Respond only with the JSON object adhering to the schema.
Do not add any explanatory text or comments.
`;

export async function POST(request: NextRequest) {
    try {
        // Parse and validate the request body
        const body = await request.json();
        const { userProfile, jobDescription } =
            GenerateResumeRequestSchema.parse(body);

        // Step 1: Determine which sections to include
        const sectionsResult = await generateObject({
            model: google("gemini-2.5-flash"),
            prompt: pickSectionsTask(jobDescription, userProfile),
            providerOptions: {
                google: {
                    thinkingConfig: {
                        thinkingBudget: 0, // Disables thinking
                    },
                } satisfies GoogleGenerativeAIProviderOptions,
            },
            schema: SectionSelectionSchema,
            system: pickSectionSystemPrompt,
        });

        // Step 2: Generate the resume
        const resume: Resume = {};
        resume.basics = userProfile.basics;

        // Generate each selected section
        for (const { section, weight } of sectionsResult.object) {
            try {
                const sectionTask = createSectionTask(
                    section,
                    weight,
                    jobDescription,
                    userProfile,
                );
                const sectionSystemPrompt = createSectionSystemPrompt(section);

                const sectionResult = await generateObject({
                    model: google("gemini-2.5-flash"),
                    prompt: sectionTask,
                    maxTokens: 600,
                    providerOptions: {
                        google: {
                            thinkingConfig: {
                                thinkingBudget: 0, // Disables thinking
                            },
                        } satisfies GoogleGenerativeAIProviderOptions,
                    },
                    schema: ResumeSchema.shape[section] as z.ZodTypeAny,
                    system: sectionSystemPrompt,
                });

                resume[section] = sectionResult.object;
            } catch (err) {
                console.error(
                    `Error generating section "${String(section)}":`,
                    err,
                );
                // Continue with other sections even if one fails
            }
        }

        // Return the generated resume
        return NextResponse.json({
            success: true,
            resume,
            sections: sectionsResult.object,
        });
    } catch (error) {
        console.error("Error generating resume:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid request data",
                    details: error.errors,
                },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { success: false, error: "Failed to generate resume" },
            { status: 500 },
        );
    }
}
