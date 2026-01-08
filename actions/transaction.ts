"use server";

import { registerTransactionService } from "@/lib/supabase/transactions";
import {
  TransactionFormSchema,
  TransactionFormState,
} from "@/validations/transaction";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function registerTransactionAction(
  prevState: TransactionFormState,
  formData: FormData
): Promise<TransactionFormState> {
  const fields = {
    account: formData.get("account") as string,
    category: formData.get("category") as string,
    date: formData.get("date") as string,
    description: formData.get("description") as string,
    amount: formData.get("amount") as string,
    type: formData.get("type") as string,
    notes: formData.get("notes") as string ?? "",
  };

  const { data, success, error } = TransactionFormSchema.safeParse(fields);

  if (!success) {
    const flattednedErrors = z.flattenError(error);

    return {
      success: false,
      message: "Validation errors",
      zodErrors: flattednedErrors.fieldErrors,
      data: fields,
    };
  }

  const { error: errorRegister, message } = await registerTransactionService(
    data
  );

  if (errorRegister) {
    return {
      success: false,
      message: "Transaction registration error",
      zodErrors: null,
      supabaseErrors: {
        reasons: message,
      },
      data: fields,
    };
  }

  redirect("/transactions");
}
