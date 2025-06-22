"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Application } from "./types"
import { getCurrentUser, generateInterviewQuestions, defaultApplications } from "./utils"
import { fileToBase64, base64ToFile } from "@/lib/utils"
import { ApplicationFilters } from "./components/application-filters"
import { ApplicationTable } from "./components/application-table"
import { ApplicationForm } from "./components/application-form"

export default function DashboardPage() {
    const router = useRouter()
    
    // State
    const [user] = useState(() => getCurrentUser())
    const [applications, setApplications] = useState<Application[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingApplication, setEditingApplication] = useState<Application | null>(null)
    const [isGenerating, setIsGenerating] = useState<number | null>(null)

    // Load data on mount
    useEffect(() => {
        const applicationsKey = user ? `user_${user.id}_applications` : "jobApplications"
        const savedApplications = localStorage.getItem(applicationsKey)
        
        if (savedApplications) {
            const parsedApplications = JSON.parse(savedApplications)
            const applicationsWithFiles = parsedApplications.map((app: Application & { resumeFileData?: string }) => ({
                ...app,
                resumeFile: app.resumeFileData && app.resumeFileName 
                    ? base64ToFile(app.resumeFileData, app.resumeFileName)
                    : null
            }))
            setApplications(applicationsWithFiles)
        } else {
            setApplications(defaultApplications)
        }
    }, [user])

    // Auto-save when applications change
    useEffect(() => {
        if (applications.length > 0) {
            handleSave()
        }
    }, [applications])

    // Filter applications
    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (app.role && app.role.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesStatus = statusFilter === "all" || app.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Handlers
    const handleSave = async () => {
        const applicationsKey = user ? `user_${user.id}_applications` : "jobApplications"
        
        const applicationsForStorage = await Promise.all(
            applications.map(async (app) => {
                const { resumeFile, ...appForStorage } = app;
                if (resumeFile) {
                    try {
                        (appForStorage as Application & { resumeFileData?: string }).resumeFileData = await fileToBase64(resumeFile);
                    } catch (error) {
                        console.error('Error converting file to base64:', error);
                    }
                }
                return appForStorage;
            })
        )
        
        localStorage.setItem(applicationsKey, JSON.stringify(applicationsForStorage))
    }

    const handleAddApplication = () => {
        setEditingApplication(null)
        setIsFormOpen(true)
    }

    const handleSubmitApplication = (formData: Omit<Application, "id">) => {
        if (editingApplication) {
            // Update existing application
            const updatedApp: Application = {
                ...editingApplication,
                ...formData,
            }
            setApplications(applications.map(app => 
                app.id === updatedApp.id ? updatedApp : app
            ))
        } else {
            // Add new application
            const newApp: Application = {
                ...formData,
                id: Date.now(),
            }
            setApplications([newApp, ...applications])
        }
        setIsFormOpen(false)
        setEditingApplication(null)
    }

    const handleDeleteApplication = (id: number) => {
        if (confirm("Are you sure you want to delete this application?")) {
            setApplications(applications.filter(app => app.id !== id))
        }
    }

    const handleGenerateInterviewQuestions = async (application: Application) => {
        if (!application.jobDescription || !application.userProfile) {
            alert("This application is missing the job description or user profile needed to generate questions. Please create it via the Resume Builder.");
            return;
        }

        setIsGenerating(application.id);

        try {
            const response = await fetch('/api/interview-prep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobDescription: application.jobDescription,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate interview questions.');
            }

            const result = await response.json();

            if (result.success && result.questions) {
                // Store questions in localStorage, keyed by application ID
                const storageKey = `interview_questions_${application.id}`;
                localStorage.setItem(storageKey, JSON.stringify(result.questions));
                
                // Redirect to interview prep page
                router.push(`/interview-prep?appId=${application.id}`);
            } else {
                throw new Error(result.error || 'An unknown error occurred.');
            }

        } catch (error) {
            console.error(error);
            alert((error as Error).message);
        } finally {
            setIsGenerating(null);
        }
    }

    return (
        <div className="space-y-6">
            <ApplicationFilters
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                onSearchChange={setSearchTerm}
                onStatusFilterChange={setStatusFilter}
            />

            <ApplicationTable
                applications={filteredApplications}
                onAddApplication={handleAddApplication}
                onDeleteApplication={handleDeleteApplication}
                onGenerateQuestions={handleGenerateInterviewQuestions}
                isGeneratingId={isGenerating}
            />

            <ApplicationForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false)
                    setEditingApplication(null)
                }}
                onSubmit={handleSubmitApplication}
                application={editingApplication}
                isEditing={!!editingApplication}
            />
        </div>
    )
}