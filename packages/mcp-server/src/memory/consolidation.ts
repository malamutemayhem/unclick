export const MEMORY_DECAY_V2_FLAG = "MEMORY_DECAY_V2_ENABLED";
export const MEMORY_CONSOLIDATION_FLAG = "MEMORY_CONSOLIDATION_ENABLED";

const DAY_MS = 24 * 60 * 60 * 1000;
const LANE_02_RECONCILE_THRESHOLDS = {
  sameSubject: 0.5,
  duplicate: 0.92,
} as const;

export type MemoryDecayTier = "hot" | "warm" | "cold";
export type MemoryFactStatus = "active" | "superseded" | "archived" | "disputed" | string;
export type MemoryStartupFactKind = "durable" | "operational" | "excluded" | "legacy_unspecified" | string;

export interface MemoryDecayFactRow {
  id: string;
  fact: string;
  category?: string | null;
  confidence?: number | null;
  source_type?: string | null;
  startup_fact_kind?: MemoryStartupFactKind | null;
  status?: MemoryFactStatus | null;
  superseded_by?: string | null;
  invalidated_at?: string | null;
  access_count?: number | null;
  last_accessed?: string | null;
  decay_tier?: MemoryDecayTier | string | null;
  valid_from?: string | null;
  valid_to?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  effective_score?: number | null;
  decayed_confidence?: number | null;
  heat_score?: number | null;
  final_score?: number | null;
  rrf_score?: number | null;
  kw_score?: number | null;
  cosine_score?: number | null;
  keyword_rank?: number | null;
  vector_rank?: number | null;
  last_decay_at?: string | null;
  decay_reason?: string | null;
  archived_at?: string | null;
  consolidation_group_id?: string | null;
  consolidation_receipt?: Record<string, unknown> | null;
  source_session_id?: string | null;
  source_agent_id?: string | null;
  source_ref?: string | null;
  receipt_id?: string | null;
  extractor_id?: string | null;
  prompt_version?: string | null;
  model_id?: string | null;
  commit_sha?: string | null;
  pr_number?: number | null;
  visibility?: string | null;
  boardroom_id?: string | null;
  credential_scope?: string | null;
  quarantined_at?: string | null;
}

export interface MemoryDecayOptions {
  now?: string;
  dry_run?: boolean;
  max_candidates?: number;
  source?: string;
}

export interface MemoryConsolidationOptions extends MemoryDecayOptions {
  similarity_threshold?: number;
  same_subject_threshold?: number;
}

export interface MemoryDecayPatch {
  id: string;
  confidence?: number;
  status?: "active" | "archived";
  decay_tier?: MemoryDecayTier;
  effective_score?: number;
  decayed_confidence?: number;
  heat_score?: number;
  last_decay_at?: string;
  decay_reason?: string;
  archived_at?: string | null;
  updated_at?: string;
}

export interface MemoryConsolidationPatch {
  id: string;
  fact?: string;
  confidence?: number;
  status?: "active" | "superseded";
  superseded_by?: string | null;
  valid_to?: string | null;
  decay_tier?: MemoryDecayTier;
  consolidation_group_id?: string;
  consolidation_receipt?: Record<string, unknown>;
  updated_at?: string;
}

export interface MemoryDecayPlan {
  ran_at: string;
  patches: MemoryDecayPatch[];
  scanned: number;
  active_scanned: number;
  archived: number;
  hot_set_size: number;
  stale_hot_count: number;
  hot_set_staleness: number;
  metrics: {
    hot_set_staleness: number;
  };
  tier_counts: Record<MemoryDecayTier, number>;
}

export interface MemoryConsolidationGroup {
  group_id: string;
  canonical_id: string;
  duplicate_ids: string[];
  average_similarity: number;
  average_same_subject_overlap: number;
}

export interface MemoryConsolidationPlan {
  ran_at: string;
  scanned: number;
  groups: MemoryConsolidationGroup[];
  patches: MemoryConsolidationPatch[];
  duplicate_count: number;
  dedup_collapse_rate: number;
  metrics: {
    dedup_collapse_rate: number;
  };
}

