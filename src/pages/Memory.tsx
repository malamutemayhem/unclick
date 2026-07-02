import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import {
  AiTetherDiagram,
  InBuildTeamCard,
  SessionSplit,
  SharedBoardCard,
} from "@/components/home/second-session";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";
import {
  Database,
  Shield,
  Search,
  Code,
  Fingerprint,
  Briefcase,
  Library,
  History,
  Gauge,
} from "lucide-react";

/**
 * The Memory page, rebuilt around the second-session concept (option
 * S) after the operator picked it over the old pillar-first layout
 * (2026-07-02). The narrative leads: day one against day two, tell it
 * once, switch AIs and keep it, then the team act. The load-bearing
 * product sections stay: the eight pillars, the data island, and the
 * setup path.
 */

/**
 * The eight pillars of memory, matching the product map. Plain English,
 * sentence case. Each pillar is a different job the memory does for you.
 */
const MEMORY_PILLARS = [
  { title: "Identity", desc: "Who you are and your standing rules. Always loaded, tiny footprint, the part that never changes.", icon: Fingerprint },
  { title: "Business context", desc: "Your clients, projects, and preferences, so every session starts already knowing your world.", icon: Briefcase },
  { title: "Facts", desc: "Conversations distilled into single facts. When a fact changes, the old version is kept, never lost.", icon: Search },
  { title: "Library and briefs", desc: "Versioned reference docs: vendor profiles, CVs, client briefs, specs. Full history kept automatically.", icon: Library },
  { title: "Session continuity", desc: "One summary per session: decisions, open loops, key topics. New sessions read the last few and carry on.", icon: History },
  { title: "Code memory", desc: "Code stored on its own and expanded on demand. Language and file tagged, searchable, loaded only when needed.", icon: Code },
  { title: "Recall and hygiene", desc: "Used memories surface first and stale ones fade to save context. Everything stays searchable by keyword.", icon: Gauge },
  { title: "Data island", desc: "It all lives in your own database. We never see it, and if you leave, your data stays yours.", icon: Database },
];

const SETUP_STEPS = [
  {
    step: 1,
    title: "Connect your database",
    desc: "Supabase free tier, or any PostgreSQL.",
  },
  {
    step: 2,
    title: "Run one migration",
    desc: "We do it for you. One click.",
  },
  {
    step: 3,
    title: "Add one line to your MCP config",
    desc: "That is it. Every session now has memory.",
  },
];

const Memory = () => {
  useCanonical("/memory");
  useMetaTags({
    title: "One memory for every AI you use - UnClick Memory",
    description:
      "Persistent cross-session memory for AI agents. Tell it once: ChatGPT, Claude, Cursor, and your local model read the same identity, facts, and session history, stored in your own database.",
    ogTitle: "UnClick Memory - One memory for every AI you use",
    ogDescription:
      "Tell it once. Every AI knows. Eight pillars of persistent memory, cross-session and cross-agent, in your own database.",
    ogUrl: "https://unclick.world/memory",
  });

  return (
    <PageShell
      eyebrow="Memory"
      title="One memory."
      accent="Every AI you use."
      lede={
        <>
          Your AI forgets you the moment a session ends. UnClick memory is the layer it plugs
          into: tell it once, and every AI you open next{" "}
          <span className="whitespace-nowrap">already knows.</span>
        </>
      }
      cta={{ label: "Set up memory", href: "/memory/setup" }}
    >
      {/* Day one against day two, high on the page */}
      <section className="px-6 pb-0 -mt-6 sm:-mt-8">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <SessionSplit />
          </FadeIn>
        </div>
      </section>

      {/* Eight pillars */}
      <section id="how-it-works" className={presets.section}>
        <div className={presets.sectionInner}>
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Tell it once.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                Eight pillars, each doing a different job, from always-on identity to on-demand
                code. All of it searchable, all of it carried between sessions.
              </p>
            </FadeIn>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MEMORY_PILLARS.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={0.05 * i}>
                <div className="group relative h-full rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80">
                  <div className={presets.tileIcon + " mb-4 h-9 w-9"}>
                    <pillar.icon className="h-4 w-4" />
                  </div>
                  <h3 className={presets.h3}>{pillar.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Portability */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-3xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Switch AIs. Your memory comes with you.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                UnClick is not another assistant. Any compatible AI plugs in and reads the same
                memory. Change models, change tools, change your mind. Nothing resets.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <AiTetherDiagram className="mt-12" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
              <p className="font-mono text-xs text-muted-foreground mb-2">
                The handoff problem, solved.
              </p>
              <p className="text-sm text-body leading-relaxed">
                Sessions don't talk to each other. Desktop doesn't talk to laptop. We fix that.
                Every session reads from and writes to the same memory, so context is never lost
                between tools, devices, or models.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Your data, your database */}
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className={presets.h2}>Your data. Your database.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-body leading-relaxed">
              UnClick Memory stores everything in your own Supabase instance.
              We never see your data. If you leave, your data stays. It is
              already yours.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-4 py-2 backdrop-blur-sm">
              <Database className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-body">
                Others store your memories in their cloud. We store them in yours.
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The team act */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-5xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Every AI on the job, on the same page.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                Run more than one AI? They already share the memory. They also share a board:
                updates, handoffs, and ideas land in one place, whoever's seat posted them.
              </p>
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
            <FadeIn delay={0.1}>
              <SharedBoardCard />
            </FadeIn>
            <FadeIn delay={0.18}>
              <InBuildTeamCard />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Set up in three minutes.</h2>
            </FadeIn>
          </div>

          <div className="mt-12 space-y-6">
            {SETUP_STEPS.map((s, i) => (
              <FadeIn key={s.step} delay={0.05 * i}>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {s.step}
                  </div>
                  <div>
                    <h3 className={presets.h3}>{s.title}</h3>
                    <p className="mt-1 text-sm text-body">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Coming from another memory tool? Import in one click.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA - single button only */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>
              Tell it once. <span className="text-primary">Every AI knows.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 flex justify-center">
              <Link to="/memory/setup" className={presets.ctaPrimary}>
                Set up memory
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
};

export default Memory;
