import { useEffect } from "react";
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
 * Option J: the orbit. UnClick as its own little world: a planet
 * with three live rings. Inner ring, the AIs you use. Middle ring,
 * the safeguards. Outer ring, the apps. Everything orbits one
 * center, which is the entire ecosystem argument in a glance.
 */

const RING_AI = ["ChatGPT", "Claude", "Copilot", "Cursor", "local"];
const RING_SAFE = ["memory", "gates", "proof", "team"];
const RING_APPS = ["Gmail", "Xero", "Slack", "GitHub", "Stripe", "Notion", "Calendar", "Shopify"];

function OrbitRing({
  items,
  radiusPct,
  ring,
  chipClass,
}: {
  items: string[];
  radiusPct: number;
  ring: "a" | "b" | "c";
  chipClass: string;
}) {
  return (
    <div className={cn("absolute inset-0", `hp-orbit-${ring}`)} aria-hidden="true">
      {items.map((item, i) => {
        const angle = (Math.PI * 2 * i) / items.length - Math.PI / 2;
        const x = 50 + radiusPct * Math.cos(angle);
        const y = 50 + radiusPct * Math.sin(angle);
        return (
          <div
            key={item}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={cn(
                `hp-orbit-${ring}-item`,
                "block whitespace-nowrap rounded-full border backdrop-blur-sm",
                chipClass,
              )}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      {/* Ring guides */}
      {[24, 36, 48].map((r) => (
        <div
          key={r}
          className="absolute rounded-full border border-primary/[0.13]"
          style={{ inset: `${50 - r}%` }}
          aria-hidden="true"
        />
      ))}

      {/* The planet */}
      <div className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/50 bg-gradient-to-br from-[#0a2c3c] to-[#06202c] shadow-[0_0_70px_-14px_hsl(182_46%_57%/0.55),inset_0_0_40px_-12px_hsl(182_46%_57%/0.3)]">
        <span className="text-base font-extrabold tracking-tight text-heading sm:text-xl">
          UnClick
        </span>
      </div>

      <OrbitRing
        items={RING_AI}
        radiusPct={24}
        ring="a"
        chipClass="border-primary/45 bg-primary/[0.14] px-2.5 py-1 font-mono text-[10px] font-semibold text-heading"
      />
      <OrbitRing
        items={RING_SAFE}
        radiusPct={36}
        ring="b"
        chipClass="border-amber-400/30 bg-amber-400/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-amber-200/90"
      />
      <OrbitRing
        items={RING_APPS}
        radiusPct={48}
        ring="c"
        chipClass="border-white/[0.1] bg-[#06202c]/85 px-2.5 py-1 font-mono text-[10px] text-body/85"
      />
    </div>
  );
}

const RING_LINES = [
  { label: "inner ring", text: "The AIs you already use, all connected at once." },
  { label: "middle ring", text: "The safeguards: memory, gates, proof, and the team." },
  { label: "outer ring", text: "Your apps, powered and within reach." },
];

const HomePreviewJ = () => {
  useCanonical("/home-preview-j");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Its own ecosystem. Your AIs on the inner ring, the safeguards in the middle, your apps on the outside, all orbiting one center.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Where AI belongs.",
    ogUrl: "https://unclick.world/home-preview-j",
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
      <OptionRibbon active="j" />

      <main>
        {/* ── Hero: the world ────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32 text-center sm:pt-36">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-4xl">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                Where AI <GradientText>belongs.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-10">
                <Orbit />
              </div>
            </FadeIn>

            <FadeIn delay={0.26}>
              <div className="mt-8 flex justify-center">
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Join the orbit
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── One line per ring ──────────────────────────────────── */}
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {RING_LINES.map((ring, i) => (
              <FadeIn key={ring.label} delay={0.06 * i}>
                <div className="h-full rounded-xl border border-[#86dadd]/15 bg-[#071e29]/80 p-5 text-center backdrop-blur-sm">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70">
                    {ring.label}
                  </span>
                  <p className="mt-3 text-[14px] leading-relaxed text-body [text-wrap:balance]">
                    {ring.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewJ;
