import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck, Code2, GitBranch, MapPin } from "lucide-react";
import { SITE_STATS } from "@/config/site-stats";

/**
 * ProofBand: the catalog numbers, counted up on first view, with the
 * trust signals folded into one quiet line beneath. All figures come
 * from SITE_STATS so they update with the single source of truth.
 */

const STATS = [
  { value: SITE_STATS.CALLABLE_ENDPOINTS, suffix: "+", label: "callable endpoints" },
  { value: SITE_STATS.TOOL_FILES, suffix: "+", label: "apps in the catalog" },
  { value: SITE_STATS.TOOL_GROUPS, suffix: "", label: "tool groups" },
  { value: SITE_STATS.BACKSTAGEPASS_PLATFORMS, suffix: "+", label: "sign-in connectors" },
];

const TRUST = [
  { icon: Code2, label: "Everything is an endpoint", href: "/tools" },
  {
    icon: GitBranch,
    label: "MIT on npm",
    href: "https://www.npmjs.com/package/@unclick/mcp-server",
    external: true,
  },
  { icon: BadgeCheck, label: "Proof, not promises", href: "/dogfood" },
  { icon: MapPin, label: "Built in Melbourne", href: "/privacy" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let frame: number;
    const start = performance.now();
    const duration = 1300;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export default function ProofBand() {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </dd>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border/40 pt-8">
        {TRUST.map((item) => {
          const inner = (
            <>
              <item.icon className="h-3.5 w-3.5 text-primary/70" />
              {item.label}
            </>
          );
          const cls =
            "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/80 transition-colors hover:text-body";
          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cls}
            >
              {inner}
            </a>
          ) : (
            <Link key={item.label} to={item.href} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
