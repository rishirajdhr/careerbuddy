import React, { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Resume, ResumeSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ChevronRight,
    Plus,
    Trash2,
    Building,
    GraduationCap,
    Code,
    Award,
    Heart,
    Languages as LanguagesIcon,
    BookOpen,
    Users,
    FileText,
    User,
} from "lucide-react";
import {
    useForm,
    FormProvider,
    useFieldArray,
    useFormContext,
} from "react-hook-form";
import {
    NameField,
    EmailField,
    PhoneField,
    LocationField,
    WebsiteField,
    LinkedInField,
    SummaryField,
} from "./fields";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ProfileFormProps {
    data: Resume;
    onUpdate: (data: Partial<Resume>) => void;
    onNext: (data: Resume) => void;
}

interface ProfileSectionProps {
    id: string;
    title: string;
    description: string;
    icon: ReactNode;
    children: ReactNode;
}

function ProfileSection({
    id,
    title,
    description,
    icon,
    children,
}: ProfileSectionProps) {
    return (
        <Card id={id} className="py-2">
            <Accordion
                type="single"
                collapsible
                defaultValue={id}
                className="w-full"
            >
                <AccordionItem value={id}>
                    <AccordionTrigger className="[&>svg]:m px-6 py-4 text-xl font-semibold hover:no-underline [&>svg]:size-6">
                        <div className="flex items-center gap-3">
                            <div className="grid size-12 place-items-center rounded-full bg-blue-600 text-white">
                                {icon}
                            </div>
                            <div className="text-left">
                                <div>{title}</div>
                                <div className="text-sm font-normal text-muted-foreground">
                                    {description}
                                </div>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-6 px-6 pt-4 pb-6">
                            {children}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}

interface ProfileSectionEntryProps {
    title: string;
    onRemove: () => void;
    children: ReactNode;
}

function ProfileSectionEntry({
    title,
    onRemove,
    children,
}: ProfileSectionEntryProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-colors hover:bg-gray-50">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{title}</h3>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    className="text-gray-400 hover:text-red-500"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function PersonalInformation() {
    return (
        <ProfileSection
            id="personal"
            title="Personal Information"
            description="Tell us about yourself"
            icon={<User className="h-5 w-5" />}
        >
            <div className="grid grid-cols-2 gap-6">
                <NameField />
                <EmailField />
                <PhoneField />
                <LocationField />
                <WebsiteField />
                <LinkedInField />
                <SummaryField />
            </div>
        </ProfileSection>
    );
}

function WorkExperience() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "work",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addExperience();
        }
    }, [fields, append]);

    const addExperience = () => {
        append({
            name: "",
            position: "",
            startDate: "",
            endDate: "",
            summary: "",
            highlights: [],
        });
    };

    return (
        <ProfileSection
            id="work"
            title="Work Experience"
            description="Your professional work history"
            icon={<Building className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Work Experience ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`work.${index}.position`}>
                                    Job Title
                                </Label>
                                <Input
                                    id={`work.${index}.position`}
                                    placeholder="e.g., Senior Software Engineer"
                                    {...form.register(`work.${index}.position`)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`work.${index}.name`}>
                                    Company
                                </Label>
                                <Input
                                    id={`work.${index}.name`}
                                    placeholder="e.g., TechCorp Inc."
                                    {...form.register(`work.${index}.name`)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`work.${index}.startDate`}>
                                    Start Date
                                </Label>
                                <Input
                                    id={`work.${index}.startDate`}
                                    placeholder="e.g., 2022-01"
                                    {...form.register(
                                        `work.${index}.startDate`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`work.${index}.endDate`}>
                                    End Date
                                </Label>
                                <Input
                                    id={`work.${index}.endDate`}
                                    placeholder="Present"
                                    {...form.register(`work.${index}.endDate`)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor={`work.${index}.summary`}>
                                Summary
                            </Label>
                            <Textarea
                                id={`work.${index}.summary`}
                                placeholder="Describe your key responsibilities and achievements..."
                                rows={4}
                                {...form.register(`work.${index}.summary`)}
                            />
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>

            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addExperience}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                </Button>
            </div>
        </ProfileSection>
    );
}

