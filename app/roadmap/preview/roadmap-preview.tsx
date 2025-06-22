import { Button } from "@/components/ui/button";
import { ChevronLeft, Lightbulb, BookOpen, Clock, Target } from "lucide-react";
import { useRouter } from "next/navigation";

type Resource = {
    title: string;
    purpose: string;
    focus: string[];
    duration: string;
};

type Milestone = {
    id: number;
    title: string;
    description: string;
    duration: string;
    resources: Resource[];
    suggestions: string[];
};

const mockData = {
    from: "Software Engineer",
    to: "Senior Full Stack Developer",
    startingPoint:
        "You are currently a Junior Software Developer with 2 years of experience in web development. You have solid foundations in JavaScript, React, and Node.js, with some exposure to databases and cloud platforms.",
    goal: "Become a Senior Full Stack Developer capable of architecting scalable web applications, leading technical decisions, and mentoring junior developers.",
    estimatedTime: "18-24 months",
    importantConsiderations: [
        "Focus on both technical depth and breadth across the full stack",
        "Develop leadership and mentoring skills alongside technical abilities",
        "Build a portfolio of increasingly complex projects",
        "Stay current with evolving technologies and best practices",
    ],
    milestones: [
        {
            id: 1,
            title: "Master Advanced Frontend Technologies",
            description:
                "Deepen your frontend expertise beyond basic React, focusing on performance optimization, advanced patterns, and modern tooling.",
            duration: "4-6 months",
            resources: [
                {
                    title: "Advanced React Patterns Course",
                    purpose:
                        "Learn complex React patterns like render props, higher-order components, and custom hooks",
                    focus: [
                        "Focus on performance optimization, state management patterns, and component composition techniques",
                    ],
                    duration: "6-8 weeks",
                },
                {
                    title: "TypeScript Mastery",
                    purpose:
                        "Add strong typing to improve code quality and developer experience",
                    focus: [
                        "Learn advanced TypeScript features, generics, and how to type complex React applications",
                    ],
                    duration: "4-6 weeks",
                },
                {
                    title: "Advanced State Management",
                    purpose:
                        "Master state management libraries like Redux or Zustand.",
                    focus: [
                        "Understand global state, selectors, and middleware.",
                    ],
                    duration: "3-4 weeks",
                },
            ],
            suggestions: [
                "Build a complex single-page application using advanced React patterns",
                "Contribute to open-source React projects to gain experience",
                "Practice performance optimization techniques like code splitting and lazy loading",
                "Write an article explaining a complex React concept you've learned.",
            ],
        },
        {
            id: 2,
            title: "Strengthen Backend Development Skills",
            description:
                "Build robust and scalable server-side applications using Node.js, Express, and databases.",
            duration: "5-7 months",
            resources: [
                {
                    title: "Node.js Complete Guide",
                    purpose: "Master Node.js, Express, and MongoDB.",
                    focus: [],
                    duration: "8-10 weeks",
                },
                {
                    title: "SQL & Database Design",
                    purpose:
                        "Learn relational database design and advanced SQL.",
                    focus: [],
                    duration: "4-6 weeks",
                },
            ],
            suggestions: [],
        },
        {
            id: 3,
            title: "Embrace DevOps and Cloud Technologies",
            description:
                "Gain experience with CI/CD pipelines, containerization with Docker, and deploying to cloud platforms like AWS.",
            duration: "3-5 months",
            resources: [
                {
                    title: "Docker & Kubernetes Course",
                    purpose: "Containerize and orchestrate applications.",
                    focus: [],
                    duration: "6-8 weeks",
                },
                {
                    title: "AWS Certified Developer",
                    purpose:
                        "Prepare for AWS certification and learn core services.",
                    focus: [],
                    duration: "5-7 weeks",
                },
            ],
            suggestions: [],
        },
        {
            id: 4,
            title: "Develop Leadership and Mentoring Abilities",
            description:
                "Focus on soft skills, such as leading technical discussions, mentoring junior developers, and contributing to architectural decisions.",
            duration: "Ongoing",
            resources: [
                {
                    title: "Technical Leadership Course",
                    purpose:
                        "Learn to lead teams and make effective technical decisions.",
                    focus: [],
                    duration: "4-6 weeks",
                },
            ],
            suggestions: [],
        },
    ],
};

export function RoadmapPreview() {
    const router = useRouter();

    return (
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 font-sans">
            <Button
                variant="link"
                className="mb-6 pl-0 text-base text-gray-600"
                onClick={() => router.back()}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Edit
            </Button>

            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">
                    {mockData.from} to {mockData.to}
                </h1>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-green-700">
                        Starting Point:
                    </h2>
                    <p className="text-gray-700">{mockData.startingPoint}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-blue-700">
                        Goal:
                    </h2>
                    <p className="text-gray-700">{mockData.goal}</p>
                </div>

                <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 h-5 w-5 text-orange-500" />
                    <span className="font-semibold">Estimated Total Time:</span>
                    <span className="ml-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                        {mockData.estimatedTime}
                    </span>
                </div>
            </div>

            <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
                <h2 className="mb-4 flex items-center text-xl font-bold text-yellow-800">
                    <Lightbulb className="mr-3 h-6 w-6 text-yellow-500" />
                    Important Considerations
                </h2>
                <ul className="list-inside space-y-2">
                    {mockData.importantConsiderations.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <span className="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400"></span>
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                {mockData.milestones.map((milestone) => (
                    <div
                        key={milestone.id}
                        className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
                    >
                        <div className="mb-4 flex items-start">
                            <div className="mr-4 grid size-10 flex-shrink-0 place-items-center rounded-full bg-blue-600 text-xl font-bold text-white">
                                {milestone.id}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {milestone.title}
                                </h3>
                                <p className="text-gray-600">
                                    {milestone.description}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <h4 className="flex items-center text-lg font-semibold text-gray-700">
                                    <BookOpen className="mr-3 h-5 w-5 text-green-600" />
                                    Resources
                                </h4>
                                <div className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-800">
                                    {milestone.duration}
                                </div>
                            </div>
                            <div className="space-y-4">
                                {milestone.resources.map((resource, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg bg-slate-50 p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <h5 className="font-bold text-gray-800">
                                                {resource.title}
                                            </h5>
                                            <div className="text-sm font-semibold text-gray-600">
                                                {resource.duration}
                                            </div>
                                        </div>
                                        <div className="pt-3 text-sm text-gray-700">
                                            <p>
                                                <span className="font-semibold">
                                                    Purpose:
                                                </span>{" "}
                                                {resource.purpose}
                                            </p>
                                            {resource.focus.map((f, i) => (
                                                <p key={i}>{f}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {milestone.suggestions.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-700">
                                        <Target className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600" />
                                        Suggestions
                                    </h4>
                                    <ul className="list-inside space-y-2">
                                        {milestone.suggestions.map(
                                            (item, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start"
                                                >
                                                    <div className="mr-3 flex w-5 flex-shrink-0 justify-center">
                                                        <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                                                    </div>
                                                    <span className="text-gray-700">
                                                        {item}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
