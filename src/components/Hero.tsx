import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { AppWindow, Brain, Link2, BadgeCheck, ArrowRight } from "lucide-react";
import { presets } from "@/lib/design-system";

/**
 * Public-facing product tiles.
 *
 * Notes (2026-05-28 Apple polish pass):
 *  - All icons are monochrome on a single primary tint. No rainbow.
 *  - Autopilot and the developer marketplace are intentionally not surfaced
 *    as tiles right now (per Chris). They remain in the codebase.
 *  - Connections currently points at /admin/keychain to match the Footer.
 *    Promote to a public landing if/when one ships.
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
    title: "XPass",
    description: "Built-in proof the work was actually done right.",
    href: "/dogfood",
    icon: BadgeCheck,
  },
];

const Hero = () => {
  return (
    <>
      {/* Hero */}
      <section className={presets.heroSection}>
        <div className={presets.halo} aria-hidden="true" />

        <div className={presets.heroInner}>
          <FadeIn>
            <div className={presets.eyebrow}>
              <span className={presets.eyebrowText}>Universal remote for AI</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className={presets.h1}>
              Every tool.{" "}
              <span className="text-primary">One install.</span>
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
                className={presets.ctaPrimary}
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
              <h2 className={presets.h2}>The rails your agent plugs into.</h2>
              <p className="mt-3 text-body">
                One layer that sits behind Claude, ChatGPT, Cursor, and every MCP client.
                Tools to act. Memory to remember. Connections to sign in. Proof it worked.
              </p>
            </div>
          </FadeIn>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {PRODUCTS.map((product, i) => (
              <FadeIn key={product.title} delay={0.05 * i}>
                <Link to={product.href} className={presets.tile}>
                  <div className={presets.tileIcon}>
                    <product.icon className="h-5 w-5" />
                  </div>
                  <h3 className={presets.h3}>{product.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
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
