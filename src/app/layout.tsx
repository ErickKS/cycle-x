import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Porto Seguro Bike",
  description: "Contrate o seguro para sua bicicleta!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} grid min-h-screen sm:place-content-center sm:bg-gradient sm:bg-fixed`}
      >
        {children}
      </body>
    </html>
  );
}
