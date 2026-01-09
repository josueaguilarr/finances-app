import { HeadPage } from "@/components/ui/head-page";
import { TitlePage } from "@/components/ui/title-page";
import { getAccountsService } from "@/lib/supabase/account";
import AccountsTable from "@/app/(admin)/accounts/accounts-table";
import { Account } from "@/app/(admin)/accounts/columns";
import { NewAccountDialog } from "./new-account-dialog";

export default async function Page() {
  const res = await getAccountsService();

  if ("error" in res) {
    throw new Error(res.message);
  }

  const data: Account[] = res.accounts;

  return (
    <>
      <HeadPage>
        <TitlePage>Accounts</TitlePage>
        <NewAccountDialog />
      </HeadPage>
      <AccountsTable data={data} />
    </>
  );
}
