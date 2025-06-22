"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoadmapGenerator() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the first step
        router.push("/roadmap/career-information");
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                <p className="text-gray-600">
                    Redirecting to roadmap builder...
                </p>
            </div>
        </div>
    );
}
