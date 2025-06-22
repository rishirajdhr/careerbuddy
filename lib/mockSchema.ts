import {z} from "zod";

export const ImprovementsSchema = z.array(z.object({
  questionNum: z.number(),
  answerImprovement: z.string(),
}))