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
      onOpenChange={setOpen}
      icon={Plus}
      buttonLabel="New transaction"
      btnLabelCancel="Cancel"
      btnLabelSuccess="Save"
      title="New transaction"
      description="Create a new transaction for manage your money."
    >
      <FormNewTransaction
        accounts={accounts}
        categories={categories}
        onSuccess={() => setOpen(false)}
      />
    </Dialog>
  );
}
