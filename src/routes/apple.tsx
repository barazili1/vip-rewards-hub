import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { TopBar } from "@/components/dark-vip/TopBar";
import { BrandName } from "@/components/dark-vip/BrandName";
import logo from "@/assets/dark-vip-logo.png";

export const Route = createFileRoute("/apple")({
  head: () => ({
    meta: [
      { title: "Apple of Fortune — DARK VIP" },
      {
        name: "description",
        content:
          "لوحة إشارات Apple of Fortune داخل DARK VIP: 10 صفوف مع الأودد الخاص بكل صف.",
      },
      { property: "og:title", content: "Apple of Fortune — DARK VIP" },
      {
        property: "og:description",
        content: "اضغط Start لعرض إشارات التفاح لكل صف.",
      },
    ],
  }),
  component: ApplePage,
});

const CELL_EMPTY = "https://logo12.gamer.gd/cvb.png";
const CELL_GOOD = "https://logo12.gamer.gd/apple.png";
const CELL_BAD = "https://logo12.gamer.gd/poi.png";

// من تحت لفوق: 1.23 ... 349.43
const ODDS = [
  1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.43,
];

const WINNERS = [
  { id: "27*******81", bet: 50, win: 300 },
  { id: "31*******04", bet: 120, win: 964 },
  { id: "45*******17", bet: 75, win: 512 },
  { id: "58*******62", bet: 200, win: 1490 },
  { id: "62*******39", bet: 40, win: 268 },
];

function randomRows() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 5));
}

function ApplePage() {
  const [rotten, setRotten] = useState<number[] | null>(null);

  const rowsTopDown = [...ODDS].reverse();

  return (
    <div className="min-h-screen">
      <TopBar backTo="/terms" />

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
            APPLE OF FORTUNE
          </p>
        </section>

        <section className="surface-card mt-6 rounded-3xl p-4">
          <div className="flex flex-col gap-2">
            {rowsTodown(rowsTopDown).map((odd, rowFromTop) => {
              const rowIndex = 9 - rowFromTop;
              const badIndex = rotten ? rotten[rowIndex] : null;
              return (
                <div key={odd} className="flex items-center justify-center gap-2">
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, col) => {
                      const src =
                        badIndex === null
                          ? CELL_EMPTY
                          : col === badIndex
                            ? CELL_BAD
                            : CELL_GOOD;
                      return (
                        <span
                          key={col}
                          className="flex size-[50px] items-center justify-center overflow-hidden rounded-[12px] border border-border bg-secondary/30"
                        >
                          <img
                            src={src}
                            alt=""
                            loading="lazy"
                            className="size-full object-contain p-0.5"
                          />
                        </span>
                      );
                    })}
                  </div>
                  <span className="w-14 shrink-0 text-left font-display text-[11px] font-bold text-primary">
                    {odd.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => setRotten(randomRows())}
            className="flex h-12 items-center justify-center gap-2 rounded-[15px] bg-foreground font-display text-sm font-extrabold text-background shadow-lg transition-transform active:scale-[0.98]"
          >
            <Play className="size-4" />
            بدأ
          </button>
          <button
            onClick={() => setRotten(null)}
            className="bg-gold flex h-12 items-center justify-center gap-2 rounded-[15px] font-display text-sm font-extrabold text-primary-foreground transition-transform active:scale-[0.98]"
          >
            <RotateCcw className="size-4" />
            اعاده بدأ
          </button>
        </div>

        <section className="surface-card mt-6 overflow-hidden rounded-3xl">
          <div className="border-b border-border px-4 py-3">
            <p className="font-display text-[10px] font-bold tracking-[0.3em] text-primary">
              LATEST WINS
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 border-b border-border px-4 py-2 font-display text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
            <span>User id</span>
            <span className="text-center">BetAmount</span>
            <span className="text-right">WinAmount</span>
          </div>
          {WINNERS.map((w) => (
            <div
              key={w.id}
              className="grid grid-cols-3 gap-2 border-b border-border/60 px-4 py-2.5 text-xs last:border-0"
            >
              <span className="font-display text-foreground">{w.id}</span>
              <span className="text-center text-muted-foreground">{w.bet}</span>
              <span className="text-right font-display font-bold text-primary">
                {w.win}
              </span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

function rowsTodown(rows: number[]) {
  return rows;
}
