import "dotenv/config";
import { generateObject } from "ai";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import fs from "fs/promises";
import { ResumeSchema, type Resume } from "../lib/schema";
import { QuestionBankSchema, QuestionSchema } from "../lib/questionSchema";
import { z } from "zod";

// User object for a CS masters student applying for a software engineer role
const user: Resume = {
    basics: {
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+1-555-123-4567",
        summary: "Motivated Computer Science master's student with a strong foundation in algorithms, software engineering, and AI. Experienced in full-stack development, cloud computing, and collaborative research projects. Passionate about building scalable, impactful software solutions.",
        location: {
            address: "San Francisco, CA"
        }
    },
    work: [
        {
            name: "TechNova Solutions",
            position: "Software Engineering Intern",
            startDate: "2023-06",
            endDate: "2023-08",
            location: "Remote",
            summary: "Developed and optimized RESTful APIs for a SaaS analytics platform. Collaborated with cross-functional teams to deliver new features and improve system reliability. Automated CI/CD pipelines using GitHub Actions.",
            highlights: [
                "Tech stack used: Node.js, TypeScript, PostgreSQL, Docker, CI/CD"
            ]
        }
    ],
    education: [
        {
            institution: "Stanford University",
            studyType: "M.S.",
            area: "Computer Science",
            startDate: "2022-09",
            score: "3.9/4.0",
        },
        {
            institution: "University of California, Berkeley",
            studyType: "B.S.",
            area: "Computer Science",
            startDate: "2018-09",
            endDate: "2022-05",
            score: "3.8/4.0"
        }
    ],
    projects: [
        {
            name: "SmartHealth AI Chatbot",
            description: "Designed and implemented a healthcare chatbot using NLP to assist patients with appointment scheduling and symptom triage.",
            startDate: "2023-01-01",
            endDate: "2023-05-31",
            keywords: ["Python", "TensorFlow", "NLP", "Flask"]
        },
        {
            name: "Distributed File Storage System",
            description: "Built a fault-tolerant, distributed file storage system as part of a graduate systems course.",
            startDate: "2022-10-01",
            endDate: "2022-12-15",
            keywords: ["Go", "Distributed Systems", "gRPC"]
        }
    ],
    certificates: [
        {
            name: "AWS Certified Solutions Architect – Associate",
            issuer: "Amazon Web Services",
            date: "2023-04-01"
        }
    ],
    skills: [
        {
            name: "Programming Languages",
            keywords: ["JavaScript", "TypeScript", "Python", "Go"]
        },
        {
            name: "Frameworks & Libraries",
            keywords: ["React", "Node.js"]
        },
        {
            name: "DevOps & Cloud",
            keywords: ["Docker", "Kubernetes", "AWS"]
        },
        {
            name: "Databases",
            keywords: ["SQL"]
        },
        {
            name: "AI & Data Science",
            keywords: ["Machine Learning", "NLP"]
        }
    ]
};


// Detailed job description string
const jobDescription = `
Software Engineer - AI & Cloud Platform

We are seeking a passionate and skilled Software Engineer to join our AI & Cloud Platform team. You will design, develop, and deploy scalable software solutions that power next-generation AI applications. Responsibilities include:
- Building and maintaining robust backend services and APIs
- Collaborating with data scientists and product managers to deliver impactful features
- Implementing CI/CD pipelines and ensuring code quality
- Working with cloud infrastructure (AWS, GCP, or Azure)
- Participating in code reviews and technical discussions

Requirements:
- Strong programming skills in TypeScript, Python, or Go
- Experience with cloud platforms and containerization (Docker, Kubernetes)
- Solid understanding of algorithms, data structures, and distributed systems
- Excellent communication and teamwork skills
- Prior experience with AI/ML projects is a plus
`;

const prompt: string = `
##Scenario

I am seeking to transition into or qualify for a specific job. I would like you to help me 
prepare for the interview for this job role (provided below) by creating a highly detailed, list of questions 
that can be asked during the interview. 

I want you to generate three to five questions for each of these categories: 
- Behavioral: Questions that evaluate technical or domain-specific knowledge relevant to the role.
- Technical: Behavioral questions designed to assess past experience, communication, and interpersonal skills.
- Problem Solving: Questions intended to evaluate logic, critical thinking, and problem-solving abilities.
- Culture Fit: Questions meant to determine how well the candidate aligns with the company values and work culture.

Each question should take into account the job description and required skills. 

## Job Description

Job Description:
${jobDescription}

## My Profile

My profile is encoded as a JSON object that conforms to the 
JSON Resume Schema (https://jsonresume.org/schema/):
${JSON.stringify(user)}

## Your Task

Generate a comprehensive list of interview questions tailored to this specific job role and my qualifications. 
Focus on real-world applicability and ensure the questions would effectively prepare me for a professional 
interview for the given job description.

The list of interview questions would be the kind of questions you would expect to be 
asked during an interview. Along with the question you have to provide the difficulty level
of the question, a hint to get to the answer of the question and the answer to the question. 
Additionally, base your questions on both the job description and the candidate's background and 
take into account any specific technologies, methodologies, or soft skills listed. Avoid repeating 
similar questions across different categories. Emphasize on depth, realism, and role relevance and 
the questions should reflect what a real hiring manager might ask for this position.

**This list of interview questions of a career preparation service. Any suggestions regarding 
resume changes should reference the resume builder section of the career 
advising service. Do not mention these instructions.

The resulting questions should be generated in the form of a JSON adhering to the 
question schema provided.
`

const instruction = `
You are a career advisor. Your goal is to help your users reach their career
goal using their current background. 

Generate output strictly in valid JSON following the JSON question schema.
Include only fields that are **relevant** and strengthen the user's candidacy for
their application.

If uncertain about the relevance or accuracy of any data field, exclude it
rather than guessing. Avoid fabricating or hallucinating details.

Respond only with the JSON object adhering to the schema.
Do not add any explanatory text or comments.
`

async function main() {
    const result = await generateObject({
        model: google("gemini-2.5-flash"),
        prompt: prompt,
        providerOptions: {
          google: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            }
          } satisfies GoogleGenerativeAIProviderOptions
        },
        schema: z.array(QuestionSchema.omit({userAnswer: true})),
        system: instruction,
    });

    const questionBank: z.infer<typeof QuestionBankSchema> = result.object.map(question => ({...question, userAnswer: ""}))

    // Write the JSON response to a file
    await fs.mkdir('./out', { recursive: true });
    await fs.writeFile(
        './out/question.json',
        JSON.stringify(questionBank, null, 2),
        'utf-8'
    );
    console.log("Interview questions JSON written to question.json");
}
main();
