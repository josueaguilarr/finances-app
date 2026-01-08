import { AccountFormValues } from "@/validations/account";
import { createClient } from "./server";
import { getUserSession } from "./auth";

export async function getAccountsService() {
  const supabase = await createClient();

  try {
    const { data: accounts, error } = await supabase
      .from("accounts")
      .select("*");

    if (error) return { error: true, message: error.message };

    return { accounts };
  } catch (error) {
    throw error;
  }
}

export async function getIdAndNameAccountsService() {
  const supabase = await createClient();

  try {
    const { data: accounts, error } = await supabase
      .from("accounts")
      .select("id, name");

    if (error) return { error: true, message: error.message };

    return { accounts };
  } catch (error) {
    throw error;
  }
}

export async function registerAccountService(accountData: AccountFormValues) {
  const supabase = await createClient();
  const user = await getUserSession();

  const { name, type, currency, balance } = accountData;

  try {
    const { error } = await supabase
      .from("accounts")
      .insert([
        {
          user_id: user?.id,
          name,
          type,
          balance,
          currency,
        },
      ])
      .select();

    if (error) return { error: true, message: error.message };

    return { error: false };
  } catch (error) {
    throw error;
  }
}
