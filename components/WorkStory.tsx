"use client";

import Link from "next/link";
import { PlayField, trackPointer } from "@/components/PlayField";
import type { WorkItem } from "@/lib/work";

export function WorkStory({ item }: { item: WorkItem }) {
  const doors = item.play === "doors";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink bg-paper">
        <div className="flex items-center justify-between px-4 py-3 md:px-5">
          <Link href="/#work" className="mono text-[11px] tracking-[0.2em] uppercase hover:text-signal">
            ← Work
          </Link>
          <Link
            href="/"
            className="font-display px-2 text-center text-[13px] leading-none tracking-tight whitespace-nowrap sm:text-[15px]"
          >
            Figuring out the Unsolvable
          </Link>
          <span className="mono text-[10px] tracking-[0.16em] uppercase opacity-60">{item.place}</span>
        </div>
      </header>

      <main>
        <section
          onPointerMove={trackPointer}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--px", "0.5");
            event.currentTarget.style.setProperty("--py", "0.5");
          }}
        className={`relative min-h-[78vh] overflow-hidden border-b border-ink ${
          doors || item.tone === "ink"
            ? "bg-ink text-paper"
            : item.tone === "paper"
              ? "bg-paper text-ink"
              : "bg-signal text-paper"
        }`}
        >
          <div className="play-host pointer-events-none absolute inset-0">
            <PlayField play={item.play} />
          </div>
          <div className="relative z-10 flex min-h-[78vh] flex-col justify-end p-5 sm:p-10">
            <p className="mono text-[11px] tracking-[0.28em] uppercase opacity-70">
              {item.kind} · {item.year}
            </p>
            <h1 className="display mt-4 max-w-5xl text-6xl leading-[0.85] sm:text-8xl">{item.title}</h1>
            <p className="mono mt-6 text-[10px] tracking-[0.22em] uppercase opacity-60">Move across it</p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
          <p className="text-[1.65rem] leading-snug sm:text-[2rem] sm:leading-[1.25]">{item.lead}</p>
          <ol className="mt-12 space-y-6">
            {item.points.map((point, i) => (
              <li key={point} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/15 pt-6">
                <span className="mono text-[11px] tracking-[0.16em] text-ink/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-8 text-ink/75">{point}</p>
              </li>
            ))}
          </ol>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono mt-14 inline-flex border border-ink px-5 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-paper"
            >
              Visit {item.title} →
            </a>
          ) : null}
        </section>
      </main>
    </>
  );
}
