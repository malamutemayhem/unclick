/**
 * Lane-03: Provenance & Memory Receipts.
 *
 * Every durable memory can carry a receipt: which agent learned it
 * (source_agent_id, the single canonical agent-identity column, owner ==
 * source), from what source (source_ref, an origin pointer that never holds a
 * secret), linked to an XPass/AnswerPass/conversation receipt (receipt_id),
 * with what confidence. Retrieval can filter or boost by provenance, and the
 * profile card surfaces it.
 *
 * All behaviour here is gated behind MEMORY_PROVENANCE_ENABLED (default off).
 * When the flag is off:
 *   - provenance columns are NOT written, so a database that has not yet
 *     applied the lane-03 migration is unaffected;
 *   - the filter/boost helpers are inert (everything passes, boost is 0), so
 *     retrieval is byte-for-byte unchanged;
 *   - the receipt surface omits provenance.
 *
 * This is the canonical provenance surface. Workers 1 (retrieval boost), 2
 * (contradiction parties), 4 (credential binding), 7 (admission), and 10
 * (passport, metric) reference these shapes; do not redefine them.
 */

import type { FactInput, MemoryReceiptRedactionState } from "./types.js";

/** The provenance columns lane-03 owns on the facts tables (migration band 01xx). */
export const PROVENANCE_COLUMNS = ["source_agent_id", "source_ref", "receipt_id"] as const;

/** Metric name lane-03 owns (Part 6.2). Worker 10's harness scores this. */
export const PROVENANCE_METRIC = "provenance_coverage" as const;

/** Canonical provenance bundle for a memory. Reference this; do not redefine. */
export interface MemoryProvenance {
  /** The single agent-identity column: which agent learned/wrote the fact. */
  source_agent_id: string | null;
  /** Origin pointer: url / tool-call id / message id / pr / commit. Never a secret. */
  source_ref: string | null;
  /** Linkage to an XPass/AnswerPass/conversation receipt, when one exists. */
  receipt_id: string | null;
  /** First-class provenance signal in [0, 1]. */
  confidence: number;
  /** Existing provenance fields, reused as-is. */
  extractor_id?: string | null;
  prompt_version?: string | null;
  model_id?: string | null;
  commit_sha?: string | null;
  pr_number?: number | null;
}

/** Retrieval-side filter/boost knobs. Worker 1 composes these into the fused score. */
export interface ProvenanceFilter {
  /** Only admit facts that carry a receipt_id. */
  require_receipt?: boolean;
  /** Only admit facts that carry a source_agent_id. */
  require_source_agent?: boolean;
  /** Confidence floor in [0, 1]. */
  min_confidence?: number;
  /** Additive score boost for receipt-backed facts (>= 0). */
  boost_receipt_backed?: number;
}

/** The three provenance fields persisted on a write, or null when the flag is off. */
export interface ProvenanceWriteFields {
  source_agent_id: string | null;
  source_ref: string | null;
  receipt_id: string | null;
}

/** Read the MEMORY_PROVENANCE_ENABLED flag (mirrors the embeddings flag pattern). */
export function isProvenanceEnabled(): boolean {
  const raw = process.env.MEMORY_PROVENANCE_ENABLED ?? "";
  return raw === "1" || raw.toLowerCase() === "true";
}

const MAX_SOURCE_REF_LENGTH = 500;

