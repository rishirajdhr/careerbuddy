"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JobDescriptionForm } from "./form";

export default function JobDescriptionPage() {
    const router = useRouter();
    const [jobDescription, setJobDescription] = useState("");

    useEffect(() => {
        const storedJobDescription = localStorage.getItem("jobDescription");
        if (storedJobDescription) {
            setJobDescription(storedJobDescription);
        }
    }, []);

    const handleUpdate = (newJobDescription: string) => {
        setJobDescription(newJobDescription);
        localStorage.setItem("jobDescription", newJobDescription);
    };

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
                onUpdate={handleUpdate}
                onNext={handleNext}
                onBack={handleBack}
            />
        </div>
    );
}
