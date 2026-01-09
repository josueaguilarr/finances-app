"use client";

import { useState } from "react";
import { Dialog } from "@/components/dialog";
import { Plus } from "lucide-react";
import { FormNewAccount } from "@/app/(admin)/accounts/new-account-form";

export function NewAccountDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      icon={Plus}
      buttonLabel="New account"
      title="New account"
      description="Create a new account for manage your money."
      onOpenChange={setOpen}
    >
      <FormNewAccount onSuccess={() => setOpen(false)} />
    </Dialog>
  );
}
