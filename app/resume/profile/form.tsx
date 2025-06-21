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
    RotateCcw,
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
    WorkLocationField,
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
    SkillsSearchField,
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
import {
    InterestNameField,
    InterestKeywordsField,
    InterestsSearchField,
} from "./fields/interests";
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
import { profileFormDefaultValues } from "./default-values";

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
                    <AccordionTrigger className="px-6 py-4 text-xl font-semibold hover:no-underline [&>svg]:mt-2 [&>svg]:size-6">
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
    removeAction: "clear" | "delete";
}

function ProfileSectionEntry({
    title,
    onRemove,
    children,
    removeAction,
}: ProfileSectionEntryProps) {
    const isClearAction = removeAction === "clear";
    const tooltipText = isClearAction ? "Reset item" : "Remove item";
    const icon = isClearAction ? (
        <RotateCcw className="h-4 w-4" />
    ) : (
        <Trash2 className="h-4 w-4" />
    );

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
                                    {icon}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{tooltipText}</p>
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

    const addExperience = () => {
        if (profileFormDefaultValues.work?.[0]) {
            append(profileFormDefaultValues.work[0]);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            if (profileFormDefaultValues.work?.[0]) {
                form.setValue(
                    `work.${index}`,
                    profileFormDefaultValues.work[0],
                );
            }
        }
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
                        onRemove={() => handleRemove(index)}
                        removeAction={fields.length > 1 ? "delete" : "clear"}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <PositionField index={index} />
                            <CompanyNameField index={index} />
                            <WorkStartDateField index={index} />
                            <WorkEndDateField index={index} />
                            <WorkLocationField index={index} />
                            <WorkSummaryField index={index} />
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

    const addEducation = () => {
        if (profileFormDefaultValues.education?.[0]) {
            append(profileFormDefaultValues.education[0]);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            if (profileFormDefaultValues.education?.[0]) {
                form.setValue(
                    `education.${index}`,
                    profileFormDefaultValues.education[0],
                );
            }
        }
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
                        onRemove={() => handleRemove(index)}
                        removeAction={fields.length > 1 ? "delete" : "clear"}
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
    return (
        <ProfileSection
            id="skills"
            title="Skills"
            description="Your technical and professional skills"
            icon={<Code className="h-5 w-5" />}
        >
            <SkillsSearchField />
        </ProfileSection>
    );
}

function Projects() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "projects",
    });

    const addProject = () => {
        if (profileFormDefaultValues.projects?.[0]) {
            append(profileFormDefaultValues.projects[0]);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            if (profileFormDefaultValues.projects?.[0]) {
                form.setValue(
                    `projects.${index}`,
                    profileFormDefaultValues.projects[0],
                );
            }
        }
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
                        onRemove={() => handleRemove(index)}
                        removeAction={fields.length > 1 ? "delete" : "clear"}
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

    const addCertification = () => {
        if (profileFormDefaultValues.certificates?.[0]) {
            append(profileFormDefaultValues.certificates[0]);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            if (profileFormDefaultValues.certificates?.[0]) {
                form.setValue(
                    `certificates.${index}`,
                    profileFormDefaultValues.certificates[0],
                );
            }
        }
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
                        onRemove={() => handleRemove(index)}
                        removeAction={fields.length > 1 ? "delete" : "clear"}
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

    const addAward = () => {
        if (profileFormDefaultValues.awards?.[0]) {
            append(profileFormDefaultValues.awards[0]);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            if (profileFormDefaultValues.awards?.[0]) {
                form.setValue(
                    `awards.${index}`,
                    profileFormDefaultValues.awards[0],
                );
            }
        }
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
                        onRemove={() => handleRemove(index)}
                        removeAction={fields.length > 1 ? "delete" : "clear"}
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
    return (
        <ProfileSection
            id="interests"
            title="Interests"
            description="Your hobbies and personal interests"
            icon={<Heart className="h-5 w-5" />}
        >
            <InterestsSearchField />
        </ProfileSection>
    );
}

function Languages() {
    const form = useFormContext<Resume>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "languages",
    });

    const addLanguage = () => {
        if (profileFormDefaultValues.languages?.[0]) {
            append(profileFormDefaultValues.languages[0]);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            if (profileFormDefaultValues.languages?.[0]) {
                form.setValue(
                    `languages.${index}`,
                    profileFormDefaultValues.languages[0],
                );
            }
        }
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
                        onRemove={() => handleRemove(index)}
                        removeAction={fields.length > 1 ? "delete" : "clear"}
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

    const addPublication = () => {
        if (profileFormDefaultValues.publications?.[0]) {
            append(profileFormDefaultValues.publications[0]);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            if (profileFormDefaultValues.publications?.[0]) {
                form.setValue(
                    `publications.${index}`,
                    profileFormDefaultValues.publications[0],
                );
            }
        }
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
                        onRemove={() => handleRemove(index)}
                        removeAction={fields.length > 1 ? "delete" : "clear"}
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

    const addVolunteer = () => {
        if (profileFormDefaultValues.volunteer?.[0]) {
            append(profileFormDefaultValues.volunteer[0]);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            if (profileFormDefaultValues.volunteer?.[0]) {
                form.setValue(
                    `volunteer.${index}`,
                    profileFormDefaultValues.volunteer[0],
                );
            }
        }
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
                        onRemove={() => handleRemove(index)}
                        removeAction={fields.length > 1 ? "delete" : "clear"}
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
