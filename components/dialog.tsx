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
  icon?: LucideIcon;
  buttonLabel: string;
  btnLabelCancel: string;
  btnLabelSuccess: string;
  title: string;
  description: string;
}>;

export function Dialog({
  icon: Icon,
  buttonLabel,
  title,
  description,
  children,
}: Props) {
  return (
    <DialogMain>
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
