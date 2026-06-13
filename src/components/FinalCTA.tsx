import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

// The drifting aurora canvas is global (see SiteAurora), so this section stays
// clean: one headline, one line, one button. No competing local glow.
const FinalCTA = () => (
  <section className="relative overflow-hidden py-32">
    <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
      <FadeIn>
        <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl md:text-5xl">
          Let your AI stop pretending to be human.
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mx-auto mt-4 max-w-md text-body">
          Just your email. No credit card. Be one of the first to try it.
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <motion.a
          href="/docs"
          className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.5)] transition-shadow hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Get started free
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </motion.a>
      </FadeIn>
    </div>
  </section>
);

export default FinalCTA;
