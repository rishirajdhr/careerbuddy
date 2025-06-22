"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Resume, ResumeSchema } from "@/lib/schema";
import { ProfileForm, RESUME_SECTIONS as ALL_SECTIONS } from "./form";
import { SectionManager } from "./section-manager";
import { profileFormDefaultValues } from "./default-values";

type SectionWithState = (typeof ALL_SECTIONS)[number] & {
    enabled: boolean;
    order: number;
};

const initialSections: SectionWithState[] = ALL_SECTIONS.map(
    (section, index) => ({
        ...section,
        enabled: !section.optional,
        order: index,
    }),
);

function ProfileSectionManager({
    sections,
    setSections,
    enabledSections,
}: {
    sections: SectionWithState[];
    setSections: React.Dispatch<React.SetStateAction<SectionWithState[]>>;
    enabledSections: SectionWithState[];
}) {
    const [activeSection, setActiveSection] = useState<string>("personal");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
        );

        observerRef.current = observer;

        const allSectionIds = ["personal", ...enabledSections.map((s) => s.id)];
        allSectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            allSectionIds.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [enabledSections]);

    const handleSectionToggle = (sectionId: string, enabled: boolean) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                          ...section,
                          enabled,
                          order: enabled
                              ? Math.max(
                                    ...prev
                                        .filter((s) => s.enabled)
                                        .map((s) => s.order),
                                    -1,
                                ) + 1
                              : section.order,
                      }
                    : section,
            ),
        );
    };

    const handleSectionReorder = (reorderedSections: SectionWithState[]) => {
        setSections((prev) =>
            prev.map((section) => {
                const reordered = reorderedSections.find(
                    (s) => s.id === section.id,
                );
                return reordered
                    ? { ...section, order: reordered.order }
                    : section;
            }),
        );
    };

    const handleSectionClick = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <SectionManager
            sections={sections}
            onSectionToggle={handleSectionToggle}
            onSectionReorder={handleSectionReorder}
            onSectionClick={handleSectionClick}
            activeSection={activeSection}
        />
    );
}

export default function ProfilePage() {
    const router = useRouter();
    const [sections, setSections] =
        useState<SectionWithState[]>(initialSections);
    const [formData, setFormData] = useState<Resume>(profileFormDefaultValues);

    const handleNext = (data: Resume) => {
        // Save form data (you can use context or localStorage here)
        setFormData(data);
        router.push("/resume/job-description");
    };

    const enabledSections = sections
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order);

    return (
        <div className="grid place-items-center">
            <aside className="fixed top-52 left-24 w-1/6 px-4">
                <ProfileSectionManager
                    sections={sections}
                    setSections={setSections}
                    enabledSections={enabledSections}
                />
            </aside>

            <main className="w-2/3">
                <ProfileForm
                    data={formData}
                    onUpdate={setFormData}
                    onNext={handleNext}
                    enabledSections={enabledSections}
                />
            </main>
        </div>
    );
}
