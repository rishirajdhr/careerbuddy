"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CareerInformation } from "@/lib/roadmap-schema";
import { CareerInformationForm } from "./form";

const defaultValues: CareerInformation = {
    currentRole: "",
    experience: "",
    careerGoal: "",
    timeline: "",
};

export default function CareerInformationPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<CareerInformation>(defaultValues);

    const handleUpdate = (data: Partial<CareerInformation>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleNext = async (data: CareerInformation) => {
        try {
            // Call the generate-roadmap API
            const response = await fetch("/api/generate-roadmap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ careerInfo: data }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate roadmap");
            }

            const result = await response.json();
            
            if (result.success) {
                // Store the roadmap data (you might want to use a state management solution)
                // For now, we'll pass it as a URL parameter or store it in sessionStorage
                sessionStorage.setItem("roadmapData", JSON.stringify(result.roadmap));
                router.push("/roadmap/preview");
            } else {
                console.error("Roadmap generation failed:", result.error);
                // Handle error - you might want to show a toast or error message
            }
        } catch (error) {
            console.error("Error generating roadmap:", error);
            // Handle error - you might want to show a toast or error message
        }
    };

    return (
        <div className="mx-auto max-w-4xl">
            <CareerInformationForm
                data={formData}
                onUpdate={handleUpdate}
                onNext={handleNext}
            />
        </div>
    );
}
