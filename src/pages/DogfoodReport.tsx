import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, Clock3, ExternalLink } from "lucide-react";
import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";
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

/**
 * Status colours stay semantic. Pass/fail/blocked/pending are scannable signals
 * users need to read at a glance, so the colour is functional, not decorative.
 * Everything else is monochrome teal on neutral, per the design system.
 */
const STATUS_STYLES: Record<DogfoodStatus, { label: string; badge: string; icon: typeof CheckCircle2 }> = {
  passing: {
    label: "Passing",
    badge: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    icon: CheckCircle2,
  },
  failing: {
    label: "Needs action",
    badge: "border-red-400/20 bg-red-400/10 text-red-200",
    icon: AlertTriangle,
  },
  pending: {
    label: "Pending",
    badge: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    icon: Clock3,
  },
  blocked: {
    label: "Blocked",
    badge: "border-sky-400/25 bg-sky-400/10 text-sky-200",
    icon: AlertTriangle,
  },
};

/**
 * XPass stage labels used to be rainbow. Now they share one calm vocabulary:
 * live work in teal, future work in muted neutral. Stage is communicated by the
 * label itself, not by a colour assignment.
 *
 * All five stages from XPassIndexEntry["stage"] are mapped. If a new stage is
 * added to the data shape, add it here too or the badge will render as broken.
 */
const XPASS_STAGE_STYLES: Record<XPassIndexEntry["stage"], string> = {
  live_gate: "border-primary/30 bg-primary/10 text-primary",
  live_dogfood: "border-primary/30 bg-primary/10 text-primary",
  package_ready: "border-primary/20 bg-primary/[0.06] text-body",
  boundary: "border-border/60 bg-card/40 text-muted-foreground",
  scope_gated: "border-border/60 bg-card/60 text-heading",
  planned: "border-border/60 bg-card/40 text-muted-foreground",
  guidance: "border-border/60 bg-card/40 text-muted-foreground",
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
    title: "Dogfood report - We run UnClick on UnClick",
    description:
      "Public dogfood receipt for the XPass family of checks running against UnClick itself.",
    ogTitle: "UnClick Dogfood Report",
    ogDescription:
      "We dogfood UnClick on UnClick. Public XPass quality receipts.",
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
    <PageShell
      eyebrow="Public receipt"
      title="We run UnClick on UnClick."
      lede="The XPass family of quality checks runs against this site every day. The receipts live here. Nothing hidden."
    >
      {/* Latest receipt summary */}
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                    Latest receipt
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${receiptStatus.badge}`}>
                      <ReceiptIcon className="h-3.5 w-3.5" />
                      {receiptStatus.label}
                    </span>
                    <span className="text-xs text-muted-custom">{report.source}</span>
                  </div>
                  <p className="text-sm text-heading">
                    Last run: {formatDate(report.lastRunAt || report.generatedAt)}
                  </p>
                </div>
                <div className="max-w-md text-right">
                  <Activity className="ml-auto mb-2 h-4 w-4 text-primary" />
                  <p className="text-xs leading-relaxed text-body">
                    {report.nextAutomation}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stat counts */}
      <section className="px-6 py-6">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-4">
          {([
            ["Passing", counts.passing],
            ["Needs action", counts.failing],
            ["Blocked", counts.blocked],
            ["Pending", counts.pending],
          ] as const).map(([label, value]) => (
            <FadeIn key={label} delay={0.08}>
              <div className="rounded-2xl border border-border/70 bg-card/40 p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                  {label}
                </p>
                <p className="mt-2 text-4xl font-semibold text-heading">{value}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* XPass family index */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <FadeIn delay={0.09}>
            <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                    XPass family
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-heading">
                    What gates, what watches, what is on the way.
                  </h2>
                </div>
                <p className="max-w-md text-xs leading-relaxed text-muted-custom">
                  Live gates block bad work. Dogfood lanes report receipts without
                  blocking. Planned and guidance stages are still maturing.
                </p>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {xpassIndex.map((entry) => (
                  <div key={entry.id} className="rounded-xl border border-border/50 bg-background/40 p-4">
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
        </div>
      </section>

      {/* Proof policy + status legend */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                Proof policy
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body">{report.proofPolicy}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {(Object.keys(report.statusLegend) as DogfoodStatus[]).map((statusKey) => {
                  const status = STATUS_STYLES[statusKey];
                  const Icon = status.icon;

                  return (
                    <div key={statusKey} className="rounded-xl border border-border/50 bg-background/40 p-3">
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
        </div>
      </section>

      {/* Individual pass results */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-2">
            {report.results.map((result, index) => {
              const status = STATUS_STYLES[result.status];
              const Icon = status.icon;

              return (
                <FadeIn key={result.id} delay={0.04 * index}>
                  <article className="h-full rounded-2xl border border-border/70 bg-card/40 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-heading">{result.name}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-body">{result.summary}</p>
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
                      <p className="mt-3 text-xs leading-relaxed text-sky-200">
                        Blocked reason: {result.blockedReason}
                      </p>
                    ) : null}
                    {result.reasonCode || result.nextProof ? (
                      <div className="mt-3 rounded-xl border border-border/50 bg-background/40 p-3 text-xs leading-relaxed text-muted-custom">
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
                        className="mt-3 inline-flex items-center gap-1.5 break-all text-[11px] font-medium text-primary transition-opacity hover:opacity-80"
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
        </div>
      </section>

      {/* Last failure + trend */}
      <section className="px-6 py-6">
        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">
                Last actionable failure
              </p>
              <h2 className="mt-3 text-lg font-semibold text-heading">{report.lastActionableFailure.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-body">{report.lastActionableFailure.detail}</p>
              <p className="mt-4 text-xs text-muted-custom">Owner: {report.lastActionableFailure.owner}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-custom">Receipt trend</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-border/60">
                {report.trend.map((point) => (
                  <div key={point.date} className="grid min-w-[460px] grid-cols-5 gap-2 border-b border-border/50 px-4 py-3 text-xs last:border-b-0">
                    <span className="text-heading">{point.date}</span>
                    <span className="text-emerald-200">Pass {point.passing}</span>
                    <span className="text-red-200">Fail {point.failing}</span>
                    <span className="text-sky-200">Blocked {point.blocked || 0}</span>
                    <span className="text-amber-200">Pending {point.pending}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Public JSON link */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <a
            href="/dogfood/latest.json"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            View public JSON receipt
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
