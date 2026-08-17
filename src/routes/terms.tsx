import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { TopBar } from "@/components/dark-vip/TopBar";
import heroImg from "@/assets/terms-hero.jpg";
import stepDownload from "@/assets/step-download.jpg";
import stepTelegram from "@/assets/step-telegram.jpg";
import stepPromo from "@/assets/step-promo.jpg";
import stepDeposit from "@/assets/step-deposit.jpg";
import stepId from "@/assets/step-id.jpg";

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

function StepCard({
  index,
  image,
  title,
  subtitle,
  children,
}: {
  index: number;
  image: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <li className="surface-card animate-rise relative overflow-hidden p-5">
      <span className="bg-gold absolute inset-y-0 left-0 w-[3px] opacity-70" />

      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary/40">
          <img
            src={image}
            alt=""
            loading="lazy"
            width={512}
            height={512}
            className="size-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-display text-[10px] font-bold tracking-widest text-primary">
              STEP {index}
            </span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
              {subtitle}
            </span>
          </div>
          <h2 className="mt-1.5 font-display text-[15px] font-bold leading-snug text-foreground">
            {title}
          </h2>
        </div>
      </div>

      {children ? <div className="mt-5">{children}</div> : null}
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

      <main className="mx-auto w-full max-w-xl pb-16">
        <section className="relative h-52 overflow-hidden">
          <img
            src={heroImg}
            alt="أجواء DARK VIP الذهبية"
            width={1536}
            height={768}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5 text-center">
            <p className="text-[10px] tracking-[0.45em] text-primary">
              ACCOUNT ACTIVATION
            </p>
            <h1 className="mt-2 font-display text-xl font-extrabold text-foreground">
              الرجاء إكمال الشروط التالية
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              5 خطوات فقط لتفعيل عضويتك الحصرية
            </p>
          </div>
        </section>

        <div className="flex items-center justify-center gap-2 px-5 pt-5">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className="bg-gold h-1 w-8 rounded-full opacity-40 first:opacity-100"
            />
          ))}
        </div>

        <ol className="mt-6 space-y-4 px-5">
          <StepCard
            index={1}
            image={stepDownload}
            subtitle="PLATFORM"
            title="تحميل منصة MELBET"
          >
            <button
              onClick={() => toast("جاري تحويلك إلى صفحة التحميل...")}
              className="h-12 w-full rounded-2xl bg-foreground font-display text-sm font-bold text-background transition-transform active:scale-[0.98]"
            >
              تحميل
            </button>
          </StepCard>

          <StepCard
            index={2}
            image={stepTelegram}
            subtitle="COMMUNITY"
            title="الانضمام إلى قناة التلجرام"
          >
            <button
              onClick={() => toast("جاري تحويلك إلى قناة التلجرام...")}
              className="bg-gold h-12 w-full rounded-2xl font-display text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              انضمام
            </button>
          </StepCard>

          <StepCard
            index={3}
            image={stepPromo}
            subtitle="PROMO CODE"
            title="إنشاء حساب باستخدام البرومو كود الخاص بالتطبيق"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-input bg-secondary/40 p-2 pl-4">
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
          </StepCard>

          <StepCard
            index={4}
            image={stepDeposit}
            subtitle="DEPOSIT"
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
          </StepCard>

          <StepCard
            index={5}
            image={stepId}
            subtitle="VERIFY"
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
          </StepCard>
        </ol>

        <div className="px-5">
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
        </div>
      </main>
    </div>
  );
}