// Structured secret shapes that must never be persisted in source_ref. A ref
// points AT a source; it never carries the source's credentials. We match real
// token/key shapes (not bare english words) so legitimate URLs are not dropped.
const SECRET_REF_PATTERN =
  /(sk-[A-Za-z0-9]{12,}|[srpw][kh]_(?:live|test)_[A-Za-z0-9]{10,}|whsec_[A-Za-z0-9]{10,}|xox[baprs]-[A-Za-z0-9-]{8,}|gh[posu]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{12,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|bearer\s+[A-Za-z0-9._-]{12,}|authorization:\s*\S+)/i;

/**
 * Strip anything that looks like a secret out of a source_ref before it is
 * persisted or surfaced. Returns null when the ref is empty or is rejected as
 * sensitive. Over-rejection is the safe failure mode: we drop provenance rather
 * than leak a credential.
 */
export function sanitizeSourceRef(ref: unknown): string | null {
  if (typeof ref !== "string") return null;
  const trimmed = ref.trim();
  if (!trimmed) return null;
  if (SECRET_REF_PATTERN.test(trimmed)) return null;
  return trimmed.length > MAX_SOURCE_REF_LENGTH ? trimmed.slice(0, MAX_SOURCE_REF_LENGTH) : trimmed;
}

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function hasReceipt(p: MemoryProvenance): boolean {
  return typeof p.receipt_id === "string" && p.receipt_id.length > 0;
}

function hasSourceAgent(p: MemoryProvenance): boolean {
  return typeof p.source_agent_id === "string" && p.source_agent_id.length > 0;
}

/**
 * Whether a memory passes a provenance filter. When the flag is off the filter
 * is inert (everything passes) so retrieval is unchanged. Worker 7 reuses this
 * for admission control.
 */
export function provenanceMatches(p: MemoryProvenance, filter: ProvenanceFilter = {}): boolean {
  if (!isProvenanceEnabled()) return true;
  if (filter.require_receipt && !hasReceipt(p)) return false;
  if (filter.require_source_agent && !hasSourceAgent(p)) return false;
  if (typeof filter.min_confidence === "number" && p.confidence < filter.min_confidence) return false;
  return true;
}

/**
 * Additive retrieval boost for a memory given a provenance filter. Always
 * >= 0, and exactly 0 when the flag is off, so Worker 1 can add it to the
 * fused score without changing default behaviour.
 */
export function provenanceBoost(p: MemoryProvenance, filter: ProvenanceFilter = {}): number {
  if (!isProvenanceEnabled()) return 0;
  const weight = filter.boost_receipt_backed ?? 0;
  if (weight <= 0) return 0;
  return hasReceipt(p) ? weight : 0;
}

/** Read a MemoryProvenance bundle off a backend row (DB row or local JSON row). */
export function provenanceFromRow(row: Record<string, unknown>): MemoryProvenance {
  return {
    source_agent_id: nonEmptyString(row.source_agent_id),
    source_ref: nonEmptyString(row.source_ref),
    receipt_id: nonEmptyString(row.receipt_id),
    confidence: finiteNumber(row.confidence) ?? 0,
    extractor_id: nonEmptyString(row.extractor_id),
    prompt_version: nonEmptyString(row.prompt_version),
    model_id: nonEmptyString(row.model_id),
    commit_sha: nonEmptyString(row.commit_sha),
    pr_number: finiteNumber(row.pr_number),
  };
}

/**
 * Build the provenance fields to persist on a write. Returns null when the flag
 * is off, so neither backend references the lane-03 columns until the migration
 * has been applied and the flag flipped. source_ref is sanitised so a secret
 * can never land in the store.
 */
export function provenanceWriteFields(
  data: Pick<FactInput, "source_agent_id" | "source_ref" | "receipt_id">
): ProvenanceWriteFields | null {
  if (!isProvenanceEnabled()) return null;
  return {
    source_agent_id: nonEmptyString(data.source_agent_id),
    source_ref: sanitizeSourceRef(data.source_ref),
    receipt_id: nonEmptyString(data.receipt_id),
  };
}

/** Whether a row carries a usable source (agent, ref, or receipt). */
export function hasUsableProvenance(row: Record<string, unknown>): boolean {
  const p = provenanceFromRow(row);
  return Boolean(p.source_agent_id || p.source_ref || p.receipt_id);
}

/**
 * provenance_coverage metric (lane-03): share of facts that carry a usable
 * source. Returns 0 for an empty set. Worker 10's harness scores this.
 */
export function provenanceCoverage(rows: Array<Record<string, unknown>>): number {
  if (rows.length === 0) return 0;
  let covered = 0;
  for (const row of rows) {
    if (hasUsableProvenance(row)) covered += 1;
  }
  return covered / rows.length;
}

/**
 * Provenance fields to attach to a MemoryProfileCardReceipt. Honours the
 * receipt's redaction_state: source_ref (which points at a source) is only
 * exposed when the receipt is clean; ids are safe to show. Returns null when
 * the flag is off or there is nothing to surface.
 */
export function receiptProvenanceFields(
  row: Record<string, unknown>,
  redactionState: MemoryReceiptRedactionState
): { source_agent_id?: string | null; source_ref?: string | null; receipt_id?: string | null } | null {
  if (!isProvenanceEnabled()) return null;
  const p = provenanceFromRow(row);
  const out: { source_agent_id?: string | null; source_ref?: string | null; receipt_id?: string | null } = {};
  if (p.source_agent_id) out.source_agent_id = p.source_agent_id;
  if (p.receipt_id) out.receipt_id = p.receipt_id;
  if (p.source_ref && redactionState === "clean") out.source_ref = p.source_ref;
  return Object.keys(out).length > 0 ? out : null;
}
