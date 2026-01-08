import { z } from "zod";

export const AccountFormSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(30, "El nombre no puede tener más de 30 caracteres."),
  type: z.enum(["cash", "bank", "wallet"], {
    error: "Tipo de cuenta inválido.",
  }),
  balance: z
    .string({ error: "El balance debe ser un número." })
    .min(1, "El balance debe de ser mayor a 0."),
  currency: z.enum(["mxn", "usd"], {
    error: "Moneda inválida.",
  }),
});

export type AccountFormValues = z.infer<typeof AccountFormSchema>;

export type AccountFormState = {
  success?: boolean;
  message?: string;
  data?: {
    name?: string;
    type?: string;
    balance?: string;
    currency?: string;
  };
  zodErrors?: {
    name?: string[];
    type?: string[];
    balance?: string[];
    currency?: string[];
  } | null;
  supabaseErrors?: {
    reasons?: string;
  } | null;
};
