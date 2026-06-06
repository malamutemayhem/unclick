import { createHash } from "node:crypto";
import type {
  AdmissionDecision,
  FactInput,
  MemoryWriteGateCandidate,
  MemoryWriteGateMetrics,
  MemoryWriteGateRouteTarget,
} from "./types.js";

export const MEMORY_WRITE_GATE_FLAG = "MEMORY_WRITE_GATE_ENABLED";
export const MEMORY_WRITE_GATE_EPISODE_FLAG = "MEMORY_TYPED_SPLIT_ENABLED";
export const WRITE_GATE_CONFIDENCE_THRESHOLD = 0.7;
export const WRITE_GATE_SAME_SUBJECT_OVERLAP = 0.5;
export const WRITE_GATE_DUPLICATE_SIMILARITY = 0.92;
export const WRITE_GATE_NOOP_SIMILARITY = WRITE_GATE_DUPLICATE_SIMILARITY;
export const WRITE_GATE_UPDATE_SIMILARITY = WRITE_GATE_SAME_SUBJECT_OVERLAP;
export const WRITE_GATE_COOL_DOWN_SIMILARITY = WRITE_GATE_SAME_SUBJECT_OVERLAP;
export const WRITE_GATE_COOL_DOWN_SECONDS = 5 * 60;

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "have",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "with",
]);

const TRANSIENT_PATTERNS = [
  "heartbeat",
  "no new signals",
  "queue unchanged",
  "status unchanged",
  "current status",
  "checkin",
  "check-in",
  "poll complete",
  "sweep complete",
  "runner healthy",
  "noop",
  "no-op",
];

function flagEnabled(value: string | undefined): boolean {
  return value === "1" || value?.toLowerCase() === "true";
}

export function isMemoryWriteGateEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return flagEnabled(env[MEMORY_WRITE_GATE_FLAG]);
}

export function isMemoryWriteGateEpisodeStoreEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return flagEnabled(env[MEMORY_WRITE_GATE_EPISODE_FLAG]);
}

export function memoryWriteGateContentHash(text: string): string {
  return createHash("sha256").update(text.toLowerCase().trim(), "utf8").digest("hex");
}

function normalizeToken(token: string): string {
  if (token.length > 4 && token.endsWith("s")) return token.slice(0, -1);
  return token;
}

export function tokenizeMemoryWriteGateText(text: string): string[] {
  const seen = new Set<string>();
  const tokens = text.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) ?? [];
  return tokens
    .map(normalizeToken)
    .filter((token) => {
      if (token.length < 2) return false;
      if (STOP_WORDS.has(token)) return false;
      if (seen.has(token)) return false;
      seen.add(token);
      return true;
    });
}

function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

type MemoryWriteGateProvenanceInput = FactInput & {
  source_agent_id?: string | null;
  source_ref?: string | null;
  receipt_id?: string | null;
};

export interface MemoryWriteGateSessionEventInput {
  session_id?: string;
  memory_class: "episodic";
  event_kind: string;
  content: string;
  summary?: string;
  payload: Record<string, unknown>;
}

export interface MemoryWriteGateSessionEventResult {
  id: string;
  memory_class: string;
}

export type MemoryWriteGateResultSourceKind = "fact" | "conversation_turn" | "session_event" | "none";

export interface MemoryWriteGateEpisodeBackend {
  addSessionEvent(data: MemoryWriteGateSessionEventInput): Promise<MemoryWriteGateSessionEventResult>;
}

export function hasMemoryWriteGateEpisodeBackend(value: unknown): value is MemoryWriteGateEpisodeBackend {
  return Boolean(value && typeof value === "object" && typeof (value as { addSessionEvent?: unknown }).addSessionEvent === "function");
}

