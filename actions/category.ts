"use server";

import { registerCategoryService } from "@/lib/supabase/categories";
import {
  CategoryFormSchema,
  type CategoryFormState,
} from "@/validations/categories";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function registerCategoryAction(
  prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const fields = {
    name: formData.get("name") as string,
  };

  const { data, success, error } = CategoryFormSchema.safeParse(fields);

  if (!success) {
    const flattednedErrors = z.flattenError(error);

    return {
      success: false,
      message: "Validation errors",
      zodErrors: flattednedErrors.fieldErrors,
      data: fields,
    };
  }

  const { error: errorRegister, message } = await registerCategoryService(data);

  if (errorRegister) {
    return {
      success: false,
      message: "Category registration error",
      zodErrors: null,
      supabaseErrors: {
        reasons: message,
      },
      data: fields,
    };
  }

  revalidatePath("/categories");

  return {
    success: true,
    message: `Category registered successfully.`,
  };
}