interface DecayPolicy {
  hotDays: number;
  coldDays: number;
  archiveDays: number | null;
  halfLifeDays: number;
  confidenceFloor: number;
  scopeWeight: number;
}

const DEFAULT_POLICY: DecayPolicy = {
  hotDays: 21,
  coldDays: 90,
  archiveDays: 365,
  halfLifeDays: 90,
  confidenceFloor: 0.25,
  scopeWeight: 0.8,
};

const IDENTITY_POLICY: DecayPolicy = {
  hotDays: 90,
  coldDays: 365,
  archiveDays: null,
  halfLifeDays: 365,
  confidenceFloor: 0.7,
  scopeWeight: 1.2,
};

const TASK_POLICY: DecayPolicy = {
  hotDays: 7,
  coldDays: 30,
  archiveDays: 90,
  halfLifeDays: 21,
  confidenceFloor: 0.2,
  scopeWeight: 0.7,
};

const OPERATIONAL_POLICY: DecayPolicy = {
  hotDays: 1,
  coldDays: 7,
  archiveDays: 30,
  halfLifeDays: 7,
  confidenceFloor: 0.08,
  scopeWeight: 0.35,
};

const INCIDENT_POLICY: DecayPolicy = {
  hotDays: 14,
  coldDays: 60,
  archiveDays: 180,
  halfLifeDays: 45,
  confidenceFloor: 0.2,
  scopeWeight: 0.75,
};

const TOKEN_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "for",
  "from",
  "has",
  "have",
  "into",
  "not",
  "the",
  "this",
  "that",
  "with",
]);

export function isFlagEnabled(name: string): boolean {
  const raw = process.env[name];
  return raw === "1" || raw?.toLowerCase() === "true";
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function round4(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 10_000) / 10_000;
}

function parseMs(value: string | null | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function daysBetween(nowMs: number, value: string | null | undefined): number {
  return Math.max(0, (nowMs - parseMs(value, nowMs)) / DAY_MS);
}

function textFor(row: MemoryDecayFactRow): string {
  return `${row.category ?? ""} ${row.source_type ?? ""} ${row.startup_fact_kind ?? ""} ${row.fact}`.toLowerCase();
}

function hasAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(word));
}

function isOperational(row: MemoryDecayFactRow): boolean {
  const text = textFor(row);
  return (
    row.startup_fact_kind === "operational" ||
    row.startup_fact_kind === "excluded" ||
    hasAny(text, [
      "heartbeat",
      "self-report",
      "self report",
      "wakepass",
      "queuepush",
      "blocker",
      "blocked",
      "in_progress",
      "status update",
      "stale ack",
      "no new signals",
      "ignore me",
      "placeholder",
    ])
  );
}

function isResolvedEphemeral(row: MemoryDecayFactRow): boolean {
  const text = textFor(row);
  return hasAny(text, [
    "resolved",
    "done",
    "closed",
    "merged",
    "shipped",
    "no longer",
    "ignore me",
    "placeholder",
  ]);
}

function policyFor(row: MemoryDecayFactRow): DecayPolicy {
  if (isResolvedEphemeral(row)) return TASK_POLICY;
  if (isOperational(row)) return OPERATIONAL_POLICY;
  const text = textFor(row);
  if (hasAny(text, ["identity", "profile", "preference", "standing_rule", "standing rule", "timezone", "name", "contact", "safety", "never", "always"])) {
    return IDENTITY_POLICY;
  }
  if (hasAny(text, ["task", "todo", "commitment", "deadline", "followup", "follow-up", "current work", "in-flight", "in flight", "project"])) {
    return TASK_POLICY;
  }
  if (hasAny(text, ["incident", "troubleshooting", "bug", "fix", "blocked", "blocker"])) {
    return INCIDENT_POLICY;
  }
  return DEFAULT_POLICY;
}

