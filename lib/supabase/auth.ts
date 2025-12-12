import { SigninFormValues, SingupFormValues } from "@/validations/auth";
import { createClient } from "./server";

export async function registerUserService(userData: SingupFormValues) {
  const supabase = await createClient();
  const { email, password } = userData;

  try {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) return { error: true, message: error.message };

    return { error: false };
  } catch (error) {
    throw error;
  }
}

export async function loginUserService(userData: SigninFormValues) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword(userData);

    if (error) return { error: true, message: error.message };

    return { error: false };
  } catch (error) {
    throw error;
  }
}
