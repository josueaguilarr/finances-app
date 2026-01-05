import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(30, "El nombre no puede tener más de 30 caracteres."),
});

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;

export type CategoryFormState = {
  success?: boolean;
  message?: string;
  data?: {
    name?: string;
  };
  zodErrors?: {
    name?: string[];
  } | null;
  supabaseErrors?: {
    reasons?: string;
  } | null;
};
