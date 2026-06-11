/**
 * Schedules: the data layer for UnClick AutoPilot Runner v1.
 *
 * A Schedule is a recurring job definition an agent or the user stores in
 * Memory: "every Monday 08:00 Sydney time, run GEOPass on the site and
 * deliver the result". Schedules are stored as versioned Knowledge Library
 * docs (category "schedule"), the same zero-migration pattern as Playbooks,
 * so local JSON and Supabase backends both work unchanged.
 *
 * This module is deliberately runtime-free: it stores definitions, computes
 * due times, and records run outcomes. The companion runner (a separate
 * opt-in process) polls list_due_schedules and executes the actions. That
 * split keeps the MCP server passive by default; proactivity is opt-in.
 *
 * Action kinds:
 *   - endpoint: a machine-executable unclick_call (exact endpoint_id+params)
 *   - playbook: deliver a wake packet pointing at a saved Playbook for an
 *     agent to execute (playbook steps are recipes, not exact params, so
 *     they are never blind-executed)
 *   - note: deliver a reminder message
 */

import { getBackend } from "./db.js";
import { emitSignal } from "../signals/emit.js";

export const SCHEDULE_CATEGORY = "schedule";
export const SCHEDULE_SLUG_PREFIX = "schedule-";
export const SCHEDULE_DOC_KIND = "schedule_doc_v1";

const MAX_NAME_LENGTH = 120;
const MAX_TEXT_FIELD_LENGTH = 500;
const MAX_TAGS = 8;
const MIN_EVERY_MINUTES = 5;
const MAX_EVERY_MINUTES = 60 * 24 * 28;
const DUE_LOOKAHEAD_DAYS = 8;

export interface ScheduleCadence {
  every?: string;
  daily_at?: string;
  weekday?: string;
  tz?: string;
}

export type ScheduleAction =
  | { kind: "endpoint"; endpoint_id: string; params: Record<string, unknown> }
  | { kind: "playbook"; playbook_slug: string }
  | { kind: "note"; message: string };

export interface ScheduleStats {
  runs: number;
  successes: number;
  failures: number;
  last_run_at?: string;
  last_outcome?: "success" | "failure" | "skipped";
  last_summary?: string;
}

export interface ScheduleDoc {
  kind: typeof SCHEDULE_DOC_KIND;
  name: string;
  description?: string;
  cadence: ScheduleCadence;
  action: ScheduleAction;
  deliver_to: string[];
  enabled: boolean;
  next_due_at: string;
  stats: ScheduleStats;
  source?: { agent_id?: string; session_id?: string };
  created_at: string;
}

type Args = Record<string, unknown>;

const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function cap(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) : text;
}

function nowIso(): string {
  return new Date().toISOString();
}

