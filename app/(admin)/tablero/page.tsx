import { BalanceCards } from "@/components/balance-cards";
import { HeadPage } from "@/components/ui/head-page";
import { TitlePage } from "@/components/ui/title-page";
import { getTotalBalanceAccounts } from "@/lib/supabase/account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tablero",
};

export default async function Page() {
  const res = await getTotalBalanceAccounts();

  if (res?.error) {
    throw new Error(res?.message);
  }

  const { total } = res;

  return (
    <>
      <HeadPage>
        <TitlePage>Dashboard</TitlePage>
      </HeadPage>
      <BalanceCards total={total} />
    </>
  );
}
