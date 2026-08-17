import { createFileRoute } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { TopBar } from "@/components/dark-vip/TopBar";
import { BrandName } from "@/components/dark-vip/BrandName";
import logo from "@/assets/dark-vip-logo.png";

export const Route = createFileRoute("/aviator")({
  head: () => ({
    meta: [
      { title: "Aviator — DARK VIP" },
      {
        name: "description",
        content: "إشارات Aviator داخل نادي DARK VIP — قريبًا.",
      },
      { property: "og:title", content: "Aviator — DARK VIP" },
      {
        property: "og:description",
        content: "إشارات Aviator داخل نادي DARK VIP — قريبًا.",
      },
    ],
  }),
  component: AviatorPage,
});

function AviatorPage() {
  return (
    <div className="min-h-screen">
      <TopBar backTo="/terms" />
      <main className="mx-auto flex w-full max-w-xl flex-col items-center px-5 pb-16 pt-10 text-center">
        <img
          src={logo}
          alt="شعار DARK VIP"
          width={112}
          height={112}
          className="size-20 object-contain"
        />
        <BrandName className="mt-3 text-lg" />
        <p className="mt-1 font-display text-[10px] tracking-[0.4em] text-primary">
          AVIATOR
        </p>
        <div className="surface-card mt-8 w-full rounded-3xl p-8">
          <Plane className="mx-auto size-8 text-primary" />
          <h1 className="mt-4 font-display text-lg font-extrabold text-foreground">
            إشارات Aviator
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            هذه اللعبة قيد التجهيز وسيتم تفعيلها قريبًا.
          </p>
        </div>
      </main>
    </div>
  );
}
