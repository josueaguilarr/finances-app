"use server";

import { HeadPage } from "@/components/ui/head-page";
import { TitlePage } from "@/components/ui/title-page";
import TransactionsTable from "@/app/(admin)/transactions/transactions-table";
import { getTransactionsService } from "@/lib/supabase/transactions";
import { TransactionRecords } from "@/app/(admin)/transactions/columns";
import { getIdAndNameAccountsService } from "@/lib/supabase/account";
import { getIdAndNameCategoriesService } from "@/lib/supabase/categories";
import { type Account } from "@/app/(admin)/accounts/columns";
import { Category } from "@/app/(admin)/categories/columns";
import { NewTransactionDialog } from "@/app/(admin)/transactions/new-transaction-dialog";

export default async function Page() {
  const res = await getTransactionsService();
  const { accounts } = (await getIdAndNameAccountsService()) as {
    accounts: Account[];
  };
  const { categories } = (await getIdAndNameCategoriesService()) as {
    categories: Category[];
  };

  if ("error" in res) {
    throw new Error(res.message);
  }
  const data: TransactionRecords[] = res.transactions;

  return (
    <>
      <HeadPage>
        <TitlePage>Transactions</TitlePage>
        <NewTransactionDialog accounts={accounts} categories={categories} />
      </HeadPage>
      <TransactionsTable data={data} />
    </>
  );
}
