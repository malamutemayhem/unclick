import { useMemo, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  CheckCircle2,
  CircleMinus,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileText,
  GitPullRequest,
  KeyRound,
  LayoutList,
  MessagesSquare,
  PlayCircle,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  XCircle,
} from "lucide-react";
import {
  dogfoodReport,
  type DogfoodPassResult,
  type DogfoodStatus,
  type XPassIndexEntry,
} from "@/data/dogfoodReport";

type XPassStatus = "PASS" | "BLOCKER" | "N/A" | "NOT RUN" | "MISSING";

type ProductDetail = {
  id: string;
  name: string;
  short: string;
  plain: string;
  useWhen: string;
  href?: string;
  icon: ComponentType<{ className?: string }>;
};

type ReportRow = {
  id: string;
  title: string;
  date: string;
  status: XPassStatus;
  note: string;
  productIds: string[];
};

type ChecklistRow = {
  id: string;
  product: ProductDetail;
  status: XPassStatus;
  comment: string;
};

type RunTemplate = {
  id: string;
  title: string;
  target: string;
  passIds: string[];
  notApplicableIds: string[];
  firstAction: string;
};

type ImprovementRow = {
  id: string;
  productId: string;
  signal: string;
  nextAction: string;
  proof: string;
};

const PRODUCT_ORDER = [
  "testpass",
  "uxpass",
  "securitypass",
  "copypass",
  "fidelitypass",
  "legalpass",
  "sloppass",
  "commonsensepass",
  "seopass",
  "geopass",
  "flowpass",
  "rotatepass",
  "wakepass",
  "compliancepass",
] as const;

const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  testpass: {
    id: "testpass",
    name: "TestPass",
    short: "Does it work?",
    plain: "Checks the build, tool, or workflow behaves the way it says it does.",
    useWhen: "Use on PRs, MCP tools, releases, and anything that needs functional proof.",
    href: "/admin/testpass",
    icon: ClipboardCheck,
  },
  uxpass: {
    id: "uxpass",
    name: "UXPass",
    short: "Is it easy to use?",
    plain: "Checks screens, flows, mobile fit, hierarchy, clarity, and polish.",
    useWhen: "Use on admin pages, public pages, onboarding, forms, and product changes.",
    icon: UserCheck,
  },
  securitypass: {
    id: "securitypass",
    name: "SecurityPass",
    short: "Is it safe enough?",
    plain: "Checks safe security evidence without exposing secrets or running unsafe probes.",
    useWhen: "Use on auth, keys, connectors, APIs, protected routes, and risky changes.",
    icon: ShieldCheck,
  },
  copypass: {
    id: "copypass",
    name: "CopyPass",
    short: "Is the wording clear?",
    plain: "Checks copy, claims, tone, trust, and AI-slop risk.",
    useWhen: "Use on hero copy, emails, product text, pricing, ads, docs, and support wording.",
    href: "/admin/copypass",
    icon: FileText,
  },
  fidelitypass: {
    id: "fidelitypass",
    name: "FidelityPass",
    short: "Was it copied exactly?",
    plain: "Wraps CopyRoom proof when wording, labels, prompts, or tables must match 1:1.",
    useWhen: "Use when the job asks for exact copying, transcription, mirroring, or preservation.",
    icon: BadgeCheck,
  },
  legalpass: {
    id: "legalpass",
    name: "LegalPass",
    short: "Is the risk language honest?",
    plain: "Checks policy, terms, disclaimers, and legal-risk wording as guidance, not legal advice.",
    useWhen: "Use on terms, privacy, claims, disclaimers, and regulated-sounding promises.",
    icon: FileText,
  },
  sloppass: {
    id: "sloppass",
    name: "SlopPass",
    short: "Is the code sloppy?",
    plain: "Checks AI-code smells, maintainability risk, stale diffs, and public code quality signals.",
    useWhen: "Use on PR diffs, generated code, rushed patches, and quality-review requests.",
    icon: SearchCheck,
  },
  commonsensepass: {
    id: "commonsensepass",
    name: "CommonSensePass",
    short: "Does the claim make sense?",
    plain: "Stops false green lights, proofless DONE claims, stale receipts, and noisy health claims.",
    useWhen: "Use before healthy, quiet, done, merge-ready, PASS, or no-work claims.",
    icon: MessagesSquare,
  },
  seopass: {
    id: "seopass",
    name: "SEOPass",
    short: "Can search read it?",
    plain: "Checks metadata, crawl basics, public page readiness, and search-result clarity.",
    useWhen: "Use on public pages, metadata, sitemap, robots, docs, and launch pages.",
    icon: SearchCheck,
  },
  geopass: {
    id: "geopass",
    name: "GEOPass",
    short: "Can answer engines understand it?",
    plain: "Checks AI-search readability, structured context, and answer-engine handoff quality.",
    useWhen: "Use on public pages that need to be understood by AI assistants and answer engines.",
    icon: Sparkles,
  },
  flowpass: {
    id: "flowpass",
    name: "FlowPass",
    short: "Can the user finish the path?",
    plain: "Checks journeys, handoffs, forms, onboarding, and completion evidence.",
    useWhen: "Use on sign-up, checkout, setup, job flow, admin flow, and handoff paths.",
    icon: Workflow,
  },
  rotatepass: {
    id: "rotatepass",
    name: "RotatePass",
    short: "Are credentials handled cleanly?",
    plain: "Checks rotation hygiene and redaction boundaries without touching real secrets.",
    useWhen: "Use on Passport, keys, connector hygiene, and credential lifecycle work.",
    icon: KeyRound,
  },
  wakepass: {
    id: "wakepass",
    name: "WakePass",
    short: "Will someone act on it?",
    plain: "Checks stale work, missed ACKs, owner handoff, and action-needed routing.",
    useWhen: "Use when proof needs an owner, a schedule misses, or a receipt goes stale.",
    icon: Clock3,
  },
  compliancepass: {
    id: "compliancepass",
    name: "CompliancePass",
    short: "Is the readiness story sensible?",
    plain: "Checks compliance posture and enterprise-readiness evidence without claiming certification.",
    useWhen: "Use on enterprise, audit, readiness, policy, and future-regret reviews.",
    icon: ShieldCheck,
  },
};

