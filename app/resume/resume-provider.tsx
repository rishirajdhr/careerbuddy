"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Resume } from "@/lib/schema";
import { profileFormDefaultValues } from "./profile/default-values";
import { fileToBase64 } from "@/lib/utils";
import { Application } from "../dashboard/types";

interface ResumeContextType {
    profile: Resume;
    updateProfile: (newProfile: Partial<Resume>) => void;
    jobDescription: string;
    updateJobDescription: (jobDescription: string) => void;
    generatedResume: Resume | null;
    updateGeneratedResume: (resume: Resume | null) => void;
    company: string | null;
    role: string | null;
    updateJobInfo: (company: string, role: string) => void;
    saveToApplications: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<Resume>(profileFormDefaultValues);
    const [jobDescription, setJobDescription] = useState<string>("");
    const [generatedResume, setGeneratedResume] = useState<Resume | null>(null);
    const [company, setCompany] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    const updateProfile = (newProfile: Partial<Resume>) => {
        setProfile((prev) => ({ ...prev, ...newProfile }));
    };

    const updateJobDescription = (jobDescription: string) => {
        setJobDescription(jobDescription);
    };

    const updateGeneratedResume = (resume: Resume | null) => {
        setGeneratedResume(resume);
    };

    const updateJobInfo = (company: string, role: string) => {
        setCompany(company);
        setRole(role);
    };

    const saveToApplications = async () => {
        if (!company || !role || !jobDescription || !generatedResume) {
            console.warn("Cannot save to applications: missing required data");
            return;
        }

        const applicationsKey = "jobApplications";
        const storedApplications = localStorage.getItem(applicationsKey);
        let applications: Application[] = storedApplications ? JSON.parse(storedApplications) : [];

        // Create resume file and convert to base64 for the current generation
        const resumeContent = JSON.stringify(generatedResume, null, 2);
        const resumeFileName = `Resume-${company.replace(/\s/g, '_')}-${Date.now()}.json`;
        const resumeFile = new File([resumeContent], resumeFileName, { type: "application/json" });
        const resumeFileData = await fileToBase64(resumeFile);

        // Find if an application with the same job description already exists
        const existingAppIndex = applications.findIndex(
            (app) => app.jobDescription === jobDescription
        );

        if (existingAppIndex !== -1) {
            // Update existing application
            const existingApp = applications[existingAppIndex];
            existingApp.resumeFileData = resumeFileData;
            existingApp.resumeFileName = resumeFileName;
            existingApp.appliedDate = new Date().toISOString().split('T')[0]; // Update to latest date
            existingApp.userProfile = profile; // Also update the profile snapshot
            applications[existingAppIndex] = existingApp;
        } else {
            // Create new application entry if it doesn't exist
            const newApplication: Application = {
                id: Date.now(),
                company: company,
                position: role,
                location: profile.basics?.location?.address || "",
                appliedDate: new Date().toISOString().split('T')[0],
                status: "Applied",
                applicationMethod: "Online",
                resumeFile: null, // Will be reconstructed from base64 on load
                resumeFileName: resumeFileName,
                resumeFileData: resumeFileData,
                jobUrl: "",
                notes: "",
                salary: "",
                nextAction: "",
                nextActionDate: "",
                jobDescription: jobDescription,
                role: role,
                userProfile: profile, // Save the profile snapshot
            };
            applications.unshift(newApplication);
        }

        // Save updated applications list
        localStorage.setItem(applicationsKey, JSON.stringify(applications));
    };

    return (
        <ResumeContext.Provider
            value={{
                profile,
                updateProfile,
                jobDescription,
                updateJobDescription,
                generatedResume,
                updateGeneratedResume,
                company,
                role,
                updateJobInfo,
                saveToApplications,
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
