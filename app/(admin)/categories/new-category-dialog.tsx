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
      icon={Plus}
      buttonLabel="New category"
      title="New category"
      description="Create a new category for manage your money."
      onOpenChange={setOpen}
    >
      <FormNewCategory onSuccess={() => setOpen(false)} />
    </Dialog>
  );
}
