"use client";

import Link from "next/link";
import { PlayField, trackPointer } from "@/components/PlayField";
import { work } from "@/lib/work";

const toneClass = {
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  signal: "bg-signal text-paper",
  hatch: "bg-signal text-paper",
} as const;

const spanClass = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2 min-h-[22rem] sm:min-h-[32rem]",
  square: "",
} as const;

export function WorkGrid() {
  const total = String(work.length).padStart(2, "0");

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
      {work.map((item, i) => {
        const index = `${String(i).padStart(4, "0")}/${total}`;
        const doors = item.play === "doors";

        return (
          <li key={item.slug} className="contents">
            <Link
              href={`/work/${item.slug}`}
              onPointerMove={trackPointer}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--px", "0.5");
                event.currentTarget.style.setProperty("--py", "0.5");
              }}
              className={`group relative flex min-h-[22rem] flex-col overflow-hidden border-b border-ink p-6 sm:min-h-[26rem] sm:border-r ${
                doors ? "bg-ink text-paper" : toneClass[item.tone]
              } ${spanClass[item.span]}`}
            >
              <div className="play-host pointer-events-none absolute inset-0">
                <PlayField play={item.play} />
              </div>
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <p className="mono text-[10px] tracking-[0.18em] uppercase opacity-70">
                    {item.kind} · {item.year}
                  </p>
                  <p className="mono text-[10px] tracking-[0.16em] uppercase opacity-70">#{index}</p>
                </div>
                <div className="mt-auto">
                  <h3 className="display text-4xl leading-[0.9] sm:text-5xl">{item.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed opacity-80">{item.note}</p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
