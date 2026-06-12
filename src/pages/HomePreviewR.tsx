import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { BadgeCheck, Bot, Check, ShieldCheck, Sparkles, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option R v3: the bubble's whole journey.
 *
 * Act one: the big glass bubble floats above a tight cluster of
 * people, every string leaving through one gather point (the v2
 * scene everyone liked).
 *
 * Act two: as you scroll, the bubble lets go, shrinks, and swings
 * between the story cards, one tether at a time, slung to whichever
 * card it is passing.
 *
 * Act three: story told, the bubble shrinks to a point and pops in
 * a soft ring, leaving the rest of the page completely clear. It
 * never hangs around and never obstructs.
 *
 * Everything is driven imperatively from one rAF loop reading scroll
 * progress through the journey container, with critically damped
 * smoothing for the dreamy lag. Reduced motion: the hero scene is
 * drawn once, still, and the journey bubble never mounts.
 */

const PEOPLE = [
  { name: "Sam", ai: "ChatGPT" },
  { name: "Priya", ai: "Cursor" },
  { name: "You", ai: "Claude", you: true },
  { name: "Alex", ai: "Copilot" },
  { name: "Mia", ai: "local model" },
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
          "flex w-[88px] flex-col items-center sm:w-[96px]",
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
            "mt-2 flex h-12 w-12 items-center justify-center rounded-full border sm:h-14 sm:w-14",
            person.you
              ? "border-primary/65 bg-primary/[0.18] text-primary shadow-[0_0_28px_-6px_hsl(182_46%_57%/0.7)]"
              : "border-white/[0.14] bg-[#0a2c3c]/90 text-body/85",
          )}
        >
          <User className="h-5 w-5" />
        </span>
        <span className={cn("mt-2 text-[13px] font-semibold", person.you ? "text-heading" : "text-body")}>
          {person.name}
        </span>
        <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-white/[0.1] bg-[#06202c]/85 px-2 py-0.5 font-mono text-[9px] text-body/75">
          <Bot className="h-2.5 w-2.5 text-primary/70" />
          {person.ai}
        </span>
      </div>
    </FadeIn>
  );
}

function StoryCard({
  label,
  headline,
  side,
  anchorRef,
  children,
}: {
  label: string;
  headline: string;
  side: "left" | "right";
  anchorRef: (el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex min-h-[68svh] items-center px-6",
        side === "right" ? "justify-end" : "justify-start",
      )}
    >
      <FadeIn>
        <div className="relative w-full max-w-md rounded-2xl border border-[#86dadd]/18 bg-[#071e29]/90 p-6 shadow-[0_36px_80px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md">
          <span className="hp-cross left-2 top-2" aria-hidden="true" />
          <span className="hp-cross bottom-2 right-2" aria-hidden="true" />
          {/* Web anchor: where the bubble slings its tether. */}
          <div
            ref={anchorRef}
            aria-hidden="true"
            className={cn(
              "absolute top-7 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(182_46%_57%/0.55)]",
              side === "right" ? "-left-1" : "-right-1",
            )}
          />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/70">
            {label}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-3xl">
            {headline}
          </h2>
          <div className="mt-5">{children}</div>
        </div>
      </FadeIn>
    </section>
  );
}

const GATES = [
  { name: "commands", ok: true },
  { name: "data", ok: true },
  { name: "publish", ok: true },
  { name: "secrets", ok: false },
] as const;

