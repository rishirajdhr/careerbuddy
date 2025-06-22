import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { QuestionSchema } from "@/lib/questionSchema";
import { z } from "zod";

// Input schema for the API request - now only requires jobDescription
const GenerateQuestionsRequestSchema = z.object({
    jobDescription: z.string().min(1, "Job description is required"),
});

// The prompt now focuses only on the job description
const createPrompt = (jobDescription: string) => `
## Scenario

I am preparing for an interview for a specific job. I would like you to help me 
by creating a highly detailed list of questions that could be asked during the interview,
based on the job description provided below.

I want you to generate three to five questions for each of these categories: 
- Behavioral: Questions that evaluate technical or domain-specific knowledge.
- Technical: Questions that assess technical skills and experience.
- Problem Solving: Questions intended to evaluate logic and critical thinking.
- Culture Fit: Questions to determine how well a candidate aligns with company values.

Each question should be based directly on the provided job description.

## Job Description

${jobDescription}

## Your Task

Generate a comprehensive list of interview questions tailored to this specific job role. 
Focus on real-world applicability and ensure the questions would effectively prepare someone for a professional 
interview for the given job description.

For each question, provide:
- The question itself
- The difficulty level (Easy, Medium, or Hard)
- A hint to guide the answer
- A sample answer

Emphasize depth, realism, and role relevance. The questions should reflect what a real hiring
manager might ask for this position.

The resulting questions should be generated in the form of a JSON object adhering to the 
provided question schema.
`;

// System instruction updated to remove mention of user's background
const systemInstruction = `
You are a career advisor specializing in interview preparation. Your task is to generate
a list of high-quality interview questions based *only* on the provided job description.

Generate output strictly in valid JSON following the JSON question schema.
Do not add any explanatory text or comments.
`;

export async function POST(request: NextRequest) {
    try {
        // Parse and validate the request body for jobDescription only
        const body = await request.json();
        const { jobDescription } = GenerateQuestionsRequestSchema.parse(body);

        const result = await generateObject({
            model: google("gemini-2.5-flash"),
            prompt: createPrompt(jobDescription),
            providerOptions: {
              google: {
                thinkingConfig: {
                    thinkingBudget: 0, // Disables thinking
                }
              } satisfies GoogleGenerativeAIProviderOptions
            },
            schema: z.array(QuestionSchema.omit({userAnswer: true})),
            system: systemInstruction,
        });

        // Return the generated questions
        return NextResponse.json({
            success: true,
            questions: result.object,
        });

    } catch (error) {
        console.error("Error generating interview questions:", error);

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
            { success: false, error: "Failed to generate interview questions" },
            { status: 500 },
        );
    }
} 