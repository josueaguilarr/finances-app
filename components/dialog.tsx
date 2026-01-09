import { Button } from "@/components/ui/button";
import {
  Dialog as DialogMain,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideIcon } from "lucide-react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  open?: boolean;
  icon?: LucideIcon;
  buttonLabel: string;
  title: string;
  description: string;
  onOpenChange?: (open: boolean) => void;
}>;

export function Dialog({
  open,
  icon: Icon,
  buttonLabel,
  title,
  description,
  children,
  onOpenChange,
}: Props) {
  return (
    <DialogMain open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          {Icon && <Icon className="size-4" />}
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </DialogMain>
  );
}
