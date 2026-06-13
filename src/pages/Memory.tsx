import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import ExpandableImage from "@/components/ExpandableImage";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";
import {
  Database,
  Shield,
  Search,
  Code,
  RefreshCw,
  Fingerprint,
  Briefcase,
  Library,
  History,
  Gauge,
} from "lucide-react";

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
  { title: "Data island", desc: "Use managed cloud for simple setup, or bring your own database when you need full control and exportability.", icon: Database },
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
    text: "\"Jason's birthday is 15 July\" to family",
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

const PROOF_POINTS = [
  {
    title: "Hybrid retrieval",
    desc: "Keyword search and pgvector semantic search are fused with reciprocal rank fusion, so recall is not just vector nearest-neighbor guessing.",
  },
  {
    title: "Source-linked memory",
    desc: "Memories can carry source references, receipt IDs, commit SHAs, PR numbers, extractor IDs, prompt versions, and model IDs where available.",
  },
  {
    title: "Typed workspace links",
    desc: "Memory can link to PRs, todos, commits, files, receipts, jobs, tools, URLs, and people, which makes it operational context, not just notes.",
  },
  {
    title: "Recall guardrails",
    desc: "Scope checks, quarantine, dedupe, supersession, forget behavior, decay, consolidation, and evaluation scenarios are part of the memory system.",
  },
];

const COMPARISON = [
  { feature: "Primary shape", tip: "What the product is optimized to be", unclick: "MCP workspace memory", mem0: "Dedicated memory engine", letta: "Agent runtime memory", zep: "Graph memory service" },
  { feature: "Retrieval signals", tip: "Signals used when memory is searched", unclick: "Keyword + pgvector + RRF", mem0: "Hybrid retrieval", letta: "Runtime state + archival search", zep: "Graph + search" },
  { feature: "Work context", tip: "Operational objects memory can attach to", unclick: "Tools, sessions, PRs, todos, files, receipts, code", mem0: "User and agent memories", letta: "Agent state and archival memory", zep: "Conversations and entity graph" },
  { feature: "Provenance", tip: "How memory explains where an answer came from", unclick: "Source refs and receipts", mem0: "History and metadata", letta: "Runtime state history", zep: "Temporal graph history" },
  { feature: "Data modes", tip: "Deployment and storage shapes", unclick: "Managed cloud or BYOD database", mem0: "Cloud and self-host options", letta: "Self-host and hosted options", zep: "Cloud and self-host options" },
  { feature: "Public proof", tip: "What an evaluator can read without account context", unclick: "Repo docs + eval harness + proof brief", mem0: "Public benchmarks and docs", letta: "Public docs and repo", zep: "Public docs and repo" },
  { feature: "Best fit", tip: "Where the product is strongest", unclick: "Tool-aware agent workspace", mem0: "Standalone memory layer", letta: "Persistent agents", zep: "Knowledge graph memory" },
];

const Memory = () => {
  useCanonical("/memory");
  useMetaTags({
    title: "Persistent memory for AI agents - UnClick",
    description:
      "Give your AI agent persistent memory across sessions: identity, business context, facts, library, sessions, code, recall, and data controls. Managed cloud or your own database.",
    ogTitle: "UnClick Memory - Persistent cross-session memory for AI agents",
    ogDescription:
      "Eight pillars of memory for AI agents: identity, business context, facts, sessions, code, and more. All cross-session.",
    ogUrl: "https://unclick.world/memory",
  });

  return (
    <PageShell
      eyebrow="Memory"
      title="Your agent forgets everything."
      accent="Fix that."
      lede={<>Drop-in persistent memory for any AI agent. Eight pillars, all searchable. Use managed cloud for simple setup, or bring <span className="whitespace-nowrap">your database.</span></>}
      cta={{ label: "See how it works", href: "#how-it-works" }}
    >
      {/* Infographic: the eight pillars at a glance, high on the page */}
      <section className="px-6 pb-0 -mt-8 sm:-mt-10">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <ExpandableImage
              src="/memory_web.jpg"
              alt="UnClick Memory: eight pillars around a secure brain - Identity, Business context, Facts, Library and briefs, Session continuity, Code memory, Recall and hygiene, and your own data island."
            />
          </FadeIn>
        </div>
      </section>

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
                  Visible to you. Source-linked where available. Exportable by design.
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Eight pillars */}
      <section id="how-it-works" className={presets.section}>
        <div className={presets.sectionInner}>
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Eight pillars of memory.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                From always-on identity to on-demand code. Each pillar does a
                different job, and all of it is searchable.
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

      {/* Data controls */}
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className={presets.h2}>Your data. Your choice.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-body leading-relaxed">
              Start with managed UnClick Memory when you want the fastest path.
              Bring your own Supabase database when you need direct database
              control, exportability, and stricter data boundaries.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-4 py-2 backdrop-blur-sm">
              <Database className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-body">
                Managed cloud or BYOD. Same memory rail across MCP clients.
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Proof */}
      <section className={presets.section + " bg-card/30"}>
        <div className={presets.sectionInner}>
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>Memory proof, not just claims.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                UnClick Memory has a public evidence packet for humans, crawlers,
                and AI answer engines. It shows the system shape, the repo
                evidence, and the claims we will not make without benchmarks.
              </p>
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {PROOF_POINTS.map((point, i) => (
              <FadeIn key={point.title} delay={0.05 * i}>
                <div className={presets.tile}>
                  <h3 className={presets.h3}>{point.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="/ai-memory.md" className={presets.ctaGhost}>
                Read the AI memory brief
              </a>
              <a
                href="https://github.com/malamutemayhem/unclick/tree/main/packages/mcp-server/src/memory"
                className={presets.ctaGhost}
              >
                Inspect the memory code
              </a>
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
                title: "Choose your memory mode",
                desc: "Managed cloud for speed, or BYOD Supabase for direct database control.",
              },
              {
                step: 2,
                title: "Connect the MCP server",
                desc: "Add UnClick to the agent client you already use.",
              },
              {
                step: 3,
                title: "Let sessions write receipts",
                desc: "Facts, summaries, source refs, and open loops start carrying across sessions.",
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
              Migration and import flows depend on the source system and account mode.
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
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-body leading-relaxed">
                This is positioning, not a benchmark claim. Mem0 currently has
                the stronger public benchmark narrative. UnClick is strongest
                when memory needs tool context, receipts, source links, code,
                and scoped agent coordination.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
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
