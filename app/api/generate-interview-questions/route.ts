import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { QuestionSchema } from "@/lib/questionSchema";
import { z } from "zod";

const GenerateQuestionsRequestSchema = z.object({
    role: z.string().min(1, "Role is required"),
});

const createPrompt = (role: string) => `
You are an expert interviewer. Generate 5 random, high-quality interview questions
for a candidate applying for the role of: ${role}.

For each question, provide:
- The question itself
- The type of question
- The difficulty level (Easy, Medium, or Hard)
- A hint to guide the answer
- A sample answer

The questions should be realistic and relevant to what a hiring manager would ask for this role.
Generate the output in a JSON format adhering to the provided schema.
`;

const systemInstruction = `
You are a career advisor. Your task is to generate a list of 5 random interview questions
based on the provided job role.

Generate output strictly in valid JSON following the question schema.
Do not add any explanatory text or comments.
`;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { role } = GenerateQuestionsRequestSchema.parse(body);

        const { object: questions } = await generateObject({
            model: google("gemini-1.5-flash"),
            prompt: createPrompt(role),
            schema: z.array(QuestionSchema.omit({userAnswer: true})),
            system: systemInstruction,
        });

        return NextResponse.json({
            success: true,
            questions,
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
