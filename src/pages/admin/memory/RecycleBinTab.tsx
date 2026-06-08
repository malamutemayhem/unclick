import { useCallback, useEffect, useMemo, useState } from "react";
import { Archive, Lightbulb, MessageSquare, RotateCcw, Search, Trash2 } from "lucide-react";
import EmptyState from "./EmptyState";

interface RecycledFact {
  id: string;
  fact: string;
  category?: string | null;
  decay_tier?: string | null;
  created_at: string;
  archived_at?: string | null;
  decay_reason?: string | null;
}

interface RecycledSession {
  id: string;
  session_id: string;
  platform?: string | null;
  summary: string;
  topics?: string[] | null;
  created_at: string;
  archived_at?: string | null;
  archive_reason?: string | null;
}

interface RecycleResponse {
  data?: {
    facts?: RecycledFact[];
    sessions?: RecycledSession[];
  };
}

type RecycledItem =
  | {
      kind: "fact";
      id: string;
      title: string;
      body: string;
      meta: string[];
      archivedAt?: string | null;
      reason?: string | null;
    }
  | {
      kind: "session";
      id: string;
      title: string;
      body: string;
      meta: string[];
      archivedAt?: string | null;
      reason?: string | null;
    };

function formatDate(iso?: string | null): string {
  if (!iso) return "Unknown date";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecycleBinTab({ apiKey }: { apiKey: string }) {
  const [facts, setFacts] = useState<RecycledFact[]>([]);
  const [sessions, setSessions] = useState<RecycledSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [emptying, setEmptying] = useState(false);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/memory-admin?action=admin_memory_recycle_bin", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.ok) {
        const body = (await res.json()) as RecycleResponse;
        setFacts(body.data?.facts ?? []);
        setSessions(body.data?.sessions ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => { load(); }, [load]);

  const items = useMemo<RecycledItem[]>(() => {
    const factItems: RecycledItem[] = facts.map((fact) => ({
      kind: "fact",
      id: fact.id,
      title: fact.category || "Saved fact",
      body: fact.fact,
      meta: ["Fact", fact.decay_tier || "memory", formatDate(fact.archived_at || fact.created_at)],
      archivedAt: fact.archived_at,
      reason: fact.decay_reason,
    }));
    const sessionItems: RecycledItem[] = sessions.map((session) => ({
      kind: "session",
      id: session.id,
      title: session.platform || session.session_id || "Chat summary",
      body: session.summary,
      meta: ["Chat", ...(session.topics ?? []).slice(0, 3), formatDate(session.archived_at || session.created_at)],
      archivedAt: session.archived_at,
      reason: session.archive_reason,
    }));
    return [...factItems, ...sessionItems].sort((a, b) => {
      const left = Date.parse(a.archivedAt || "");
      const right = Date.parse(b.archivedAt || "");
      return (Number.isFinite(right) ? right : 0) - (Number.isFinite(left) ? left : 0);
    });
  }, [facts, sessions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.title, item.body, item.kind, item.reason, ...item.meta]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [items, query]);

  async function restore(item: RecycledItem) {
    setBusyId(`${item.kind}:${item.id}`);
    try {
      const action = item.kind === "fact" ? "restore_fact" : "restore_session";
      const body = item.kind === "fact" ? { fact_id: item.id } : { session_id: item.id };
      const res = await fetch(`/api/memory-admin?action=${action}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) await load();
    } finally {
      setBusyId(null);
    }
  }

  async function emptyBin() {
    if (!window.confirm("Permanently empty archived facts and chat summaries? This cannot be restored.")) {
      return;
    }
    setEmptying(true);
    try {
      const res = await fetch("/api/memory-admin?action=empty_memory_recycle_bin", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "EMPTY" }),
      });
      if (res.ok) {
        setFacts([]);
        setSessions([]);
      }
    } finally {
      setEmptying(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg border border-white/[0.06] bg-white/[0.03]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
        <div>
          <p className="text-xs font-semibold text-white/70">Archived memories are hidden from AI recall</p>
          <p className="mt-1 text-xs text-white/40">
            Restore them here, or empty the bin when you want them permanently removed.
          </p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={emptyBin}
            disabled={emptying}
            className="inline-flex items-center gap-1.5 rounded-md border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/10 disabled:cursor-wait disabled:opacity-60"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {emptying ? "Emptying..." : "Empty bin"}
          </button>
        )}
      </div>

      {items.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search archived facts and chats..."
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-[#61C1C4]/50 focus:outline-none"
          />
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState
          icon={Archive}
          heading="Recycle bin is empty"
          description="Deleted facts and chat summaries will appear here first, so they can be restored before permanent removal."
        />
      ) : filtered.length === 0 ? (
        <p className="px-4 py-8 text-center text-xs text-white/40">No archived memories match your search.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => {
            const busy = busyId === `${item.kind}:${item.id}`;
            const Icon = item.kind === "fact" ? Lightbulb : MessageSquare;
            return (
              <article key={`${item.kind}:${item.id}`} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                    <Icon className="h-4 w-4 text-white/40" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-white/80">{item.title}</h3>
                      {item.reason && (
                        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-white/35">
                          {item.reason}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/55">{item.body}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-white/30">
                      {item.meta.map((meta) => (
                        <span key={meta}>{meta}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => restore(item)}
                    disabled={busy}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#61C1C4]/30 px-2.5 py-1.5 text-xs font-medium text-[#61C1C4] transition-colors hover:bg-[#61C1C4]/10 disabled:cursor-wait disabled:opacity-60"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {busy ? "Restoring..." : "Restore"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
