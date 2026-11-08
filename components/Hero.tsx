"use client";

import { useEffect, useRef, useState } from "react";

const VB_W = 1200;
const VB_H = 700;
const LINE_COUNT = 12;
const STEPS = 16;

type Pt = { x: number; y: number };

function restLines(): Pt[][] {
  return Array.from({ length: LINE_COUNT }, (_, line) => {
    const baseY = 28 + line * ((VB_H - 36) / (LINE_COUNT - 1));
    return Array.from({ length: STEPS }, (_, i) => {
      const x = (i / (STEPS - 1)) * (VB_W + 80) - 40;
      const y =
        baseY +
        Math.sin(i * 0.82 + line * 0.65) * 34 +
        Math.cos(i * 0.38 + line * 1.1) * 16;
      return { x, y };
    });
  });
}

function toPath(pts: Pt[]) {
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function Letters({ text, live }: { text: string; live: boolean }) {
  return (
    <span className={live ? "letters-live" : undefined}>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="glyph" style={{ ["--i" as string]: i }}>
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const rest = useRef(restLines());
  const current = useRef(restLines());
  const pointer = useRef<Pt | null>(null);
  const [playing, setPlaying] = useState(false);
  const initial = rest.current.map(toPath);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      const ptr = pointer.current;
      let moving = false;

      current.current = current.current.map((line, li) =>
        line.map((p, pi) => {
          const origin = rest.current[li][pi];
          let tx = origin.x;
          let ty = origin.y;
          if (ptr) {
            const dx = origin.x - ptr.x;
            const dy = origin.y - ptr.y;
            const dist = Math.hypot(dx, dy) || 1;
            const force = Math.exp(-dist / 150) * 120;
            tx += (dx / dist) * force * 0.72 + (-dy / dist) * force * 0.48;
            ty += (dy / dist) * force * 0.72 + (dx / dist) * force * 0.48;
          }
          const x = p.x + (tx - p.x) * 0.16;
          const y = p.y + (ty - p.y) * 0.16;
          if (Math.abs(x - p.x) > 0.2 || Math.abs(y - p.y) > 0.2) moving = true;
          return { x, y };
        }),
      );

      if (moving || ptr) {
        current.current.forEach((line, i) => {
          pathRefs.current[i]?.setAttribute("d", toPath(line));
        });
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  function track(event: React.PointerEvent) {
    if (event.pointerType === "touch" && event.buttons === 0) return;
    const box = fieldRef.current?.getBoundingClientRect();
    if (!box) return;
    pointer.current = {
      x: ((event.clientX - box.left) / box.width) * VB_W,
      y: ((event.clientY - box.top) / box.height) * VB_H,
    };
  }

  return (
    <div
      ref={fieldRef}
      className="relative min-h-[78vh] touch-pan-y overflow-hidden bg-signal"
      onPointerMove={track}
      onPointerLeave={() => {
        pointer.current = null;
      }}
      onPointerUp={() => {
        pointer.current = null;
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        {initial.map((d, i) => (
          <path
            key={i}
            ref={(node) => {
              pathRefs.current[i] = node;
            }}
            d={d}
            fill="none"
            stroke="#f2efe8"
            strokeWidth="1.25"
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-y-0 left-[12.5%] w-px bg-paper/25" />
      <div className="pointer-events-none absolute inset-y-0 left-[87.5%] w-px bg-paper/25" />
      <p className="mono pointer-events-none absolute top-4 left-4 z-10 text-[10px] tracking-[0.2em] text-paper uppercase">
        Technical product manager
      </p>
      <p className="mono pointer-events-none absolute top-4 right-4 z-10 hidden text-[10px] tracking-[0.2em] text-paper uppercase sm:block">
        Bengaluru · IN
      </p>
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-ink bg-signal text-paper">
        <h1 className="display flex items-end justify-center px-3 pt-2 pb-1 text-[10.5vw] leading-[0.8] sm:px-5 sm:text-[6.4vw] lg:text-[5.75rem]">
          <Letters text="Sudeep" live={playing} />
          <button
            type="button"
            aria-label="Play with the name"
            className={`name-mark ${playing ? "mark-spin" : ""}`}
            onMouseEnter={() => setPlaying(true)}
            onMouseLeave={() => setPlaying(false)}
            onFocus={() => setPlaying(true)}
            onBlur={() => setPlaying(false)}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M12 1.2 14.1 9.9 22.8 12 14.1 14.1 12 22.8 9.9 14.1 1.2 12 9.9 9.9Z" />
            </svg>
          </button>
          <Letters text="Sharma" live={playing} />
        </h1>
      </div>
    </div>
  );
}
