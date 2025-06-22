import { z } from "zod";

/** Schema for validating a date string in the format YYYY-MM-DD, YYYY-MM, or YYYY. */
const DateSchema = z
    .string()
    .regex(
        /^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/,
        "Invalid date format. Use YYYY-MM-DD, YYYY-MM, or YYYY.",
    )
    .describe(
        "Similar to the standard date type, but each section after the year is optional. e.g. 2014-06-29 or 2023-04",
    );

/** Schema for validating a user's location information. */
const LocationSchema = z.object({
    /** The address of your location, e.g. 42 Park Avenue, New York, NY 10001 */
    address: z
        .string()
        .optional()
        .describe("Your address, e.g. 42 Park Avenue, New York, NY 10001"),

    /** The city of your location, e.g. New York */
    city: z.string().optional().describe("Your city, e.g. New York"),

    /** The country code of your location, e.g. US or IN */
    countryCode: z
        .string()
        .optional()
        .describe("Your country code, e.g. US or IN"),

    /** The postal code of your location, e.g. 10001 */
    postalCode: z.string().optional().describe("Your postal code, e.g. 10001"),

    /** The state or province of your location, e.g. New York */
    region: z
        .string()
        .optional()
        .describe("Your state or province, e.g. New York"),
});

/** Schema for validating a user's social media profile information. */
const ProfileSchema = z.object({
    /** The social network name, e.g. Facebook or Twitter */
    network: z
        .string()
        .optional()
        .describe("The social network name, e.g. Facebook or Twitter"),

    /** Your username on the social network, e.g. peterparker */
    username: z
        .string()
        .optional()
        .describe("Your username on the social network, e.g. peterparker"),

    /** The URL to your profile on the social network, e.g. http://somesocialnetwork.com/peterparker */
    url: z
        .string()
        .optional()
        .describe(
            "The URL to your profile on the social network, e.g. http://somesocialnetwork.com/peterparker",
        ),
});

/** Schema for validating the basics section of a resume. */
const BasicsSchema = z.object({
    /** Your full name, e.g. Peter Parker */
    name: z.string().describe("Your full name, e.g. Peter Parker"),

    /** What you do, e.g. Web Developer */
    label: z.string().optional().describe("What you do, e.g. Web Developer"),

    /** URL to your image in JPEG or PNG format */
    image: z
        .string()
        .optional()
        .describe("URL to your image in JPEG or PNG format"),

    /** Your email address, e.g. peter.parker@avengers.com */
    email: z
        .string()
        .describe("Your email address, e.g. peter.parker@avengers.com"),

    /** Your phone number, e.g. 712-117-2923 */
    phone: z.string().describe("Your phone number, e.g. 712-117-2923"),

    /** URL to your website, e.g. http://peterparker.com */
    url: z
        .string()
        .optional()
        .describe("URL to your website, e.g. http://peterparker.com"),

    /** A short biography about yourself (2-3 sentences) */
    summary: z
        .string()
        .optional()
        .describe("A short biography about yourself (2-3 sentences)"),

    /** Your location details */
    location: LocationSchema.optional().describe("Your location details"),

    /** Your social media profiles */
    profiles: z
        .array(ProfileSchema)
        .optional()
        .describe("Your social media profiles"),
});

/** Schema for validating a user's education details. */
const EducationSchema = z.object({
    /** The name of the institution, e.g. Massachusetts Institute of Technology */
    institution: z
        .string()
        .describe(
            "The name of the institution, e.g. Massachusetts Institute of Technology",
        ),

    /** URL to the institution's website */
    url: z.string().optional().describe("URL to the institution's website"),

    /** The area of study, e.g. Computer Science */
    area: z.string().describe("The area of study, e.g. Computer Science"),

    /** The type of study, e.g. Bachelor, Master */
    studyType: z.string().describe("The type of study, e.g. Bachelor, Master"),

    /** The start date of your education */
    startDate: DateSchema.describe("The start date of your education"),

    /** The end date of your education */
    endDate: DateSchema.optional().describe("The end date of your education"),

    /** Your grade point average, e.g. 3.67/4.0 */
    score: z.string().describe("Your grade point average, e.g. 3.67/4.0"),

    /** A list of notable courses or subjects you studied */
    courses: z
        .array(z.string())
        .optional()
        .describe("A list of notable courses or subjects you studied"),
});

