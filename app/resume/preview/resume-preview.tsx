import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    Download,
    Edit,
    Mail,
    Phone,
    MapPin,
    Globe,
    Github,
    ExternalLink,
} from "lucide-react";
import { Resume } from "@/lib/schema";

interface ResumePreviewProps {
    resumeData: Resume;
    onBack: () => void;
}

export function ResumePreview({ resumeData, onBack }: ResumePreviewProps) {
    const handleDownload = () => {
        // TODO: Implement PDF download functionality
        console.log("Downloading resume...");
    };

    const handleEdit = () => {
        onBack();
    };

    const { basics, work, skills, projects, education } = resumeData;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold">Your Resume</h3>
                    <p className="text-sm text-muted-foreground">
                        Review and download your tailored resume
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="bg-white p-8 font-serif shadow-lg">
                {/* Header */}
                {basics && (
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold">{basics.name}</h1>
                        <div className="flex justify-center items-center space-x-4 mt-2 text-sm">
                            {basics.location?.address && (
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {basics.location.address}
                                </div>
                            )}
                            {basics.email && (
                                <div className="flex items-center">
                                    <Mail className="h-4 w-4 mr-1" />
                                    <a
                                        href={`mailto:${basics.email}`}
                                        className="hover:underline"
                                    >
                                        {basics.email}
                                    </a>
                                </div>
                            )}
                            {basics.phone && (
                                <div className="flex items-center">
                                    <Phone className="h-4 w-4 mr-1" />
                                    {basics.phone}
                                </div>
                            )}
                            {basics.url && (
                                <div className="flex items-center">
                                    <Globe className="h-4 w-4 mr-1" />
                                    <a
                                        href={basics.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {basics.url}
                                    </a>
                                </div>
                            )}
                            {basics.profiles?.map((profile, index) => (
                                <div key={index} className="flex items-center">
                                    <Github className="h-4 w-4 mr-1" />
                                    <a
                                        href={profile.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {profile.username}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Summary */}
                {basics?.summary && (
                    <div className="mb-8">
                        <p className="text-gray-700 text-justify">
                            {basics.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {work && work.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {work.map((job, index) => (
                                <div key={index}>
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-semibold">
                                            {job.position}
                                        </h3>
                                        <div className="text-gray-600">
                                            {job.startDate} -{" "}
                                            {job.endDate || "Present"}
                                        </div>
                                    </div>
                                    <h4 className="text-lg italic text-gray-700">
                                        {job.name}
                                    </h4>
                                    <p className="mt-2 text-gray-700">
                                        {job.summary}
                                    </p>
                                    {job.highlights && job.highlights.length > 0 && (
                                        <ul className="list-disc list-inside mt-2 text-gray-700">
                                            {job.highlights.map(
                                                (highlight, i) => (
                                                    <li key={i}>{highlight}</li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
                            Education
                        </h2>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-semibold">
                                        {edu.institution}
                                    </h3>
                                    <p className="text-gray-700">
                                        {edu.studyType} in {edu.area}
                                    </p>
                                    {edu.score && (
                                        <p className="text-sm text-gray-600">
                                            GPA: {edu.score}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        {edu.startDate} -{" "}
                                        {edu.endDate || "Present"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
                            Projects
                        </h2>
                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-semibold">
                                        {project.name}
                                    </h3>
                                    {project.url && (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                    <p className="mt-2 text-gray-700">
                                        {project.description}
                                    </p>
                                    {project.highlights &&
                                        project.highlights.length > 0 && (
                                            <ul className="list-disc list-inside mt-2 text-gray-700">
                                                {project.highlights.map(
                                                    (highlight, i) => (
                                                        <li key={i}>
                                                            {highlight}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Awards */}
                {resumeData.awards && resumeData.awards.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
                            Awards
                        </h2>
                        <div className="space-y-4">
                            {resumeData.awards.map((award, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-semibold">
                                        {award.title}
                                    </h3>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>{award.awarder}</span>
                                        <span>{award.date}</span>
                                    </div>
                                    {award.summary && (
                                        <p className="mt-2 text-gray-700">
                                            {award.summary}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Publications */}
                {resumeData.publications &&
                    resumeData.publications.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
                                Publications
                            </h2>
                            <div className="space-y-4">
                                {resumeData.publications.map(
                                    (publication, index) => (
                                        <div key={index}>
                                            <h3 className="text-xl font-semibold">
                                                {publication.name}
                                            </h3>
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>
                                                    {publication.publisher}
                                                </span>
                                                <span>
                                                    {publication.releaseDate}
                                                </span>
                                            </div>
                                            {publication.summary && (
                                                <p className="mt-2 text-gray-700">
                                                    {publication.summary}
                                                </p>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                {/* Volunteer */}
                {resumeData.volunteer && resumeData.volunteer.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
                            Volunteer
                        </h2>
                        <div className="space-y-6">
                            {resumeData.volunteer.map((volunteer, index) => (
                                <div key={index}>
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-semibold">
                                            {volunteer.position}
                                        </h3>
                                        <div className="text-gray-600">
                                            {volunteer.startDate} -{" "}
                                            {volunteer.endDate || "Present"}
                                        </div>
                                    </div>
                                    <h4 className="text-lg italic text-gray-700">
                                        {volunteer.organization}
                                    </h4>
                                    <p className="mt-2 text-gray-700">
                                        {volunteer.summary}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
                            Skills
                        </h2>
                        <div className="text-gray-700">
                            {skills
                                .flatMap((skill) => {
                                    if (!skill.name) return [];
                                    const match = skill.name.match(/\\(([^)]+)\\)/);
                                    if (match) {
                                        return match[1].split(/,\\s*/);
                                    }
                                    return [skill.name];
                                })
                                .join(", ")}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-start border-t pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex items-center space-x-2"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back to Edit</span>
                </Button>
            </div>
        </div>
    );
}
