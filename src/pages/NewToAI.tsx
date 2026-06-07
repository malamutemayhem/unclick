import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import ExpandableImage from "@/components/ExpandableImage";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { presets } from "@/lib/design-system";
import {
  Wrench,
  Brain,
  Calendar,
  Users,
  Trophy,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Zap,
  Lock,
  ChevronRight,
} from "lucide-react";

/**
 * Features users meet first. Plain-English analogies. Apple-friendly voice.
 * The paused connection surface stays hidden during the current ringfence pass.
 */
const FEATURES = [
  {
    id: "tools",
    title: "Tools",
    subtitle: "The toolbox",
    icon: Wrench,
    analogy:
      "Like giving your assistant access to email, calendar, weather, news, and many other services. They can check the weather, search the web, look up stocks, and more, without you doing it manually.",
  },
  {
    id: "memory",
    title: "Memory",
    subtitle: "The filing cabinet",
    icon: Brain,
    analogy:
      "AI assistants normally forget everything between conversations. Memory is like giving them a notebook that carries over. They remember your preferences, past decisions, and ongoing projects.",
  },
  {
    id: "organiser",
    title: "Organiser",
    subtitle: "The day planner",
    icon: Calendar,
    analogy:
      "Your AI can see your calendar across Google, Outlook, and Apple. It can schedule meetings, create to-do lists, and give you a morning briefing, all from one place.",
  },
];

const EXAMPLES = [
  "Check my calendar and tell me what is happening tomorrow",
  "Find the cheapest flights to Sydney next month",
  "What is the weather like this weekend?",
  "Send an email to Sarah confirming our meeting",
  "What did we decide about the website redesign last week?",
  "Create a to-do list from my meeting notes",
];

const FAQ = [
  {
    q: "Do I need to know how to code?",
    a: "No. UnClick works through AI chat interfaces like Claude. You just talk normally.",
  },
  {
    q: "Is it free?",
    a: "Yes. The free plan gives you the full toolbox. Paid options will come later.",
  },
  {
    q: "What AI does it work with?",
    a: "UnClick works with Claude, and with any AI that supports MCP, a universal standard for AI tools.",
  },
  {
    q: "What is MCP?",
    a: "Model Context Protocol. Think of it as a universal adapter, like how USB-C lets you plug any charger into any phone. MCP lets any AI use any tool.",
  },
  {
    q: "Is it safe?",
    a: "Yes. Your data is processed in real time, not stored. Saved access details are encrypted. You control what your AI can access.",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "You talk to your AI",
    desc: "Just chat naturally. Ask it to check your schedule, send an email, or look something up.",
    icon: MessageSquare,
  },
  {
    step: 2,
    title: "AI uses UnClick tools",
    desc: "Behind the scenes, the AI uses UnClick to actually do the task, like a personal assistant making calls on your behalf.",
    icon: Zap,
  },
  {
    step: 3,
    title: "You get the result",
    desc: "The AI comes back with the answer, the meeting booked, the email sent. No switching between apps.",
    icon: CheckCircle2,
  },
];

const PRODUCTS = [
  {
    name: "Tools",
    desc: "Email, weather, finance, social media, and more.",
    link: "/tools",
    icon: Wrench,
  },
  {
    name: "Memory",
    desc: "Your AI remembers your preferences, decisions, and past conversations.",
    link: "/memory",
    icon: Brain,
  },
  {
    name: "Organiser",
    desc: "Calendar, to-dos, and daily briefings in one unified place.",
    link: "/organiser",
    icon: Calendar,
  },
  {
    name: "Crews",
    desc: "Teams of AI agents working together on complex projects.",
    link: "/crews",
    icon: Users,
  },
  {
    name: "Arena",
    desc: "Test and compare different AI models side by side.",
    link: "/arena",
    icon: Trophy,
  },
];

const NewToAI = () => {
  useCanonical("/new-to-ai");

  return (
    <PageShell
      eyebrow="Start here"
      title="AI that actually does things for you."
      lede="UnClick gives AI assistants the tools they need to help you. Like giving a new employee the keys to the office, a phone, and a filing cabinet."
      cta={{ label: "See what is possible", href: "#how" }}
    >
      {/* Overview infographic (tap to expand). Add the asset at public/intro-overview.png. */}
      <section className="px-6 pt-2">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <ExpandableImage
              src="/intro-overview.png"
              alt="How UnClick fits together: your private data island, development autopilot, connected apps, secure connections, the orchestrator, the AI memory engine, and your AI agent subscriptions across every device."
            />
          </FadeIn>
        </div>
      </section>

      {/* What is UnClick? */}
      <section id="how" className={presets.section}>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className={presets.h2}>What is UnClick?</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-body leading-relaxed max-w-2xl">
              Think of AI assistants like a very smart new hire on their first
              day. They are brilliant, but they cannot do much without access to
              your tools. UnClick is everything that new hire needs to be
              productive.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <FadeIn key={feature.id} delay={0.05 * i}>
                <div className="h-full rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={presets.tileIcon + " mb-0"}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className={presets.h3}>{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-relaxed">
                    {feature.analogy}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-4xl">
          <div className={presets.sectionHeader}>
            <FadeIn>
              <h2 className={presets.h2}>How does it actually work?</h2>
            </FadeIn>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <FadeIn key={item.step} delay={0.05 * i}>
                <div className="relative">
                  <div className="h-full rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-heading text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-body leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden sm:flex absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Real examples */}
      <section className={presets.section}>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className={presets.h2}>Real examples.</h2>
            <p className="mt-4 text-body">
              Here is what you can actually ask your AI to do with UnClick.
            </p>
          </FadeIn>

          <div className="mt-10 space-y-3">
            {EXAMPLES.map((example, i) => (
              <FadeIn key={example} delay={0.03 * i}>
                <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/40 p-4 backdrop-blur-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-body">{example}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>What about privacy?</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 rounded-xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <p className="text-body leading-relaxed">
                Your data stays yours. UnClick does not store your conversations,
                read your emails, or sell your information. The tools just pass
                information between you and the services you already use. Like a
                translator, not a spy.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section id="products" className={presets.section}>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className={presets.h2}>Products.</h2>
            <p className="mt-4 text-body">
              Choose what you need. They all work together.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PRODUCTS.map((product, i) => (
              <FadeIn key={product.name} delay={0.03 * i}>
                <Link
                  to={product.link}
                  className="group block h-full rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={presets.tileIcon + " mb-0"}>
                      <product.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 flex items-start justify-between gap-2">
                      <h3 className={presets.h3}>{product.name}</h3>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <p className="text-sm text-body leading-relaxed">
                    {product.desc}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={presets.section + " bg-card/30"}>
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className={presets.h2}>FAQ for beginners.</h2>
            <p className="mt-4 text-body">Common questions about UnClick.</p>
          </FadeIn>

          <div className="mt-10 space-y-4">
            {FAQ.map((item, i) => (
              <FadeIn key={item.q} delay={0.03 * i}>
                <div className="rounded-lg border border-border/40 bg-card/40 p-5 backdrop-blur-sm">
                  <h3 className="font-semibold text-heading text-sm mb-2">
                    {item.q}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - single button */}
      <section className={presets.section}>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>
              Ready to give your AI{" "}
              <span className="text-primary">superpowers?</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 flex justify-center">
              <Link to="/tools" className={presets.ctaPrimary}>
                Explore tools
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
};

export default NewToAI;
