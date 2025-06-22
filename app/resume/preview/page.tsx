"use client";

import { useRouter } from "next/navigation";
import { ResumePreview } from "./resume-preview";
import { useResume } from "../resume-provider";

export default function PreviewPage() {
    const router = useRouter();
    const { generatedResume } = useResume();

    const handleBack = () => {
        router.push("/resume/job-description");
    };

    if (!generatedResume) {
        return (
            <div className="mx-auto max-w-4xl">
                <div className="py-12 text-center">
                    <h3 className="mb-2 text-xl font-semibold">
                        No Resume Generated
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Please go back and generate a resume first.
                    </p>
                    <button
                        onClick={handleBack}
                        className="text-blue-600 hover:underline"
                    >
                        Go back to job description
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            <ResumePreview resumeData={generatedResume} onBack={handleBack} />
        </div>
    );
}
