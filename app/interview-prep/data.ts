import {
    ArrowLeft,
    Lightbulb,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export const interviewTips = [
    {
        title: "STAR Method:",
        content: "Structure answers with Situation, Task, Action, Result.",
        borderColor: "border-purple-400",
        textColor: "text-purple-600",
    },
    {
        title: "Research:",
        content: "Know the company's mission, values, and recent news.",
        borderColor: "border-yellow-400",
        textColor: "text-yellow-600",
    },
    {
        title: "Practice:",
        content: "Rehearse your answers out loud and time yourself.",
        borderColor: "border-green-400",
        textColor: "text-green-600",
    },
];

export const interviewQuestionsData = {
    behavioral: [
        {
            id: 1,
            question: "Tell me about a time when you had to work with a difficult team member.",
            tips: "Use the STAR method to structure your answer. Focus on how you positively handled the situation and the outcome.",
            sampleAnswer:
                "At my previous job, I was on a project with a team member who had a very different communication style. The Situation was that our conflicting styles led to misunderstandings. My Task was to find a way to work together effectively to meet our deadline. The Action I took was to schedule a one-on-one meeting to discuss our preferences. We agreed on a new process for our joint tasks. The Result was a significant improvement in our collaboration, and we successfully completed the project ahead of schedule.",
        },
        {
            id: 2,
            question: "Describe a situation where you had to learn a new technology quickly.",
            tips: "Highlight your ability to learn quickly and apply new skills effectively. Mention the steps you took to learn.",
            sampleAnswer: "I had to quickly learn a new data visualization library for a recent project. I dedicated a few evenings to going through the documentation, tutorials and built a small prototype. I was able to use it effectively in the project within a week.",
        },
        {
            id: 3,
            question: "Tell me about a time you failed and how you handled it.",
            tips: "Be honest and choose a real failure. Focus on what you learned from the experience and how you grew.",
            sampleAnswer: "I once missed a critical bug in a code review that caused a minor production issue. I immediately took responsibility, worked with the team to deploy a fix, and then proposed a new checklist for our code review process to prevent similar mistakes. It was a humbling experience, but it improved our team's quality assurance.",
        },
        {
            id: 4,
            question: "How do you handle conflict in the workplace?",
            tips: "Show that you are proactive and constructive in resolving conflicts. Emphasize listening and finding a common ground.",
            sampleAnswer: "I believe in addressing conflicts directly and respectfully. I prefer to listen to the other person's perspective first, then clearly state my own, and work together to find a mutually agreeable solution. I focus on the problem, not the person.",
        }
    ],
    technical: [
        {
            id: 5,
            question: "Explain the difference between SQL and NoSQL databases.",
            tips: "Keep it concise. Mention structure (SQL is relational, NoSQL is non-relational), schema (SQL is fixed, NoSQL is dynamic), and scalability (NoSQL often scales horizontally better).",
            sampleAnswer: "SQL databases are relational and use a structured schema, making them good for complex queries and transactional applications. NoSQL databases are non-relational, have dynamic schemas, and excel at handling large volumes of unstructured data and scaling horizontally.",
        },
        {
            id: 6,
            question: "How would you optimize a slow-loading web page?",
            tips: "Mention a variety of techniques: optimizing images, minifying CSS/JS, using a CDN, enabling browser caching, and reducing server response time.",
            sampleAnswer: "I'd start by using browser developer tools to audit the page and identify bottlenecks. Common optimizations include compressing images, minifying CSS and JavaScript files, leveraging browser caching, and using a Content Delivery Network (CDN) to serve assets faster.",
        },
        {
            id: 7,
            question: "Implement a function to reverse a linked list.",
            tips: "You can solve this iteratively or recursively. The iterative approach using three pointers (prev, current, next) is very common.",
            sampleAnswer: "To reverse a linked list iteratively, I would initialize three pointers: `previous` to null, `current` to the head of the list, and `next` to null. I'd then iterate through the list, and in each iteration, I'd store the `current.next` in the `next` pointer, set `current.next` to `previous`, and then move `previous` and `current` one step forward.",
        },
        {
            id: 8,
            question: "How do you ensure code quality in your projects?",
            tips: "Talk about code reviews, unit testing, integration testing, linting, and following consistent coding standards.",
            sampleAnswer: "I ensure code quality through a combination of practices: writing comprehensive unit tests, participating in peer code reviews, using static analysis tools and linters to catch issues early, and adhering to established coding style guides for consistency.",
        }
    ],
    problemSolving: [
        {
            id: 9,
            question: "Describe a time you faced a complex problem at work. How did you go about solving it?",
            tips: "Use the STAR method. Clearly outline the problem, your analysis, the steps you took, and the resolution. Emphasize a logical and structured approach.",
            sampleAnswer: "I was tasked with improving the performance of a key API endpoint that was timing out under heavy load. I started by using monitoring tools to identify the exact queries that were slow. Then, I analyzed the query execution plans and found a missing index on a large table. After adding the index and deploying the change to a staging environment for testing, the response time improved by 80%. We then rolled it out to production, resolving the timeout issues."
        },
        {
            id: 10,
            question: "Tell me about a time you had to make a quick decision with limited information.",
            tips: "Focus on how you assessed the situation, what information you prioritized, and how you managed the risk. Show that you can be decisive when necessary.",
            sampleAnswer: "A critical third-party service we relied on suddenly went down. With limited information about when it would be back, I had to decide whether to wait or switch to a backup solution, which had some minor feature gaps. I quickly assessed the impact on our users and decided to activate the backup to minimize downtime, while communicating the temporary limitations to our customers. The main service was down for hours, so it proved to be the right call."
        }
    ],
    cultureFit: [
        {
            id: 11,
            question: "What kind of work environment helps you do your best work?",
            tips: "Be honest and align your answer with what you know about the company's culture. Mention collaboration, autonomy, or structure, depending on your preference and their style.",
            sampleAnswer: "I thrive in a collaborative environment where I can bounce ideas off colleagues and work together to solve problems. I also appreciate having autonomy to manage my own tasks and projects. A culture that values open communication and continuous learning is very important to me."
        },
        {
            id: 12,
            question: "How do you handle feedback on your work?",
            tips: "Show that you are receptive to feedback and see it as a tool for growth. Mention that you prefer specific, actionable feedback.",
            sampleAnswer: "I view feedback as a gift and an essential part of professional growth. I appreciate both positive and constructive feedback. When I receive it, I listen carefully, ask clarifying questions to make sure I understand, and then focus on how I can incorporate it to improve my work."
        }
    ]
};

export type Question = {
    id: number;
    question: string;
    tips: string;
    sampleAnswer: string;
};

export type Category = keyof typeof interviewQuestionsData;

export const allQuestions: (Question & { category: Category })[] = (
    Object.keys(interviewQuestionsData) as Category[]
).flatMap((category) =>
    interviewQuestionsData[category].map((q) => ({ ...q, category }))
); 