import { Dialog } from "@/components/dialog";
import { HeadPage } from "@/components/ui/head-page";
import { TitlePage } from "@/components/ui/title-page";
import { Plus } from "lucide-react";
import { FormNewAccount } from "@/components/new-account-form";
import { getAllAccountsService } from "@/lib/supabase/account";
import AccountsTable from "./accounts-table";
import { Account } from "./columns";

export default async function Page() {
  const res = await getAllAccountsService();

  if ("error" in res) {
    throw new Error(res.message);
  }

  const data: Account[] = res.accounts;
  
  return (
    <>
      <HeadPage>
        <TitlePage>Cuentas</TitlePage>
        <Dialog
          icon={Plus}
          buttonLabel="New account"
          btnLabelCancel="Cancelar"
          btnLabelSuccess="Guardar"
          title="New account"
          description="Create a new account for manage your money."
        >
          <FormNewAccount />
        </Dialog>
      </HeadPage>
      <AccountsTable data={data} />
    </>
  );
}
