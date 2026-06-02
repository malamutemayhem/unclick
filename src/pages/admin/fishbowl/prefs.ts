// Shared view preferences for the Boardroom page.
//
// These are the human viewer's filters (mute an agent, focus on certain tags,
// hide idle agents). They are persisted in localStorage so they survive a
// reload, and applied to the live surfaces (Now Playing strip, message feed,
// connected agents). The pure helpers below are unit-tested in prefs.test.ts.
//
// Note: "Fishbowl" is the load-bearing internal name (storage key, file paths).
// The user-facing surface is always called the Boardroom.

import { useCallback, useEffect, useState } from "react";

export interface FishbowlViewPrefs {
  /** Hide agents that have no current status and have gone quiet. */
  hideIdleAgents: boolean;
  /** When non-empty, the feed only shows messages carrying one of these tags. */
  tagFilters: string[];
  /** agent_ids whose posts and presence are hidden from the viewer. */
  mutedAgentIds: string[];
}

export const DEFAULT_VIEW_PREFS: FishbowlViewPrefs = {
  hideIdleAgents: false,
  tagFilters: [],
  mutedAgentIds: [],
};

// Kept identical to the original Settings key so existing saved prefs migrate
// cleanly. Older payloads also carried pulse/stale/eventsBot fields; we simply
// ignore the ones the viewer can no longer control.
export const VIEW_PREFS_STORAGE_KEY = "unclick.fishbowl.heartbeat.settings";

export const CANONICAL_TAGS = [
  "heartbeat",
  "qc",
  "pr",
  "decision",
  "question",
  "answer",
  "handoff",
  "blocker",
  "done",
  "fyi",
] as const;

export function loadViewPrefs(): FishbowlViewPrefs {
  if (typeof window === "undefined") return DEFAULT_VIEW_PREFS;
  try {
    const raw = window.localStorage.getItem(VIEW_PREFS_STORAGE_KEY);
    if (!raw) return DEFAULT_VIEW_PREFS;
    const parsed = JSON.parse(raw) as Partial<FishbowlViewPrefs>;
    return {
      hideIdleAgents: Boolean(parsed.hideIdleAgents),
      tagFilters: Array.isArray(parsed.tagFilters) ? parsed.tagFilters : [],
      mutedAgentIds: Array.isArray(parsed.mutedAgentIds) ? parsed.mutedAgentIds : [],
    };
  } catch {
    return DEFAULT_VIEW_PREFS;
  }
}

export function saveViewPrefs(prefs: FishbowlViewPrefs): void {
  try {
    window.localStorage.setItem(VIEW_PREFS_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage may be unavailable (private mode, quota); ignore.
  }
}

export interface FeedFilterMessage {
  author_agent_id: string | null;
  tags: string[] | null;
}

export function isAgentMuted(
  prefs: FishbowlViewPrefs,
  agentId: string | null | undefined,
): boolean {
  if (!agentId) return false;
  return prefs.mutedAgentIds.includes(agentId);
}

/**
 * Apply the viewer's filters to a list of feed messages: drop muted authors,
 * and (when tag filters are active) keep only messages carrying a matching tag.
 */
export function filterFeedByPrefs<T extends FeedFilterMessage>(
  messages: T[],
  prefs: FishbowlViewPrefs,
): T[] {
  return messages.filter((m) => {
    if (isAgentMuted(prefs, m.author_agent_id)) return false;
    if (prefs.tagFilters.length > 0) {
      const tags = m.tags ?? [];
      if (!tags.some((t) => prefs.tagFilters.includes(t))) return false;
    }
    return true;
  });
}

export interface MutableProfile {
  agent_id: string;
}

/** Remove muted agents from a list of profiles (used for presence surfaces). */
export function filterProfilesByPrefs<T extends MutableProfile>(
  profiles: T[],
  prefs: FishbowlViewPrefs,
): T[] {
  if (prefs.mutedAgentIds.length === 0) return profiles;
  return profiles.filter((p) => !isAgentMuted(prefs, p.agent_id));
}

/** React hook that loads, exposes, and persists the viewer's Boardroom prefs. */
export function useFishbowlViewPrefs() {
  const [prefs, setPrefs] = useState<FishbowlViewPrefs>(loadViewPrefs);

  useEffect(() => {
    saveViewPrefs(prefs);
  }, [prefs]);

  const update = useCallback(
    <K extends keyof FishbowlViewPrefs>(key: K, value: FishbowlViewPrefs[K]) => {
      setPrefs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleTag = useCallback((tag: string) => {
    setPrefs((prev) => ({
      ...prev,
      tagFilters: prev.tagFilters.includes(tag)
        ? prev.tagFilters.filter((t) => t !== tag)
        : [...prev.tagFilters, tag],
    }));
  }, []);

  const toggleMute = useCallback((agentId: string) => {
    setPrefs((prev) => ({
      ...prev,
      mutedAgentIds: prev.mutedAgentIds.includes(agentId)
        ? prev.mutedAgentIds.filter((id) => id !== agentId)
        : [...prev.mutedAgentIds, agentId],
    }));
  }, []);

  return { prefs, update, toggleTag, toggleMute };
}
