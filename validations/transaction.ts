import { z } from "zod";

export const TransactionFormSchema = z.object({
  account: z.uuidv4("Invalid Account."),
  category: z.uuidv4("Invalid Category."),
  date: z.string("Invalid date format."),
  description: z.string().min(1, "Description must be at least 1 characters."),
  amount: z.string(),
  type: z.enum(["income", "expense"], {
    error: "Type must be either income or expense.",
  }),
  notes: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof TransactionFormSchema>;

export type TransactionFormState = {
  success?: boolean;
  message?: string;
  data?: {
    account?: string;
    category?: string;
    date?: string;
    description?: string;
    amount?: string;
    type?: string;
    notes?: string;
  };
  zodErrors?: {
    account?: string[];
    category?: string[];
    date?: string[];
    description?: string[];
    amount?: string[];
    type?: string[];
    notes?: string[];
  } | null;
  supabaseErrors?: {
    reasons?: string;
  } | null;
};
