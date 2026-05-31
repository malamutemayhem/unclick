import { Link, useParams } from "react-router-dom";
import {
  BadgeCheck,
  CheckCircle2,
  CircleMinus,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileText,
  KeyRound,
  LayoutGrid,
  MessagesSquare,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { dogfoodReport, type DogfoodStatus } from "@/data/dogfoodReport";

type ProductId =
  | "testpass"
  | "uxpass"
  | "securitypass"
  | "copypass"
  | "fidelitypass"
  | "legalpass"
  | "sloppass"
  | "commonsensepass"
  | "seopass"
  | "geopass"
  | "flowpass"
  | "rotatepass"
  | "wakepass"
  | "compliancepass";

type RowStatus = "PASS" | "FAIL" | "N/A" | "WARNING" | "WAITING";

type XPassProduct = {
  id: ProductId;
  name: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  externalHref?: string;
};

type RecentReport = {
  date: string;
  title: string;
  status: RowStatus;
};

type ChecklistRow = {
  title: string;
  comment: string;
  status: RowStatus;
};

type ChecklistGroup = {
  title: string;
  rows: ChecklistRow[];
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
    id: "uxpass",
    name: "UXPass",
    subtitle: "Is it easy to use?",
    description: "Checks screens, mobile fit, hierarchy, clarity, and polish.",
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

const STATUS_STYLE: Record<RowStatus, { label: string; className: string; icon: LucideIcon }> = {
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
  WAITING: {
    label: "Waiting",
    className: "bg-white/12 text-white/70",
    icon: Clock3,
  },
};

function dogfoodToRowStatus(status?: DogfoodStatus): RowStatus {
  if (status === "passing") return "PASS";
  if (status === "failing" || status === "blocked") return "FAIL";
  return "WAITING";
}

function productById(id?: string): XPassProduct | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

function resultFor(id: ProductId) {
  return dogfoodReport.results.find((result) => result.id === id);
}

function reportsFor(product: XPassProduct): RecentReport[] {
  const result = resultFor(product.id);
  const status = dogfoodToRowStatus(result?.status);

  return [
    {
      date: "Latest",
      title: result?.summary ?? `${product.name} report`,
      status,
    },
    {
      date: "On demand",
      title: `${product.name} checklist`,
      status: product.id === "fidelitypass" ? "N/A" : "WAITING",
    },
    {
      date: "Next",
      title: result?.nextProof ?? "Ready for the next XPass run",
      status: status === "PASS" ? "PASS" : "WARNING",
    },
  ];
}

function checklistFor(product: XPassProduct): ChecklistGroup[] {
  const result = resultFor(product.id);
  const currentStatus = dogfoodToRowStatus(result?.status);
  const exactCopy = product.id === "fidelitypass";

  return [
    {
      title: "Roadworthy checks",
      rows: [
        {
          title: "Scope is clear",
          comment: `This report knows when to use ${product.name}.`,
          status: "PASS",
        },
        {
          title: "Evidence is available",
          comment: result?.summary ?? "The product exists, but this public report has not run it yet.",
          status: currentStatus,
        },
        {
          title: "Result is easy to explain",
          comment: "The row must have a short plain comment any person can understand.",
          status: "PASS",
        },
        {
          title: "Skipped work is honest",
          comment: exactCopy
            ? "N/A is correct when no exact source copy is in scope."
            : "If this check does not apply, XPass must say why.",
          status: exactCopy ? "N/A" : "PASS",
        },
        {
          title: "Needs owner action",
          comment: currentStatus === "FAIL" ? "Someone needs to fix this before the report is green." : "No blocker in the current report.",
          status: currentStatus === "FAIL" ? "FAIL" : "PASS",
        },
      ],
    },
    {
      title: "Continuous improvement",
      rows: [
        {
          title: "Weak comments get improved",
          comment: "If a result is vague, XPass should improve the checklist for next time.",
          status: "PASS",
        },
        {
          title: "Repeated misses create a job",
          comment: "Real misses should feed the improvement queue instead of being forgotten.",
          status: "PASS",
        },
        {
          title: "Internal proof stays available",
          comment: "Technical receipts exist behind the report, but do not clutter the main view.",
          status: "PASS",
        },
      ],
    },
  ];
}

function StatusBadge({ status }: { status: RowStatus }) {
  const style = STATUS_STYLE[status];
  const Icon = style.icon;

  return (
    <span className={`inline-flex min-w-[74px] items-center justify-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold ${style.className}`}>
      <Icon className="h-3 w-3" />
      {style.label}
    </span>
  );
}

function ProductCard({ product }: { product: XPassProduct }) {
  const Icon = product.icon;

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
      <div className="mt-3 flex justify-end text-[#61C1C4]">
        <ExternalLink className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}

function RecentReports({ product }: { product: XPassProduct }) {
  return (
    <aside className="rounded-lg border border-white/[0.08] bg-[#111] p-4">
      <h2 className="text-sm font-semibold text-white">Recent reports</h2>
      <div className="mt-3 space-y-2">
        {reportsFor(product).map((report) => (
          <div key={`${report.date}-${report.title}`} className="rounded-md border border-white/[0.07] bg-black/20 px-3 py-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold text-white/55">{report.date}</p>
              <StatusBadge status={report.status} />
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/65">{report.title}</p>
          </div>
        ))}
      </div>
      <Link
        to="/dogfood"
        className="mt-4 inline-flex min-h-7 items-center gap-1.5 text-xs font-medium text-[#61C1C4] transition-opacity hover:opacity-80"
      >
        View public report
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </aside>
  );
}

function ChecklistGroupView({ group }: { group: ChecklistGroup }) {
  return (
    <section className="rounded-lg border border-white/[0.08] bg-[#111] p-4">
      <h2 className="text-sm font-semibold text-white">{group.title}</h2>
      <div className="mt-3 overflow-hidden rounded-md border border-white/[0.08]">
        {group.rows.map((row) => (
          <div
            key={`${group.title}-${row.title}`}
            className="grid min-h-9 grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-white/[0.06] bg-black/20 px-3 py-2 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)_90px] md:items-center"
          >
            <p className="truncate text-xs font-semibold text-white">{row.title}</p>
            <p className="col-span-2 text-xs leading-5 text-white/55 md:col-span-1">{row.comment}</p>
            <StatusBadge status={row.status} />
          </div>
        ))}
      </div>
    </section>
  );
}

function XPassHome() {
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
              XPass is the roadworthy inspection for UnClick work. Each Pass checks one part of the job, then leaves
              a simple result and a plain comment.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-white">XPass family</h2>
        <p className="mt-1 text-xs text-white/45">Pick a Pass to see its report, recent runs, and checklist.</p>
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

  return (
    <div className="space-y-6">
      <Link to="/admin/checks" className="inline-flex min-h-8 items-center text-sm font-medium text-[#61C1C4] hover:opacity-80">
        Back to XPass
      </Link>

      <section className="rounded-lg border border-white/[0.08] bg-[#111] p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30">
            <Icon className="h-5 w-5 text-[#61C1C4]" />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-white">{product.name}</h1>
            <p className="mt-1 text-sm font-semibold text-white/70">{product.subtitle}</p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">{product.description}</p>
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

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5">
          {checklistFor(product).map((group) => (
            <ChecklistGroupView key={group.title} group={group} />
          ))}
        </div>
        <RecentReports product={product} />
      </div>
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
