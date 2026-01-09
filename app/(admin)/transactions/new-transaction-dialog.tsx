"use client";

import { useState } from "react";
import { Dialog } from "@/components/dialog";
import { Plus } from "lucide-react";
import { FormNewTransaction } from "@/app/(admin)/transactions/new-transaction-form";
import { Account } from "@/app/(admin)/accounts/columns";
import { Category } from "@/app/(admin)/categories/columns";

type Props = {
  accounts: Account[];
  categories: Category[];
};

export function NewTransactionDialog({ accounts, categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      icon={Plus}
      buttonLabel="New transaction"
      title="New transaction"
      description="Create a new transaction for manage your money."
      onOpenChange={setOpen}
    >
      <FormNewTransaction
        accounts={accounts}
        categories={categories}
        onSuccess={() => setOpen(false)}
      />
    </Dialog>
  );
}
