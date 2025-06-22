import { ResumeWizardProgress } from "./resume-wizard-progress";
import { ResumeProvider } from "./resume-provider";

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ResumeProvider>
            <div className="min-h-screen bg-gray-50">
                <div className="space-y-6 p-6 pt-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-2xl font-bold">Resume Generator</h1>
                        <p className="text-muted-foreground">
                            Create a professional resume in minutes
                        </p>
                        <ResumeWizardProgress />
                    </div>

                    {children}
                </div>
            </div>
        </ResumeProvider>
    );
}
