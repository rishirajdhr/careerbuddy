"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Application } from "../types";

interface ApplicationFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (application: Omit<Application, "id">) => void;
    application?: Application | null;
    isEditing?: boolean;
}

export function ApplicationForm({
    isOpen,
    onClose,
    onSubmit,
    application,
    isEditing = false,
}: ApplicationFormProps) {
    const [formData, setFormData] = useState<Omit<Application, "id">>({
        company: "",
        position: "",
        location: "",
        appliedDate: format(new Date(), "yyyy-MM-dd"),
        status: "Applied",
        applicationMethod: "",
        resumeFile: null,
        resumeFileName: "",
        jobUrl: "",
        notes: "",
        salary: "",
        nextAction: "",
        nextActionDate: "",
    });

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [nextActionDate, setNextActionDate] = useState<Date | undefined>(undefined);

    // Helper function to create a date without timezone issues
    const createLocalDate = (dateString: string): Date => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // month is 0-indexed
    };

    // Helper function to format date consistently
    const formatDateConsistent = (date: Date): string => {
        return format(date, "yyyy-MM-dd");
    };

    // Helper function to handle date selection without timezone issues
    const handleDateSelect = (date: Date | undefined, setter: (date: Date | undefined) => void) => {
        if (date) {
            // Create a new date object with just the date components to avoid timezone issues
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const localDate = new Date(year, month, day);
            setter(localDate);
        } else {
            setter(undefined);
        }
    };

    // Reset form when dialog opens/closes or application changes
    useEffect(() => {
        if (isOpen) {
            if (application) {
                setFormData({
                    company: application.company,
                    position: application.position,
                    location: application.location,
                    appliedDate: application.appliedDate,
                    status: application.status,
                    applicationMethod: application.applicationMethod,
                    resumeFile: application.resumeFile,
                    resumeFileName: application.resumeFileName,
                    jobUrl: application.jobUrl,
                    notes: application.notes,
                    salary: application.salary,
                    nextAction: application.nextAction,
                    nextActionDate: application.nextActionDate,
                });
                setSelectedDate(application.appliedDate ? createLocalDate(application.appliedDate) : new Date());
                setNextActionDate(application.nextActionDate ? createLocalDate(application.nextActionDate) : undefined);
            } else {
                setFormData({
                    company: "",
                    position: "",
                    location: "",
                    appliedDate: formatDateConsistent(new Date()),
                    status: "Applied",
                    applicationMethod: "",
                    resumeFile: null,
                    resumeFileName: "",
                    jobUrl: "",
                    notes: "",
                    salary: "",
                    nextAction: "",
                    nextActionDate: "",
                });
                setSelectedDate(new Date());
                setNextActionDate(undefined);
            }
        }
    }, [isOpen, application]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            appliedDate: selectedDate ? formatDateConsistent(selectedDate) : formData.appliedDate,
            nextActionDate: nextActionDate ? formatDateConsistent(nextActionDate) : formData.nextActionDate,
        });
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                resumeFile: file,
                resumeFileName: file.name,
            }));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Application" : "Add New Application"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="company">Company *</Label>
                            <Input
                                id="company"
                                value={formData.company}
                                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="position">Position *</Label>
                            <Input
                                id="position"
                                value={formData.position}
                                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Applied">Applied</SelectItem>
                                    <SelectItem value="Under Review">Under Review</SelectItem>
                                    <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                                    <SelectItem value="Offer Received">Offer Received</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="appliedDate">Applied Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[280px] p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => handleDateSelect(date, setSelectedDate)}
                                        initialFocus
                                        className="rounded-md border"
                                        classNames={{
                                            head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                                            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                                            nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
                                        }}
                                        disabled={{ before: new Date(1900, 0, 1) }}
                                        fromYear={2020}
                                        toYear={2030}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label htmlFor="applicationMethod">Application Method</Label>
                            <Input
                                id="applicationMethod"
                                value={formData.applicationMethod}
                                onChange={(e) => setFormData(prev => ({ ...prev, applicationMethod: e.target.value }))}
                                placeholder="e.g., Company Website, LinkedIn, etc."
                            />
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary Range</Label>
                            <Input
                                id="salary"
                                value={formData.salary}
                                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                                placeholder="e.g., $80,000 - $120,000"
                            />
                        </div>
                        <div>
                            <Label htmlFor="nextActionDate">Next Action Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {nextActionDate ? format(nextActionDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[280px] p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={nextActionDate}
                                        onSelect={(date) => handleDateSelect(date, setNextActionDate)}
                                        initialFocus
                                        className="rounded-md border"
                                        classNames={{
                                            head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                                            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                                            nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
                                        }}
                                        disabled={{ before: new Date(1900, 0, 1) }}
                                        fromYear={2020}
                                        toYear={2030}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="nextAction">Next Action</Label>
                        <Input
                            id="nextAction"
                            value={formData.nextAction}
                            onChange={(e) => setFormData(prev => ({ ...prev, nextAction: e.target.value }))}
                            placeholder="e.g., Follow up with recruiter, Prepare for interview"
                        />
                    </div>

                    <div>
                        <Label htmlFor="resumeFile">Resume File</Label>
                        <div className="flex items-center space-x-2">
                            <Input
                                id="resumeFile"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="flex-1"
                            />
                            {formData.resumeFileName && (
                                <span className="text-sm text-gray-500">
                                    {formData.resumeFileName}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Any additional notes about this application..."
                            rows={4}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {isEditing ? "Update Application" : "Add Application"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
} 