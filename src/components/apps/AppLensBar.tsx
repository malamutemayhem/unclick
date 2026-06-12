/**
 * One filter state, two controls: the same LENSES array renders as a vertical
 * rail (desktop) and horizontal chips (always visible, scrollable). Both call
 * the same onSelect; neither owns the state (the page's URL does).
 */

import { LENSES, type AppLens } from "./appLenses";

interface AppLensBarProps {
  lens: AppLens;
  counts: Record<AppLens, number>;
  onSelect: (lens: AppLens) => void;
  variant: "rail" | "chips";
}

export function AppLensBar({ lens, counts, onSelect, variant }: AppLensBarProps) {
  if (variant === "chips") {
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

  const groups = [...new Set(LENSES.map((l) => l.group))];
  return (
    <nav className="flex flex-col gap-4" aria-label="App lenses">
      {groups.map((group) => (
        <div key={group}>
          <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">{group}</div>
          <div className="flex flex-col gap-0.5">
            {LENSES.filter((l) => l.group === group).map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-current={lens === id}
                onClick={() => onSelect(id)}
                className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-medium transition-colors ${
                  lens === id
                    ? "bg-[#61C1C4]/12 text-[#9FE0E2]"
                    : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                <span>{label}</span>
                <span className={`tabular-nums text-[10px] ${lens === id ? "text-[#9FE0E2]/60" : "text-white/25"}`}>
                  {counts[id]}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
