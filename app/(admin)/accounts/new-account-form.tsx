"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useActionState, useEffect } from "react";
import { actions } from "@/actions";
import { toast } from "sonner";
import { AccountFormState } from "@/validations/account";
import { DialogFooter } from "../../../components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../../../components/ui/button";

const INITIAL_STATE: AccountFormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  data: {
    name: "",
    type: "cash",
    balance: "0.00",
    currency: "mxn",
  },
};

export const FormNewAccount = () => {
  const [state, formAction, pending] = useActionState(
    actions.accounts.registerAccountAction,
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
    <>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={state.data?.name}
            placeholder="Personal"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="type">Type</FieldLabel>
            <Select name="type" defaultValue={state.data?.type}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Cash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="balance">Balance</FieldLabel>
            <Input
              id="balance"
              type="text"
              name="balance"
              defaultValue={state.data?.balance}
              placeholder="0.00"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="currency">Currency</FieldLabel>
            <Select name="currency" defaultValue={state.data?.currency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="MXN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mxn">MXN</SelectItem>
                <SelectItem value="usd">USD</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={pending}>Guardar</Button>
        </DialogFooter>
      </form>
    </>
  );
};
