import { useEffect, useState } from "react";
import { Search, Archive, Trash2, Brain } from "lucide-react";
import EmptyState from "./EmptyState";

interface Fact {
  id: string;
  fact: string;
  category: string;
  confidence: number;
  decay_tier: string;
  status: string;
  access_count: number;
  created_at: string;
  updated_at: string;
}

const DECAY_COLORS: Record<string, { dot: string; text: string; label: string }> = {
  hot: { dot: "bg-red-500", text: "text-red-500", label: "Hot" },
  warm: { dot: "bg-amber-500", text: "text-amber-500", label: "Warm" },
  cold: { dot: "bg-blue-400", text: "text-blue-400", label: "Cold" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FactsTab() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const fetchFacts = (search?: string) => {
    const params = new URLSearchParams({ action: "facts" });
    if (search) params.set("query", search);
    if (showAll) params.set("show_all", "true");

    fetch(`/api/memory-admin?${params}`)
      .then((r) => r.json())
      .then((body) => {
        setFacts((body as { data: Fact[] }).data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchFacts(query || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll]);

  const handleSearch = () => {
    setLoading(true);
    fetchFacts(query || undefined);
  };

  const handleArchive = async (factId: string) => {
    await fetch("/api/memory-admin?action=delete_fact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fact_id: factId }),
    });
    fetchFacts(query || undefined);
  };

  if (loading) {
    return <div className="py-12 text-center text-xs text-white/40">Loading facts...</div>;
  }

  return (
    <div>
      {/* Search + Filter bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search facts..."
            className="w-full rounded-md border border-white/[0.06] bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-white placeholder-white/30 focus:border-[#E2B93B]/50 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-white/50">
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
              className="rounded border-white/20 accent-[#E2B93B]"
            />
            Show archived
          </label>
          <button
            onClick={handleSearch}
            className="rounded-md bg-[#E2B93B] px-3 py-1.5 text-xs font-medium text-black hover:opacity-90"
          >
            Search
          </button>
        </div>
      </div>

      {facts.length === 0 ? (
        <EmptyState
          icon={Brain}
          heading="No facts found"
          description={
            query
              ? "No facts match your search. Try a different query."
              : "Your agent hasn't stored any facts yet. Facts are saved automatically during conversations."
          }
        />
      ) : (
        <div className="space-y-2">
          {facts.map((fact) => {
            const decay = DECAY_COLORS[fact.decay_tier] ?? DECAY_COLORS.cold;
            const isArchived = fact.status === "archived";
            const isSuperseded = fact.status === "superseded";

            return (
              <div
                key={fact.id}
                className={`rounded-lg border border-white/[0.06] bg-white/[0.03] p-4 ${
                  isArchived || isSuperseded ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/50">
                        {fact.category}
                      </span>
                      {/* Decay badge */}
                      <span className="inline-flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${decay.dot}`} />
                        <span className={`text-[10px] ${decay.text}`}>{decay.label}</span>
                      </span>
                      {/* Status badge */}
                      {isArchived && (
                        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-white/40">
                          Archived
                        </span>
                      )}
                      {isSuperseded && (
                        <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-400">
                          Superseded
                        </span>
                      )}
                      {fact.confidence < 1 && (
                        <span className="text-[10px] text-white/30">
                          {Math.round(fact.confidence * 100)}% confidence
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white">{fact.fact}</p>
                    <div className="mt-1.5 flex items-center gap-3 text-[10px] text-white/30">
                      <span>{formatDate(fact.created_at)}</span>
                      {fact.access_count > 0 && <span>{fact.access_count} accesses</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  {fact.status === "active" && (
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => handleArchive(fact.id)}
                        title="Archive"
                        className="rounded p-1.5 text-white/30 hover:bg-white/[0.06] hover:text-white"
                      >
                        <Archive className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleArchive(fact.id)}
                        title="Delete"
                        className="rounded p-1.5 text-white/30 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
