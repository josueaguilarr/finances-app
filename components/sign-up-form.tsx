"use client";

import { actions } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { type FormState } from "@/validations/auth";
import Link from "next/link";
import { toast } from "sonner";
import { SubmitButton } from "./submit-button";

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  data: {
    email: "",
    password: "",
    confirmPassword: "",
  },
};

export function SignupForm() {
  const [formState, formAction] = useActionState(
    actions.auth.registerUserAction,
    INITIAL_STATE
  );

  useEffect(() => {
    if (formState.zodErrors) {
      Object.entries(formState.zodErrors).forEach(([, messages]) => {
        messages.forEach((msg) => toast.error(`${msg}`));
      });
    }

    if (formState.supabaseErrors) {
      toast.error(formState.supabaseErrors.reasons);
    }
  }, [formState]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registro</CardTitle>
        <CardDescription>Descripcion</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                name="email"
                defaultValue={formState.data?.email ?? ""}
                placeholder="jhondoe@sample.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input
                id="password"
                type="text"
                name="password"
                defaultValue={formState.data?.password ?? ""}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirmar contraseña</Label>
              </div>
              <Input
                id="password"
                type="text"
                name="confirmPassword"
                defaultValue={formState.data?.confirmPassword ?? ""}
                required
              />
            </div>
          </div>

          <SubmitButton label="Registrarse" loadingLabel="Registrando..." />
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-xs mt-3">
          ¿Ya estas registrado?{" "}
          <Link
            href="/signin"
            className="font-semibold underline-offset-4 hover:underline"
          >
            Inicia sesión
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
