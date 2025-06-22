"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobDescriptionForm } from "./form";

export default function JobDescriptionPage() {
    const router = useRouter();
    const [jobDescription, setJobDescription] = useState("");

    const handleNext = () => {
        router.push("/resume/preview");
    };

    const handleBack = () => {
        router.push("/resume/profile");
    };

    return (
        <div className="mx-auto max-w-4xl">
            <JobDescriptionForm
                jobDescription={jobDescription}
                onUpdate={setJobDescription}
                onNext={handleNext}
                onBack={handleBack}
            />
        </div>
    );
}
