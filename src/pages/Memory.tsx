import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";
import {
  Brain,
  Database,
  Shield,
  Clock,
  Search,
  Code,
  Layers,
  Zap,
  RefreshCw,
} from "lucide-react";

/**
 * The six layers of memory. Plain English. Sentence case.
 * Original copy used jargon (atomic facts, supersede). Replaced with
 * what the layer actually does for the user.
 */
const MEMORY_LAYERS = [
  {
    num: 1,
    title: "Business context",
    desc: "Standing rules, clients, preferences. Always loaded. Tiny footprint. The stuff that never changes.",
    icon: Zap,
  },
  {
    num: 2,
    title: "Knowledge library",
    desc: "Versioned reference documents. Vendor profiles, CVs, client briefs, specs. Full history kept automatically.",
    icon: Layers,
  },
  {
    num: 3,
    title: "Session summaries",
    desc: "One summary per session. Decisions, open loops, key topics. New sessions read the last five to pick up where you left off.",
    icon: Clock,
  },
  {
    num: 4,
    title: "Searchable facts",
    desc: "Conversations distilled into individual facts overnight. When a fact updates, the old version is kept, never lost.",
    icon: Search,
  },
  {
    num: 5,
    title: "Conversation log",
    desc: "Full verbatim history, searchable by keyword. Every exchange timestamped. Code stored separately to keep it lean.",
    icon: Brain,
  },
  {
    num: 6,
    title: "Code dumps",
    desc: "Code stored separately, expanded on demand. Language-tagged, filename-tagged, searchable. Only loaded when needed.",
    icon: Code,
  },
];

/**
 * The transparency layer. A calm, plausible feed of capture events so
 * the user can feel memory working. Static for now. Phase 3 wires it
 * to a real reader of recent memory writes.
 */
const CAPTURE_FEED = [
  {
    time: "2:14 PM",
    tag: "Saved fact",
    text: "Client prefers Tuesday morning calls",
  },
  {
    time: "2:14 PM",
    tag: "Updated context",
    text: "Project: Q4 launch brief",
  },
  {
    time: "2:15 PM",
    tag: "Linked",
    text: "\"Kate's birthday is 15 July\" to family",
  },
  {
    time: "2:31 PM",
    tag: "Session summary",
    text: "8 decisions captured, 3 open loops",
  },
  {
    time: "2:47 PM",
    tag: "Referenced",
    text: "\"Use plain English in client emails\" (12 times this week)",
  },
  {
    time: "3:02 PM",
    tag: "Library updated",
    text: "Onboarding checklist v3 saved",
  },
];

const COMPARISON = [
  { feature: "Where data lives", tip: "Who controls your memory data", unclick: "Your database", mem0: "Their cloud", letta: "Their runtime", zep: "Their cloud" },
  { feature: "Memory layers", tip: "How memory is structured and organised", unclick: "Six layers", mem0: "Flat store", letta: "Three tiers", zep: "Three subgraphs" },
  { feature: "Code aware", tip: "Stores and searches code blocks separately", unclick: "Yes", mem0: "No", letta: "Partial", zep: "No" },
  { feature: "Version history", tip: "Previous versions of documents are preserved", unclick: "Yes", mem0: "No", letta: "No", zep: "No" },
  { feature: "Smart prioritisation", tip: "Used memories surface first; stale ones fade to save context", unclick: "Yes", mem0: "Yes", letta: "No", zep: "No" },
  { feature: "Cross platform", tip: "Works across Claude Code, Cowork, Cursor, and other MCP-compatible clients", unclick: "Yes", mem0: "Yes", letta: "Limited", zep: "Yes" },
  { feature: "Price", tip: "Starting cost for production use", unclick: "Free", mem0: "$249/mo", letta: "Free self-host", zep: "Pay per credit" },
  { feature: "Lock in", tip: "How hard it is to leave and take your data with you", unclick: "Zero", mem0: "High", letta: "Medium", zep: "Medium" },
];

