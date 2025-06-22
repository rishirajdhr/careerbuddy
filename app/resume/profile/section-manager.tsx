"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Plus,
    X,
    Settings,
    ChevronRight,
    GripVertical,
    ChevronDown,
    User,
    Minus,
} from "lucide-react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RESUME_SECTIONS } from "./form";

type Section = (typeof RESUME_SECTIONS)[number] & {
    enabled: boolean;
    order: number;
};

interface SectionManagerProps {
    sections: Section[];
    onSectionToggle: (sectionId: string, enabled: boolean) => void;
    onSectionReorder: (sections: Section[]) => void;
    onSectionClick?: (sectionId: string) => void;
    activeSection?: string;
}

// Sortable Section Item Component
function SortableSectionItem({
    section,
    onSectionToggle,
    onSectionClick,
    activeSection,
    isFixed = false,
}: {
    section: Section;
    onSectionToggle: (sectionId: string, enabled: boolean) => void;
    onSectionClick?: (sectionId: string) => void;
    activeSection?: string;
    isFixed?: boolean;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id, disabled: isFixed });

    const style = { transform: CSS.Transform.toString(transform), transition };

    const handleSectionToggle = (
        e: React.MouseEvent,
        sectionId: string,
        enabled: boolean,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        onSectionToggle(sectionId, enabled);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative flex cursor-pointer items-center gap-3 rounded-md p-2 transition-all ${
                activeSection === section.id
                    ? "font-semibold text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
            } ${isDragging ? "rotate-1 opacity-50 shadow-lg" : ""} `}
            onClick={() => onSectionClick?.(section.id)}
        >
            {!isFixed && (
                <div
                    {...attributes}
                    {...listeners}
                    className="absolute -left-3 cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
                >
                    <GripVertical className="size-3.5" />
                </div>
            )}
            <div
                className={`rounded p-1 ${activeSection === section.id ? "bg-blue-100" : "bg-gray-100"}`}
            >
                {section.icon}
            </div>
            <span className="flex-1 text-sm">{section.title}</span>
            {!isFixed && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) =>
                                handleSectionToggle(e, section.id, false)
                            }
                            className="h-5 w-5 cursor-pointer p-0 text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-700"
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Remove section</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}

// Drag Overlay Component
function DragOverlayItem({
    section,
    activeSection,
}: {
    section: Section;
    activeSection?: string;
}) {
    return (
        <div className="group relative flex cursor-grabbing items-center gap-3 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
            <div className="cursor-grab text-gray-400">
                <GripVertical className="h-3 w-3" />
            </div>
            <div
                className={`rounded p-1 ${activeSection === section.id ? "bg-blue-100" : "bg-gray-100"}`}
            >
                {section.icon}
            </div>
            <span className="flex-1 text-sm font-medium">{section.title}</span>
        </div>
    );
}

export function SectionManager({
    sections,
    onSectionToggle,
    onSectionReorder,
    onSectionClick,
    activeSection,
}: SectionManagerProps) {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    const enabledSections = sections
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order);
    const disabledSections = sections.filter((s) => !s.enabled);

    const activeSectionData = activeId
        ? enabledSections.find((s) => s.id === activeId) || {
              id: "personal",
              title: "Personal Information",
              description: "",
              enabled: true,
              order: -1,
              icon: <User className="h-4 w-4" />,
              component: () => <></>,
              optional: false,
          }
        : null;

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveId(null);

        if (active.id !== over?.id) {
            const oldIndex = enabledSections.findIndex(
                (section) => section.id === active.id,
            );
            const newIndex = enabledSections.findIndex(
                (section) => section.id === over?.id,
            );

            const reorderedSections = arrayMove(
                enabledSections,
                oldIndex,
                newIndex,
            );

            // Update order numbers
            const updatedSections = reorderedSections.map((section, index) => ({
                ...section,
                order: index,
            }));

            onSectionReorder(updatedSections);
        }
    };

    const handleSectionToggle = (
        e: React.MouseEvent,
        sectionId: string,
        enabled: boolean,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        onSectionToggle(sectionId, enabled);
    };

    return (
        <div className="flex h-full flex-col">
            {/* Navigation Sections */}
            <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-400">
                <div className="text-base font-semibold">Sections</div>
            </div>
            <div className="px-4 pb-1 text-xs text-gray-500">
                Use the drag handles to reorder sections
            </div>
            <div className="flex-1 overflow-y-auto">
                <DndContext
                    id="section-manager-dnd-context"
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={enabledSections.map((s) => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-1 p-2">
                            {/* Fixed Personal Information Section */}
                            <SortableSectionItem
                                section={{
                                    id: "personal",
                                    title: "Personal Information",
                                    description: "",
                                    enabled: true,
                                    order: -1,
                                    icon: <User className="h-3 w-3" />,
                                    component: () => <></>,
                                    optional: false,
                                }}
                                onSectionToggle={() => {}}
                                onSectionClick={onSectionClick}
                                activeSection={activeSection}
                                isFixed={true}
                            />
                            {enabledSections.map((section) => (
                                <SortableSectionItem
                                    key={section.id}
                                    section={section}
                                    onSectionToggle={onSectionToggle}
                                    onSectionClick={onSectionClick}
                                    activeSection={activeSection}
                                />
                            ))}
                        </div>
                    </SortableContext>
                    <DragOverlay>
                        {activeId && activeSectionData ? (
                            <DragOverlayItem
                                section={activeSectionData}
                                activeSection={activeSection}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>

            {/* Add Sections Accordion */}
            <div className="p-2">
                <button
                    onClick={() => setIsConfigOpen(!isConfigOpen)}
                    className="group relative flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-gray-400 hover:text-gray-600"
                >
                    <div className="absolute -left-3 transition-transform duration-200">
                        {isConfigOpen ? (
                            <Minus className="size-3.5 text-gray-400" />
                        ) : (
                            <Plus className="size-3.5 text-gray-400" />
                        )}
                    </div>
                    <span className="text-base font-semibold">
                        Add Sections
                    </span>
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isConfigOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-2 pb-1 text-xs text-gray-500">
                        Click on a section to add it to your resume
                    </div>
                    <div className="space-y-1">
                        {disabledSections.map((section) => (
                            <div key={section.id} className="relative">
                                <button
                                    id={`add-section-${section.id}`}
                                    className="hidden"
                                    onClick={(e) =>
                                        handleSectionToggle(e, section.id, true)
                                    }
                                />
                                <label
                                    htmlFor={`add-section-${section.id}`}
                                    className="group relative flex cursor-pointer items-center gap-3 rounded-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    <div className="rounded bg-gray-100 p-1">
                                        {section.icon}
                                    </div>
                                    <span className="flex-1 text-sm">
                                        {section.title}
                                    </span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex h-6 w-6 items-center justify-center rounded p-0 text-green-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-green-50 hover:text-green-700">
                                                <Plus className="h-3 w-3" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Add section</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
