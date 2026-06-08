import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";
import {
  Package,
  Layers,
  Gauge,
  Stamp,
  Compass,
  Bookmark,
  Bell,
  ShieldCheck,
  RefreshCw,
  Database,
  History,
  Fingerprint,
  BadgeCheck,
  Users,
  CreditCard,
  GitBranch,
  MapPin,
  Bot,
  Github,
  HardDrive,
  Lock,
} from "lucide-react";

/**
 * Why UnClick (2026-06-08).
 *
 * The moat page. Honest, at-a-glance reasons to adopt UnClick, grouped into
 * five pillars that mirror the homepage promise (every tool, your memory,
 * signed permissions, built-in proof, one install). Then a balanced
 * comparison against self-hosted agent runtimes: where UnClick shines, and
 * where those runtimes still lead.
 *
 * Framing rule (per standing guidance): UnClick is the universal remote for
 * AI, the layer your assistant plugs into. Not an OS, not a runtime. No
 * competitor is named; we compare to the category ("self-hosted agents").
 * Numbers come from the live catalog (218 apps / 914 tools / 20 categories,
 * stated conservatively). No unverified performance stats.
 */

type Reason = { icon: typeof Package; title: string; desc: string };
type Pillar = { eyebrow: string; reasons: Reason[] };

const PILLARS: Pillar[] = [
  {
    eyebrow: "Every tool, one install",
    reasons: [
      {
        icon: Package,
        title: "900+ tools, 200+ apps, one install",
        desc: "Your AI goes from chatting to doing across 20 categories, with no wiring or securing a single integration.",
      },
      {
        icon: Layers,
        title: "They all behave the same",
        desc: "One sign-in pattern, one error shape, one standard across the whole catalog. The consistency is the point.",
      },
      {
        icon: Gauge,
        title: "It does not bloat your context",
        desc: "Tools are found on demand, so hundreds of them never crowd the window. A tool call costs a fraction of the tokens of clicking through a web UI.",
      },
    ],
  },
  {
    eyebrow: "Tools you can trust",
    reasons: [
      {
        icon: Stamp,
        title: "Every answer is stamped",
        desc: "Each result says where it came from and how fresh it is, so you can trust the number instead of hoping.",
      },
      {
        icon: Compass,
        title: "Every answer points to the next step",
        desc: "Each tool hands your agent the next useful tool, so it stops guessing what to do next.",
      },
      {
        icon: Bookmark,
        title: "Tools remember your defaults",
        desc: "Ask for the next train without repeating your home stop. Set it once and it sticks.",
      },
      {
        icon: Bell,
        title: "Tools tap you on the shoulder",
        desc: "A tool can flag a change you care about, a delay, an incident, a price move, into your own inbox.",
      },
      {
        icon: ShieldCheck,
        title: "Hardened to one standard",
        desc: "Timeouts, rate-limit handling, clean errors, and a test on every tool. Built to behave under pressure.",
      },
    ],
  },
  {
    eyebrow: "Memory that is genuinely yours",
    reasons: [
      {
        icon: RefreshCw,
        title: "One memory across every tool and device",
        desc: "Start in one assistant, continue in another, finish on mobile. You never re-explain your world.",
      },
      {
        icon: Database,
        title: "Your data, your database",
        desc: "Memory lives in your own database. We never see it, and if you leave, it is already yours. Zero lock-in.",
      },
      {
        icon: History,
        title: "Nothing is silently lost",
        desc: "When a fact changes, the old version is kept, and you can watch a live feed of what gets learned.",
      },
      {
        icon: Gauge,
        title: "It keeps itself lean",
        desc: "Used memories surface first, stale ones fade to save context, and all of it stays searchable.",
      },
    ],
  },
  {
    eyebrow: "Permissions and proof, built in",
    reasons: [
      {
        icon: Fingerprint,
        title: "Signed permissions",
        desc: "Per-account isolation, install tickets, and device pairing keep your keys and access scoped, never shared.",
      },
      {
        icon: BadgeCheck,
        title: "Built-in proof the work was done right",
        desc: "Quality badges and answer receipts mark work pass, warn, or fail. You get evidence, not vibes.",
      },
      {
        icon: Users,
        title: "A council that argues, not a yes-bot",
        desc: "For decisions that matter, a crew of expert views weighs in with dissent and evidence.",
      },
    ],
  },
  {
    eyebrow: "Calm to own",
    reasons: [
      {
        icon: CreditCard,
        title: "Flat, predictable subscription",
        desc: "No token meter running while you sleep, and nothing to host, patch, or secure.",
      },
      {
        icon: GitBranch,
        title: "No lock-in, built in public",
        desc: "MIT-licensed SDKs, an API-first design, and your data stays portable.",
      },
      {
        icon: MapPin,
        title: "Australian made, sovereignty options",
        desc: "Built in Melbourne, with data residency options and no surprise overseas transfers.",
      },
    ],
  },
];

const SHINE = [
  { dim: "Time to value", tip: "How fast you go from nothing to working", unclick: "One install, inside the AI you already use", other: "Clone, configure, host, and secure a process" },
  { dim: "Ops and security", tip: "Who keeps it running and safe", unclick: "Managed, nothing to patch", other: "You own hosting, updates, and the attack surface" },
  { dim: "Tools", tip: "How you get capabilities", unclick: "900+ tools, one standard, vetted", other: "Wire and vet each tool yourself" },
  { dim: "Memory", tip: "Where your memory lives and travels", unclick: "Yours, in your database, across every client", other: "Per-runtime, assembled from plugins" },
  { dim: "Cost shape", tip: "How the bill behaves", unclick: "Flat subscription you can budget", other: "Metered tokens that can spike if untuned" },
  { dim: "Portability", tip: "How easily you move and leave", unclick: "Follows you everywhere, zero lock-in", other: "Centered on the runtime you operate" },
];

