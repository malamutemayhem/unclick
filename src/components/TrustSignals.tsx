import { Code2, GitBranch, MapPin, BadgeCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import { Eyebrow, GlassCard, IconChip } from "@/components/brand";

/**
 * Trust section rebuilt as receipts (2026-06-11): every claim carries a way
 * to check it. Claims that cannot point at evidence do not ship here.
 */

type Evidence = { label: string; href: string; external?: boolean };

const signals: {
  icon: typeof Code2;
  title: string;
  desc: string;
  evidence: Evidence;
}[] = [
  {
    icon: Code2,
    title: "Everything is an endpoint",
    desc: "Every feature is callable before it ever gets a screen. The full catalog is public, one tile per integration.",
    evidence: { label: "Browse the catalog", href: "/tools" },
  },
  {
    icon: GitBranch,
    title: "MIT-licensed, built in public",
    desc: "The MCP server ships on npm under MIT. Inspect it, fork it, run it yourself.",
    evidence: {
      label: "See the package",
      href: "https://www.npmjs.com/package/@unclick/mcp-server",
      external: true,
    },
  },
  {
    icon: BadgeCheck,
    title: "Proof, not promises",
    desc: "UnClick's own quality gates run on UnClick, and the latest report is public, including what failed.",
    evidence: { label: "Read the dogfood report", href: "/dogfood" },
  },
  {
    icon: MapPin,
    title: "Australian made",
    desc: "Built in Melbourne, hosted in Sydney (ap-southeast-2). Your data does not take surprise detours.",
    evidence: { label: "Read the privacy page", href: "/privacy" },
  },
];

const TrustSignals = () => (
  <section className="mx-auto max-w-4xl px-6 py-24">
    <FadeIn>
      <div className="mb-10 text-center">
        <div className="flex justify-center">
          <Eyebrow>Trust</Eyebrow>
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Claims you can check
        </h2>
      </div>
    </FadeIn>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {signals.map((s, i) => (
        <FadeIn key={s.title} delay={i * 0.08}>
          <GlassCard className="flex h-full flex-col">
            <IconChip>
              <s.icon className="h-5 w-5" />
            </IconChip>
            <h3 className="mt-4 text-sm font-semibold text-heading">{s.title}</h3>
            <p className="mt-2 flex-1 text-xs leading-relaxed text-body">{s.desc}</p>
            {s.evidence.external ? (
              <a
                href={s.evidence.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-heading"
              >
                {s.evidence.label} <ArrowRight className="h-3 w-3" />
              </a>
            ) : (
              <Link
                to={s.evidence.href}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-heading"
              >
                {s.evidence.label} <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </GlassCard>
        </FadeIn>
      ))}
    </div>
  </section>
);

export default TrustSignals;
