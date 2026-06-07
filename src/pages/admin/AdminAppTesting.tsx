import { useMemo, useState } from "react";
import { FlaskConical, CheckCircle2, AlertTriangle, XCircle, Search, ArrowUpDown } from "lucide-react";
import testResults from "@/data/app-test-results.json";
import appCatalog from "@/data/app-catalog.generated.json";

const YELLOW = "#E2B93B";

type Status = "pass" | "attention" | "fail";

interface TestResult {
  status: Status;
  note: string;
  testedAt: string;
  toolsTested: string[];
}

interface AppEntry {
  slug: string;
  name: string;
  category: string;
  toolCount: number;
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; border: string; icon: typeof CheckCircle2 }> = {
  pass: { label: "Pass", color: "#4ade80", bg: "bg-green-400/10", border: "border-green-400/20", icon: CheckCircle2 },
  attention: { label: "Attention", color: "#fbbf24", bg: "bg-amber-400/10", border: "border-amber-400/20", icon: AlertTriangle },
  fail: { label: "Fail", color: "#f87171", bg: "bg-red-400/10", border: "border-red-400/20", icon: XCircle },
};

const ALL_STATUSES: Status[] = ["pass", "attention", "fail"];

type SortKey = "name" | "status" | "testedAt" | "category";

const results = testResults.results as Record<string, TestResult>;

const appMap = new Map<string, AppEntry>();
for (const app of (appCatalog.apps as AppEntry[])) {
  appMap.set(app.slug, app);
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminAppTesting() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    for (const app of appMap.values()) cats.add(app.category);
    return Array.from(cats).sort();
  }, []);

  const rows = useMemo(() => {
    const allSlugs = new Set([...Object.keys(results), ...appMap.keys()]);
    const items = Array.from(allSlugs).map((slug) => {
      const result = results[slug];
      const app = appMap.get(slug);
      return {
        slug,
        name: app?.name ?? slug,
        category: app?.category ?? "Unknown",
        toolCount: app?.toolCount ?? 0,
        status: result?.status ?? ("untested" as Status),
        note: result?.note ?? "",
        testedAt: result?.testedAt ?? "",
        toolsTested: result?.toolsTested ?? [],
      };
    });

    let filtered = items;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (r) => r.name.toLowerCase().includes(q) || r.slug.toLowerCase().includes(q) || r.note.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "status": {
          const order: Record<string, number> = { fail: 0, attention: 1, pass: 2, untested: 3 };
          cmp = (order[a.status] ?? 4) - (order[b.status] ?? 4);
          break;
        }
        case "testedAt":
          cmp = (a.testedAt || "z").localeCompare(b.testedAt || "z");
          break;
        case "category":
          cmp = a.category.localeCompare(b.category);
          break;
      }
      return sortAsc ? cmp : -cmp;
    });

    return filtered;
  }, [search, statusFilter, categoryFilter, sortKey, sortAsc]);

  const counts = useMemo(() => {
    const c = { pass: 0, attention: 0, fail: 0, total: 0 };
    for (const r of Object.values(results)) {
      c.total++;
      if (r.status === "pass") c.pass++;
      else if (r.status === "attention") c.attention++;
      else if (r.status === "fail") c.fail++;
    }
    return c;
  }, []);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v);
    else { setSortKey(key); setSortAsc(true); }
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" style={{ color: YELLOW }} />
            <h1 className="text-2xl font-semibold text-white">App Testing</h1>
          </div>
          <p className="mt-1 text-sm text-[#888]">
            MCP connector smoke-test results. Each app is tested with safe read-only calls.
          </p>
        </div>
        <div className="text-right text-xs text-[#666]">
          Last updated: {testResults.updatedAt ? new Date(testResults.updatedAt).toLocaleDateString() : "N/A"}
        </div>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard label="Total tested" value={counts.total} color="#fff" />
        <SummaryCard label="Pass" value={counts.pass} color="#4ade80" />
        <SummaryCard label="Attention" value={counts.attention} color="#fbbf24" />
        <SummaryCard label="Fail" value={counts.fail} color="#f87171" />
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2 pl-9 pr-3 text-sm text-white placeholder:text-[#666] focus:border-white/20 focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-[#ccc]"
        >
          <option value="all">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_CONFIG[s].label} ({s === "pass" ? counts.pass : s === "attention" ? counts.attention : counts.fail})</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-[#ccc]"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Results table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#111111]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-xs uppercase tracking-wider text-[#666]">
              <SortHeader label="App" sortKey="name" current={sortKey} asc={sortAsc} onClick={toggleSort} />
              <SortHeader label="Status" sortKey="status" current={sortKey} asc={sortAsc} onClick={toggleSort} />
              <SortHeader label="Category" sortKey="category" current={sortKey} asc={sortAsc} onClick={toggleSort} />
              <th className="px-4 py-3">Note</th>
              <th className="px-4 py-3">Tools tested</th>
              <SortHeader label="Tested" sortKey="testedAt" current={sortKey} asc={sortAsc} onClick={toggleSort} />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {rows.map((row) => {
              const cfg = STATUS_CONFIG[row.status as Status];
              const Icon = cfg?.icon ?? AlertTriangle;
              return (
                <tr key={row.slug} className="transition-colors hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-white">{row.name}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {cfg ? (
                      <span className={`inline-flex items-center gap-1.5 rounded-full ${cfg.bg} border ${cfg.border} px-2.5 py-0.5 text-xs font-medium`} style={{ color: cfg.color }}>
                        <Icon className="h-3 w-3" />
                        {cfg.label}
                      </span>
                    ) : (
                      <span className="text-xs text-[#666]">Untested</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-[#888]">{row.category}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-xs text-[#999]" title={row.note}>{row.note || "-"}</td>
                  <td className="px-4 py-3 text-xs text-[#666]">
                    {row.toolsTested.length > 0 ? (
                      <span className="font-mono">{row.toolsTested.join(", ")}</span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-[#666]">
                    {row.testedAt ? relativeTime(row.testedAt) : "-"}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-[#666]">
                  No results match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-right text-xs text-[#666]">
        Showing {rows.length} of {Object.keys(results).length} apps
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-4">
      <div className="text-xs uppercase tracking-wider text-[#888]">{label}</div>
      <div className="mt-1 text-2xl font-semibold" style={{ color }}>{value}</div>
    </div>
  );
}

function SortHeader({ label, sortKey, current, asc, onClick }: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  asc: boolean;
  onClick: (key: SortKey) => void;
}) {
  const active = current === sortKey;
  return (
    <th className="px-4 py-3">
      <button
        type="button"
        onClick={() => onClick(sortKey)}
        className="inline-flex items-center gap-1 hover:text-white"
      >
        {label}
        <ArrowUpDown className={`h-3 w-3 ${active ? "text-white" : ""}`} style={active ? { transform: asc ? "none" : "scaleY(-1)" } : undefined} />
      </button>
    </th>
  );
}
