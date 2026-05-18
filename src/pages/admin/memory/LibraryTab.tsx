import { useEffect, useMemo, useState, useCallback } from "react";
import { ChevronDown, ChevronRight, BookOpen, History, RefreshCw } from "lucide-react";
import { groupMemoryTaxonomyShelves } from "@/lib/memoryTaxonomy";
import EmptyState from "./EmptyState";

interface LibraryDoc {
  id: string;
  slug: string;
  title: string;
  category?: string;
  tags?: string[];
  version: number;
  updated_at: string;
  decay_tier?: string;
  content?: string;
}

interface RefreshPlanSummary {
  dry_run: boolean;
  commit: boolean;
  source_count: number;
  snapshot_count: number;
  written_count: number;
  fact_count: number;
  session_count: number;
}

interface HistoryEntry {
  id: string;
  slug: string;
  version: number;
  title: string;
  content: string;
  created_at: string;
}

const DECAY_COLORS: Record<string, string> = {
  hot: "bg-red-500",
  warm: "bg-amber-500",
  cold: "bg-blue-400",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function LibraryTab({ apiKey }: { apiKey: string }) {
  const [docs, setDocs] = useState<LibraryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [docContent, setDocContent] = useState<string | null>(null);
  const [docLoading, setDocLoading] = useState(false);
  const [historySlug, setHistorySlug] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [collapsedShelfIds, setCollapsedShelfIds] = useState<Set<string>>(() => new Set());
  const [refreshing, setRefreshing] = useState(false);
  const [refreshPlan, setRefreshPlan] = useState<RefreshPlanSummary | null>(null);
  const [refreshError, setRefreshError] = useState<string | null>(null);
  const shelves = useMemo(() => groupMemoryTaxonomyShelves(docs), [docs]);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/memory-admin?action=admin_library&method=list", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.ok) {
        const body = await res.json();
        setDocs(body.data ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => { load(); }, [load]);

  const runRefresh = useCallback(async (commit: boolean) => {
    setRefreshing(true);
    setRefreshError(null);
    try {
      const res = await fetch("/api/memory-admin?action=admin_library&method=refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commit }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setRefreshError(typeof body?.detail === "string" ? body.detail : "Refresh failed");
        return;
      }
      const body = await res.json();
      const plan = body?.data as RefreshPlanSummary | undefined;
      if (plan) setRefreshPlan(plan);
      if (commit) await load();
    } catch (err) {
      setRefreshError(err instanceof Error ? err.message : "Refresh failed");
    } finally {
      setRefreshing(false);
    }
  }, [apiKey, load]);

  const planRefresh = useCallback(() => runRefresh(false), [runRefresh]);
  const commitRefresh = useCallback(() => runRefresh(true), [runRefresh]);
  const dismissRefreshPlan = useCallback(() => {
    setRefreshPlan(null);
    setRefreshError(null);
  }, []);

  const viewDoc = async (doc: LibraryDoc) => {
    if (expandedId === doc.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(doc.id);
    setDocLoading(true);
    setHistorySlug(null);
    try {
      const res = await fetch(
        `/api/memory-admin?action=admin_library&method=view&id=${encodeURIComponent(doc.id)}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      if (res.ok) {
        const body = await res.json();
        setDocContent(body.data?.content ?? null);
      }
    } finally {
      setDocLoading(false);
    }
  };

  const viewHistory = async (slug: string) => {
    if (historySlug === slug) {
      setHistorySlug(null);
      return;
    }
    setHistorySlug(slug);
    setHistoryLoading(true);
    try {
      const res = await fetch(
        `/api/memory-admin?action=admin_library&method=history&slug=${encodeURIComponent(slug)}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      if (res.ok) {
        const body = await res.json();
        setHistory(body.data ?? []);
      }
    } finally {
      setHistoryLoading(false);
    }
  };

  const toggleShelf = (shelfId: string) => {
    setCollapsedShelfIds((current) => {
      const next = new Set(current);
      if (next.has(shelfId)) next.delete(shelfId);
      else next.add(shelfId);
      return next;
    });
  };

  if (loading) {
    return <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 animate-pulse rounded-lg bg-white/[0.03] border border-white/[0.06]" />)}</div>;
  }

  const refreshBar = (
    <div className="space-y-3" data-testid="library-refresh-bar">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={planRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] px-3 py-1.5 text-xs text-white/60 hover:bg-white/[0.04] hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Preview snapshot refresh"}
        </button>
        {refreshPlan && (
          <span className="text-[11px] text-white/50">
            Plan: {refreshPlan.snapshot_count} snapshots from {refreshPlan.fact_count} facts, {refreshPlan.session_count} sessions
            {refreshPlan.commit ? ` (wrote ${refreshPlan.written_count})` : " (dry run)"}
          </span>
        )}
      </div>
      {refreshPlan && !refreshPlan.commit && refreshPlan.snapshot_count > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={commitRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/[0.08] px-3 py-1.5 text-xs text-emerald-200 hover:bg-emerald-500/[0.15] transition-colors disabled:opacity-50"
          >
            Apply refresh to Library
          </button>
          <button
            type="button"
            onClick={dismissRefreshPlan}
            className="text-[11px] text-white/40 hover:text-white/70"
          >
            Dismiss
          </button>
        </div>
      )}
      {refreshError && (
        <p className="text-[11px] text-rose-300">Refresh error: {refreshError}</p>
      )}
    </div>
  );

  if (docs.length === 0) {
    return (
      <div className="space-y-5">
        {refreshBar}
        <EmptyState
          icon={BookOpen}
          heading="No Library Snapshots yet"
          description="Automatic taxonomy snapshots appear here once durable facts and sessions are compacted into source-linked memory shelves."
          steps={[
            "Save durable facts, decisions, and project state through Memory",
            "Snapshots group related facts by taxonomy and keep source pointers",
            "AI seats read compact shelves first, then open raw sources only when needed",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {refreshBar}
      {shelves.map((shelf) => {
        const isCollapsed = collapsedShelfIds.has(shelf.id);
        return (
          <section key={shelf.id} className="space-y-2">
            <button
              onClick={() => toggleShelf(shelf.id)}
              className="flex w-full items-center gap-2 border-b border-white/[0.06] pb-2 text-left text-xs text-white/50 hover:text-white transition-colors"
            >
              {isCollapsed
                ? <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/30" />
                : <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/30" />
              }
              <span className="font-semibold text-white/70">{shelf.label}</span>
              <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-white/35">{shelf.count}</span>
            </button>

            {!isCollapsed && shelf.docs.map((doc) => {
              const isExpanded = expandedId === doc.id;
              const showingHistory = historySlug === doc.slug;

              return (
                <div key={doc.id} className="rounded-lg border border-white/[0.06] bg-white/[0.03] overflow-hidden">
                  <button
                    onClick={() => viewDoc(doc)}
                    className="flex w-full items-start gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    {isExpanded
                      ? <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                      : <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                    }
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{doc.title}</span>
                        {doc.decay_tier && (
                          <span className="flex items-center gap-1 text-[10px] text-white/30">
                            <span className={`inline-block h-1.5 w-1.5 rounded-full ${DECAY_COLORS[doc.decay_tier] ?? "bg-gray-500"}`} />
                            {doc.decay_tier}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-white/30">
                        <code className="font-mono text-white/40">{doc.slug}</code>
                        <span>v{doc.version}</span>
                        <span>updated {formatDate(doc.updated_at)}</span>
                      </div>
                      {(doc.tags ?? []).length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {doc.tags!.map((t) => (
                            <span key={t} className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-white/40">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-white/[0.06] p-4 space-y-3">
                      {docLoading ? (
                        <p className="text-xs text-white/30">Loading snapshot...</p>
                      ) : docContent ? (
                        <pre className="max-h-96 overflow-auto rounded-lg bg-white/[0.02] p-4 text-xs text-white/60 whitespace-pre-wrap font-mono">
                          {docContent}
                        </pre>
                      ) : (
                        <p className="text-xs text-white/30">No content available.</p>
                      )}

                      <button
                        onClick={() => viewHistory(doc.slug)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] px-3 py-1.5 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white transition-colors"
                      >
                        <History className="h-3 w-3" />
                        {showingHistory ? "Hide History" : "Snapshot History"}
                      </button>

                      {showingHistory && (
                        <div className="space-y-2">
                          {historyLoading ? (
                            <p className="text-xs text-white/30">Loading history...</p>
                          ) : history.length === 0 ? (
                            <p className="text-xs text-white/30">No version history found.</p>
                          ) : (
                            history.map((h) => (
                              <div key={h.id} className="rounded border border-white/[0.04] bg-white/[0.01] p-3">
                                <div className="flex items-center gap-2 text-[10px] text-white/30">
                                  <span className="font-semibold text-white/50">v{h.version}</span>
                                  <span>{formatDate(h.created_at)}</span>
                                </div>
                                <p className="mt-1 text-xs text-white/40 line-clamp-3">{h.content}</p>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
