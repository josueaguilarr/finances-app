import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { title } from "@/components/ui/fonts/fonts";
import { nothing } from "@/components/ui/fonts/fonts";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col gap-y-5 justify-center items-center">
      <div className="flex items-center gap-x-2">
        <p className={`${nothing.className} text-2xl bg-foreground text-background rounded-full size-6 flex justify-center items-center`}>N</p>
        <p className={`${title.className} text-2xl tracking-[0.2em]`}>
          ACIA
        </p>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Para iniciar sesión, ingresa tus credenciales.
          </CardDescription>
          <CardAction>
            <Button variant="link">Registrate</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jhondoe@sample.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
          <Button variant="outline" className="w-full">
            Iniciar con Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
