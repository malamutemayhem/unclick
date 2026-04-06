import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeIn from "./FadeIn";

const lines = [
  { method: "POST", path: "/v1/schedule/events", status: "201 Created", time: "38ms" },
  { method: "POST", path: "/v1/links/pages", status: "201 Created", time: "41ms" },
  { method: "POST", path: "/v1/mail/send", status: "202 Accepted", time: "52ms" },
];

const TypewriterLine = ({ line, delay }: { line: typeof lines[0]; delay: number }) => {
  const full = `${line.method} ${line.path}`;
  const [chars, setChars] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setChars(i);
        if (i >= full.length) {
          clearInterval(interval);
          setTimeout(() => setShowResponse(true), 200);
        }
      }, 22);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [inView, delay, full.length]);

  return (
    <div ref={ref} className="flex flex-wrap gap-x-4 py-2 font-mono text-sm sm:text-base">
      <span className="text-primary/40">❯</span>
      <span className="text-heading">{full.slice(0, chars)}</span>
      {chars < full.length && chars > 0 && (
        <motion.span
          className="inline-block w-2 h-5 bg-primary/80"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
      {showResponse && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="ml-auto flex gap-2"
        >
          <span className="text-primary">→ {line.status}</span>
          <span className="text-muted-custom">({line.time})</span>
        </motion.span>
      )}
    </div>
  );
};

const CodeBlock = () => (
  <section className="mx-auto max-w-3xl px-6 py-32">
    <FadeIn>
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-[hsl(0_0%_6.5%)]">
        {/* Glow behind the card */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/[0.04] blur-[80px]" />
        
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/40 px-5 py-3">
          <div className="h-3 w-3 rounded-full bg-[hsl(0_70%_45%)]" />
          <div className="h-3 w-3 rounded-full bg-[hsl(44_70%_50%)]" />
          <div className="h-3 w-3 rounded-full bg-[hsl(140_50%_40%)]" />
          <span className="ml-3 font-mono text-xs text-muted-custom">unclick — terminal</span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="mb-4 font-mono text-xs text-muted-custom">
            $ unclick api --live
          </div>
          {lines.map((line, i) => (
            <TypewriterLine key={i} line={line} delay={i * 1400} />
          ))}
          {/* Blinking cursor at end */}
          <div className="mt-2 flex items-center gap-2 font-mono text-sm">
            <span className="text-primary/40">❯</span>
            <motion.span
              className="inline-block w-2 h-5 bg-primary/60"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 5 }}
            />
          </div>
        </div>
      </div>
    </FadeIn>
  </section>
);

export default CodeBlock;
