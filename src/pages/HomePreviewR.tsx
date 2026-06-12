import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  AppWindow,
  BadgeCheck,
  Bot,
  Brain,
  CalendarDays,
  Check,
  CreditCard,
  Figma,
  Github,
  Link2,
  Mail,
  ShieldCheck,
  Slack,
  Sparkles,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { SITE_STATS } from "@/config/site-stats";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option R v4: the bubble's journey, evolved per operator notes.
 *
 * - The perspective grid is the FLOOR the people stand on, at the
 *   base of the big bubble, not up behind the headline.
 * - The people have friendly drawn faces (two men, one androgynous
 *   "You", two women) and bigger AI tags.
 * - Scroll motion is deeply relaxed: progress itself is smoothed, so
 *   the bubble drifts seconds behind your scroll and never jerks.
 * - The travelling bubble is roughly double the old size.
 * - Five rich stages with icon orbs, layered depth, and ambient
 *   decor: memory (digital brain), apps and connections, the gate,
 *   proof, and the orchestrator's running story.
 * - Story told, the bubble shrinks and pops; nothing obstructs the
 *   close, install, or FAQ.
 */

/* ── Friendly faces, hand-drawn line art ────────────────────── */

/* Portraits: cropped from the operator-supplied vector face sheet
   (Freepik line-art set, PDF converted to SVG), ink recolored to
   glowing teal so the faces float on their dark holder discs. */

const PEOPLE: {
  name: string;
  ai: string;
  lead?: boolean;
  img: string;
}[] = [
  { name: "Sam", ai: "ChatGPT", img: "/faces/sam.svg" },
  { name: "Priya", ai: "Cursor", img: "/faces/priya.svg" },
  { name: "Sarah", ai: "Claude", lead: true, img: "/faces/sarah.svg" },
  { name: "Leo", ai: "Copilot", img: "/faces/leo.svg" },
  { name: "Mia", ai: "local model", img: "/faces/mia.svg" },
];

/* Piecewise-linear interpolation over [0..1] progress. */
function interp(p: number, stops: number[], values: number[]) {
  if (p <= stops[0]) return values[0];
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i]) {
      const t = (p - stops[i - 1]) / (stops[i] - stops[i - 1]);
      return values[i - 1] + (values[i] - values[i - 1]) * t;
    }
  }
  return values[values.length - 1];
}

function PersonChip({
  person,
  index,
  anchorRef,
}: {
  person: (typeof PEOPLE)[number];
  index: number;
  anchorRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <FadeIn delay={0.1 + index * 0.08}>
      <div
        className={cn(
          "flex w-[100px] flex-col items-center sm:w-[112px]",
          index % 2 === 1 && "sm:-translate-y-3",
        )}
      >
        <div
          ref={anchorRef}
          className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_3px_hsl(182_46%_57%/0.55)]"
          aria-hidden="true"
        />
        <span
          className={cn(
            "mt-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-[#07212d]/85 sm:h-[4.5rem] sm:w-[4.5rem]",
            person.lead
              ? "scale-[1.07] border-primary/80 shadow-[0_0_34px_-4px_hsl(182_46%_57%/0.85)]"
              : "border-primary/45 shadow-[0_0_22px_-6px_hsl(182_46%_57%/0.6)]",
          )}
        >
          <img
            src={person.img}
            alt=""
            className="h-full w-full [filter:drop-shadow(0_0_4px_rgba(134,218,221,0.55))]"
          />
        </span>
        <span className={cn("mt-2 text-[14px] font-semibold", person.lead ? "text-heading" : "text-body")}>
          {person.name}
        </span>
        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#06202c]/90 px-2.5 py-1 font-mono text-[11px] text-body/85">
          <Bot className="h-3.5 w-3.5 text-primary/75" />
          {person.ai}
        </span>
      </div>
    </FadeIn>
  );
}

/* ── Stages with depth ──────────────────────────────────────── */

