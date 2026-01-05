import { BalanceCards } from "@/components/balance-cards";
import { TitlePage } from "@/components/ui/title-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tablero",
};

export default function Page() {
  return (
    <>
      <TitlePage>Tablero</TitlePage>
      <BalanceCards />
    </>
  );
}
