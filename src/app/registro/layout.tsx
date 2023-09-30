import { Header } from "@/components/layout/header";
import { Copyright } from "@/components/layout/copyright";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen max-w-[498px] flex-col gap-8 rounded-xl px-4 py-6 sm:my-8 sm:bg-white sm:px-6 sm:shadow-main">
      <Header />

      <main className="flex flex-col gap-8">{children}</main>

      <Copyright />
    </div>
  );
}
