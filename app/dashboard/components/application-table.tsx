"use client";

import { format } from "date-fns";
import { Plus, Edit, Trash2, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Application, statusColors } from "../types";

interface ApplicationTableProps {
    applications: Application[];
    onAddApplication: () => void;
    onEditApplication: (app: Application) => void;
    onDeleteApplication: (id: number) => void;
    onGenerateQuestions: (app: Application) => void;
    onDownloadResume: (app: Application) => void;
}

export function ApplicationTable({
    applications,
    onAddApplication,
    onEditApplication,
    onDeleteApplication,
    onGenerateQuestions,
    onDownloadResume,
}: ApplicationTableProps) {
    // Helper function to create a date without timezone issues
    const createLocalDate = (dateString: string): Date => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // month is 0-indexed
    };

    // Helper function to format date consistently
    const formatDateDisplay = (dateString: string): string => {
        const localDate = createLocalDate(dateString);
        return format(localDate, "MMM dd, yyyy");
    };

    if (applications.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-6">Get started by adding your first job application.</p>
                <Button onClick={onAddApplication}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Application
                </Button>
            </div>
        );
    }

    return (
        <TooltipProvider>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company & Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date Added
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {app.company}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {app.position}
                                                </div>
                                            </div>
                                            <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                                                {app.status}
                                            </Badge>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {app.location}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {formatDateDisplay(app.appliedDate)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onEditApplication(app)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Edit application</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onDeleteApplication(app.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Delete application</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onGenerateQuestions(app)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        <MessageSquare className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Generate interview questions</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            {app.resumeFile && (
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => onDownloadResume(app)}
                                                            className="text-purple-500 hover:text-purple-700"
                                                        >
                                                            <FileText className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Download resume</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </TooltipProvider>
    );
} 