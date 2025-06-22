import { Resume } from "@/lib/schema";

export interface User {
    id: string;
    name: string;
    email: string;
}

export type Application = {
    id: number;
    company: string;
    position: string;
    location: string;
    appliedDate: string;
    status: string;
    applicationMethod: string;
    resumeFile: File | null;
    resumeFileName: string;
    resumeFileData?: string; // For localStorage persistence
    jobUrl: string;
    notes: string;
    salary: string;
    nextAction: string;
    nextActionDate: string;
    jobDescription?: string; // Job description used for resume generation
    role?: string; // Extracted job role/title
    userProfile?: Resume; // User profile snapshot at time of application
};

export const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    "Under Review": "bg-yellow-100 text-yellow-800",
    "Interview Scheduled": "bg-purple-100 text-purple-800",
    "Offer Received": "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
} as const;

export const statusIcons = {
    Applied: "AlertCircle",
    "Under Review": "Clock",
    "Interview Scheduled": "CalendarIcon",
    "Offer Received": "CheckCircle",
    Rejected: "XCircle",
} as const; 