/** Schema for validating a user's work experience. */
const WorkSchema = z.object({
    /** The name of the company, e.g. The Daily Bugle */
    name: z.string().describe("The name of the company, e.g. The Daily Bugle"),

    /** The location of the company, e.g. New York, NY */
    location: z
        .string()
        .describe("The location of the company, e.g. New York, NY"),

    /** A brief description of the company */
    description: z
        .string()
        .optional()
        .describe("A brief description of the company"),

    /** Your position at the company, e.g. Photographer */
    position: z
        .string()
        .describe("Your position at the company, e.g. Photographer"),

    /** URL to the company's website */
    url: z.string().optional().describe("URL to the company's website"),

    /** The start date of your employment */
    startDate: DateSchema.describe("The start date of your employment"),

    /** The end date of your employment */
    endDate: DateSchema.optional().describe("The end date of your employment"),

    /** Whether you are currently working here */
    current: z
        .boolean()
        .optional()
        .describe("Whether you are currently working here"),

    /** A summary of your responsibilities at the company */
    summary: z
        .string()
        .optional()
        .describe("A summary of your responsibilities at the company"),

    /** A list of highlights or accomplishments during your time at the company */
    highlights: z
        .array(z.string())
        .optional()
        .describe(
            "A list of highlights or accomplishments during your time at the company",
        ),
});

/** Schema for validating a user's project details. */
const ProjectSchema = z.object({
    /** The name of the project, e.g. Web Shooter */
    name: z.string().describe("The name of the project, e.g. Web Shooter"),

    /** A brief description of the project */
    description: z
        .string()
        .optional()
        .describe("A brief description of the project"),

    /** A list of highlights or features of the project */
    highlights: z
        .array(z.string())
        .optional()
        .describe("A list of highlights or features of the project"),

    /** A list of keywords related to the project */
    keywords: z
        .array(z.string())
        .optional()
        .describe("A list of keywords related to the project"),

    /** The start date of the project */
    startDate: DateSchema.describe("The start date of the project"),

    /** The end date of the project */
    endDate: DateSchema.optional().describe("The end date of the project"),

    /** URL to the project's website or repository */
    url: z
        .string()
        .optional()
        .describe("URL to the project's website or repository"),

    /** Your role in the project, e.g. Team Lead, Developer */
    roles: z
        .array(z.string())
        .optional()
        .describe("Your role in the project, e.g. Team Lead, Developer"),

    /** The entity or organization associated with the project */
    entity: z
        .string()
        .optional()
        .describe("The entity or organization associated with the project"),

    /** The type of project, e.g. Application, Presentation */
    type: z
        .string()
        .optional()
        .describe("The type of project, e.g. Application, Presentation"),
});

/** Schema for validating a user's skill details. */
const SkillSchema = z.object({
    /** The name of the skill, e.g. Web Development */
    name: z
        .string()
        .optional()
        .describe("The name of the skill, e.g. Web Development"),

    /** The level of proficiency in the skill, e.g. Advanced, Intermediate */
    level: z
        .string()
        .optional()
        .describe(
            "The level of proficiency in the skill, e.g. Advanced, Intermediate",
        ),

    /** A list of keywords related to the skill, e.g. HTML, CSS, JavaScript */
    keywords: z
        .array(z.string())
        .optional()
        .describe(
            "A list of keywords related to the skill, e.g. HTML, CSS, JavaScript",
        ),
});

/** Schema for validating a user's certificate details. */
const CertificateSchema = z.object({
    /** The name of the certificate, e.g. Licensed Avenger */
    name: z
        .string()
        .describe("The name of the certificate, e.g. Licensed Avenger"),

    /** The date the certificate was issued */
    date: DateSchema.describe("The date the certificate was issued"),

    /** URL to the certificate or the issuing authority */
    url: z
        .string()
        .optional()
        .describe("URL to the certificate or the issuing authority"),

    /** The issuer of the certificate, e.g. S.H.I.E.L.D. */
    issuer: z
        .string()
        .describe("The issuer of the certificate, e.g. S.H.I.E.L.D."),
});

/** Schema for validating a user's publication details. */
const PublicationSchema = z.object({
    /** The name of the publication, e.g. Mechanics of Web Shooter Fluid */
    name: z
        .string()
        .describe(
            "The name of the publication, e.g. Mechanics of Web Shooter Fluid",
        ),

    /** The publisher of the publication, e.g. S.H.I.E.L.D., Journal of Superhero Sciences */
    publisher: z
        .string()
        .describe(
            "The publisher of the publication, e.g. S.H.I.E.L.D., Journal of Superhero Sciences",
        ),

    /** The release date of the publication */
    releaseDate: DateSchema.describe("The release date of the publication"),

    /** URL to the publication */
    url: z.string().optional().describe("URL to the publication"),

    /** A brief summary of the publication */
    summary: z
        .string()
        .optional()
        .describe("A brief summary of the publication"),
});

/** Schema for validating a user's award details. */
const AwardSchema = z.object({
    /** The title of the award, e.g. Best Superhero of the Year */
    title: z
        .string()
        .describe("The title of the award, e.g. Best Superhero of the Year"),

    /** The date the award was received */
    date: DateSchema.describe("The date the award was received"),

    /** The organization that awarded it, e.g. S.H.I.E.L.D. */
    awarder: z
        .string()
        .describe("The organization that awarded it, e.g. S.H.I.E.L.D."),

    /** A brief summary of the award */
    summary: z.string().optional().describe("A brief summary of the award"),
});

