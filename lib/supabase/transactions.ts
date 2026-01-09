import { TransactionFormValues } from "@/validations/transaction";
import { getUserSession } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { updateAccountBalanceService } from "@/lib/supabase/account";

export async function getTransactionsService() {
  const supabase = await createClient();

  try {
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select(
        "id, date, description, amount, type, notes, created_at, accounts(name), categories(name)"
      );

    if (error) return { error: true, message: error.message };

    return { transactions };
  } catch (error) {
    throw error;
  }
}

export async function registerTransactionService(
  categoryData: TransactionFormValues
) {
  const supabase = await createClient();
  const user = await getUserSession();

  const { account, category, date, description, amount, type, notes } =
    categoryData;

  try {
    const { error } = await supabase
      .from("transactions")
      .insert([
        {
          user_id: user?.id,
          account_id: account,
          category_id: category,
          date,
          description,
          amount,
          type,
          notes,
        },
      ])
      .select();

    if (error) return { error: true, message: error.message };

    const { success, balance, accountName, message } =
      await updateAccountBalanceService(account, Number(amount), type);

    if (!success) {
      return { error: true, message: message };
    }

    return { error: false, balance, accountName };
  } catch (error) {
    throw error;
  }
}
