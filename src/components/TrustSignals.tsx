import { Code2, GitBranch, MapPin, Gauge } from "lucide-react";
import FadeIn from "./FadeIn";
import { GlassCard, IconChip } from "@/components/brand";

const signals = [
  {
    icon: Code2,
    title: "API-first",
    desc: "Every feature is available as an API before it ever gets a screen. If it is in the product, it is in the endpoints.",
  },
  {
    icon: GitBranch,
    title: "Open-source friendly",
    desc: "MIT-licensed SDKs. No lock-in. Inspect, fork, and contribute. We build in public.",
  },
  {
    icon: MapPin,
    title: "Australian made",
    desc: "Built in Melbourne. Data sovereignty options available. No surprise US data transfers.",
  },
  {
    icon: Gauge,
    title: "99.9% uptime target",
    desc: "Deployed on Cloudflare Workers. Fast everywhere, with no cold starts. Your agents do not wait.",
  },
];

const TrustSignals = () => (
  <section className="mx-auto max-w-4xl px-6 py-24">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {signals.map((s, i) => (
        <FadeIn key={s.title} delay={i * 0.08}>
          <GlassCard className="h-full">
            <IconChip>
              <s.icon className="h-5 w-5" />
            </IconChip>
            <h3 className="mt-4 text-sm font-semibold text-heading">{s.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-body">{s.desc}</p>
          </GlassCard>
        </FadeIn>
      ))}
    </div>
  </section>
);

export default TrustSignals;
