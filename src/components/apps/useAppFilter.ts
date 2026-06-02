// Shared filtering/sorting smarts for the Apps library, used by BOTH the public
// app-store page and the admin Apps page so they behave identically. Mirrors the
// lightweight useMemo + includes() approach used elsewhere (e.g. the Jobsmith
// page): instant, no extra deps. Search also matches an app's underlying tool
// names and descriptions, so "weather" finds Open-Meteo even by capability.

import { useMemo, useState } from "react";
import type { AppEntry } from "@/lib/appCatalog";

export type AppSortKey = "name" | "category" | "toolCount" | "level";
export type SortDir = "asc" | "desc";

export function useAppFilter(apps: AppEntry[]) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<AppSortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = apps;

    if (category) rows = rows.filter((a) => a.category === category);

    if (q) {
      rows = rows.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.blurb.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.slug.includes(q) ||
          a.tools.some(
            (t) => t.name.includes(q) || t.description.toLowerCase().includes(q),
          ),
      );
    }

    const dir = sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "category") cmp = a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      else if (sortKey === "toolCount") cmp = a.toolCount - b.toolCount;
      else if (sortKey === "level") cmp = (a.level ?? 0) - (b.level ?? 0);
      return cmp * dir;
    });
  }, [apps, query, category, sortKey, sortDir]);

  function toggleSort(key: AppSortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      // Text columns read better ascending; numeric columns most-first.
      setSortDir(key === "name" || key === "category" ? "asc" : "desc");
    }
  }

  return {
    query,
    setQuery,
    category,
    setCategory,
    sortKey,
    sortDir,
    toggleSort,
    filtered,
  };
}
