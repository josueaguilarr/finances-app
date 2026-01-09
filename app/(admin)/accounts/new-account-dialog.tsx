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
      onOpenChange={setOpen}
      icon={Plus}
      buttonLabel="New account"
      btnLabelCancel="Cancel"
      btnLabelSuccess="Save"
      title="New account"
      description="Create a new account for manage your money."
    >
      <FormNewAccount onSuccess={() => setOpen(false)} />
    </Dialog>
  );
}
