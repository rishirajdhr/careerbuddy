"use client";

import { format } from "date-fns";
import {
    AlertCircle,
    CalendarIcon,
    CheckCircle,
    Clock,
    XCircle,
    ExternalLink,
    MapPin,
    Edit,
    Trash2,
    ChevronUp,
    ChevronDown,
    MessageSquare,
    FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Application, statusColors } from "../types";

interface ApplicationCardProps {
    app: Application;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onGenerateQuestions: () => void;
    onDownloadResume: () => void;
}

const statusIcons = {
    Applied: AlertCircle,
    "Under Review": Clock,
    "Interview Scheduled": CalendarIcon,
    "Offer Received": CheckCircle,
    Rejected: XCircle,
};

function Info({
    icon: Icon,
    children,
}: {
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Icon className="h-4 w-4" />
            <span>{children}</span>
        </div>
    );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="text-sm text-gray-900">{children}</dd>
        </div>
    );
}

export function ApplicationCard({
    app,
    isExpanded,
    onToggleExpand,
    onEdit,
    onDelete,
    onGenerateQuestions,
    onDownloadResume,
}: ApplicationCardProps) {
    const StatusIcon = statusIcons[app.status as keyof typeof statusIcons] || AlertCircle;

    return (
        <Card className="py-2 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
                <div className="px-6 py-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            {/* Company name as header */}
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {app.company}
                            </h3>
                            {/* Role as sub-header */}
                            <p className="text-lg text-gray-700 mb-3">
                                {app.position}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <Info icon={MapPin}>{app.location}</Info>
                                <Info icon={CalendarIcon}>
                                    Applied {format(new Date(app.appliedDate), "MMM dd, yyyy")}
                                </Info>
                                <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                                    <StatusIcon className="h-3 w-3 mr-1" />
                                    {app.status}
                                </Badge>
                            </div>

                            {isExpanded && (
                                <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Detail label="Application Method">
                                            {app.applicationMethod}
                                        </Detail>
                                        <Detail label="Salary Range">
                                            {app.salary || "Not specified"}
                                        </Detail>
                                        <Detail label="Next Action">
                                            {app.nextAction || "None"}
                                        </Detail>
                                        <Detail label="Next Action Date">
                                            {app.nextActionDate ? format(new Date(app.nextActionDate), "MMM dd, yyyy") : "Not set"}
                                        </Detail>
                                    </div>

                                    {app.notes && (
                                        <Detail label="Notes">
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                {app.notes}
                                            </p>
                                        </Detail>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {app.jobUrl && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(app.jobUrl, "_blank")}
                                            >
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                View Job
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={onGenerateQuestions}
                                        >
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Generate Questions
                                        </Button>
                                        {app.resumeFile && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={onDownloadResume}
                                            >
                                                <FileText className="h-4 w-4 mr-2" />
                                                Download Resume
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onToggleExpand}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onEdit}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onDelete}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 