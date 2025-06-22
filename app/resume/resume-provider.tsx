"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Resume } from "@/lib/schema";
import { profileFormDefaultValues } from "./profile/default-values";

interface ResumeContextType {
    profile: Resume;
    updateProfile: (newProfile: Partial<Resume>) => void;
    jobDescription: string;
    updateJobDescription: (jobDescription: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<Resume>(profileFormDefaultValues);
    const [jobDescription, setJobDescription] = useState<string>("");

    const updateProfile = (newProfile: Partial<Resume>) => {
        setProfile((prev) => ({ ...prev, ...newProfile }));
    };

    const updateJobDescription = (jobDescription: string) => {
        setJobDescription(jobDescription);
    };

    return (
        <ResumeContext.Provider
            value={{
                profile,
                updateProfile,
                jobDescription,
                updateJobDescription,
            }}
        >
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
