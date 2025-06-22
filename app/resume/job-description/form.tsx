import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

const jobDescriptionSchema = z.object({
    jobDescription: z.string().min(1, "Job description is required"),
});

type JobDescriptionFormData = z.infer<typeof jobDescriptionSchema>;

interface JobDescriptionFormProps {
    jobDescription: string;
    onUpdate: (jobDescription: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export function JobDescriptionForm({
    jobDescription,
    onUpdate,
    onNext,
    onBack,
}: JobDescriptionFormProps) {
    const form = useForm<JobDescriptionFormData>({
        resolver: zodResolver(jobDescriptionSchema),
        defaultValues: { jobDescription },
    });

    const handleSubmit = (data: JobDescriptionFormData) => {
        onUpdate(data.jobDescription);
        onNext();
    };

    return (
        <div className="space-y-6">
            <div className="text-left">
                <h3 className="text-xl font-semibold">Job Description</h3>
                <p className="text-sm text-muted-foreground">
                    Paste the job description to tailor your resume
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Paste the job description here..."
                                        className="min-h-[300px] resize-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between border-t pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onBack}
                            className="flex items-center space-x-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span>Previous</span>
                        </Button>

                        <Button
                            type="submit"
                            className="flex items-center space-x-2"
                        >
                            <span>Generate Resume</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
