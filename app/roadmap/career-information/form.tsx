"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CareerInformation, CareerInformationSchema } from "@/lib/roadmap-schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CareerInfoCard } from "./cards/careerinfo";
import { CareerGoalsCard } from "./cards/careergoals";

interface CareerInformationFormProps {
    data: CareerInformation;
    onUpdate: (data: Partial<CareerInformation>) => void;
    onNext: (data: CareerInformation) => void;
}

const defaultValues: CareerInformation = {
    currentRole: "",
    experience: "",
    careerGoal: "",
    timeline: "",
    jobDescription: "",
};

export function CareerInformationForm({
    data,
    onUpdate,
    onNext,
}: CareerInformationFormProps) {
    const form = useForm<CareerInformation>({
        resolver: zodResolver(CareerInformationSchema),
        defaultValues: data || defaultValues,
    });

    const handleSubmit = (formData: CareerInformation) => {
        onUpdate(formData);
        onNext(formData);
    };

    return (
        <FormProvider {...form}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                >
                    <CareerInfoCard />
                    <CareerGoalsCard />

                    <div className="flex justify-end border-t pt-6">
                        <Button
                            type="submit"
                            className="flex items-center space-x-2"
                        >
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </FormProvider>
    );
}
