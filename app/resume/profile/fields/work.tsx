import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Resume } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { Checkbox } from "@/components/ui/checkbox";

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

export function WorkCurrentField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();
    const current = form.watch(`work.${index}.current`);

    return (
        <FormField
            control={form.control}
            name={`work.${index}.current`}
            render={({ field }) => (
                <FormItem className="flex flex-row items-center">
                    <FormControl>
                        <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (checked) {
                                    form.setValue(`work.${index}.endDate`, "");
                                }
                            }}
                            className="border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                        />
                    </FormControl>
                    <FormLabel className="mb-0 cursor-pointer text-sm font-normal text-gray-900 select-none">
                        I currently work here
                    </FormLabel>
                </FormItem>
            )}
        />
    );
}

export function WorkEndDateField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();
    const current = form.watch(`work.${index}.current`);
    return (
        <MonthYearPicker
            name={`work.${index}.endDate`}
            label="End Date"
            disabled={!!current}
        />
    );
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
