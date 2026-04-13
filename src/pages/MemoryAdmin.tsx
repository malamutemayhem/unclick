import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import {
  Brain,
  Briefcase,
  BookOpen,
  Clock,
  Lightbulb,
  MessageSquare,
  Code2,
  Search,
  RefreshCw,
  Flame,
  Thermometer,
  Snowflake,
  Archive,
  ChevronRight,
  X,
  AlertCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LayerCounts {
  business_context: number;
  knowledge_library: number;
  session_summaries: number;
  extracted_facts: number;
  conversation_log: number;
  code_dumps: number;
}

interface StatusData {
  mode: string;
  layers: LayerCounts;
  decay_tiers: { hot: number; warm: number; cold: number };
  fact_statuses: { active: number; superseded: number; archived: number; disputed: number };
}

interface Fact {
  id: string;
  fact: string;
  category: string;
  confidence: number;
  decay_tier: string;
  status: string;
  created_at: string;
  source_session_id?: string;
}

interface Session {
  id: string;
  session_id: string;
  summary: string;
  key_decisions?: string[];
  topics?: string[];
  created_at: string;
}

interface BusinessContextEntry {
  id: string;
  category: string;
  key: string;
  value: string;
  priority: number;
  decay_tier: string;
  updated_at: string;
}

interface LibraryDoc {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  version: number;
  updated_at: string;
  created_at: string;
}

interface ConversationSession {
  session_id: string;
  message_count: number;
  last_message: string;
}

interface CodeDump {
  id: string;
  session_id: string;
  file_path: string;
  language: string;
  content: string;
  description?: string;
  created_at: string;
}

/* ------------------------------------------------------------------ */
/*  API helper                                                         */
/* ------------------------------------------------------------------ */

const API = "/api/memory-admin";

async function fetchAdmin<T>(action: string, params: Record<string, string> = {}): Promise<T> {
  const qs = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${API}?${qs}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || `API error ${res.status}`);
  }
  return res.json();
}

async function postAdmin<T>(action: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API}?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(data.error || `API error ${res.status}`);
  }
  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Sidebar nav                                                        */
/* ------------------------------------------------------------------ */

type Section =
  | "overview"
  | "context"
  | "library"
  | "sessions"
  | "facts"
  | "logs"
  | "code"
  | "search";

const NAV_ITEMS: { id: Section; label: string; icon: typeof Brain; layer?: number }[] = [
  { id: "overview", label: "Overview", icon: Brain },
  { id: "context", label: "Business Context", icon: Briefcase, layer: 1 },
  { id: "library", label: "Knowledge Library", icon: BookOpen, layer: 2 },
  { id: "sessions", label: "Sessions", icon: Clock, layer: 3 },
  { id: "facts", label: "Extracted Facts", icon: Lightbulb, layer: 4 },
  { id: "logs", label: "Conversation Logs", icon: MessageSquare, layer: 5 },
  { id: "code", label: "Code Dumps", icon: Code2, layer: 6 },
  { id: "search", label: "Search", icon: Search },
];

