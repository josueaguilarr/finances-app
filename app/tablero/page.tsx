import { BalanceCards } from "@/components/balance-cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tablero"
}

export default function Page() {
  return (
    <>
      <BalanceCards />
    </>
  );
}
