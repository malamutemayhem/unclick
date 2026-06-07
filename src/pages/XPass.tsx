import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CircleMinus,
  ClipboardCheck,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { dogfoodReport } from "@/data/dogfoodReport";

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
          : "border-border bg-background/70 text-muted-custom"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
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
    <div className="min-h-screen">
      <Navbar />

      <main className="overflow-hidden">
        <section className="px-4 pt-28 sm:px-6">
          <div className="mx-auto flex min-h-[72svh] max-w-5xl flex-col justify-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <ClipboardCheck className="h-3.5 w-3.5" />
                UnClick / AutoPilot / XPass
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-heading sm:text-6xl">
                XPass
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-body sm:text-xl">
                XPass is AutoPilot's quality-control checklist for AI work. The family holds hundreds of checks across
                the Pass products, records PASS, FAIL, Warning, Alert, or N/A with comments, and keeps looping until the relevant rows are green.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/admin/checks"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Open XPass in Admin
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/dogfood"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background/70 px-5 text-sm font-medium text-heading transition-colors hover:bg-card"
                >
                  View public receipt
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card/40">
                {HERO_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-3 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[180px_86px_minmax(0,1fr)] sm:items-center"
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

        <section className="border-y border-border bg-card/25 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-heading">How it chooses checks</h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-body">
                XPass does not ask people to remember every product name. Tell AutoPilot what the work is, and XPass
                decides which checklist rows belong in the report.
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {USE_CASES.map((useCase) => (
                <div key={useCase.title} className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-base font-semibold text-heading">{useCase.title}</p>
                  <p className="mt-2 text-xs font-medium text-primary">{useCase.products}</p>
                  <p className="mt-3 text-sm leading-6 text-body">{useCase.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold text-heading">XPass family</h2>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-body">
                  Each product owns one kind of checklist. XPass ties them together into one readable report.
                </p>
              </div>
              <Link
                to="/dogfood"
                className="inline-flex min-h-8 items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
              >
                Latest public proof
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-border">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid gap-2 border-b border-border bg-card/20 px-4 py-3 last:border-b-0 sm:grid-cols-[180px_160px_minmax(0,1fr)] sm:items-center"
                >
                  <p className="text-sm font-medium text-heading">{product.name}</p>
                  <p className="text-xs text-muted-custom">{product.label}</p>
                  <p className="text-sm leading-6 text-body">{product.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
