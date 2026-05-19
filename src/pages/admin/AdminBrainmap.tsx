import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import { Bot, BookOpen, Fingerprint, Route, Sparkles, TableProperties, UsersRound } from "lucide-react";
import brainmapMarkdown from "../../../docs/UnClick-brainmap.generated.md?raw";

const sectionCount = (brainmapMarkdown.match(/^## /gm) || []).length;
const sourceCount = (brainmapMarkdown.match(/^\| .* \| [a-f0-9]{12} \| \d+ \|$/gm) || []).length;

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
    routes: ["/admin/jobs", "/admin/orchestrator", "/fishbowl", "/admin/pinball-wake", "/admin/agents/heartbeat"],
  },
  {
    group: "Knowledge",
    routes: ["/admin/brainmap", "/admin/memory", "/admin/tools", "/admin/codebase"],
  },
  {
    group: "Proof and safety",
    routes: ["/admin/test-pass", "/admin/system-health", "/admin/audit-log", "/admin/keychain"],
  },
  {
    group: "Product",
    routes: ["/admin/jobsmith", "/jobsmith", "/tools", "/connect"],
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
  { label: "Sections", value: sectionCount, icon: BookOpen },
  { label: "Source files", value: sourceCount, icon: Fingerprint },
  { label: "Pages", value: pageRows.length, icon: Route },
  { label: "Tools", value: toolRows.length, icon: TableProperties },
  { label: "Rooms", value: roomRows.length, icon: UsersRound },
  { label: "Workers", value: workerRows.length, icon: Bot },
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
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 border-b border-white/[0.06] pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-2.5 py-1 text-xs font-semibold text-[#E2B93B]">
            <Sparkles className="h-3.5 w-3.5" />
            Internal admin only
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Ecosystem Brainmap</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            A clearer map of UnClick pages, tools, workers, rooms, aliases, safety rules, and ledger
            meaning. The human view is summarized first, with the raw generated seat packet kept below.
          </p>
        </div>
        <div className="grid min-w-[280px] grid-cols-2 gap-3 sm:grid-cols-3 lg:max-w-[420px]">
          {metricCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
              <p className="mt-1 font-mono text-xl text-white">{value}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="rounded-lg border border-white/[0.06] bg-[#101010] p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-lg font-semibold text-white">Human orientation</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Start here when you want a plain-English overview. This page is generated from source files, so
              it stays useful for both Chris and AI seats as UnClick changes.
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

      <section className="rounded-lg border border-white/[0.06] bg-[#111] p-4">
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
        <div className="rounded-lg border border-white/[0.06] bg-[#111] p-4">
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

        <div className="rounded-lg border border-white/[0.06] bg-[#111] p-4">
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
        <div className="rounded-lg border border-white/[0.06] bg-[#111] p-4">
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

        <div className="rounded-lg border border-white/[0.06] bg-[#111] p-4">
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

      <details className="rounded-lg border border-white/[0.06] bg-[#111] p-4">
        <summary className="cursor-pointer text-lg font-semibold text-white">Raw generated Brainmap</summary>
        <p className="mt-2 text-sm leading-6 text-white/55">
          This is the full generated packet for AI read efficiency, source checks, and exact table lookup.
        </p>
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-[#0B0B0B] p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {brainmapMarkdown}
          </ReactMarkdown>
        </div>
      </details>
    </div>
  );
}
