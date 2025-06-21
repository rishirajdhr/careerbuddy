"use client";

import { useState } from "react";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

// Tag Bubble Component
function TagBubble({
    tag,
    onRemove,
    color = "blue",
}: {
    tag: string;
    onRemove: () => void;
    color?: "blue" | "green" | "purple" | "orange";
}) {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        green: "bg-green-100 text-green-800 hover:bg-green-200",
        purple: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        orange: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    };

    const buttonColorClasses = {
        blue: "hover:bg-blue-300",
        green: "hover:bg-green-300",
        purple: "hover:bg-purple-300",
        orange: "hover:bg-orange-300",
    };

    return (
        <div
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm transition-colors ${colorClasses[color]}`}
        >
            <span>{tag}</span>
            <button
                type="button"
                onClick={onRemove}
                className={`rounded-full p-0.5 transition-colors ${buttonColorClasses[color]}`}
            >
                <X className="h-3 w-3" />
            </button>
        </div>
    );
}

// Tag Input Component
function TagInput({
    value,
    onChange,
    onAdd,
    placeholder = "Add a tag...",
    buttonText = "+",
}: {
    value: string;
    onChange: (value: string) => void;
    onAdd: () => void;
    placeholder?: string;
    buttonText?: string;
}) {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && value.trim()) {
            e.preventDefault();
            onAdd();
        }
    };

    return (
        <div className="flex gap-2">
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
            />
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAdd}
                disabled={!value.trim()}
            >
                {buttonText === "+" ? <Plus className="h-4 w-4" /> : buttonText}
            </Button>
        </div>
    );
}

// Tags List Component
function TagsList({
    tags,
    onRemove,
    color = "blue",
}: {
    tags: string[];
    onRemove: (index: number) => void;
    color?: "blue" | "green" | "purple" | "orange";
}) {
    if (tags.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <TagBubble
                    key={index}
                    tag={tag}
                    onRemove={() => onRemove(index)}
                    color={color}
                />
            ))}
        </div>
    );
}

// Main Tag Input Field Component
export function TagInputField({
    label,
    fieldName,
    placeholder,
    color = "blue",
    buttonText = "+",
}: {
    label: string;
    fieldName: string;
    placeholder?: string;
    color?: "blue" | "green" | "purple" | "orange";
    buttonText?: string;
}) {
    const [inputValue, setInputValue] = useState("");

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="space-y-3">
                <TagInput
                    value={inputValue}
                    onChange={setInputValue}
                    onAdd={() => {
                        // This will be handled by the parent component
                        console.log("Add tag:", inputValue);
                    }}
                    placeholder={placeholder}
                    buttonText={buttonText}
                />
                {/* Tags will be rendered by parent component */}
            </div>
            <FormMessage />
        </FormItem>
    );
}

// Export individual components for custom usage
export { TagBubble, TagInput, TagsList };
