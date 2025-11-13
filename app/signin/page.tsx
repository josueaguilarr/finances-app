import { Logo } from "@/components/logo";
import LoginForm from "@/app/signin/login-form";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col gap-y-5 justify-center items-center">
      <Logo />
      <LoginForm />
    </div>
  );
}
