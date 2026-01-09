import { AccountFormValues } from "@/validations/account";
import { createClient } from "@/lib/supabase/server";
import { getUserSession } from "@/lib/supabase/auth";

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

export async function updateAccountBalanceService(
  account: string,
  amount: number,
  action: "income" | "expense"
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.rpc("update_account_balance", {
      p_account_id: account,
      p_action: action,
      p_amount: amount,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return {
      success: true,
      accountName: data[0].account_name,
      balance: data[0].balance,
    };
  } catch (error) {
    throw error;
  }
}