function Education() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "education",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addEducation();
        }
    }, [fields, append]);

    const addEducation = () => {
        append({
            institution: "",
            area: "",
            studyType: "",
            startDate: "",
            endDate: "",
            score: "",
            courses: [],
        });
    };

    return (
        <ProfileSection
            id="education"
            title="Education"
            description="Your educational background"
            icon={<GraduationCap className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Education ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`education.${index}.studyType`}>
                                    Degree Type
                                </Label>
                                <Input
                                    id={`education.${index}.studyType`}
                                    placeholder="e.g., Bachelor's"
                                    {...form.register(
                                        `education.${index}.studyType`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`education.${index}.area`}>
                                    Field of Study
                                </Label>
                                <Input
                                    id={`education.${index}.area`}
                                    placeholder="e.g., Computer Science"
                                    {...form.register(
                                        `education.${index}.area`,
                                    )}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label
                                    htmlFor={`education.${index}.institution`}
                                >
                                    Institution
                                </Label>
                                <Input
                                    id={`education.${index}.institution`}
                                    placeholder="e.g., University of Technology"
                                    {...form.register(
                                        `education.${index}.institution`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`education.${index}.score`}>
                                    GPA (Optional)
                                </Label>
                                <Input
                                    id={`education.${index}.score`}
                                    placeholder="e.g., 3.8"
                                    {...form.register(
                                        `education.${index}.score`,
                                    )}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`education.${index}.startDate`}>
                                    Start Date
                                </Label>
                                <Input
                                    id={`education.${index}.startDate`}
                                    placeholder="e.g., 2018-09"
                                    {...form.register(
                                        `education.${index}.startDate`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`education.${index}.endDate`}>
                                    End Date
                                </Label>
                                <Input
                                    id={`education.${index}.endDate`}
                                    placeholder="e.g., 2022-05"
                                    {...form.register(
                                        `education.${index}.endDate`,
                                    )}
                                />
                            </div>
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addEducation}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                </Button>
            </div>
        </ProfileSection>
    );
}

function Skills() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "skills",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addSkill();
        }
    }, [fields, append]);

    const addSkill = () => {
        append({ name: "", level: "", keywords: [] });
    };

    return (
        <ProfileSection
            id="skills"
            title="Skills"
            description="Your technical and professional skills"
            icon={<Code className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Skill ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`skills.${index}.name`}>
                                    Skill Name
                                </Label>
                                <Input
                                    id={`skills.${index}.name`}
                                    placeholder="e.g., JavaScript"
                                    {...form.register(`skills.${index}.name`)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`skills.${index}.level`}>
                                    Proficiency Level
                                </Label>
                                <Input
                                    id={`skills.${index}.level`}
                                    placeholder="e.g., Advanced, Intermediate"
                                    {...form.register(`skills.${index}.level`)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor={`skills.${index}.keywords`}>
                                Keywords (Optional)
                            </Label>
                            <Input
                                id={`skills.${index}.keywords`}
                                placeholder="e.g., React, Node.js, TypeScript (comma separated)"
                                {...form.register(`skills.${index}.keywords`)}
                            />
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addSkill}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                </Button>
            </div>
        </ProfileSection>
    );
}

