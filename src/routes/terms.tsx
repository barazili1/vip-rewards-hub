import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Check,
  Copy,
  Download,
  Fingerprint,
  Send,
  Ticket,
  Wallet,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { TopBar } from "@/components/dark-vip/TopBar";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "شروط إنشاء الحساب — DARK VIP" },
      {
        name: "description",
        content:
          "أكمل خطوات إنشاء حساب DARK VIP: تحميل المنصة، الانضمام للقناة، البرومو كود، الإيداع، وإدخال الـ ID.",
      },
      { property: "og:title", content: "شروط إنشاء الحساب — DARK VIP" },
      {
        property: "og:description",
        content: "خمس خطوات بسيطة لتفعيل عضويتك في DARK VIP.",
      },
    ],
  }),
  component: TermsPage,
});

const PROMO = "MELBG";

function Step({
  index,
  icon,
  title,
  children,
}: {
  index: number;
  icon: ReactNode;
  title: string;
  children?: ReactNode;
}) {
  return (
    <li className="surface-card animate-rise p-5">
      <div className="flex items-start gap-4">
        <span className="bg-gold flex size-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold text-primary-foreground">
          {index}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-primary">{icon}</div>
          <h2 className="mt-2 font-display text-[15px] font-bold leading-relaxed text-foreground">
            {title}
          </h2>
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </li>
  );
}

function TermsPage() {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState("");

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO);
      setCopied(true);
      toast.success("تم نسخ البرومو كود");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("تعذّر النسخ، انسخ الكود يدويًا");
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar backTo="/login" />

      <main className="mx-auto w-full max-w-xl px-5 pt-8 pb-16">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.4em] text-primary">
            ACTIVATION
          </p>
          <h1 className="mt-3 font-display text-xl font-extrabold text-foreground">
            الرجاء إكمال الشروط التالية
          </h1>
          <div className="bg-gold mx-auto mt-4 h-px w-24 opacity-70" />
        </div>

        <ol className="mt-8 space-y-4">
          <Step
            index={1}
            icon={<Download className="size-4" />}
            title="تحميل منصة MELBET"
          >
            <button
              onClick={() => toast("جاري تحويلك إلى صفحة التحميل...")}
              className="h-12 w-full rounded-2xl bg-foreground font-display text-sm font-bold text-background transition-transform active:scale-[0.98]"
            >
              تحميل
            </button>
          </Step>

          <Step
            index={2}
            icon={<Send className="size-4" />}
            title="الانضمام إلى قناة التلجرام"
          >
            <button
              onClick={() => toast("جاري تحويلك إلى قناة التلجرام...")}
              className="bg-gold h-12 w-full rounded-2xl font-display text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              انضمام
            </button>
          </Step>

          <Step
            index={3}
            icon={<Ticket className="size-4" />}
            title="إنشاء حساب باستخدام البرومو كود الخاص بالتطبيق"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-input bg-secondary/40 p-2 pr-4">
              <span className="flex-1 font-mono text-lg font-bold tracking-[0.35em] text-primary">
                {PROMO}
              </span>
              <button
                onClick={copyPromo}
                aria-label="نسخ البرومو كود"
                className="flex h-10 items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
                {copied ? "تم النسخ" : "نسخ"}
              </button>
            </div>
            <button
              onClick={() => toast("جاري تحويلك إلى صفحة التسجيل...")}
              className="mt-3 h-12 w-full rounded-2xl bg-foreground font-display text-sm font-bold text-background transition-transform active:scale-[0.98]"
            >
              تسجيل
            </button>
          </Step>

          <Step
            index={4}
            icon={<Wallet className="size-4" />}
            title="إيداع مبلغ بحد أدنى"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "300", unit: "جنيه مصري" },
                { value: "6", unit: "دولار أمريكي" },
              ].map((item) => (
                <div
                  key={item.unit}
                  className="rounded-2xl border border-primary/25 bg-primary/5 py-4 text-center"
                >
                  <p className="font-display text-2xl font-extrabold text-primary">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {item.unit}
                  </p>
                </div>
              ))}
            </div>
          </Step>

          <Step
            index={5}
            icon={<Fingerprint className="size-4" />}
            title="إدخال الـ ID الخاص بك"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-input bg-secondary/40 px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring">
              <BadgeCheck className="size-4 text-primary" />
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="اكتب ID الحساب"
                inputMode="numeric"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </Step>
        </ol>

        <button
          onClick={() =>
            userId.trim()
              ? toast.success("تم إرسال بياناتك للمراجعة")
              : toast.error("الرجاء إدخال الـ ID الخاص بك")
          }
          className="bg-gold shine mt-8 h-14 w-full rounded-2xl font-display text-base font-extrabold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          إرسال وإكمال التسجيل
        </button>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
          سيتم تفعيل عضويتك بعد التحقق من إكمال جميع الشروط.
        </p>
      </main>
    </div>
  );
}
