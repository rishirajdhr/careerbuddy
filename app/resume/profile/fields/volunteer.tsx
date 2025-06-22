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

type VolunteerFieldProps = { index: number };

export function OrganizationField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.organization`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Red Cross" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function VolunteerPositionField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.position`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., Volunteer Coordinator"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function VolunteerStartDateField({ index }: VolunteerFieldProps) {
    return (
        <MonthYearPicker
            name={`volunteer.${index}.startDate`}
            label="Start Date"
        />
    );
}

export function VolunteerEndDateField({ index }: VolunteerFieldProps) {
    return (
        <MonthYearPicker name={`volunteer.${index}.endDate`} label="End Date" />
    );
}

export function VolunteerUrlField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.url`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Organization URL (Optional)</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., https://www.redcross.org"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function VolunteerSummaryField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.summary`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Summary (Optional)</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Brief description of your volunteer work and responsibilities"
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
