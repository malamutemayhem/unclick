import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { BadgeCheck, Bot, MoveRight, ShieldCheck, User, Users } from "lucide-react";
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
 * Option R: the bubble. UnClick's locked positioning is "the layer,
 * the bubble, that tethers into any MCP client", so this option makes
 * the metaphor literal. One large glassy bubble drifts slowly around
 * the page as you scroll, tethered by living strings to human > AI
 * pairs. The nearest pair's tether glows; the others hold soft.
 *
 * Mechanics: the bubble is fixed and glides between viewport
 * waypoints via scroll-linked springs. A fixed SVG layer redraws the
 * tether curves every animation frame from the bubble's live center
 * to each pair's anchor, imperatively (no re-renders). Reduced
 * motion: the bubble sits still in the hero and tethers hide.
 */

type Pair = {
  human: string;
  humanIcon: typeof User;
  ai: string;
  job: string;
  chip: { label: string; kind: "pass" | "gate" | "plain" };
};

const PAIRS: Pair[] = [
  {
    human: "You",
    humanIcon: User,
    ai: "Claude",
    job: "chase the overdue invoice",
    chip: { label: "done · receipt", kind: "pass" },
  },
  {
    human: "Sam",
    humanIcon: User,
    ai: "ChatGPT",
    job: "sort Monday's inbox",
    chip: { label: "done · receipt", kind: "pass" },
  },
  {
    human: "Priya",
    humanIcon: User,
    ai: "Cursor",
    job: "fix the broken link",
    chip: { label: "checked twice", kind: "gate" },
  },
  {
    human: "The team",
    humanIcon: Users,
    ai: "every AI",
    job: "keep it moving overnight",
    chip: { label: "queued", kind: "plain" },
  },
];

/* Bubble waypoints across scroll progress: weaves opposite to the
   alternating pair cards so the tethers stretch across the page. */
const X_STOPS = [0.74, 0.3, 0.72, 0.3, 0.52];
const Y_STOPS = [0.4, 0.46, 0.5, 0.48, 0.42];

