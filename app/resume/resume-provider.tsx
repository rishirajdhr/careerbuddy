"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Resume } from "@/lib/schema";
import { profileFormDefaultValues } from "./profile/default-values";

interface ResumeContextType {
    resume: Resume;
    updateResume: (newResume: Partial<Resume>) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [resume, setResume] = useState<Resume>(profileFormDefaultValues);

    const updateResume = (newResume: Partial<Resume>) => {
        setResume((prev) => ({ ...prev, ...newResume }));
    };

    return (
        <ResumeContext.Provider value={{ resume, updateResume }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("useResume must be used within a ResumeProvider");
    }
    return context;
}
