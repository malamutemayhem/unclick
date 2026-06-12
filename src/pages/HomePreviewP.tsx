import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option P: the dock. The Mac dock everyone already loves, holding
 * your apps with UnClick at the center. Icons magnify near the
 * pointer exactly like the real thing. Apps are the entire story.
 */

const DOCK_APPS = [
  "Gmail", "Xero", "Slack", "GitHub", "Stripe",
  "UnClick",
  "Notion", "Calendar", "Shopify", "Spotify", "Figma",
];

function DockIcon({
  name,
  scale,
  isCenter,
}: {
  name: string;
  scale: number;
  isCenter: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center justify-end"
      style={{
        transform: `scale(${scale}) translateY(${(1 - scale) * 14}px)`,
        transformOrigin: "bottom center",
        transition: "transform 120ms ease-out",
      }}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl border text-[15px] font-extrabold sm:h-14 sm:w-14",
          isCenter
            ? "border-primary/70 bg-gradient-to-b from-primary/40 to-primary/[0.15] text-heading shadow-[0_0_34px_-6px_hsl(182_46%_57%/0.8)]"
            : "border-white/[0.14] bg-gradient-to-b from-[#11394c] to-[#082230] text-primary/90 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.8)]",
        )}
        aria-hidden="true"
      >
        {isCenter ? (
          <span className="text-[10px] font-extrabold uppercase tracking-tight">UC</span>
        ) : (
          name[0]
        )}
      </span>
      <span className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-muted-foreground/65">
        {name}
      </span>
    </div>
  );
}

function Dock() {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; width: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: e.clientX - rect.left, width: rect.width });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPointer(null)}
      className="mx-auto inline-flex max-w-full items-end gap-2.5 overflow-x-auto rounded-[1.8rem] border border-white/[0.12] bg-white/[0.05] px-5 pb-3 pt-4 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:gap-3.5 sm:px-7"
    >
      {DOCK_APPS.map((name, i) => {
        // Magnification: icons near the pointer grow, Mac style.
        let scale = 1;
        if (pointer) {
          const slot = pointer.width / DOCK_APPS.length;
          const center = slot * i + slot / 2;
          const dist = Math.abs(pointer.x - center);
          scale = Math.max(1, 1.5 - dist / 180);
        }
        return (
          <DockIcon key={name} name={name} scale={scale} isCenter={name === "UnClick"} />
        );
      })}
    </div>
  );
}

const HomePreviewP = () => {
  useCanonical("/home-preview-p");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Your AI's new dock. Every app you already use, one place, with UnClick at the center.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Your AI's new dock.",
    ogUrl: "https://unclick.world/home-preview-p",
  });

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground antialiased">
      <Navbar />
      <OptionRibbon active="p" />

      <main>
        <section className="relative flex min-h-[min(92svh,860px)] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                Your AI's new <GradientText>dock.</GradientText>
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mx-auto mt-6 max-w-md text-lg text-body [text-wrap:balance]">
                Every app it needs, one place, yours to{" "}allow.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-16">
                <Dock />
              </div>
            </FadeIn>

            <FadeIn delay={0.28}>
              <div className="mt-14 flex justify-center">
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Get started
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewP;
