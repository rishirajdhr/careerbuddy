"use client";

import { BarChart3, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Application } from "../types";

interface DashboardStatsProps {
    applications: Application[];
}

export function DashboardStats({ applications }: DashboardStatsProps) {
    const activeApps = applications.filter(
        (app) => app.status !== "Rejected" && app.status !== "Offer Received"
    ).length;

    const statusCounts = applications.reduce(
        (acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );

    const stats = [
        {
            title: "Active Applications",
            count: activeApps,
            color: "text-blue-600",
            icon: Clock,
        },
        {
            title: "Under Review",
            count: statusCounts["Under Review"] || 0,
            color: "text-yellow-600",
            icon: BarChart3,
        },
        {
            title: "Interview Scheduled",
            count: statusCounts["Interview Scheduled"] || 0,
            color: "text-purple-600",
            icon: CheckCircle,
        },
        {
            title: "Rejected",
            count: statusCounts["Rejected"] || 0,
            color: "text-red-600",
            icon: XCircle,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.title} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        {stat.title}
                                    </p>
                                    <p className={`text-2xl font-bold ${stat.color}`}>
                                        {stat.count}
                                    </p>
                                </div>
                                <Icon className={`h-8 w-8 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
} 