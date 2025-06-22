import { DashboardHeader } from "./components/dashboard-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <div className="space-y-6 p-6 pt-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your job applications and track your progress
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
} 