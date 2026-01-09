"use client";

import { useState } from "react";
import { Dialog } from "@/components/dialog";
import { Plus } from "lucide-react";
import { FormNewCategory } from "@/app/(admin)/categories/new-category-form";

export function NewCategoryDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      icon={Plus}
      buttonLabel="New category"
      btnLabelCancel="Cancel"
      btnLabelSuccess="Save"
      title="New category"
      description="Create a new category for manage your money."
    >
      <FormNewCategory onSuccess={() => setOpen(false)} />
    </Dialog>
  );
}
