import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GlassCard, IconChip } from "@/components/brand";
import { presets } from "@/lib/design-system";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { BROCHURE, type BrochureSlug } from "@/data/brochure";

/**
 * Shared layout for the public product "brochure" pages. Visual-first and
 * low-text by design: eyebrow, gradient headline, one short lede, an
 * icon-chip feature grid, and a single primary call to action. Renders on the
 * navy aurora canvas (transparent page shell).
 */
const BrochurePage = ({ slug }: { slug: BrochureSlug }) => {
  const page = BROCHURE[slug];

  useCanonical(page.path);
  useMetaTags({
    title: page.meta.title,
    description: page.meta.description,
    ogTitle: page.meta.title,
    ogDescription: page.meta.description,
    ogUrl: `https://unclick.world${page.path}`,
  });

  return (
    <div className={presets.page}>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative px-6 pt-28 pb-16 sm:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>{page.eyebrow}</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-heading sm:text-5xl md:text-6xl">
                {page.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
                {page.lede}
              </p>
            </FadeIn>
            {(page.primaryCta || page.secondaryCta) && (
              <FadeIn delay={0.15}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  {page.primaryCta && (
                    <a
                      href={page.primaryCta.href}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                    >
                      {page.primaryCta.label}
                    </a>
                  )}
                  {page.secondaryCta && (
                    <Link
                      to={page.secondaryCta.href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#86dadd]/20 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-white/[0.07]"
                    >
                      {page.secondaryCta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* Optional showcase (e.g. a visual demo) between hero and features */}
        {page.showcase && (
          <section className="px-6 pb-6">
            <div className="mx-auto max-w-5xl">{page.showcase}</div>
          </section>
        )}

        {/* Numbered steps (e.g. Autopilot) or feature grid */}
        {(page.steps || page.features) && (
          <section className="px-6 pb-28">
            <div className="mx-auto max-w-5xl">
              {page.featuresTitle && (
                <FadeIn>
                  <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                    {page.featuresTitle}
                  </h2>
                </FadeIn>
              )}
              {page.steps ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {page.steps.map((s, i) => (
                    <FadeIn key={s.title} delay={0.03 * i}>
                      <div className="flex h-full gap-4 rounded-xl border border-[#86dadd]/12 bg-white/[0.03] p-4 backdrop-blur-sm">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-sm font-bold text-primary">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-heading">{s.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-body">{s.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {page.features?.map((f, i) => (
                    <FadeIn key={f.title} delay={0.04 * i}>
                      <GlassCard className="h-full">
                        <IconChip>
                          <f.icon className="h-5 w-5" />
                        </IconChip>
                        <h3 className="mt-4 text-base font-semibold text-heading">{f.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-body">{f.desc}</p>
                      </GlassCard>
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Optional tail showcase (e.g. the sample Jobs board) */}
        {page.tail && (
          <section className="px-6 pb-28">
            <div className="mx-auto max-w-5xl">
              <FadeIn>
                <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                  Your work, on one board.
                </h2>
              </FadeIn>
              <FadeIn delay={0.05}>{page.tail}</FadeIn>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BrochurePage;
