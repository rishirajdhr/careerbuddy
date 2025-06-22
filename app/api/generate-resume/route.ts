import { NextRequest, NextResponse } from "next/server";
import { generateObject, generateText } from "ai";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { ResumeSchema, type Resume } from "@/lib/schema";
import { z } from "zod";
import { prompts } from "./prompts";

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

// Schema for job information extraction response
const JobInfoSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Job role is required"),
});

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

const extractSkillsPrompt = `
Analyze the user profile and the job description. Identify every skill keyword that is present in BOTH documents.

Your entire output must be a single line of text containing these keywords, separated by commas. Do not add any other text, labels, or formatting.

Do not identify more than 20 skills.

Example output:
Python,JavaScript,React,Node.js,AWS,S3,EC2,Docker,Kubernetes,Terraform,PostgreSQL
`.trim();

const createFormatSkillsPrompt = (skills: string) =>
    `
You are a JSON formatting expert. Given the following comma-separated list of approved skill keywords, your task is to group them into logical categories and format them as a JSON array of objects.

APPROVED KEYWORDS: "${skills}"

Follow these rules STRICTLY:
1.  **Use ONLY Approved Keywords:** You MUST NOT use any keyword that is not in the list above.
2.  **Structure:** The output MUST be a JSON array of objects. Each object MUST have a "name" and a "keywords" array.
3.  **Limits:** Create a maximum of 4-5 logical categories.

Your entire response must be ONLY the final JSON object. Do not use newlines for formatting the JSON Object.
`.trim();

const createSectionTask = (
    section: keyof Omit<Resume, "basics" | "$schema" | "meta" | "skills">,
    jobDescription: string,
    userProfile: Resume,
) => `
## Job Description

${jobDescription}

## Profile

Raw value for the "${section}" section of the user's profile adhering to the
JSON Resume schema:

${JSON.stringify(userProfile[section])}

## Your Task

Your goal is to generate a tailored version of the "${section}" section for the
user's resume, adhering to the JSON Resume schema.

${prompts[section]}
`;

const sectionSystemPrompt = `
You are an expert resume-crafting AI. Your purpose is to distill a user's comprehensive profile into a single, concise, high-impact resume section tailored to a specific Job Description.

Your sole function is to generate a single, valid JSON object for one section of a resume. Every piece of data selected and every word written MUST be justified by its relevance to the provided Job Description and its potential impact on a hiring manager.

### Core Directives & Constraints

**1. Output Format (Non-negotiable):**
- **Strict JSON Only:** Respond ONLY with the raw JSON object. Do not include markdown, comments, or any explanatory text.
- **Schema Adherence:** Strictly adhere to the JSON Resume schema for the given section.
- **Date Formatting:** Use ISO 8601 format (YYYY-MM-DD, YYYY-MM, or YYYY). If an end date is "Present" or ongoing, omit the \`endDate\` field entirely.
- **No Fabrication:** NEVER fabricate or hallucinate information. If a piece of data is missing from the user profile or its relevance to the job is unclear, OMIT it.

**2. Content & Style Principles:**
- **Job Description is Truth:** The Job Description is your single source of truth for relevance. Prioritize skills, experiences, and keywords that directly map to it.
- **Quantify Everything:** Write all \`highlights\` to demonstrate measurable impact. Use metrics (%, $, time saved, units delivered, scale of project) to quantify achievements.
- **Action-Verb Driven:** Begin every \`highlight\` bullet point with a strong, past-tense action verb (e.g., "Architected," "Optimized," "Led," "Accelerated").
- **Professional & Telegraphic:** Write in a concise, professional tone. Omit all personal pronouns (I, my, we). Capitalize job titles and proper nouns.

**3. Brevity and Focus (The "One-Page Rule"):**
To ensure the final resume is scannable and fits on a single page, enforce these strict limits for the section you are generating:
- **Entry Limit:** Limit the root array to a maximum of **4 entries** (e.g., 4 jobs, 4 projects), selecting only the most relevant.
- **Highlight Limit:** Limit \`highlights\` arrays to **2-5 bullet points**. Each must be a powerful, single-line statement.
- **Keyword/List Limit:** Limit \`keywords\`, \`courses\`, or other simple list arrays to a maximum of **5-7 items**, ordered by relevance to the job.
- **Prioritize Quality:** If the user's profile contains more data than these limits allow, your primary task is to filter down to the absolute best and most relevant content. Quality and relevance trump quantity.`;

export async function POST(request: NextRequest) {
    try {
        // Parse and validate the request body
        const body = await request.json();
        const { userProfile, jobDescription } =
            GenerateResumeRequestSchema.parse(body);

        // Step 1: Extract job information (company and role)
        const jobInfoResult = await generateObject({
            model: google("gemini-2.5-flash"),
            prompt: extractJobInfoTask(jobDescription),
            providerOptions: {
                google: {
                    thinkingConfig: {
                        thinkingBudget: 0, // Disables thinking
                    },
                } satisfies GoogleGenerativeAIProviderOptions,
            },
            schema: JobInfoSchema,
            system: extractJobInfoSystemPrompt,
        });

        // Step 2: Determine which sections to include
        const sectionsResult = await generateObject({
            model: google("gemini-2.0-flash"),
            prompt: pickSectionsTask(jobDescription, userProfile),
            // providerOptions: {
            //     google: {
            //         thinkingConfig: {
            //             thinkingBudget: 0, // Disables thinking
            //         },
            //     } satisfies GoogleGenerativeAIProviderOptions,
            // },
            schema: SectionSelectionSchema,
            system: pickSectionSystemPrompt,
        });

        // Step 2: Generate the resume
        const resume: Resume = { basics: userProfile.basics };

        // Generate each selected section
        for (const { section, weight } of sectionsResult.object) {
            try {
                if (section === "skills") {
                    const skillExtractionResult = await generateText({
                        model: google("gemini-2.0-flash"),
                        prompt: extractSkillsPrompt,
                        maxTokens: 2048,
                        system: sectionSystemPrompt,
                        temperature: 0.2,
                    });

                    const extractedSkills = skillExtractionResult.text;

                    const skillFormattingResult = await generateObject({
                        model: google("gemini-2.0-flash"),
                        prompt: createFormatSkillsPrompt(extractedSkills),
                        maxTokens: 2048,
                        schema: ResumeSchema.shape.skills,
                        system: sectionSystemPrompt,
                        temperature: 0.2,
                    });

                    resume.skills = skillFormattingResult.object;
                } else {
                    const sectionTask = createSectionTask(
                        section,
                        jobDescription,
                        userProfile,
                    );

                    const sectionResult = await generateObject({
                        model: google("gemini-2.0-flash"),
                        prompt: sectionTask,
                        maxTokens: 2048,
                        // providerOptions: {
                        //     google: {
                        //         thinkingConfig: {
                        //             thinkingBudget: 0, // Disables thinking
                        //         },
                        //     } satisfies GoogleGenerativeAIProviderOptions,
                        // },
                        schema: ResumeSchema.shape[section] as z.ZodTypeAny,
                        system: sectionSystemPrompt,
                        temperature: 0.2,
                    });

                    resume[section] = sectionResult.object;
                }
            } catch (err) {
                console.error(
                    `Error generating section "${String(section)}":`,
                    err,
                );
                // Continue with other sections even if one fails
            }
        }

        // Return the generated resume with job information
        return NextResponse.json({
            success: true,
            resume,
            company: jobInfoResult.object.company,
            role: jobInfoResult.object.role,
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
