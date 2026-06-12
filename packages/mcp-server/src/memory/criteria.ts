/**
 * Criteria retrieval: deterministic, caller-supplied re-ranking on top of
 * search_memory results. The competitive reference is Mem0's paid-tier
 * "criteria retrieval"; here it is part of the open core. No LLM, no flag:
 * when no criteria are passed, behavior is byte-identical to before.
 *
 * Criteria are applied AFTER the backend's hybrid ranking, on an over-fetched
 * candidate pool, so they bias rather than replace relevance.
 */

export interface MemoryRetrievalCriteria {
  /** Multiplier per fact category (e.g. { preference: 2, troubleshooting: 0.5 }). */
  category_weights?: Record<string, number>;
  /** Drop rows below this confidence (0-1). Rows without confidence are kept. */
  min_confidence?: number;
  /** Half-life in days for an exponential recency boost. Omit for none. */
  recency_half_life_days?: number;
  /** Keep only these sources (e.g. ["fact"], ["fact","business_context"]). */
  sources?: string[];
}

export interface CriteriaScoredRow {
  source?: string;
  category?: string;
  confidence?: number;
  created_at?: string | null;
  valid_from?: string | null;
  final_score?: number;
  effective_score?: number;
  criteria_score?: number;
}

function finite(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function parseMemoryRetrievalCriteria(raw: unknown): MemoryRetrievalCriteria | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const input = raw as Record<string, unknown>;
  const criteria: MemoryRetrievalCriteria = {};
  if (input.category_weights && typeof input.category_weights === "object" && !Array.isArray(input.category_weights)) {
    const weights: Record<string, number> = {};
    for (const [key, value] of Object.entries(input.category_weights as Record<string, unknown>)) {
      if (typeof value === "number" && Number.isFinite(value) && value >= 0) weights[key.toLowerCase()] = value;
    }
    if (Object.keys(weights).length > 0) criteria.category_weights = weights;
  }
  if (typeof input.min_confidence === "number" && Number.isFinite(input.min_confidence)) {
    criteria.min_confidence = Math.min(1, Math.max(0, input.min_confidence));
  }
  if (typeof input.recency_half_life_days === "number" && input.recency_half_life_days > 0) {
    criteria.recency_half_life_days = input.recency_half_life_days;
  }
  if (Array.isArray(input.sources)) {
    const sources = input.sources.filter((s): s is string => typeof s === "string" && s.trim() !== "");
    if (sources.length > 0) criteria.sources = sources.map((s) => s.toLowerCase());
  }
  return Object.keys(criteria).length > 0 ? criteria : null;
}

export function applyMemoryRetrievalCriteria<T extends CriteriaScoredRow>(
  rows: T[],
  criteria: MemoryRetrievalCriteria,
  maxResults: number
): T[] {
  const nowMs = Date.now();
  return rows
    .filter((row) => {
      if (criteria.sources && !criteria.sources.includes((row.source ?? "").toLowerCase())) return false;
      if (
        criteria.min_confidence !== undefined &&
        typeof row.confidence === "number" &&
        row.confidence < criteria.min_confidence
      ) {
        return false;
      }
      return true;
    })
    .map((row) => {
      const base = finite(row.effective_score, finite(row.final_score, 0)) || 1e-9;
      const weight = criteria.category_weights?.[(row.category ?? "").toLowerCase()] ?? 1;
      let recency = 1;
      if (criteria.recency_half_life_days) {
        const stamp = Date.parse(row.valid_from ?? row.created_at ?? "");
        if (Number.isFinite(stamp)) {
          const ageDays = Math.max(0, (nowMs - stamp) / 86_400_000);
          recency = Math.pow(0.5, ageDays / criteria.recency_half_life_days);
        }
      }
      return { ...row, criteria_score: base * weight * recency };
    })
    .sort((a, b) => (b.criteria_score ?? 0) - (a.criteria_score ?? 0))
    .slice(0, Math.max(1, maxResults));
}
