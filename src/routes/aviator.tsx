import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { TopBar } from "@/components/dark-vip/TopBar";
import { BrandName } from "@/components/dark-vip/BrandName";
import { LiveWins } from "@/components/dark-vip/LiveWins";
import logo from "@/assets/dark-vip-logo.png";

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
    const duration = 3200;
    const id = setInterval(() => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      setOdd(1 + (target - 1) * eased);
      if (t >= 1) clearInterval(id);
    }, 60);
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

          {/* trail + plane */}
          <div
            key={flying ? `run-${round}` : "idle"}
            className={`absolute bottom-6 left-4 ${flying ? "animate-fly" : "opacity-0"}`}
          >
            <div className="relative">
              <span className="absolute right-full top-1/2 h-[3px] w-[140px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,120,20,0.15),rgba(255,170,40,0.9))]" />
              <svg viewBox="0 0 64 40" className="size-12 -rotate-[18deg]">
                <ellipse cx="30" cy="24" rx="20" ry="7" fill="#f0b23c" />
                <path d="M22 20 L40 8 L44 12 L28 22Z" fill="#e6a02a" />
                <path d="M46 22 L60 16 L60 26Z" fill="#f6c765" />
                <circle cx="12" cy="24" r="5" fill="#c9821d" />
                <rect x="26" y="18" width="10" height="4" rx="2" fill="#fff2d0" />
              </svg>
            </div>
          </div>

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
