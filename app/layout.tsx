
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I'm Sorry, Pooja ❤️",
  description:
    "A little apology from Uday, made with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
