import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, Clock3, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import {
  dogfoodReport as fallbackReport,
  type DogfoodPassResult,
  type DogfoodStatus,
  type DogfoodStatusLegend,
  type DogfoodTrendPoint,
  type XPassIndexEntry,
} from "@/data/dogfoodReport";

type DogfoodReportData = Omit<typeof fallbackReport, "results" | "trend"> & {
  results: DogfoodPassResult[];
  trend: DogfoodTrendPoint[];
  statusLegend: DogfoodStatusLegend;
  proofPolicy: string;
  xpassIndex?: XPassIndexEntry[];
};

const STATUS_STYLES: Record<DogfoodStatus, { label: string; badge: string; icon: typeof CheckCircle2 }> = {
  passing: {
    label: "Passing",
    badge: "border-border/60 bg-background/50 text-body",
    icon: CheckCircle2,
  },
  failing: {
    label: "Needs action",
    badge: "border-border/60 bg-background/50 text-body",
    icon: AlertTriangle,
  },
  pending: {
    label: "Pending",
    badge: "border-border/60 bg-background/50 text-body",
    icon: Clock3,
  },
  blocked: {
    label: "Blocked",
    badge: "border-border/60 bg-background/50 text-body",
    icon: AlertTriangle,
  },
};

const XPASS_STAGE_STYLES: Record<XPassIndexEntry["stage"], string> = {
  live_gate: "border-border/60 bg-background/50 text-body",
  live_dogfood: "border-border/60 bg-background/50 text-body",
  scope_gated: "border-border/60 bg-background/50 text-body",
  package_ready: "border-border/60 bg-background/50 text-body",
  boundary: "border-border/60 bg-background/50 text-body",
  planned: "border-border/60 bg-background/50 text-body",
  guidance: "border-border/60 bg-background/50 text-body",
};

