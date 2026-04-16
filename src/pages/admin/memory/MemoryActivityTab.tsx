import { useEffect, useState } from "react";
import { Activity, TrendingDown, Eye } from "lucide-react";
import EmptyState from "./EmptyState";

interface FactsByDay {
  [date: string]: number;
}

interface DecayedFact {
  id: string;
  fact: string;
  category: string;
  decay_tier: string;
  updated_at: string;
  status: string;
}

interface TopFact {
  id: string;
  fact: string;
  category: string;
  access_count: number;
  decay_tier: string;
}

interface StorageData {
  fact_count: number;
  business_context_count: number;
  library_count: number;
  session_count: number;
  conversation_count: number;
  code_count: number;
  total_items: number;
}

const DECAY_COLORS: Record<string, { dot: string; text: string }> = {
  hot: { dot: "bg-red-500", text: "text-red-500" },
  warm: { dot: "bg-amber-500", text: "text-amber-500" },
  cold: { dot: "bg-blue-400", text: "text-blue-400" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MemoryActivityTab() {
  const [factsByDay, setFactsByDay] = useState<FactsByDay>({});
  const [storage, setStorage] = useState<StorageData | null>(null);
  const [recentDecay, setRecentDecay] = useState<DecayedFact[]>([]);
  const [topFacts, setTopFacts] = useState<TopFact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/memory-admin?action=admin_memory_activity&method=facts_by_day").then((r) => r.json()),
      fetch("/api/memory-admin?action=admin_memory_activity&method=storage").then((r) => r.json()),
      fetch("/api/memory-admin?action=admin_memory_activity&method=recent_decay").then((r) => r.json()),
      fetch("/api/memory-admin?action=admin_memory_activity&method=most_accessed").then((r) => r.json()),
    ])
      .then(([fbd, stor, decay, top]) => {
        setFactsByDay((fbd as { data: FactsByDay }).data ?? {});
        setStorage(stor as StorageData);
        setRecentDecay((decay as { data: DecayedFact[] }).data ?? []);
        setTopFacts((top as { data: TopFact[] }).data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-xs text-white/40">Loading activity...</div>;
  }

  const dayEntries = Object.entries(factsByDay).sort(([a], [b]) => a.localeCompare(b));
  const maxDayCount = Math.max(...Object.values(factsByDay), 1);
  const hasActivity = dayEntries.length > 0 || recentDecay.length > 0 || topFacts.length > 0;

  if (!hasActivity) {
    return (
      <EmptyState
        icon={Activity}
        heading="No activity yet"
        description="Memory metrics appear as your agent uses the system. Start a session to see activity here."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Facts per day */}
      {dayEntries.length > 0 && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-medium text-white/60">
            <Activity className="h-3.5 w-3.5 text-[#E2B93B]" />
            Facts created per day (last 30 days)
          </h3>
          <div className="space-y-1.5">
            {dayEntries.map(([date, count]) => (
              <div key={date} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-right font-mono text-[10px] text-white/40">
                  {formatDate(date)}
                </span>
                <div className="flex-1">
                  <div
                    className="h-4 rounded bg-[#E2B93B]/30"
                    style={{ width: `${(count / maxDayCount) * 100}%`, minWidth: "4px" }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right font-mono text-[10px] text-white/50">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storage summary */}
      {storage && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h3 className="mb-3 text-xs font-medium text-white/60">Storage breakdown</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Facts", count: storage.fact_count },
              { label: "Context", count: storage.business_context_count },
              { label: "Library", count: storage.library_count },
              { label: "Sessions", count: storage.session_count },
              { label: "Conversations", count: storage.conversation_count },
              { label: "Code", count: storage.code_count },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 text-center"
              >
                <div className="text-lg font-semibold text-white">{item.count}</div>
                <div className="text-[10px] text-white/40">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Most accessed facts */}
      {topFacts.length > 0 && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-medium text-white/60">
            <Eye className="h-3.5 w-3.5 text-[#E2B93B]" />
            Most accessed facts (top 10)
          </h3>
          <div className="space-y-2">
            {topFacts.map((fact) => {
              const decay = DECAY_COLORS[fact.decay_tier] ?? DECAY_COLORS.cold;
              return (
                <div
                  key={fact.id}
                  className="flex items-center gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <span className="shrink-0 rounded bg-[#E2B93B]/15 px-2 py-0.5 font-mono text-xs font-bold text-[#E2B93B]">
                    {fact.access_count}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-white/80">{fact.fact}</p>
                    <span className="text-[10px] text-white/30">{fact.category}</span>
                  </div>
                  <span className="inline-flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${decay.dot}`} />
                    <span className={`text-[10px] ${decay.text}`}>{fact.decay_tier}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent decay transitions */}
      {recentDecay.length > 0 && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-medium text-white/60">
            <TrendingDown className="h-3.5 w-3.5 text-[#E2B93B]" />
            Recent decay transitions
          </h3>
          <div className="space-y-2">
            {recentDecay.map((fact) => {
              const decay = DECAY_COLORS[fact.decay_tier] ?? DECAY_COLORS.cold;
              return (
                <div
                  key={fact.id}
                  className="flex items-center gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <span className="inline-flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${decay.dot}`} />
                    <span className={`text-[10px] font-medium ${decay.text}`}>
                      {fact.decay_tier}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-white/80">{fact.fact}</p>
                    <span className="text-[10px] text-white/30">{fact.category}</span>
                  </div>
                  <span className="shrink-0 text-[10px] text-white/30">
                    {formatDate(fact.updated_at)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
