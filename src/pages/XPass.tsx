import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CircleMinus,
  ClipboardCheck,
  ExternalLink,
  ShieldCheck,
  FlaskConical,
  Layout,
  Route,
  PenLine,
  CopyCheck,
  Scale,
  Eraser,
  Lightbulb,
  Search,
  Bot,
  Workflow,
  RefreshCw,
  AlarmClock,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ExpandableImage from "@/components/ExpandableImage";
import { Eyebrow, GradientText } from "@/components/brand";
import { presets } from "@/lib/design-system";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { dogfoodReport } from "@/data/dogfoodReport";

// Fitting icon per Pass (matched by product name; falls back to a checklist).
const PASS_ICONS: Record<string, LucideIcon> = {
  TestPass: FlaskConical,
  UIPass: Layout,
  UXPass: Route,
  SecurityPass: ShieldCheck,
  CopyPass: PenLine,
  FidelityPass: CopyCheck,
  LegalPass: Scale,
  SlopPass: Eraser,
  CommonSensePass: Lightbulb,
  SEOPass: Search,
  GEOPass: Bot,
  FlowPass: Workflow,
  RotatePass: RefreshCw,
  WakePass: AlarmClock,
  CompliancePass: BadgeCheck,
};

// Plain-English "what does it ask?" line per Pass (same friendly framing as the
// in-app XPass page).
const PASS_QUESTIONS: Record<string, string> = {
  TestPass: "Does it work?",
  UIPass: "Does it look right?",
  UXPass: "Is it easy to use?",
  SecurityPass: "Is it safe enough?",
  CopyPass: "Is the wording clear?",
  FidelityPass: "Was it copied exactly?",
  LegalPass: "Is the risk language honest?",
  SlopPass: "Is the work sloppy?",
  CommonSensePass: "Does the claim make sense?",
  SEOPass: "Can search read it?",
  GEOPass: "Can AI answer engines understand it?",
  FlowPass: "Can the user finish the path?",
  RotatePass: "Are credentials handled safely?",
  WakePass: "Will someone act on it?",
  CompliancePass: "Is the readiness story honest?",
};

const HERO_ROWS = [
  {
    label: "Target named",
    status: "PASS",
    comment: "The work says what it is checking before it starts.",
  },
  {
    label: "Checks selected",
    status: "PASS",
    comment: "Relevant XPass products run, and skipped products get an honest reason.",
  },
  {
    label: "Evidence linked",
    status: "PASS",
    comment: "Receipts point at tests, PRs, screenshots, ledgers, or safe proof.",
  },
  {
    label: "Not in scope",
    status: "N/A",
    comment: "N/A means considered and not relevant, not forgotten.",
  },
];

const USE_CASES = [
  {
    title: "Code or PR",
    products: "TestPass, SecurityPass, SlopPass, CommonSensePass",
    note: "Use when work needs build proof, safe security evidence, code-quality review, and stale-green protection.",
  },
  {
    title: "Screen or journey",
    products: "UIPass, UXPass, FlowPass, CopyPass, SEOPass, GEOPass",
    note: "Use when a page, form, onboarding path, or public surface needs to be clear and finishable.",
  },
  {
    title: "Copy or exact source",
    products: "CopyPass, FidelityPass, LegalPass",
    note: "Use when wording, claims, prompts, labels, or source material must be clear, honest, or copied exactly.",
  },
  {
    title: "Keys or policy",
    products: "SecurityPass, RotatePass, LegalPass, CompliancePass",
    note: "Use when credentials, auth, privacy, trust wording, or readiness claims are in the work.",
  },
];

