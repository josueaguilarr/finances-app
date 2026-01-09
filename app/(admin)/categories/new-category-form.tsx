"use client";

import { actions } from "@/actions";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFormState } from "@/validations/categories";
import { Loader } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

const INITIAL_STATE: CategoryFormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  data: {
    name: "",
  },
};

type FormNewCategoryProps = {
  onSuccess: () => void;
};

export const FormNewCategory = ({ onSuccess }: FormNewCategoryProps) => {
  const hasShownToast = useRef(false);
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

    if (state.success && !hasShownToast.current) {
      toast.success(state.message);
      hasShownToast.current = true;
      onSuccess();
    }
  }, [state, onSuccess]);

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
          <Button variant="outline" disabled={pending}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader className="animate-spin" />
              Processing...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};
