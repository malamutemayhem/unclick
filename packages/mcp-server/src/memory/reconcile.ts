/**
 * Lane 02 - Contradiction Reconciliation & Supersession.
 *
 * When a write lands on the same subject as an existing live fact, the store
 * should not silently dual-write. This module decides whether an incoming fact
 * is a duplicate, a refinement, a contradiction, or distinct, and for the
 * conflict cases resolves it newest-wins by superseding the prior fact with
 * full history preserved. A genuine contradiction raises exactly one
 * contradiction event for Boardroom / admin visibility and override.
 *
 * Design contract (so the two backends and the neighbouring lanes can share it):
 *  - Pure and backend-agnostic. Every side effect (supersede, emit) is
 *    injected, so the Supabase and local backends reuse identical
 *    classification logic and the module is unit-testable without a database.
 *  - The similarity function is injectable. The default is a dependency-free
 *    token-overlap score; Worker 6/7's embedding-cosine primitive can be
 *    swapped in without touching the classifier (consume contract, near-zero
 *    rewire when it publishes).
 *  - Provenance from both sides of a conflict is carried into the contradiction
 *    event (Worker 3's fields), never dropped.
 *  - Flag-gated by MEMORY_RECONCILE_ENABLED, default off.
 *
 * Exported for reuse:
 *  - classifyAgainst(): Worker 7's write-gate calls this for its UPDATE branch.
 *  - reconcileCandidate(): Worker 8's consolidation job calls this over a pile.
 */

import type {
  FactInput,
  ContradictionEvent,
  ContradictionParty,
  ReconcileOptions,
  ReconcileResult,
  ReconciliationClassification,
} from "./types.js";

/** Minimal view of a stored live fact that the classifier needs. */
export interface ExistingFact {
  id: string;
  fact: string;
  category: string;
  confidence?: number;
  recorded_at?: string;
  valid_from?: string;
  // Provenance (Worker 3, band 01xx). Optional until that lane lands.
  extractor_id?: string;
  model_id?: string;
  prompt_version?: string;
  commit_sha?: string;
  pr_number?: number;
}

/** Similarity in [0, 1]. Default is token overlap; swap in cosine later. */
export type SimilarityFn = (a: string, b: string) => number;

export interface ReconcileDeps {
  /** Supersede the prior fact newest-wins. Returns the new fact id. */
  supersede: (oldId: string, newText: string, category?: string, confidence?: number) => Promise<string>;
  /** Emit a contradiction event. Called at most once per genuine conflict. */
  emit?: (event: ContradictionEvent) => void | Promise<void>;
  /** Similarity scorer. Defaults to dependency-free token overlap. */
  similarity?: SimilarityFn;
  /** Clock injection for deterministic tests. */
  now?: () => string;
}

export const RECONCILE_DEFAULTS = {
  /**
   * Min subject-overlap coefficient (shared / smaller token set) to treat two
   * facts as being about the same subject. Overlap, not Jaccard, so that terse
   * identity facts ("Timezone is PST" vs "Timezone is EST", which share only one
   * anchor token) still register as the same subject and can contradict.
   */
  sameSubject: 0.5,
  /** Min similarity (injected scorer) to treat an incoming fact as a duplicate. */
  duplicate: 0.92,
} as const;

/** Env flag, default off. Mirrors the house pattern (isAtomicFactExtractionEnabled). */
export function isReconcileEnabled(): boolean {
  const raw = process.env.MEMORY_RECONCILE_ENABLED ?? "";
  return raw === "1" || raw.toLowerCase() === "true";
}

// --- Pure text helpers (no I/O, no deps) ---

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being", "am",
  "to", "of", "in", "on", "at", "for", "and", "or", "but", "with", "as", "by",
  "i", "you", "he", "she", "it", "we", "they", "my", "your", "their", "our",
  "this", "that", "these", "those", "from", "into", "than", "then", "so",
  "do", "does", "did", "has", "have", "had", "will", "would", "can", "could",
  "me", "us", "them", "his", "her", "its",
]);

const NEGATION_CUES = [
  "not", "no", "never", "isn't", "aren't", "wasn't", "weren't", "don't",
  "doesn't", "didn't", "won't", "cannot", "can't", "no longer", "stopped",
  "cancelled", "canceled", "without",
];

