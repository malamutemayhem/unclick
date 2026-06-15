/**
 * Pattern promotion (flag: MEMORY_PATTERN_PROMOTION_ENABLED, default OFF).
 *
 * Deterministic episodic-to-semantic promotion: when the same behavior shows
 * up across enough episode events, propose one durable fact that carries
 * provenance back to the episodes it was inferred from. This targets the
 * public weak spot of every incumbent memory product ("stores memories but
 * does not learn user patterns") without an LLM in the loop: clustering is
 * token-overlap based, the proposed fact goes through the normal add_fact
 * path (write gate, dedup, reconcile), and re-running is idempotent because
 * identical proposals hit the exact-hash dedup.
 */

export const MEMORY_PATTERN_PROMOTION_FLAG = "MEMORY_PATTERN_PROMOTION_ENABLED";

/** Reversible feature flag. Default OFF until the eval harness scores it. */
export function isPatternPromotionEnabled(): boolean {
  const raw = (process.env[MEMORY_PATTERN_PROMOTION_FLAG] ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true";
}

export interface PatternEpisode {
  id: string;
  content: string;
}

export interface PatternCluster {
  /** The longest member, kept verbatim as the cluster's representative. */
  representative: string;
  occurrences: number;
  event_ids: string[];
}

const STOPWORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "into", "was", "were",
  "are", "has", "have", "had", "but", "not", "you", "your", "their", "they",
]);

export function tokenizePattern(text: string): Set<string> {
  const words = text.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) ?? [];
  return new Set(words.filter((word) => word.length >= 3 && !STOPWORDS.has(word)));
}

export function patternSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const token of a) if (b.has(token)) shared += 1;
  return shared / (a.size + b.size - shared);
}

/**
 * Greedy single-pass clustering: each episode joins the first cluster whose
 * seed it overlaps past the threshold, otherwise it seeds a new cluster.
 * Deterministic for a given input order.
 */
export function clusterEpisodes(episodes: PatternEpisode[], threshold = 0.5): PatternCluster[] {
  const clusters: Array<PatternCluster & { seed: Set<string> }> = [];
  for (const episode of episodes) {
    const content = (episode.content ?? "").trim();
    if (!content) continue;
    const tokens = tokenizePattern(content);
    const match = clusters.find((cluster) => patternSimilarity(cluster.seed, tokens) >= threshold);
    if (match) {
      match.occurrences += 1;
      match.event_ids.push(episode.id);
      if (content.length > match.representative.length) match.representative = content;
    } else {
      clusters.push({ representative: content, occurrences: 1, event_ids: [episode.id], seed: tokens });
    }
  }
  return clusters.map(({ seed: _seed, ...cluster }) => cluster);
}

export function buildPatternFactText(cluster: PatternCluster): string {
  return `Observed pattern (${cluster.occurrences} occurrences): ${cluster.representative}`;
}
