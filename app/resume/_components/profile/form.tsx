import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Resume, ResumeSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import {
  NameField,
  EmailField,
  PhoneField,
  LocationField,
  WebsiteField,
  LinkedInField,
  SummaryField,
} from "./fields";
import { profileFormDefaultValues } from "./default-values";

function PersonalInformation() {
  return (
    <div>
      <div className="text-left">
        <h3 className="text-xl font-semibold">{"Personal Information"}</h3>
        <p className="text-sm text-muted-foreground">
          {"Tell us about yourself"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <NameField />
        <EmailField />
        <PhoneField />
        <LocationField />
        <WebsiteField />
        <LinkedInField />
        <SummaryField />
      </div>
    </div>
  );
}

export function ProfileForm() {
  const form = useForm<Resume>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: profileFormDefaultValues,
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="space-y-6">
          <PersonalInformation />
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {}}
              disabled={false}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <Button
              type="button"
              onClick={() => {}}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
