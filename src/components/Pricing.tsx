import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const Pricing = () => (
  <section id="pricing" className="mx-auto max-w-3xl px-6 py-32">
    <FadeIn>
      <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
        Pricing
      </span>
    </FadeIn>
    <FadeIn delay={0.1}>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Free */}
        <motion.div
          className="glow-card rounded-xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-heading">Free</h3>
          <ul className="mt-6 space-y-3 text-sm text-body">
            <li>100 calls / day</li>
            <li>One tool</li>
          </ul>
          <motion.a
            href="#"
            className="mt-8 inline-block w-full rounded-lg border border-border py-2.5 text-center text-sm font-medium text-heading transition-colors hover:border-primary/40 hover:bg-secondary"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Start free
          </motion.a>
        </motion.div>
        {/* Pro */}
        <motion.div
          className="relative rounded-xl border border-primary/60 bg-card/50 p-8 backdrop-blur-sm overflow-hidden"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pointer-events-none absolute -top-16 -right-16 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
          <h3 className="text-2xl font-semibold text-heading">$19/mo</h3>
          <ul className="mt-6 space-y-3 text-sm text-body">
            <li>All tools</li>
            <li>5,000 calls / day</li>
            <li>Webhooks</li>
          </ul>
          <motion.a
            href="#"
            className="mt-8 inline-block w-full rounded-lg bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            whileHover={{ scale: 1.01, boxShadow: "0 0 30px 4px rgba(226,185,59,0.2)" }}
            whileTap={{ scale: 0.99 }}
          >
            Start building
          </motion.a>
        </motion.div>
      </div>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="mt-8 text-center text-sm text-muted-custom">
        Need more? <a href="#" className="text-body underline underline-offset-4 hover:text-heading transition-colors">Talk to us.</a>
      </p>
    </FadeIn>
  </section>
);

export default Pricing;
