"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Application } from "./types"
import { getCurrentUser, fileToBase64, base64ToFile, generateInterviewQuestions, defaultApplications } from "./utils"
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
            app.position.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleEditApplication = (app: Application) => {
        setEditingApplication(app)
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

    const handleGenerateInterviewQuestions = (application: Application) => {
        const generatedQuestions = generateInterviewQuestions(application)
        const storageKey = user ? `customInterviewQuestions_${user.email}` : "customInterviewQuestions"
        
        localStorage.setItem(
            storageKey,
            JSON.stringify({
                applicationId: application.id,
                company: application.company,
                position: application.position,
                questions: generatedQuestions,
                generatedAt: new Date().toISOString(),
            })
        )

        router.push("/interview-prep?mode=custom")
    }

    const handleDownloadResume = (app: Application) => {
        if (app.resumeFile) {
            const url = URL.createObjectURL(app.resumeFile)
            const a = document.createElement('a')
            a.href = url
            a.download = app.resumeFileName
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
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
                onEditApplication={handleEditApplication}
                onDeleteApplication={handleDeleteApplication}
                onGenerateQuestions={handleGenerateInterviewQuestions}
                onDownloadResume={handleDownloadResume}
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