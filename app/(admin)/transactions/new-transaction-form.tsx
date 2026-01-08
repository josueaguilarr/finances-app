"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions } from "@/actions";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { TransactionFormState } from "@/validations/transaction";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Account } from "../accounts/columns";
import { Category } from "../categories/columns";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_STATE: TransactionFormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  data: {
    account: "",
    category: "",
    date: "",
    description: "",
    amount: "0.0",
    type: "expense",
    notes: "",
  },
};

type FormNewTransactionProps = {
  accounts: Account[];
  categories: Category[];
};

export const FormNewTransaction = ({
  accounts,
  categories,
}: FormNewTransactionProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("00:00:00");

  const buildDateTime = () => {
    if (!date || !time) return "";

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${time}`;
  };

  const [state, formAction, pending] = useActionState(
    actions.transactions.registerTransactionAction,
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
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="account">Account</FieldLabel>
          <Select name="account" defaultValue={state.data?.account}>
            <SelectTrigger id="account">
              <SelectValue placeholder={accounts[0].name} />
            </SelectTrigger>
            <SelectContent>
              {accounts.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Select name="category" defaultValue={state.data?.category}>
            <SelectTrigger id="category">
              <SelectValue placeholder={categories[0].name} />
            </SelectTrigger>
            <SelectContent>
              {categories.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="category">Date</FieldLabel>
          <input type="hidden" name="date" value={buildDateTime()} />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date.toISOString().slice(0, 10) : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                captionLayout="dropdown"
                onSelect={(selected) => {
                  setDate(selected);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field>
          <FieldLabel htmlFor="category">Time</FieldLabel>

          <Input
            type="time"
            id="time-picker"
            value={time}
            step="1"
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            onChange={(e) => setTime(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="amount">Amount</FieldLabel>
          <Input
            id="amount"
            type="text"
            name="amount"
            defaultValue={state.data?.amount}
            placeholder="0.00"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <Select name="type" defaultValue={state.data?.type}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Expense" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <FieldSet className="col-span-2">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Add any additional description"
                className="resize-none"
                name="description"
                defaultValue={state.data?.description}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet className="col-span-2">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Textarea
                id="notes"
                placeholder="Add any additional notes"
                className="resize-none"
                defaultValue={state.data?.notes}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
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
