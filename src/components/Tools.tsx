import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const tools = [
  { name: "Links", replaces: "Linktree" },
  { name: "Schedule", replaces: "Calendly" },
  { name: "Forms", replaces: "Typeform" },
  { name: "Mail", replaces: "Beehiiv" },
  { name: "Post", replaces: "Buffer" },
  { name: "Sign", replaces: "DocuSign" },
];

const Tools = () => (
  <section id="tools" className="mx-auto max-w-3xl px-6 py-32">
    <FadeIn>
      <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
        The Suite
      </span>
    </FadeIn>
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {tools.map((tool, i) => (
        <FadeIn key={tool.name} delay={i * 0.08}>
          <motion.div
            className="glow-card flex items-baseline justify-between rounded-lg border border-border/50 bg-card/50 px-5 py-5 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-lg font-medium text-heading">{tool.name}</span>
            <span className="text-sm text-muted-custom">replaces {tool.replaces}</span>
          </motion.div>
        </FadeIn>
      ))}
    </div>
    <FadeIn delay={0.5}>
      <p className="mt-10 text-center text-sm text-muted-custom">
        One auth system. One API pattern. All tools.
      </p>
    </FadeIn>
  </section>
);

export default Tools;
