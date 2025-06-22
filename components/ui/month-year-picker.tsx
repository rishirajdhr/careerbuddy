"use client";

import { useState, useEffect } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];

// Generate years from current year back to 1950
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1949 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
}));

interface MonthYearPickerProps {
    name: string;
    label: string;
}

export function MonthYearPicker({ name, label }: MonthYearPickerProps) {
    return (
        <FormField
            name={name}
            render={({ field }) => {
                const [month, setMonth] = useState("");
                const [year, setYear] = useState("");

                // Parse existing value on mount
                useEffect(() => {
                    if (field.value) {
                        const parts = field.value.split("-");
                        if (parts.length >= 2) {
                            setMonth(parts[1]);
                            setYear(parts[0]);
                        } else if (
                            parts.length === 1 &&
                            parts[0].length === 4
                        ) {
                            setYear(parts[0]);
                        }
                    }
                }, [field.value]);

                // Update form value when month or year changes
                const updateFormValue = (newMonth: string, newYear: string) => {
                    if (newMonth && newYear) {
                        field.onChange(`${newYear}-${newMonth}`);
                    } else if (newYear) {
                        field.onChange(newYear);
                    } else {
                        field.onChange("");
                    }
                };

                const handleMonthChange = (value: string) => {
                    setMonth(value);
                    updateFormValue(value, year);
                };

                const handleYearChange = (value: string) => {
                    setYear(value);
                    updateFormValue(month, value);
                };

                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                            <Select
                                value={month}
                                onValueChange={handleMonthChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {months.map((monthOption) => (
                                        <SelectItem
                                            key={monthOption.value}
                                            value={monthOption.value}
                                        >
                                            {monthOption.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={year}
                                onValueChange={handleYearChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {years.map((yearOption) => (
                                        <SelectItem
                                            key={yearOption.value}
                                            value={yearOption.value}
                                        >
                                            {yearOption.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
