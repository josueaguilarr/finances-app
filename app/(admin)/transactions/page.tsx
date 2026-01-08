"use server"

import { Dialog } from "@/components/dialog";
import { HeadPage } from "@/components/ui/head-page";
import { TitlePage } from "@/components/ui/title-page";
import { Plus } from "lucide-react";
import TransactionsTable from "./transactions-table";
import { getTransactionsService } from "@/lib/supabase/transactions";
import { TransactionRecords } from "./columns";
import { FormNewTransaction } from "./new-transaction-form";
import { getIdAndNameAccountsService } from "@/lib/supabase/account";
import { getIdAndNameCategoriesService } from "@/lib/supabase/categories";
import { type Account } from "../accounts/columns";
import { Category } from "../categories/columns";

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
        <Dialog
          icon={Plus}
          buttonLabel="New transaction"
          btnLabelCancel="Cancel"
          btnLabelSuccess="Save"
          title="New transaction"
          description="Create a new transaction for manage your money."
        >
          <FormNewTransaction accounts={accounts} categories={categories} />
        </Dialog>
      </HeadPage>
      <TransactionsTable data={data} />
    </>
  );
}
