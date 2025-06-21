import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Plus,
    X,
    Settings,
    ChevronRight,
    GripVertical,
    ChevronDown,
    User,
} from "lucide-react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
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
    isConfigMode = false,
    isFixed = false,
}: {
    section: Section;
    onSectionToggle: (sectionId: string, enabled: boolean) => void;
    onSectionClick?: (sectionId: string) => void;
    activeSection?: string;
    isConfigMode?: boolean;
    isFixed?: boolean;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id, disabled: !isConfigMode || isFixed });

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
            className={`group flex cursor-pointer items-center gap-3 rounded-md p-2 transition-all ${
                activeSection === section.id
                    ? "font-semibold text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
            } ${isDragging ? "rotate-1 opacity-50 shadow-lg" : ""} `}
            onClick={() => onSectionClick?.(section.id)}
        >
            {isConfigMode && !isFixed && (
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
                >
                    <GripVertical className="h-3 w-3" />
                </div>
            )}
            <div
                className={`rounded p-1 ${activeSection === section.id ? "bg-blue-100" : "bg-gray-100"}`}
            >
                {section.icon}
            </div>
            <span className="flex-1 text-sm">{section.title}</span>
            {isConfigMode && !isFixed && (
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleSectionToggle(e, section.id, false)}
                    className="h-5 w-5 p-0 text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-700"
                >
                    <X className="h-3 w-3" />
                </Button>
            )}
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

    const enabledSections = sections
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order);
    const disabledSections = sections.filter((s) => !s.enabled);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

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
            <div className="flex-1 overflow-y-auto">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
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
                                    icon: <User className="h-4 w-4" />,
                                    component: () => <></>,
                                    optional: false,
                                }}
                                onSectionToggle={() => {}}
                                onSectionClick={onSectionClick}
                                activeSection={activeSection}
                                isConfigMode={false}
                                isFixed={true}
                            />
                            {enabledSections.map((section) => (
                                <SortableSectionItem
                                    key={section.id}
                                    section={section}
                                    onSectionToggle={onSectionToggle}
                                    onSectionClick={onSectionClick}
                                    activeSection={activeSection}
                                    isConfigMode={isConfigOpen}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Configure Sections */}
            <div className="p-2">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm text-gray-500 hover:text-gray-900"
                    onClick={() => setIsConfigOpen(!isConfigOpen)}
                >
                    {isConfigOpen ? (
                        <ChevronDown className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                    <span>Configure Sections</span>
                </Button>

                {isConfigOpen && (
                    <Card className="mt-2">
                        <CardHeader className="p-4">
                            <CardTitle className="text-base">
                                Add Sections
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="space-y-2">
                                {disabledSections.map((section) => (
                                    <div
                                        key={section.id}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-sm font-medium">
                                            {section.title}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) =>
                                                handleSectionToggle(
                                                    e,
                                                    section.id,
                                                    true,
                                                )
                                            }
                                            className="h-7 gap-1 px-2 text-xs"
                                        >
                                            <Plus className="h-3 w-3" />
                                            Add
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
