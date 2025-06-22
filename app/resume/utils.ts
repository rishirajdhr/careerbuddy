import type { Resume } from "@/lib/schema";

function isBlank(obj: Record<string, any>, requiredFields: string[]): boolean {
    return requiredFields.every(
        (field) =>
            obj[field] === undefined ||
            obj[field] === null ||
            (typeof obj[field] === "string" && obj[field].trim() === "") ||
            (Array.isArray(obj[field]) && obj[field].length === 0),
    );
}

/**
 * Removes blank entries from all multi-entry (array) fields in the Resume object.
 * A blank entry is one where all required fields are empty or missing.
 * This function returns a sanitized copy of the resume.
 */
export function sanitizeResumeForApi(resume: Resume): Resume {
    // Define required fields for each array section
    const requiredFieldsMap: Record<string, string[]> = {
        education: ["institution", "area", "studyType", "startDate", "score"],
        work: ["name", "position", "location", "startDate"],
        projects: ["name", "startDate"],
        skills: ["name"],
        certificates: ["name", "issuer", "date"],
        publications: ["name", "publisher", "releaseDate"],
        awards: ["title", "date", "awarder"],
        volunteer: ["organization", "position", "startDate"],
        languages: ["language"],
        interests: ["name"],
        references: ["name"],
    };

    // Start with all non-array fields
    const sanitized: Resume = { ...resume };

    (Object.keys(requiredFieldsMap) as (keyof Resume)[]).forEach((section) => {
        const entries = resume[section];
        if (Array.isArray(entries)) {
            const filtered = entries.filter(
                (entry) =>
                    !isBlank(entry, requiredFieldsMap[section as string]),
            );
            if (filtered.length > 0) {
                sanitized[section] = filtered as any;
            } else {
                delete sanitized[section];
            }
        }
    });

    return sanitized;
}