function countByStatus(results: DogfoodPassResult[], status: DogfoodStatus): number {
  return results.filter((result) => result.status === status).length;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function proofTarget(result: DogfoodPassResult): string | null {
  return result.targetUrl || result.proof?.targetUrl || null;
}

export default function DogfoodReportPage() {
  const [report, setReport] = useState<DogfoodReportData>(fallbackReport);

  useCanonical("/dogfood");
  useMetaTags({
    title: "UnClick Dogfood Report - We Run UnClick on UnClick",
    description: "Public dogfood receipt for UnClick Pass-family checks running against UnClick itself.",
    ogTitle: "UnClick Dogfood Report",
    ogDescription: "We dogfood UnClick on UnClick. Public Pass-family quality receipts.",
    ogUrl: "https://unclick.world/dogfood",
  });

  useEffect(() => {
    fetch("/dogfood/latest.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : fallbackReport))
      .then((data: DogfoodReportData) => setReport(data))
      .catch(() => setReport(fallbackReport));
  }, []);

  const counts = useMemo(() => ({
    passing: countByStatus(report.results, "passing"),
    failing: countByStatus(report.results, "failing"),
    blocked: countByStatus(report.results, "blocked"),
    pending: countByStatus(report.results, "pending"),
  }), [report.results]);
  const receiptStatus = STATUS_STYLES[(report.status || "pending") as DogfoodStatus] || STATUS_STYLES.pending;
  const ReceiptIcon = receiptStatus.icon;
  const xpassIndex = report.xpassIndex?.length ? report.xpassIndex : fallbackReport.xpassIndex;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="overflow-hidden px-4 pt-28 pb-16 sm:px-6">
        <section className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Activity className="h-3.5 w-3.5" />
              Public dogfood receipt
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
              <div className="min-w-0">
                <h1
                  className="max-w-full break-words text-3xl font-semibold !leading-[1.15] text-heading sm:text-5xl"
                  aria-label={report.headline}
                  title={report.headline}
                >
                  {report.headline}
                </h1>
                <p className="mt-4 max-w-2xl break-words text-lg leading-relaxed text-body">
                  This page shows the latest Pass-family receipt evidence from checks running
                  against UnClick itself.
                </p>
                <a
                  href="/dogfood/latest.json"
                  className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  View JSON receipt
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="min-w-0 lg:pl-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                  Latest receipt
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${receiptStatus.badge}`}>
                    <ReceiptIcon className="h-3.5 w-3.5" />
                    {receiptStatus.label}
                  </span>
                  <span className="text-xs text-muted-custom">{report.source}</span>
                </div>
                <p className="mt-3 text-sm text-heading">Last run: {formatDate(report.lastRunAt || report.generatedAt)}</p>
                <p className="mt-3 text-xs leading-relaxed text-body">{report.nextAutomation}</p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-4">
          {([
            ["Passing", counts.passing],
            ["Needs action", counts.failing],
            ["Blocked", counts.blocked],
            ["Pending automation", counts.pending],
          ] as const).map(([label, value]) => (
            <FadeIn key={label} delay={0.08}>
              <div className="min-w-0 py-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">{label}</p>
                <p className="mt-2 text-4xl font-semibold text-heading">{value}</p>
              </div>
            </FadeIn>
          ))}
        </section>

        <section className="mx-auto mt-10 max-w-5xl">
          <FadeIn delay={0.09}>
            <div className="min-w-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                    XPass family index
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-heading">
                    TestPass is loud because it is the live gate.
                  </h2>
                </div>
                <p className="max-w-md text-xs leading-relaxed text-muted-custom">
                  This index shows which Pass products are live gates, dogfood lanes, scope-gated,
                  planned, or guidance-only so the whole family stays visible.
                </p>
              </div>
              <div className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2">
                {xpassIndex.map((entry) => (
                  <div key={entry.id} className="min-w-0 py-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-heading">{entry.name}</h3>
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${XPASS_STAGE_STYLES[entry.stage]}`}>
                        {entry.label}
                      </span>
                    </div>
                    <dl className="mt-3 space-y-2 text-xs leading-relaxed">
                      <div>
                        <dt className="font-medium text-heading">Automation</dt>
                        <dd className="text-muted-custom">{entry.automation}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-heading">Mention profile</dt>
                        <dd className="text-muted-custom">{entry.mentionProfile}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-heading">Next step</dt>
                        <dd className="text-muted-custom">{entry.nextStep}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto mt-10 max-w-5xl">
          <FadeIn delay={0.1}>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                Proof policy
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body">{report.proofPolicy}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {(Object.keys(report.statusLegend) as DogfoodStatus[]).map((statusKey) => {
                  const status = STATUS_STYLES[statusKey];
                  const Icon = status.icon;

                  return (
                    <div key={statusKey} className="min-w-0 py-1">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${status.badge}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {status.label}
                      </span>
                      <p className="mt-2 text-xs leading-relaxed text-muted-custom">
                        {report.statusLegend[statusKey]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto mt-10 max-w-5xl">
          <div className="grid gap-4 md:grid-cols-2">
            {report.results.map((result, index) => {
              const status = STATUS_STYLES[result.status];
              const Icon = status.icon;

              return (
                <FadeIn key={result.id} delay={0.04 * index}>
                  <article className="h-full min-w-0 rounded-2xl border border-border/70 bg-card/40 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="break-words text-lg font-semibold text-heading">{result.name}</h2>
                        <p className="mt-2 break-words text-sm leading-relaxed text-body">{result.summary}</p>
                      </div>
                      <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${status.badge}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-4 rounded-xl border border-border/50 bg-background/40 p-3 text-xs leading-relaxed text-muted-custom">
                      {result.evidence}
                    </p>
                    {result.blockedReason ? (
                      <p className="mt-3 break-words text-xs leading-relaxed text-body">
                        Blocked reason: {result.blockedReason}
                      </p>
                    ) : null}
                    {result.reasonCode || result.nextProof ? (
                      <div className="mt-3 min-w-0 rounded-xl border border-border/50 bg-background/40 p-3 text-xs leading-relaxed text-muted-custom">
                        {result.reasonCode ? (
                          <p>
                            Reason code: <span className="font-mono text-heading">{result.reasonCode}</span>
                          </p>
                        ) : null}
                        {result.nextProof ? (
                          <p className={result.reasonCode ? "mt-1" : undefined}>
                            Next proof: {result.nextProof}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    {result.checkedAt ? (
                      <p className="mt-3 text-[11px] text-muted-custom">Checked: {formatDate(result.checkedAt)}</p>
                    ) : null}
                    {result.runId || result.targetUrl ? (
                      <div className="mt-3 space-y-1 text-[11px] text-muted-custom">
                        {result.runId ? <p>Run: {result.runId}</p> : null}
                        {result.targetUrl ? <p className="break-all">Target: {result.targetUrl}</p> : null}
                      </div>
                    ) : null}
                    {proofTarget(result) ? (
                      <a
                        href={proofTarget(result) || undefined}
                        className="mt-3 inline-flex min-h-6 items-center gap-1.5 break-all py-1 text-xs font-medium text-primary transition-opacity hover:opacity-80"
                      >
                        View proof target
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    ) : null}
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 grid max-w-5xl min-w-0 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn className="min-w-0">
            <div className="min-w-0 rounded-2xl border border-border/70 bg-card/40 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                Last actionable failure
              </p>
              <h2 className="mt-3 break-words text-lg font-semibold text-heading">{report.lastActionableFailure.title}</h2>
              <p className="mt-2 break-words text-sm leading-relaxed text-body">{report.lastActionableFailure.detail}</p>
              <p className="mt-4 break-words text-xs text-muted-custom">Owner: {report.lastActionableFailure.owner}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="min-w-0">
            <div className="min-w-0 rounded-2xl border border-border/70 bg-card/40 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">Receipt trend</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-border/60">
                {report.trend.map((point) => (
                  <div key={point.date} className="grid grid-cols-2 gap-2 border-b border-border/50 px-4 py-3 text-xs last:border-b-0 sm:min-w-[460px] sm:grid-cols-5">
                    <span className="text-heading">{point.date}</span>
                    <span className="text-body">Pass {point.passing}</span>
                    <span className="text-body">Fail {point.failing}</span>
                    <span className="text-body">Blocked {point.blocked || 0}</span>
                    <span className="text-body">Pending {point.pending}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto mt-10 max-w-5xl">
          <a
            href="/dogfood/latest.json"
            className="inline-flex min-h-6 items-center gap-2 py-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            View public JSON receipt
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