function Projects() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "projects",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addProject();
        }
    }, [fields, append]);

    const addProject = () => {
        append({ name: "", description: "", url: "", keywords: [] });
    };

    return (
        <ProfileSection
            id="projects"
            title="Projects"
            description="Your notable projects and contributions"
            icon={<Code className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Project ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div>
                            <Label htmlFor={`projects.${index}.name`}>
                                Project Name
                            </Label>
                            <Input
                                id={`projects.${index}.name`}
                                placeholder="e.g., E-commerce Platform"
                                {...form.register(`projects.${index}.name`)}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`projects.${index}.description`}>
                                Description
                            </Label>
                            <Textarea
                                id={`projects.${index}.description`}
                                placeholder="Describe the project..."
                                rows={3}
                                {...form.register(
                                    `projects.${index}.description`,
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`projects.${index}.startDate`}>
                                    Start Date
                                </Label>
                                <Input
                                    id={`projects.${index}.startDate`}
                                    placeholder="e.g., 2023-01"
                                    {...form.register(
                                        `projects.${index}.startDate`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`projects.${index}.endDate`}>
                                    End Date
                                </Label>
                                <Input
                                    id={`projects.${index}.endDate`}
                                    placeholder="e.g., 2023-06"
                                    {...form.register(
                                        `projects.${index}.endDate`,
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor={`projects.${index}.url`}>
                                Project URL (Optional)
                            </Label>
                            <Input
                                id={`projects.${index}.url`}
                                placeholder="https://github.com/username/project"
                                {...form.register(`projects.${index}.url`)}
                            />
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addProject}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                </Button>
            </div>
        </ProfileSection>
    );
}

function Certifications() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "certificates",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addCertification();
        }
    }, [fields, append]);

    const addCertification = () => {
        append({ name: "", date: "", issuer: "", url: "" });
    };

    return (
        <ProfileSection
            id="certificates"
            title="Certifications"
            description="Your professional certifications"
            icon={<Award className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Certification ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`certificates.${index}.name`}>
                                    Certification Name
                                </Label>
                                <Input
                                    id={`certificates.${index}.name`}
                                    placeholder="e.g., AWS Certified Solutions Architect"
                                    {...form.register(
                                        `certificates.${index}.name`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`certificates.${index}.issuer`}>
                                    Issuing Organization
                                </Label>
                                <Input
                                    id={`certificates.${index}.issuer`}
                                    placeholder="e.g., Amazon Web Services"
                                    {...form.register(
                                        `certificates.${index}.issuer`,
                                    )}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`certificates.${index}.date`}>
                                    Date Earned
                                </Label>
                                <Input
                                    id={`certificates.${index}.date`}
                                    placeholder="e.g., 2023-03"
                                    {...form.register(
                                        `certificates.${index}.date`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`certificates.${index}.url`}>
                                    Certificate URL (Optional)
                                </Label>
                                <Input
                                    id={`certificates.${index}.url`}
                                    placeholder="https://credly.com/badges/..."
                                    {...form.register(
                                        `certificates.${index}.url`,
                                    )}
                                />
                            </div>
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button
                    type="button"
                    variant="outline"
                    onClick={addCertification}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                </Button>
            </div>
        </ProfileSection>
    );
}

function Awards() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "awards",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addAward();
        }
    }, [fields, append]);

    const addAward = () => {
        append({ title: "", date: "", awarder: "", summary: "" });
    };

    return (
        <ProfileSection
            id="awards"
            title="Awards"
            description="Your achievements and recognitions"
            icon={<Award className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Award ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`awards.${index}.title`}>
                                    Award Title
                                </Label>
                                <Input
                                    id={`awards.${index}.title`}
                                    placeholder="e.g., Employee of the Year"
                                    {...form.register(`awards.${index}.title`)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`awards.${index}.awarder`}>
                                    Awarding Organization
                                </Label>
                                <Input
                                    id={`awards.${index}.awarder`}
                                    placeholder="e.g., TechCorp Inc."
                                    {...form.register(
                                        `awards.${index}.awarder`,
                                    )}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`awards.${index}.date`}>
                                    Date Received
                                </Label>
                                <Input
                                    id={`awards.${index}.date`}
                                    placeholder="e.g., 2023-12"
                                    {...form.register(`awards.${index}.date`)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor={`awards.${index}.summary`}>
                                Description
                            </Label>
                            <Textarea
                                id={`awards.${index}.summary`}
                                placeholder="Describe the award and its significance..."
                                rows={3}
                                {...form.register(`awards.${index}.summary`)}
                            />
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addAward}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Award
                </Button>
            </div>
        </ProfileSection>
    );
}

function Interests() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "interests",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addInterest();
        }
    }, [fields, append]);

    const addInterest = () => {
        append({ name: "", keywords: [] });
    };

    return (
        <ProfileSection
            id="interests"
            title="Interests"
            description="Your hobbies and personal interests"
            icon={<Heart className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Interest ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div>
                            <Label htmlFor={`interests.${index}.name`}>
                                Interest Name
                            </Label>
                            <Input
                                id={`interests.${index}.name`}
                                placeholder="e.g., Photography"
                                {...form.register(`interests.${index}.name`)}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`interests.${index}.keywords`}>
                                Keywords
                            </Label>
                            <Input
                                id={`interests.${index}.keywords`}
                                placeholder="e.g., landscape, portrait, digital (comma separated)"
                                {...form.register(
                                    `interests.${index}.keywords`,
                                )}
                            />
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addInterest}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Interest
                </Button>
            </div>
        </ProfileSection>
    );
}