export function memoryWriteGateSessionEventInput(data: FactInput, gate: AdmissionDecision): MemoryWriteGateSessionEventInput {
  return {
    session_id: data.source_session_id,
    memory_class: "episodic",
    event_kind: "write_gate_route",
    content: data.fact,
    summary: data.fact.length > 240 ? `${data.fact.slice(0, 237)}...` : data.fact,
    payload: {
      category: data.category,
      confidence: data.confidence,
      startup_fact_kind: data.startup_fact_kind ?? "durable",
      routed_from: "add_fact",
      write_gate: {
        action: gate.action,
        reason: gate.reason,
        candidate_hash: gate.candidate_hash,
        route_target: gate.route_target,
      },
    },
  };
}

export function writeGateCandidateFromRankedSearchRow(row: unknown): MemoryWriteGateCandidate | null {
  if (!row || typeof row !== "object") return null;
  const r = row as Record<string, unknown>;
  if (r.source !== "fact") return null;
  const id = typeof r.id === "string" ? r.id : null;
  const fact = typeof r.content === "string"
    ? r.content
    : typeof r.fact === "string"
      ? r.fact
      : null;
  if (!id || !fact) return null;
  return {
    id,
    fact,
    category: typeof r.category === "string" ? r.category : "general",
    confidence: finiteNumber(r.confidence),
    content_hash: typeof r.content_hash === "string" ? r.content_hash : null,
    created_at: typeof r.created_at === "string" ? r.created_at : null,
    source: "fact",
    final_score: finiteNumber(r.final_score),
    rrf_score: finiteNumber(r.rrf_score),
    kw_score: finiteNumber(r.kw_score),
    cosine_score: finiteNumber(r.cosine_score),
    keyword_rank: finiteNumber(r.keyword_rank),
    vector_rank: finiteNumber(r.vector_rank),
  };
}

function normalizedText(text: string): string {
  return tokenizeMemoryWriteGateText(text).join(" ");
}

function hasAdmissionProvenance(input: FactInput): boolean {
  const typed = input as MemoryWriteGateProvenanceInput;
  return Boolean(
    input.source_session_id ||
      input.commit_sha ||
      input.pr_number ||
      input.prompt_version ||
      input.model_id ||
      (input.extractor_id && input.extractor_id !== "manual") ||
      typed.source_agent_id ||
      typed.source_ref ||
      typed.receipt_id
  );
}

function isTransientEvent(input: FactInput): boolean {
  if (input.startup_fact_kind === "operational" || input.startup_fact_kind === "excluded") return true;
  const text = `${input.category} ${input.fact}`.toLowerCase();
  return TRANSIENT_PATTERNS.some((pattern) => text.includes(pattern));
}

function withinCoolDown(candidate: MemoryWriteGateCandidate, nowMs: number): boolean {
  if (!candidate.created_at) return false;
  const createdAt = Date.parse(candidate.created_at);
  if (!Number.isFinite(createdAt)) return false;
  return nowMs - createdAt <= WRITE_GATE_COOL_DOWN_SECONDS * 1000;
}

function workerSixCosineSimilarity(candidate: MemoryWriteGateCandidate): number {
  return typeof candidate.cosine_score === "number" && Number.isFinite(candidate.cosine_score)
    ? Math.max(0, Math.min(1, candidate.cosine_score))
    : 0;
}

function rankSignal(candidate: MemoryWriteGateCandidate): number {
  const finalScore = typeof candidate.final_score === "number" && Number.isFinite(candidate.final_score)
    ? candidate.final_score
    : 0;
  const rrfScore = typeof candidate.rrf_score === "number" && Number.isFinite(candidate.rrf_score)
    ? candidate.rrf_score
    : 0;
  return finalScore + rrfScore;
}

export function scoreMemoryWriteSubjectOverlap(left: string, right: string): number {
  const leftTokens = tokenizeMemoryWriteGateText(left);
  const rightTokens = tokenizeMemoryWriteGateText(right);
  if (leftTokens.length === 0 || rightTokens.length === 0) return 0;
  const leftSet = new Set(leftTokens);
  const rightSet = new Set(rightTokens);
  let shared = 0;
  for (const token of leftSet) {
    if (rightSet.has(token)) shared += 1;
  }
  return shared / Math.min(leftSet.size, rightSet.size);
}