/* ------------------------------------------------------------------ */
/*  Small reusable bits                                                */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  onClick,
}: {
  label: string;
  value: number | string;
  icon: typeof Brain;
  accent?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col gap-2 rounded-xl border border-border/40 bg-card/20 p-5 text-left transition-all hover:border-primary/30 hover:bg-card/40 ${onClick ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent || "bg-primary/10 text-primary"}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        {onClick && (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </div>
      <div>
        <p className="font-mono text-2xl font-semibold text-heading">{value}</p>
        <p className="text-xs text-body">{label}</p>
      </div>
    </button>
  );
}

function DecayBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    hot: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    warm: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    cold: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  };
  const icons: Record<string, typeof Flame> = {
    hot: Flame,
    warm: Thermometer,
    cold: Snowflake,
  };
  const Icon = icons[tier] || Thermometer;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] ${styles[tier] || "border-border/40 bg-muted/10 text-muted-foreground"}`}
    >
      <Icon className="h-2.5 w-2.5" />
      {tier}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "border-green-500/30 bg-green-500/10 text-green-400",
    superseded: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    archived: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
    disputed: "border-red-500/30 bg-red-500/10 text-red-400",
  };
  return (
    <span
      className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${styles[status] || "border-border/40 bg-muted/10 text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border/50 bg-muted/5 p-8 text-center">
      <span className="font-mono text-xs text-muted-foreground">{message}</span>
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
      <p className="flex-1 text-sm text-red-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md border border-red-500/20 px-3 py-1 text-xs text-red-400 transition-colors hover:bg-red-500/10"
        >
          Retry
        </button>
      )}
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

/* ------------------------------------------------------------------ */
/*  Section: Overview                                                  */
/* ------------------------------------------------------------------ */

function OverviewSection({
  status,
  loading,
  error,
  onRetry,
  onNavigate,
}: {
  status: StatusData | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onNavigate: (s: Section) => void;
}) {
  if (error) return <ErrorBanner message={error} onRetry={onRetry} />;
  if (loading || !status)
    return <div className="animate-pulse rounded-xl bg-card/20 p-8 text-center text-sm text-body">Loading...</div>;

  const layers = status.layers;
  const total = Object.values(layers).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Mode indicator */}
      <div className="flex items-center gap-3">
        <span className="rounded border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
          {status.mode} mode
        </span>
        <span className="text-xs text-muted-foreground">{total} total entries across all layers</span>
      </div>

      {/* Layer cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Business Context" value={layers.business_context} icon={Briefcase} onClick={() => onNavigate("context")} />
        <StatCard label="Knowledge Library" value={layers.knowledge_library} icon={BookOpen} onClick={() => onNavigate("library")} />
        <StatCard label="Session Summaries" value={layers.session_summaries} icon={Clock} onClick={() => onNavigate("sessions")} />
        <StatCard label="Extracted Facts" value={layers.extracted_facts} icon={Lightbulb} onClick={() => onNavigate("facts")} />
        <StatCard label="Conversation Log" value={layers.conversation_log} icon={MessageSquare} onClick={() => onNavigate("logs")} />
        <StatCard label="Code Dumps" value={layers.code_dumps} icon={Code2} onClick={() => onNavigate("code")} />
      </div>

      {/* Decay tiers */}
      <div className="rounded-xl border border-border/40 bg-card/20 p-6">
        <h3 className="mb-4 text-sm font-semibold text-heading">Fact Decay Distribution</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
            <Flame className="h-5 w-5 text-orange-400" />
            <div>
              <p className="font-mono text-lg font-semibold text-heading">{status.decay_tiers.hot}</p>
              <p className="text-xs text-orange-400">Hot - recently accessed</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
            <Thermometer className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="font-mono text-lg font-semibold text-heading">{status.decay_tiers.warm}</p>
              <p className="text-xs text-yellow-400">Warm - aging out</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <Snowflake className="h-5 w-5 text-blue-400" />
            <div>
              <p className="font-mono text-lg font-semibold text-heading">{status.decay_tiers.cold}</p>
              <p className="text-xs text-blue-400">Cold - archive candidates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fact statuses */}
      <div className="rounded-xl border border-border/40 bg-card/20 p-6">
        <h3 className="mb-4 text-sm font-semibold text-heading">Fact Status Breakdown</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(status.fact_statuses).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <StatusBadge status={key} />
              <span className="font-mono text-sm text-heading">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Business Context (Layer 1)                                */
/* ------------------------------------------------------------------ */

function ContextSection() {
  const [entries, setEntries] = useState<BusinessContextEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchAdmin<{ data: BusinessContextEntry[] }>("business_context")
      .then((r) => setEntries(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error) return <ErrorBanner message={error} onRetry={load} />;
  if (loading) return <div className="animate-pulse rounded-xl bg-card/20 p-8 text-center text-sm text-body">Loading...</div>;
  if (!entries.length) return <EmptyState message="No business context entries yet. Use set_business_context via MCP to add entries." />;

  const grouped = entries.reduce<Record<string, BusinessContextEntry[]>>((acc, e) => {
    (acc[e.category] ||= []).push(e);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="rounded-xl border border-border/40 bg-card/20 p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
              {category}
            </span>
            <span className="text-xs text-muted-foreground">{items.length} entries</span>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-border/30 bg-card/10 p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-medium text-heading">{item.key}</span>
                    <DecayBadge tier={item.decay_tier} />
                  </div>
                  <p className="mt-1 text-sm text-body">{item.value}</p>
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(item.updated_at)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Knowledge Library (Layer 2)                               */
/* ------------------------------------------------------------------ */

function LibrarySection() {
  const [docs, setDocs] = useState<LibraryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchAdmin<{ data: LibraryDoc[] }>("library")
      .then((r) => setDocs(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error) return <ErrorBanner message={error} onRetry={load} />;
  if (loading) return <div className="animate-pulse rounded-xl bg-card/20 p-8 text-center text-sm text-body">Loading...</div>;
  if (!docs.length) return <EmptyState message="No knowledge library documents yet. Use upsert_library_doc via MCP to add docs." />;

  const grouped = docs.reduce<Record<string, LibraryDoc[]>>((acc, d) => {
    (acc[d.category] ||= []).push(d);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
              {category}
            </span>
            <span className="text-xs text-muted-foreground">{items.length} docs</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((doc) => (
              <div
                key={doc.slug}
                className="rounded-xl border border-border/40 bg-card/20 p-5 transition-colors hover:border-primary/30 hover:bg-card/40"
              >
                <h4 className="text-sm font-semibold text-heading">{doc.title}</h4>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{doc.slug}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(doc.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted/20 px-1.5 py-0.5 font-mono text-[10px] text-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>v{doc.version}</span>
                  <span>{timeAgo(doc.updated_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Sessions (Layer 3)                                        */
/* ------------------------------------------------------------------ */

function SessionsSection() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchAdmin<{ data: Session[] }>("sessions", { limit: "50" })
      .then((r) => setSessions(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error) return <ErrorBanner message={error} onRetry={load} />;
  if (loading) return <div className="animate-pulse rounded-xl bg-card/20 p-8 text-center text-sm text-body">Loading...</div>;
  if (!sessions.length) return <EmptyState message="No session summaries yet. Use write_session_summary via MCP at the end of each session." />;

  return (
    <div className="space-y-3">
      {sessions.map((s) => (
        <div key={s.id} className="rounded-xl border border-border/40 bg-card/20 transition-colors hover:border-primary/30">
          <button
            onClick={() => setExpanded(expanded === s.id ? null : s.id)}
            className="flex w-full items-center gap-3 p-5 text-left"
          >
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-heading">
                {s.summary?.slice(0, 120) || "Session " + s.session_id?.slice(0, 8)}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                {s.session_id?.slice(0, 12)} - {timeAgo(s.created_at)}
              </p>
            </div>
            <ChevronRight
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded === s.id ? "rotate-90" : ""}`}
            />
          </button>
          {expanded === s.id && (
            <div className="border-t border-border/30 px-5 pb-5 pt-4">
              <p className="text-sm text-body leading-relaxed">{s.summary}</p>
              {s.key_decisions && s.key_decisions.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-medium text-heading">Key decisions:</span>
                  <ul className="mt-1 space-y-1">
                    {s.key_decisions.map((d, i) => (
                      <li key={i} className="text-xs text-body">- {d}</li>
                    ))}
                  </ul>
                </div>
              )}
              {s.topics && s.topics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.topics.map((t) => (
                    <span key={t} className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Facts (Layer 4)                                           */
/* ------------------------------------------------------------------ */

function FactsSection() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    const params: Record<string, string> = {};
    if (query) params.query = query;
    if (showAll) params.show_all = "true";
    fetchAdmin<{ data: Fact[] }>("facts", params)
      .then((r) => setFacts(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [query, showAll]);

  useEffect(() => { load(); }, [load]);

  const archiveFact = async (factId: string) => {
    try {
      await postAdmin("delete_fact", { fact_id: factId });
      setFacts((prev) => prev.map((f) => (f.id === factId ? { ...f, status: "archived" } : f)));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search + filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search facts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-border/40 bg-card/20 py-2.5 pl-10 pr-4 text-sm text-heading placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className={`rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors ${
            showAll
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border/40 bg-card/20 text-body hover:bg-card/40"
          }`}
        >
          {showAll ? "All statuses" : "Active only"}
        </button>
      </div>

      {error && <ErrorBanner message={error} onRetry={load} />}

      {loading ? (
        <div className="animate-pulse rounded-xl bg-card/20 p-8 text-center text-sm text-body">Loading...</div>
      ) : !facts.length ? (
        <EmptyState message="No facts found. Use add_fact via MCP to store extracted facts." />
      ) : (
        <div className="space-y-2">
          {facts.map((f) => (
            <div
              key={f.id}
              className="group flex items-start gap-4 rounded-xl border border-border/40 bg-card/20 p-4 transition-colors hover:border-primary/30"
            >
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-heading">{f.fact}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-muted/20 px-1.5 py-0.5 font-mono text-[10px] text-body">{f.category}</span>
                  <DecayBadge tier={f.decay_tier} />
                  <StatusBadge status={f.status} />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {Math.round(f.confidence * 100)}% confidence
                  </span>
                  <span className="text-[10px] text-muted-foreground">{timeAgo(f.created_at)}</span>
                </div>
              </div>
              {f.status === "active" && (
                <button
                  onClick={() => archiveFact(f.id)}
                  title="Archive fact"
                  className="shrink-0 rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                >
                  <Archive className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Conversation Logs (Layer 5)                               */
/* ------------------------------------------------------------------ */

function LogsSection() {
  const [sessions, setSessions] = useState<ConversationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchAdmin<{ data: ConversationSession[] }>("conversations")
      .then((r) => setSessions(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error) return <ErrorBanner message={error} onRetry={load} />;
  if (loading) return <div className="animate-pulse rounded-xl bg-card/20 p-8 text-center text-sm text-body">Loading...</div>;
  if (!sessions.length) return <EmptyState message="No conversation logs yet. Use log_conversation via MCP during sessions." />;

  return (
    <div className="space-y-2">
      {sessions.map((s) => (
        <div
          key={s.session_id}
          className="flex items-center gap-4 rounded-xl border border-border/40 bg-card/20 p-4 transition-colors hover:border-primary/30 hover:bg-card/40"
        >
          <MessageSquare className="h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-xs font-medium text-heading">{s.session_id}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{timeAgo(s.last_message)}</p>
          </div>
          <span className="shrink-0 rounded bg-muted/20 px-2 py-0.5 font-mono text-xs text-body">
            {s.message_count} messages
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Code Dumps (Layer 6)                                      */
/* ------------------------------------------------------------------ */

function CodeSection() {
  const [dumps, setDumps] = useState<CodeDump[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchAdmin<{ data: CodeDump[] }>("code")
      .then((r) => setDumps(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error) return <ErrorBanner message={error} onRetry={load} />;
  if (loading) return <div className="animate-pulse rounded-xl bg-card/20 p-8 text-center text-sm text-body">Loading...</div>;
  if (!dumps.length) return <EmptyState message="No code dumps yet. Use store_code via MCP to save code snapshots." />;

  return (
    <div className="space-y-3">
      {dumps.map((d) => (
        <div key={d.id} className="rounded-xl border border-border/40 bg-card/20 transition-colors hover:border-primary/30">
          <button
            onClick={() => setExpanded(expanded === d.id ? null : d.id)}
            className="flex w-full items-center gap-3 p-4 text-left"
          >
            <Code2 className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-xs font-medium text-heading">{d.file_path}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="rounded bg-muted/20 px-1.5 py-0.5 font-mono text-[10px] text-body">{d.language}</span>
                <span className="text-[10px] text-muted-foreground">{timeAgo(d.created_at)}</span>
              </div>
            </div>
            <ChevronRight
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded === d.id ? "rotate-90" : ""}`}
            />
          </button>
          {expanded === d.id && (
            <div className="border-t border-border/30 p-4">
              {d.description && <p className="mb-3 text-xs text-body">{d.description}</p>}
              <pre className="max-h-80 overflow-auto rounded-lg bg-black/30 p-4 font-mono text-xs text-body">
                {d.content}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Search                                                    */
/* ------------------------------------------------------------------ */

function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(() => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    fetchAdmin<{ data: Array<Record<string, unknown>> }>("search", { query: query.trim() })
      .then((r) => setResults(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search across all memory layers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
            className="w-full rounded-lg border border-border/40 bg-card/20 py-2.5 pl-10 pr-4 text-sm text-heading placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>
        <button
          onClick={doSearch}
          disabled={!query.trim() || loading}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Search
        </button>
      </div>

      {error && <ErrorBanner message={error} />}

      {loading ? (
        <div className="animate-pulse rounded-xl bg-card/20 p-8 text-center text-sm text-body">Searching...</div>
      ) : searched && !results.length ? (
        <EmptyState message="No results found. Try a different search term." />
      ) : (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="rounded-xl border border-border/40 bg-card/20 p-4">
              <pre className="max-h-40 overflow-auto text-xs text-body">{JSON.stringify(r, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function MemoryAdminPage() {
  const [active, setActive] = useState<Section>("overview");
  const [status, setStatus] = useState<StatusData | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadStatus = useCallback(() => {
    setStatusLoading(true);
    setStatusError(null);
    fetchAdmin<StatusData>("status")
      .then(setStatus)
      .catch((e) => setStatusError(e.message))
      .finally(() => setStatusLoading(false));
  }, []);

  useEffect(() => { loadStatus(); }, [loadStatus]);

  const navigate = (section: Section) => {
    setActive(section);
    setSidebarOpen(false);
  };

  const sectionContent: Record<Section, JSX.Element> = {
    overview: (
      <OverviewSection
        status={status}
        loading={statusLoading}
        error={statusError}
        onRetry={loadStatus}
        onNavigate={navigate}
      />
    ),
    context: <ContextSection />,
    library: <LibrarySection />,
    sessions: <SessionsSection />,
    facts: <FactsSection />,
    logs: <LogsSection />,
    code: <CodeSection />,
    search: <SearchSection />,
  };

  const activeNav = NAV_ITEMS.find((n) => n.id === active);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-32 pt-28">
        <FadeIn>
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Memory Admin</h1>
                <p className="text-sm text-body">Manage your agent's persistent memory across all 6 layers</p>
              </div>
            </div>
            <button
              onClick={loadStatus}
              className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/20 px-3 py-2 text-xs text-body transition-colors hover:bg-card/40"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${statusLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </FadeIn>

        <div className="flex gap-6 lg:gap-8">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Brain className="h-5 w-5" />}
          </button>

          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? "fixed inset-0 z-30 flex items-end bg-black/50 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent" : "hidden lg:block"
            } w-full lg:w-52 lg:shrink-0`}
          >
            <nav
              className={`${
                sidebarOpen ? "w-full rounded-t-2xl bg-card p-4 lg:rounded-none lg:bg-transparent lg:p-0" : ""
              } flex flex-col gap-1`}
            >
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      active === item.id
                        ? "bg-primary/10 font-medium text-heading"
                        : "text-body hover:bg-card/40 hover:text-heading"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.layer !== undefined && (
                      <span className="font-mono text-[10px] text-muted-foreground">L{item.layer}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Section header */}
            {activeNav && active !== "overview" && (
              <div className="mb-6 flex items-center gap-2">
                <activeNav.icon className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-heading">{activeNav.label}</h2>
                {activeNav.layer !== undefined && (
                  <span className="rounded border border-border/40 bg-muted/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    Layer {activeNav.layer}
                  </span>
                )}
              </div>
            )}
            {sectionContent[active]}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
