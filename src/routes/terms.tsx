import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Check,
  Copy,
  Download,
  ImagePlus,
  Send,
  Ticket,
  X,
  UserRound,
} from "lucide-react";
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
  image,
  badge,
  badgeTone = "gold",
  kicker,
  title,
  description,
  children,
}: {
  image: string;
  badge: string;
  badgeTone?: "gold" | "blue";
  kicker?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <li className="animate-rise relative">
      <div className="surface-card relative overflow-hidden rounded-3xl p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="flex items-start gap-4">
          <div className="size-14 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary/40">
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
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={
                  badgeTone === "gold"
                    ? "rounded-full border border-primary/50 bg-primary/15 px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[0.18em] text-primary"
                    : "rounded-full border border-sky-500/50 bg-sky-500/15 px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[0.18em] text-sky-400"
                }
              >
                {badge}
              </span>
              <h2 className="font-display text-[16px] font-extrabold leading-snug text-foreground">
                {title}
              </h2>
            </div>
            {kicker ? (
              <p className="mt-1 font-display text-[11px] tracking-[0.3em] text-primary/80">
                {kicker}
              </p>
            ) : null}
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </li>
  );
}

function UploadBox({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const inputId = `upload-${label}`;
  return (
    <div className="relative">
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(URL.createObjectURL(file));
        }}
      />
      <label
        htmlFor={inputId}
        className="flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[15px] border border-dashed border-border bg-secondary/25 text-center transition-colors hover:border-primary/60"
      >
        {value ? (
          <img src={value} alt={label} className="size-full object-cover" />
        ) : (
          <>
            <ImagePlus className="size-5 text-primary" />
            <span className="text-[11px] text-muted-foreground">{label}</span>
            <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground/70">
              UPLOAD
            </span>
          </>
        )}
      </label>
      {value ? (
        <button
          onClick={() => onChange(null)}
          aria-label={`حذف ${label}`}
          className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full border border-border bg-background/80 text-foreground"
        >
          <X className="size-3" />
        </button>
      ) : null}
    </div>
  );
}

function TermsPage() {
  const [copied, setCopied] = useState(false);
  const [depositShot, setDepositShot] = useState<string | null>(null);
  const [idShot, setIdShot] = useState<string | null>(null);
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

        <div className="relative mt-6 px-5">
          <ol className="space-y-5">
            <StepCard
              image={stepDownload}
              badge="OFFICIAL"
              kicker="MELBET APP"
              title="تحميل منصة MELBET"
              description="قم بتحميل التطبيق الرسمي لمنصة MELBET لأجهزة أندرويد أو آيفون."
            >
              <button
                onClick={() => toast("جاري تحويلك إلى صفحة التحميل...")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[15px] bg-foreground font-display text-sm font-bold text-background shadow-lg transition-transform active:scale-[0.98]"
              >
                <Download className="size-4" />
                تحميل التطبيق
              </button>
            </StepCard>

            <StepCard
              image={stepTelegram}
              badge="TELEGRAM"
              badgeTone="blue"
              title="الانضمام إلى قناة التلجرام"
              description="اشترك في القناة لمتابعة التحديثات واستلام كود التفعيل."
            >
              <button
                onClick={() => toast("جاري تحويلك إلى قناة التلجرام...")}
                className="bg-gold flex h-12 w-full items-center justify-center gap-2 rounded-[15px] font-display text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
              >
                <Send className="size-4" />
                انضمام الآن
              </button>
            </StepCard>

            <StepCard
              image={stepPromo}
              badge="PROMO"
              title="التسجيل بالبروموكود"
              description="انسخ البروموكود واستخدمه أثناء التسجيل لربط حسابك بالتطبيق."
            >
              <div className="flex h-10 w-full items-center gap-3 rounded-[15px] border border-dashed border-border bg-secondary/25 px-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                  <Ticket className="size-3.5 text-foreground" />
                </span>
                <div className="flex min-w-0 flex-1 items-baseline gap-2">
                  <p className="font-display text-[9px] font-bold tracking-[0.25em] text-muted-foreground">
                    PROMOCODE
                  </p>
                  <p className="font-display text-sm font-extrabold tracking-[0.15em] text-foreground">
                    {PROMO}
                  </p>
                </div>
                <button
                  onClick={copyPromo}
                  aria-label="نسخ البرومو كود"
                  className="flex items-center gap-1.5 px-1 font-display text-[10px] font-bold tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                >
                  {copied ? "COPIED" : "COPY"}
                  {copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>


              <button
                onClick={() => toast("جاري تحويلك إلى صفحة التسجيل...")}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[15px] bg-foreground font-display text-sm font-bold text-background shadow-lg transition-transform active:scale-[0.98]"
              >
                <UserRound className="size-4" />
                التسجيل في منصة MELBET
              </button>
            </StepCard>

            <StepCard
              image={stepDeposit}
              badge="DEPOSIT"
              title="إيداع التفعيل"
              description="الحد الأدنى للإيداع لتنشيط المحفظة (الأموال تبقى في رصيدك)."
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { symbol: "$", value: "6.00", unit: "USD", note: "دولار" },
                  { symbol: "E£", value: "300", unit: "EGP", note: "جنيه" },
                ].map((item) => (
                  <div
                    key={item.unit}
                    className="relative overflow-hidden rounded-[15px] border border-primary/25 bg-gradient-to-b from-primary/10 to-transparent p-3 text-center"
                  >
                    <span className="mx-auto flex size-8 items-center justify-center rounded-full border border-primary/40 bg-primary/15 font-display text-xs font-extrabold text-primary">
                      {item.symbol}
                    </span>
                    <p className="mt-2 font-display text-2xl font-extrabold leading-none text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-1.5 font-display text-[9px] font-bold tracking-[0.25em] text-primary/80">
                      {item.unit}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </StepCard>

            <StepCard
              image={stepId}
              badge="VERIFY"
              title="إدخال الـ ID الخاص بك"
              description="أدخل رقم حسابك في MELBET وارفع صور التأكيد."
            >
              <div className="flex items-center gap-3 rounded-[15px] border border-input bg-secondary/40 px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring">
                <BadgeCheck className="size-4 text-primary" />
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="اكتب ID الحساب"
                  inputMode="numeric"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <UploadBox
                  label="صورة الإيداع"
                  value={depositShot}
                  onChange={setDepositShot}
                />
                <UploadBox
                  label="صورة الـ ID"
                  value={idShot}
                  onChange={setIdShot}
                />
              </div>
            </StepCard>

          </ol>
        </div>

        <div className="px-5">
          <button
            onClick={() =>
              userId.trim()
                ? toast.success("تم إرسال بياناتك للمراجعة")
                : toast.error("الرجاء إدخال الـ ID الخاص بك")
            }
            className="bg-gold shine mt-8 h-14 w-full rounded-[15px] font-display text-base font-extrabold text-primary-foreground transition-transform active:scale-[0.98]"
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
