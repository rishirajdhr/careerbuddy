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
            location: "",
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
    skills: [],
    projects: [
        { name: "", startDate: "", description: "", url: "", keywords: [] },
    ],
    certificates: [{ name: "", date: "", issuer: "", url: "" }],
    awards: [{ title: "", date: "", awarder: "", summary: "" }],
    interests: [],
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