function StatusTag({ status }: { status: string }) {
  const isPass = status === "PASS";
  const Icon = isPass ? CheckCircle2 : CircleMinus;

  return (
    <span
      className={`inline-flex min-h-6 min-w-[68px] items-center justify-center gap-1 rounded-full border px-2 text-[11px] font-semibold ${
        isPass
          ? "border-primary/35 bg-primary/10 text-primary"
          : "border-[#86dadd]/15 bg-white/[0.03] text-muted-custom"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

/** Centered section heading + optional subtitle, matching the brochure pages. */
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <FadeIn>
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body">{subtitle}</p>
        )}
      </div>
    </FadeIn>
  );
}

export default function XPassPage() {
  useCanonical("/xpass");
  useMetaTags({
    title: "UnClick XPass - AutoPilot's QC Checklist",
    description: "XPass is the UnClick quality-control checklist system that proves AI work before it ships.",
    ogTitle: "UnClick XPass",
    ogDescription: "AutoPilot uses XPass as a large QC checklist for AI work.",
    ogUrl: "https://unclick.world/xpass",
  });

  const products = dogfoodReport.xpassIndex;

  return (
    <div className={presets.page}>
      <Navbar />

      <main>
        {/* Hero - centered, matching the brochure pages */}
        <section className="relative px-6 pt-28 pb-10 sm:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>AutoPilot / XPass</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-heading sm:text-5xl md:text-6xl">
                Proof before it <GradientText>ships</GradientText>.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
                XPass is AutoPilot's quality-control checklist for AI work. It runs the right checks,
                records PASS, FAIL, warning, or N/A with a comment, and keeps looping until the
                relevant rows are green.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/admin/checks"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Open XPass in Admin
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/dogfood"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#86dadd]/20 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-white/[0.07]"
                >
                  View public receipt
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Banner showcase - high on the page */}
        <section className="px-6 pb-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <ExpandableImage
                src="/UnClick_Xpass_web.jpg"
                alt="XPass: AI work moves along a line of checks - Works, Reads well, Safe, Honest, Looks right - and earns a proof receipt stamped PASS."
              />
            </FadeIn>
          </div>
        </section>

        {/* What a receipt looks like */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              title="A receipt, not a vibe."
              subtitle="Every run records each row with a status and a comment, so the result is evidence you can read."
            />
            <FadeIn delay={0.05}>
              <div className="overflow-hidden rounded-xl border border-[#86dadd]/12 bg-white/[0.03] backdrop-blur-sm">
                {HERO_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-3 border-b border-white/[0.06] px-4 py-3 last:border-b-0 sm:grid-cols-[180px_86px_minmax(0,1fr)] sm:items-center"
                  >
                    <p className="text-sm font-medium text-heading">{row.label}</p>
                    <StatusTag status={row.status} />
                    <p className="text-sm leading-6 text-body">{row.comment}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Pick the right checks */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              title="Pick the right checks."
              subtitle="You do not memorize product names. Tell AutoPilot what the work is, and XPass selects the checklist rows that belong."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {USE_CASES.map((useCase, i) => (
                <FadeIn key={useCase.title} delay={0.04 * i}>
                  <div className="h-full rounded-xl border border-[#86dadd]/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-white/[0.05]">
                    <p className="text-base font-semibold text-heading">{useCase.title}</p>
                    <p className="mt-2 text-xs font-medium text-primary">{useCase.products}</p>
                    <p className="mt-3 text-sm leading-6 text-body">{useCase.note}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* The XPass family */}
        <section className="px-6 pb-28">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              title="The XPass family."
              subtitle="Each product owns one kind of checklist. XPass ties them into one readable report."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => {
                const Icon = PASS_ICONS[product.name] ?? ClipboardCheck;
                return (
                  <FadeIn key={product.id} delay={0.03 * i}>
                    <div className="h-full rounded-xl border border-[#86dadd]/12 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-white/[0.05]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-heading">{product.name}</h3>
                          <p className="text-xs text-primary/80">{PASS_QUESTIONS[product.name] ?? product.label}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-body">{product.summary}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
            <FadeIn delay={0.1}>
              <div className="mt-10 flex justify-center">
                <Link
                  to="/dogfood"
                  className="inline-flex min-h-9 items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                >
                  Latest public proof
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
