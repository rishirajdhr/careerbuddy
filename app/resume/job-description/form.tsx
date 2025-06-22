import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft, ChevronRight, FileText, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const jobDescriptionSchema = z.object({
    jobDescription: z.string().min(1, "Job description is required"),
});

type JobDescriptionFormData = z.infer<typeof jobDescriptionSchema>;

interface JobDescriptionFormProps {
    jobDescription: string;
    onUpdate: (jobDescription: string) => void;
    onNext: () => void;
    onBack: () => void;
    isGenerating?: boolean;
}

export function JobDescriptionForm({
    jobDescription,
    onUpdate,
    onNext,
    onBack,
    isGenerating = false,
}: JobDescriptionFormProps) {
    const form = useForm<JobDescriptionFormData>({
        resolver: zodResolver(jobDescriptionSchema),
        defaultValues: { jobDescription },
    });

    const handleSubmit = (data: JobDescriptionFormData) => {
        onUpdate(data.jobDescription);
        onNext();
    };

    const handleBackClick = () => {
        onUpdate(form.getValues("jobDescription"));
        onBack();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
            >
                <ProfileSection
                    id="job-description"
                    title="Job Description"
                    description="Paste the job description to tailor your resume"
                    icon={<FileText className="h-5 w-5" />}
                >
                    <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                            <FormItem>
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
                </ProfileSection>

                <div className="flex justify-between border-t pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleBackClick}
                        className="flex items-center space-x-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                    </Button>

                    <Button
                        type="submit"
                        className="flex items-center space-x-2"
                        disabled={isGenerating}
                    >
                        {isGenerating && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span>
                            {isGenerating ? "Generating..." : "Generate Resume"}
                        </span>
                        {!isGenerating && <ChevronRight className="h-4 w-4" />}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

interface ProfileSectionProps {
    id: string;
    title: string;
    description: string;
    icon: ReactNode;
    children: ReactNode;
}

function ProfileSection({
    id,
    title,
    description,
    icon,
    children,
}: ProfileSectionProps) {
    return (
        <Card id={id} className="py-2">
            <Accordion
                type="single"
                collapsible
                defaultValue={id}
                className="w-full"
            >
                <AccordionItem value={id} className="border-none">
                    <AccordionTrigger className="px-6 py-4 text-xl font-semibold hover:no-underline [&>svg]:mt-2 [&>svg]:size-6">
                        <div className="flex items-center gap-3">
                            <div className="grid size-12 place-items-center rounded-full bg-blue-600 text-white">
                                {icon}
                            </div>
                            <div className="text-left">
                                <div>{title}</div>
                                <div className="text-sm font-normal text-muted-foreground">
                                    {description}
                                </div>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="px-6 pt-4 pb-6">{children}</div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}