const STATUS_STYLE: Record<XPassStatus, { label: string; classes: string; icon: ComponentType<{ className?: string }> }> = {
  PASS: {
    label: "Tick",
    classes: "border-[#61C1C4]/35 bg-[#61C1C4]/10 text-[#9edfe1]",
    icon: CheckCircle2,
  },
  BLOCKER: {
    label: "Cross",
    classes: "border-red-500/35 bg-red-500/10 text-red-300",
    icon: XCircle,
  },
  "N/A": {
    label: "N/A",
    classes: "border-white/15 bg-white/[0.04] text-white/55",
    icon: CircleMinus,
  },
  "NOT RUN": {
    label: "Waiting",
    classes: "border-[#E2B93B]/35 bg-[#E2B93B]/10 text-[#f1d878]",
    icon: Clock3,
  },
  MISSING: {
    label: "MISSING",
    classes: "border-orange-400/35 bg-orange-400/10 text-orange-200",
    icon: XCircle,
  },
};

const REPORTS: ReportRow[] = [
  {
    id: "public-dogfood",
    title: "Latest XPass report",
    date: "Current public proof",
    status: statusFromDogfood(dogfoodReport.status),
    note: "The current checklist. Each row has a result and a plain comment.",
    productIds: [...PRODUCT_ORDER],
  },
  {
    id: "pr-backed-sweep",
    title: "Full suite closeout",
    date: "In progress",
    status: "NOT RUN",
    note: "The final family report appears here after every product check is folded into main.",
    productIds: ["securitypass", "copypass", "legalpass", "seopass", "geopass", "flowpass", "uxpass", "rotatepass", "wakepass", "compliancepass"],
  },
  {
    id: "source-copy",
    title: "Exact copy check",
    date: "On demand",
    status: "N/A",
    note: "Use this only when wording, tables, prompts, or labels must match exactly.",
    productIds: ["copypass", "fidelitypass", "commonsensepass"],
  },
];

