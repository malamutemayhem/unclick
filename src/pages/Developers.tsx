import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GlassCard } from "@/components/brand";
import { presets } from "@/lib/design-system";

/**
 * Developer program landing page (beta-honest rewrite, 2026-06-11).
 *
 * The marketplace chapter is paused, so this page promises exactly what the
 * program delivers today: write a tool, submit it, a human reviews it, and
 * approved tools join the catalog. No revenue claims, no testimonials, no
 * calculators. Composes from the design canon.
 */

const STARTER_TEMPLATE = `export const weatherTools = [
  {
    name: "get_current_weather",
    description: "Returns current weather for a location.",
    inputSchema: {
      type: "object",
      properties: {
        latitude:  { type: "number", description: "Latitude." },
        longitude: { type: "number", description: "Longitude." }
      },
      required: ["latitude", "longitude"]
    },
    handler: async (args: any) => {
      const { latitude, longitude } = args;
      const res = await fetch(
        \`https://api.open-meteo.com/v1/forecast\` +
        \`?latitude=\${latitude}&longitude=\${longitude}&current_weather=true\`
      );
      if (!res.ok) throw new Error(\`Weather API error: \${res.status}\`);
      const data = await res.json();
      return data.current_weather;
    }
  }
];`;

const steps = [
  {
    number: "01",
    title: "Write your tool",
    desc: "One TypeScript file. Export an array of tool definitions. Each one wraps an API call. A simple wrapper takes about 30 minutes.",
  },
  {
    number: "02",
    title: "Submit for review",
    desc: "Paste your file or link your GitHub repo. A person reviews every submission and replies with specific feedback.",
  },
  {
    number: "03",
    title: "Go live",
    desc: "Approved tools join the catalog and become callable by every agent connected to UnClick.",
  },
];

const whyItems = [
  { title: "Zero infrastructure", desc: "UnClick hosts, scales, and monitors everything. You ship code, not servers." },
  { title: "Instant distribution", desc: "Your tool is available to every UnClick user the moment it goes live." },
  { title: "Full TypeScript SDK", desc: "Typed helpers, error patterns, and a local test runner included." },
  { title: "Human review", desc: "Every submission is read by a person before it ships. Specific feedback, not a form letter." },
];

const categories = [
  { name: "AU-specific", desc: "ABN lookups, ATO data, Australian government APIs", open: true },
  { name: "Security", desc: "CVE lookups, cert checks, IP reputation", open: true },
  { name: "Productivity", desc: "Task management, calendars, docs", open: false },
  { name: "Finance", desc: "Exchange rates, stock data, invoicing", open: true },
  { name: "Health", desc: "Medical lookups, drug info, health APIs", open: true },
  { name: "Science", desc: "Arxiv, PubMed, chemistry data", open: true },
];

const approvalChecklist = [
  "My tool file is TypeScript and exports a named array (e.g. weatherTools).",
  "All API access goes through Passport, never hardcoded.",
  "Every fetch call checks res.ok and throws a descriptive error if false.",
  "Tool names are snake_case (e.g. get_current_weather).",
  "Descriptions start with a verb and are under 120 characters.",
  "I have run the tool locally and each call returns real data.",
  "The upstream API's terms of service allow this kind of wrapper.",
];

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="font-mono text-xs text-muted-foreground transition-colors hover:text-heading"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function DevelopersPage() {
  return (
    <PageShell
      eyebrow="Developer program"
      title="Build a tool. Ship it to every agent."
      lede="Write one TypeScript file. UnClick reviews it, hosts it, and makes it callable by any agent connected to UnClick. The program is in beta, so expect direct feedback and fast iteration."
      cta={{ label: "Read the docs", href: "/developers/docs" }}
    >
      {/* The 20-line tool */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>It really is this simple</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>A working tool in 20 lines</h2>
            <p className="mt-3 text-body">
              This is a complete, submittable tool. No API key needed. Copy it, run it locally, submit it.
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="mt-6 overflow-hidden rounded-[18px] border border-[#86dadd]/15 bg-white/[0.03]">
              <div className="flex items-center justify-between border-b border-[#86dadd]/10 px-4 py-2">
                <span className="font-mono text-xs text-muted-foreground">weather-tools.ts</span>
                <CopyButton code={STARTER_TEMPLATE} />
              </div>
              <pre className="overflow-x-auto p-5">
                <code className="font-mono text-xs leading-relaxed text-body">{STARTER_TEMPLATE}</code>
              </pre>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-lg border border-[#86dadd]/15 bg-white/[0.03] px-3 py-1.5 text-xs text-body">
                Uses Open-Meteo (no key required)
              </span>
              <Link
                to="/developers/docs"
                className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/20"
              >
                Full pattern in the docs
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>How it works</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>Three steps, one reviewer, no servers</h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.07}>
                <GlassCard className="h-full">
                  <span className="font-mono text-3xl font-bold text-primary/40">{step.number}</span>
                  <h3 className="mt-4 text-base font-semibold text-heading">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{step.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What UnClick handles */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>What UnClick handles</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>You write the tool. The rest is done.</h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {whyItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <GlassCard className="h-full">
                  <h3 className="text-sm font-semibold text-heading">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{item.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tool categories */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Categories that need tools</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>Where a new tool helps most</h2>
            <p className="mt-3 text-body">
              These categories have strong demand from agents but few or no tools yet.
            </p>
          </FadeIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.06}>
                <GlassCard className="relative h-full p-5">
                  {cat.open && (
                    <span className="absolute right-4 top-4 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                      Open
                    </span>
                  )}
                  <h3 className="pr-16 text-sm font-semibold text-heading">{cat.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{cat.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Self-check section */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Before you submit</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>Will my tool be approved?</h2>
            <p className="mt-3 text-body">
              Run through this checklist. If you can tick everything, your tool will almost certainly pass review.
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <GlassCard className="mt-8">
              <ul className="space-y-3">
                {approvalChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#86dadd]/15 bg-white/[0.03] font-mono text-[10px] text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-body">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-[#86dadd]/10 pt-4">
                <p className="text-xs text-muted-foreground">
                  If your tool is not approved, you get specific feedback and can resubmit straight away.
                  There is no limit on resubmissions.
                </p>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 pb-32 pt-4">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <GlassCard className="px-8 py-12 text-center">
              <h2 className={presets.h2}>Ready to build?</h2>
              <p className="mx-auto mt-3 max-w-lg text-body">
                Read the docs, write your first tool, and submit it. Most developers ship their first tool in under an hour.
                No account required to get started.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/developers/docs" className={presets.ctaPrimary}>
                  Start building
                </Link>
                <Link to="/developers/submit" className={presets.ctaGhost}>
                  Submit a tool
                </Link>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
