"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JobDescriptionForm } from "./form";
import { useResume } from "../resume-provider";

export default function JobDescriptionPage() {
    const router = useRouter();
    const { jobDescription, updateJobDescription } = useResume();

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
                onUpdate={updateJobDescription}
                onNext={handleNext}
                onBack={handleBack}
            />
        </div>
    );
}
