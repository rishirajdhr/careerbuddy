"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stepVariants = cva("grid size-12 place-items-center rounded-full", {
    variants: {
        active: {
            true: "bg-blue-600 text-white",
            false: "bg-gray-300 text-gray-900",
        },
    },
    defaultVariants: { active: false },
});

const titleVariants = cva("absolute -bottom-3 text-xs font-medium w-max", {
    variants: { active: { true: "text-blue-600", false: "text-gray-500" } },
    defaultVariants: { active: false },
});

interface StepProps extends VariantProps<typeof stepVariants> {
    step: number;
    title: string;
    active: boolean;
}

function Step({ step, title, active }: StepProps) {
    return (
        <div className="relative flex flex-col items-center gap-2 p-3">
            <div className={stepVariants({ active })}>{step}</div>
            <div className={titleVariants({ active })}>{title}</div>
        </div>
    );
}

const steps = [
    {
        stepNumber: 1,
        title: "Career Information",
        path: "/roadmap/career-information",
    },
    { stepNumber: 2, title: "Preview", path: "/roadmap/preview" },
];

export function RoadmapWizardProgress() {
    const pathname = usePathname();

    const getCurrentStep = (pathname: string): number => {
        if (pathname.includes("/career-information")) return 1;
        if (pathname.includes("/preview")) return 2;
        return 1;
    };

    const currentStep = getCurrentStep(pathname);

    return (
        <div className="flex flex-row items-center justify-between p-4">
            {steps.map((step, index) => (
                <Fragment key={step.stepNumber}>
                    <Step
                        step={step.stepNumber}
                        title={step.title}
                        active={currentStep === step.stepNumber}
                    />
                    {index < steps.length - 1 && (
                        <div
                            key={`line-${index}`}
                            className="flex-1 border-t border-gray-300"
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
}
