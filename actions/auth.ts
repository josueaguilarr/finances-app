"use server";

import { loginUserService, registerUserService } from "@/lib/supabase/auth";
import {
  SigninFormSchema,
  SignupFormSchema,
  type FormState,
} from "@/validations/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function registerUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const { data, success, error } = SignupFormSchema.safeParse(fields);

  if (!success) {
    const flattednedErrors = z.flattenError(error);

    return {
      success: false,
      message: "Validation errors",
      zodErrors: flattednedErrors.fieldErrors,
      data: fields,
    };
  }

  const { error: errorRegister, message } = await registerUserService(data);

  if (!errorRegister) {
    return {
      success: false,
      message: "Registration error",
      zodErrors: null,
      supabaseErrors: {
        reasons: message,
      },
      data: fields,
    };
  }

  redirect("/tablero");
}

export async function loginUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, success, error } = SigninFormSchema.safeParse(fields);

  if (!success) {
    const flattednedErrors = z.flattenError(error);

    return {
      success: false,
      message: "Validation errors",
      zodErrors: flattednedErrors.fieldErrors,
      data: fields,
    };
  }

  const { error: errorLogin, message } = await loginUserService(data);

  if (errorLogin) {
    return {
      success: false,
      message: "Supabase error",
      data: fields,
      zodErrors: null,
      supabaseErrors: {
        reasons: message,
      },
    };
  }

  revalidatePath("/", "layout");
  redirect("/tablero");
}
