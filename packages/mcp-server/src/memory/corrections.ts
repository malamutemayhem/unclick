/**
 * Lane-05 corrections store + anti-sycophancy surfacing (MEMORY_CORRECTIONS_ENABLED).
 *
 * A "correction" is a user override ("no, my target is X") promoted to an
 * always-loaded standing rule. Corrections are stored in business_context under
 * the reserved CORRECTIONS_CATEGORY with high priority, so they ride the
 * existing always-loaded business_context path on BOTH backends with no new
 * table and no new backend method. They are pinned to the top of the profile
 * card's do_not_repeat list so the agent does not repeat a corrected mistake,
 * and consult_corrections surfaces the relevant ones pre-response.
 *
 * Receipt-backing (Worker 3) is shaped here as optional provenance fields
 * (source_agent_id / source_ref / receipt_id, per the Part 6 contract); they are
 * populated once Worker 3 publishes the canonical columns + receipt shape.
 */

import { logMemoryLoadEvent } from "./instrumentation.js";

/** Reversible feature flag. Default OFF until the coordinator flips it. */
export function isCorrectionsEnabled(): boolean {
  const raw = (process.env.MEMORY_CORRECTIONS_ENABLED ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true";
}

/** Reserved business_context category for corrections (always-loaded, top priority). */
export const CORRECTIONS_CATEGORY = "corrections";

/** Priority floor that pins corrections above ordinary business_context rows. */
export const CORRECTION_PRIORITY = 100;

/** Max correction lines surfaced in do_not_repeat / a consult response. */
export const MAX_CORRECTION_LINES = 6;

export interface CorrectionInput {
  /** The corrected truth, phrased as a standing rule ("My salary target is X"). */
  correction: string;
  /** What the agent got wrong, if the caller wants to record it. */
  mistake?: string;
  /** Stable key; derived from the correction text when omitted. */
  key?: string;
  // Receipt-backing (Worker 3 contract; optional until published).
  source_agent_id?: string;
  source_ref?: string;
  receipt_id?: string;
}

/** Stored shape of a correction's business_context value. */
export interface CorrectionValue {
  kind: "correction";
  correction: string;
  mistake?: string;
  created_at: string;
  source_agent_id?: string;
  source_ref?: string;
  receipt_id?: string;
}

function slugifyCorrection(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "correction";
}

export function correctionKey(input: CorrectionInput): string {
  return input.key && input.key.trim() ? input.key.trim() : slugifyCorrection(input.correction);
}

export function buildCorrectionValue(input: CorrectionInput, now: string): CorrectionValue {
  const value: CorrectionValue = { kind: "correction", correction: input.correction, created_at: now };
  if (input.mistake) value.mistake = input.mistake;
  if (input.source_agent_id) value.source_agent_id = input.source_agent_id;
  if (input.source_ref) value.source_ref = input.source_ref;
  if (input.receipt_id) value.receipt_id = input.receipt_id;
  return value;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function isCorrectionRow(row: Record<string, unknown>): boolean {
  return String(row.category ?? "").toLowerCase() === CORRECTIONS_CATEGORY;
}

/** Extract the correction text from a business_context row (value may be an object or a bare string). */
export function correctionTextFromRow(row: Record<string, unknown>): string | null {
  if (!isCorrectionRow(row)) return null;
  const value = row.value;
  if (typeof value === "string") return value.trim() || null;
  const v = asRecord(value);
  if (v && typeof v.correction === "string") return v.correction.trim() || null;
  return null;
}

/** Build the do_not_repeat lines from correction rows in a business_context array. */
export function buildCorrectionDoNotRepeatLines(
  businessRows: Array<{ row: Record<string, unknown> }>
): string[] {
  const lines: string[] = [];
  const seen = new Set<string>();
  for (const { row } of businessRows) {
    const text = correctionTextFromRow(row);
    if (!text) continue;
    const line = `Correction (always honor): ${text}`.replace(/\s+/g, " ").trim().slice(0, 160);
    if (seen.has(line)) continue;
    seen.add(line);
    lines.push(line);
    if (lines.length >= MAX_CORRECTION_LINES) break;
  }
  return lines;
}

function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((t) => t.length > 2);
}

export interface RelevantCorrection {
  key: string;
  correction: string;
  mistake?: string;
  score: number;
  receipt_id?: string;
  source_agent_id?: string;
}

/**
 * Select corrections relevant to a query/context, most relevant first. With no
 * query, every correction is relevant (corrections are always-loaded standing
 * rules, so a pre-response consult with no specific context surfaces them all).
 */
export function selectRelevantCorrections(
  businessRows: Array<Record<string, unknown>>,
  query: string,
  maxResults: number
): RelevantCorrection[] {
  const queryTokens = new Set(tokenize(query));
  const out: RelevantCorrection[] = [];
  for (const row of businessRows) {
    const text = correctionTextFromRow(row);
    if (!text) continue;
    const v = asRecord(row.value);
    const overlap = tokenize(text).filter((t) => queryTokens.has(t)).length;
    const score = queryTokens.size === 0 ? 1 : overlap;
    if (score <= 0) continue;
    out.push({
      key: String(row.key ?? ""),
      correction: text,
      mistake: v && typeof v.mistake === "string" ? v.mistake : undefined,
      score,
      receipt_id: v && typeof v.receipt_id === "string" ? v.receipt_id : undefined,
      source_agent_id: v && typeof v.source_agent_id === "string" ? v.source_agent_id : undefined,
    });
  }
  return out
    .sort((a, b) => b.score - a.score || a.correction.localeCompare(b.correction))
    .slice(0, Math.max(1, maxResults));
}

/** Count correction rows in a business_context array. */
export function countCorrections(businessRows: Array<Record<string, unknown>>): number {
  return businessRows.filter((row) => correctionTextFromRow(row) !== null).length;
}

/** Emit the correction_adherence metric surface so Worker 10's harness can score it. */
export function emitCorrectionConsultMetric(query: string, surfaced: number, total: number): void {
  logMemoryLoadEvent({
    tool_name: "memory.consult_corrections",
    params: { corrections_surfaced: surfaced, corrections_total: total, has_query: query.length > 0 },
  });
}
