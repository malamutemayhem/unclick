/**
 * Lane-01: Retrieval Orchestration and Fusion (read path).
 *
 * Backend-agnostic helpers so the local JSON backend and the Supabase/pgvector
 * backend share ONE retrieval policy instead of duplicating it. Keeping the
 * policy here keeps both backends thin and guarantees parity by construction.
 *
 * This module is built incrementally behind a single flag:
 *   - Increment 1 (this commit): bring business_context (standing rules /
 *     identity) into search as a first-class source, scored with the shared
 *     keyword scorer and pinned by a scope-precedence weight so identity
 *     surfaces instead of being buried by term frequency (Gap 2, and the
 *     ordering half of Gap 7).
 *   - Later increments: fuse the keyword and vector lanes (Gap 1) and apply a
 *     full effective_score load order (Gap 7).
 *
 * Adapter contracts this lane consumes (shaped to the Part 6 registry so the
 * rewire when those lanes publish is near-zero; all degrade gracefully):
 *   - Worker 6: keyword/vector/RRF row fields (rrf_score, kw_score,
 *     cosine_score, final_score) - already emitted by both backends today.
 *   - Worker 8: effective_score inputs for ordering.
 *   - Worker 3: provenance fields (optional boost), keyed by the FactInput names.
 *
 * Every new behaviour here is reversible by MEMORY_FUSED_RETRIEVAL_ENABLED,
 * default off, until the Coordinator flips it on metric evidence.
 */

import { scoreLocalMemoryContent, tokenizeLocalMemoryQuery } from "./supabase.js";
import type { MemorySearchResultRow, MemorySearchSource } from "./types.js";

/**
 * Lane-01 flag gate. Treats "1" or "true" (any case) as enabled, mirroring the
 * existing embeddings flag idiom (see embeddings.ts). Default off.
 */
export function isFusedRetrievalEnabled(): boolean {
  const raw = process.env.MEMORY_FUSED_RETRIEVAL_ENABLED ?? "";
  return raw === "1" || raw.toLowerCase() === "true";
}

/**
 * Scope-precedence weights applied on top of the keyword/RRF score so load
 * order is a function of scope, not raw term frequency (the CLAUDE.md
 * precedence model). Standing rules (business_context = identity) outrank an
 * equally-matching fact. Conservative seed values; Worker 10's harness tunes
 * them. Existing fact/session scoring is intentionally left at 1.0 here so this
 * increment does not change relative fact ordering (that is Worker 6 plus the
 * later ordering increment).
 */
export const MEMORY_SOURCE_SCOPE_WEIGHT: Record<MemorySearchSource, number> = {
  business_context: 1.5,
  fact: 1.0,
  session: 1.0,
  conversation: 1.0,
};

export function scopeWeightForSource(source: MemorySearchSource): number {
  return MEMORY_SOURCE_SCOPE_WEIGHT[source] ?? 1.0;
}

/**
 * Minimal business_context row shape both backends can supply without coupling
 * this module to either storage layout. value is the raw stored value (string
 * or JSON object); created_at is optional because standing rules are largely
 * time-invariant.
 */
export interface BusinessContextSearchInput {
  id: string;
  category: string;
  key: string;
  value: unknown;
  created_at?: string | null;
}

function valueToText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/** Human-readable content rendered for a business_context search hit. */
export function businessContextContent(row: BusinessContextSearchInput): string {
  const valueText = valueToText(row.value).trim();
  return valueText ? `${row.key}: ${valueText}` : row.key;
}

/**
 * Score business_context rows against a query with the shared keyword scorer,
 * then pin them by the business_context scope weight. Returns canonical search
 * rows for rows that matched at least one token (finalScore > 0). Identity is
 * thus both always-loaded (startup context) AND searchable (here), the
 * Letta / Memory Bank pattern called for in the plan.
 *
 * Tenant scoping and bi-temporal visibility are the caller's responsibility:
 * each backend passes only rows it is already authorised to surface, so this
 * helper never widens RLS.
 */
export function scoreBusinessContextRows(
  query: string,
  rows: BusinessContextSearchInput[]
): MemorySearchResultRow[] {
  const tokens = tokenizeLocalMemoryQuery(query);
  if (tokens.length === 0) return [];
  const scopeWeight = scopeWeightForSource("business_context");
  const out: MemorySearchResultRow[] = [];
  for (const row of rows) {
    const text = `${row.category} ${row.key} ${valueToText(row.value)}`;
    const score = scoreLocalMemoryContent({ query, tokens, text, confidence: 1 });
    if (score.finalScore <= 0) continue;
    out.push({
      id: row.id,
      source: "business_context",
      content: businessContextContent(row),
      category: row.category,
      confidence: 1,
      created_at: row.created_at ?? "",
      final_score: score.finalScore * scopeWeight,
      rrf_score: 0,
      kw_score: score.matchedTokenCount,
      cosine_score: 0,
      scope_weight: scopeWeight,
    });
  }
  return out;
}
