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

const BALLS = 16;
const GRAVITY = 760;
const PILE = 5;
const HEAT_TIME = 2.35;
const WAVE_SPEED = 680;
const WAVE_LIFE = 1.7;
const WAVE_SLOTS = 3;
const POP_RADIUS = 88;
const POP_LIFE = 0.34;
const POP_SLOTS = 3;

type Ball = {
  lane: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  on: boolean;
  heat: number;
  fly: number;
  waveHit: number;
};

type Wave = { id: number; x: number; y: number; age: number };
type Pop = { x: number; y: number; age: number; fresh: boolean };

function yOn(line: Pt[], x: number, hintY: number) {
  let best: number | null = null;
  let bestD = Infinity;
  for (let i = 0; i < line.length - 1; i++) {
    const a = line[i];
    const b = line[i + 1];
    const dx = b.x - a.x;
    if (Math.abs(dx) < 0.8) continue;
    const t = (x - a.x) / dx;
    if (t < -0.05 || t > 1.05) continue;
    const y = a.y + (b.y - a.y) * Math.min(1, Math.max(0, t));
    const d = Math.abs(y - hintY);
    if (d < bestD) {
      bestD = d;
      best = y;
    }
  }
  return best;
}

function gapAt(lines: Pt[][], lane: number, x: number, hintY: number) {
  const y = yOn(lines[lane], x, hintY);
  if (y == null) return null;
  const above = lane > 0 ? yOn(lines[lane - 1], x, y - 40) : null;
  return { y, room: above == null ? 999 : y - above };
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
  const ballRefs = useRef<(SVGEllipseElement | null)[]>([]);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);
  const popRefs = useRef<(SVGCircleElement | null)[]>([]);
  const rest = useRef(restLines());
  const current = useRef(restLines());
  const pointer = useRef<Pt | null>(null);
  const pops = useRef<Pop[]>([]);
  const balls = useRef<Ball[]>(
    Array.from({ length: BALLS }, () => ({
      lane: 0,
      x: -80,
      y: 0,
      vx: 0,
      vy: 0,
      r: 10,
      on: false,
      heat: 0,
      fly: 0,
      waveHit: 0,
    })),
  );
  const [playing, setPlaying] = useState(false);
  const initial = rest.current.map(toPath);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg = fieldRef.current?.querySelector("svg");
    const popNodes: SVGCircleElement[] = [];
    if (svg) {
      for (let i = 0; i < POP_SLOTS; i++) {
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", "#f2efe8");
        ring.setAttribute("stroke-width", "2.5");
        ring.setAttribute("opacity", "0");
        svg.appendChild(ring);
        popNodes.push(ring);
        popRefs.current[i] = ring;
      }
    }

    let frame = 0;
    let alive = true;
    let last = performance.now();
    let spawnIn = 0.9;
    let laneCursor = 0;
    let waveSeq = 1;
    const waves: Wave[] = [];

    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.034, (now - last) / 1000);
      last = now;
      const ptr = pointer.current;
      let moving = false;

      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].age += dt;
        if (waves[i].age > WAVE_LIFE) waves.splice(i, 1);
      }

      for (let i = pops.current.length - 1; i >= 0; i--) {
        const pop = pops.current[i];
        if (pop.fresh) {
          pop.fresh = false;
          for (const ball of balls.current) {
            if (!ball.on) continue;
            const dx = ball.x - pop.x;
            const dy = ball.y - pop.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist > POP_RADIUS) continue;
            const falloff = 1 - dist / POP_RADIUS;
            const force = 240 + 380 * falloff;
            const nx = dx / dist;
            const ny = dy / dist;
            ball.vx += nx * force;
            if (ball.fly > 0) ball.vy += ny * force;
            else ball.x += nx * (16 + 18 * falloff);
            ball.vx = Math.max(-420, Math.min(480, ball.vx));
          }
        }
        pop.age += dt;
        if (pop.age > POP_LIFE) pops.current.splice(i, 1);
      }

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
            const pinch = Math.exp(-Math.abs(dx) / 170) * Math.exp(-(dy * dy) / (220 * 220));
            tx += (dx / dist) * force * 0.55 + (-dy / dist) * force * 0.32;
            ty += (dy / dist) * force * 0.4 + (dx / dist) * force * 0.32;
            ty += (ptr.y - origin.y) * pinch * 0.72;
          }
          for (const wave of waves) {
            const dx = origin.x - wave.x;
            const dy = origin.y - wave.y;
            const dist = Math.hypot(dx, dy) || 1;
            const decay = Math.max(0, 1 - wave.age / WAVE_LIFE);
            const front = wave.age * WAVE_SPEED;
            const ring = Math.exp(-((dist - front) ** 2) / (2 * 95 * 95));
            const burst = Math.exp(-dist / 460) * Math.exp(-wave.age * 2.4);
            const amp = decay * (86 * ring + 50 * burst);
            tx += (dx / dist) * amp * 0.45;
            ty += (dy / dist) * amp;
          }
          const ease = waves.length ? 0.74 : 0.16;
          const x = p.x + (tx - p.x) * ease;
          const y = p.y + (ty - p.y) * ease;
          if (Math.abs(x - p.x) > 0.2 || Math.abs(y - p.y) > 0.2) moving = true;
          return { x, y };
        }),
      );

      if (moving || ptr) {
        current.current.forEach((line, i) => {
          pathRefs.current[i]?.setAttribute("d", toPath(line));
        });
      }

      const lines = current.current;
      const box = fieldRef.current?.getBoundingClientRect();
      const ryScale = box ? (VB_H / VB_W) * (box.width / Math.max(box.height, 1)) : 1;
      spawnIn -= dt;
      if (spawnIn <= 0) {
        const free = balls.current.find((ball) => !ball.on);
        if (free) {
          const lane = laneCursor % LINE_COUNT;
          laneCursor += 5;
          const hint = rest.current[lane][0].y;
          const surface = yOn(lines[lane], -20, hint) ?? hint;
          free.on = true;
          free.lane = lane;
          free.x = -34 + Math.random() * 12;
          free.y = surface - 11;
          free.vx = 78 + Math.random() * 46;
          free.vy = 0;
          free.r = 8.5 + Math.random() * 4.5;
          free.heat = 0;
          free.fly = 0;
          free.waveHit = 0;
        }
        spawnIn = 1.8 + Math.random() * 1.2;
      }

      for (const ball of balls.current) {
        if (!ball.on || ball.fly > 0) continue;
        const ahead = gapAt(lines, ball.lane, ball.x + 36, ball.y + ball.r);
        const here = gapAt(lines, ball.lane, ball.x, ball.y + ball.r);
        if (!here) {
          ball.on = false;
          continue;
        }

        const nose = gapAt(lines, ball.lane, ball.x + ball.r, ball.y + ball.r);
        const blocked = here.room < ball.r * 2.15 || (nose != null && nose.room < ball.r * 2.15);
        const slope = ahead ? (ahead.y - here.y) / 36 : 0;
        const along = slope / Math.hypot(1, slope);
        if (blocked) {
          ball.vx *= Math.max(0, 1 - dt * 7);
        } else {
          ball.vx += (GRAVITY * along + 48) * dt;
          ball.vx -= ball.vx * 0.35 * dt;
          ball.vx = Math.max(18, Math.min(360, ball.vx));
        }

        const nextX = ball.x + ball.vx * dt;
        const nextGap = gapAt(lines, ball.lane, nextX, here.y);
        const gapTooTight = blocked || (nextGap != null && nextGap.room < ball.r * 2.05);
        if (gapTooTight && ball.vx >= 0) {
          ball.x -= Math.max(0, ball.vx) * dt * 0.35;
          if (here.room < ball.r * 1.7) ball.x -= 28 * dt;
        } else {
          ball.x = nextX;
        }

        const placed = gapAt(lines, ball.lane, ball.x, here.y);
        ball.y = (placed?.y ?? here.y) - ball.r * 0.92;
        if (ball.x > VB_W + 40) ball.on = false;
      }

      for (let lane = 0; lane < LINE_COUNT; lane++) {
        const pack = balls.current
          .filter((ball) => ball.on && ball.fly === 0 && ball.lane === lane)
          .sort((a, b) => a.x - b.x);
        for (let i = pack.length - 2; i >= 0; i--) {
          const left = pack[i];
          const right = pack[i + 1];
          const minDist = (left.r + right.r) * 0.92;
          if (right.x - left.x < minDist) {
            left.x = right.x - minDist;
            left.vx = Math.min(left.vx, right.vx);
          }
        }
      }

      const piles: Ball[][] = [];
      for (let lane = 0; lane < LINE_COUNT; lane++) {
        const pack = balls.current
          .filter((ball) => ball.on && ball.fly === 0 && ball.lane === lane)
          .sort((a, b) => a.x - b.x);
        let run: Ball[] = [];
        const closeRun = () => {
          if (run.length >= PILE) piles.push(run);
          run = [];
        };
        for (const ball of pack) {
          const prev = run[run.length - 1];
          const stacked = prev && ball.x - prev.x <= (ball.r + prev.r) * 1.35;
          if (prev && !stacked) closeRun();
          run.push(ball);
        }
        closeRun();
      }
      const heating = new Set<Ball>(piles.flat());
      for (const ball of balls.current) {
        if (!ball.on || ball.fly > 0) continue;
        ball.heat = heating.has(ball)
          ? Math.min(1, ball.heat + dt / HEAT_TIME)
          : Math.max(0, ball.heat - dt / 1.05);
      }
      for (const group of piles) {
        if (!group.some((ball) => ball.heat >= 1)) continue;
        const cx = group.reduce((sum, ball) => sum + ball.x, 0) / group.length;
        const cy = group.reduce((sum, ball) => sum + ball.y, 0) / group.length;
        waves.push({ id: waveSeq++, x: cx, y: cy, age: 0 });
        group.forEach((ball, i) => {
          const offset = Math.hypot(ball.x - cx, ball.y - cy);
          const ang = offset < 6 ? (i / group.length) * Math.PI * 2 : Math.atan2(ball.y - cy, ball.x - cx);
          const speed = 240 + Math.random() * 140;
          ball.fly = 0.001;
          ball.heat = 1;
          ball.vx = Math.cos(ang) * speed;
          ball.vy = Math.sin(ang) * speed - 70;
        });
      }

      for (const ball of balls.current) {
        if (!ball.on || ball.fly === 0) continue;
        ball.fly += dt;
        ball.vy += 680 * dt;
        ball.vx -= ball.vx * 0.35 * dt;
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        if (ball.fly > 1.15 || ball.y > VB_H + 90 || ball.x < -100 || ball.x > VB_W + 100) ball.on = false;
      }

      for (const wave of waves) {
        const front = wave.age * WAVE_SPEED;
        for (const ball of balls.current) {
          if (!ball.on || ball.fly > 0 || ball.waveHit === wave.id) continue;
          const dx = ball.x - wave.x;
          const dy = ball.y - wave.y;
          const dist = Math.hypot(dx, dy);
          if (Math.abs(dist - front) > 70) continue;
          ball.waveHit = wave.id;
          const kick = (1 - wave.age / WAVE_LIFE) * 210;
          ball.vx = Math.max(18, Math.min(360, ball.vx + (dx / (dist || 1)) * kick));
        }
      }

      balls.current.forEach((ball, i) => {
        const el = ballRefs.current[i];
        if (!el) return;
        const heat = ball.heat;
        const red = Math.round(242 + (255 - 242) * heat);
        const green = Math.round(239 + (45 - 239) * heat);
        const blue = Math.round(232 + (26 - 232) * heat);
        const pop = ball.fly > 0 ? Math.max(0.4, 1.35 - ball.fly) : 1 + heat * 0.28;
        el.setAttribute("cx", ball.x.toFixed(1));
        el.setAttribute("cy", ball.y.toFixed(1));
        el.setAttribute("rx", (ball.r * pop).toFixed(1));
        el.setAttribute("ry", (ball.r * pop * Math.max(ryScale, 0.4)).toFixed(1));
        el.setAttribute("fill", `rgb(${red},${green},${blue})`);
        el.setAttribute("opacity", ball.on ? (ball.fly > 0 ? Math.max(0, 1 - ball.fly / 1.15).toFixed(2) : "1") : "0");
      });

      for (let i = 0; i < WAVE_SLOTS; i++) {
        const ring = ringRefs.current[i];
        const wave = waves[i];
        if (!ring) continue;
        if (!wave) {
          ring.setAttribute("opacity", "0");
          ring.setAttribute("r", "0");
          continue;
        }
        const decay = Math.max(0, 1 - wave.age / WAVE_LIFE);
        ring.setAttribute("cx", wave.x.toFixed(1));
        ring.setAttribute("cy", wave.y.toFixed(1));
        ring.setAttribute("r", (wave.age * WAVE_SPEED).toFixed(1));
        ring.setAttribute("opacity", (decay * 0.9).toFixed(2));
      }

      for (let i = 0; i < POP_SLOTS; i++) {
        const ring = popRefs.current[i];
        const pop = pops.current[i];
        if (!ring) continue;
        if (!pop) {
          ring.setAttribute("opacity", "0");
          ring.setAttribute("r", "0");
          continue;
        }
        const fade = Math.max(0, 1 - pop.age / POP_LIFE);
        ring.setAttribute("cx", pop.x.toFixed(1));
        ring.setAttribute("cy", pop.y.toFixed(1));
        ring.setAttribute("r", (10 + (POP_RADIUS - 10) * Math.min(1, pop.age / POP_LIFE)).toFixed(1));
        ring.setAttribute("opacity", (fade * 0.85).toFixed(2));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      popNodes.forEach((ring) => ring.remove());
    };
  }, []);

  function pointFrom(event: React.PointerEvent): Pt | null {
    const box = fieldRef.current?.getBoundingClientRect();
    if (!box) return null;
    return {
      x: ((event.clientX - box.left) / box.width) * VB_W,
      y: ((event.clientY - box.top) / box.height) * VB_H,
    };
  }

  function track(event: React.PointerEvent) {
    if (event.pointerType === "touch" && event.buttons === 0) return;
    const point = pointFrom(event);
    if (point) pointer.current = point;
  }

  function poke(event: React.PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    const point = pointFrom(event);
    if (!point) return;
    pointer.current = point;
    pops.current.push({ ...point, age: 0, fresh: true });
    if (pops.current.length > POP_SLOTS) pops.current.shift();
  }

  return (
    <div
      ref={fieldRef}
      className="relative min-h-[78vh] touch-pan-y overflow-hidden bg-signal"
      onPointerMove={track}
      onPointerDown={poke}
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
        {balls.current.map((_, i) => (
          <ellipse
            key={i}
            ref={(node) => {
              ballRefs.current[i] = node;
            }}
            cx={-80}
            cy={0}
            rx={10}
            ry={10}
            fill="#f2efe8"
            stroke="#120d0b"
            strokeWidth="1.4"
            opacity={0}
          />
        ))}
        {Array.from({ length: WAVE_SLOTS }, (_, i) => (
          <circle
            key={`wave-${i}`}
            ref={(node) => {
              ringRefs.current[i] = node;
            }}
            cx={0}
            cy={0}
            r={0}
            fill="none"
            stroke="#f2efe8"
            strokeWidth="4"
            opacity={0}
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
        <h1 className="display flex max-w-full items-end justify-center px-3 pt-2 pb-1 text-[6.4vw] leading-[0.85] tracking-[-0.045em] sm:px-5 sm:text-[6.4vw] sm:leading-[0.8] lg:text-[5.75rem] lg:tracking-[-0.04em]">
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
