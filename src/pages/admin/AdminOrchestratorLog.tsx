import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Database,
  Download,
  Eye,
  FileJson,
  LockKeyhole,
  RefreshCw,
  Search,
} from "lucide-react";
import { useSession } from "@/lib/auth";

interface OrchestratorLogRecord {
  source_kind: string;
  source_id: string;
  created_at: string | null;
  updated_at?: string | null;
  label: string;
  visibility: "private";
  storage: "supabase_postgres";
  preview: string;
  data?: unknown;
}

interface OrchestratorLogResponse {
  generated_at: string;
  schema_version: number;
  query: string | null;
  limit: number;
  include_raw: boolean;
  visibility: {
    access: string;
    screen_preview: string;
    download: string;
    storage: string;
  };
  source_counts: Record<string, number>;
  records: OrchestratorLogRecord[];
}

const SOURCE_LABELS: Record<string, string> = {
  conversation_turn: "Conversation",
  chat_message: "Chat",
  boardroom_message: "Boardroom",
  todo_comment: "Comment",
  todo: "Job",
  session_summary: "Session",
  signal: "Signal",
  dispatch: "Dispatch",
  business_context: "Memory",
  library: "Library",
};

const LIMIT_OPTIONS = [50, 120, 200] as const;

function formatWhen(iso: string | null | undefined): string {
  if (!iso) return "No date";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "No date";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sourceLabel(kind: string): string {
  return SOURCE_LABELS[kind] ?? kind.replace(/_/g, " ");
}

function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export default function AdminOrchestratorLog() {
  const { session } = useSession();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [limit, setLimit] = useState<(typeof LIMIT_OPTIONS)[number]>(120);
  const [log, setLog] = useState<OrchestratorLogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authHeader = useMemo(() => {
    const token = session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : null;
  }, [session?.access_token]);

  async function fetchLog(options: { includeRaw?: boolean } = {}) {
    if (!authHeader) {
      setLoading(false);
      setError("Sign in to view the Orchestrator log.");
      return null;
    }

    const params = new URLSearchParams({
      action: "orchestrator_log_read",
      limit: String(limit),
    });
    if (submittedQuery.trim()) params.set("q", submittedQuery.trim());
    if (options.includeRaw) params.set("include_raw", "1");

    const res = await fetch(`/api/memory-admin?${params.toString()}`, {
      headers: authHeader,
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(body.error ?? "Could not load the Orchestrator log.");
    }
    return (await res.json()) as OrchestratorLogResponse;
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchLog()
      .then((body) => {
        if (!cancelled && body) setLog(body);
      })
      .catch((err) => {
        if (!cancelled) setError((err as Error).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authHeader, submittedQuery, limit]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  }

  async function handleRefresh() {
    setLoading(true);
    setError(null);
    try {
      const body = await fetchLog();
      if (body) setLog(body);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    setDownloading(true);
    setError(null);
    try {
      const body = await fetchLog({ includeRaw: true });
      if (!body) return;
      const stamp = new Date().toISOString().slice(0, 10);
      downloadJson(`unclick-orchestrator-log-${stamp}.json`, body);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDownloading(false);
    }
  }

  const totalRecords = log?.records.length ?? 0;
  const sourceCounts = Object.entries(log?.source_counts ?? {}).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Orchestrator</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">Log</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Owner-only source records for transparency, export, and recovery.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/75 transition hover:bg-white/[0.07] disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading || loading || !log}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Preparing" : "Download JSON"}
          </button>
        </div>
      </div>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-[#61C1C4]/20 bg-[#61C1C4]/[0.07] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#61C1C4]">
            <LockKeyhole className="h-4 w-4" />
            Visibility
          </div>
          <p className="mt-2 text-sm leading-6 text-white/65">
            {log?.visibility.access ?? "Private to the signed-in owner or tenant key holder."}
          </p>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <Eye className="h-4 w-4" />
            Preview
          </div>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {log?.visibility.screen_preview ?? "On-screen rows use redacted previews."}
          </p>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <Database className="h-4 w-4" />
            Storage
          </div>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {log?.visibility.storage ?? "Stored in tenant-scoped Supabase records."}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-[#E2B93B]/25 bg-[#E2B93B]/[0.05] p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#E2B93B]" />
          <div>
            <p className="text-sm font-semibold text-[#E2B93B]">Download visibility</p>
            <p className="mt-1 text-sm leading-6 text-white/65">
              The download fetches the loaded source rows for this owner. Treat it like a private backup because it can include raw conversation text.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
          <form onSubmit={handleSearch} className="flex min-w-0 flex-1 items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter log records"
                className="w-full rounded-md border border-white/[0.08] bg-white/[0.04] py-2 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary/50"
              />
            </div>
            <button
              type="submit"
              className="rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/75 transition hover:bg-white/[0.07]"
            >
              Search
            </button>
          </form>
          <label className="flex items-center gap-2 text-sm text-white/60">
            Rows
            <select
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value) as (typeof LIMIT_OPTIONS)[number])}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-2 text-sm text-white outline-none focus:border-primary/50"
            >
              {LIMIT_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-white/45">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1">
            {loading ? "Loading" : `${totalRecords} loaded`}
          </span>
          {sourceCounts.map(([kind, count]) => (
            <span key={kind} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1">
              {sourceLabel(kind)} {count}
            </span>
          ))}
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.025]">
          <div className="grid grid-cols-[minmax(120px,0.7fr)_minmax(180px,1.4fr)_minmax(180px,2fr)] gap-3 border-b border-white/[0.08] px-4 py-3 text-xs font-semibold uppercase text-white/40">
            <span>Source</span>
            <span>Record</span>
            <span>Preview</span>
          </div>
          {loading ? (
            <p className="px-4 py-8 text-sm text-white/45">Loading Orchestrator log...</p>
          ) : totalRecords === 0 ? (
            <p className="px-4 py-8 text-sm text-white/45">No log records match this view.</p>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {log?.records.map((record) => (
                <div
                  key={`${record.source_kind}:${record.source_id}`}
                  className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-[minmax(120px,0.7fr)_minmax(180px,1.4fr)_minmax(180px,2fr)]"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#61C1C4]/25 bg-[#61C1C4]/10 px-2.5 py-1 text-xs font-medium text-[#61C1C4]">
                      <FileJson className="h-3 w-3" />
                      {sourceLabel(record.source_kind)}
                    </div>
                    <p className="mt-2 text-xs text-white/35">{record.visibility}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white/80">{record.label}</p>
                    <p className="mt-1 truncate text-xs text-white/35">{record.source_id}</p>
                    <p className="mt-1 text-xs text-white/45">{formatWhen(record.updated_at ?? record.created_at)}</p>
                  </div>
                  <p className="min-w-0 whitespace-pre-wrap break-words text-sm leading-6 text-white/65">
                    {record.preview || "No preview available."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