/** Schema for validating a user's volunteer experience. */
const VolunteerSchema = z.object({
    /** The name of the organization, e.g. Avengers Initiative */
    organization: z
        .string()
        .describe("The name of the organization, e.g. Avengers Initiative"),

    /** Your position in the organization, e.g. Volunteer, Coordinator */
    position: z
        .string()
        .describe(
            "Your position in the organization, e.g. Volunteer, Coordinator",
        ),

    /** URL to the organization's website */
    url: z.string().optional().describe("URL to the organization's website"),

    /** The start date of your volunteer work */
    startDate: DateSchema.describe("The start date of your volunteer work"),

    /** The end date of your volunteer work */
    endDate: DateSchema.optional().describe(
        "The end date of your volunteer work",
    ),

    /** A summary of your responsibilities during your volunteer work */
    summary: z
        .string()
        .optional()
        .describe(
            "A summary of your responsibilities during your volunteer work",
        ),

    /** A list of highlights or accomplishments during your volunteer work */
    highlights: z
        .array(z.string())
        .optional()
        .describe(
            "A list of highlights or accomplishments during your volunteer work",
        ),
});

/** Schema for validating a user's language details. */
const LanguageSchema = z.object({
    /** The name of the language, e.g. English, Spanish */
    language: z
        .string()
        .describe("The name of the language, e.g. English, Spanish"),

    /** The level of fluency in the language, e.g. Fluent, Beginner */
    fluency: z
        .string()
        .optional()
        .describe(
            "The level of fluency in the language, e.g. Fluent, Beginner",
        ),
});

/** Schema for validating a user's interest details. */
const InterestSchema = z.object({
    /** The name of the interest, e.g. Mathematics, Physics */
    name: z
        .string()
        .describe("The name of the interest, e.g. Mathematics, Physics"),

    /** A list of keywords related to the interest, e.g. Calculus, Quantum Mechanics */
    keywords: z
        .array(z.string())
        .optional()
        .describe(
            "A list of keywords related to the interest, e.g. Calculus, Quantum Mechanics",
        ),
});

/** Schema for validating a user's reference details. */
const ReferenceSchema = z.object({
    /** The name of the person giving the reference, e.g. Tony Stark */
    name: z
        .string()
        .describe(
            "The name of the person giving the reference, e.g. Tony Stark",
        ),

    /** The reference text, e.g. Peter Parker is a dedicated and talented individual who excels in his work. */
    reference: z
        .string()
        .optional()
        .describe(
            "The reference text, e.g. Peter Parker is a dedicated and talented individual who excels in his work.",
        ),
});

/** Schema for validating the meta information of a resume json. */
const MetaSchema = z.object({
    /** The canonical URL to the latest version of this document */
    canonical: z
        .string()
        .optional()
        .describe("The canonical URL to the latest version of this document"),

    /** The version of the resume schema, following semantic versioning (semver) */
    version: z
        .string()
        .optional()
        .describe(
            "The version of the resume schema, following semantic versioning (semver)",
        ),

    /** The last modified date of the resume in ISO 8601 format */
    lastModified: z
        .string()
        .datetime()
        .optional()
        .describe("The last modified date of the resume in ISO 8601 format"),
});

/**
 * Schema for validating a resume following the [JSON Resume Schema](https://jsonresume.org/schema/).
 */
export const ResumeSchema = z.object({
    /** The version of the schema used to validate the resume */
    $schema: z
        .string()
        .optional()
        .describe(
            "link to the version of the schema that can validate the resume",
        ),

    /** Your personal details */
    basics: BasicsSchema.describe("Your personal details"),

    /** Your education details */
    education: z
        .array(EducationSchema)
        .optional()
        .describe("Your education details"),

    /** Your work experience */
    work: z.array(WorkSchema).optional().describe("Your work experience"),

    /** Your projects */
    projects: z.array(ProjectSchema).optional().describe("Your projects"),

    /** Your skills */
    skills: z.array(SkillSchema).optional().describe("Your skills"),

    /** Your certificates */
    certificates: z
        .array(CertificateSchema)
        .optional()
        .describe("Your certificates"),

    /** Your publications */
    publications: z
        .array(PublicationSchema)
        .optional()
        .describe("Your publications"),

    /** Your awards */
    awards: z.array(AwardSchema).optional().describe("Your awards"),

    /** Your volunteer experiences */
    volunteer: z
        .array(VolunteerSchema)
        .optional()
        .describe("Your volunteer experiences"),

    /** Your languages */
    languages: z
        .array(LanguageSchema)
        .optional()
        .describe("Languages you speak"),

    /** Your interests */
    interests: z.array(InterestSchema).optional().describe("Your interests"),

    /** Your references */
    references: z.array(ReferenceSchema).optional().describe("Your references"),

    /** Meta information about the resume schema */
    meta: MetaSchema.optional().describe(
        "Meta information about the resume schema",
    ),
});

export type Resume = z.infer<typeof ResumeSchema>;