export function scoreMemoryWriteSimilarity(left: string, right: string): number {
  const leftHash = memoryWriteGateContentHash(left);
  const rightHash = memoryWriteGateContentHash(right);
  if (leftHash === rightHash) return 1;

  const leftNormalized = normalizedText(left);
  const rightNormalized = normalizedText(right);
  if (!leftNormalized || !rightNormalized) return 0;
  if (leftNormalized === rightNormalized) return 1;

  const leftTokens = tokenizeMemoryWriteGateText(left);
  const rightTokens = tokenizeMemoryWriteGateText(right);
  if (leftTokens.length === 0 || rightTokens.length === 0) return 0;

  const rightSet = new Set(rightTokens);
  const intersection = leftTokens.filter((token) => rightSet.has(token)).length;
  const union = new Set([...leftTokens, ...rightTokens]).size;
  const overlap = scoreMemoryWriteSubjectOverlap(left, right);
  const jaccard = intersection / union;
  const shorter = leftNormalized.length <= rightNormalized.length ? leftNormalized : rightNormalized;
  const longer = leftNormalized.length > rightNormalized.length ? leftNormalized : rightNormalized;
  const phraseContainment = shorter.length >= 8 && longer.includes(shorter) ? 0.92 : 0;

  return Math.max(phraseContainment, overlap * 0.7 + jaccard * 0.3);
}

function isExpansion(candidate: FactInput, existing: MemoryWriteGateCandidate, similarity: number): boolean {
  if (similarity < WRITE_GATE_UPDATE_SIMILARITY) return false;
  if (candidate.category !== existing.category) return false;
  const candidateTokens = new Set(tokenizeMemoryWriteGateText(candidate.fact));
  const existingTokens = tokenizeMemoryWriteGateText(existing.fact);
  if (existingTokens.length < 3) return false;
  const keepsExistingSignal = existingTokens.every((token) => candidateTokens.has(token));
  return keepsExistingSignal && candidate.fact.length >= existing.fact.length + 16;
}

function metricsForDecision(input: {
  action: AdmissionDecision["action"];
  similarity?: number;
  admittedToFactStore: boolean;
}): MemoryWriteGateMetrics {
  const duplicateBlocked =
    (input.action === "NOOP" || input.action === "UPDATE") &&
    (input.similarity ?? 0) >= WRITE_GATE_UPDATE_SIMILARITY;
  return {
    duplicate_rate: input.action === "ADD" && (input.similarity ?? 0) >= WRITE_GATE_UPDATE_SIMILARITY ? 1 : 0,
    write_precision: input.admittedToFactStore || duplicateBlocked || input.action === "REJECT" || input.action === "ROUTE_EVENT" ? 1 : 0,
    duplicate_blocked: duplicateBlocked,
    admitted_to_fact_store: input.admittedToFactStore,
  };
}

function decision(input: {
  action: AdmissionDecision["action"];
  reason: string;
  candidate: FactInput;
  routeTarget?: MemoryWriteGateRouteTarget;
  matched?: MemoryWriteGateCandidate;
  similarity?: number;
  admittedToFactStore: boolean;
}): AdmissionDecision {
  const candidateHash = memoryWriteGateContentHash(input.candidate.fact);
  return {
    action: input.action,
    admitted: input.admittedToFactStore,
    reason: input.reason,
    candidate_hash: candidateHash,
    candidate_category: input.candidate.category,
    matched_id: input.matched?.id,
    matched_hash: input.matched?.content_hash ?? (input.matched ? memoryWriteGateContentHash(input.matched.fact) : undefined),
    matched_text: input.matched?.fact,
    similarity: input.similarity,
    route_target: input.routeTarget,
    cool_down_seconds: input.reason === "cool_down" ? WRITE_GATE_COOL_DOWN_SECONDS : undefined,
    metrics: metricsForDecision({
      action: input.action,
      similarity: input.similarity,
      admittedToFactStore: input.admittedToFactStore,
    }),
  };
}

