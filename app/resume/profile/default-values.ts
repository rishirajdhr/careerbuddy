import { Resume } from "@/lib/schema";

export const profileFormDefaultValues: Resume = {
  basics: {
    name: "",
    email: "",
    phone: "",
    location: {
      address: "",
      postalCode: "",
      city: "",
      countryCode: "",
      region: "",
    },
    url: "",
    profiles: [
      {
        network: "LinkedIn",
        username: "",
        url: "",
      },
    ],
    summary: "",
  },
};
