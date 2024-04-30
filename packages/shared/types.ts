import type { Locale } from "@wolf-project/i18n";

export type User = {
  userId: string;
  name: string;
  email: string;
  role: string;
  language: Locale;
  job: string | null;
  company: string;
};
