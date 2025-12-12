import { z } from "zod";

export const SigninFormSchema = z.object({
  email: z.email("Correo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const SignupFormSchema = SigninFormSchema.extend({
  confirmPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  error: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

export type SigninFormValues = z.infer<typeof SigninFormSchema>;
export type SingupFormValues = z.infer<typeof SignupFormSchema>;

export type FormState = {
  success?: boolean;
  message?: string;
  data?: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  zodErrors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  } | null;
  supabaseErrors?: {
    reasons?: string;
  } | null;
};