function nextTier(ageDays: number, policy: DecayPolicy): MemoryDecayTier {
  if (ageDays >= policy.coldDays) return "cold";
  if (ageDays >= policy.hotDays) return "warm";
  return "hot";
}

function decayReason(row: MemoryDecayFactRow, tier: MemoryDecayTier, shouldArchive: boolean): string {
  if (shouldArchive) return "lane-08:ttl_archive";
  if (row.invalidated_at || row.valid_to) return "lane-08:not_recall_visible";
  if (isResolvedEphemeral(row)) return `lane-08:resolved_${tier}`;
  if (isOperational(row)) return `lane-08:operational_${tier}`;
  return `lane-08:${tier}_by_ttl`;
}

export function buildMemoryDecayPlan(
  rows: MemoryDecayFactRow[],
  options: MemoryDecayOptions = {},
): MemoryDecayPlan {
  const ranAt = options.now ?? new Date().toISOString();
  const nowMs = parseMs(ranAt, Date.now());
  const candidates = rows.slice(0, Math.max(1, options.max_candidates ?? rows.length));
  const patches: MemoryDecayPatch[] = [];
  const tierCounts: Record<MemoryDecayTier, number> = { hot: 0, warm: 0, cold: 0 };
  let activeScanned = 0;
  let archived = 0;
  let hotSetSize = 0;
  let staleHotCount = 0;

  for (const row of candidates) {
    if ((row.status ?? "active") !== "active") continue;
    activeScanned += 1;

    const policy = policyFor(row);
    const lastSignalDays = daysBetween(nowMs, row.last_accessed ?? row.updated_at ?? row.created_at);
    const ageDays = daysBetween(nowMs, row.created_at ?? row.valid_from ?? row.last_accessed);
    const confidence = clamp01(row.confidence ?? 1);
    const reinforcementScore = clamp01(Math.log1p(Math.max(0, row.access_count ?? 0)) / Math.log(11));
    const recencyScore = clamp01(Math.exp(-lastSignalDays / Math.max(1, policy.halfLifeDays)));
    const decayedConfidence = clamp01(
      confidence * (policy.confidenceFloor + (1 - policy.confidenceFloor) * recencyScore),
    );
    const heatScore = clamp01((0.55 * recencyScore) + (0.25 * reinforcementScore) + (0.2 * decayedConfidence));
    const effectiveScore = clamp01((0.62 * decayedConfidence + 0.28 * heatScore + 0.1 * recencyScore) * policy.scopeWeight);
    let tier = nextTier(lastSignalDays, policy);
    const resolved = isResolvedEphemeral(row);
    if (resolved && lastSignalDays >= Math.min(policy.hotDays, 7)) tier = "cold";
    const shouldArchive =
      policy.archiveDays !== null &&
      (ageDays >= policy.archiveDays || (resolved && lastSignalDays >= Math.min(policy.archiveDays, 30)));

    const nextStatus = shouldArchive ? "archived" : "active";
    if (nextStatus === "archived") {
      tier = "cold";
      archived += 1;
    }
    if ((row.decay_tier ?? "hot") === "hot") {
      hotSetSize += 1;
      if (tier !== "hot" || shouldArchive) staleHotCount += 1;
    }
    tierCounts[tier] += 1;

    patches.push({
      id: row.id,
      confidence: round4(decayedConfidence),
      status: nextStatus,
      decay_tier: tier,
      effective_score: round4(effectiveScore),
      decayed_confidence: round4(decayedConfidence),
      heat_score: round4(heatScore),
      last_decay_at: ranAt,
      decay_reason: decayReason(row, tier, shouldArchive),
      archived_at: shouldArchive ? (row.archived_at ?? ranAt) : null,
      updated_at: ranAt,
    });
  }

  const hotSetStaleness = hotSetSize === 0 ? 0 : round4(staleHotCount / hotSetSize);
  return {
    ran_at: ranAt,
    patches,
    scanned: candidates.length,
    active_scanned: activeScanned,
    archived,
    hot_set_size: hotSetSize,
    stale_hot_count: staleHotCount,
    hot_set_staleness: hotSetStaleness,
    metrics: { hot_set_staleness: hotSetStaleness },
    tier_counts: tierCounts,
  };
}