const GUIDED_RUNS: RunTemplate[] = [
  {
    id: "code-pr",
    title: "Code or PR",
    target: "Pull request, MCP tool, backend change, or release.",
    passIds: ["testpass", "securitypass", "sloppass", "commonsensepass"],
    notApplicableIds: ["fidelitypass"],
    firstAction: "Check the change, record the result for each useful Pass, and explain any skipped rows.",
  },
  {
    id: "screen-flow",
    title: "Screen or journey",
    target: "Admin page, public page, form, signup, or onboarding path.",
    passIds: ["uxpass", "flowpass", "copypass", "seopass", "geopass", "commonsensepass"],
    notApplicableIds: ["fidelitypass", "rotatepass"],
    firstAction: "Capture desktop and mobile proof, then leave a plain checklist comment.",
  },
  {
    id: "copy-source",
    title: "Copy or exact source",
    target: "Wording, table, label, prompt, supplied text, or source material.",
    passIds: ["copypass", "fidelitypass", "legalpass", "commonsensepass"],
    notApplicableIds: ["uxpass", "rotatepass"],
    firstAction: "Use CopyRoom when exact copying is in scope, then wrap the receipt with FidelityPass.",
  },
  {
    id: "keys-policy",
    title: "Keys or policy",
    target: "Credentials, auth, privacy, compliance, public claims, or trust wording.",
    passIds: ["securitypass", "rotatepass", "legalpass", "compliancepass", "commonsensepass"],
    notApplicableIds: ["fidelitypass"],
    firstAction: "Prove redaction boundaries first, then keep compliance and legal language guidance-only.",
  },
];

const IMPROVEMENT_QUEUE: ImprovementRow[] = [
  {
    id: "ux-visual-depth",
    productId: "uxpass",
    signal: "Visual critique needs stronger hierarchy and mobile judgment.",
    nextAction: "Add annotated reports and recurring visual proof that does not clog the queue.",
    proof: "UXPass closure item",
  },
  {
    id: "na-reasons",
    productId: "fidelitypass",
    signal: "N/A rows must explain why exact copying was not in scope.",
    nextAction: "Keep the FidelityPass wrapper tied to CopyRoom receipts and explicit N/A reasons.",
    proof: "FidelityPass receipt wrapper",
  },
  {
    id: "stale-green",
    productId: "commonsensepass",
    signal: "Green-looking work can still be stale, proofless, or out of scope.",
    nextAction: "Keep stale receipt and proofless DONE checks near every XPass run.",
    proof: "CommonSensePass worker exposure",
  },
];

function statusFromDogfood(status: DogfoodStatus): XPassStatus {
  if (status === "passing") return "PASS";
  if (status === "failing" || status === "blocked") return "BLOCKER";
  return "NOT RUN";
}

function formatStage(entry?: XPassIndexEntry): string {
  if (!entry) return "Package-ready";
  return entry.label;
}

function findDogfoodResult(productId: string): DogfoodPassResult | undefined {
  return dogfoodReport.results.find((result) => result.id === productId);
}

function commentFor(product: ProductDetail, report: ReportRow): string {
  if (product.id === "fidelitypass" && report.id !== "source-copy") {
    return "N/A because this report is not checking exact copied source material.";
  }

  const result = findDogfoodResult(product.id);
  if (result?.status === "passing" && product.id === "securitypass") {
    return "Tick. The safe security boundary passed without exposing secrets or running unsafe probes.";
  }
  if (result?.status === "passing" && product.id === "compliancepass") {
    return "Tick. The readiness scan passed and the wording stays careful about certification.";
  }
  if (result?.status === "pending") {
    return "Waiting. This check is available, but this report has not run it yet.";
  }
  if (result?.summary) return result.summary;

  return product.plain;
}

