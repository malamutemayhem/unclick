import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSession } from "@/lib/auth";
import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  CircleMinus,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileText,
  KeyRound,
  LayoutGrid,
  ListChecks,
  MessagesSquare,
  Palette,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { dogfoodReport, type DogfoodPassResult, type DogfoodStatus } from "@/data/dogfoodReport";
import {
  countChecklistGroups,
  countFamilyChecklistRows,
  countChecklistRows,
  XPASS_PRODUCT_CHECKLISTS,
  type XPassChecklistGroup,
  type XPassProductId,
  type XPassRowStatus,
} from "./xpassChecklistCatalog";

type XPassProduct = {
  id: XPassProductId;
  name: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  externalHref?: string;
};

const PRODUCTS: XPassProduct[] = [
  {
    id: "testpass",
    name: "TestPass",
    subtitle: "Does it work?",
    description: "Checks builds, tools, jobs, and releases before work is trusted.",
    icon: ClipboardCheck,
    externalHref: "/admin/testpass",
  },
  {
    id: "uipass",
    name: "UIPass",
    subtitle: "Does it look right?",
    description: "Checks layout, spacing, typography, mobile fit, visual hierarchy, consistency, and polish.",
    icon: Palette,
  },
  {
    id: "uxpass",
    name: "UXPass",
    subtitle: "Is it easy to use?",
    description: "Checks journeys, steps, wording, forms, feedback, recovery, and whether a user can finish the task.",
    icon: UserCheck,
  },
  {
    id: "securitypass",
    name: "SecurityPass",
    subtitle: "Is it safe enough?",
    description: "Checks security boundaries without exposing secrets or running unsafe probes.",
    icon: ShieldCheck,
  },
  {
    id: "copypass",
    name: "CopyPass",
    subtitle: "Is the wording clear?",
    description: "Checks copy, claims, tone, trust, and AI-slop risk.",
    icon: FileText,
    externalHref: "/admin/copypass",
  },
  {
    id: "fidelitypass",
    name: "FidelityPass",
    subtitle: "Was it copied exactly?",
    description: "Checks exact-copy work against CopyRoom proof when 1:1 copying matters.",
    icon: BadgeCheck,
  },
  {
    id: "legalpass",
    name: "LegalPass",
    subtitle: "Is the risk language honest?",
    description: "Checks policy, disclaimer, promise, and legal-risk wording as guidance.",
    icon: FileText,
  },
  {
    id: "sloppass",
    name: "SlopPass",
    subtitle: "Is the work sloppy?",
    description: "Checks rough code, stale diffs, rushed patches, and maintainability risk.",
    icon: SearchCheck,
  },
  {
    id: "commonsensepass",
    name: "CommonSensePass",
    subtitle: "Does the claim make sense?",
    description: "Stops proofless done claims, stale green lights, and false quiet states.",
    icon: MessagesSquare,
  },
  {
    id: "seopass",
    name: "SEOPass",
    subtitle: "Can search read it?",
    description: "Checks public page basics such as metadata, crawl clues, and search clarity.",
    icon: SearchCheck,
  },
  {
    id: "geopass",
    name: "GEOPass",
    subtitle: "Can AI answer engines understand it?",
    description: "Checks if AI assistants can understand and explain the page clearly.",
    icon: Sparkles,
  },
  {
    id: "flowpass",
    name: "FlowPass",
    subtitle: "Can the user finish the path?",
    description: "Checks journeys, forms, handoffs, onboarding, and completion paths.",
    icon: Workflow,
  },
  {
    id: "connectorpass",
    name: "ConnectorPass",
    subtitle: "Can the app connect for real?",
    description: "Checks app discovery, provider login, fallback setup, live OAuth proof, and tool credential parity.",
    icon: KeyRound,
  },
  {
    id: "rotatepass",
    name: "RotatePass",
    subtitle: "Are credentials handled cleanly?",
    description: "Checks key rotation and redaction boundaries without touching real secrets.",
    icon: KeyRound,
  },
  {
    id: "wakepass",
    name: "WakePass",
    subtitle: "Will someone act on it?",
    description: "Checks stale work, missed ACKs, owner handoff, and action-needed routing.",
    icon: Clock3,
  },
  {
    id: "compliancepass",
    name: "CompliancePass",
    subtitle: "Is the readiness story sensible?",
    description: "Checks readiness evidence without pretending to certify compliance.",
    icon: ShieldCheck,
  },
];

