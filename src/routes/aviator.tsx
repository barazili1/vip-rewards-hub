import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { TopBar } from "@/components/dark-vip/TopBar";
import { BrandName } from "@/components/dark-vip/BrandName";
import { LiveWins } from "@/components/dark-vip/LiveWins";
import logo from "@/assets/brand-logo.jpg";

export const Route = createFileRoute("/aviator")({
  head: () => ({
    meta: [
      { title: "Aviator — DARK VIP" },
      {
        name: "description",
        content: "إشارات Aviator داخل نادي DARK VIP مع أودد مباشر وأحدث الأرباح.",
      },
      { property: "og:title", content: "Aviator — DARK VIP" },
      {
        property: "og:description",
        content: "اضغط بدأ لتشغيل إشارة Aviator ومتابعة الأودد.",
      },
    ],
  }),
  component: AviatorPage,
});

function AviatorPage() {
  const [round, setRound] = useState(0);
  const [flying, setFlying] = useState(false);
  const [odd, setOdd] = useState(1);
  const [target, setTarget] = useState(1);

  useEffect(() => {
    if (!flying) return;
    const start = Date.now();
    const duration = 1000;
    const id = setInterval(() => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      setOdd(1 + (target - 1) * eased);
      if (t >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [flying, round, target]);

  const startRound = () => {
    setTarget(1 + Math.random() * 6);
    setOdd(1);
    setRound((r) => r + 1);
    setFlying(true);
  };

  const resetRound = () => {
    setFlying(false);
    setOdd(1);
  };


  return (
    <div className="min-h-screen">
      <TopBar backTo="/terms" usersOnline={4821} />

      <main className="mx-auto w-full max-w-xl px-5 pb-16">
        <section className="mt-6 flex flex-col items-center">
          <img
            src={logo}
            alt="شعار DARK VIP"
            width={112}
            height={112}
            className="size-20 object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
          />
          <BrandName className="mt-3 text-lg" />
          <p className="mt-1 font-display text-[10px] tracking-[0.4em] text-primary">
            AVIATOR
          </p>
        </section>

        {/* Game canvas */}
        <section className="relative mt-6 h-[280px] overflow-hidden rounded-3xl border border-border bg-[#12121a] shadow-[var(--shadow-card)]">
          {/* stars */}
          <div className="absolute inset-0 opacity-70">
            {STARS.map((s, i) => (
              <span
                key={i}
                className="absolute size-[2px] rounded-full bg-white/60"
                style={{ left: `${s[0]}%`, top: `${s[1]}%` }}
              />
            ))}
          </div>

          {/* horizon glow */}
          <div className="pointer-events-none absolute -left-10 bottom-0 size-56 rounded-full bg-[radial-gradient(circle,rgba(255,150,40,0.35),transparent_65%)] blur-xl" />

          {/* mountains */}
          <svg
            className="absolute inset-x-0 bottom-0 w-full"
            viewBox="0 0 400 90"
            preserveAspectRatio="none"
          >
            <path
              d="M0 70 L45 42 L90 66 L140 34 L195 68 L245 45 L300 72 L350 50 L400 74 L400 90 L0 90Z"
              fill="rgba(255,255,255,0.07)"
            />
            <path
              d="M0 82 L60 60 L120 80 L180 58 L250 82 L320 64 L400 84 L400 90 L0 90Z"
              fill="rgba(255,255,255,0.045)"
            />
          </svg>

          {/* trail + dot */}
          <svg
            key={flying ? `run-${round}` : "idle"}
            viewBox="0 0 400 280"
            preserveAspectRatio="none"
            className={`absolute inset-0 size-full ${flying ? "" : "opacity-0"}`}
          >
            <defs>
              <linearGradient id="trailGrad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,110,20,0.15)" />
                <stop offset="55%" stopColor="rgba(255,150,30,0.75)" />
                <stop offset="100%" stopColor="rgba(255,205,90,1)" />
              </linearGradient>
            </defs>
            <path
              d="M0 280 C 130 274, 265 215, 400 30"
              fill="none"
              stroke="url(#trailGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              className={flying ? "animate-trail" : ""}
            />
            <circle
              r="15"
              fill="#f5c451"
              className={flying ? "animate-fly-dot" : ""}
              style={{ offsetPath: 'path("M0 280 C 130 274, 265 215, 400 30")' }}
            />
          </svg>

          {/* multiplier */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`font-display text-5xl font-extrabold tabular-nums ${
                flying ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {odd.toFixed(2)}
              <span className="ml-0.5 align-super text-2xl text-primary">x</span>
            </span>
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={startRound}
            className="flex h-12 items-center justify-center gap-2 rounded-[15px] bg-foreground font-display text-sm font-extrabold text-background shadow-lg transition-transform active:scale-[0.98]"
          >
            <Play className="size-4" />
            بدأ
          </button>
          <button
            onClick={resetRound}
            className="bg-gold flex h-12 items-center justify-center gap-2 rounded-[15px] font-display text-sm font-extrabold text-primary-foreground transition-transform active:scale-[0.98]"
          >
            <RotateCcw className="size-4" />
            اعاده بدأ
          </button>
        </div>

        <LiveWins />
      </main>
    </div>
  );
}

const STARS: [number, number][] = [
  [8, 12],
  [18, 30],
  [26, 8],
  [35, 22],
  [44, 14],
  [52, 34],
  [61, 10],
  [69, 26],
  [77, 16],
  [86, 30],
  [93, 9],
  [14, 48],
  [30, 55],
  [48, 50],
  [66, 46],
  [82, 52],
];
