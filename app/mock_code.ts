import "dotenv/config";
import { generateObject } from "ai"
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { ImprovementsSchema } from "@/lib/mockSchema"
import fs from "fs/promises";

const questionsAndAnswers = [
  {
    question: "Tell me a little about yourself",
    answer: `I have a background in computer science and recently completed a 
    software development internship where I worked on a React-based internal 
    dashboard for tracking performance metrics. Before that, I led several team 
    projects at university, including a full-stack web app for study groups. 
    Right now, I’m focused on deepening my skills in frontend technologies like 
    React and TypeScript, and I’m excited about this role because it gives me 
    the chance to contribute to real-world applications in a collaborative team 
    environment.`
  },
  {
    question: "Why are you interested in this role, and what makes you a strong fit for our company?",
    answer: "I am a big fan of the salary"
  },
  {
    question: "What’s the difference between a stack and a queue? Can you implement each using the other?",
    answer: "gfdsgfdsg"
  },
  {
    question: "Explain the difference between depth-first search and breadth-first search. When would you use each?",
    answer: "You use them to search for stuff"
  },
  {
    question: "How would you detect a cycle in a linked list?",
    answer: "I have no idea"
  },
]

const answerImprovements = `
## Scenario

I am preparing to apply for jobs and have been answering interview
questions. I want you to look at the answers to my questions and suggest
improvements to my answers.

The questions and my answers to the questions:
${JSON.stringify(questionsAndAnswers)}

Put your suggestions in the form of the schema provided.
`

const instruction = `
You are career advisor whose task is to conduct mock interviews and suggest
improvements to the interviewee's answers. Give suggestions for how to 
improve their answer and give other possible answers for the question.
Be sure to critique their answer. Be supportive and kind.

Start by summarizing their answer. Do not repeat the question or reference
the question number. Example: "Your answer is...".

Do not include newlines in your answer.
`

async function main() {
  const result = await generateObject({
        model: google("gemini-2.5-flash"),
        prompt: answerImprovements,
        providerOptions: {
          google: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            }
          } satisfies GoogleGenerativeAIProviderOptions
        },
        schema: ImprovementsSchema,
        system: instruction,
    });

    // Write the JSON response to a file
    await fs.writeFile(
        './improvements.json',
        JSON.stringify(result.object, null, 2),
        'utf-8'
    );
    console.log("Improvement JSON written to improvements.json");
}

main();