function Stage({
  n,
  icon: Icon,
  label,
  headline,
  side,
  anchorRef,
  children,
}: {
  n: string;
  icon: typeof Brain;
  label: string;
  headline: string;
  side: "left" | "right";
  anchorRef: (el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative flex min-h-[78svh] items-center px-6",
        side === "right" ? "justify-end" : "justify-start",
      )}
    >
      {/* Ambient glow behind the stage */}
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/[0.05] blur-[110px]",
          side === "right" ? "right-[-6%]" : "left-[-6%]",
        )}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl">
        {/* Depth: two offset glass sheets behind the card */}
        <div
          className="absolute -inset-1.5 translate-x-3 translate-y-4 rotate-[1.2deg] rounded-3xl border border-[#86dadd]/[0.07] bg-white/[0.015]"
          aria-hidden="true"
        />
        <div
          className="absolute -inset-1 translate-x-1.5 translate-y-2 rotate-[-0.8deg] rounded-3xl border border-[#86dadd]/[0.1] bg-white/[0.02]"
          aria-hidden="true"
        />

        {/* Floating decor */}
        <span
          className={cn(
            "hp-bob pointer-events-none absolute -top-7 hidden h-3 w-3 rounded-full bg-primary/45 blur-[1px] sm:block",
            side === "right" ? "-left-9" : "-right-9",
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "hp-bob-late pointer-events-none absolute -bottom-9 hidden h-2 w-2 rounded-full bg-[#bdeff0]/40 sm:block",
            side === "right" ? "left-1/4" : "right-1/4",
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "pointer-events-none absolute -bottom-12 hidden h-24 w-24 rounded-full border border-dashed border-primary/15 sm:block",
            side === "right" ? "-left-14" : "-right-14",
          )}
          aria-hidden="true"
        />

        {/* The card */}
        <div className="relative rounded-3xl border border-[#86dadd]/20 bg-gradient-to-b from-[#0a2c3c]/95 to-[#071e29]/95 p-7 shadow-[0_50px_110px_-38px_rgba(0,0,0,0.9),0_0_60px_-30px_hsl(182_46%_57%/0.45)] backdrop-blur-md sm:p-8">
          <span className="hp-cross left-2.5 top-2.5" aria-hidden="true" />
          <span className="hp-cross bottom-2.5 right-2.5" aria-hidden="true" />
          <div
            ref={anchorRef}
            aria-hidden="true"
            className={cn(
              "absolute top-9 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(182_46%_57%/0.55)]",
              side === "right" ? "-left-1" : "-right-1",
            )}
          />

          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/25 to-primary/[0.06] text-primary shadow-[0_0_30px_-8px_hsl(182_46%_57%/0.7)]">
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                {n} · {label}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-3xl">
                {headline}
              </h2>
            </div>
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

const GATES = [
  { name: "commands", ok: true },
  { name: "data", ok: true },
  { name: "publish", ok: true },
  { name: "secrets", ok: false },
] as const;

const APPS = [
  { name: "Gmail", icon: Mail },
  { name: "Slack", icon: Slack },
  { name: "GitHub", icon: Github },
  { name: "Figma", icon: Figma },
  { name: "Stripe", icon: CreditCard },
  { name: "Calendar", icon: CalendarDays },
];

const STORY = [
  { when: "yesterday", what: "invoice chased, replied in your tone", done: true },
  { when: "today", what: "broken link fixed and shipped", done: true },
  { when: "tonight", what: "three follow-ups queued", done: false },
];

/* ── The journey engine ─────────────────────────────────────── */

