"use server";

import { registerAccountService } from "@/lib/supabase/account";
import {
  AccountFormSchema,
  type AccountFormState,
} from "@/validations/account";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function registerAccountAction(
  prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const fields = {
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    balance: formData.get("balance") as string,
    currency: formData.get("currency") as string,
  };

  const { data, success, error } = AccountFormSchema.safeParse(fields);

  if (!success) {
    const flattednedErrors = z.flattenError(error);

    return {
      success: false,
      message: "Validation errors",
      zodErrors: flattednedErrors.fieldErrors,
      data: fields,
    };
  }

  const { error: errorRegister, message } = await registerAccountService(data);

  if (errorRegister) {
    return {
      success: false,
      message: "Account registration error",
      zodErrors: null,
      supabaseErrors: {
        reasons: message,
      },
      data: fields,
    };
  }

  revalidatePath("/accounts");

  return {
    success: true,
    message: `Account registered successfully.`,
  };
}
