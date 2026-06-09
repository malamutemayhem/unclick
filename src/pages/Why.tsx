import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import ExpandableImage from "@/components/ExpandableImage";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { SITE_STATS } from "@/config/site-stats";
import { presets } from "@/lib/design-system";
import {
  Package,
  ShieldCheck,
  Database,
  BadgeCheck,
  CreditCard,
  RefreshCw,
  Bot,
  Github,
  HardDrive,
  Lock,
} from "lucide-react";

/**
 * Why UnClick (2026-06-08, tidied).
 *
 * The moat page, simplified to scan at a glance: one comparison infographic
 * (the hard way vs UnClick), six plain reasons, then an honest comparison
 * against self-hosted agents (where UnClick wins, where they still lead).
 *
 * Framing rule (per standing guidance): UnClick is the universal remote for
 * AI, the layer your assistant plugs into. Not an OS, not a runtime. No
 * competitor is named; we compare to the category ("self-hosted agents").
 * Numbers stated conservatively. No unverified performance stats.
 */

type Reason = { icon: typeof Package; title: string; desc: string };

const REASONS: Reason[] = [
  {
    icon: Package,
    title: "Every tool, one install",
    desc: `${SITE_STATS.ENDPOINTS_DISPLAY} callable endpoints across ${SITE_STATS.TOOLS_DISPLAY} tool files in a single MCP install. No wiring or securing one integration at a time.`,
  },
  {
    icon: ShieldCheck,
    title: "Tools you can trust",
    desc: "Every tool is hardened and tested, stamps where its answer came from, and hands your agent the next step.",
  },
  {
    icon: Database,
    title: "Memory that is yours",
    desc: "One memory across every assistant and device, kept in your own database. Nothing is silently lost, and there is zero lock-in.",
  },
  {
    icon: BadgeCheck,
    title: "Permissions and proof",
    desc: "Signed, scoped access plus built-in proof the work was done right. You get evidence, not vibes.",
  },
  {
    icon: CreditCard,
    title: "Calm to own",
    desc: "One flat subscription. Nothing to host, patch, or secure, and no token meter running while you sleep.",
  },
  {
    icon: RefreshCw,
    title: "The layer, not the rival",
    desc: "Plugs into Claude, Cursor, ChatGPT, and even a self-hosted agent. It travels with you, not the other way around.",
  },
];

const SHINE = [
  { dim: "Time to value", tip: "How fast you go from nothing to working", unclick: "One install, inside the AI you already use", other: "Clone, configure, host, and secure a process" },
  { dim: "Ops and security", tip: "Who keeps it running and safe", unclick: "Managed, nothing to patch", other: "You own hosting, updates, and the attack surface" },
  { dim: "Tools", tip: "How you get capabilities", unclick: `${SITE_STATS.ENDPOINTS_DISPLAY} endpoints, one standard, vetted`, other: "Wire and vet each tool yourself" },
  { dim: "Memory", tip: "Where your memory lives and travels", unclick: "Managed cloud or BYOD, across every client", other: "Per-runtime, assembled from plugins" },
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

const Why = () => {
  useCanonical("/why");
  useMetaTags({
    title: "Why UnClick - the layer your AI plugs into",
    description:
      `${SITE_STATS.ENDPOINTS_DISPLAY} callable endpoints, persistent memory, signed permissions, and built-in proof, in one install. An honest look at where UnClick beats wiring up a self-hosted agent, and where those agents still lead.`,
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
          UnClick is the layer your AI plugs into: tools that behave, a memory
          that stays yours, signed permissions, and built-in proof, across every
          assistant and device you use.
        </>
      }
      cta={{ label: "See the difference", href: "#compare" }}
    >
      {/* The big picture: the hard way vs UnClick */}
      <section id="compare" className="px-6 pb-0 -mt-8 sm:-mt-10">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <ExpandableImage
              src="/whyunclick_web2.jpg"
              alt="The hard way: a tangled mess of MCP plugins, API keys, and a memory plugin you host and secure yourself, burning tokens, with context that does not travel. UnClick: one MCP install giving apps, memory, connections, and permissions with proof, on one subscription, with the same shared context across Claude, ChatGPT, Copilot, and Cursor."
            />
          </FadeIn>
        </div>
      </section>

      {/* Six plain reasons */}
      <section className={presets.section}>
        <div className={presets.sectionInner}>
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>The whole working layer.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                Not one more thing to call. Tools that behave, a memory that
                travels, permissions and proof, in one calm subscription.
              </p>
            </FadeIn>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((reason, i) => (
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
      </section>

      {/* Honest comparison: where UnClick is the easier choice */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-4xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>UnClick vs a self-hosted agent.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                Self-hosted agents are powerful, and a different shape. Here is
                where UnClick is the easier, calmer choice.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-12 overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-card/80">
                    <th className="p-3 text-left font-medium text-muted-foreground" />
                    <th className="p-3 text-left font-semibold text-primary">UnClick</th>
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
              <h2 className={presets.h2}>Where self-hosted agents lead.</h2>
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
                  <p className="mt-2 text-sm text-body leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={presets.section}>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>Give your AI the layer it has been missing.</h2>
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
