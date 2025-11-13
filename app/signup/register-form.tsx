"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuth";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { setFormRegister, formRegister, signup, loading } = useAuthStore();
  const { email, password, confirmPassword } = formRegister;
  const router = useRouter();

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signup();

    if (res) {
      router.push("/signin");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registro</CardTitle>
        <CardDescription>
          Descripcion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitLogin} id="signin-form">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="jhondoe@sample.com"
                required
                onChange={(e) => {
                  setFormRegister({ email: e.target.value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input
                id="password"
                type="text"
                value={password}
                required
                onChange={(e) => {
                  setFormRegister({ password: e.target.value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirmar contraseña</Label>
              </div>
              <Input
                id="password"
                type="text"
                value={confirmPassword}
                required
                onChange={(e) => {
                  setFormRegister({ confirmPassword: e.target.value });
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="signin-form" type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Spinner /> Registrando
            </>
          ) : (
            "Registrarse"
          )}
        </Button>
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
