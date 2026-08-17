import { createFileRoute, Link } from "@tanstack/react-router";
import { KeyRound, LifeBuoy, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import logo from "@/assets/brand-logo.jpg";
import { BrandName } from "@/components/dark-vip/BrandName";
import { TopBar } from "@/components/dark-vip/TopBar";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — DARK VIP" },
      {
        name: "description",
        content: "أدخل كود العضوية الخاص بك للدخول إلى تطبيق DARK VIP.",
      },
      { property: "og:title", content: "تسجيل الدخول — DARK VIP" },
      {
        property: "og:description",
        content: "أدخل كود العضوية الخاص بك للدخول إلى DARK VIP.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen">
      <TopBar usersOnline={2481} />

      <main className="mx-auto w-full max-w-xl px-5 pt-10 pb-16">
        <section className="surface-card animate-rise glow px-6 py-9">
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="شعار DARK VIP"
              loading="lazy"
              width={816}
              height={816}
              className="size-24 object-contain"
            />
            <h1 className="mt-5">
              <BrandName className="text-2xl" />
            </h1>
            <p className="mt-2 text-xs tracking-[0.3em] text-muted-foreground">
              MEMBERS LOGIN
            </p>
          </div>

          <div className="mt-9">
            <label
              htmlFor="code"
              className="mb-2 block text-sm text-muted-foreground"
            >
              كود الدخول
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-input bg-secondary/40 px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring">
              <KeyRound className="size-4 text-primary" />
              <input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="أدخل الكود الخاص بك"
                className="h-13 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <button
            onClick={() =>
              code.trim()
                ? toast.success("جاري التحقق من الكود...")
                : toast.error("الرجاء إدخال الكود أولاً")
            }
            className="mt-6 h-13 w-full rounded-2xl bg-foreground font-display text-sm font-bold tracking-wide text-background transition-transform active:scale-[0.98]"
          >
            تسجيل الدخول
          </button>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => toast("تواصل معنا عبر قناة الدعم")}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/40 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <LifeBuoy className="size-4 text-primary" />
              تحتاج لمساعدة
            </button>
            <Link
              to="/terms"
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-primary/50 bg-primary/10 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              <UserPlus className="size-4" />
              إنشاء حساب
            </Link>
          </div>
        </section>

        <p className="mt-8 text-center text-[11px] tracking-widest text-muted-foreground">
          DARK VIP © {new Date().getFullYear()}
        </p>
      </main>
    </div>
  );
}
