"use client";

import { useRouter } from "next/navigation";
import { ResumePreview } from "./resume-preview";

export default function PreviewPage() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/resume/job-description");
    };

    // TODO: Get form data from context or localStorage
    const formData = {
        basics: {
            name: "",
            email: "",
            phone: "",
            location: {
                address: "",
                postalCode: "",
                city: "",
                countryCode: "",
                region: "",
            },
            url: "",
            profiles: [{ network: "LinkedIn", username: "", url: "" }],
            summary: "",
        },
    };
    const jobDescription = "";

    return (
        <div className="mx-auto max-w-4xl">
            <ResumePreview
                resumeData={formData}
                jobDescription={jobDescription}
                onBack={handleBack}
            />
        </div>
    );
}
