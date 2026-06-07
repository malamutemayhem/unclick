// Per-browser on/off state for the Skills library.
//
// Apps persist their disabled set server-side (tenant_app_state, enforced by the
// MCP server). Skills are still a preview library with no runtime enforcement
// yet, so we keep the user's on/off choices in localStorage instead of inventing
// a backend contract that does not exist. Same shape as the Apps surface (we
// only ever store the DISABLED slugs, so any skill we add later is on by
// default automatically). Mirrors the fishbowl/prefs.ts idiom.

import { useCallback, useEffect, useMemo, useState } from "react";

export const SKILL_PREFS_STORAGE_KEY = "unclick.skills.disabled.v1";

export function loadDisabledSkills(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SKILL_PREFS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((s): s is string => typeof s === "string" && s.length > 0))];
  } catch {
    return [];
  }
}

export function saveDisabledSkills(slugs: string[]): void {
  try {
    window.localStorage.setItem(SKILL_PREFS_STORAGE_KEY, JSON.stringify([...new Set(slugs)]));
  } catch {
    // localStorage may be unavailable (private mode, quota); ignore.
  }
}

/**
 * React hook that loads, exposes, and persists which skills are turned on. All
 * skills are on by default; only the disabled slugs are stored. Returns an
 * `enabled` record (slug -> false for off; missing means on) so it drops
 * straight into SkillsTable, matching the Apps admin contract.
 */
export function useSkillEnablement(allSlugs: string[]) {
  const [disabled, setDisabled] = useState<Set<string>>(() => new Set(loadDisabledSkills()));

  useEffect(() => {
    saveDisabledSkills([...disabled]);
  }, [disabled]);

  const enabled = useMemo(() => {
    const rec: Record<string, boolean> = {};
    disabled.forEach((slug) => {
      rec[slug] = false;
    });
    return rec;
  }, [disabled]);

  const toggle = useCallback((slug: string, on: boolean) => {
    setDisabled((prev) => {
      const next = new Set(prev);
      if (on) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const toggleAll = useCallback(
    (on: boolean) => {
      setDisabled(on ? new Set() : new Set(allSlugs));
    },
    [allSlugs],
  );

  return { enabled, toggle, toggleAll };
}
