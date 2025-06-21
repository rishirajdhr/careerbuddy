import { Resume } from "@/lib/schema";

export const profileFormDefaultValues: Resume = {
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
    work: [
        {
            name: "",
            position: "",
            startDate: "",
            endDate: "",
            summary: "",
            highlights: [],
        },
    ],
    education: [
        {
            institution: "",
            area: "",
            studyType: "",
            startDate: "",
            endDate: "",
            score: "",
            courses: [],
        },
    ],
    skills: [{ name: "", level: "", keywords: [] }],
    projects: [{ name: "", description: "", url: "", keywords: [] }],
    certificates: [{ name: "", date: "", issuer: "", url: "" }],
    awards: [{ title: "", date: "", awarder: "", summary: "" }],
    interests: [{ name: "", keywords: [] }],
    languages: [{ language: "", fluency: "" }],
    publications: [
        { name: "", publisher: "", releaseDate: "", url: "", summary: "" },
    ],
    volunteer: [
        {
            organization: "",
            position: "",
            startDate: "",
            endDate: "",
            summary: "",
            url: "",
        },
    ],
};