const Memory = () => {
  useCanonical("/memory");
  useMetaTags({
    title: "Persistent memory for AI agents - UnClick",
    description:
      "Give your AI agent a six-layer memory. Business context, facts, sessions, code, library docs, and conversations. Cross-session, cross-agent, stored in your own database.",
    ogTitle: "UnClick Memory - Persistent cross-session memory for AI agents",
    ogDescription:
      "Six layers of memory for AI agents. Business context, facts, sessions, and more. All cross-session.",
    ogUrl: "https://unclick.world/memory",
  });

  return (
    <PageShell
      eyebrow="Memory"
      title="Your agent forgets everything."
      accent="Fix that."
      lede="Drop-in persistent memory for any AI agent. Six layers. Your data stays in your database."
      cta={{ label: "See how it works", href: "#how-it-works" }}
    >
      {/* The problem */}
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>The problem</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-body leading-relaxed">
              Every AI session starts from zero. You re-explain your business,
              your preferences, your clients, your rules. Every time.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 text-body leading-relaxed">
              Your agent made 200 decisions last week. How many does it remember?{" "}
              <span className="font-semibold text-heading">Zero.</span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Watch memory at work - the transparency layer */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-3xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Watch memory at work.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                You can see what memory is capturing as it happens. Nothing
                hidden. Nothing magic. Just a calm feed of what was learned,
                linked, and saved.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-12 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden">
              {/* Header strip */}
              <div className="flex items-center justify-between border-b border-border/40 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-primary animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-muted-foreground">
                    Capture feed
                  </span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  Today
                </span>
              </div>

              {/* The feed */}
              <ul className="divide-y divide-border/30">
                {CAPTURE_FEED.map((row, i) => (
                  <FadeIn key={i} delay={0.2 + i * 0.06}>
                    <li className="grid grid-cols-[auto_auto_1fr] items-baseline gap-x-4 px-5 py-3">
                      <span className="font-mono text-xs text-primary">
                        {row.time}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {row.tag}
                      </span>
                      <span className="text-sm text-body leading-snug">
                        {row.text}
                      </span>
                    </li>
                  </FadeIn>
                ))}
              </ul>

              {/* Footer note */}
              <div className="border-t border-border/40 px-5 py-3">
                <span className="font-mono text-xs text-muted-foreground">
                  Visible to you. Stored in your database. Never sent home.
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Six layers */}
      <section id="how-it-works" className={presets.section}>
        <div className={presets.sectionInner}>
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Six layers of memory.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                From always-on business context to on-demand code dumps. Each
                layer serves a different purpose. All searchable.
              </p>
            </FadeIn>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MEMORY_LAYERS.map((layer, i) => (
              <FadeIn key={layer.num} delay={0.05 * i}>
                <div className="group relative h-full rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={presets.tileIcon + " mb-0 h-9 w-9"}>
                      <layer.icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      Layer {layer.num}
                    </span>
                  </div>
                  <h3 className={presets.h3}>{layer.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Works everywhere */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-3xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>
                Works everywhere. Remembers everything.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                Start a task in Cowork on your desktop. Continue in Claude Code
                on your laptop. Pick up on mobile. Memory travels with you.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {["Cowork", "Claude Code", "Cursor", "Any MCP client"].map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-4 py-2 backdrop-blur-sm"
                >
                  <RefreshCw className="h-3 w-3 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
              <p className="font-mono text-xs text-muted-foreground mb-2">
                The handoff problem, solved.
              </p>
              <p className="text-sm text-body leading-relaxed">
                Claude Code sessions don't talk to each other. Cowork sessions
                don't persist. We fix that. Every session reads from and writes
                to the same memory. Context is never lost.
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

      {/* Setup */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-3xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Set up in three minutes.</h2>
            </FadeIn>
          </div>

          <div className="mt-12 space-y-6">
            {[
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
            ].map((s, i) => (
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
            <div className="mt-10 rounded-xl border border-border/60 bg-card/60 p-5 overflow-x-auto">
              <div className="font-mono text-xs text-muted-foreground mb-2">
                ~/.claude/mcp.json
              </div>
              <pre className="font-mono text-xs text-heading leading-relaxed">{`{
  "mcpServers": {
    "unclick-memory": {
      "command": "npx",
      "args": ["-y", "@unclick/memory-mcp"],
      "env": {
        "UNCLICK_API_KEY": "um_live_xxxxxxxxxxxx"
      }
    }
  }
}`}</pre>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Coming from another memory tool? Import in one click.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Comparison */}
      <section className={presets.section}>
        <div className="mx-auto max-w-4xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>How we compare.</h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-12 overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-card/80">
                    <th className="p-3 text-left font-medium text-muted-foreground" />
                    <th className="p-3 text-left font-semibold text-primary">
                      UnClick Memory
                    </th>
                    <th className="p-3 text-left font-medium text-muted-foreground">
                      Mem0
                    </th>
                    <th className="p-3 text-left font-medium text-muted-foreground">
                      Letta
                    </th>
                    <th className="p-3 text-left font-medium text-muted-foreground">
                      Zep
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? "bg-card/40" : ""}
                    >
                      <td className="p-3 font-medium text-heading group relative cursor-help">
                        <span className="border-b border-dotted border-muted-foreground/40">
                          {row.feature}
                        </span>
                        <span className="pointer-events-none absolute left-3 -top-8 z-10 hidden w-56 rounded-lg border border-border/60 bg-card px-3 py-2 text-[10px] text-muted-foreground shadow-lg group-hover:block">
                          {row.tip}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-primary">
                        {row.unclick}
                      </td>
                      <td className="p-3 text-body">{row.mem0}</td>
                      <td className="p-3 text-body">{row.letta}</td>
                      <td className="p-3 text-body">{row.zep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA - single button only */}
      <section className={presets.section}>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>
              Your agent deserves better than starting from scratch every session.
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
