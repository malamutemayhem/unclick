import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import { useCanonical } from "../hooks/use-canonical";
import {
  ArrowRight,
  Zap,
  Users,
  GitBranch,
  BarChart3,
  Check,
  AlertCircle,
  Briefcase,
} from "lucide-react";

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
    desc: "XPass checks can review the work from the right angle, including TestPass, UXPass, SecurityPass, CopyPass, LegalPass, and SlopPass.",
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
    title: "Specialist hats work in parallel, peer-review each other, and share only the useful memory",
    icon: Users,
  },
  {
    step: "Prove",
    title: "The Captain synthesises the answer, and XPass receipts show which checks actually ran",
    icon: Zap,
  },
];

const STARTER_TEMPLATES = [
  "Business Council",
  "Launch Stress Test",
  "Creative Studio",
  "Decision Desk",
];

const COMPARISON = [
  {
    feature: "MCP native",
    unclick: <Check className="h-4 w-4 text-primary" />,
    crewai: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    autogen: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    langgraph: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
  },
  {
    feature: "Real tools (not mocked)",
    unclick: <Check className="h-4 w-4 text-primary" />,
    crewai: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    autogen: <Check className="h-4 w-4 text-primary" />,
    langgraph: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
  },
  {
    feature: "Persistent memory",
    unclick: <Check className="h-4 w-4 text-primary" />,
    crewai: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    autogen: <Check className="h-4 w-4 text-primary" />,
    langgraph: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
  },
  {
    feature: "Passport access",
    unclick: <Check className="h-4 w-4 text-primary" />,
    crewai: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    autogen: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    langgraph: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
  },
  {
    feature: "Self-hosted",
    unclick: <Check className="h-4 w-4 text-primary" />,
    crewai: <Check className="h-4 w-4 text-primary" />,
    autogen: <Check className="h-4 w-4 text-primary" />,
    langgraph: <Check className="h-4 w-4 text-primary" />,
  },
  {
    feature: "Production ready",
    unclick: <Check className="h-4 w-4 text-primary" />,
    crewai: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    autogen: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    langgraph: <Check className="h-4 w-4 text-primary" />,
  },
];

const Crews = () => {
  useCanonical("/crews");

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden px-6">
        <div className="pointer-events-none absolute inset-0 animated-grid opacity-40" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-xs font-medium text-primary">Private Alpha</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              The multi-agent platform that{" "}
              <span className="text-primary">doesn't require a developer.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-4 text-lg text-body max-w-2xl mx-auto leading-relaxed">
              UnClick Crews gives a Captain and specialist hats the right Memory, MCP tools, and Passport access for a job.
              Crews coordinate the thinking. XPass checks the work. Together they turn multi-agent AI into a visible,
              reviewable workflow.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/admin/crews"
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open Crews
              </Link>
              <Link
                to="/dogfood"
                className="rounded-lg border border-border/60 bg-card/40 px-6 py-2.5 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:bg-card/70"
              >
                View Dogfood Proof
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Single-agent AI hits a ceiling</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-lg text-body leading-relaxed">
              One agent cannot be an expert coder, researcher, writer, reviewer, and risk officer at once.
              Crews separates those jobs into explicit hats, then lets Memory carry the useful facts between them.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Meet Your Crew */}
      <section className="px-6 py-16 bg-card/30">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl mb-3">
              Meet your crew
            </h2>
            <p className="text-center text-body max-w-xl mx-auto">
              A Crew is a visible working group: a Captain, specialist hats, scoped tools, scoped credentials, and proof.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AGENT_PERSONAS.map((persona, i) => (
              <FadeIn key={persona.title} delay={0.05 * i}>
                <div className="group relative rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <persona.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-heading">{persona.title}</h3>
                  <p className="mt-2 text-xs text-body leading-relaxed">{persona.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How Crews Work */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl mb-3">
              How Crews work
            </h2>
            <p className="text-center text-body max-w-xl mx-auto">
              The live shape is Council first: clear task, independent opinions, peer review, then synthesis.
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

      {/* Powered By UnClick */}
      <section className="px-6 py-16 bg-card/30">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl mb-8">
              Powered by UnClick
            </h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn delay={0.05}>
              <div className="rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <GitBranch className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-heading">Tools</h3>
                </div>
                <p className="text-xs text-body leading-relaxed">
                  Each hat gets a curated tool set. Developer hats can receive repo tools, writer hats can receive content tools, and reviewers can receive XPass checks.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-heading">Memory</h3>
                </div>
                <p className="text-xs text-body leading-relaxed">
                  Shared memory carries useful facts across the crew, while private working memory keeps raw role chatter separate until it matters.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-heading">Passport</h3>
                </div>
                <p className="text-xs text-body leading-relaxed">
                  Passport access is scoped per hat. A security hat does not inherit a writer's CMS access, and a reviewer does not get broad deployment keys.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-heading">XPass Receipts</h3>
                </div>
                <p className="text-xs text-body leading-relaxed">
                  Crews is the coordination layer. XPass is the proof layer. A crew can ask for the right Pass checks before work is treated as ready.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Starter Templates */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl mb-3">
              Starter crews
            </h2>
            <p className="text-center text-body max-w-xl mx-auto">
              Start with a proven council pattern, then tune the hats, tools, memory, and Passport scopes.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STARTER_TEMPLATES.map((name, i) => (
              <FadeIn key={name} delay={0.05 * i}>
                <div className="rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-heading">{name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-body">
                    Built for repeatable decisions with clear roles, independent judgement, and a final synthesis.
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Built on Standards */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Not another framework. Just MCP.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-body max-w-xl mx-auto leading-relaxed">
              CrewAI builds abstractions. AutoGen builds frameworks. LangGraph builds graphs.
              UnClick Crews doesn't reinvent tooling - it uses the tools you already have through MCP.
              No new abstractions, no vendor lock-in. Your agents use the same tools a human would.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
              <p className="font-mono text-xs text-muted-foreground mb-3">The difference</p>
              <div className="grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <p className="font-semibold text-heading mb-2">CrewAI, AutoGen, LangGraph</p>
                  <ul className="space-y-1 text-body">
                    <li>- Code-first setup</li>
                    <li>- Custom abstraction layers</li>
                    <li>- Credential scoping left to the app</li>
                    <li>- Developer-owned runtime wiring</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-heading mb-2">UnClick Crews</p>
                  <ul className="space-y-1 text-body">
                    <li>- Visual crew and council surface</li>
                    <li>- Real MCP tools</li>
                    <li>- Passport-scoped access</li>
                    <li>- XPass proof receipts</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 py-16 bg-card/30">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl mb-8">
              How we compare
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-card/80">
                    <th className="p-3 text-left font-medium text-muted-foreground" />
                    <th className="p-3 text-left font-semibold text-primary">UnClick Crews</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">CrewAI</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">AutoGen</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">LangGraph</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-card/40" : ""}>
                      <td className="p-3 font-medium text-heading">{row.feature}</td>
                      <td className="p-3 flex justify-start">{row.unclick}</td>
                      <td className="p-3 flex justify-start">{row.crewai}</td>
                      <td className="p-3 flex justify-start">{row.autogen}</td>
                      <td className="p-3 flex justify-start">{row.langgraph}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Put the right hats in the room.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-3 text-body max-w-xl mx-auto">
              Define the crew, run the Council, and use XPass to prove the work before it ships.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/admin/crews"
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open Crews
              </Link>
              <Link
                to="/admin/checks"
                className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:bg-card/70"
              >
                View XPass <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Crews;
