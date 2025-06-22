import { RoadmapWizardProgress } from "./roadmap-wizard-progress";

export default function RoadmapLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="space-y-6 p-6 pt-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-2xl font-bold">Roadmap Generator</h1>
                    <p className="text-muted-foreground">
                        Create a career roadmap in minutes
                    </p>
                    <RoadmapWizardProgress />
                </div>

                {children}
            </div>
        </div>
    );
}
