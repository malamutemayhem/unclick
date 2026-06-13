/**
 * Memory Time Machine: bi-temporal memory diff.
 *
 * The bi-temporal fact schema already records when every fact was created,
 * invalidated, superseded, or archived, and search_memory can already recall
 * the store as_of a past instant. This module adds the missing companion:
 * a changelog between two instants, answering "what changed in my memory
 * since last week" with receipts instead of vibes.
 *
 * Pure functions only. Both backends (local JSON and Supabase) collect raw
 * rows and delegate the bucketing to buildMemoryDiffReport so the report
 * shape stays identical across storage modes.
 *
 * Exposed through MEMORY_HANDLERS as "memory_diff", so it is callable via
 * unclick_call with endpoint_id "memory.memory_diff" or directly by name.
 */

export const DEFAULT_MEMORY_DIFF_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
export const MEMORY_DIFF_DEFAULT_BUCKET_LIMIT = 20;
export const MEMORY_DIFF_MAX_BUCKET_LIMIT = 100;

const FACT_TEXT_CAP = 160;
const SUMMARY_TEXT_CAP = 240;

export interface MemoryDiffInput {
  /**
   * ISO 8601 timestamp or relative duration like "30m", "2h", "7d", "4w"
   * (measured back from now). Defaults to 7 days before `to`. The MCP
   * handler also accepts `since` as an alias for `from`.
   */
  from?: string;
  /** ISO 8601 timestamp or relative duration, measured back from now. Default now. */
  to?: string;
  /** Max entries returned per bucket (1-100, default 20). Counts stay exact totals. */
  limit?: number;
  /** Include session summaries saved in the window (default true). */
  include_sessions?: boolean;
}

/** Raw fact row shape both backends can supply without reshaping. */
export interface MemoryDiffFactSourceRow {
  id: string;
  fact: string;
  category?: string | null;
  confidence?: number | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  valid_to?: string | null;
  invalidated_at?: string | null;
  invalidation_reason?: string | null;
  superseded_by?: string | null;
  archived_at?: string | null;
  decay_reason?: string | null;
}

export interface MemoryDiffSessionSourceRow {
  session_id?: string | null;
  platform?: string | null;
  summary?: string | null;
  topics?: unknown;
  decisions?: unknown;
  created_at?: string | null;
}

export interface MemoryDiffWindow {
  from: string;
  to: string;
}

export interface MemoryDiffFactAdded {
  id: string;
  fact: string;
  category: string;
  confidence: number | null;
  created_at: string;
}

export interface MemoryDiffFactSuperseded {
  id: string;
  fact: string;
  category: string;
  superseded_by: string;
  superseded_at: string;
}

export interface MemoryDiffFactInvalidated {
  id: string;
  fact: string;
  category: string;
  invalidated_at: string;
  reason: string | null;
}

export interface MemoryDiffFactArchived {
  id: string;
  fact: string;
  category: string;
  archived_at: string;
  reason: string | null;
}

export interface MemoryDiffSessionSaved {
  session_id: string;
  platform: string;
  summary: string;
  topics: string[];
  decisions: string[];
  created_at: string;
}

export interface MemoryDiffCounts {
  facts_added: number;
  facts_superseded: number;
  facts_invalidated: number;
  facts_archived: number;
  sessions_saved: number;
}

export interface MemoryDiffReport {
  window: MemoryDiffWindow;
  headline: string;
  facts_added: MemoryDiffFactAdded[];
  facts_superseded: MemoryDiffFactSuperseded[];
  facts_invalidated: MemoryDiffFactInvalidated[];
  facts_archived: MemoryDiffFactArchived[];
  sessions_saved: MemoryDiffSessionSaved[];
  counts: MemoryDiffCounts;
  response_bounds: {
    per_bucket_limit: number;
    truncated_buckets: string[];
    /**
     * Buckets the backend could not compute, e.g. a BYOD database whose
     * installer schema predates a bi-temporal column. Their counts read 0;
     * treat them as unknown, not empty.
     */
    unavailable_buckets: string[];
  };
}

const RELATIVE_DURATION_PATTERN = /^(\d+)\s*([smhdw])$/i;
const BARE_NUMBER_PATTERN = /^\d+(\.\d+)?$/;

const DURATION_UNIT_MS: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  w: 7 * 24 * 60 * 60 * 1000,
};

