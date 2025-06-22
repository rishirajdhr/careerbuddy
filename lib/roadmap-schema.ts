import {z} from "zod";

const ResourceSchema = z.object({
  /** The name of the resource, e.g. the degree required or the name of the textbook */
  name: z.string().describe("The name of the resource e.g. the degree required or textbook name. Explain the resource as an action e.g. 'get a degree' and clarify what the resource is"),

  /** The role the resource plays in achieving the profession */
  purpose: z.string().describe("How this resource plays a role in regards to achieving the profession. Start with a verb"),

  /** Details regarding the resource */
  details: z.string().describe("Include any relevant details regarding this resource. Explain what the links to the resources are as well, if necessary").optional(),

  /** A link to the resource */
  links: z.array(z.string().describe("Must be a valid URL").optional()).optional(),

  /** The estimated time it will take to complete this resource */
  estimatedTime: z.string().describe("The estimated total time it will take to complete this resource. There should only be two words").optional(),
})

const StepSchema = z.object({

  /** The title of the step */
  title: z.string().describe("The title of this step. Optional steps should be listed as '(optional)'"),

  /** The purpose of the step */
  summary: z.string().describe("The summary of this step e.g. why it is necessary for the profession"),

  /** The estimated length of time it will take to complete the step */
  estimatedTime: z.string().describe("The estimated length of time it will take to complete this step. If a step varies in length, put a tilda followed by an estimate"),

  /** Resources for the current step */
  resources: z.array(ResourceSchema).optional().describe("The resources needed for this step"),

  /** Additional suggestions to take in the step to maximize the user's application */
  suggestions: z.array(z.string().describe("Extra suggestions such as project ideas or communities to join")).optional()
})

export const RoadmapSchema = z.object({

  /** A title for the roadmap */
  title: z.string().describe("The name of the roadmap"),

  /** A quick summary of the experience the user currently has */
  start: z.string().describe("A summary of where the user currently stands e.g. what experiences they have, etc. Speak in the second person perspective."),

  /** The profession the user wants to attain */
  goal: z.string().describe("A summary of the job description the user wants to become"),

  /** The total estimated length of time it would take for the user to attain their profession from their current background */
  estimatedTime: z.string().describe("The estimated length of time it will take to reach the goal from the starting position"),

  /** Smaller things to make note of regarding reaching the profession */
  considerations: z.array(z.string().describe("Important considerations including finances, location, stress and support systems. Example: Finances: Medical education is...")).optional(),
 
  /** The steps of the roadmap */
  steps: z.array(StepSchema).describe("Each of the steps required to reach the goal from the starting position"),

  /** Any alternative pathways to reach the profession */
  alternativePathway: z.array(StepSchema).describe("An alternative pathway to reach the profession").optional(),
})
