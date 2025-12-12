"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  label: string;
  loadingLabel: string;
};

export function SubmitButton({ label, loadingLabel }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full mt-3" disabled={pending}>
      {pending ? (
        <span className="flex items-center gap-2">
          <Spinner className="size-4" /> {loadingLabel}
        </span>
      ) : (
        label
      )}
    </Button>
  );
}