const HONEST: Reason[] = [
  {
    icon: Bot,
    title: "Full autonomy",
    desc: "They run on a schedule and act on their own. UnClick adds tools and optional automation, not a 24/7 personal agent.",
  },
  {
    icon: Github,
    title: "Open and free",
    desc: "They are open-source and free to run, with large communities. UnClick is a managed product.",
  },
  {
    icon: HardDrive,
    title: "Fully local",
    desc: "They can run entirely on your own machine and models. UnClick is a hosted service.",
  },
  {
    icon: Lock,
    title: "Total data control",
    desc: "Self-hosting keeps data on your hardware. UnClick keeps your memory in your own database, with isolation in the cloud.",
  },
];

const CLIENTS = ["Claude Code", "Cursor", "Cowork", "Self-hosted agents", "Any MCP client"];

const Why = () => {
  useCanonical("/why");
  useMetaTags({
    title: "Why UnClick - the layer your AI plugs into",
    description:
      "900+ vetted tools, a memory that stays in your own database, signed permissions, and built-in proof, in one install. An honest look at where UnClick beats wiring up a self-hosted agent, and where those agents still lead.",
    ogTitle: "Why UnClick",
    ogDescription:
      "Every tool. Your memory. Signed permissions. Built-in proof. One install. See what makes UnClick different.",
    ogUrl: "https://unclick.world/why",
  });

  return (
    <PageShell
      eyebrow="Why UnClick"
      title="Everything your agent is missing."
      accent="In one install."
      lede={
        <>
          UnClick is the layer your AI plugs into. 900+ tools, a memory that
          stays yours, signed permissions, and built-in proof, across every
          assistant and device you use.
        </>
      }
      cta={{ label: "See what makes it different", href: "#moat" }}
    >
      {/* The five pillars */}
      <section id="moat" className={presets.section}>
        <div className={presets.sectionInner}>
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>What makes it different.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                Most tools give your AI one more thing to call. UnClick gives it
                a whole working layer: tools that behave, a memory that travels,
                and proof the work was done right.
              </p>
            </FadeIn>
          </div>

          <div className="mt-16 space-y-16">
            {PILLARS.map((pillar, p) => (
              <div key={pillar.eyebrow}>
                <FadeIn>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-4 py-1.5 backdrop-blur-sm">
                    <span className="font-mono text-xs font-medium tracking-wide text-primary">
                      {pillar.eyebrow}
                    </span>
                  </div>
                </FadeIn>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pillar.reasons.map((reason, i) => (
                    <FadeIn key={reason.title} delay={0.05 * i}>
                      <div className={presets.tile}>
                        <div className={presets.tileIcon}>
                          <reason.icon className="h-4 w-4" />
                        </div>
                        <h3 className={presets.h3}>{reason.title}</h3>
                        <p className="mt-2 text-sm text-body leading-relaxed">
                          {reason.desc}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: where UnClick shines */}
      <section id="compare" className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-4xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>UnClick vs a self-hosted agent.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                Self-hosted agents are powerful, and they are a different shape.
                Here is where UnClick is the easier, calmer choice.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-12 overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-card/80">
                    <th className="p-3 text-left font-medium text-muted-foreground" />
                    <th className="p-3 text-left font-semibold text-primary">
                      UnClick
                    </th>
                    <th className="p-3 text-left font-medium text-muted-foreground">
                      Self-hosted agents
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SHINE.map((row, i) => (
                    <tr key={row.dim} className={i % 2 === 0 ? "bg-card/40" : ""}>
                      <td className="group relative cursor-help p-3 font-medium text-heading">
                        <span className="border-b border-dotted border-muted-foreground/40">
                          {row.dim}
                        </span>
                        <span className="pointer-events-none absolute left-3 -top-8 z-10 hidden w-56 rounded-lg border border-border/60 bg-card px-3 py-2 text-[10px] text-muted-foreground shadow-lg group-hover:block">
                          {row.tip}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-primary">{row.unclick}</td>
                      <td className="p-3 text-body">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Honesty: where self-hosted agents lead */}
      <section className={presets.section}>
        <div className={presets.sectionInner}>
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Where self-hosted agents lead today.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                No spin. If these matter most to you, a self-hosted agent may be
                the better fit, and UnClick still plugs into it.
              </p>
            </FadeIn>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HONEST.map((item, i) => (
              <FadeIn key={item.title} delay={0.05 * i}>
                <div className="h-full rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
                  <div className={presets.tileIcon}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <h3 className={presets.h3}>{item.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The layer that plugs into anything */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-3xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>The layer, not the rival.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                UnClick is not trying to be your agent. It is the tools and
                memory your agent plugs into. Use it inside the assistant you
                already have, or alongside a self-hosted agent. It travels with
                you, not the other way around.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {CLIENTS.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-4 py-2 backdrop-blur-sm"
                >
                  <RefreshCw className="h-3 w-3 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className={presets.section}>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>
              Give your AI the layer it has been missing.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 flex justify-center">
              <a href="/#install" className={presets.ctaPrimary}>
                Get started
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
};

export default Why;
