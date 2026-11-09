"use client";

import type { WorkPlay } from "@/lib/work";

const WAVES = [
  "M -20 36 C 40 70, 90 8, 150 40 S 250 90, 320 30 S 420 6, 500 48",
  "M -20 70 C 50 30, 110 110, 180 64 S 280 20, 360 78 S 460 120, 540 60",
  "M -20 104 C 60 150, 120 60, 200 112 S 310 170, 390 96 S 470 40, 560 120",
  "M -20 142 C 40 100, 130 190, 210 140 S 320 80, 410 156 S 500 200, 580 130",
  "M -20 180 C 70 230, 140 130, 230 188 S 340 250, 430 170 S 510 120, 600 190",
  "M -20 218 C 50 170, 150 270, 240 210 S 350 160, 450 236 S 530 280, 620 200",
  "M -20 256 C 80 310, 160 200, 250 268 S 360 330, 460 240 S 540 190, 640 270",
  "M -20 294 C 40 250, 140 350, 250 286 S 370 230, 470 320 S 560 360, 660 280",
];

export function PlayField({ play }: { play: WorkPlay }) {
  if (play === "doors") {
    return (
      <div className="play-doors pointer-events-none absolute inset-0">
        <div className="door door-l" />
        <div className="door door-r" />
      </div>
    );
  }

  if (play === "waves") {
    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-paper/80"
        viewBox="0 0 600 320"
        preserveAspectRatio="none"
        aria-hidden
      >
        {WAVES.map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="wave-line"
            style={{ ["--i" as string]: i }}
          />
        ))}
      </svg>
    );
  }

  if (play === "fan") {
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="fan-card"
            style={{ ["--i" as string]: i }}
          />
        ))}
      </div>
    );
  }

  if (play === "orbit") {
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="orbit-dot" style={{ ["--i" as string]: i }} />
        ))}
      </div>
    );
  }

  if (play === "flow") {
    return (
      <div className="pointer-events-none absolute inset-6 flex flex-col justify-center gap-3" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flow-bar" style={{ ["--i" as string]: i }} />
        ))}
      </div>
    );
  }

  if (play === "angle") {
    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-paper/80"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <circle cx="100" cy="120" r="62" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M100 120 L162 120 A62 62 0 0 0 118 64 Z" fill="currentColor" opacity="0.18" />
        <line x1="100" y1="120" x2="158" y2="96" stroke="currentColor" strokeWidth="1.4" className="angle-arm" />
        <circle cx="100" cy="120" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (play === "tiles") {
    return (
      <div className="pointer-events-none absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2 p-6" aria-hidden>
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            className="tile-cell"
            style={{
              ["--dx" as string]: (i % 4) - 1.5,
              ["--dy" as string]: Math.floor(i / 4) - 1.5,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="plane-card" />
    </div>
  );
}

export function trackPointer(event: React.PointerEvent<HTMLElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width;
  const y = (event.clientY - box.top) / box.height;
  event.currentTarget.style.setProperty("--px", x.toFixed(3));
  event.currentTarget.style.setProperty("--py", y.toFixed(3));
}
