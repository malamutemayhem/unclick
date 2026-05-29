import { ReactNode } from "react";
import FadeIn from "@/components/FadeIn";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { presets } from "@/lib/design-system";

interface PageShellProps {
  /** Eyebrow pill above the headline. Optional. Sentence case. */
  eyebrow?: string;
  /** Big headline. Sentence case. Required for the hero variant. */
  title?: string;
  /** Optional accent word inside the headline, highlighted in primary. */
  accent?: string;
  /** Where the accent slots in. `before` puts the accent first, `after` keeps it inside the title. */
  accentPosition?: "before" | "after";
  /** One supporting line. Keep it short. */
  lede?: string;
  /** The single primary call to action. */
  cta?: {
    label: string;
    href: string;
  };
  /** Show the soft primary halo above the hero. Default true. */
  halo?: boolean;
  /** Render Navbar at the top. Default true. */
  withNav?: boolean;
  /** Render Footer at the bottom. Default true. */
  withFooter?: boolean;
  /** Page body. */
  children?: ReactNode;
}

/**
 * The canonical page primitive for UnClick.
 *
 * One eyebrow, one headline, one supporting line, one CTA, one halo. Then content.
 * Apple-inspired restraint baked in so every marketing page composes the same way.
 */
const PageShell = ({
  eyebrow,
  title,
  accent,
  accentPosition = "after",
  lede,
  cta,
  halo = true,
  withNav = true,
  withFooter = true,
  children,
}: PageShellProps) => {
  const hasHero = Boolean(title || eyebrow || lede || cta);

  return (
    <div className={presets.page}>
      {withNav && <Navbar />}

      {hasHero && (
        <section className={presets.heroSection}>
          {halo && <div className={presets.halo} aria-hidden="true" />}

          <div className={presets.heroInner}>
            {eyebrow && (
              <FadeIn>
                <div className={presets.eyebrow}>
                  <span className={presets.eyebrowText}>{eyebrow}</span>
                </div>
              </FadeIn>
            )}

            {title && (
              <FadeIn delay={0.05}>
                <h1 className={presets.h1}>
                  {accent && accentPosition === "before" ? (
                    <>
                      <span className="text-primary">{accent}</span>{" "}
                      {title}
                    </>
                  ) : accent ? (
                    <>
                      {title}{" "}
                      <span className="text-primary">{accent}</span>
                    </>
                  ) : (
                    title
                  )}
                </h1>
              </FadeIn>
            )}

            {lede && (
              <FadeIn delay={0.1}>
                <p className={presets.lede}>{lede}</p>
              </FadeIn>
            )}

            {cta && (
              <FadeIn delay={0.15}>
                <div className="mt-10 flex justify-center">
                  <a
                    href={cta.href}
                    onClick={(e) => {
                      if (cta.href.startsWith("#")) {
                        e.preventDefault();
                        document
                          .getElementById(cta.href.slice(1))
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={presets.ctaPrimary}
                  >
                    {cta.label}
                  </a>
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      {children}

      {withFooter && <Footer />}
    </div>
  );
};

export default PageShell;
