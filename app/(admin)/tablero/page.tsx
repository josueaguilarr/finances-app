import { BalanceCards } from "@/components/balance-cards";
import { HeadPage } from "@/components/ui/head-page";
import { TitlePage } from "@/components/ui/title-page";
import {
  getMonhtlyIncomeExpense,
  getTotalBalanceAccounts,
} from "@/lib/supabase/account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tablero",
};

export default async function Page() {
  const totalBalance = await getTotalBalanceAccounts();
  const monthlyIncomeExpense = await getMonhtlyIncomeExpense();

  if (totalBalance?.error) {
    throw new Error(totalBalance?.message);
  }

  if (monthlyIncomeExpense.error) {
    throw new Error(monthlyIncomeExpense?.message);
  }

  const { income, expenses } = monthlyIncomeExpense;
  const { total } = totalBalance;

  return (
    <>
      <HeadPage>
        <TitlePage>Dashboard</TitlePage>
      </HeadPage>
      <BalanceCards total={total} income={income} expenses={expenses} />
    </>
  );
}
