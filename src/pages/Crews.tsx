import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import { GlassCard, IconChip, Pill } from "@/components/brand";
import { presets } from "@/lib/design-system";
import { useCanonical } from "@/hooks/use-canonical";
import { MOCK_AGENTS } from "@/data/mockAgents";
import {
  Zap,
  Users,
  GitBranch,
  BarChart3,
  Check,
  AlertCircle,
  Briefcase,
} from "lucide-react";

/**
 * Public Crews page (canon + truth rewrite, 2026-06-11).
 *
 * Leads with what is distinctive and true: a Captain, specialist hats, and
 * structured debate with receipts. No competitor names, no self-awarded
 * readiness marks that contradict the private alpha badge, and the advisor
 * count derives from the roster instead of being hand-typed.
 */

const ADVISOR_COUNT = MOCK_AGENTS.length;

const AGENT_PERSONAS = [
  {
    title: "Captain / Chairman",
    desc: "Owns the task, budget, and final synthesis. The Captain is a separate meta-member, so coordination never gets blurred with a specialist role.",
    icon: Briefcase,
  },
  {
    title: "Specialist Hats",
    desc: "Researcher, writer, developer, legal, security, UX, and strategy hats bring focused opinions with scoped tools, memory, and permissions.",
    icon: Users,
  },
  {
    title: "Tool Operators",
    desc: "Agents can receive only the MCP tools and Passport access their role needs. The crew uses real connected tools, not broad shared credentials.",
    icon: GitBranch,
  },
  {
    title: "Quality Reviewers",
    desc: "XPass checks can review the work from the right angle, including TestPass, UIPass, UXPass, SecurityPass, CopyPass, LegalPass, and SlopPass.",
    icon: Check,
  },
];

const HOW_CREWS_WORK = [
  {
    step: "Frame",
    title: "Choose a Council, launch stress test, creative studio, decision desk, or custom crew",
    icon: Briefcase,
  },
  {
    step: "Deliberate",
    title: "Specialist hats work in parallel, challenge your framing, disagree on the record, and peer-review each other",
    icon: Users,
  },
  {
    step: "Prove",
    title: "The Captain synthesises the answer, and XPass receipts show which checks actually ran",
    icon: Zap,
  },
];

const STARTER_TEMPLATES = [
  {
    name: "Business Council",
    desc: "CEO, CFO, CMO, CTO, and Creative Chief argue the business case before you commit.",
  },
  {
    name: "Launch Stress Test",
    desc: "A red team attacks the plan while a blue team defends it. Weaknesses surface early.",
  },
  {
    name: "Creative Studio",
    desc: "Creative Director, Copywriter, Art Director, and Brand Strategist shape the work.",
  },
  {
    name: "Decision Desk",
    desc: "First Principles, Pragmatist, Outsider, Executor, and a Chairman who makes the call.",
  },
];