function parsePoint(raw: string, nowMs: number): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  // A bare number like "7" is ambiguous (7 what?) and Date.parse would treat
  // it as a year. Reject it so the caller gets the actionable error below.
  if (BARE_NUMBER_PATTERN.test(trimmed)) return null;
  const relative = RELATIVE_DURATION_PATTERN.exec(trimmed);
  if (relative) {
    const amount = Number(relative[1]);
    const unitMs = DURATION_UNIT_MS[relative[2].toLowerCase()];
    if (!Number.isFinite(amount) || !unitMs) return null;
    return nowMs - amount * unitMs;
  }
  const parsed = Date.parse(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Resolve the diff window. Accepts ISO timestamps or relative durations
 * (measured back from now). When only `to` is given, `from` anchors to
 * 7 days before it. An explicitly reversed window is swapped, not rejected,
 * because agents routinely pass the two points in either order.
 */
export function resolveMemoryDiffWindow(
  fromRaw?: string,
  toRaw?: string,
  nowIso?: string
): MemoryDiffWindow {
  const nowMs = nowIso ? Date.parse(nowIso) : Date.now();
  if (!Number.isFinite(nowMs)) {
    throw new Error(`memory_diff: invalid reference time '${nowIso}'`);
  }

  const toMs = toRaw && toRaw.trim() ? parsePoint(toRaw, nowMs) : nowMs;
  if (toMs === null) {
    throw new Error(
      `memory_diff: invalid 'to' value '${toRaw}'. Use an ISO 8601 timestamp or a relative duration like '1d', '12h', '30m'.`
    );
  }

  const fromMs =
    fromRaw && fromRaw.trim()
      ? parsePoint(fromRaw, nowMs)
      : toMs - DEFAULT_MEMORY_DIFF_WINDOW_MS;
  if (fromMs === null) {
    throw new Error(
      `memory_diff: invalid 'from' value '${fromRaw}'. Use an ISO 8601 timestamp or a relative duration like '7d', '12h', '30m'.`
    );
  }

  const start = Math.min(fromMs, toMs);
  const end = Math.max(fromMs, toMs);
  return { from: new Date(start).toISOString(), to: new Date(end).toISOString() };
}

export function normalizeMemoryDiffBucketLimit(raw?: number): number {
  if (typeof raw !== "number" || !Number.isFinite(raw)) return MEMORY_DIFF_DEFAULT_BUCKET_LIMIT;
  return Math.min(Math.max(Math.floor(raw), 1), MEMORY_DIFF_MAX_BUCKET_LIMIT);
}

function cap(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function stringList(value: unknown, limit = 5, max = 80): string[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, limit).map((item) => cap(String(item), max));
}

function byNewest(a: { at: number }, b: { at: number }): number {
  return b.at - a.at;
}

function timeOf(value: string | null | undefined): number {
  const parsed = value ? Date.parse(value) : NaN;
  return Number.isFinite(parsed) ? parsed : 0;
}

function plural(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

/**
 * Bucket raw rows into a changelog. Rows outside the window are ignored, so
 * backends may pass either pre-filtered rows (Supabase) or whole tables
 * (local). Duplicate fact ids collapse to a single row before bucketing.
 *
 * exact_counts lets a backend that fetched capped row sets (Supabase) supply
 * exact window totals from count queries; buckets without an override fall
 * back to counting the supplied rows.
 */
export function buildMemoryDiffReport(params: {
  facts: MemoryDiffFactSourceRow[];
  sessions: MemoryDiffSessionSourceRow[];
  window: MemoryDiffWindow;
  limit?: number;
  include_sessions?: boolean;
  exact_counts?: Partial<MemoryDiffCounts>;
  unavailable_buckets?: string[];
}): MemoryDiffReport {
  const { window } = params;
  const limit = normalizeMemoryDiffBucketLimit(params.limit);
  const includeSessions = params.include_sessions !== false;
  const windowFromMs = Date.parse(window.from);
  const windowToMs = Date.parse(window.to);
  const unavailable = [...new Set(params.unavailable_buckets ?? [])];

  function inWindow(value: string | null | undefined): boolean {
    if (!value) return false;
    const parsed = Date.parse(value);
    if (!Number.isFinite(parsed)) return false;
    return parsed >= windowFromMs && parsed <= windowToMs;
  }

  const seen = new Set<string>();
  const facts = params.facts.filter((row) => {
    if (!row || typeof row.id !== "string" || seen.has(row.id)) return false;
    seen.add(row.id);
    return true;
  });

  const added = facts
    .filter((row) => inWindow(row.created_at))
    .map((row) => ({
      at: timeOf(row.created_at),
      entry: {
        id: row.id,
        fact: cap(row.fact ?? "", FACT_TEXT_CAP),
        category: row.category ?? "general",
        confidence: typeof row.confidence === "number" ? row.confidence : null,
        created_at: row.created_at as string,
      } satisfies MemoryDiffFactAdded,
    }));

  // A superseded fact may also carry an invalidation close stamp, so
  // superseded_by is the discriminator between the two buckets. Supabase
  // supersede RPCs set updated_at but not valid_to, hence the fallback.
  const superseded = facts
    .filter((row) => row.superseded_by && inWindow(row.valid_to ?? row.updated_at))
    .map((row) => {
      const at = (row.valid_to ?? row.updated_at) as string;
      return {
        at: timeOf(at),
        entry: {
          id: row.id,
          fact: cap(row.fact ?? "", FACT_TEXT_CAP),
          category: row.category ?? "general",
          superseded_by: row.superseded_by as string,
          superseded_at: at,
        } satisfies MemoryDiffFactSuperseded,
      };
    });

  const invalidated = facts
    .filter((row) => !row.superseded_by && inWindow(row.invalidated_at))
    .map((row) => ({
      at: timeOf(row.invalidated_at),
      entry: {
        id: row.id,
        fact: cap(row.fact ?? "", FACT_TEXT_CAP),
        category: row.category ?? "general",
        invalidated_at: row.invalidated_at as string,
        reason: row.invalidation_reason ?? null,
      } satisfies MemoryDiffFactInvalidated,
    }));

  const archived = facts
    .filter((row) => row.status === "archived" && inWindow(row.archived_at))
    .map((row) => ({
      at: timeOf(row.archived_at),
      entry: {
        id: row.id,
        fact: cap(row.fact ?? "", FACT_TEXT_CAP),
        category: row.category ?? "general",
        archived_at: row.archived_at as string,
        reason: row.decay_reason ?? null,
      } satisfies MemoryDiffFactArchived,
    }));

  const sessions = includeSessions
    ? params.sessions
        .filter((row) => row && inWindow(row.created_at))
        .map((row) => ({
          at: timeOf(row.created_at),
          entry: {
            session_id: row.session_id ?? "",
            platform: row.platform ?? "",
            summary: cap(row.summary ?? "", SUMMARY_TEXT_CAP),
            topics: stringList(row.topics),
            decisions: stringList(row.decisions),
            created_at: row.created_at as string,
          } satisfies MemoryDiffSessionSaved,
        }))
    : [];

  const counts: MemoryDiffCounts = {
    facts_added: params.exact_counts?.facts_added ?? added.length,
    facts_superseded: params.exact_counts?.facts_superseded ?? superseded.length,
    facts_invalidated: params.exact_counts?.facts_invalidated ?? invalidated.length,
    facts_archived: params.exact_counts?.facts_archived ?? archived.length,
    sessions_saved: params.exact_counts?.sessions_saved ?? sessions.length,
  };

  const truncatedBuckets: string[] = [];
  function take<T>(bucket: keyof MemoryDiffCounts, items: Array<{ at: number; entry: T }>): T[] {
    items.sort(byNewest);
    if (items.length > limit || counts[bucket] > limit) truncatedBuckets.push(bucket);
    return items.slice(0, limit).map((item) => item.entry);
  }

  const headlineParts = [
    counts.facts_added > 0 ? `${plural(counts.facts_added, "fact")} added` : null,
    counts.facts_superseded > 0 ? `${counts.facts_superseded} superseded` : null,
    counts.facts_invalidated > 0 ? `${counts.facts_invalidated} invalidated` : null,
    counts.facts_archived > 0 ? `${counts.facts_archived} archived` : null,
    counts.sessions_saved > 0 ? `${plural(counts.sessions_saved, "session")} saved` : null,
  ].filter((part): part is string => part !== null);

  const headline =
    headlineParts.length > 0
      ? `${headlineParts.join(", ")} between ${window.from} and ${window.to}`
      : `Nothing changed in memory between ${window.from} and ${window.to}`;

  return {
    window,
    headline,
    facts_added: take("facts_added", added),
    facts_superseded: take("facts_superseded", superseded),
    facts_invalidated: take("facts_invalidated", invalidated),
    facts_archived: take("facts_archived", archived),
    sessions_saved: take("sessions_saved", sessions),
    counts,
    response_bounds: {
      per_bucket_limit: limit,
      truncated_buckets: truncatedBuckets,
      unavailable_buckets: unavailable,
    },
  };
}
