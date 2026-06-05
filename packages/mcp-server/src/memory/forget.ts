/**
 * Lane-05 shared helpers for true-forget (flag: MEMORY_HARD_FORGET_ENABLED).
 *
 * forgetMemory itself lives in each backend (local.ts + supabase.ts) so the
 * fact tombstone, typed-link delete, and embedding clear can use backend-native
 * atomic primitives. The pieces that are byte-identical across both backends
 * live here: the feature flag, the tombstone constants, the compliance score,
 * and the taxonomy-snapshot scrub (which only needs the public backend surface).
 *
 * A forget is user-intent deletion, not TTL decay (that is Worker 8). It must
 * leave no trace of the forgotten content in any recall surface, so the snapshot
 * scrub both regenerates derived snapshots and neutralizes orphans.
 */

import type { MemoryBackend, ForgetReceipt } from "./types.js";

/** Reversible feature flag. Default OFF until the coordinator flips it. */
export function isHardForgetEnabled(): boolean {
  const raw = (process.env.MEMORY_HARD_FORGET_ENABLED ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true";
}

/** Content-free marker written over a forgotten fact's text. Carries no PII. */
export const FORGOTTEN_TOMBSTONE_TEXT = "[forgotten]";

/** Library category refreshTaxonomySnapshots uses for taxonomy snapshot docs. */
export const SNAPSHOT_LIBRARY_CATEGORY = "memory_snapshot";

/** Content written over an orphan snapshot whose only source was forgotten. */
export const NEUTRALIZED_SNAPSHOT_CONTENT =
  "This taxonomy snapshot was pruned because a source memory was forgotten. " +
  "Run refresh_taxonomy_snapshots to rebuild it from current memory.";

/**
 * Stable source-pointer string a taxonomy snapshot embeds for each source fact
 * (see memoryTaxonomySnapshotToLibraryDoc, e.g. "Source pointers: fact:<id>").
 * Matching on the id, not the fact text, keeps detection reliable after the
 * fact text has already been scrubbed.
 */
export function factSnapshotPointer(factId: string): string {
  return `fact:${factId}`;
}

/** forget_compliance metric (Part 6.2): 1.0 only when every surface is clean. */
export function forgetComplianceScore(receipt: ForgetReceipt): number {
  return receipt.verified_clean ? 1 : 0;
}

/**
 * Worker 9 typed-split episode store (the `session_events` table, `mc_`-prefixed
 * in managed cloud). A true-forget must reach it too: an episodic event derived
 * from a fact is recall-visible via list_session_events, so leaving it behind
 * would let the forgotten content resurface.
 *
 * forget tombstones (UPDATEs) the fact row rather than DELETEing it, so W9's
 * `source_fact_id ... ON DELETE SET NULL` foreign key never fires. The sweep is
 * therefore explicit, and matches an event to a forgotten fact two ways:
 *   1. the canonical FK `source_fact_id` equals the fact id, OR
 *   2. for `fact_route` episodes the router did not id-link
 *      (factInputToSessionEventInput leaves source_fact_id unset), the event's
 *      verbatim `content` exactly equals the pre-scrub fact text.
 *
 * Exact equality only - never a substring/LIKE - so a forget can never
 * collaterally delete an unrelated episode. The pre-scrub text MUST be captured
 * before the fact row is tombstoned, since the tombstone overwrites it.
 */
export const SESSION_EVENTS_TABLE_BYOD = "session_events";
export const SESSION_EVENTS_TABLE_MANAGED = "mc_session_events";

export interface ForgottenSessionEventMatch {
  source_fact_id?: string | null;
  content?: string | null;
}

export function sessionEventBelongsToForgottenFact(
  row: ForgottenSessionEventMatch,
  factId: string,
  originalText: string
): boolean {
  if (typeof row.source_fact_id === "string" && row.source_fact_id === factId) return true;
  if (originalText.length > 0 && typeof row.content === "string" && row.content === originalText) {
    return true;
  }
  return false;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export interface SnapshotScrubResult {
  snapshots_regenerated: number;
  snapshots_neutralized: number;
  /** Slugs that still referenced the fact after regeneration and were neutralized. */
  neutralized_slugs: string[];
  /** True when every snapshot doc that named the fact was neutralized cleanly. */
  clean: boolean;
}

type SnapshotScrubBackend = Pick<
  MemoryBackend,
  "refreshTaxonomySnapshots" | "listLibrary" | "getLibraryDoc" | "upsertLibraryDoc"
>;

/**
 * Remove a forgotten fact from the derived taxonomy snapshots stored in the
 * knowledge library. Snapshots are deterministic projections of active facts:
 *
 *  1. Regenerate them, which drops the now-tombstoned fact while preserving
 *     every other fact's coverage.
 *  2. Neutralize any orphan snapshot the fact was the sole source of, since
 *     regeneration cannot rebuild a snapshot that has no remaining sources.
 *
 * Operates purely through the public backend surface so both backends share it.
 * The caller is responsible for purging library *history* (backend-specific).
 */
export async function scrubForgottenFactFromSnapshots(
  backend: SnapshotScrubBackend,
  factId: string
): Promise<SnapshotScrubResult> {
  const pointer = factSnapshotPointer(factId);

  let regenerated = 0;
  try {
    const result = await backend.refreshTaxonomySnapshots({ dry_run: false });
    const written = asRecord(result)?.written_count;
    if (typeof written === "number") regenerated = written;
  } catch {
    // A snapshot rebuild failure must not abort the forget; the orphan sweep
    // below still runs and the caller's verification reflects any residue.
  }

  const neutralizedSlugs: string[] = [];
  let clean = true;

  for (const doc of await listSnapshotDocs(backend)) {
    const slug = typeof doc.slug === "string" ? doc.slug : "";
    if (!slug) continue;
    const full = asRecord(await backend.getLibraryDoc(slug));
    const content = full && typeof full.content === "string" ? full.content : "";
    if (!content.includes(pointer)) continue;

    try {
      const title = full && typeof full.title === "string" ? full.title : slug;
      const tags = full && Array.isArray(full.tags) ? full.tags.map(String) : [];
      await backend.upsertLibraryDoc({
        slug,
        title,
        category: SNAPSHOT_LIBRARY_CATEGORY,
        content: NEUTRALIZED_SNAPSHOT_CONTENT,
        tags,
      });
      neutralizedSlugs.push(slug);
    } catch {
      clean = false;
    }
  }

  return {
    snapshots_regenerated: regenerated,
    snapshots_neutralized: neutralizedSlugs.length,
    neutralized_slugs: neutralizedSlugs,
    clean,
  };
}

async function listSnapshotDocs(
  backend: Pick<MemoryBackend, "listLibrary">
): Promise<Array<Record<string, unknown>>> {
  const docs: Array<Record<string, unknown>> = [];
  for (const entry of asArray(await backend.listLibrary())) {
    const row = asRecord(entry);
    if (!row) continue;
    const category = typeof row.category === "string" ? row.category : "";
    const slug = typeof row.slug === "string" ? row.slug : "";
    // Some listLibrary shapes omit category; fall back to the snapshot slug prefix.
    if (category === SNAPSHOT_LIBRARY_CATEGORY || slug.startsWith("memory-taxonomy-")) {
      docs.push(row);
    }
  }
  return docs;
}