/** Lowercase, split on non-alphanumeric, drop stopwords and 1-char tokens. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

function tokenSet(text: string): Set<string> {
  return new Set(tokenize(text));
}

/** Jaccard overlap of content tokens. Dependency-free default similarity. */
export function defaultSimilarity(a: string, b: string): number {
  const sa = tokenSet(a);
  const sb = tokenSet(b);
  if (sa.size === 0 && sb.size === 0) return 1;
  if (sa.size === 0 || sb.size === 0) return 0;
  let shared = 0;
  for (const t of sa) if (sb.has(t)) shared += 1;
  const union = sa.size + sb.size - shared;
  return union === 0 ? 0 : shared / union;
}

/**
 * Overlap coefficient of content tokens (shared / smaller token set). A
 * structural "same subject" signal independent of the injected similarity
 * scorer, so terse facts that share one anchor token still register as related.
 */
export function subjectOverlap(a: string, b: string): number {
  const sa = tokenSet(a);
  const sb = tokenSet(b);
  if (sa.size === 0 || sb.size === 0) return 0;
  let shared = 0;
  for (const t of sa) if (sb.has(t)) shared += 1;
  return shared / Math.min(sa.size, sb.size);
}

function hasNegation(text: string): boolean {
  const lower = ` ${text.toLowerCase()} `;
  return NEGATION_CUES.some((cue) =>
    cue.includes(" ") ? lower.includes(` ${cue} `) : lower.includes(` ${cue} `),
  );
}

function numberTokens(text: string): Set<string> {
  return new Set(tokenize(text).filter((t) => /\d/.test(t)));
}

function setsDiffer(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) return true;
  for (const x of a) if (!b.has(x)) return true;
  return false;
}

export interface ClassifyThresholds {
  sameSubject: number;
  duplicate: number;
}

/**
 * Classify how an incoming fact relates to one existing live fact.
 *
 * The judgment, favouring precision so contradiction events stay trustworthy:
 *  - distinct      : too little subject overlap to be related.
 *  - duplicate     : same subject, same value (near-identical or one subsumes
 *                    the other with no new content).
 *  - refinement    : same subject, the incoming text only ADDS detail (the
 *                    existing tokens are a subset of the incoming ones).
 *  - contradiction : same subject, but the values diverge mutually-exclusively
 *                    (negation polarity flip, differing numbers, or each side
 *                    carries a competing content token the other lacks).
 */
export function classifyAgainst(
  incoming: string,
  existing: string,
  similarity: SimilarityFn = defaultSimilarity,
  thresholds: ClassifyThresholds = RECONCILE_DEFAULTS,
): { classification: ReconciliationClassification; similarity: number; reason: string } {
  const sim = similarity(incoming, existing);
  if (subjectOverlap(incoming, existing) < thresholds.sameSubject) {
    return { classification: "distinct", similarity: sim, reason: "subject overlap below threshold" };
  }

  const inTokens = tokenSet(incoming);
  const exTokens = tokenSet(existing);
  const onlyIncoming = [...inTokens].filter((t) => !exTokens.has(t));
  const onlyExisting = [...exTokens].filter((t) => !inTokens.has(t));

  // Strong duplicate: very high overlap and neither side adds content.
  if (sim >= thresholds.duplicate && onlyIncoming.length === 0 && onlyExisting.length === 0) {
    return { classification: "duplicate", similarity: sim, reason: "near-identical content" };
  }

  // Mutually-exclusive value signals win first (these are the genuine conflicts).
  if (hasNegation(incoming) !== hasNegation(existing)) {
    return { classification: "contradiction", similarity: sim, reason: "negation polarity differs" };
  }
  const inNums = numberTokens(incoming);
  const exNums = numberTokens(existing);
  if ((inNums.size > 0 || exNums.size > 0) && setsDiffer(inNums, exNums)) {
    return { classification: "contradiction", similarity: sim, reason: "numeric value differs" };
  }

  // No competing value: decide refinement vs duplicate by containment.
  if (onlyExisting.length === 0) {
    // Existing tokens fully contained in incoming: incoming only adds detail.
    return { classification: "refinement", similarity: sim, reason: "incoming extends existing" };
  }
  if (onlyIncoming.length === 0) {
    // Incoming fully contained in existing: nothing new to store.
    return { classification: "duplicate", similarity: sim, reason: "incoming subsumed by existing" };
  }

  // Both sides carry a unique content token: the value diverges.
  return { classification: "contradiction", similarity: sim, reason: "competing values on shared subject" };
}

function bestParty(fact: ExistingFact): ContradictionParty {
  return {
    fact_id: fact.id,
    fact: fact.fact,
    category: fact.category,
    confidence: fact.confidence,
    recorded_at: fact.recorded_at,
    valid_from: fact.valid_from,
    extractor_id: fact.extractor_id,
    model_id: fact.model_id,
    prompt_version: fact.prompt_version,
    commit_sha: fact.commit_sha,
    pr_number: fact.pr_number,
  };
}