const STATUS_STYLE: Record<XPassRowStatus, { label: string; className: string; icon: LucideIcon }> = {
  PASS: {
    label: "PASS",
    className: "bg-[#46c76f] text-black",
    icon: CheckCircle2,
  },
  FAIL: {
    label: "FAIL",
    className: "bg-red-500 text-white",
    icon: XCircle,
  },
  "N/A": {
    label: "N/A",
    className: "bg-orange-400 text-black",
    icon: CircleMinus,
  },
  WARNING: {
    label: "Warning",
    className: "bg-[#E2B93B] text-black",
    icon: Clock3,
  },
  ALERT: {
    label: "Alert",
    className: "bg-[#FF8A3D] text-black",
    icon: AlertTriangle,
  },
  WAITING: {
    label: "Waiting",
    className: "bg-white/12 text-white/70",
    icon: Clock3,
  },
};

const STATUS_LEGEND: XPassRowStatus[] = ["PASS", "FAIL", "ALERT", "WARNING", "N/A", "WAITING"];

function dogfoodToRowStatus(status?: DogfoodStatus): XPassRowStatus {
  if (status === "passing") return "PASS";
  if (status === "failing") return "FAIL";
  if (status === "blocked") return "ALERT";
  return "WAITING";
}

function productById(id?: string): XPassProduct | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

function resultFor(id: XPassProductId): DogfoodPassResult | undefined {
  return dogfoodReport.results.find((result) => result.id === id);
}

