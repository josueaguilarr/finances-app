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
import { Input } from "@/components/ui/input";
import { FormState } from "@/validations/auth";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { SubmitButton } from "./submit-button";

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  data: {
    email: "",
    password: "",
  },
};

export function SigninForm() {
  const [formState, formAction] = useActionState(
    actions.auth.loginUserAction,
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
        <CardTitle className="text-2xl">Inicio de sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a la plataforma.
        </CardDescription>
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
                <a
                  href="#"
                  className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                defaultValue={formState.data?.password ?? ""}
                required
              />
            </div>
          </div>

          <SubmitButton label="Iniciar sesión" loadingLabel="Iniciando sesión..." />
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-xs mt-3">
          ¿No tienes cuenta?{" "}
          <Link
            href="/signup"
            className="font-semibold underline-offset-4 hover:underline"
          >
            Registrate
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
