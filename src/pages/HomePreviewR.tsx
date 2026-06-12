import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Bot, User } from "lucide-react";
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
 * Option R v2: the bubble. One composed scene: a big, beautiful
 * glass bubble floating above a tight cluster of people, every
 * person holding a string. The strings leave the bubble through one
 * narrow gather point and stay bunched together, only fanning at
 * the very end to reach each hand, like a bunch of balloons.
 *
 * Motion: the bubble drifts gently (time-based, small amplitude)
 * and the bundle sways with it, redrawn imperatively each frame.
 * Reduced motion: drawn once, still.
 */

const PEOPLE = [
  { name: "Sam", ai: "ChatGPT" },
  { name: "Priya", ai: "Cursor" },
  { name: "You", ai: "Claude", you: true },
  { name: "Alex", ai: "Copilot" },
  { name: "Mia", ai: "local model" },
];

function BubbleScene() {
  const reduced = useReducedMotion() ?? false;
  const sceneRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const personRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const bubble = bubbleRef.current;
    if (!scene || !bubble) return;

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const rect = scene.getBoundingClientRect();
      const t = reduced ? 0 : (now - start) / 1000;

      // Gentle drift, small amplitude: the bubble floats, it does
      // not wander.
      const driftX = reduced ? 0 : Math.sin(t * 0.42) * rect.width * 0.018;
      const driftY = reduced ? 0 : Math.sin(t * 0.27 + 1.3) * rect.height * 0.016;

      const bw = bubble.offsetWidth;
      const bx = rect.width * 0.5 + driftX;
      const by = rect.height * 0.06 + driftY + bw / 2;

      bubble.style.transform = `translate(${bx - bw / 2}px, ${rect.height * 0.06 + driftY}px)`;

      // The gather point: strings leave the bubble through a narrow
      // band at its base, so the bundle reads as one cord.
      const gatherY = by + bw / 2 - 6;
      const n = PEOPLE.length;

      personRefs.current.forEach((el, i) => {
        const path = pathRefs.current[i];
        if (!el || !path) return;
        const pr = el.getBoundingClientRect();
        const px = pr.left - rect.left + pr.width / 2;
        const py = pr.top - rect.top + 6;

        // Tight start offsets: the whole bundle spans ~26px.
        const sx = bx + (i - (n - 1) / 2) * 6.5;
        const sway = reduced ? 0 : Math.sin(t * 0.6 + i * 0.7) * 3;

        // Stay bunched for most of the drop, fan only near the hands.
        const bundleX = bx + (i - (n - 1) / 2) * 9 + sway;
        const bundleY = gatherY + (py - gatherY) * 0.62;

        path.setAttribute(
          "d",
          `M ${sx} ${gatherY} C ${sx + sway} ${gatherY + 50}, ${bundleX} ${bundleY}, ${px} ${py}`,
        );
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    const onResize = () => {
      if (reduced) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <div
      ref={sceneRef}
      className="relative mx-auto h-[640px] w-full max-w-3xl sm:h-[720px]"
      aria-label="One bubble, everyone tethered to it"
    >
      {/* Tether bundle */}
      <svg className="absolute inset-0 z-10 h-full w-full" aria-hidden="true">
        {PEOPLE.map((_, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            fill="none"
            stroke="hsl(183 50% 62% / 0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* The bubble: big, glassy, alive */}
      <div
        ref={bubbleRef}
        className="absolute left-0 top-0 z-20 will-change-transform"
        aria-hidden="true"
      >
        <div
          className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full sm:h-[400px] sm:w-[400px]"
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
          {/* Specular highlights */}
          <span className="absolute left-[16%] top-[10%] h-[20%] w-[34%] rotate-[-18deg] rounded-[50%] bg-white/30 blur-[7px]" />
          <span className="absolute bottom-[14%] right-[18%] h-[7%] w-[14%] rounded-[50%] bg-white/10 blur-[5px]" />
          {/* Inner ring for depth */}
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

      {/* The people, holding on, standing together */}
      <div className="absolute inset-x-0 bottom-6 z-30 flex flex-wrap items-end justify-center gap-x-3 gap-y-4 px-4 sm:gap-x-4">
        {PEOPLE.map((person, i) => (
          <FadeIn key={person.name} delay={0.1 + i * 0.08}>
            <div
              className={cn("flex w-[88px] flex-col items-center sm:w-[96px]", i % 2 === 1 && "sm:-translate-y-3")}
            >
              {/* Hand: where the string ends */}
              <div
                ref={(el) => {
                  personRefs.current[i] = el;
                }}
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
              <span
                className={cn(
                  "mt-2 text-[13px] font-semibold",
                  person.you ? "text-heading" : "text-body",
                )}
              >
                {person.name}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-white/[0.1] bg-[#06202c]/85 px-2 py-0.5 font-mono text-[9px] text-body/75">
                <Bot className="h-2.5 w-2.5 text-primary/70" />
                {person.ai}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
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
        <section className="relative overflow-hidden px-6 pb-4 pt-32 text-center sm:pt-36">
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

        {/* ── The scene ──────────────────────────────────────────── */}
        <section className="px-4 pb-8">
          <BubbleScene />
        </section>

        {/* ── The point ──────────────────────────────────────────── */}
        <section className="px-6 pb-24 pt-8 text-center">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-4xl">
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

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewR;
