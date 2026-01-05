"use client";

import { actions } from "@/actions";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFormState } from "@/validations/categories";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const INITIAL_STATE: CategoryFormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  data: {
    name: "",
  },
};

export const FormNewCategory = () => {
  const [state, formAction, pending] = useActionState(
    actions.categories.registerCategoryAction,
    INITIAL_STATE
  );

  useEffect(() => {
    if (state.zodErrors) {
      Object.entries(state.zodErrors).forEach(([, messages]) => {
        messages.forEach((msg) => toast.error(`${msg}`));
      });
    }

    if (state.supabaseErrors) {
      toast.error(state.supabaseErrors.reasons);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={state.data?.name}
          placeholder="Food"
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={pending}>
          Guardar
        </Button>
      </DialogFooter>
    </form>
  );
};