function formatEvidenceDate(iso?: string): string {
  if (!iso) return "No date recorded";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "No date recorded";
  return parsed.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * The only evidence this page shows is recorded evidence. Every value below
 * comes from the dogfood report; nothing is simulated and no history is
 * invented. Passes without a recorded run stay WAITING.
 */
type LatestEvidence = {
  status: XPassRowStatus;
  date: string;
  summary: string;
  evidence: string | null;
  proofLabel: string | null;
  nextProof: string | null;
};

function latestEvidenceFor(product: XPassProduct): LatestEvidence {
  const result = resultFor(product.id);
  if (!result) {
    return {
      status: "WAITING",
      date: "No run recorded",
      summary: `No recorded ${product.name} run yet. This panel fills in when a real run lands.`,
      evidence: null,
      proofLabel: null,
      nextProof: null,
    };
  }

  const proof = result.proof;
  const proofLabel = proof
    ? [proof.kind, proof.runId ? `run ${proof.runId.slice(0, 8)}` : null].filter(Boolean).join(" / ")
    : null;

  return {
    status: dogfoodToRowStatus(result.status),
    date: formatEvidenceDate(result.checkedAt ?? proof?.generatedAt ?? dogfoodReport.generatedAt),
    summary: result.summary,
    evidence: result.evidence || null,
    proofLabel,
    nextProof: result.nextProof ?? null,
  };
}

/**
 * Checklist rows render with the status the catalog actually records.
 * The default is WAITING: a check with no recorded run result must say so
 * instead of pretending to be green.
 */
function checklistFor(product: XPassProduct, evidence: LatestEvidence): XPassChecklistGroup[] {
  return [
    {
      title: "Current run gate",
      rows: [
        {
          title: "Latest recorded evidence",
          comment: evidence.summary,
          status: evidence.status,
        },
        {
          title: "Machine proof attached",
          comment: evidence.proofLabel
            ? `Recorded proof: ${evidence.proofLabel}.`
            : "No machine proof attached yet. A run receipt fills this row.",
          status: evidence.proofLabel ? "PASS" : "WAITING",
        },
        {
          title: "Next proof needed",
          comment: evidence.nextProof ?? "No follow-up proof recorded for this Pass.",
          status: evidence.nextProof ? "WARNING" : evidence.status === "WAITING" ? "WAITING" : "PASS",
        },
      ],
    },
    ...XPASS_PRODUCT_CHECKLISTS[product.id],
  ];
}

function StatusBadge({ status }: { status: XPassRowStatus }) {
  const style = STATUS_STYLE[status];
  const Icon = style.icon;

  return (
    <span className={`inline-flex min-w-[66px] items-center justify-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${style.className}`}>
      <Icon className="h-2.5 w-2.5" />
      {style.label}
    </span>
  );
}

function ProductCard({ product }: { product: XPassProduct }) {
  const Icon = product.icon;
  const checkCount = countChecklistRows(product.id) + 3;
  const groupCount = countChecklistGroups(product.id) + 1;
  const evidence = latestEvidenceFor(product);

  return (
    <Link
      to={`/admin/checks/${product.id}`}
      className="min-h-[132px] rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-[#61C1C4]/45 hover:bg-[#61C1C4]/[0.07]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-black/30">
          <Icon className="h-4 w-4 text-[#61C1C4]" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-white">{product.name}</h2>
          <p className="truncate text-xs text-white/45">{product.subtitle}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 text-xs leading-5 text-white/55">{product.description}</p>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-white/45">
        <span>{checkCount} checks</span>
        <span>{groupCount} groups</span>
        <StatusBadge status={evidence.status} />
      </div>
    </Link>
  );
}

function StatusLegend() {
  return (
    <div className="mt-3 flex max-w-full flex-wrap gap-2" aria-label="XPass status legend">
      {STATUS_LEGEND.map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  );
}

function LatestEvidencePanel({ product, evidence }: { product: XPassProduct; evidence: LatestEvidence }) {
  return (
    <section className="min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">Latest recorded evidence</h2>
        <StatusBadge status={evidence.status} />
      </div>
      <p className="mt-1 text-[11px] font-medium text-white/40">{evidence.date}</p>
      <p className="mt-2 text-xs leading-5 text-white/70" data-testid="xpass-evidence-summary">
        {evidence.summary}
      </p>
      {evidence.evidence ? (
        <p className="mt-2 rounded border border-white/[0.07] bg-black/20 px-2 py-1.5 text-[11px] leading-4 text-white/55">
          Evidence: {evidence.evidence}
        </p>
      ) : null}
      {evidence.proofLabel ? (
        <p className="mt-2 text-[11px] leading-4 text-white/45">Proof: {evidence.proofLabel}</p>
      ) : null}
      {evidence.nextProof ? (
        <p className="mt-2 text-[11px] leading-4 text-[#E2B93B]/90">Next proof needed: {evidence.nextProof}</p>
      ) : null}
      <p className="mt-3 rounded border border-[#61C1C4]/20 bg-[#61C1C4]/[0.05] px-2 py-1.5 text-[11px] leading-4 text-white/55">
        Only recorded runs appear here. Nothing on this page is simulated; a Pass without a recorded run stays Waiting.
      </p>
      <Link
        to="/dogfood"
        className="mt-3 inline-flex min-h-7 items-center gap-1.5 text-xs font-medium text-[#61C1C4] transition-opacity hover:opacity-80"
      >
        View public report
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}

type RecordedRunRow = {
  key: string;
  date: string;
  label: string;
  badgeText: string;
  badgeClass: string;
  href?: string;
};

type TestPassRunDto = {
  id: string;
  pack_name: string | null;
  started_at: string;
  status: string;
  verdict_summary?: { check?: number; fail?: number; na?: number; pending?: number } | null;
};

type UxPassRunDto = {
  id: string;
  target_url: string;
  status: string;
  ux_score: number | null;
  started_at: string;
  breakdown?: { fail?: number } | null;
};

const BADGE_GREEN = "bg-[#46c76f] text-black";
const BADGE_RED = "bg-red-500 text-white";
const BADGE_QUIET = "bg-white/12 text-white/70";

const RUN_HISTORY: Partial<
  Record<XPassProductId, { endpoint: string; startNote: string; logHref?: string; mapRows: (body: unknown) => RecordedRunRow[] }>
> = {
  testpass: {
    endpoint: "/api/memory-admin?action=list_testpass_runs&limit=6",
    startNote: "Start one from the TestPass tool and it appears here.",
    logHref: "/admin/testpass",
    mapRows: (body) => {
      const runs = (body as { runs?: TestPassRunDto[] }).runs;
      if (!Array.isArray(runs)) return [];
      return runs.map((run) => {
        const fails = run.verdict_summary?.fail ?? 0;
        const checks = run.verdict_summary?.check ?? 0;
        return {
          key: run.id,
          date: formatEvidenceDate(run.started_at),
          label: run.pack_name ?? "TestPass run",
          badgeText: fails > 0 ? `${fails} FAIL` : run.status === "complete" ? `${checks} PASS` : run.status,
          badgeClass: fails > 0 ? BADGE_RED : run.status === "complete" ? BADGE_GREEN : BADGE_QUIET,
          href: `/admin/testpass/runs/${run.id}`,
        };
      });
    },
  },
  uxpass: {
    endpoint: "/api/uxpass?action=list_runs&limit=6",
    startNote: "Run uxpass_run against a page and it appears here.",
    mapRows: (body) => {
      const runs = (body as { runs?: UxPassRunDto[] }).runs;
      if (!Array.isArray(runs)) return [];
      return runs.map((run) => {
        const fails = run.breakdown?.fail ?? 0;
        const complete = run.status === "complete";
        return {
          key: run.id,
          date: formatEvidenceDate(run.started_at),
          label: run.target_url,
          badgeText: fails > 0 ? `${fails} FAIL` : complete && run.ux_score != null ? `${Math.round(run.ux_score)}/100` : run.status,
          badgeClass: fails > 0 ? BADGE_RED : complete ? BADGE_GREEN : BADGE_QUIET,
        };
      });
    },
  },
};

/**
 * Real recorded runs for Passes that keep run history today (TestPass and
 * UXPass). Renders nothing while logged out or on fetch failure; shows an
 * honest empty state when the account simply has no recorded runs yet.
 */
function RecordedRunsPanel({ productId }: { productId: XPassProductId }) {
  const source = RUN_HISTORY[productId];
  const { session } = useSession();
  const token = session?.access_token;
  const authHeader = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : null), [token]);
  const [rows, setRows] = useState<RecordedRunRow[] | null>(null);

  useEffect(() => {
    if (!authHeader || !source) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(source.endpoint, { headers: authHeader });
        const body = (await res.json().catch(() => ({}))) as unknown;
        if (!res.ok || cancelled) return;
        setRows(source.mapRows(body));
      } catch {
        // Stay hidden: an unreadable history beats an invented one.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authHeader, source]);

  if (!source || !authHeader || rows === null) return null;

  return (
    <section className="min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3" data-testid="recorded-runs-panel">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">Recorded runs</h2>
        <p className="text-[11px] font-medium text-white/40">Newest first</p>
      </div>
      {rows.length === 0 ? (
        <p className="mt-2 text-[11px] leading-4 text-white/45">
          No recorded runs for this account yet. {source.startNote}
        </p>
      ) : (
        <div className="mt-2 space-y-1">
          {rows.map((row) => {
            const rowClass =
              "grid min-h-7 w-full min-w-0 grid-cols-[82px_minmax(0,1fr)_72px] items-center gap-2 rounded border border-white/[0.07] bg-black/20 px-2 py-1 text-left";
            const content = (
              <>
                <p className="truncate text-[10px] font-semibold text-white/55">{row.date}</p>
                <p className="truncate text-[11px] leading-4 text-white/70">{row.label}</p>
                <span className={`inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold ${row.badgeClass}`}>
                  {row.badgeText}
                </span>
              </>
            );
            return row.href ? (
              <Link
                key={row.key}
                to={row.href}
                data-testid="recorded-run-row"
                className={`${rowClass} transition-colors hover:border-[#61C1C4]/40`}
              >
                {content}
              </Link>
            ) : (
              <div key={row.key} data-testid="recorded-run-row" className={rowClass}>
                {content}
              </div>
            );
          })}
        </div>
      )}
      {source.logHref ? (
        <Link
          to={source.logHref}
          className="mt-3 inline-flex min-h-7 items-center gap-1.5 text-xs font-medium text-[#61C1C4] transition-opacity hover:opacity-80"
        >
          Open the full run log
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </section>
  );
}

function ChecklistGroupView({ group }: { group: XPassChecklistGroup }) {
  return (
    <section className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold text-white">{group.title}</h2>
        <span className="text-[11px] font-medium text-white/40">{group.rows.length} checks</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-md border border-white/[0.08]">
        {group.rows.map((row, index) => (
          <div
            key={`${group.title}-${row.title}`}
            data-testid="xpass-check-row"
            className="grid min-h-7 grid-cols-[minmax(96px,132px)_minmax(0,1fr)_68px] gap-2 border-b border-white/[0.06] bg-black/20 px-2 py-1 last:border-b-0 md:grid-cols-[28px_minmax(150px,220px)_minmax(0,1fr)_78px] md:items-center"
          >
            <p className="hidden text-[11px] font-semibold text-white/35 md:block">{index + 1}</p>
            <p className="truncate text-xs font-semibold text-white">{row.title}</p>
            <p className="min-w-0 truncate text-[11px] leading-4 text-white/55">{row.comment}</p>
            <StatusBadge status={row.status ?? "WAITING"} />
          </div>
        ))}
      </div>
    </section>
  );
}

function XPassHome() {
  const familyCheckCount = countFamilyChecklistRows() + PRODUCTS.length * 3;

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30">
            <LayoutGrid className="h-5 w-5 text-[#61C1C4]" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#61C1C4]">AutoPilot / XPass</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">XPass</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">
              XPass is the quality-control checklist for UnClick work. Each Pass owns a large set of checks, scores
              every relevant row, explains every result, and keeps looping until the non-N/A rows are green.
            </p>
            <p className="mt-3 text-xs font-medium text-white/45">
              {familyCheckCount} live checklist rows across {PRODUCTS.length} Passes, before the run adds project-specific rows.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-white">XPass family</h2>
        <p className="mt-1 text-xs text-white/45">
          Pick a Pass to see its checklist and latest recorded evidence. Badges show real run status, not a target.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

function XPassProductReport({ product }: { product: XPassProduct }) {
  const Icon = product.icon;
  const checkCount = countChecklistRows(product.id) + 3;
  const groupCount = countChecklistGroups(product.id) + 1;
  const evidence = latestEvidenceFor(product);

  return (
    <div className="space-y-6">
      <Link to="/admin/checks" className="inline-flex min-h-8 items-center text-sm font-medium text-[#61C1C4] hover:opacity-80">
        Back to XPass
      </Link>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.03] p-6">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30">
            <Icon className="h-5 w-5 text-[#61C1C4]" />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-white">{product.name}</h1>
            <p className="mt-1 text-sm font-semibold text-white/70">{product.subtitle}</p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">{product.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/55">
              <span className="inline-flex min-h-7 items-center gap-1.5 rounded-md border border-white/[0.08] bg-black/25 px-2.5">
                <ListChecks className="h-3.5 w-3.5 text-[#61C1C4]" />
                {checkCount} checklist rows
              </span>
              <span className="inline-flex min-h-7 items-center rounded-md border border-white/[0.08] bg-black/25 px-2.5">
                {groupCount} groups
              </span>
              <span className="inline-flex min-h-7 max-w-full items-center rounded-md border border-white/[0.08] bg-black/25 px-2.5 leading-4">
                Green only when every relevant row is PASS or N/A
              </span>
            </div>
            <StatusLegend />
            {product.externalHref ? (
              <Link
                to={product.externalHref}
                className="mt-4 inline-flex min-h-8 items-center gap-1.5 text-sm font-medium text-[#61C1C4] hover:opacity-80"
              >
                Open full tool
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>
        <div className="min-w-0 space-y-5">
          <LatestEvidencePanel product={product} evidence={evidence} />
          <RecordedRunsPanel productId={product.id} />
        </div>
      </div>

      <section className="space-y-3" data-testid="xpass-checklist-results">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-white">Checklist</h2>
            <p className="mt-1 text-xs text-white/45">
              What {product.name} checks. Rows stay Waiting until a recorded run scores them; any FAIL, Alert, or
              Warning row must name what fixes it next.
            </p>
          </div>
          <StatusBadge status={evidence.status} />
        </div>
          {checklistFor(product, evidence).map((group) => (
            <ChecklistGroupView key={group.title} group={group} />
          ))}
      </section>
    </div>
  );
}

export default function AdminXPassHub() {
  const { productId } = useParams();
  const product = productById(productId);

  if (productId && !product) {
    return (
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-6">
        <h1 className="text-xl font-semibold text-white">Pass not found</h1>
        <p className="mt-2 text-sm text-white/55">That XPass product is not in the family list.</p>
        <Link to="/admin/checks" className="mt-4 inline-flex min-h-8 items-center text-sm font-medium text-[#61C1C4]">
          Back to XPass
        </Link>
      </div>
    );
  }

  return product ? <XPassProductReport product={product} /> : <XPassHome />;
}
