import { logo_font, title_font } from "./ui/fonts/fonts";

export function Logo() {
  return (
    <div className="flex items-center gap-x-2">
      <p
        className={`${logo_font.className} text-2xl bg-foreground text-background rounded-full size-6 flex justify-center items-center`}
      >
        N
      </p>
      <p className={`${title_font.className} text-2xl tracking-[0.2em]`}>ACIA</p>
    </div>
  );
}
