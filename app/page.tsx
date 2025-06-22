"use client";

import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Map, ClipboardList, Users } from "lucide-react";

const features = [
    {
        title: "Resume Generator",
        description: "Create professional resumes tailored to your target job",
        href: "/resume",
        icon: FileText,
        color: "text-blue-600",
    },
    {
        title: "Career Roadmap",
        description:
            "Plan your career path with actionable steps and milestones",
        href: "/roadmap",
        icon: Map,
        color: "text-green-600",
    },
    {
        title: "Application Tracker",
        description: "Track your job applications and interview progress",
        href: "/tracker",
        icon: ClipboardList,
        color: "text-purple-600",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-6 py-12">
                {/* Main Title and Introduction */}
                <div className="mb-12 pt-30 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        Welcome to CareerBuddy
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        Your comprehensive career development platform. Choose
                        the tool that best fits your current needs and take the
                        next step in your professional journey.
                    </p>
                </div>

                {/* Feature Selection Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <Card
                                key={feature.href}
                                className="transition-shadow hover:shadow-lg"
                            >
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                        <IconComponent
                                            className={`h-6 w-6 ${feature.color}`}
                                        />
                                    </div>
                                    <CardTitle className="text-xl">
                                        {feature.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <Button asChild className="w-full">
                                        <Link href={feature.href}>
                                            Get Started
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