export function selectAdmissionDecision(
  candidate: FactInput,
  existingCandidates: MemoryWriteGateCandidate[],
  nowMs = Date.now()
): AdmissionDecision {
  if (candidate.preserve_as_blob) {
    return decision({
      action: "ADD",
      reason: "blob_preservation_skip",
      candidate,
      admittedToFactStore: true,
    });
  }

  if (isTransientEvent(candidate)) {
    return decision({
      action: "ROUTE_EVENT",
      reason: "transient_event",
      candidate,
      routeTarget: "episode_store",
      admittedToFactStore: false,
    });
  }

  if (candidate.confidence < WRITE_GATE_CONFIDENCE_THRESHOLD && !hasAdmissionProvenance(candidate)) {
    return decision({
      action: "REJECT",
      reason: "low_confidence_without_provenance",
      candidate,
      routeTarget: "none",
      admittedToFactStore: false,
    });
  }

  let best: { candidate: MemoryWriteGateCandidate; similarity: number } | null = null;
  const candidateHash = memoryWriteGateContentHash(candidate.fact);
  for (const existing of existingCandidates) {
    const existingHash = existing.content_hash ?? memoryWriteGateContentHash(existing.fact);
    const exact = existingHash === candidateHash;
    const subjectOverlap = exact ? 1 : scoreMemoryWriteSubjectOverlap(candidate.fact, existing.fact);
    const cosineSimilarity = exact ? 1 : workerSixCosineSimilarity(existing);
    const sameSubject = exact ||
      subjectOverlap >= WRITE_GATE_SAME_SUBJECT_OVERLAP ||
      cosineSimilarity >= WRITE_GATE_SAME_SUBJECT_OVERLAP;
    if (!sameSubject) continue;
    const similarity = exact
      ? 1
      : Math.max(scoreMemoryWriteSimilarity(candidate.fact, existing.fact), cosineSimilarity);
    if (!best || similarity > best.similarity) {
      best = { candidate: existing, similarity };
    } else if (best && similarity === best.similarity && rankSignal(existing) > rankSignal(best.candidate)) {
      best = { candidate: existing, similarity };
    }
  }

  if (best?.similarity === 1) {
    return decision({
      action: "NOOP",
      reason: "exact_duplicate",
      candidate,
      matched: best.candidate,
      similarity: best.similarity,
      admittedToFactStore: false,
    });
  }

  if (best && isExpansion(candidate, best.candidate, best.similarity)) {
    return decision({
      action: "UPDATE",
      reason: "compatible_expansion",
      candidate,
      matched: best.candidate,
      similarity: best.similarity,
      admittedToFactStore: true,
    });
  }

  if (best && withinCoolDown(best.candidate, nowMs) && best.similarity >= WRITE_GATE_COOL_DOWN_SIMILARITY) {
    return decision({
      action: "NOOP",
      reason: "cool_down",
      candidate,
      matched: best.candidate,
      similarity: best.similarity,
      admittedToFactStore: false,
    });
  }

  if (best && best.similarity >= WRITE_GATE_NOOP_SIMILARITY) {
    return decision({
      action: "NOOP",
      reason: "semantic_duplicate",
      candidate,
      matched: best.candidate,
      similarity: best.similarity,
      admittedToFactStore: false,
    });
  }

  return decision({
    action: "ADD",
    reason: "no_duplicate_or_admission_block",
    candidate,
    matched: best?.candidate,
    similarity: best?.similarity,
    admittedToFactStore: true,
  });
}

export function syntheticWriteGateId(prefix: "rejected" | "routed", hash: string): string {
  return `write-gate-${prefix}-${hash.slice(0, 16)}`;
}
