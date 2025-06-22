import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Resume } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { MonthYearPicker } from "@/components/ui/month-year-picker";

type ProjectFieldProps = { index: number };

export function ProjectNameField({ index }: ProjectFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`projects.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., E-commerce Platform"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function ProjectDescriptionField({ index }: ProjectFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`projects.${index}.description`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Brief description of the project"
                            rows={3}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function ProjectStartDateField({ index }: ProjectFieldProps) {
    return (
        <MonthYearPicker
            name={`projects.${index}.startDate`}
            label="Start Date"
        />
    );
}

export function ProjectEndDateField({ index }: ProjectFieldProps) {
    return (
        <MonthYearPicker name={`projects.${index}.endDate`} label="End Date" />
    );
}

export function ProjectUrlField({ index }: ProjectFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`projects.${index}.url`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Project URL (Optional)</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., https://github.com/username/project"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
