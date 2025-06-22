import { Application } from "./types";

// Authentication helper function
export const getCurrentUser = (): { id: string; name: string; email: string } | null => {
    try {
        const user = localStorage.getItem("currentUser");
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};

// Interview question generation
export const generateInterviewQuestions = (application: Application) => {
    const { company, position, notes } = application;

    // Extract key technologies and skills from position title and notes
    const techKeywords = [
        "React",
        "Node.js",
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "AWS",
        "Docker",
        "Kubernetes",
        "SQL",
        "MongoDB",
        "GraphQL",
        "REST",
        "API",
        "microservices",
        "system design",
        "machine learning",
        "AI",
        "data",
        "frontend",
        "backend",
        "full stack",
    ];

    const positionLower = position.toLowerCase();
    const notesLower = notes.toLowerCase();
    const relevantTech = techKeywords.filter(
        (tech) => positionLower.includes(tech.toLowerCase()) || notesLower.includes(tech.toLowerCase()),
    );

    const questions = {
        [`${company} - ${position}`]: {
            "Company-Specific": [
                `What interests you most about working at ${company}?`,
                `How do you think your background aligns with ${company}'s mission?`,
                `What do you know about ${company}'s current projects and challenges?`,
            ],
            "Technical Skills": [
                `Can you walk me through a recent project where you used ${relevantTech[0] || 'your primary technology'}?`,
                `How do you approach debugging complex issues in production?`,
                `Describe a time when you had to learn a new technology quickly for a project.`,
            ],
            "System Design": [
                `How would you design a scalable system for ${company}'s scale?`,
                `What considerations would you have for data consistency and availability?`,
                `How would you handle high traffic and performance optimization?`,
            ],
            "Behavioral": [
                "Tell me about a challenging project you worked on and how you overcame obstacles.",
                "Describe a time when you had to work with a difficult team member.",
                "How do you stay updated with the latest industry trends and technologies?",
            ],
            "Sample Answers": {
                question: `How would you design a system for ${company}'s scale?`,
                sampleAnswer: `For ${company}'s scale, I would design a solution that [high-level approach]. Key considerations would include [factors], and I'd implement [specific technologies/patterns].`,
            },
        },
    };

    return questions;
};

// Default applications data
export const defaultApplications: Application[] = [
    {
        id: 1,
        company: "Google",
        position: "Senior Software Engineer",
        location: "Mountain View, CA",
        appliedDate: "2024-01-15",
        status: "Interview Scheduled",
        applicationMethod: "Company Website",
        resumeFile: null,
        resumeFileName: "Google_SWE_Resume_v2.pdf",
        jobUrl: "https://careers.google.com/jobs/123",
        notes: "Phone screen scheduled for next week. Recruiter mentioned focus on system design.",
        salary: "$180,000 - $220,000",
        nextAction: "Prepare for phone screen",
        nextActionDate: "2024-01-22",
    },
    {
        id: 2,
        company: "Meta",
        position: "Full Stack Engineer",
        location: "Menlo Park, CA",
        appliedDate: "2024-01-10",
        status: "Under Review",
        applicationMethod: "LinkedIn",
        resumeFile: null,
        resumeFileName: "Meta_FullStack_Resume_v1.pdf",
        jobUrl: "https://www.metacareers.com/jobs/456",
        notes: "Applied through LinkedIn. No response yet.",
        salary: "$170,000 - $210,000",
        nextAction: "Follow up with recruiter",
        nextActionDate: "2024-01-25",
    },
]; 