function statusFor(productId: string, report: ReportRow): XPassStatus {
  if (!report.productIds.includes(productId)) return "N/A";
  if (productId === "fidelitypass" && report.id !== "source-copy") return "N/A";
  if (report.id === "source-copy") return productId === "fidelitypass" ? "N/A" : "NOT RUN";

  const result = findDogfoodResult(productId);
  return result ? statusFromDogfood(result.status) : report.status;
}

function StatusPill({ status }: { status: XPassStatus }) {
  const style = STATUS_STYLE[status];
  const Icon = style.icon;

  return (
    <span className={`inline-flex min-w-[86px] items-center justify-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${style.classes}`}>
      <Icon className="h-3.5 w-3.5" />
      {style.label}
    </span>
  );
}

function ReportButton({
  report,
  selected,
  onClick,
}: {
  report: ReportRow;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`w-full rounded-lg border px-3 py-3 text-left transition-colors ${
        selected
          ? "border-[#61C1C4]/40 bg-[#61C1C4]/10"
          : "border-white/[0.06] bg-[#111] hover:border-white/15 hover:bg-white/[0.03]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{report.title}</p>
          <p className="mt-0.5 text-xs text-white/45">{report.date}</p>
        </div>
        <StatusPill status={report.status} />
      </div>
      <p className="mt-2 text-xs leading-5 text-white/50">{report.note}</p>
    </button>
  );
}

function ProductTab({
  product,
  selected,
  onClick,
}: {
  product: ProductDetail;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = product.icon;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-[72px] rounded-lg border px-3 py-3 text-left transition-colors ${
        selected
          ? "border-[#61C1C4]/40 bg-[#61C1C4]/10"
          : "border-white/[0.06] bg-[#111] hover:border-white/15 hover:bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-[#61C1C4]" />
        <span className="truncate text-sm font-semibold text-white">{product.name}</span>
      </div>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/50">{product.short}</p>
    </button>
  );
}

function ChecklistRows({ rows }: { rows: ChecklistRow[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08]">
      {rows.map((row) => {
        const Icon = row.product.icon;

        return (
          <div
            key={row.id}
            className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 border-b border-white/[0.06] bg-[#0f0f0f] px-3 py-2.5 text-sm last:border-b-0 sm:grid-cols-[minmax(150px,0.75fr)_96px_minmax(0,1.35fr)] sm:items-center"
          >
            <div className="flex min-w-0 items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-white/45" />
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{row.product.name}</p>
                <p className="truncate text-xs text-white/40">{row.product.short}</p>
              </div>
            </div>
            <StatusPill status={row.status} />
            <p className="col-span-2 min-w-0 text-xs leading-5 text-white/55 sm:col-span-1">{row.comment}</p>
          </div>
        );
      })}
    </div>
  );
}

function ProductNameList({
  ids,
  productsById,
}: {
  ids: string[];
  productsById: Map<string, ProductDetail>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => {
        const product = productsById.get(id);
        if (!product) return null;

        return (
          <span
            key={id}
            className="inline-flex min-h-7 items-center rounded-full border border-white/[0.08] bg-black/20 px-2.5 text-xs font-medium text-white/65"
          >
            {product.name}
          </span>
        );
      })}
    </div>
  );
}

function GuidedRunPlanner({
  activeRun,
  productsById,
  onSelectRun,
}: {
  activeRun: RunTemplate;
  productsById: Map<string, ProductDetail>;
  onSelectRun: (runId: string) => void;
}) {
  return (
    <section className="rounded-lg border border-white/[0.08] bg-[#111] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-[#61C1C4]" />
            <h2 className="text-sm font-semibold text-white">Start a report</h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
            Pick the closest job type. XPass shows which checks matter and which ones can be marked N/A.
          </p>
        </div>
        <Link
          to="/admin/testpass/new"
          className="inline-flex min-h-8 shrink-0 items-center gap-1.5 text-sm font-medium text-[#61C1C4] transition-opacity hover:opacity-80"
        >
          Open guided run
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {GUIDED_RUNS.map((run) => (
          <button
            key={run.id}
            type="button"
            aria-pressed={run.id === activeRun.id}
            onClick={() => onSelectRun(run.id)}
            className={`min-h-[78px] rounded-lg border px-3 py-3 text-left transition-colors ${
              run.id === activeRun.id
                ? "border-[#61C1C4]/40 bg-[#61C1C4]/10"
                : "border-white/[0.06] bg-black/20 hover:border-white/15 hover:bg-white/[0.03]"
            }`}
          >
            <p className="text-sm font-semibold text-white">{run.title}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/50">{run.target}</p>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.6fr)]">
        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">Run these</p>
          <div className="mt-3">
            <ProductNameList ids={activeRun.passIds} productsById={productsById} />
          </div>
          <p className="mt-4 text-sm leading-6 text-white/55">{activeRun.firstAction}</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">Mark N/A now</p>
          <div className="mt-3">
            <ProductNameList ids={activeRun.notApplicableIds} productsById={productsById} />
          </div>
          <p className="mt-4 text-xs leading-5 text-white/45">
            N/A means the check was considered and does not fit this job.
          </p>
        </div>
      </div>
    </section>
  );
}

function ImprovementQueue({ productsById }: { productsById: Map<string, ProductDetail> }) {
  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-[#E2B93B]/20">
      {IMPROVEMENT_QUEUE.map((row) => {
        const product = productsById.get(row.productId);

        return (
          <div
            key={row.id}
            className="grid gap-2 border-b border-[#E2B93B]/15 bg-black/15 px-3 py-2.5 text-sm last:border-b-0 md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)_150px] md:items-center"
          >
            <p className="font-medium text-white">{product?.name ?? row.productId}</p>
            <p className="text-xs leading-5 text-[#e8dca8]">{row.signal}</p>
            <p className="text-xs leading-5 text-[#e8dca8]/75">{row.nextAction}</p>
            <p className="text-xs text-white/45">{row.proof}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminXPassHub() {
  const [activeProductId, setActiveProductId] = useState<string>("all");
  const [activeReportId, setActiveReportId] = useState<string>(REPORTS[0].id);
  const [activeRunId, setActiveRunId] = useState<string>(GUIDED_RUNS[0].id);

  const products = useMemo(
    () => PRODUCT_ORDER.map((id) => PRODUCT_DETAILS[id]).filter(Boolean),
    [],
  );
  const productsById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products],
  );
  const activeReport = REPORTS.find((report) => report.id === activeReportId) ?? REPORTS[0];
  const activeRun = GUIDED_RUNS.find((run) => run.id === activeRunId) ?? GUIDED_RUNS[0];
  const xpassIndexById = new Map(dogfoodReport.xpassIndex.map((entry) => [entry.id, entry]));
  const filteredProducts = activeProductId === "all"
    ? products
    : products.filter((product) => product.id === activeProductId);
  const checklistRows = filteredProducts.map((product) => ({
    id: `${activeReport.id}-${product.id}`,
    product,
    status: statusFor(product.id, activeReport),
    comment: commentFor(product, activeReport),
  }));
  const liveCount = dogfoodReport.xpassIndex.filter((entry) =>
    entry.stage === "live_gate" || entry.stage === "live_dogfood",
  ).length;

  return (
    <div className="space-y-8">
      <section className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-3 py-1 text-xs font-medium text-[#61C1C4]">
          <ClipboardCheck className="h-3.5 w-3.5" />
          AutoPilot / XPass
        </div>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)] lg:items-end">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight text-white">XPass Report</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
              XPass is AutoPilot's roadworthy checklist for work. Pick a report, read the rows, and use the comment
              to see what passed, what needs attention, and what does not apply.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-semibold text-white">{products.length}</p>
              <p className="mt-1 text-[11px] text-white/45">Products</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{liveCount}</p>
              <p className="mt-1 text-[11px] text-white/45">Live lanes</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{REPORTS.length}</p>
              <p className="mt-1 text-[11px] text-white/45">Reports</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)]">
        <div className="self-start rounded-lg border border-white/[0.08] bg-[#111] p-5">
          <div className="flex items-start gap-3">
            <LayoutList className="mt-0.5 h-5 w-5 shrink-0 text-[#61C1C4]" />
            <div>
              <h2 className="text-sm font-semibold text-white">How to read it</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Tick means the check is okay. Cross means it needs attention. N/A means it does not apply. Waiting
                means the check exists but this report has not run it yet.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {["Report", "Result", "Comment", "Next step"].map((label) => (
              <div key={label} className="rounded-md border border-white/[0.06] bg-black/20 px-3 py-2 text-xs font-medium text-white/65">
                {label}
              </div>
            ))}
          </div>
          <Link
            to="/admin/testpass/new"
            className="mt-4 inline-flex min-h-8 items-center gap-1.5 text-sm font-medium text-[#61C1C4] transition-opacity hover:opacity-80"
          >
            Start a report
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <GitPullRequest className="h-4 w-4 text-[#E2B93B]" />
            <h2 className="text-sm font-semibold text-white">Reports</h2>
          </div>
          {REPORTS.map((report) => (
            <ReportButton
              key={report.id}
              report={report}
              selected={report.id === activeReport.id}
              onClick={() => setActiveReportId(report.id)}
            />
          ))}
        </div>
      </section>

      <GuidedRunPlanner
        activeRun={activeRun}
        productsById={productsById}
        onSelectRun={setActiveRunId}
      />

      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Pass checks</h2>
            <p className="mt-1 text-xs text-white/45">Pick one check or keep the whole list in view.</p>
          </div>
          <Link
            to="/dogfood"
            className="inline-flex min-h-8 items-center gap-1.5 text-xs font-medium text-[#61C1C4] transition-opacity hover:opacity-80"
          >
            Public report
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            aria-pressed={activeProductId === "all"}
            onClick={() => setActiveProductId("all")}
            className={`min-h-[72px] rounded-lg border px-3 py-3 text-left transition-colors ${
              activeProductId === "all"
                ? "border-[#61C1C4]/40 bg-[#61C1C4]/10"
                : "border-white/[0.06] bg-[#111] hover:border-white/15 hover:bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-[#61C1C4]" />
              <span className="text-sm font-semibold text-white">All XPass</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-white/50">Whole checklist</p>
          </button>
          {products.map((product) => (
            <ProductTab
              key={product.id}
              product={product}
              selected={activeProductId === product.id}
              onClick={() => setActiveProductId(product.id)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Checklist</h2>
            <p className="mt-1 text-xs text-white/45">{activeReport.title}</p>
          </div>
          {activeProductId !== "all" ? (
            <div className="text-xs text-white/45">
              {formatStage(xpassIndexById.get(activeProductId))}
            </div>
          ) : null}
        </div>
        <ChecklistRows rows={checklistRows} />
      </section>

      {activeProductId !== "all" ? (
        <section className="rounded-lg border border-white/[0.08] bg-[#111] p-5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">{product.name}</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{product.short}</h2>
                <p className="mt-2 text-sm leading-6 text-white/55">{product.plain}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Use when</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{product.useWhen}</p>
                {product.href ? (
                  <Link
                    to={product.href}
                    className="mt-4 inline-flex min-h-8 items-center gap-1.5 text-sm font-medium text-[#61C1C4] transition-opacity hover:opacity-80"
                  >
                    Open {product.name}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <section className="rounded-lg border border-[#E2B93B]/25 bg-[#E2B93B]/[0.06] p-5">
        <div className="flex items-start gap-3">
          <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-[#E2B93B]" />
          <div>
            <h2 className="text-sm font-semibold text-white">Continuous improvement</h2>
            <p className="mt-2 text-sm leading-6 text-[#e8dca8]">
              If a Pass misses a real issue, blocks too loudly, or cannot explain its result, XPass should create an
              improvement signal. The checklist improves because real work teaches it what to check next.
            </p>
          </div>
        </div>
        <ImprovementQueue productsById={productsById} />
      </section>
    </div>
  );
}