const Crews = () => {
  useCanonical("/crews");

  return (
    <PageShell
      eyebrow="Crews, in private alpha"
      title="Put the right hats in the room"
      lede={`A Crew is a Captain and specialist hats drawn from a bench of ${ADVISOR_COUNT} advisors, each with real skills and a standing instruction to challenge you. They debate your question properly, disagree on the record, and the Captain owns the final answer.`}
      cta={{ label: "Open Crews", href: "/admin/crews" }}
    >
      {/* The problem */}
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>Single-agent AI hits a ceiling</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-lg leading-relaxed text-body">
              One agent cannot be an expert coder, researcher, writer, reviewer, and risk officer
              at once. Crews separates those jobs into explicit hats, then lets Memory carry the
              useful facts between them.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Meet your crew */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className={`text-center ${presets.h2}`}>Meet your crew</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-body">
              A Crew is a visible working group: a Captain, specialist hats, scoped tools, scoped
              credentials, and proof.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AGENT_PERSONAS.map((persona, i) => (
              <FadeIn key={persona.title} delay={0.05 * i}>
                <GlassCard className="h-full">
                  <IconChip className="mb-4">
                    <persona.icon className="h-5 w-5" />
                  </IconChip>
                  <h3 className="text-sm font-semibold text-heading">{persona.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-body">{persona.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How Crews work */}
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className={`text-center ${presets.h2}`}>How Crews work</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-body">
              The live shape is Council first: clear task, independent opinions, peer review, then
              synthesis.
            </p>
          </FadeIn>

          <div className="mt-12 space-y-6">
            {HOW_CREWS_WORK.map((stage, i) => (
              <FadeIn key={stage.step} delay={0.05 * i}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    <stage.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-heading">{stage.step}</h3>
                    <p className="mt-1 text-xs text-body">{stage.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Powered by UnClick */}
      <section className={presets.section}>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className={`mb-8 text-center ${presets.h2}`}>Powered by UnClick</h2>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-2">
            <FadeIn delay={0.05}>
              <GlassCard className="h-full">
                <div className="mb-3 flex items-center gap-3">
                  <GitBranch className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-heading">Tools</h3>
                </div>
                <p className="text-xs leading-relaxed text-body">
                  Each hat gets a curated tool set. Developer hats can receive repo tools, writer
                  hats can receive content tools, and reviewers can receive XPass checks.
                </p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.1}>
              <GlassCard className="h-full">
                <div className="mb-3 flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-heading">Memory</h3>
                </div>
                <p className="text-xs leading-relaxed text-body">
                  Shared memory carries useful facts across the crew, while private working memory
                  keeps raw role chatter separate until it matters.
                </p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.15}>
              <GlassCard className="h-full">
                <div className="mb-3 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-heading">Passport</h3>
                </div>
                <p className="text-xs leading-relaxed text-body">
                  Passport access is scoped per hat. A security hat does not inherit a writer's CMS
                  access, and a reviewer does not get broad deployment keys.
                </p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <GlassCard className="h-full">
                <div className="mb-3 flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-heading">XPass Receipts</h3>
                </div>
                <p className="text-xs leading-relaxed text-body">
                  Crews is the coordination layer. XPass is the proof layer. A crew can ask for the
                  right Pass checks before work is treated as ready.
                </p>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Starter crews */}
      <section className={presets.section}>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className={`text-center ${presets.h2}`}>Starter crews</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-body">
              Start with a proven council pattern, then tune the hats, tools, memory, and Passport
              scopes.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {STARTER_TEMPLATES.map((tpl, i) => (
              <FadeIn key={tpl.name} delay={0.05 * i}>
                <GlassCard className="h-full p-5">
                  <p className="text-sm font-semibold text-heading">{tpl.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-body">{tpl.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Built on standards */}
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>Not another framework. Just MCP.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-body">
              Most multi-agent stacks ask you to write code against their abstractions. UnClick
              Crews uses the tools you already have through MCP. No new abstractions, no vendor
              lock-in. Your agents use the same tools a human would.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlassCard className="mt-8 text-left">
              <p className="mb-3 font-mono text-xs text-muted-foreground">The difference</p>
              <div className="grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <p className="mb-2 font-semibold text-heading">Code-first frameworks</p>
                  <ul className="space-y-1 text-body">
                    <li>- Code-first setup</li>
                    <li>- Custom abstraction layers</li>
                    <li>- Credential scoping left to the app</li>
                    <li>- Developer-owned runtime wiring</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-2 font-semibold text-heading">UnClick Crews</p>
                  <ul className="space-y-1 text-body">
                    <li>- Visual crew and council surface</li>
                    <li>- Real MCP tools</li>
                    <li>- Passport-scoped access</li>
                    <li>- XPass proof receipts</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-32 pt-4">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Pill>Private alpha</Pill>
            <h2 className={`mt-5 ${presets.h2}`}>Run your first Council</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-3 max-w-xl text-body">
              Define the crew, run the Council, and use XPass to prove the work before it ships.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex justify-center">
              <Link to="/admin/crews" className={presets.ctaPrimary}>
                Open Crews
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
};

export default Crews;