function Languages() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "languages",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addLanguage();
        }
    }, [fields, append]);

    const addLanguage = () => {
        append({ language: "", fluency: "" });
    };

    return (
        <ProfileSection
            id="languages"
            title="Languages"
            description="Languages you speak and proficiency levels"
            icon={<LanguagesIcon className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Language ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`languages.${index}.language`}>
                                    Language
                                </Label>
                                <Input
                                    id={`languages.${index}.language`}
                                    placeholder="e.g., Spanish"
                                    {...form.register(
                                        `languages.${index}.language`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`languages.${index}.fluency`}>
                                    Proficiency Level
                                </Label>
                                <Input
                                    id={`languages.${index}.fluency`}
                                    placeholder="e.g., Fluent, Intermediate, Basic"
                                    {...form.register(
                                        `languages.${index}.fluency`,
                                    )}
                                />
                            </div>
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addLanguage}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Language
                </Button>
            </div>
        </ProfileSection>
    );
}

function Publications() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "publications",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addPublication();
        }
    }, [fields, append]);

    const addPublication = () => {
        append({
            name: "",
            publisher: "",
            releaseDate: "",
            url: "",
            summary: "",
        });
    };

    return (
        <ProfileSection
            id="publications"
            title="Publications"
            description="Your published works and papers"
            icon={<FileText className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Publication ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div>
                            <Label htmlFor={`publications.${index}.name`}>
                                Publication Title
                            </Label>
                            <Input
                                id={`publications.${index}.name`}
                                placeholder="e.g., Advanced React Patterns"
                                {...form.register(`publications.${index}.name`)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label
                                    htmlFor={`publications.${index}.publisher`}
                                >
                                    Publisher
                                </Label>
                                <Input
                                    id={`publications.${index}.publisher`}
                                    placeholder="e.g., ACM Digital Library"
                                    {...form.register(
                                        `publications.${index}.publisher`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor={`publications.${index}.releaseDate`}
                                >
                                    Release Date
                                </Label>
                                <Input
                                    id={`publications.${index}.releaseDate`}
                                    placeholder="e.g., 2023-06"
                                    {...form.register(
                                        `publications.${index}.releaseDate`,
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor={`publications.${index}.url`}>
                                Publication URL
                            </Label>
                            <Input
                                id={`publications.${index}.url`}
                                placeholder="https://..."
                                {...form.register(`publications.${index}.url`)}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`publications.${index}.summary`}>
                                Summary
                            </Label>
                            <Textarea
                                id={`publications.${index}.summary`}
                                placeholder="Brief description of the publication..."
                                rows={3}
                                {...form.register(
                                    `publications.${index}.summary`,
                                )}
                            />
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button
                    type="button"
                    variant="outline"
                    onClick={addPublication}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Publication
                </Button>
            </div>
        </ProfileSection>
    );
}

function Volunteer() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "volunteer",
    });

    useEffect(() => {
        if (fields.length === 0) {
            addVolunteer();
        }
    }, [fields, append]);

    const addVolunteer = () => {
        append({
            organization: "",
            position: "",
            startDate: "",
            endDate: "",
            summary: "",
            url: "",
        });
    };

    return (
        <ProfileSection
            id="volunteer"
            title="Volunteer Experience"
            description="Your volunteer work and community service"
            icon={<Heart className="h-5 w-5" />}
        >
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ProfileSectionEntry
                        key={field.id}
                        title={`Volunteer Experience ${index + 1}`}
                        onRemove={() => remove(index)}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`volunteer.${index}.position`}>
                                    Position
                                </Label>
                                <Input
                                    id={`volunteer.${index}.position`}
                                    placeholder="e.g., Board Member"
                                    {...form.register(
                                        `volunteer.${index}.position`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor={`volunteer.${index}.organization`}
                                >
                                    Organization
                                </Label>
                                <Input
                                    id={`volunteer.${index}.organization`}
                                    placeholder="e.g., Local Food Bank"
                                    {...form.register(
                                        `volunteer.${index}.organization`,
                                    )}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`volunteer.${index}.startDate`}>
                                    Start Date
                                </Label>
                                <Input
                                    id={`volunteer.${index}.startDate`}
                                    placeholder="e.g., 2022-01"
                                    {...form.register(
                                        `volunteer.${index}.startDate`,
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`volunteer.${index}.endDate`}>
                                    End Date
                                </Label>
                                <Input
                                    id={`volunteer.${index}.endDate`}
                                    placeholder="e.g., 2023-12"
                                    {...form.register(
                                        `volunteer.${index}.endDate`,
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor={`volunteer.${index}.url`}>
                                Organization URL (Optional)
                            </Label>
                            <Input
                                id={`volunteer.${index}.url`}
                                placeholder="https://..."
                                {...form.register(`volunteer.${index}.url`)}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`volunteer.${index}.summary`}>
                                Summary
                            </Label>
                            <Textarea
                                id={`volunteer.${index}.summary`}
                                placeholder="Describe your volunteer work and contributions..."
                                rows={4}
                                {...form.register(`volunteer.${index}.summary`)}
                            />
                        </div>
                    </ProfileSectionEntry>
                ))}
            </div>
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addVolunteer}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Volunteer
                </Button>
            </div>
        </ProfileSection>
    );
}

