import { z } from "zod";

export const RoadmapSchema = z.object({
    currentRole: z.string().optional(),
    experience: z.string().optional(),
    careerGoal: z.string().optional(),
    timeline: z.string().optional(),
    jobDescription: z.string().optional(),
});

export type Roadmap = z.infer<typeof RoadmapSchema>;