export function scheduleSlug(nameOrSlug: string): string {
  const base = nameOrSlug
    .toLowerCase()
    .replace(/^schedule-/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${SCHEDULE_SLUG_PREFIX}${base}`;
}

export function parseEveryMinutes(every: string): number | null {
  const m = /^(\d+)(m|h|d)$/.exec(every.trim());
  if (!m) return null;
  const n = Number(m[1]);
  const minutes = m[2] === "m" ? n : m[2] === "h" ? n * 60 : n * 60 * 24;
  if (!Number.isInteger(minutes) || minutes < MIN_EVERY_MINUTES || minutes > MAX_EVERY_MINUTES) {
    return null;
  }
  return minutes;
}

function isValidTimezone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/** Offset between a timezone's wall clock and UTC at a given instant. */
function tzOffsetMs(tz: string, at: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts: Record<string, string> = {};
  for (const p of dtf.formatToParts(at)) parts[p.type] = p.value;
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    parts.hour === "24" ? 0 : Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return asUTC - at.getTime();
}

function localWeekday(tz: string, at: Date): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long" })
    .format(at)
    .toLowerCase();
}

/**
 * Compute the next due instant strictly after `from`. Deterministic: the
 * same cadence and `from` always produce the same result, so tests and the
 * runner can reason about it.
 */
export function computeNextDue(cadence: ScheduleCadence, fromIso: string): string | null {
  const from = new Date(fromIso);
  if (Number.isNaN(from.getTime())) return null;

  if (cadence.every) {
    const minutes = parseEveryMinutes(cadence.every);
    if (minutes === null) return null;
    return new Date(from.getTime() + minutes * 60_000).toISOString();
  }

  if (cadence.daily_at) {
    const m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(cadence.daily_at.trim());
    if (!m) return null;
    const hour = Number(m[1]);
    const minute = Number(m[2]);
    const tz = cadence.tz?.trim() || "UTC";
    if (!isValidTimezone(tz)) return null;
    const weekday = cadence.weekday?.trim().toLowerCase();
    if (weekday && !WEEKDAYS.includes(weekday as (typeof WEEKDAYS)[number])) return null;

    for (let dayOffset = 0; dayOffset <= DUE_LOOKAHEAD_DAYS; dayOffset++) {
      const probe = new Date(from.getTime() + dayOffset * 24 * 60 * 60_000);
      const dtf = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const parts: Record<string, string> = {};
      for (const p of dtf.formatToParts(probe)) parts[p.type] = p.value;
      // First guess assumes the probe instant's offset, then refine once so
      // DST transitions land on the right side.
      let candidate = new Date(
        Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), hour, minute) -
          tzOffsetMs(tz, probe),
      );
      candidate = new Date(
        Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), hour, minute) -
          tzOffsetMs(tz, candidate),
      );
      if (candidate.getTime() <= from.getTime()) continue;
      if (weekday && localWeekday(tz, candidate) !== weekday) continue;
      return candidate.toISOString();
    }
    return null;
  }

  return null;
}

function normalizeCadence(v: unknown): { cadence: ScheduleCadence } | { error: string } {
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    return { error: 'cadence is required: { every: "30m" | "4h" | "1d" } or { daily_at: "08:00", weekday?, tz? }.' };
  }
  const rec = v as Record<string, unknown>;
  const every = str(rec.every).trim();
  const dailyAt = str(rec.daily_at).trim();
  if (every && dailyAt) return { error: "cadence accepts either every or daily_at, not both." };
  if (every) {
    if (parseEveryMinutes(every) === null) {
      return { error: `cadence.every must be like "30m", "4h", or "1d" (minimum ${MIN_EVERY_MINUTES}m).` };
    }
    return { cadence: { every } };
  }
  if (dailyAt) {
    const cadence: ScheduleCadence = { daily_at: dailyAt };
    const weekday = str(rec.weekday).trim().toLowerCase();
    if (weekday) {
      if (!WEEKDAYS.includes(weekday as (typeof WEEKDAYS)[number])) {
        return { error: `cadence.weekday must be one of: ${WEEKDAYS.join(", ")}.` };
      }
      cadence.weekday = weekday;
    }
    const tz = str(rec.tz).trim();
    if (tz) {
      if (!isValidTimezone(tz)) return { error: `cadence.tz "${tz}" is not a valid IANA timezone.` };
      cadence.tz = tz;
    }
    if (computeNextDue(cadence, nowIso()) === null) {
      return { error: 'cadence.daily_at must be 24h "HH:MM".' };
    }
    return { cadence };
  }
  return { error: "cadence needs every or daily_at." };
}

function normalizeAction(v: unknown): { action: ScheduleAction } | { error: string } {
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    return { error: "action is required: { kind: endpoint | playbook | note, ... }." };
  }
  const rec = v as Record<string, unknown>;
  const kind = str(rec.kind).trim();
  if (kind === "endpoint") {
    const endpointId = str(rec.endpoint_id).trim();
    if (!endpointId) return { error: "endpoint action needs endpoint_id (e.g. geopass_run, weather_forecast)." };
    const params =
      rec.params && typeof rec.params === "object" && !Array.isArray(rec.params)
        ? (rec.params as Record<string, unknown>)
        : {};
    return { action: { kind: "endpoint", endpoint_id: cap(endpointId, MAX_NAME_LENGTH), params } };
  }
  if (kind === "playbook") {
    const slug = str(rec.playbook_slug ?? rec.slug).trim();
    if (!slug) return { error: "playbook action needs playbook_slug." };
    return { action: { kind: "playbook", playbook_slug: cap(slug, MAX_NAME_LENGTH) } };
  }
  if (kind === "note") {
    const message = str(rec.message).trim();
    if (!message) return { error: "note action needs message." };
    return { action: { kind: "note", message: cap(message, MAX_TEXT_FIELD_LENGTH) } };
  }
  return { error: 'action.kind must be "endpoint", "playbook", or "note".' };
}

function normalizeDeliverTo(v: unknown): string[] {
  return (Array.isArray(v) ? v : [])
    .map((d) => cap(String(d).trim(), MAX_NAME_LENGTH))
    .filter((d) => d.length > 0)
    .slice(0, 5);
}

function buildTags(doc: ScheduleDoc, userTags?: unknown): string[] {
  const cleaned = (Array.isArray(userTags) ? userTags : [])
    .map((t) => cap(String(t).trim(), 60))
    .filter(
      (t) =>
        t.length > 0 &&
        t !== SCHEDULE_CATEGORY &&
        !t.startsWith("enabled:") &&
        !t.startsWith("due:"),
    )
    .slice(0, MAX_TAGS);
  return [SCHEDULE_CATEGORY, `enabled:${doc.enabled}`, `due:${doc.next_due_at}`, ...cleaned];
}

function tagState(tags: unknown): { enabled: boolean; next_due_at?: string; user_tags: string[] } {
  const list = Array.isArray(tags) ? tags.map(String) : [];
  const due = list.find((t) => t.startsWith("due:"))?.slice("due:".length);
  return {
    enabled: !list.includes("enabled:false"),
    next_due_at: due,
    user_tags: list.filter(
      (t) => t !== SCHEDULE_CATEGORY && !t.startsWith("enabled:") && !t.startsWith("due:"),
    ),
  };
}

function extractLibraryRow(value: unknown): Record<string, unknown> | null {
  if (Array.isArray(value)) return value.length > 0 ? extractLibraryRow(value[0]) : null;
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

function parseScheduleDoc(row: Record<string, unknown>): ScheduleDoc | null {
  if (typeof row.content !== "string") return null;
  try {
    const parsed = JSON.parse(row.content) as Partial<ScheduleDoc>;
    if (!parsed || parsed.kind !== SCHEDULE_DOC_KIND) return null;
    if (typeof parsed.name !== "string" || !parsed.cadence || !parsed.action) return null;
    const stats = parsed.stats && typeof parsed.stats === "object" ? parsed.stats : undefined;
    return {
      kind: SCHEDULE_DOC_KIND,
      name: parsed.name,
      description: typeof parsed.description === "string" ? parsed.description : undefined,
      cadence: parsed.cadence,
      action: parsed.action,
      deliver_to: Array.isArray(parsed.deliver_to) ? parsed.deliver_to.map(String) : [],
      enabled: parsed.enabled !== false,
      next_due_at: typeof parsed.next_due_at === "string" ? parsed.next_due_at : nowIso(),
      stats: {
        runs: typeof stats?.runs === "number" ? stats.runs : 0,
        successes: typeof stats?.successes === "number" ? stats.successes : 0,
        failures: typeof stats?.failures === "number" ? stats.failures : 0,
        last_run_at: typeof stats?.last_run_at === "string" ? stats.last_run_at : undefined,
        last_outcome:
          stats?.last_outcome === "success" || stats?.last_outcome === "failure" || stats?.last_outcome === "skipped"
            ? stats.last_outcome
            : undefined,
        last_summary: typeof stats?.last_summary === "string" ? stats.last_summary : undefined,
      },
      source: parsed.source && typeof parsed.source === "object" ? parsed.source : undefined,
      created_at: typeof parsed.created_at === "string" ? parsed.created_at : nowIso(),
    };
  } catch {
    return null;
  }
}

async function loadScheduleRow(slug: string): Promise<
  | { ok: true; row: Record<string, unknown>; doc: ScheduleDoc }
  | { ok: false; error: string; not_found?: boolean }
> {
  const db = await getBackend();
  const raw = await db.getLibraryDoc(slug);
  const row = extractLibraryRow(raw);
  if (!row || (typeof row.slug === "string" && row.slug !== slug)) {
    return { ok: false, not_found: true, error: `No schedule found at slug "${slug}". Use list_schedules to see what exists.` };
  }
  if (str(row.category) !== SCHEDULE_CATEGORY) {
    return { ok: false, error: `Library doc "${slug}" exists but is not a schedule (category "${str(row.category)}").` };
  }
  const doc = parseScheduleDoc(row);
  if (!doc) {
    return { ok: false, error: `Schedule "${slug}" content is unreadable; re-save it with save_schedule.` };
  }
  return { ok: true, row, doc };
}

async function persistSchedule(slug: string, doc: ScheduleDoc, userTags?: unknown): Promise<string> {
  const db = await getBackend();
  return db.upsertLibraryDoc({
    slug,
    title: doc.name,
    category: SCHEDULE_CATEGORY,
    content: JSON.stringify(doc, null, 2),
    tags: buildTags(doc, userTags),
  });
}

function emitScheduleSignal(action: string, summary: string, severity: "info" | "action_needed" = "info"): void {
  const hash = process.env.UNCLICK_API_KEY_HASH;
  if (!hash) return;
  void emitSignal({
    apiKeyHash: hash,
    tool: "memory",
    action,
    severity,
    summary,
    deepLink: "/admin/memory?tab=library",
  });
}

export async function saveSchedule(args: Args): Promise<unknown> {
  const name = cap(str(args.name).trim(), MAX_NAME_LENGTH);
  if (!name) return { saved: false, error: "name is required: a short label, e.g. 'Monday GEOPass check'." };

  const cadenceResult = normalizeCadence(args.cadence);
  if ("error" in cadenceResult) return { saved: false, error: cadenceResult.error };
  const actionResult = normalizeAction(args.action);
  if ("error" in actionResult) return { saved: false, error: actionResult.error };

  const slug = scheduleSlug(name);
  const existing = await loadScheduleRow(slug);
  if (!existing.ok && !existing.not_found) return { saved: false, error: existing.error };
  const prior = existing.ok ? existing.doc : null;

  const fromIso = str(args.now).trim() || nowIso();
  const nextDue = computeNextDue(cadenceResult.cadence, fromIso);
  if (!nextDue) return { saved: false, error: "Could not compute the next due time from that cadence." };

  const doc: ScheduleDoc = {
    kind: SCHEDULE_DOC_KIND,
    name,
    description: str(args.description).trim()
      ? cap(str(args.description).trim(), MAX_TEXT_FIELD_LENGTH)
      : prior?.description,
    cadence: cadenceResult.cadence,
    action: actionResult.action,
    deliver_to: Array.isArray(args.deliver_to) ? normalizeDeliverTo(args.deliver_to) : prior?.deliver_to ?? [],
    enabled: typeof args.enabled === "boolean" ? args.enabled : prior?.enabled ?? true,
    next_due_at: nextDue,
    stats: prior?.stats ?? { runs: 0, successes: 0, failures: 0 },
    source: {
      agent_id: str(args.agent_id).trim() || prior?.source?.agent_id,
      session_id: str(args.session_id).trim() || prior?.source?.session_id,
    },
    created_at: prior?.created_at ?? nowIso(),
  };

  const message = await persistSchedule(slug, doc, args.tags);
  emitScheduleSignal("schedule_saved", `Schedule saved: ${name} (next due ${doc.next_due_at})`);
  return {
    saved: true,
    slug,
    enabled: doc.enabled,
    next_due_at: doc.next_due_at,
    message,
    next_steps: [
      "An AutoPilot Runner process executes due schedules; without one running, schedules are definitions only.",
      `Check what is due with memory.list_due_schedules; record outcomes with memory.record_schedule_run slug "${slug}".`,
    ],
  };
}

export async function getSchedule(args: Args): Promise<unknown> {
  const ref = str(args.slug) || str(args.name);
  if (!ref.trim()) return { found: false, error: "Pass slug or name of the schedule to fetch." };
  const slug = scheduleSlug(ref.trim());
  const loaded = await loadScheduleRow(slug);
  if (!loaded.ok) return { found: false, error: loaded.error };
  return {
    found: true,
    slug,
    version: typeof loaded.row.version === "number" ? loaded.row.version : undefined,
    updated_at: typeof loaded.row.updated_at === "string" ? loaded.row.updated_at : undefined,
    schedule: loaded.doc,
  };
}

export async function listSchedules(args: Args): Promise<unknown> {
  const db = await getBackend();
  const all = await db.listLibrary();
  const rows = Array.isArray(all) ? all : [];
  const enabledOnly = args.enabled_only === true;
  const schedules = rows
    .map((r) => extractLibraryRow(r))
    .filter((r): r is Record<string, unknown> => r !== null && str(r.category) === SCHEDULE_CATEGORY)
    .map((r) => {
      const state = tagState(r.tags);
      return {
        slug: str(r.slug),
        name: str(r.title),
        enabled: state.enabled,
        next_due_at: state.next_due_at,
        version: typeof r.version === "number" ? r.version : undefined,
        updated_at: typeof r.updated_at === "string" ? r.updated_at : undefined,
        tags: state.user_tags,
      };
    })
    .filter((s) => !enabledOnly || s.enabled);
  return {
    count: schedules.length,
    schedules,
    hint:
      schedules.length === 0
        ? "No schedules yet. Define one with memory.save_schedule; an AutoPilot Runner process executes them when due."
        : "Use memory.list_due_schedules to see what a runner should execute right now.",
  };
}

export async function listDueSchedules(args: Args): Promise<unknown> {
  const asOf = str(args.now).trim() || nowIso();
  const listed = (await listSchedules({ enabled_only: true })) as {
    schedules: Array<{ slug: string; next_due_at?: string }>;
  };
  const dueSlugs = listed.schedules.filter(
    (s) => s.next_due_at && s.next_due_at <= asOf,
  );
  const due: unknown[] = [];
  for (const { slug } of dueSlugs) {
    const loaded = await loadScheduleRow(slug);
    if (loaded.ok && loaded.doc.enabled && loaded.doc.next_due_at <= asOf) {
      due.push({ slug, schedule: loaded.doc });
    }
  }
  return {
    as_of: asOf,
    count: due.length,
    due,
    hint:
      due.length === 0
        ? "Nothing due. The runner should sleep until the earliest next_due_at."
        : "Execute each action, then call memory.record_schedule_run so the schedule advances and stats stay truthful.",
  };
}

export async function setScheduleEnabled(args: Args): Promise<unknown> {
  const ref = str(args.slug) || str(args.name);
  if (!ref.trim()) return { updated: false, error: "Pass slug (or name) of the schedule." };
  if (typeof args.enabled !== "boolean") return { updated: false, error: "enabled must be true or false." };
  const slug = scheduleSlug(ref.trim());
  const loaded = await loadScheduleRow(slug);
  if (!loaded.ok) return { updated: false, error: loaded.error };

  const doc = loaded.doc;
  doc.enabled = args.enabled;
  if (args.enabled) {
    // Re-anchor so a long-disabled schedule does not fire a backlog of runs.
    const next = computeNextDue(doc.cadence, str(args.now).trim() || nowIso());
    if (next) doc.next_due_at = next;
  }
  await persistSchedule(slug, doc);
  return { updated: true, slug, enabled: doc.enabled, next_due_at: doc.next_due_at };
}

export async function recordScheduleRun(args: Args): Promise<unknown> {
  const ref = str(args.slug) || str(args.name);
  if (!ref.trim()) return { recorded: false, error: "Pass slug (or name) of the schedule this run executed." };
  const outcome = str(args.outcome).trim().toLowerCase();
  if (outcome !== "success" && outcome !== "failure" && outcome !== "skipped") {
    return { recorded: false, error: 'outcome must be "success", "failure", or "skipped".' };
  }
  const slug = scheduleSlug(ref.trim());
  const loaded = await loadScheduleRow(slug);
  if (!loaded.ok) return { recorded: false, error: loaded.error };

  const doc = loaded.doc;
  const ranAt = str(args.now).trim() || nowIso();
  doc.stats.runs += 1;
  if (outcome === "success") doc.stats.successes += 1;
  if (outcome === "failure") doc.stats.failures += 1;
  doc.stats.last_run_at = ranAt;
  doc.stats.last_outcome = outcome;
  if (str(args.summary).trim()) {
    doc.stats.last_summary = cap(str(args.summary).trim(), MAX_TEXT_FIELD_LENGTH);
  }
  const next = computeNextDue(doc.cadence, ranAt);
  if (!next) return { recorded: false, error: "Could not advance next_due_at from the stored cadence." };
  doc.next_due_at = next;

  await persistSchedule(slug, doc);
  if (outcome === "failure") {
    emitScheduleSignal("schedule_run_failed", `Scheduled job failed: ${doc.name}`, "action_needed");
  }
  return {
    recorded: true,
    slug,
    outcome,
    next_due_at: doc.next_due_at,
    stats: doc.stats,
  };
}