function JourneyField() {
  const reduced = useReducedMotion() ?? false;
  const fieldRef = useRef<HTMLDivElement>(null);
  const heroSceneRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleInnerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const peopleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const peoplePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const stageRopeRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const field = fieldRef.current;
    const bubble = bubbleRef.current;
    const inner = bubbleInnerRef.current;
    const ring = ringRef.current;
    if (!field || !bubble || !inner || !ring) return;

    let raf = 0;
    const start = performance.now();
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight * 0.38;
    let cs = 1;
    let sp = 0;
    let lastNow = performance.now();
    type Rope = {
      idx: number;
      phase: "idle" | "out" | "hold" | "reel";
      prog: number;
      sx: number;
      sy: number;
      ex: number;
      ey: number;
    };
    const ropes: [Rope, Rope] = [
      { idx: -1, phase: "idle", prog: 0, sx: 0, sy: 0, ex: 0, ey: 0 },
      { idx: -1, phase: "idle", prog: 0, sx: 0, sy: 0, ex: 0, ey: 0 },
    ];
    let activeStage = -1; // smoothed progress: the soul of the relaxed motion

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = field.getBoundingClientRect();
      const total = rect.height - vh * 0.55;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));

      const sm = vw < 640;
      const base = sm ? 290 : 400;

      // Smooth the progress itself, then ease positions on top:
      // double damping means the bubble glides, never jerks.
      sp += (p - sp) * (sm ? 0.03 : 0.022);

      const xPct = interp(
        sp,
        [0, 0.05, 0.18, 0.36, 0.54, 0.72, 0.85, 0.94, 1],
        [0.5, 0.5, sm ? 0.36 : 0.3, sm ? 0.64 : 0.7, sm ? 0.36 : 0.3, sm ? 0.64 : 0.7, 0.5, 0.5, 0.5],
      );
      const yPct = interp(sp, [0, 0.05, 0.18, 0.94, 1], [0, 0, 0.42, 0.44, 0.46]);
      // Hold a big presence through memory, apps, and the gate, then
      // taper from the proof stage to the pop.
      const scale = interp(
        sp,
        [0, 0.05, 0.18, 0.68, 0.8, 0.9, 0.975],
        [1, 1, 0.82, 0.76, 0.55, 0.28, 0],
      );

      const heroRect = heroSceneRef.current?.getBoundingClientRect();
      const heroCx = heroRect ? heroRect.left + heroRect.width / 2 : vw / 2;
      const heroCy = heroRect ? heroRect.top + base * 0.5 + 8 : vh * 0.36;
      // Detach reads RAW progress so the bubble lets go with your
      // scroll instead of playing late catch-up; easing still smooths
      // the ride down.
      const heroBlend = interp(p, [0.04, 0.15], [1, 0]);

      const driftX = Math.sin(t * 0.24) * vw * 0.006;
      const driftY = Math.sin(t * 0.17 + 1.3) * vh * 0.008;

      const targetX = heroBlend * heroCx + (1 - heroBlend) * xPct * vw + driftX * (1 - heroBlend) + driftX * heroBlend;
      const targetY = heroBlend * heroCy + (1 - heroBlend) * yPct * vh + driftY;

      const ease = sm ? 0.055 : 0.045;
      cx += (targetX - cx) * ease;
      cy += (targetY - cy) * ease;
      cs += (scale - cs) * (ease + 0.007);

      const visible = cs > 0.015 && sp < 0.985;
      bubble.style.opacity = visible ? "1" : "0";
      bubble.style.transform = `translate(${cx - (base * cs) / 2}px, ${cy - (base * cs) / 2}px)`;
      inner.style.transform = `scale(${cs})`;

      const ringOpacity = Math.max(0, 1 - Math.abs(sp - 0.955) * 26);
      const ringScale = 1 + Math.max(0, sp - 0.93) * 14;
      ring.style.opacity = String(ringOpacity * 0.8);
      ring.style.transform = `translate(${cx - 40}px, ${cy - 40}px) scale(${ringScale})`;

      // Hero bundle to the people.
      const gatherY = cy + (base * cs) / 2 - 6;
      const peopleAlpha = interp(p, [0.05, 0.14], [1, 0]);
      peopleRefs.current.forEach((el, i) => {
        const path = peoplePathRefs.current[i];
        if (!el || !path) return;
        if (peopleAlpha <= 0.01) {
          path.setAttribute("d", "");
          return;
        }
        const r = el.getBoundingClientRect();
        const px = r.left + r.width / 2;
        const py = r.top + 6;
        const sx = cx + (i - (PEOPLE.length - 1) / 2) * 6.5 * cs;
        const sway = Math.sin(t * 0.5 + i * 0.7) * 3;
        const bx = cx + (i - (PEOPLE.length - 1) / 2) * 9 + sway;
        const by = gatherY + (py - gatherY) * 0.62;
        path.setAttribute("d", `M ${sx} ${gatherY} C ${sx + sway} ${gatherY + 50}, ${bx} ${by}, ${px} ${py}`);
        path.setAttribute("stroke", `hsl(183 50% 62% / ${0.5 * peopleAlpha})`);
      });

      // Two-handed web-slinging: as the bubble travels, a fresh rope
      // shoots out to the next stage while the old one releases and
      // reels home. Both ease and fade; nothing ever cuts.
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      const mouthX = cx;
      const mouthY = cy + (base * cs) / 2 - 8;
      const windowAlpha = interp(sp, [0.05, 0.11, 0.88, 0.94], [0, 1, 1, 0]);

      let bestI = -1;
      let bestD = Infinity;
      if (windowAlpha > 0.01) {
        stageRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.bottom < -80 || r.top > vh + 80) return;
          const d = Math.hypot(r.left + r.width / 2 - cx, r.top - cy);
          if (d < bestD) {
            bestD = d;
            bestI = i;
          }
        });
      }

      if (bestI >= 0 && bestI !== activeStage) {
        // Old rope lets go and reels in from wherever it is.
        const holding = ropes.find((rope) => rope.phase === "hold" || rope.phase === "out");
        if (holding) {
          holding.phase = "reel";
          holding.prog = 0;
          holding.sx = holding.ex;
          holding.sy = holding.ey;
        }
        // A free hand shoots the new web.
        const free = ropes.find((rope) => rope !== holding) ?? ropes[0];
        free.idx = bestI;
        free.phase = "out";
        free.prog = 0;
        free.sx = mouthX;
        free.sy = mouthY;
        activeStage = bestI;
      }

      const easeOutCubic = (v: number) => 1 - Math.pow(1 - v, 3);
      const easeInCubic = (v: number) => v * v * v;

      ropes.forEach((rope, ri) => {
        const path = stageRopeRefs.current[ri];
        if (!path) return;
        if (rope.phase === "idle") {
          path.setAttribute("d", "");
          return;
        }
        const el = rope.idx >= 0 ? stageRefs.current[rope.idx] : null;
        const r = el?.getBoundingClientRect();
        const axp = r ? r.left + r.width / 2 : mouthX;
        const ayp = r ? r.top + r.height / 2 : mouthY;
        let alpha = 0.6 * windowAlpha;

        if (rope.phase === "out") {
          rope.prog = Math.min(1, rope.prog + dt / 0.7);
          const k = easeOutCubic(rope.prog);
          rope.ex = rope.sx + (axp - rope.sx) * k;
          rope.ey = rope.sy + (ayp - rope.sy) * k;
          alpha *= 0.25 + 0.75 * k;
          if (rope.prog >= 1) rope.phase = "hold";
        } else if (rope.phase === "hold") {
          rope.ex = axp;
          rope.ey = ayp;
        } else if (rope.phase === "reel") {
          rope.prog = Math.min(1, rope.prog + dt / 0.6);
          const k = easeInCubic(rope.prog);
          rope.ex = rope.sx + (mouthX - rope.sx) * k;
          rope.ey = rope.sy + (mouthY - rope.sy) * k;
          alpha *= 1 - rope.prog;
          if (rope.prog >= 1) {
            rope.phase = "idle";
            rope.idx = -1;
            path.setAttribute("d", "");
            return;
          }
        }

        const midX = (mouthX + rope.ex) / 2 + Math.sin(t * 0.5 + ri * 1.7) * 5;
        const midY = (mouthY + rope.ey) / 2 + Math.min(90, Math.abs(rope.ex - mouthX) * 0.25);
        path.setAttribute("d", `M ${mouthX} ${mouthY} Q ${midX} ${midY} ${rope.ex} ${rope.ey}`);
        path.setAttribute("stroke", `hsl(183 52% 64% / ${Math.max(0, alpha)})`);
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div ref={fieldRef} className="relative overflow-x-clip">
      {!reduced && (
        <>
          <svg className="pointer-events-none fixed inset-0 z-30 h-full w-full" aria-hidden="true">
            {PEOPLE.map((_, i) => (
              <path
                key={i}
                ref={(el) => {
                  peoplePathRefs.current[i] = el;
                }}
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}
            {[0, 1].map((ri) => (
              <path
                key={`rope-${ri}`}
                ref={(el) => {
                  stageRopeRefs.current[ri] = el;
                }}
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div
            ref={ringRef}
            className="pointer-events-none fixed left-0 top-0 z-40 h-20 w-20 rounded-full border-2 border-[#9ce8ea]/70 opacity-0"
            aria-hidden="true"
          />

          <div ref={bubbleRef} className="pointer-events-none fixed left-0 top-0 z-40 will-change-transform" aria-hidden="true">
            <div ref={bubbleInnerRef} className="origin-top-left">
              <div
                className="relative flex h-[290px] w-[290px] items-center justify-center rounded-full sm:h-[400px] sm:w-[400px]"
                style={{
                  background:
                    "radial-gradient(circle at 33% 27%, hsl(184 75% 92% / 0.32) 0%, hsl(184 60% 70% / 0.14) 26%, hsl(195 50% 26% / 0.3) 60%, hsl(199 70% 12% / 0.5) 100%)",
                  border: "1.5px solid hsl(184 60% 70% / 0.55)",
                  boxShadow: [
                    "0 60px 140px -40px rgba(0,0,0,0.85)",
                    "0 0 110px -20px hsl(182 46% 57% / 0.55)",
                    "inset 0 0 70px -12px hsl(184 70% 80% / 0.22)",
                    "inset -26px -30px 90px -28px hsl(187 50% 45% / 0.4)",
                    "inset 20px 26px 70px -30px hsl(0 0% 100% / 0.28)",
                  ].join(", "),
                  backdropFilter: "blur(5px)",
                }}
              >
                <span className="absolute left-[16%] top-[10%] h-[20%] w-[34%] rotate-[-18deg] rounded-[50%] bg-white/30 blur-[7px]" />
                <span className="absolute bottom-[14%] right-[18%] h-[7%] w-[14%] rounded-[50%] bg-white/10 blur-[5px]" />
                <span className="absolute inset-[7%] rounded-full border border-[#bdeff0]/12" />
                <span className="relative flex w-[64%] flex-col">
                  <img src="/logo-lockup.svg" alt="UnClick. Where AI Belongs. Humans welcome." className="w-full" />
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Act one: the scene, grid floor under everyone ──────── */}
      <div ref={heroSceneRef} className="relative mx-auto h-[620px] w-full max-w-3xl sm:h-[700px]">
        {/* The floor: at the base of the bubble and the people */}
        <div className="hp-floor !bottom-[-4%] !h-[52%]" aria-hidden="true" />

        {reduced && (
          <div className="absolute left-1/2 top-2 -translate-x-1/2">
            <div className="flex h-[290px] w-[290px] flex-col items-center justify-center rounded-full border border-[#86dadd]/50 bg-primary/[0.08] sm:h-[380px] sm:w-[380px]">
              <img src="/logo-lockup.svg" alt="UnClick. Where AI Belongs. Humans welcome." className="w-[64%]" />
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-5 z-30 flex flex-wrap items-end justify-center gap-x-3 gap-y-4 px-4 sm:gap-x-5">
          {PEOPLE.map((person, i) => (
            <PersonChip
              key={person.name}
              person={person}
              index={i}
              anchorRef={(el) => {
                peopleRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Act two: five stages ───────────────────────────────── */}
      <div className="mx-auto max-w-6xl">
        <Stage
          n="01"
          icon={Brain}
          label="memory"
          headline="It already knows how you work."
          side="left"
          anchorRef={(el) => {
            stageRefs.current[0] = el;
          }}
        >
          <div className="space-y-2">
            {["how you like things done", "what you said last time", "what matters this week"].map((fact) => (
              <div
                key={fact}
                className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2.5 font-mono text-[12.5px]"
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                <span className="text-primary/80">remembers ›</span>
                <span className="truncate text-body">{fact}</span>
              </div>
            ))}
          </div>
        </Stage>

        <Stage
          n="02"
          icon={AppWindow}
          label="apps · connections"
          headline="Every app you already use."
          side="right"
          anchorRef={(el) => {
            stageRefs.current[1] = el;
          }}
        >
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {APPS.map((app) => (
              <div
                key={app.name}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.09] bg-[#06202c]/75 px-2 py-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-gradient-to-b from-[#11394c] to-[#082230] text-primary/90">
                  <app.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground/70">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground/65">
              <Link2 className="h-3.5 w-3.5 text-primary/70" />
              sign in once · yours to allow
            </p>
            <span className="rounded-full border border-primary/30 bg-primary/[0.08] px-2.5 py-1 font-mono text-[10.5px] font-bold tracking-[0.08em] text-primary">
              {SITE_STATS.ENDPOINTS_DISPLAY} actions · {SITE_STATS.TOOLS_DISPLAY} apps
            </span>
          </div>
        </Stage>

        <Stage
          n="03"
          icon={ShieldCheck}
          label="the gate"
          headline="Checked before it runs."
          side="left"
          anchorRef={(el) => {
            stageRefs.current[2] = el;
          }}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {GATES.map((gate) => (
              <div
                key={gate.name}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3",
                  gate.ok ? "border-primary/25 bg-primary/[0.05]" : "border-red-400/40 bg-red-400/[0.07]",
                )}
              >
                {gate.ok ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <ShieldCheck className="h-4 w-4 text-red-300" />
                )}
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.12em]",
                    gate.ok ? "text-body/80" : "text-red-200/90",
                  )}
                >
                  {gate.name}
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-px font-mono text-[8.5px] font-bold uppercase tracking-[0.1em]",
                    gate.ok ? "bg-primary/15 text-primary" : "bg-red-400/20 text-red-200",
                  )}
                >
                  {gate.ok ? "ok" : "blocked"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground/65">
            only what you've allowed
          </p>
        </Stage>

        <Stage
          n="04"
          icon={BadgeCheck}
          label="proof · xpass"
          headline="Checked after, with a receipt."
          side="right"
          anchorRef={(el) => {
            stageRefs.current[3] = el;
          }}
        >
          <div className="relative rounded-xl border border-primary/30 bg-primary/[0.06] p-4 pr-24">
            <div className="flex flex-wrap gap-1.5">
              {["works", "reads well", "safe", "honest", "looks right"].map((check) => (
                <span
                  key={check}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-[#06202c]/70 px-2 py-0.5 font-mono text-[10.5px] text-body"
                >
                  <Check className="h-2.5 w-2.5 text-primary" />
                  {check}
                </span>
              ))}
            </div>
            <p className="mt-3 font-mono text-[12px] text-body/85">kept forever, yours</p>
            <span className="absolute right-3.5 top-1/2 inline-flex -translate-y-1/2 -rotate-6 items-center gap-1 rounded border-2 border-primary/80 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-primary">
              <BadgeCheck className="h-3.5 w-3.5" />
              pass
            </span>
          </div>
        </Stage>

        <Stage
          n="05"
          icon={Workflow}
          label="orchestrator"
          headline="One running story of your work."
          side="left"
          anchorRef={(el) => {
            stageRefs.current[4] = el;
          }}
        >
          <div className="relative pl-5">
            <span
              className="absolute bottom-1 left-1 top-1 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-primary/10"
              aria-hidden="true"
            />
            <div className="space-y-3">
              {STORY.map((entry) => (
                <div key={entry.when} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[1.17rem] top-1.5 h-2.5 w-2.5 rounded-full border-2",
                      entry.done ? "border-primary bg-primary/40" : "border-primary/40 bg-[#06202c]",
                    )}
                    aria-hidden="true"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">{entry.when}</p>
                  <p className="mt-0.5 text-[13.5px] text-body">{entry.what}</p>
                </div>
              ))}
            </div>
          </div>
        </Stage>
      </div>

      {/* ── Act three: the finish ──────────────────────────────── */}
      <section className="px-6 pb-10 pt-6 text-center">
        <div className="mx-auto min-h-[30svh] max-w-2xl pt-[18svh]">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-5xl">
              Same memory. Same rules. Same{" "}receipts.
            </h2>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}

const HomePreviewR = () => {
  useCanonical("/home-preview-r");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Everyone's AI. One bubble. The whole team holds a string to the same layer: memory, apps, gates, proof, and one running story.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Everyone's AI. One bubble.",
    ogUrl: "https://unclick.world/home-preview-r",
  });

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground antialiased">
      <Navbar />
      <OptionRibbon active="r" />

      <main>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-2 pt-32 text-center sm:pt-36">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-3xl">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                Everyone's AI.
                <br />
                <GradientText>One{" "}bubble.</GradientText>
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* ── The journey ────────────────────────────────────────── */}
        <JourneyField />

        {/* The call to action, given its stage lights */}
        <section className="relative px-6 pt-6">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="text-4xl font-extrabold leading-[1.04] tracking-[-0.025em] text-heading sm:text-6xl">
                Grab a <GradientText>string.</GradientText>
              </h2>
            </FadeIn>
          </div>
        </section>
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-4 inset-y-6 -z-10 rounded-[2rem] border border-primary/25 bg-primary/[0.04] shadow-[0_0_90px_-30px_hsl(182_46%_57%/0.55),inset_0_0_60px_-40px_hsl(182_46%_57%/0.4)] sm:inset-x-10"
            aria-hidden="true"
          />
          <InstallSection />
        </div>
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewR;
