/**
 * One filter state, one control: the LENSES array renders as a single
 * horizontal chip row over the full-width Apps list (the earlier left rail
 * cost too much horizontal space; operator removed it 2026-06-12). The chips
 * do not own the state; the page's URL does.
 */

import { LENSES, type AppLens } from "./appLenses";

interface AppLensBarProps {
  lens: AppLens;
  counts: Record<AppLens, number>;
  onSelect: (lens: AppLens) => void;
}

export function AppLensBar({ lens, counts, onSelect }: AppLensBarProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="App lenses">
      {LENSES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={lens === id}
          onClick={() => onSelect(id)}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            lens === id
              ? "bg-[#61C1C4]/15 text-[#9FE0E2]"
              : "bg-white/[0.03] text-white/45 hover:bg-white/[0.06] hover:text-white/75"
          }`}
        >
          {label}
          <span className={`ml-1.5 tabular-nums ${lens === id ? "text-[#9FE0E2]/60" : "text-white/25"}`}>
            {counts[id]}
          </span>
        </button>
      ))}
    </div>
  );
}
