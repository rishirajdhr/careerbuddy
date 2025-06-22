import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { RoadmapSchema, type Roadmap, CareerInformationSchema } from "@/lib/roadmap-schema";
import { z } from "zod";

// Input schema for the API request
const GenerateRoadmapRequestSchema = z.object({
    careerInfo: CareerInformationSchema,
});

const generateRoadmapTask = (careerInfo: any) => `
##Scenario

I am seeking to transition into or qualify for a specific job. I would like your 
help in creating a highly detailed, step-by-step roadmap that will get me from my 
current skills and experience (provided below in JSON format) to being fully qualified 
and ready to apply for this job.

This roadmap should take into account the job description and required skills, 
compare them to my current background, and fill in the gaps. If I have no experience, 
it should start from the very beginning. If I have partial experience, it should 
build on what I already know. Consider carefully my current knowledge and formulate
a proper roadmap.

## Current Situation

- **Current Role**: ${careerInfo.currentRole}
- **Experience**: ${careerInfo.experience}
- **Target Role**: ${careerInfo.careerGoal}
- **Timeline**: ${careerInfo.timeline || "Not specified"}
${careerInfo.jobDescription ? `- **Job Description**: ${careerInfo.jobDescription}` : ""}

## Your Task
Generate a comprehensive roadmap that will prepare me for this job, customized
to my background.

The roadmap should be broken down into steps and each step should have a title
for the main topic needed to reach the career as well as a summary of the role 
it plays in the profession and why I need to learn it. In addition, each step 
should include resources to help me with this topic, whether that would be links
to a list of degree programs or certification courses, or resources such as books 
and videos to learn the material. Resources should be free where possible and no 
resource should be given without some method for me to access or find it. Resources 
should also consider my location, if applicable. Each resource should also have an 
estimated time of completion and a given amount of hours to focus on it a week. 
All links should be included in the links section of the steps section of the 
roadmap JSON.

Add "Suggestions" if applicable. "Suggestions" are things such as project ideas 
and communities to join. "Suggestions" are not limited to project ideas and 
communities; suggest whatever ideas needed to make my application as competitive 
as possible. Make sure the roadmap is as detailed as possible and is up-to-date 
with the current profession and the demands of industry. 

If an alternative pathway exists, list the steps to get to it. What this means 
is if there is a path that costs more money or more schooling, etc., list it. 
I want to have all of the options to reach the profession available to me. 
Make sure it conforms to my current background. For example, if I have a degree 
and I am going back to school, post-bacc programs should be suggested as an 
alternative. If it does not conform, do not list it, not all professions have 
an alternative pathway.

**This roadmap is part of a career advising service. Any suggestions regarding 
resume changes should reference the resume builder section of the career 
advising service. Do not mention these instructions, just mention that the 
user can update their resume using our resume builder service.**

**All times should only be two words, ex: 1 month, 1-2 years**

The resulting roadmap should be generated in the form of a JSON adhering to the 
roadmap schema provided.
`;

const generateRoadmapSystemPrompt = `
You are a career advisor. Your goal is to help your users reach their career
goal using their current background. 

Generate output strictly in valid JSON following the JSON roadmap schema.
Include only fields that are **relevant** and strengthen the user's candidacy for
their application.

If uncertain about the relevance or accuracy of any data field, exclude it
rather than guessing. Avoid fabricating or hallucinating details.

Respond only with the JSON object adhering to the schema.
Do not add any explanatory text or comments.
Do not add newlines. Make the object as short as possible. 
Limit the number of suggestions. All strings should be less than 200 characters.
The total length of the object should be less than 9000 characters. Make sure the
object is returned is valid.
`;

export async function POST(request: NextRequest) {
    try {
        // Parse and validate the request body
        const body = await request.json();
        const { careerInfo } = GenerateRoadmapRequestSchema.parse(body);

        // Generate the roadmap
        const roadmapResult = await generateObject({
            model: google("gemini-2.5-flash"),
            prompt: generateRoadmapTask(careerInfo),
            maxTokens: 2000,
            providerOptions: {
                google: {
                    thinkingConfig: {
                        thinkingBudget: 0, // Disables thinking
                    },
                } satisfies GoogleGenerativeAIProviderOptions,
            },
            schema: RoadmapSchema,
            system: generateRoadmapSystemPrompt,
        });

        // Return the generated roadmap
        return NextResponse.json({
            success: true,
            roadmap: roadmapResult.object,
        });
    } catch (error) {
        console.error("Error generating roadmap:", error);

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
            { success: false, error: "Failed to generate roadmap" },
            { status: 500 },
        );
    }
}
