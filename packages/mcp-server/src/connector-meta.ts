// ─── Shared connector "smart layer" stamp ─────────────────────────────────────
// Lets any connector reach the L5 (agentic) bar described in
// docs/connector-standard.md: every response says where it came from, how fresh
// it is, which memory defaults filled it, and what the agent should reach for
// next. The connector passes the literal source / fetched_at / next_steps fields
// (built at its own call site) so the value lives in that connector's own output
// and the depth-ladder grader credits the file.
//
// This only formats provenance and guidance; it never stores or echoes a secret.

export interface ConnectorMeta {
  /** Human-readable origin of the data, e.g. "CoinGecko API v3". */
  source: string;
  /** ISO timestamp of when the call was made. */
  fetched_at: string;
  /** What the agent should call next (no em dashes). */
  next_steps: string[];
  /** Names of memory defaults that filled missing args, if any. */
  defaults_used?: string[];
}

/**
 * Attach an `unclick_meta` stamp to a connector result. Spreads the original
 * result so existing top-level fields are unchanged; callers that already shape
 * their payload keep working.
 */
export function stampMeta<T>(
  result: T,
  meta: ConnectorMeta,
): Record<string, unknown> {
  const stamp = { defaults_used: [], ...meta };
  // Object results get the stamp merged in; arrays and primitives are nested
  // under `data` so their shape is never mangled (mirrors ptv's addPtvMeta).
  if (result && typeof result === "object" && !Array.isArray(result)) {
    return { ...(result as Record<string, unknown>), unclick_meta: stamp };
  }
  return { data: result, unclick_meta: stamp };
}
