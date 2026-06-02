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
import { classifyAuthorType } from "./authorTexture";

/**
 * Which slice of the feed the viewer is looking at.
 * - all: every message in the feed.
 * - my_team: the human plus interactive and cron AI agents; platform/system
 *   posts are hidden so the feed reads as a team control room.
 * - assigned_to_me: only posts the human authored or that name the human in
 *   their recipients.
 */
export type FishbowlFeedScope = "all" | "my_team" | "assigned_to_me";

export const FEED_SCOPES: FishbowlFeedScope[] = ["all", "my_team", "assigned_to_me"];

export interface FishbowlViewPrefs {
  /** Hide agents that have no current status and have gone quiet. */
  hideIdleAgents: boolean;
  /** When non-empty, the feed only shows messages carrying one of these tags. */
  tagFilters: string[];
  /** agent_ids whose posts and presence are hidden from the viewer. */
  mutedAgentIds: string[];
  /** Which slice of the feed to show. Defaults to the viewer's team. */
  scope: FishbowlFeedScope;
}

export const DEFAULT_VIEW_PREFS: FishbowlViewPrefs = {
  hideIdleAgents: false,
  tagFilters: [],
  mutedAgentIds: [],
  scope: "my_team",
};

export function parseFeedScope(value: unknown): FishbowlFeedScope {
  return typeof value === "string" && (FEED_SCOPES as string[]).includes(value)
    ? (value as FishbowlFeedScope)
    : DEFAULT_VIEW_PREFS.scope;
}

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
      scope: parseFeedScope(parsed.scope),
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

export interface ScopeFilterMessage {
  author_agent_id: string | null;
  author_name?: string | null;
  recipients: string[] | null;
  tags: string[] | null;
}

/** The signed-in human, used to resolve the "assigned to me" scope. */
export interface FeedViewer {
  agentId: string | null;
  emoji: string | null;
}

function isAddressedToViewer(m: ScopeFilterMessage, viewer: FeedViewer): boolean {
  if (viewer.agentId && m.author_agent_id === viewer.agentId) return true;
  const recipients = m.recipients ?? [];
  // A broadcast ("all") is not a personal assignment; only exact id/emoji count.
  if (viewer.agentId && recipients.includes(viewer.agentId)) return true;
  if (viewer.emoji && recipients.includes(viewer.emoji)) return true;
  return false;
}

/**
 * Narrow the feed to the chosen scope. "my_team" hides platform/system posts
 * (keeping human, interactive AI, and cron AI); "assigned_to_me" keeps only
 * posts the viewer authored or that name them; "all" is a pass-through.
 */
export function filterFeedByScope<T extends ScopeFilterMessage>(
  messages: T[],
  scope: FishbowlFeedScope,
  viewer: FeedViewer,
): T[] {
  if (scope === "all") return messages;
  if (scope === "my_team") {
    return messages.filter((m) => classifyAuthorType(m) !== "system");
  }
  return messages.filter((m) => isAddressedToViewer(m, viewer));
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
