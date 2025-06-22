"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JobDescriptionForm } from "./form";
import { useResume } from "../resume-provider";
import { Resume } from "@/lib/schema";

export default function JobDescriptionPage() {
    const router = useRouter();
    const {
        profile,
        jobDescription,
        updateJobDescription,
        updateGeneratedResume,
    } = useResume();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleNext = async () => {
        if (!jobDescription.trim()) {
            return;
        }

        setIsGenerating(true);
        try {
            const cleanedProfile = JSON.parse(
                JSON.stringify(profile),
                (key, value) => {
                    if (key.toLowerCase().includes("date") && value === "") {
                        return undefined;
                    }
                    return value;
                },
            );

            const response = await fetch("/api/generate-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userProfile: cleanedProfile,
                    jobDescription: jobDescription,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate resume");
            }

            const data = await response.json();
            if (data.success && data.resume) {
                updateGeneratedResume(data.resume);
                router.push("/resume/preview");
            } else {
                throw new Error(data.error || "Failed to generate resume");
            }
        } catch (error) {
            console.error("Error generating resume:", error);
            // You might want to show an error message to the user here
            alert("Failed to generate resume. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleBack = () => {
        router.push("/resume/profile");
    };

    return (
        <div className="mx-auto max-w-4xl">
            <JobDescriptionForm
                jobDescription={jobDescription}
                onUpdate={updateJobDescription}
                onNext={handleNext}
                onBack={handleBack}
                isGenerating={isGenerating}
            />
        </div>
    );
}
