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
} from "./fields/personal-information";
import {
    PositionField,
    CompanyNameField,
    WorkStartDateField,
    WorkEndDateField,
    WorkSummaryField,
} from "./fields/work";
import {
    DegreeTypeField,
    FieldOfStudyField,
    InstitutionField,
    GpaField,
    EducationStartDateField,
    EducationEndDateField,
} from "./fields/education";
import {
    SkillNameField,
    ProficiencyLevelField,
    SkillKeywordsField,
} from "./fields/skills";
import {
    ProjectNameField,
    ProjectDescriptionField,
    ProjectStartDateField,
    ProjectEndDateField,
    ProjectUrlField,
} from "./fields/projects";
import {
    CertificationNameField,
    IssuerField,
    CertificationDateField,
    CertificationUrlField,
} from "./fields/certifications";
import {
    AwardTitleField,
    AwarderField,
    AwardDateField,
    AwardSummaryField,
} from "./fields/awards";
import { InterestNameField, InterestKeywordsField } from "./fields/interests";
import { LanguageField, FluencyField } from "./fields/languages";
import {
    PublicationNameField,
    PublisherField,
    PublicationReleaseDateField,
    PublicationUrlField,
    PublicationSummaryField,
} from "./fields/publications";
import {
    VolunteerPositionField,
    OrganizationField,
    VolunteerStartDateField,
    VolunteerEndDateField,
    VolunteerUrlField,
    VolunteerSummaryField,
} from "./fields/volunteer";
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <div className="flex flex-row overflow-hidden rounded-lg border border-gray-200 p-0 shadow-2xs transition-shadow duration-300 focus-within:shadow-lg">
            <div className="w-1.5 flex-none bg-blue-600"></div>
            <div className="flex-1 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={onRemove}
                                    className="cursor-pointer text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Remove item</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="space-y-4">{children}</div>
            </div>
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
                            <PositionField index={index} />
                            <CompanyNameField index={index} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <WorkStartDateField index={index} />
                            <WorkEndDateField index={index} />
                        </div>
                        <WorkSummaryField index={index} />
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
                            <DegreeTypeField index={index} />
                            <FieldOfStudyField index={index} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InstitutionField index={index} />
                            <GpaField index={index} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <EducationStartDateField index={index} />
                            <EducationEndDateField index={index} />
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
                            <SkillNameField index={index} />
                            <ProficiencyLevelField index={index} />
                        </div>
                        <SkillKeywordsField index={index} />
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
                        <ProjectNameField index={index} />
                        <ProjectDescriptionField index={index} />
                        <div className="grid grid-cols-2 gap-4">
                            <ProjectStartDateField index={index} />
                            <ProjectEndDateField index={index} />
                        </div>
                        <ProjectUrlField index={index} />
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
                            <CertificationNameField index={index} />
                            <IssuerField index={index} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <CertificationDateField index={index} />
                            <CertificationUrlField index={index} />
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
                            <AwardTitleField index={index} />
                            <AwarderField index={index} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <AwardDateField index={index} />
                        </div>
                        <AwardSummaryField index={index} />
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
                        <InterestNameField index={index} />
                        <InterestKeywordsField index={index} />
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
                            <LanguageField index={index} />
                            <FluencyField index={index} />
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
                        <PublicationNameField index={index} />
                        <div className="grid grid-cols-2 gap-4">
                            <PublisherField index={index} />
                            <PublicationReleaseDateField index={index} />
                        </div>
                        <PublicationUrlField index={index} />
                        <PublicationSummaryField index={index} />
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
                            <VolunteerPositionField index={index} />
                            <OrganizationField index={index} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <VolunteerStartDateField index={index} />
                            <VolunteerEndDateField index={index} />
                        </div>
                        <VolunteerUrlField index={index} />
                        <VolunteerSummaryField index={index} />
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
