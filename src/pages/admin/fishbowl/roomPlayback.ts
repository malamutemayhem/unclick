// Room playback summary for the Boardroom.
//
// Turns the current message window into a 30-second story: since you arrived,
// these decisions were made, these blockers remain, this needs doing, these
// agents were active, and here is the next useful click. It is a pure
// derivation over the same fishbowl_read payload the feed already polls (no new
// API, no second poller), so it can later be folded into the shared derivation
// layer the other Boardroom cards consume.
//
// Limitation honoured by the panel UI: the client only holds the latest window
// (~100 messages, roughly the last few hours), so this is "since recently", not
// a full history. `windowed` flags when the summary may be partial.

import { classifyAuthorType } from "./authorTexture";

export interface PlaybackMessage {
  id: string;
  author_agent_id: string | null;
  author_name?: string | null;
  text: string;
  tags: string[] | null;
  created_at: string;
}

export interface PlaybackHighlight {
  /** Parent message id, so the UI can link back to the post. */
  id: string;
  author: string;
  snippet: string;
  created_at: string;
}

export interface PlaybackAgent {
  agentId: string;
  name: string;
  count: number;
}

export interface RoomPlaybackSummary {
  decisions: PlaybackHighlight[];
  blockers: PlaybackHighlight[];
  needsDoing: PlaybackHighlight[];
  done: PlaybackHighlight[];
  activeAgents: PlaybackAgent[];
  /** The single most useful next click: newest blocker, else newest needs-doing. */
  nextUsefulClick: PlaybackHighlight | null;
  /** Messages considered after de-duping by id. */
  total: number;
  /** True when the window is full, so older history is not represented. */
  windowed: boolean;
}

const NEEDS_DOING_TAGS = new Set(["needs-doing", "handoff", "tripwire"]);
const SNIPPET_MAX = 140;

function hasTag(tags: string[] | null | undefined, tag: string): boolean {
  return tags?.includes(tag) ?? false;
}

function hasAnyTag(tags: string[] | null | undefined, set: Set<string>): boolean {
  return (tags ?? []).some((t) => set.has(t));
}

function snippet(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > SNIPPET_MAX ? `${flat.slice(0, SNIPPET_MAX - 1)}…` : flat;
}

function authorLabel(m: PlaybackMessage): string {
  return (m.author_name ?? "").trim() || m.author_agent_id || "(unnamed agent)";
}

function toHighlight(m: PlaybackMessage): PlaybackHighlight {
  return {
    id: m.id,
    author: authorLabel(m),
    snippet: snippet(m.text),
    created_at: m.created_at,
  };
}

function byNewest(a: PlaybackMessage, b: PlaybackMessage): number {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export interface PlaybackOptions {
  /** Size of the client window; when total reaches this the summary is partial. */
  windowSize?: number;
  maxPerBucket?: number;
  maxAgents?: number;
}

export function buildRoomPlaybackSummary(
  messages: PlaybackMessage[],
  opts: PlaybackOptions = {},
): RoomPlaybackSummary {
  const windowSize = opts.windowSize ?? 100;
  const maxPerBucket = opts.maxPerBucket ?? 5;
  const maxAgents = opts.maxAgents ?? 6;

  // De-dupe by id (the feed can briefly hold overlapping pages), newest first.
  const seen = new Set<string>();
  const unique: PlaybackMessage[] = [];
  for (const m of messages) {
    if (seen.has(m.id)) continue;
    seen.add(m.id);
    unique.push(m);
  }
  const ordered = [...unique].sort(byNewest);

  const bucket = (pred: (m: PlaybackMessage) => boolean): PlaybackHighlight[] =>
    ordered.filter(pred).slice(0, maxPerBucket).map(toHighlight);

  const decisions = bucket((m) => hasTag(m.tags, "decision"));
  const blockers = bucket((m) => hasTag(m.tags, "blocker"));
  const needsDoing = bucket((m) => hasAnyTag(m.tags, NEEDS_DOING_TAGS));
  const done = bucket((m) => hasTag(m.tags, "done"));

  // Active agents: real participants only (skip platform/system posts).
  const counts = new Map<string, PlaybackAgent>();
  for (const m of ordered) {
    if (!m.author_agent_id) continue;
    if (classifyAuthorType(m) === "system") continue;
    const existing = counts.get(m.author_agent_id);
    if (existing) existing.count += 1;
    else counts.set(m.author_agent_id, { agentId: m.author_agent_id, name: authorLabel(m), count: 1 });
  }
  const activeAgents = [...counts.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, maxAgents);

  const nextUsefulClick = blockers[0] ?? needsDoing[0] ?? null;

  return {
    decisions,
    blockers,
    needsDoing,
    done,
    activeAgents,
    nextUsefulClick,
    total: unique.length,
    windowed: unique.length >= windowSize,
  };
}
