import {
    FormControl,
    FormDescription,
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

type WorkFieldProps = { index: number };

export function PositionField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.position`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., Software Engineer"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function CompanyNameField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Google" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function WorkStartDateField({ index }: WorkFieldProps) {
    return (
        <MonthYearPicker name={`work.${index}.startDate`} label="Start Date" />
    );
}

export function WorkEndDateField({ index }: WorkFieldProps) {
    return <MonthYearPicker name={`work.${index}.endDate`} label="End Date" />;
}

export function WorkSummaryField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.summary`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Brief description of your role and responsibilities"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function WorkLocationField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.location`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., San Francisco, CA"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
