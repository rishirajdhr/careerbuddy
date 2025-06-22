"use client";

import { useRouter } from "next/navigation";
import { ResumePreview } from "./resume-preview";
import { useEffect, useState } from "react";
import { Resume } from "@/lib/schema";

export default function PreviewPage() {
    const router = useRouter();
    const [resumeData, setResumeData] = useState<Resume | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Try fetching from the API first
                const apiResponse = await fetch("/api/resume");
                if (apiResponse.ok) {
                    const data = await apiResponse.json();
                    setResumeData(data);
                    return;
                }
            } catch (error) {
                console.warn("API fetch failed, falling back to local JSON.", error);
            }

            try {
                // Fallback to local resume.json
                const localResponse = await fetch("/resume.json");
                const data = await localResponse.json();
                setResumeData(data);
            } catch (error) {
                console.error("Error fetching resume data from local file:", error);
            }
        }
        fetchData();
    }, []);

    const handleBack = () => {
        router.push("/resume/job-description");
    };

    if (!resumeData) {
        return <div>Loading...</div>; // Or a proper loader
    }

    return (
        <div className="mx-auto max-w-4xl">
            <ResumePreview
                resumeData={resumeData}
                onBack={handleBack}
            />
        </div>
    );
}
