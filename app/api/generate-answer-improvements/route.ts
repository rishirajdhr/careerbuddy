import { z } from "zod";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

// Define the schema for the request body
const MockInterviewRequestSchema = z.object({
  questionsAndAnswers: z.array(
    z.object({
      question: z.string(),
      answer: z.string().optional(),
    })
  ),
});

// Define the schema for the feedback response
const FeedbackSchema = z.object({
    feedback: z.string(),
    question: z.string(),
});

const FeedbackResponseSchema = z.object({
    feedback: z.array(FeedbackSchema)
})

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { questionsAndAnswers } = MockInterviewRequestSchema.parse(json);

    const prompt = `
    You are career advisor whose task is to conduct mock interviews and suggest
improvements to the interviewee's answers. Give suggestions for how to 
improve their answer and give other possible answers for the question.
Be sure to critique their answer. Be supportive and kind.

Start by summarizing their answer. Do not repeat the question or reference
the question number. Example: "Your answer is...".

Do not include newlines in your answer.

        I am preparing to apply for jobs and have been answering interview
questions. I want you to look at the answers to my questions and suggest
improvements to my answers.

The questions and my answers to the questions:
        ${questionsAndAnswers.map(qa => `
            Question: "${qa.question}"
            Answer: "${qa.answer || 'No answer provided.'}"
        `).join('')}
    `;

    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: FeedbackResponseSchema,
      prompt,
    });

    return new Response(JSON.stringify(object), {
        headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating feedback:", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof z.ZodError) {
        errorMessage = "Invalid request body.";
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });
  }
}
