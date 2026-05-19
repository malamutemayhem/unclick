import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BookOpen,
  Boxes,
  Fingerprint,
  LockKeyhole,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useSession } from "@/lib/auth";
import brainmapMarkdown from "../../../docs/UnClick-brainmap.generated.md?raw";
import brainmapDataRaw from "../../../docs/UnClick-brainmap.generated.json?raw";

const OWNER_EMAIL = "creativelead@malamutemayhem.com";

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
            This Brainmap view is reserved for the private Yellow Admin lane owned by {OWNER_EMAIL}.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AdminBrainmap() {
  const { session, user, loading } = useSession();
  const directOwner = normalizeEmail(user?.email) === OWNER_EMAIL;
  const [ownerStatus, setOwnerStatus] = useState<"checking" | "owner" | "denied">("checking");
  const [query, setQuery] = useState("");
  const [activeDivision, setActiveDivision] = useState("All");
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    if (directOwner) {
      setOwnerStatus("owner");
      return;
    }

    const token = session?.access_token;
    if (!token) {
      if (!loading) setOwnerStatus("denied");
      return;
    }

    let cancelled = false;
    fetch("/api/memory-admin?action=admin_profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled) return;
        setOwnerStatus(normalizeEmail(body?.email) === OWNER_EMAIL ? "owner" : "denied");
      })
      .catch(() => {
        if (!cancelled) setOwnerStatus("denied");
      });

    return () => {
      cancelled = true;
    };
  }, [directOwner, loading, session?.access_token]);

  const visibleAsOwner = directOwner || ownerStatus === "owner";

  const filteredGroups = useMemo(() => {
    return brainmapData.divisions
      .filter((division) => activeDivision === "All" || division.name === activeDivision)
      .map((division) => ({
        ...division,
        items: brainmapData.inventory.filter(
          (item) => item.division === division.name && itemMatchesQuery(item, query),
        ),
      }))
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
            Private Yellow Admin
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Ecosystem Brainmap</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            Auto-generated map of UnClick sections, tools, rooms, workers, wrappers, modules, proof surfaces, and source-of-truth lanes.
          </p>
        </div>
        <div className="grid min-w-[280px] grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric icon={Network} label="Divisions" value={brainmapData.counts.divisions} />
          <Metric icon={Boxes} label="Items" value={brainmapData.counts.inventory} />
          <Metric icon={BookOpen} label="Pages" value={brainmapData.counts.pages} />
          <Metric icon={Fingerprint} label="Sources" value={brainmapData.counts.source_manifest} />
        </div>
      </header>

      <section className="space-y-4 rounded-lg border border-white/[0.06] bg-white/[0.025] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white/55">Tool and worker tree</h2>
            <p className="mt-1 text-sm text-white/45">
              {shownCount} of {brainmapData.counts.inventory} items shown from {brainmapData.schema_version}.
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
                  {division.items.length}
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
          <div className="mt-4 rounded-lg border border-white/[0.06] bg-[#111] p-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h2 className="mb-3 text-xl font-semibold text-white">{children}</h2>,
                h2: ({ children }) => <h3 className="mt-8 border-t border-white/[0.06] pt-5 text-lg font-semibold text-white">{children}</h3>,
                p: ({ children }) => <p className="my-3 max-w-4xl text-sm leading-6 text-white/65">{children}</p>,
                ul: ({ children }) => <ul className="my-3 list-disc space-y-1 pl-5 text-sm leading-6 text-white/65">{children}</ul>,
                code: ({ children }) => <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-xs text-[#E2B93B]">{children}</code>,
                table: ({ children }) => <div className="my-4 overflow-x-auto rounded-lg border border-white/[0.06]"><table className="min-w-full text-left text-xs">{children}</table></div>,
                th: ({ children }) => <th className="border-b border-white/[0.08] bg-white/[0.04] px-3 py-2 font-semibold text-white/70">{children}</th>,
                td: ({ children }) => <td className="border-b border-white/[0.04] px-3 py-2 align-top text-white/60">{children}</td>,
              }}
            >
              {brainmapMarkdown}
            </ReactMarkdown>
          </div>
        )}
      </section>
    </div>
  );
}