export const RESUME_SECTIONS = [
    {
        id: "work",
        title: "Work Experience",
        description: "Your professional work history",
        icon: <Building className="h-3 w-3" />,
        component: WorkExperience,
        optional: false,
    },
    {
        id: "education",
        title: "Education",
        description: "Your educational background",
        icon: <GraduationCap className="h-3 w-3" />,
        component: Education,
        optional: false,
    },
    {
        id: "skills",
        title: "Skills",
        description: "Your technical and professional skills",
        icon: <Code className="h-3 w-3" />,
        component: Skills,
        optional: false,
    },
    {
        id: "projects",
        title: "Projects",
        description: "Your notable projects and contributions",
        icon: <Code className="h-3 w-3" />,
        component: Projects,
        optional: false,
    },
    {
        id: "certificates",
        title: "Certifications",
        description: "Your professional certifications",
        icon: <Award className="h-3 w-3" />,
        component: Certifications,
        optional: true,
    },
    {
        id: "awards",
        title: "Awards",
        description: "Your achievements and recognitions",
        icon: <Award className="h-3 w-3" />,
        component: Awards,
        optional: true,
    },
    {
        id: "interests",
        title: "Interests",
        description: "Your hobbies and personal interests",
        icon: <Heart className="h-3 w-3" />,
        component: Interests,
        optional: true,
    },
    {
        id: "languages",
        title: "Languages",
        description: "Languages you speak and proficiency levels",
        icon: <LanguagesIcon className="h-3 w-3" />,
        component: Languages,
        optional: true,
    },
    {
        id: "publications",
        title: "Publications",
        description: "Your published works and papers",
        icon: <FileText className="h-3 w-3" />,
        component: Publications,
        optional: true,
    },
    {
        id: "volunteer",
        title: "Volunteer",
        description: "Your volunteer work and community service",
        icon: <Users className="h-3 w-3" />,
        component: Volunteer,
        optional: true,
    },
];

const SECTIONS_MAP = RESUME_SECTIONS.reduce(
    (acc, section) => {
        acc[section.id] = section.component;
        return acc;
    },
    {} as Record<string, () => React.JSX.Element>,
);

export function ProfileForm({
    data,
    onUpdate,
    onNext,
    enabledSections,
}: ProfileFormProps & { enabledSections: { id: string }[] }) {
    const form = useForm<Resume>({
        resolver: zodResolver(ResumeSchema),
        defaultValues: data,
    });

    const handleSubmit = (formData: Resume) => {
        onUpdate(formData);
        onNext(formData);
    };

    return (
        <div className="mx-auto max-w-4xl">
            <FormProvider {...form}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <PersonalInformation />
                        {enabledSections.map((section) => {
                            const Component = SECTIONS_MAP[section.id];
                            return Component ? (
                                <Component key={section.id} />
                            ) : null;
                        })}
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
        </div>
    );
}
