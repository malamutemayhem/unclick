import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import {
  Bot,
  BookOpen,
  Boxes,
  Fingerprint,
  LockKeyhole,
  Network,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  TableProperties,
  UsersRound,
} from "lucide-react";
import { useSession } from "@/lib/auth";
import brainmapMarkdown from "../../../docs/UnClick-brainmap.generated.md?raw";
import brainmapDataRaw from "../../../docs/UnClick-brainmap.generated.json?raw";

function getOwnerEmail() {
  return (import.meta.env.VITE_BRAINMAP_OWNER_EMAIL ?? "").trim().toLowerCase();
}
const MAX_VISUAL_ITEMS_PER_DIVISION = 24;
const sectionCount = (brainmapMarkdown.match(/^## /gm) || []).length;
const sourceCount = (brainmapMarkdown.match(/^\| .* \| [a-f0-9]{12} \| \d+ \|$/gm) || []).length;

type BrainmapDivision = {
  id: string;
  name: string;
  meaning: string;
  count: number;
};

type BrainmapItem = {
  id: string;
  division: string;
  name: string;
  kind: string;
  meaning: string;
  source: string;
  route?: string;
};

type BrainmapData = {
  schema_version: string;
  summary: string;
  counts: {
    divisions: number;
    inventory: number;
    source_manifest: number;
    pages: number;
    tools: number;
    rooms: number;
    workers: number;
  };
  divisions: BrainmapDivision[];
  inventory: BrainmapItem[];
  inductionRows: string[][];
};

const brainmapData = JSON.parse(brainmapDataRaw) as BrainmapData;

function normalizeEmail(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function itemMatchesQuery(item: BrainmapItem, query: string) {
  if (!query) return true;
  const haystack = `${item.division} ${item.kind} ${item.name} ${item.meaning} ${item.route ?? ""} ${item.source}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
      <div className="flex items-center gap-2 text-xs text-white/45">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1 font-mono text-2xl text-white">{value}</p>
    </div>
  );
}

function OwnerOnlyNotice({ denied = false }: { denied?: boolean }) {
  return (
    <section className="rounded-lg border border-[#E2B93B]/20 bg-[#E2B93B]/[0.04] p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E2B93B]/10 text-[#E2B93B]">
          <LockKeyhole className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">
            {denied ? "Creative lead access only" : "Checking private Brainmap access"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
            This Brainmap view is reserved for authorized administrators only.
          </p>
        </div>
      </div>
    </section>
  );
}

type BrainmapRow = Record<string, string>;

function getSection(title: string) {
  const marker = `## ${title}`;
  const start = brainmapMarkdown.indexOf(marker);
  if (start < 0) return "";
  const bodyStart = start + marker.length;
  const rest = brainmapMarkdown.slice(bodyStart);
  const nextSection = rest.search(/\n## /);
  return (nextSection < 0 ? rest : rest.slice(0, nextSection)).trim();
}

function splitMarkdownRow(line: string) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseMarkdownTable(title: string): BrainmapRow[] {
  const tableLines = getSection(title)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  if (tableLines.length < 3) return [];

  const headers = splitMarkdownRow(tableLines[0]);
  return tableLines.slice(2).map((line) => {
    const cells = splitMarkdownRow(line);
    return headers.reduce<BrainmapRow>((row, header, index) => {
      row[header] = cells[index] || "";
      return row;
    }, {});
  });
}

function findByRoute(rows: BrainmapRow[], route: string) {
  return rows.find((row) => row.Route === route);
}

const pageRows = parseMarkdownTable("Pages and Meaning");
const toolRows = parseMarkdownTable("Tool Families and Meaning");
const roomRows = parseMarkdownTable("Rooms List");
const workerRows = parseMarkdownTable("Workers List");
const aliasRows = parseMarkdownTable("Public/Internal Alias Table");

const coreSurfaceGroups = [
  {
    group: "Control tower",
    routes: ["/admin/controltower", "/admin/jobs", "/admin/orchestrator", "/admin/boardroom", "/admin/pinballwake", "/admin/agents/heartbeat"],
  },
  {
    group: "Knowledge",
    routes: ["/admin/brainmap", "/admin/memory", "/admin/apps", "/admin/codebase"],
  },
  {
    group: "Proof and safety",
    routes: ["/admin/testpass", "/admin/system-health", "/admin/audit-log", "/admin/keychain"],
  },
  {
    group: "Product",
    routes: ["/admin/jobsmith", "/admin/autopilot/expressbuild", "/jobsmith", "/tools"],
  },
].flatMap(({ group, routes }) =>
  routes
    .map((route) => {
      const row = findByRoute(pageRows, route);
      return row ? { ...row, Group: group } : null;
    })
    .filter((row): row is BrainmapRow => Boolean(row)),
);

const highlightedToolNames = new Set([
  "Heartbeat Protocol",
  "IgniteOnly",
  "NudgeOnly",
  "copypass",
  "crews",
  "github",
  "keychain",
  "openai",
  "pushonly",
  "qc",
]);

const highlightedTools = toolRows
  .filter((row) => highlightedToolNames.has(row["Tool family"]))
  .slice(0, 12);

const metricCards = [
  { label: "Divisions", value: brainmapData.counts.divisions, icon: Network },
  { label: "Items", value: brainmapData.counts.inventory, icon: Boxes },
  { label: "Pages", value: pageRows.length || brainmapData.counts.pages, icon: Route },
  { label: "Tools", value: toolRows.length || brainmapData.counts.tools, icon: TableProperties },
  { label: "Rooms", value: roomRows.length || brainmapData.counts.rooms, icon: UsersRound },
  { label: "Workers", value: workerRows.length || brainmapData.counts.workers, icon: Bot },
  { label: "Sources", value: sourceCount || brainmapData.counts.source_manifest, icon: Fingerprint },
  { label: "Sections", value: sectionCount, icon: BookOpen },
];

const markdownComponents = {
  h1: ({ children }: { children?: ReactNode }) => <h2 className="mb-3 text-xl font-semibold text-white">{children}</h2>,
  h2: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-8 border-t border-white/[0.06] pt-5 text-lg font-semibold text-white">{children}</h3>
  ),
  p: ({ children }: { children?: ReactNode }) => <p className="my-3 max-w-4xl text-sm leading-6 text-white/65">{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => <ul className="my-3 list-disc space-y-1 pl-5 text-sm leading-6 text-white/65">{children}</ul>,
  code: ({ children }: { children?: ReactNode }) => <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-xs text-[#E2B93B]">{children}</code>,
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-white/[0.06]">
      <table className="min-w-full text-left text-xs">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: ReactNode }) => <th className="border-b border-white/[0.08] bg-white/[0.04] px-3 py-2 font-semibold text-white/70">{children}</th>,
  td: ({ children }: { children?: ReactNode }) => <td className="border-b border-white/[0.04] px-3 py-2 align-top text-white/60">{children}</td>,
};

export default function AdminBrainmap() {
  const { session, user, loading } = useSession();
  const directOwner = normalizeEmail(user?.email) === getOwnerEmail();
  const token = session?.access_token || "";
  const [profileAccess, setProfileAccess] = useState<{ token: string; status: "owner" | "denied" } | null>(null);
  const [query, setQuery] = useState("");
  const [activeDivision, setActiveDivision] = useState("All");
  const [showSource, setShowSource] = useState(false);
  const [showRawGenerated, setShowRawGenerated] = useState(false);

  useEffect(() => {
    if (directOwner || !token) return;

    let cancelled = false;
    fetch("/api/memory-admin?action=admin_profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled) return;
        setProfileAccess({
          token,
          status: normalizeEmail(body?.email) === getOwnerEmail() ? "owner" : "denied",
        });
      })
      .catch(() => {
        if (!cancelled) setProfileAccess({ token, status: "denied" });
      });

    return () => {
      cancelled = true;
    };
  }, [directOwner, token]);

  const ownerStatus = directOwner
    ? "owner"
    : loading
      ? "checking"
      : !token
        ? "denied"
        : profileAccess?.token === token
          ? profileAccess.status
          : "checking";
  const visibleAsOwner = ownerStatus === "owner";

  const filteredGroups = useMemo(() => {
    return brainmapData.divisions
      .filter((division) => activeDivision === "All" || division.name === activeDivision)
      .map((division) => {
        const matchingItems = brainmapData.inventory.filter(
          (item) => item.division === division.name && itemMatchesQuery(item, query),
        );
        const items = query ? matchingItems : matchingItems.slice(0, MAX_VISUAL_ITEMS_PER_DIVISION);
        return {
          ...division,
          hiddenCount: matchingItems.length - items.length,
          items,
          matchingCount: matchingItems.length,
        };
      })
      .filter((division) => division.items.length > 0);
  }, [activeDivision, query]);

  const shownCount = filteredGroups.reduce((sum, division) => sum + division.items.length, 0);

  if (!visibleAsOwner) {
    return <OwnerOnlyNotice denied={ownerStatus === "denied"} />;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 border-b border-white/[0.06] pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-2.5 py-1 text-xs font-semibold text-[#E2B93B]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Private Yellow Admin</span>
            <span className="rounded bg-[#E2B93B]/10 px-1.5 py-0.5 text-[11px] text-[#F4D46D]">Internal admin only</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Ecosystem Brainmap</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            A clearer map of UnClick pages, tools, workers, rooms, aliases, safety rules, proof surfaces,
            and source-of-truth lanes. The human view is summarized first, with the generated seat packet kept below.
          </p>
        </div>
        <div className="grid min-w-[280px] grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-[640px]">
          {metricCards.map(({ label, value, icon }) => (
            <Metric key={label} icon={icon} label={label} value={value} />
          ))}
        </div>
      </header>

      <section className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-lg font-semibold text-white">Human orientation</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Start here when you want a plain-English overview. This page is generated from source files, so
              it stays useful for both the operator and AI seats as UnClick changes.
            </p>
          </div>
          <div className="rounded-lg border border-[#E2B93B]/20 bg-[#E2B93B]/10 p-4">
            <h3 className="text-sm font-semibold text-[#F4D46D]">AI seat packet</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Seats should use this to find routes, tools, rooms, worker roles, aliases, and safety rules.
              The raw generated Brainmap remains intact below for fast machine reading.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#E2B93B]/15 bg-white/[0.03] p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Launchpad induction path</h2>
            <p className="mt-1 text-sm text-white/55">
              Brainmap gives seats the map before Launchpad chooses the lane.
            </p>
          </div>
          <span className="w-fit rounded-md bg-[#E2B93B]/10 px-2 py-1 font-mono text-xs text-[#F4D46D]">
            {brainmapData.inductionRows.length} steps
          </span>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {brainmapData.inductionRows.map(([step, action, why, surface, pointer]) => (
            <div key={`${step}-${action}`} className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#E2B93B]/10 font-mono text-xs font-semibold text-[#F4D46D]">
                  {step}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">{action}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/55">{why}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded bg-[#61C1C4]/10 px-2 py-1 text-[#8FE6E8]">{surface}</span>
                    <span className="rounded bg-white/[0.05] px-2 py-1 font-mono text-white/45">{pointer}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-white/[0.06] bg-white/[0.025] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white/55">Tool and worker tree</h2>
            <p className="mt-1 text-sm text-white/45">
              {shownCount} of {brainmapData.counts.inventory} items visible from {brainmapData.schema_version}.
            </p>
          </div>

          <label className="relative block w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <span className="sr-only">Search Brainmap</span>
            <input
              aria-label="Search Brainmap"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools, rooms, workers, modules..."
              className="h-10 w-full rounded-md border border-white/[0.08] bg-black/30 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#61C1C4]/60"
            />
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {["All", ...brainmapData.divisions.map((division) => division.name)].map((division) => {
            const active = activeDivision === division;
            return (
              <button
                key={division}
                type="button"
                onClick={() => setActiveDivision(division)}
                className={`shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-[#61C1C4]/50 bg-[#61C1C4]/15 text-[#8FE6E8]"
                    : "border-white/[0.08] bg-white/[0.025] text-white/45 hover:border-white/15 hover:text-white/70"
                }`}
              >
                {division}
              </button>
            );
          })}
        </div>

        <div className="space-y-5">
          {filteredGroups.map((division) => (
            <section key={division.id} className="overflow-hidden rounded-lg border border-white/[0.06] bg-black/20">
              <div className="flex flex-col gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">{division.name}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/45">{division.meaning}</p>
                </div>
                <span className="w-fit rounded-md bg-white/[0.05] px-2 py-1 font-mono text-xs text-white/45">
                  {division.hiddenCount > 0 ? `${division.items.length}/${division.matchingCount}` : division.items.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-white/45">
                      <th className="w-[16rem] px-4 py-2 font-medium">Name</th>
                      <th className="w-[8rem] px-4 py-2 font-medium">Kind</th>
                      <th className="px-4 py-2 font-medium">What it does</th>
                      <th className="w-[12rem] px-4 py-2 font-medium">Route</th>
                      <th className="w-[18rem] px-4 py-2 font-medium">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {division.items.map((item) => (
                      <tr key={item.id} className="border-b border-white/[0.035] last:border-b-0">
                        <td className="px-4 py-2 align-top font-medium text-white/80">{item.name}</td>
                        <td className="px-4 py-2 align-top text-[#61C1C4]/80">{item.kind}</td>
                        <td className="max-w-2xl px-4 py-2 align-top leading-5 text-white/55">{item.meaning}</td>
                        <td className="px-4 py-2 align-top font-mono text-[11px] text-white/45">{item.route || "-"}</td>
                        <td className="px-4 py-2 align-top font-mono text-[11px] text-white/35">{item.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[#61C1C4]/15 bg-[#61C1C4]/[0.03] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-[#61C1C4]" />
            <div>
              <h2 className="text-sm font-semibold text-white">Auto-updating source document</h2>
              <p className="mt-1 max-w-3xl text-xs leading-5 text-white/45">
                The generator writes both markdown and JSON. CI fails if either file gets stale, so new sections can keep teaching seats without a manual handover.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowSource((value) => !value)}
            className="w-fit rounded-md border border-[#61C1C4]/25 px-3 py-2 text-xs font-medium text-[#8FE6E8] hover:bg-[#61C1C4]/10"
          >
            {showSource ? "Hide source" : "Show source"}
          </button>
        </div>

        {showSource && (
          <pre
            aria-label="Generated Brainmap markdown source"
            className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 font-mono text-xs leading-5 text-white/60"
          >
            {brainmapMarkdown}
          </pre>
        )}
      </section>

      <section className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Core admin surfaces</h2>
            <p className="mt-1 text-sm text-white/55">The main places a human or seat should know first.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.08em] text-white/50">
              <tr>
                <th className="px-3 py-2 font-semibold">Group</th>
                <th className="px-3 py-2 font-semibold">Route</th>
                <th className="px-3 py-2 font-semibold">What it does</th>
              </tr>
            </thead>
            <tbody>
              {coreSurfaceGroups.map((row) => (
                <tr key={`${row.Group}-${row.Route}`} className="border-t border-white/[0.04]">
                  <td className="whitespace-nowrap px-3 py-2 text-white/65">{row.Group}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-[#E2B93B]">{row.Route}</td>
                  <td className="max-w-3xl px-3 py-2 text-white/65">{row.Meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h2 className="text-lg font-semibold text-white">High-use tools and bridges</h2>
          <p className="mt-1 text-sm text-white/55">A quick first slice of what seats can use.</p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-white/[0.06]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.08em] text-white/50">
                <tr>
                  <th className="px-3 py-2 font-semibold">Tool</th>
                  <th className="px-3 py-2 font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {highlightedTools.map((row) => (
                  <tr key={row["Tool family"]} className="border-t border-white/[0.04]">
                    <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-[#E2B93B]">{row["Tool family"]}</td>
                    <td className="px-3 py-2 text-white/65">{row.Meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h2 className="text-lg font-semibold text-white">Worker tree</h2>
          <p className="mt-1 text-sm text-white/55">The basic seat roles that move work through UnClick.</p>
          <div className="mt-4 space-y-2">
            {workerRows.map((row) => (
              <div key={row.Worker} className="rounded-md border border-white/[0.06] bg-white/[0.025] p-3">
                <div className="text-sm font-semibold text-white">{row.Worker}</div>
                <p className="mt-1 text-sm leading-5 text-white/60">{row.Meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h2 className="text-lg font-semibold text-white">Rooms</h2>
          <p className="mt-1 text-sm text-white/55">Where work gets routed during research, build, proof, merge, repair, and improvement.</p>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {roomRows.slice(0, 12).map((row) => (
              <div key={row.Room} className="rounded-md border border-white/[0.06] bg-white/[0.025] p-3">
                <div className="font-mono text-xs text-[#E2B93B]">{row.Room}</div>
                <p className="mt-1 text-xs leading-5 text-white/60">{row.Meaning}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h2 className="text-lg font-semibold text-white">Name map</h2>
          <p className="mt-1 text-sm text-white/55">Public names and internal names kept clear for transparency.</p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-white/[0.06]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.08em] text-white/50">
                <tr>
                  <th className="px-3 py-2 font-semibold">Internal</th>
                  <th className="px-3 py-2 font-semibold">Public</th>
                  <th className="px-3 py-2 font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {aliasRows.map((row) => (
                  <tr key={row["Internal name"]} className="border-t border-white/[0.04]">
                    <td className="px-3 py-2 text-white/65">{row["Internal name"]}</td>
                    <td className="px-3 py-2 text-white/80">{row["Public name"]}</td>
                    <td className="px-3 py-2 text-white/60">{row.Meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <details
        className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4"
        onToggle={(event) => setShowRawGenerated(event.currentTarget.open)}
      >
        <summary className="cursor-pointer text-lg font-semibold text-white">Raw generated Brainmap</summary>
        <p className="mt-2 text-sm leading-6 text-white/55">
          This is the full generated packet for AI read efficiency, source checks, and exact table lookup.
        </p>
        {showRawGenerated && (
          <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {brainmapMarkdown}
            </ReactMarkdown>
          </div>
        )}
      </details>
    </div>
  );
}
