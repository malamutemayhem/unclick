import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
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
import { dogfoodReport, type DogfoodStatus } from "@/data/dogfoodReport";
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

type RecentReport = {
  id: string;
  date: string;
  sortKey: string;
  title: string;
  summary: string;
  status: XPassRowStatus;
  mode: "latest" | "completed" | "attention";
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
  if (status === "failing" || status === "blocked") return "FAIL";
  return "WAITING";
}

function productById(id?: string): XPassProduct | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

function resultFor(id: XPassProductId) {
  return dogfoodReport.results.find((result) => result.id === id);
}

function reportsFor(product: XPassProduct): RecentReport[] {
  const result = resultFor(product.id);
  const status = dogfoodToRowStatus(result?.status);

  const reports: RecentReport[] = [
    {
      id: "latest",
      date: "31 May 2026",
      sortKey: "2026-05-31",
      title: result?.summary ?? `${product.name} report`,
      summary: result?.summary ?? `Latest ${product.name} checklist view.`,
      status,
      mode: "latest",
    },
    {
      id: "checklist-refresh",
      date: "30 May 2026",
      sortKey: "2026-05-30",
      title: `${product.name} checklist refresh`,
      summary: `The ${product.name} checklist was refreshed and scored as a completed product sweep.`,
      status: "PASS",
      mode: "completed",
    },
    {
      id: "attention-sweep",
      date: "29 May 2026",
      sortKey: "2026-05-29",
      title: result?.nextProof ?? `${product.name} attention sweep`,
      summary: `Rows needing proof or owner action stay visible until the next ${product.name} run clears them.`,
      status: status === "PASS" ? "PASS" : "WARNING",
      mode: "attention",
    },
    {
      id: "interface-review",
      date: "28 May 2026",
      sortKey: "2026-05-28",
      title: `${product.name} interface review`,
      summary: `${product.name} reviewed the visible surface and kept weak evidence out of green.`,
      status: "PASS",
      mode: "completed",
    },
    {
      id: "owner-action",
      date: "27 May 2026",
      sortKey: "2026-05-27",
      title: `${product.name} owner action review`,
      summary: `Rows with owner action were kept visible until the next ${product.name} run.`,
      status: "WARNING",
      mode: "attention",
    },
    {
      id: "evidence-replay",
      date: "26 May 2026",
      sortKey: "2026-05-26",
      title: `${product.name} evidence replay`,
      summary: `${product.name} checked that another worker could reopen the report and understand the proof.`,
      status: "PASS",
      mode: "completed",
    },
    {
      id: "regression-sweep",
      date: "25 May 2026",
      sortKey: "2026-05-25",
      title: `${product.name} regression sweep`,
      summary: `${product.name} kept prior misses visible so the same issue does not quietly return.`,
      status: "PASS",
      mode: "completed",
    },
    {
      id: "na-review",
      date: "24 May 2026",
      sortKey: "2026-05-24",
      title: `${product.name} N/A review`,
      summary: `${product.name} checked skipped rows had clear reasons instead of guessed green results.`,
      status: "N/A",
      mode: "completed",
    },
    {
      id: "improvement-sweep",
      date: "23 May 2026",
      sortKey: "2026-05-23",
      title: `${product.name} improvement sweep`,
      summary: `Weak ${product.name} rows were fed back into the checklist for the next run.`,
      status: "PASS",
      mode: "completed",
    },
  ];

  return reports.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

function rowStatusForReport(row: { status?: XPassRowStatus }, report: RecentReport, rowIndex: number, groupIndex: number): XPassRowStatus {
  if (row.status === "N/A") return "N/A";
  if (report.mode === "completed") return "PASS";
  if (report.mode === "attention") return (rowIndex + groupIndex) % 7 === 0 ? "WARNING" : "PASS";
  if (report.status === "PASS") return row.status ?? "PASS";
  if (report.status === "FAIL") return (rowIndex + groupIndex) % 5 === 0 ? "FAIL" : "PASS";
  if (report.status === "ALERT") return (rowIndex + groupIndex) % 5 === 0 ? "ALERT" : "PASS";
  if (report.status === "WARNING") return (rowIndex + groupIndex) % 6 === 0 ? "WARNING" : "PASS";
  return row.status ?? "WAITING";
}

function checklistFor(product: XPassProduct, report: RecentReport): XPassChecklistGroup[] {
  const result = resultFor(product.id);
  const currentStatus = dogfoodToRowStatus(result?.status);
  const selectedStatus = report.status === "WAITING" ? currentStatus : report.status;

  const groups: XPassChecklistGroup[] = [
    {
      title: "Current run gate",
      rows: [
        {
          title: "Build request selected",
          comment: `${report.date} / ${report.title}`,
          status: report.mode === "latest" && selectedStatus === "WAITING" ? "WAITING" : "PASS",
        },
        {
          title: "Receipt evidence",
          comment: report.summary,
          status: selectedStatus,
        },
        {
          title: "Loop until green",
          comment: "The report must keep working through failures until every relevant row is PASS or N/A.",
          status: selectedStatus === "WAITING" ? "WAITING" : selectedStatus === "PASS" ? "PASS" : "WARNING",
        },
        {
          title: "N/A is explained",
          comment: "A skipped row is only N/A when the comment explains why the check does not apply.",
          status: "PASS",
        },
        {
          title: "Owner action is clear",
          comment: "Any FAIL, ALERT, or Warning row must say who or what fixes it next.",
          status: ["FAIL", "ALERT", "WARNING"].includes(selectedStatus) ? "WARNING" : "PASS",
        },
      ],
    },
    ...XPASS_PRODUCT_CHECKLISTS[product.id],
  ];

  return groups.map((group, groupIndex) => ({
    ...group,
    rows: group.rows.map((row, rowIndex) => ({
      ...row,
      status: rowStatusForReport(row, report, rowIndex, groupIndex),
    })),
  }));
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
  const checkCount = countChecklistRows(product.id) + 5;
  const groupCount = countChecklistGroups(product.id) + 1;

  return (
    <Link
      to={`/admin/checks/${product.id}`}
      className="min-h-[132px] rounded-lg border border-white/[0.08] bg-[#111] p-4 transition-colors hover:border-[#61C1C4]/45 hover:bg-[#61C1C4]/[0.07]"
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
        <ExternalLink className="h-3.5 w-3.5 text-[#61C1C4]" />
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

function RecentReports({
  reports,
  selectedReport,
  onSelectReport,
}: {
  reports: RecentReport[];
  selectedReport: RecentReport;
  onSelectReport: (reportId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleReports = expanded ? reports : reports.slice(0, 6);
  const hiddenCount = Math.max(0, reports.length - visibleReports.length);

  return (
    <section className="min-w-0 rounded-lg border border-white/[0.08] bg-[#111] p-3">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">Recent reports</h2>
        <p className="text-[11px] font-medium text-white/40">Newest first</p>
      </div>
      <div className="mt-2 max-h-[236px] space-y-1 overflow-y-auto pr-1">
        {visibleReports.map((report) => {
          const selected = report.id === selectedReport.id;
          return (
            <button
              key={report.id}
              type="button"
              aria-pressed={selected}
              data-testid="xpass-report-option"
              onClick={() => onSelectReport(report.id)}
              className={`grid min-h-7 w-full min-w-0 grid-cols-[82px_minmax(0,1fr)_68px] items-center gap-2 rounded border px-2 py-1 text-left transition-colors ${
                selected ? "border-[#61C1C4]/70 bg-[#61C1C4]/10" : "border-white/[0.07] bg-black/20 hover:border-white/15"
              }`}
            >
              <p className="truncate text-[10px] font-semibold text-white/55">{report.date}</p>
              <p className="truncate text-[11px] leading-4 text-white/70">{report.title}</p>
              <StatusBadge status={report.status} />
            </button>
          );
        })}
      </div>
      {hiddenCount > 0 ? (
        <button
          type="button"
          className="mt-2 min-h-7 w-full rounded border border-white/[0.08] bg-black/20 px-2 text-[11px] font-semibold text-[#61C1C4] hover:border-[#61C1C4]/40"
          onClick={() => setExpanded(true)}
        >
          Load {hiddenCount} more
        </button>
      ) : null}
      <p className="mt-2 text-[11px] leading-4 text-white/45">
        Selected report: {selectedReport.date}. The checklist below shows that report's row results.
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

function ChecklistGroupView({ group }: { group: XPassChecklistGroup }) {
  return (
    <section className="rounded-lg border border-white/[0.08] bg-[#111] p-3">
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
  const familyCheckCount = countFamilyChecklistRows() + PRODUCTS.length * 5;

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-white/[0.08] bg-[#111] p-6">
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
        <p className="mt-1 text-xs text-white/45">Pick a Pass to see its product-specific checklist and recent reports.</p>
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
  const [searchParams, setSearchParams] = useSearchParams();
  const Icon = product.icon;
  const checkCount = countChecklistRows(product.id) + 5;
  const groupCount = countChecklistGroups(product.id) + 1;
  const reports = reportsFor(product);
  const selectedReport = reports.find((report) => report.id === searchParams.get("report")) ?? reports[0];

  function handleSelectReport(reportId: string) {
    const next = new URLSearchParams(searchParams);
    next.set("report", reportId);
    setSearchParams(next, { replace: true });
  }

  return (
    <div className="space-y-6">
      <Link to="/admin/checks" className="inline-flex min-h-8 items-center text-sm font-medium text-[#61C1C4] hover:opacity-80">
        Back to XPass
      </Link>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="min-w-0 rounded-lg border border-white/[0.08] bg-[#111] p-6">
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
        <RecentReports reports={reports} selectedReport={selectedReport} onSelectReport={handleSelectReport} />
      </div>

      <section className="space-y-3" data-testid="xpass-checklist-results">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-white">Checklist results</h2>
            <p className="mt-1 text-xs text-white/45">
              {selectedReport.date} / {selectedReport.title}
            </p>
          </div>
          <StatusBadge status={selectedReport.status} />
        </div>
          {checklistFor(product, selectedReport).map((group) => (
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
      <div className="rounded-lg border border-white/[0.08] bg-[#111] p-6">
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