function incomingParty(candidate: FactInput): ContradictionParty {
  return {
    fact: candidate.fact,
    category: candidate.category,
    confidence: candidate.confidence,
    valid_from: candidate.valid_from,
    extractor_id: candidate.extractor_id,
    model_id: candidate.model_id,
    prompt_version: candidate.prompt_version,
    commit_sha: candidate.commit_sha,
    pr_number: candidate.pr_number,
  };
}

/** A short subject label for the event summary: the shared content tokens. */
function subjectLabel(incoming: string, existing: string): string {
  const ex = tokenSet(existing);
  const shared = tokenize(incoming).filter((t) => ex.has(t));
  const label = (shared.length > 0 ? shared : tokenize(incoming)).slice(0, 6).join(" ");
  return label || incoming.slice(0, 48);
}

/** Pick the most-similar same-subject live fact, or null when none qualify. */
function selectBestMatch(
  incoming: string,
  existing: ExistingFact[],
  similarity: SimilarityFn,
  sameSubject: number,
): { fact: ExistingFact; score: number } | null {
  let best: { fact: ExistingFact; score: number } | null = null;
  for (const fact of existing) {
    if (subjectOverlap(incoming, fact.fact) < sameSubject) continue;
    const score = similarity(incoming, fact.fact);
    if (best === null || score > best.score) {
      best = { fact, score };
    }
  }
  return best;
}

/**
 * Reconcile one incoming fact against the same-subject live facts a backend
 * supplies. Newest-wins supersession (history preserved via the injected
 * supersede), and exactly one contradiction event per genuine conflict.
 *
 * The backend passes facts already scoped to its tenant and bi-temporally
 * visible; this function does not query anything.
 */
export async function reconcileCandidate(
  candidate: FactInput,
  existing: ExistingFact[],
  deps: ReconcileDeps,
  options: ReconcileOptions = {},
): Promise<ReconcileResult> {
  const similarity = deps.similarity ?? defaultSimilarity;
  const nowFn = deps.now ?? (() => new Date().toISOString());
  const thresholds: ClassifyThresholds = {
    sameSubject: options.thresholds?.sameSubject ?? RECONCILE_DEFAULTS.sameSubject,
    duplicate: options.thresholds?.duplicate ?? RECONCILE_DEFAULTS.duplicate,
  };

  const match = selectBestMatch(candidate.fact, existing, similarity, thresholds.sameSubject);
  if (!match) {
    return { enabled: true, classification: "distinct", decision: "add" };
  }

  const { classification, similarity: sim } = classifyAgainst(
    candidate.fact,
    match.fact.fact,
    similarity,
    thresholds,
  );

  if (classification === "distinct") {
    return { enabled: true, classification, decision: "add", matched_fact_id: match.fact.id, similarity: sim };
  }
  if (classification === "duplicate") {
    // Incoming adds nothing: keep the existing fact, drop the write.
    return {
      enabled: true,
      classification,
      decision: "noop",
      matched_fact_id: match.fact.id,
      fact_id: match.fact.id,
      similarity: sim,
    };
  }

  // refinement OR contradiction: supersede newest-wins so the latest value is
  // served and the prior value is preserved with history.
  const event: ContradictionEvent | undefined =
    classification === "contradiction"
      ? {
          kind: "memory_contradiction",
          subject: subjectLabel(candidate.fact, match.fact.fact),
          category: candidate.category,
          classification,
          resolution: "supersede",
          similarity: sim,
          incoming: incomingParty(candidate),
          existing: bestParty(match.fact),
          detected_at: nowFn(),
          session_id: options.session_id,
        }
      : undefined;

  if (options.dry_run) {
    return {
      enabled: true,
      classification,
      decision: "supersede",
      matched_fact_id: match.fact.id,
      similarity: sim,
      contradiction: event,
    };
  }

  const newId = await deps.supersede(match.fact.id, candidate.fact, candidate.category, candidate.confidence);

  // Emit exactly once, and only for a genuine contradiction (not refinements).
  if (event && deps.emit) {
    await deps.emit(event);
  }

  return {
    enabled: true,
    classification,
    decision: "supersede",
    superseded_fact_id: match.fact.id,
    matched_fact_id: match.fact.id,
    fact_id: newId,
    similarity: sim,
    contradiction: event,
  };
}
