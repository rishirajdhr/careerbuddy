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
    disabled?: boolean;
}

export function MonthYearPicker({
    name,
    label,
    disabled,
}: MonthYearPickerProps) {
    return (
        <FormField
            name={name}
            render={({ field }) => {
                const [year = "", month = ""] = field.value?.split("-") || [];

                const handleMonthChange = (newMonth: string) => {
                    const newValue = year
                        ? `${year}-${newMonth}`
                        : `-${newMonth}`;
                    field.onChange(newValue);
                };

                const handleYearChange = (newYear: string) => {
                    const newValue = month ? `${newYear}-${month}` : newYear;
                    field.onChange(newValue);
                };

                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                            <Select
                                value={month}
                                onValueChange={handleMonthChange}
                                disabled={disabled}
                            >
                                <FormControl>
                                    <SelectTrigger disabled={disabled}>
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {months.map((monthOption) => (
                                        <SelectItem
                                            key={monthOption.value}
                                            value={monthOption.value}
                                            disabled={disabled}
                                        >
                                            {monthOption.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={year}
                                onValueChange={handleYearChange}
                                disabled={disabled}
                            >
                                <FormControl>
                                    <SelectTrigger disabled={disabled}>
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {years.map((yearOption) => (
                                        <SelectItem
                                            key={yearOption.value}
                                            value={yearOption.value}
                                            disabled={disabled}
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
