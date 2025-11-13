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

export default function LoginForm() {
  const { setFormLogin, formLogin, signin, loading } = useAuthStore();
  const { email, password } = formLogin;
  const router = useRouter();

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signin();

    if (res) {
      router.push("/tablero");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Inicio de sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a la plataforma.
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
                  setFormLogin({ email: e.target.value });
                }}
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
                value={password}
                required
                onChange={(e) => {
                  setFormLogin({ password: e.target.value });
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          form="signin-form"
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (<><Spinner /> Iniciando sesión</>) : "Iniciar sesión"}
        </Button>
        <p className="text-xs mt-3">¿No tienes cuenta? <Link href="/signup" className="font-semibold underline-offset-4 hover:underline">Registrate</Link>.</p>
      </CardFooter>
    </Card>
  );
}
