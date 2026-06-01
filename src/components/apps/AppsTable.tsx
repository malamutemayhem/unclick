// The shared Apps library table. One compact, full-width, single-line row per app
// with sortable headers and instant search/category filtering. Rendered in two
// modes:
//   - "public": read-only rows for the signed-out app-store page.
//   - "admin":  adds a checkbox column + enable-all/disable-all + a status pill.
// Both modes share the exact same filtering (useAppFilter) and layout, so the
// signed-out and admin experiences stay in lockstep.

import { Link } from "react-router-dom";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { APP_CATEGORIES, levelLabel, type AppEntry } from "@/lib/appCatalog";
import { AppIcon } from "./AppIcon";
import { useAppFilter, type AppSortKey } from "./useAppFilter";

export interface AppStatus {
  label: string;
  tone: string; // tailwind classes for the pill
}

interface AppsTableProps {
  apps: AppEntry[];
  mode: "public" | "admin";
  /** admin: slug -> enabled. Missing slug is treated as enabled (all on by default). */
  enabled?: Record<string, boolean>;
  onToggle?: (slug: string, next: boolean) => void;
  onToggleAll?: (next: boolean) => void;
  statusOf?: (app: AppEntry) => AppStatus | null;
  busy?: boolean;
}

function SortHeader({
  label, col, sortKey, sortDir, onSort, className,
}: {
  label: string; col: AppSortKey; sortKey: AppSortKey; sortDir: "asc" | "desc";
  onSort: (k: AppSortKey) => void; className?: string;
}) {
  const active = sortKey === col;
  return (
    <button
      type="button"
      onClick={() => onSort(col)}
      className={`flex items-center gap-1 text-left text-[10px] font-semibold uppercase tracking-wide transition-colors ${active ? "text-white/70" : "text-white/35 hover:text-white/55"} ${className ?? ""}`}
    >
      {label}
      {active && (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
    </button>
  );
}

export function AppsTable({ apps, mode, enabled, onToggle, onToggleAll, statusOf, busy }: AppsTableProps) {
  const { query, setQuery, category, setCategory, sortKey, sortDir, toggleSort, filtered } = useAppFilter(apps);
  const isAdmin = mode === "admin";

  const isOn = (slug: string) => (enabled ? enabled[slug] !== false : true);
  const onCount = isAdmin ? filtered.filter((a) => isOn(a.slug)).length : 0;

  // Column template: [check] App | Category | What it does | Tools | Quality/Status
  const cols = isAdmin
    ? "grid-cols-[28px_minmax(140px,1.4fr)_minmax(110px,0.9fr)_minmax(0,2.2fr)_56px_120px]"
    : "grid-cols-[minmax(140px,1.4fr)_minmax(110px,0.9fr)_minmax(0,2.4fr)_56px_96px]";

  return (
    <div>
      {/* Controls */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps or what they can do..."
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/30 focus:border-[#61C1C4]/40 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/40">
          {isAdmin ? (
            <>
              <span>{onCount} of {filtered.length} on</span>
              <button
                type="button"
                disabled={busy}
                onClick={() => onToggleAll?.(true)}
                className="rounded-md border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15 disabled:opacity-50"
              >
                Turn all on
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => onToggleAll?.(false)}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-semibold text-white/60 transition-colors hover:bg-white/[0.07] disabled:opacity-50"
              >
                Turn all off
              </button>
            </>
          ) : (
            <span>{filtered.length} apps</span>
          )}
        </div>
      </div>

      {/* Category chips */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        <Chip label="All" active={category === null} onClick={() => setCategory(null)} />
        {APP_CATEGORIES.map((c) => (
          <Chip key={c} label={c} active={category === c} onClick={() => setCategory(category === c ? null : c)} />
        ))}
      </div>

      {/* Header row */}
      <div className={`grid ${cols} items-center gap-3 border-b border-white/[0.08] px-3 py-2`}>
        {isAdmin && <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">On</span>}
        <SortHeader label="App" col="name" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
        <SortHeader label="Category" col="category" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">What it does</span>
        <SortHeader label="Tools" col="toolCount" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} className="justify-end" />
        <SortHeader label={isAdmin ? "Status" : "Quality"} col="level" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} className="justify-end" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/[0.04]">
        {filtered.map((app) => {
          const on = isOn(app.slug);
          const status = statusOf?.(app) ?? null;
          const quality = levelLabel(app.level);
          return (
            <div
              key={app.slug}
              className={`grid ${cols} items-center gap-3 px-3 py-1.5 text-xs transition-colors hover:bg-white/[0.02] ${isAdmin && !on ? "opacity-45" : ""}`}
            >
              {isAdmin && (
                <input
                  type="checkbox"
                  checked={on}
                  disabled={busy}
                  onChange={(e) => onToggle?.(app.slug, e.target.checked)}
                  className="h-3.5 w-3.5 accent-[#61C1C4]"
                  aria-label={`Turn ${app.name} ${on ? "off" : "on"}`}
                />
              )}
              <Link to={`/apps/${app.slug}`} className="flex min-w-0 items-center gap-2">
                <AppIcon name={app.name} category={app.category} />
                <span className="truncate font-medium text-white hover:text-[#9be4e6]">{app.name}</span>
              </Link>
              <span className="truncate text-white/45">{app.category}</span>
              <span className="truncate text-white/50">{app.blurb}</span>
              <span className="text-right tabular-nums text-white/40">{app.toolCount}</span>
              <div className="flex justify-end">
                {isAdmin ? (
                  status ? (
                    <span className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${status.tone}`}>{status.label}</span>
                  ) : (
                    <span className="text-[10px] text-white/30">{on ? "On" : "Off"}</span>
                  )
                ) : quality === "Smart" ? (
                  <span className="rounded border border-[#61C1C4]/25 bg-[#61C1C4]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#9be4e6]">Smart</span>
                ) : (
                  <span className="text-[10px] text-white/25">Ready</span>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-3 py-8 text-center text-xs text-white/40">No apps match that search.</div>
        )}
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
        active
          ? "border-[#61C1C4]/40 bg-[#61C1C4]/15 text-[#9be4e6]"
          : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/65"
      }`}
    >
      {label}
    </button>
  );
}