function tokensFor(text: string): Set<string> {
  const tokens = text
    .toLowerCase()
    .match(/[a-z0-9][a-z0-9_-]*/g) ?? [];
  return new Set(tokens.filter((token) => token.length > 2 && !TOKEN_STOP_WORDS.has(token)));
}

function overlapCoefficient(a: string, b: string): number {
  const aTokens = tokensFor(a);
  const bTokens = tokensFor(b);
  if (aTokens.size === 0 || bTokens.size === 0) return 0;
  let intersection = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) intersection += 1;
  }
  return intersection / Math.min(aTokens.size, bTokens.size);
}

export function factSimilarity(a: string, b: string): number {
  const aTokens = tokensFor(a);
  const bTokens = tokensFor(b);
  if (aTokens.size === 0 || bTokens.size === 0) return 0;
  let intersection = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) intersection += 1;
  }
  const union = new Set([...aTokens, ...bTokens]).size;
  return union === 0 ? 0 : intersection / union;
}

function canonicalScore(row: MemoryDecayFactRow): number {
  const confidence = clamp01(row.confidence ?? 0.5);
  const effectiveScore = clamp01(row.effective_score ?? 0);
  const workerSixRankScore =
    clamp01(row.final_score ?? 0) +
    clamp01(row.rrf_score ?? 0) +
    clamp01(row.kw_score ?? 0) * 0.1 +
    clamp01(row.cosine_score ?? 0) * 0.25;
  const access = clamp01(Math.log1p(Math.max(0, row.access_count ?? 0)) / Math.log(11));
  const updated = parseMs(row.updated_at ?? row.created_at, 0) / 1_000_000_000_000;
  return confidence + effectiveScore + workerSixRankScore + access + updated;
}

