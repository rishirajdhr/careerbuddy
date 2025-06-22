"use client";

import { Building, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    hasFilters: boolean;
    onAddApplication: () => void;
    onClearFilters?: () => void;
}

export function EmptyState({ hasFilters, onAddApplication, onClearFilters }: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
                {hasFilters ? "No applications found" : "No applications yet"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                {hasFilters
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by adding your first job application."}
            </p>
            <div className="mt-6">
                {hasFilters ? (
                    <div className="space-x-3">
                        <Button onClick={onClearFilters} variant="outline">
                            Clear Filters
                        </Button>
                        <Button onClick={onAddApplication}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Application
                        </Button>
                    </div>
                ) : (
                    <Button onClick={onAddApplication}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Application
                    </Button>
                )}
            </div>
        </div>
    );
} 