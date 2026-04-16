import { useEffect, useState } from "react";
import { Database, FileText, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface StorageData {
  fact_count: number;
  business_context_count: number;
  library_count: number;
  session_count: number;
  conversation_count: number;
  code_count: number;
  total_items: number;
}

const FACT_LIMIT = 500;
const ITEM_LIMIT = 5000;

function ProgressBar({ label, value, max, icon: Icon }: { label: string; value: number; max: number; icon: React.ElementType }) {
  const pct = Math.min((value / max) * 100, 100);
  const isWarning = pct >= 80;

  return (
    <div className="flex-1">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-white/60">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
        <span className={isWarning ? "font-medium text-amber-400" : "text-white/40"}>
          {value.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full transition-all ${isWarning ? "bg-amber-500" : "bg-[#E2B93B]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function StorageBar() {
  const [data, setData] = useState<StorageData | null>(null);

  useEffect(() => {
    fetch("/api/memory-admin?action=admin_memory_activity&method=storage")
      .then((r) => r.json())
      .then((body) => setData(body as StorageData))
      .catch(() => {});
  }, []);

  if (!data) return null;

  const factPct = (data.fact_count / FACT_LIMIT) * 100;
  const showUpsell = factPct >= 80;

  return (
    <div className="mb-6 rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <ProgressBar icon={FileText} label="Facts" value={data.fact_count} max={FACT_LIMIT} />
        <ProgressBar icon={Database} label="Total items" value={data.total_items} max={ITEM_LIMIT} />
      </div>
      {showUpsell && (
        <div className="mt-3 flex items-center gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-400">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span>
            You're using {data.fact_count} of {FACT_LIMIT} facts.{" "}
            <Link to="/pricing" className="font-medium underline hover:text-amber-300">
              Upgrade to Pro &rarr;
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
