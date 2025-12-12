import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-screen w-full
        bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#072607_100%)]
      "
    >
      <div className="w-full h-screen flex flex-col gap-y-5 justify-center items-center">
            <Logo />
      {children}
          </div>
    </div>
  );
}