function PairCard({
  pair,
  index,
  anchorRef,
}: {
  pair: Pair;
  index: number;
  anchorRef: (el: HTMLDivElement | null) => void;
}) {
  const onRight = index % 2 === 1;
  return (
    <section className={cn("flex min-h-[62svh] items-center px-6", onRight ? "justify-end" : "justify-start")}>
      <FadeIn>
        <div className="relative w-full max-w-sm rounded-2xl border border-[#86dadd]/18 bg-[#071e29]/90 p-6 shadow-[0_36px_80px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md">
          {/* Tether anchor: the bubble's string attaches here. */}
          <div
            ref={anchorRef}
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(182_46%_57%/0.55)]",
              onRight ? "-left-1" : "-right-1",
            )}
          />

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-primary/50 bg-primary/[0.14] py-1.5 pl-2 pr-3.5 text-[13px] font-semibold text-heading">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/60 bg-primary/20 text-primary">
                <pair.humanIcon className="h-3 w-3" />
              </span>
              {pair.human}
            </span>
            <MoveRight className="h-4 w-4 shrink-0 text-primary/60" aria-hidden="true" />
            <span className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#06202c]/85 py-1.5 pl-2 pr-3.5 text-[13px] text-body">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/25 bg-primary/[0.08] text-primary/80">
                <Bot className="h-3 w-3" />
              </span>
              {pair.ai}
            </span>
          </div>

          <p className="mt-4 text-[14.5px] leading-relaxed text-body">"{pair.job}"</p>

          <div className="mt-3">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]",
                pair.chip.kind === "pass" &&
                  "border-primary/40 bg-primary/[0.1] font-bold uppercase tracking-[0.1em] text-primary",
                pair.chip.kind === "gate" &&
                  "border-amber-400/30 bg-amber-400/[0.07] text-amber-200/90",
                pair.chip.kind === "plain" && "border-white/[0.1] bg-[#06202c]/80 text-body/90",
              )}
            >
              {pair.chip.kind === "pass" && <BadgeCheck className="h-2.5 w-2.5" />}
              {pair.chip.kind === "gate" && <ShieldCheck className="h-2.5 w-2.5" />}
              {pair.chip.label}
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function BubbleField({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const fieldRef = useRef<HTMLDivElement>(null);
  const anchorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: fieldRef, offset: ["start 0.8", "end 0.6"] });
  const xPct = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], X_STOPS);
  const yPct = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], Y_STOPS);
  // Slow, dreamy lag: the bubble arrives after you do.
  const xSpring = useSpring(xPct, { stiffness: 26, damping: 16, mass: 1.1 });
  const ySpring = useSpring(yPct, { stiffness: 26, damping: 16, mass: 1.1 });
  const bubbleLeft = useTransform(xSpring, (v) => `${v * 100}%`);
  const bubbleTop = useTransform(ySpring, (v) => `${v * 100}%`);

  // Imperative tether redraw: every frame, connect the bubble's live
  // center to each on-screen anchor with a sagging curve.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const bx = xSpring.get() * vw;
      const by = ySpring.get() * vh;

      let nearest = -1;
      let nearestDist = Infinity;
      const points: ({ x: number; y: number } | null)[] = anchorsRef.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        if (r.bottom < -40 || r.top > vh + 40) return null;
        const p = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        return p;
      });
      points.forEach((p, i) => {
        if (!p) return;
        const d = Math.hypot(p.x - bx, p.y - by);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = i;
        }
      });

      points.forEach((p, i) => {
        const path = pathRefs.current[i];
        if (!path) return;
        if (!p) {
          path.setAttribute("d", "");
          return;
        }
        const midX = (bx + p.x) / 2;
        const midY = (by + p.y) / 2 + Math.min(90, Math.abs(p.x - bx) * 0.22);
        path.setAttribute("d", `M ${bx} ${by} Q ${midX} ${midY} ${p.x} ${p.y}`);
        path.setAttribute("stroke", i === nearest ? "hsl(182 46% 62% / 0.75)" : "hsl(182 46% 57% / 0.22)");
        path.setAttribute("stroke-width", i === nearest ? "2" : "1.25");
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, xSpring, ySpring]);

  return (
    <div ref={fieldRef} className="relative">
      {/* Tether layer */}
      {!reduced && (
        <svg className="pointer-events-none fixed inset-0 z-30 h-full w-full" aria-hidden="true">
          {PAIRS.map((_, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>
      )}

      {/* The bubble */}
      {!reduced ? (
        <motion.div
          ref={bubbleRef}
          style={{ left: bubbleLeft, top: bubbleTop }}
          className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, -12, 0], scale: [1, 1.025, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-44 w-44 items-center justify-center rounded-full border border-[#86dadd]/45 sm:h-64 sm:w-64"
            style={{
              background:
                "radial-gradient(circle at 32% 26%, hsl(184 70% 88% / 0.28), hsl(182 46% 57% / 0.1) 38%, hsl(199 56% 16% / 0.3) 72%)",
              boxShadow:
                "0 40px 110px -30px rgba(0,0,0,0.8), 0 0 80px -18px hsl(182 46% 57% / 0.5), inset 0 0 50px -12px hsl(184 70% 80% / 0.25)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              className="absolute left-[18%] top-[12%] h-[22%] w-[34%] rounded-[50%] bg-white/25 blur-[6px]"
              aria-hidden="true"
            />
            <span className="flex flex-col items-center">
              <span className="text-lg font-extrabold tracking-tight text-heading sm:text-2xl">
                UnClick
              </span>
              <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.22em] text-primary/70 sm:text-[9px]">
                where AI belongs
              </span>
            </span>
          </motion.div>
        </motion.div>
      ) : (
        <div className="mx-auto mt-10 flex h-52 w-52 items-center justify-center rounded-full border border-[#86dadd]/45 bg-primary/[0.08]">
          <span className="text-xl font-extrabold tracking-tight text-heading">UnClick</span>
        </div>
      )}

      {/* Pairs with registered anchors */}
      <div className="mx-auto max-w-5xl">
        {PAIRS.map((pair, i) => (
          <PairCard
            key={pair.human}
            pair={pair}
            index={i}
            anchorRef={(el) => {
              anchorsRef.current[i] = el;
            }}
          />
        ))}
      </div>

      {children}
    </div>
  );
}

const HomePreviewR = () => {
  useCanonical("/home-preview-r");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Everyone's AI. One bubble. Every human and their AI, tethered to the same layer: memory, rules, and receipts.",
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
        <section className="relative overflow-hidden px-6 pb-6 pt-32 text-center sm:pt-40">
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
                <GradientText>One{" "}bubble.</GradientText>
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mx-auto mt-6 max-w-md text-body [text-wrap:balance]">
                Every pair below is tethered to the same layer. Watch it{" "}drift.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── The bubble and its pairs ───────────────────────────── */}
        <BubbleField>
          {/* Terminus inside the field so the bubble settles here */}
          <section className="px-6 pb-24 pt-10 text-center">
            <div className="relative z-10 mx-auto max-w-2xl">
              <FadeIn>
                <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-5xl">
                  Same memory. Same rules. Same{" "}receipts.
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-10 flex justify-center">
                  <a
                    href="#install"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                  >
                    Step inside
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>
        </BubbleField>

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewR;
