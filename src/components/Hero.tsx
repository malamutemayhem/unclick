import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { Wrench, Brain, Calendar, Key, Users, Trophy, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    title: "Tools",
    description: "172+ MCP tools to act",
    href: "/tools",
    icon: Wrench,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Memory",
    description: "Persistent cross-session context",
    href: "/memory",
    icon: Brain,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Organiser",
    description: "Calendar, todos & bookings",
    href: "/organiser",
    icon: Calendar,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "BackstagePass",
    description: "Secure credential vault",
    href: "/backstagepass",
    icon: Key,
    color: "bg-red-500/10 text-red-500",
  },
  {
    title: "Crews",
    description: "Multi-agent orchestration",
    href: "/crews",
    icon: Users,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Arena",
    description: "Agent reputation system",
    href: "/arena",
    icon: Trophy,
    color: "bg-yellow-500/10 text-yellow-500",
  },
];

const Hero = () => {
  useCanonical("/");

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden px-6">
        {/* Animated grid background */}
        <div className="pointer-events-none absolute inset-0 animated-grid opacity-40" />

        {/* Gradient blur effect */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-xs font-medium text-primary">The Complete Stack</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl">
              The Operating System{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/70">
                for AI Agents
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-body max-w-2xl mx-auto leading-relaxed">
              Tools to act. Memory to remember. Organisation to plan. Credentials to authenticate. Teams to collaborate.
              Everything your AI agent needs in one platform.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/pricing"
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get Started Free
              </Link>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:bg-card/70"
              >
                Explore Products <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              The complete AI agent stack
            </h2>
            <p className="mt-3 text-center text-body max-w-2xl mx-auto">
              Six products that work together. Each solving a critical challenge in AI agent development.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <FadeIn key={product.title} delay={0.05 * i}>
                <Link
                  to={product.href}
                  className="group relative rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 hover:shadow-lg"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${product.color} mb-4`}>
                    <product.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-heading">{product.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">{product.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-card/30">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for AI agent developers
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "Act faster",
                description: "172+ pre-built MCP tools ready to use. No setup, no integrations.",
              },
              {
                title: "Remember everything",
                description: "Persistent cross-session memory that travels with your agent.",
              },
              {
                title: "Stay organized",
                description: "Calendar, todo lists, and booking management built-in.",
              },
              {
                title: "Keep secrets safe",
                description: "Encrypted credential vault for secure authentication.",
              },
              {
                title: "Scale with teams",
                description: "Multi-agent orchestration and team collaboration features.",
              },
              {
                title: "Build reputation",
                description: "Public Arena for agent reputation and problem-solving verification.",
              },
            ].map((feature, i) => (
              <FadeIn key={feature.title} delay={0.05 * i}>
                <div>
                  <h3 className="text-lg font-semibold text-heading">{feature.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to build with AI agents?
            </h2>
            <p className="mt-4 text-lg text-body max-w-xl mx-auto">
              Join developers building the next generation of AI applications with the only complete agent OS.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/pricing"
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start Free
              </Link>
              <Link
                to="/docs"
                className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:bg-card/70"
              >
                View Documentation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hero;
