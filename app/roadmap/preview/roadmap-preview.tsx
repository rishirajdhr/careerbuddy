import { Button } from "@/components/ui/button";
import { ChevronLeft, Lightbulb, BookOpen, Clock, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Roadmap } from "@/lib/roadmap-schema";

export function RoadmapPreview() {
    const router = useRouter();
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const roadmapData = sessionStorage.getItem("roadmapData");
            if (roadmapData) {
                const parsedRoadmap = JSON.parse(roadmapData);
                setRoadmap(parsedRoadmap);
            } else {
                setError("No roadmap data found. Please go back and generate a roadmap.");
            }
        } catch (err) {
            setError("Failed to load roadmap data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 font-sans">
                <div className="flex items-center justify-center py-12">
                    <div className="text-lg text-gray-600">Loading roadmap...</div>
                </div>
            </div>
        );
    }

    if (error || !roadmap) {
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
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="text-lg text-red-600 mb-4">{error || "No roadmap data available"}</div>
                        <Button onClick={() => router.push("/roadmap/career-information")}>
                            Generate New Roadmap
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

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
                    {roadmap.title}
                </h1>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-green-700">
                        Starting Point:
                    </h2>
                    <p className="text-gray-700">{roadmap.start}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-blue-700">
                        Goal:
                    </h2>
                    <p className="text-gray-700">{roadmap.goal}</p>
                </div>

                <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 h-5 w-5 text-orange-500" />
                    <span className="font-semibold">Estimated Total Time:</span>
                    <span className="ml-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                        {roadmap.estimatedTime}
                    </span>
                </div>
            </div>

            {roadmap.considerations && roadmap.considerations.length > 0 && (
                <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
                    <h2 className="mb-4 flex items-center text-xl font-bold text-yellow-800">
                        <Lightbulb className="mr-3 h-6 w-6 text-yellow-500" />
                        Important Considerations
                    </h2>
                    <ul className="list-inside space-y-2">
                        {roadmap.considerations.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <span className="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400"></span>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                {roadmap.steps.map((step, index) => (
                    <div
                        key={index}
                        className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
                    >
                        <div className="mb-4 flex items-start">
                            <div className="mr-4 grid size-10 flex-shrink-0 place-items-center rounded-full bg-blue-600 text-xl font-bold text-white">
                                {index + 1}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.summary}
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
                                    {step.estimatedTime}
                                </div>
                            </div>
                            {step.resources && step.resources.length > 0 && (
                                <div className="space-y-4">
                                    {step.resources.map((resource, resourceIndex) => (
                                        <div
                                            key={resourceIndex}
                                            className="rounded-lg bg-slate-50 p-4"
                                        >
                                            <div className="flex items-start justify-between">
                                                <h5 className="font-bold text-gray-800">
                                                    {resource.name}
                                                </h5>
                                                {resource.estimatedTime && (
                                                    <div className="text-sm font-semibold text-gray-600">
                                                        {resource.estimatedTime}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="pt-3 text-sm text-gray-700">
                                                <p>
                                                    <span className="font-semibold">
                                                        Purpose:
                                                    </span>{" "}
                                                    {resource.purpose}
                                                </p>
                                                {resource.details && (
                                                    <p className="mt-2">{resource.details}</p>
                                                )}
                                                {resource.links && resource.links.length > 0 && (
                                                    <div className="mt-2">
                                                        <span className="font-semibold">Links:</span>
                                                        <ul className="mt-1 space-y-1">
                                                            {resource.links.map((link, linkIndex) => (
                                                                link && (
                                                                    <li key={linkIndex}>
                                                                        <a 
                                                                            href={link} 
                                                                            target="_blank" 
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-600 hover:underline"
                                                                        >
                                                                            {link}
                                                                        </a>
                                                                    </li>
                                                                )
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step.suggestions && step.suggestions.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-700">
                                        <Target className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600" />
                                        Suggestions
                                    </h4>
                                    <ul className="list-inside space-y-2">
                                        {step.suggestions.map(
                                            (item, suggestionIndex) => (
                                                <li
                                                    key={suggestionIndex}
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

            {roadmap.alternativePathway && roadmap.alternativePathway.length > 0 && (
                <div className="mt-12 rounded-lg border border-green-200 bg-green-50 p-6">
                    <h2 className="mb-6 text-2xl font-bold text-green-800">
                        Alternative Pathway
                    </h2>
                    <div>
                        {roadmap.alternativePathway.map((step, index) => (
                            <div
                                key={index}
                                className="mb-6 rounded-lg border border-green-100 bg-white p-4 shadow-sm"
                            >
                                <div className="mb-3 flex items-start">
                                    <div className="mr-3 grid size-8 flex-shrink-0 place-items-center rounded-full bg-green-600 text-sm font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {step.summary}
                                        </p>
                                    </div>
                                </div>
                                <div className="ml-11">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-semibold">Duration:</span> {step.estimatedTime}
                                    </div>
                                    {step.resources && step.resources.length > 0 && (
                                        <div className="mt-2">
                                            <span className="text-sm font-semibold text-gray-700">Resources:</span>
                                            <ul className="mt-1 space-y-1">
                                                {step.resources.map((resource, resourceIndex) => (
                                                    <li key={resourceIndex} className="text-sm text-gray-600">
                                                        • {resource.name} - {resource.purpose}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
