import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Download, Edit } from "lucide-react";
import { Resume } from "@/lib/schema";

interface ResumePreviewProps {
    resumeData: Resume;
    jobDescription: string;
    onBack: () => void;
}

export function ResumePreview({
    resumeData,
    jobDescription,
    onBack,
}: ResumePreviewProps) {
    const handleDownload = () => {
        // TODO: Implement PDF download functionality
        console.log("Downloading resume...");
    };

    const handleEdit = () => {
        onBack();
    };

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

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Resume Preview */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Resume Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Basic Info */}
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {resumeData.basics?.name || "Your Name"}
                                </h2>
                                <p className="text-gray-600">
                                    {resumeData.basics?.label ||
                                        "Professional Title"}
                                </p>
                                <div className="mt-2 text-sm text-gray-500">
                                    {resumeData.basics?.email && (
                                        <div>{resumeData.basics.email}</div>
                                    )}
                                    {resumeData.basics?.phone && (
                                        <div>{resumeData.basics.phone}</div>
                                    )}
                                    {resumeData.basics?.location && (
                                        <div>
                                            {[
                                                resumeData.basics.location.city,
                                                resumeData.basics.location
                                                    .region,
                                                resumeData.basics.location
                                                    .countryCode,
                                            ]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Summary */}
                            {resumeData.basics?.summary && (
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Summary
                                    </h3>
                                    <p className="text-gray-700">
                                        {resumeData.basics.summary}
                                    </p>
                                </div>
                            )}

                            {/* Experience */}
                            {resumeData.work && resumeData.work.length > 0 && (
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Experience
                                    </h3>
                                    <div className="space-y-3">
                                        {resumeData.work.map((work, index) => (
                                            <div
                                                key={index}
                                                className="border-l-2 border-gray-200 pl-4"
                                            >
                                                <h4 className="font-medium">
                                                    {work.position}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {work.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {work.startDate} -{" "}
                                                    {work.endDate || "Present"}
                                                </p>
                                                {work.summary && (
                                                    <p className="mt-1 text-sm text-gray-700">
                                                        {work.summary}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education */}
                            {resumeData.education &&
                                resumeData.education.length > 0 && (
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">
                                            Education
                                        </h3>
                                        <div className="space-y-3">
                                            {resumeData.education.map(
                                                (edu, index) => (
                                                    <div
                                                        key={index}
                                                        className="border-l-2 border-gray-200 pl-4"
                                                    >
                                                        <h4 className="font-medium">
                                                            {edu.studyType} in{" "}
                                                            {edu.area}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {edu.institution}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {edu.startDate} -{" "}
                                                            {edu.endDate}
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Skills */}
                            {resumeData.skills &&
                                resumeData.skills.length > 0 && (
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">
                                            Skills
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {resumeData.skills.map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                                                    >
                                                        {skill.name}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                    </CardContent>
                </Card>

                {/* Job Description */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Target Job Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm whitespace-pre-wrap text-gray-700">
                                {jobDescription ||
                                    "No job description provided"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-start border-t pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex items-center space-x-2"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back to Job Description</span>
                </Button>
            </div>
        </div>
    );
}