function JourneyField() {
  const reduced = useReducedMotion() ?? false;
  const fieldRef = useRef<HTMLDivElement>(null);
  const heroSceneRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleInnerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const peopleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const peoplePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const cardPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    const field = fieldRef.current;
    const bubble = bubbleRef.current;
    const inner = bubbleInnerRef.current;
    const ring = ringRef.current;
    if (!field || !bubble || !inner || !ring) return;

    let raf = 0;
    const start = performance.now();
    // Smoothed live values: the bubble arrives a beat after you do.
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight * 0.38;
    let cs = 1;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = field.getBoundingClientRect();
      // Progress through the journey: 0 at hero, 1 when the field's
      // end reaches mid-viewport.
      const total = rect.height - vh * 0.55;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));

      const base = vw < 640 ? 290 : 400;
      const sm = vw < 640;

      // Waypoints: hold the hero, swing card to card, settle, pop.
      const xPct = interp(p, [0, 0.14, 0.3, 0.5, 0.7, 0.86, 1], [0.5, 0.5, sm ? 0.34 : 0.27, sm ? 0.66 : 0.73, sm ? 0.34 : 0.27, 0.5, 0.5]);
      const yPct = interp(p, [0, 0.14, 0.3, 0.5, 0.7, 0.86, 1], [0, 0, 0.4, 0.42, 0.4, 0.44, 0.46]);
      const scale = interp(p, [0, 0.14, 0.3, 0.5, 0.7, 0.86, 0.94, 0.97], [1, 1, 0.52, 0.4, 0.32, 0.24, 0.12, 0]);

      // During the hero hold, the bubble lives at the scene's spot in
      // the document; afterwards it rides the viewport.
      const heroRect = heroSceneRef.current?.getBoundingClientRect();
      const heroCx = heroRect ? heroRect.left + heroRect.width / 2 : vw / 2;
      const heroCy = heroRect ? heroRect.top + base * 0.5 + 8 : vh * 0.36;
      const heroBlend = interp(p, [0.14, 0.3], [1, 0]);

      const driftX = Math.sin(t * 0.42) * vw * 0.012 * heroBlend;
      const driftY = Math.sin(t * 0.27 + 1.3) * vh * 0.012;

      const targetX = heroBlend * heroCx + (1 - heroBlend) * xPct * vw + driftX;
      const targetY = heroBlend * heroCy + (1 - heroBlend) * yPct * vh + driftY;
      const targetS = scale;

      // Critically damped-ish smoothing.
      cx += (targetX - cx) * 0.085;
      cy += (targetY - cy) * 0.085;
      cs += (targetS - cs) * 0.1;

      const visible = cs > 0.015 && p < 0.985;
      bubble.style.opacity = visible ? "1" : "0";
      bubble.style.transform = `translate(${cx - (base * cs) / 2}px, ${cy - (base * cs) / 2}px)`;
      inner.style.transform = `scale(${cs})`;

      // The pop: a soft expanding ring as the bubble finishes.
      const ringOpacity = Math.max(0, 1 - Math.abs(p - 0.955) * 26);
      const ringScale = 1 + Math.max(0, p - 0.93) * 14;
      ring.style.opacity = String(ringOpacity * 0.8);
      ring.style.transform = `translate(${cx - 40}px, ${cy - 40}px) scale(${ringScale})`;

      // Tethers. Hero: the bundled strings to every person.
      const gatherY = cy + (base * cs) / 2 - 6;
      const peopleAlpha = interp(p, [0.12, 0.24], [1, 0]);
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
        const sway = Math.sin(t * 0.6 + i * 0.7) * 3;
        const bx = cx + (i - (PEOPLE.length - 1) / 2) * 9 + sway;
        const by = gatherY + (py - gatherY) * 0.62;
        path.setAttribute("d", `M ${sx} ${gatherY} C ${sx + sway} ${gatherY + 50}, ${bx} ${by}, ${px} ${py}`);
        path.setAttribute("stroke", `hsl(183 50% 62% / ${0.5 * peopleAlpha})`);
      });

      // Journey: one tether, slung to the card it is passing.
      const cardPath = cardPathRef.current;
      if (cardPath) {
        const cardAlpha = interp(p, [0.2, 0.28, 0.88, 0.94], [0, 1, 1, 0]);
        let bestI = -1;
        let bestD = Infinity;
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.bottom < -60 || r.top > vh + 60) return;
          const d = Math.hypot(r.left + r.width / 2 - cx, r.top - cy);
          if (d < bestD) {
            bestD = d;
            bestI = i;
          }
        });
        const el = bestI >= 0 ? cardRefs.current[bestI] : null;
        if (!el || cardAlpha <= 0.01) {
          cardPath.setAttribute("d", "");
        } else {
          const r = el.getBoundingClientRect();
          const px = r.left + r.width / 2;
          const py = r.top + r.height / 2;
          const midX = (cx + px) / 2 + Math.sin(t * 0.8) * 6;
          const midY = (cy + py) / 2 + Math.min(80, Math.abs(px - cx) * 0.25);
          cardPath.setAttribute("d", `M ${cx} ${cy + (base * cs) / 2 - 8} Q ${midX} ${midY} ${px} ${py}`);
          cardPath.setAttribute("stroke", `hsl(183 52% 64% / ${0.65 * cardAlpha})`);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div ref={fieldRef} className="relative">
      {/* Fixed layers: strings, bubble, pop ring */}
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
            <path ref={cardPathRef} fill="none" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <div
            ref={ringRef}
            className="pointer-events-none fixed left-0 top-0 z-40 h-20 w-20 rounded-full border-2 border-[#9ce8ea]/70 opacity-0"
            aria-hidden="true"
          />

          <div
            ref={bubbleRef}
            className="pointer-events-none fixed left-0 top-0 z-40 will-change-transform"
            aria-hidden="true"
          >
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
                <span className="relative flex flex-col items-center">
                  <span className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
                    UnClick
                  </span>
                  <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.26em] text-primary/75 sm:text-[10px]">
                    where AI belongs
                  </span>
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Act one: the scene ─────────────────────────────────── */}
      <div ref={heroSceneRef} className="relative mx-auto h-[600px] w-full max-w-3xl sm:h-[680px]">
        {/* Reduced motion gets a still bubble in flow */}
        {reduced && (
          <div className="absolute left-1/2 top-2 -translate-x-1/2">
            <div className="flex h-[290px] w-[290px] items-center justify-center rounded-full border border-[#86dadd]/50 bg-primary/[0.08] sm:h-[380px] sm:w-[380px]">
              <span className="text-3xl font-extrabold tracking-tight text-heading">UnClick</span>
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-4 z-30 flex flex-wrap items-end justify-center gap-x-3 gap-y-4 px-4 sm:gap-x-4">
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

      {/* ── Act two: the swing ─────────────────────────────────── */}
      <div className="mx-auto max-w-5xl">
        <StoryCard
          label="memory"
          headline="It already knows how you work."
          side="left"
          anchorRef={(el) => {
            cardRefs.current[0] = el;
          }}
        >
          <div className="space-y-2">
            {["how you like things done", "what you said last time"].map((fact) => (
              <div
                key={fact}
                className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2 font-mono text-[12px]"
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                <span className="text-primary/80">remembers ›</span>
                <span className="truncate text-body">{fact}</span>
              </div>
            ))}
          </div>
        </StoryCard>

        <StoryCard
          label="the gate"
          headline="Checked before it runs."
          side="right"
          anchorRef={(el) => {
            cardRefs.current[1] = el;
          }}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {GATES.map((gate) => (
              <div
                key={gate.name}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5",
                  gate.ok ? "border-primary/25 bg-primary/[0.05]" : "border-red-400/40 bg-red-400/[0.07]",
                )}
              >
                {gate.ok ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5 text-red-300" />
                )}
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.12em]",
                    gate.ok ? "text-body/80" : "text-red-200/90",
                  )}
                >
                  {gate.name}
                </span>
              </div>
            ))}
          </div>
        </StoryCard>

        <StoryCard
          label="proof"
          headline="Every job leaves with a receipt."
          side="left"
          anchorRef={(el) => {
            cardRefs.current[2] = el;
          }}
        >
          <div className="relative rounded-lg border border-primary/30 bg-primary/[0.06] p-3.5 pr-20">
            <p className="font-mono text-[12px] leading-5 text-body">work checked before it ships</p>
            <p className="font-mono text-[12px] leading-5 text-body">a receipt for every job</p>
            <span className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 -rotate-6 items-center gap-1 rounded border-2 border-primary/80 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
              <BadgeCheck className="h-3 w-3" />
              pass
            </span>
          </div>
        </StoryCard>
      </div>

      {/* ── Act three: the finish ──────────────────────────────── */}
      <section className="px-6 pb-10 pt-6 text-center">
        <div className="mx-auto min-h-[30svh] max-w-2xl pt-[18svh]">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-5xl">
              Same memory. Same rules. Same{" "}receipts.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-9 flex justify-center">
              <a
                href="#install"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
              >
                Grab a string
              </a>
            </div>
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
      "Everyone's AI. One bubble. The whole team holds a string to the same layer: memory, rules, and receipts.",
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
          <div className="hp-floor" aria-hidden="true" />
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

        {/* ── The journey: scene, swing, finish ──────────────────── */}
        <JourneyField />

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewR;