function groupIdFor(ids: string[], ranAt: string): string {
  const seed = `${ranAt}:${ids.sort().join(":")}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return `lane08-${hash.toString(16).padStart(8, "0")}`;
}

function provenanceFor(row: MemoryDecayFactRow): Record<string, unknown> {
  return {
    id: row.id,
    source_session_id: row.source_session_id ?? null,
    source_agent_id: row.source_agent_id ?? null,
    source_ref: row.source_ref ?? null,
    receipt_id: row.receipt_id ?? null,
    extractor_id: row.extractor_id ?? null,
    prompt_version: row.prompt_version ?? null,
    model_id: row.model_id ?? null,
    commit_sha: row.commit_sha ?? null,
    pr_number: row.pr_number ?? null,
    created_at: row.created_at ?? null,
    updated_at: row.updated_at ?? null,
    confidence: row.confidence ?? null,
  };
}

function isConsolidationEligible(row: MemoryDecayFactRow): boolean {
  return (
    (row.status ?? "active") === "active" &&
    !row.invalidated_at &&
    !row.valid_to &&
    !row.quarantined_at &&
    !isOperational(row)
  );
}

export function buildMemoryConsolidationPlan(
  rows: MemoryDecayFactRow[],
  options: MemoryConsolidationOptions = {},
): MemoryConsolidationPlan {
  const ranAt = options.now ?? new Date().toISOString();
  const threshold = Math.max(0.5, Math.min(1, options.similarity_threshold ?? LANE_02_RECONCILE_THRESHOLDS.duplicate));
  const sameSubjectThreshold = Math.max(
    0,
    Math.min(1, options.same_subject_threshold ?? LANE_02_RECONCILE_THRESHOLDS.sameSubject),
  );
  const candidates = rows
    .filter(isConsolidationEligible)
    .slice(0, Math.max(1, options.max_candidates ?? rows.length));
  const used = new Set<string>();
  const patches: MemoryConsolidationPatch[] = [];
  const groups: MemoryConsolidationGroup[] = [];

  for (const seed of candidates) {
    if (used.has(seed.id)) continue;
    const cluster: Array<{ row: MemoryDecayFactRow; similarity: number; sameSubjectOverlap: number }> = [
      { row: seed, similarity: 1, sameSubjectOverlap: 1 },
    ];
    for (const other of candidates) {
      if (other.id === seed.id || used.has(other.id)) continue;
      if ((other.category ?? "general") !== (seed.category ?? "general")) continue;
      const sameSubjectOverlap = overlapCoefficient(seed.fact, other.fact);
      if (sameSubjectOverlap < sameSubjectThreshold) continue;
      const similarity = factSimilarity(seed.fact, other.fact);
      if (similarity >= threshold) {
        cluster.push({ row: other, similarity, sameSubjectOverlap });
      }
    }
    if (cluster.length < 2) continue;

    cluster.sort((a, b) => canonicalScore(b.row) - canonicalScore(a.row));
    const canonical = cluster[0].row;
    const duplicates = cluster.slice(1);
    const ids = cluster.map((entry) => entry.row.id);
    const groupId = groupIdFor(ids, ranAt);
    const duplicateIds = duplicates.map((entry) => entry.row.id);
    const averageSimilarity = round4(
      duplicates.reduce((total, entry) => total + entry.similarity, 0) / duplicates.length,
    );
    const averageSameSubjectOverlap = round4(
      duplicates.reduce((total, entry) => total + entry.sameSubjectOverlap, 0) / duplicates.length,
    );
    const receipt = {
      kind: "memory_consolidation_receipt_v1",
      worker: "lane-08",
      group_id: groupId,
      canonical_id: canonical.id,
      duplicate_ids: duplicateIds,
      provenance_union: cluster.map((entry) => provenanceFor(entry.row)),
      contracts: {
        provenance: ["source_agent_id", "source_ref", "receipt_id"],
        ranking: ["final_score", "rrf_score", "kw_score", "cosine_score", "keyword_rank", "vector_rank"],
        reconcile: { sameSubject: sameSubjectThreshold, duplicate: threshold },
        scope: { quarantine_field: "quarantined_at" },
        merge: { duplicate_action: "supersede", access_count_increment: 0 },
      },
      classifications: duplicates.map((entry) => ({
        id: entry.row.id,
        classification: "duplicate",
        similarity: round4(entry.similarity),
        same_subject_overlap: round4(entry.sameSubjectOverlap),
      })),
      average_similarity: averageSimilarity,
      average_same_subject_overlap: averageSameSubjectOverlap,
      similarity_threshold: threshold,
      same_subject_threshold: sameSubjectThreshold,
      source: options.source ?? "manual",
      ran_at: ranAt,
    };
    const confidence = clamp01(
      Math.max(...cluster.map((entry) => entry.row.confidence ?? 0.5)) + Math.min(0.12, duplicates.length * 0.03),
    );

    patches.push({
      id: canonical.id,
      confidence: round4(confidence),
      consolidation_group_id: groupId,
      consolidation_receipt: receipt,
      updated_at: ranAt,
    });
    for (const duplicate of duplicates) {
      patches.push({
        id: duplicate.row.id,
        status: "superseded",
        superseded_by: canonical.id,
        valid_to: ranAt,
        decay_tier: "cold",
        consolidation_group_id: groupId,
        consolidation_receipt: receipt,
        updated_at: ranAt,
      });
      used.add(duplicate.row.id);
    }
    used.add(canonical.id);
    groups.push({
      group_id: groupId,
      canonical_id: canonical.id,
      duplicate_ids: duplicateIds,
      average_similarity: averageSimilarity,
      average_same_subject_overlap: averageSameSubjectOverlap,
    });
  }

  const duplicateCount = groups.reduce((total, group) => total + group.duplicate_ids.length, 0);
  const collapseRate = candidates.length === 0 ? 0 : round4(duplicateCount / candidates.length);
  return {
    ran_at: ranAt,
    scanned: candidates.length,
    groups,
    patches,
    duplicate_count: duplicateCount,
    dedup_collapse_rate: collapseRate,
    metrics: { dedup_collapse_rate: collapseRate },
  };
}
