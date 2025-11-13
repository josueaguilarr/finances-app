import { Logo } from "@/components/logo";
import RegisterForm from "@/app/signup/register-form";

export default function page() {
  return (
    <div className="w-full h-screen flex flex-col gap-y-5 justify-center items-center">
      <Logo />
      <RegisterForm />
    </div>
  );
}
