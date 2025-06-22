"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Roadmap } from "@/lib/roadmap-schema";
import { CareerInformationForm } from "./form";

const defaultValues: Roadmap = {
    currentRole: "",
    experience: "",
    careerGoal: "",
    timeline: "",
};

export default function CareerInformationPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<Roadmap>(defaultValues);

    const handleNext = (data: Roadmap) => {
        // Here you would typically save the data to a store or post to an API
        console.log(data);
        // Then navigate to the next step
        router.push("/roadmap/preview");
    };

    return (
        <div className="mx-auto max-w-4xl">
            <CareerInformationForm
                data={formData}
                onUpdate={setFormData}
                onNext={handleNext}
            />
        </div>
    );
}
