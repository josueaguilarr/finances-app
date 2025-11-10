import type { Metadata } from "next";
import { montserrat } from "@/components/ui/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Acia",
    default: "Acia tablero"
  },
  description: "Administra tus finanzas personales de manera eficiente con Acia.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
