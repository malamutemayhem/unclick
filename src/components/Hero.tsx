import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { AppWindow, Brain, Link2, BadgeCheck, ArrowRight, Plane } from "lucide-react";
import { Eyebrow, GradientText, GlassCard, IconChip } from "@/components/brand";
import { presets } from "@/lib/design-system";

/**
 * Public-facing product tiles.
 *
 * Notes (2026-06-07 deck-aligned restyle):
 *  - Navy aurora canvas + teal accent. Copy and links unchanged.
 *  - All icons are monochrome on a single teal tint. No rainbow.
 *  - AutoPilot is surfaced as the simple work hub, with XPass as its proof layer.
 *  - Connections currently points at /admin/keychain to match the Footer.
 */
const PRODUCTS = [
  {
    title: "Apps",
    description: "Every tool your agent needs, in one install.",
    href: "/tools",
    icon: AppWindow,
  },
  {
    title: "Memory",
    description: "Cross-session memory that remembers and shows what it captured.",
    href: "/memory",
    icon: Brain,
  },
  {
    title: "Connections",
    description: "Sign in once. Your agent uses everything else.",
    href: "/admin/keychain",
    icon: Link2,
  },
  {
    title: "AutoPilot",
    description: "The work hub that plans, routes, checks, and proves jobs.",
    href: "/admin/autopilot",
    icon: Plane,
  },
  {
    title: "XPass",
    description: "The roadworthy checklist for AI work before it ships.",
    href: "/dogfood",
    icon: BadgeCheck,
  },
];

const Hero = () => {
  return (
    <>
      {/* Hero */}
      <section className={presets.heroSection}>
        <div className={presets.heroInner}>
          <FadeIn>
            <div className="flex justify-center">
              <Eyebrow>Universal remote for AI</Eyebrow>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.03] tracking-[-0.025em] text-heading sm:text-6xl md:text-7xl">
              Every tool.{" "}
              <GradientText>One install.</GradientText>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className={presets.lede}>
              UnClick gives your AI agent every tool it needs, memory that remembers,
              and built-in proof the work was done right.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 flex justify-center">
              <a
                href="#install"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("install")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
              >
                Get started
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section id="products" className={presets.section}>
        <div className={presets.sectionInner}>
          <FadeIn>
            <div className={presets.sectionHeader}>
              <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                The <GradientText>rails</GradientText> your agent plugs into.
              </h2>
              <p className="mt-3 text-body">
                One layer that sits behind Claude, ChatGPT, Cursor, and every MCP client.
                Tools to act. Memory to remember. Connections to sign in. AutoPilot to move work. XPass to prove it.
              </p>
            </div>
          </FadeIn>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {PRODUCTS.map((product, i) => (
              <FadeIn key={product.title} delay={0.05 * i}>
                <Link to={product.href} className="group block h-full">
                  <GlassCard className="h-full transition-all duration-300 group-hover:border-primary/40 group-hover:bg-white/[0.07] group-hover:shadow-[0_20px_60px_-24px_rgba(97,193,196,0.35)]">
                    <IconChip className="mb-4">
                      <product.icon className="h-5 w-5" />
                    </IconChip>
                    <h3 className="text-lg font-semibold text-heading">{product.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
