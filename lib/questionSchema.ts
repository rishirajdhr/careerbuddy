import {z} from "zod";

export const QuestionSchema = z.object({
    question: z.string().describe(""),
    sampleAnswer: z.string().describe("Example of a strong answer to the question"),
    userAnswer: z.string().describe("Answer entered by the user"),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("Indicates how challenging the question is easy, medium, or hard"),
    type: z.string().describe("The type of question"),
    hint: z.string().describe("A hint to answer the question")
});

export const QuestionBankSchema = z.array(QuestionSchema).describe("A list of interview questions, each with a prompt, sample answer, difficulty level and type of question")