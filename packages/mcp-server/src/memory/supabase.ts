/**
 * Supabase backend for UnClick Memory.
 *
 * Two tenancy modes:
 *
 *   BYOD     - data lives in the user's own Supabase project. Single-tenant
 *              tables (business_context, extracted_facts, ...) and the
 *              original RPC names. This is what the wizard (memory-admin
 *              setup) installs into a user's Supabase.
 *
 *   managed  - data lives in UnClick's central Supabase. Multi-tenant
 *              tables (mc_business_context, mc_extracted_facts, ...) where
 *              every row is tagged with api_key_hash. RPCs are mc_-prefixed
 *              and take p_api_key_hash as their first parameter. The backend
 *              is responsible for filtering / inserting api_key_hash on
 *              every operation.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { provenanceWriteFields } from "./provenance.js";
import type {
  MemoryBackend,
  SessionSummaryInput,
  FactInput,
  InvalidateFactInput,
  ForgetInput,
  ForgetReceipt,
  ConversationInput,
  CodeInput,
  LibraryDocInput,
  MemoryTaxonomySnapshot,
  MemoryTaxonomySnapshotSourceReceipt,
  MemoryTaxonomySnapshotWriteOptions,
  MemoryTaxonomySnapshotWriteResult,
  MemoryTaxonomySnapshotSource,
  MemoryClass,
  SessionEventInput,
  SessionEventQuery,
  SessionEventWriteResult,
  SaveTypedLinkCandidatesResult,
  AdmissionDecision,
  MemoryWriteGateCandidate,
  MemoryPassportAuditRecord,
  MemoryPassportExportInput,
  MemoryPassportExportResult,
  MemoryPassportImportInput,
  MemoryPassportImportResult,
} from "./types.js";
import {
  filterAndRankMemoryTypedLinks,
  type MemoryTypedLinkCandidate,
  type MemoryTypedLinkSearchResult,
  type MemoryTypedLinkStoredRow,
} from "./typed-links.js";
import {
  buildMemoryConsolidationPlan,
  buildMemoryDecayPlan,
  type MemoryConsolidationOptions,
  type MemoryConsolidationPatch,
  type MemoryConsolidationPlan,
  type MemoryDecayFactRow,
  type MemoryDecayOptions,
  type MemoryDecayPatch,
  type MemoryDecayPlan,
} from "./consolidation.js";
import { shouldEnforceManagedMemoryCaps } from "./quota-policy.js";
import {
  classifyMemoryClass,
  factInputToSessionEventInput,
  isFactSearchableMemoryClass,
  isTypedMemorySplitEnabled,
  normalizeMemoryClass,
} from "./typed-memory.js";
// --- lane-01: retrieval fusion (read path) ---
import { isFusedRetrievalEnabled, scoreBusinessContextRows, fuseRankedSearchLanes, orderByEffectiveScore } from "./retrieval-fusion.js";
import type { MemorySearchResultRow } from "./types.js";
// --- end lane-01 ---
import {
  isFactInScope,
  resolveScopeContext,
  scopeFieldsForWrite,
  scopesEnabled,
  type MemoryScopeContext,
  type MemoryFactScopeFields,
} from "./scopes.js";
// --- lane-02: contradiction reconciliation & supersession ---
import type { ReconcileOptions, ReconcileResult, ContradictionEvent } from "./types.js";
import type { ExistingFact } from "./reconcile.js";
// --- end lane-02 ---
// --- lane-07: write-gate & admission ---
import {
  hasMemoryWriteGateEpisodeBackend,
  isMemoryWriteGateEnabled,
  isMemoryWriteGateEpisodeStoreEnabled,
  memoryWriteGateContentHash,
  memoryWriteGateSessionEventInput,
  type MemoryWriteGateResultSourceKind,
  selectAdmissionDecision,
  syntheticWriteGateId,
  tokenizeMemoryWriteGateText,
  writeGateCandidateFromRankedSearchRow,
} from "./write-gate.js";
// --- lane-10: eval harness and memory passport ---
import {
  buildMemoryPassportBundle,
  buildMemoryPassportImportResult,
  verifyMemoryPassportBundle,
} from "./passport.js";
// --- end lane-10 ---
// --- end lane-07 ---
// --- lane-05: true-forget ---
import {
  factSnapshotPointer,
  scrubForgottenFactFromSnapshots,
  SESSION_EVENTS_TABLE_BYOD,
  SESSION_EVENTS_TABLE_MANAGED,
} from "./forget.js";
// --- end lane-05 ---

function pgError(context: string, err: unknown): Error {
  if (err instanceof Error) return err;
  const e = (err ?? {}) as { message?: string; code?: string; details?: string; hint?: string };
  const parts: string[] = [`${context} failed`];
  if (e.message) parts.push(e.message);
  if (e.code) parts.push(`(code: ${e.code})`);
  if (e.details) parts.push(`details: ${e.details}`);
  if (e.hint) parts.push(`hint: ${e.hint}`);
  return new Error(parts.join(" "));
}

function contentHash(text: string): string {
  return createHash("sha256").update(text.toLowerCase().trim(), "utf8").digest("hex");
}

function isAtomicFactExtractionEnabled(): boolean {
  const raw =
    process.env.MEMORY_OPENAI_FACT_EXTRACTION_ENABLED ??
    process.env.MEMORY_AI_FACT_EXTRACTION_ENABLED ??
    "";
  return raw === "1" || raw.toLowerCase() === "true";
}

async function extractAtomicFacts(text: string): Promise<string[]> {
  if (!isAtomicFactExtractionEnabled()) return [text];

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return [text];
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              'Extract 3-10 atomic facts from the following text. Each fact must be a single, self-contained statement. Return ONLY a JSON object: {"facts": ["fact1", "fact2", ...]}',
          },
          { role: "user", content: text.slice(0, 4000) },
        ],
        response_format: { type: "json_object" },
        max_tokens: 600,
      }),
    });
    if (!res.ok) return [text];
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const raw = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as { facts?: unknown[] };
    if (Array.isArray(parsed.facts) && parsed.facts.length > 0) {
      return (parsed.facts as unknown[]).map(String).filter(Boolean);
    }
    return [text];
  } catch {
    return [text];
  }
}

export type Tenancy =
  | { mode: "byod" }
  | { mode: "managed"; apiKeyHash: string };

export interface SupabaseBackendConfig {
  url: string;
  serviceRoleKey: string;
  tenancy: Tenancy;
}

interface TableNames {
  business_context: string;
  knowledge_library: string;
  knowledge_library_history: string;
  session_summaries: string;
  extracted_facts: string;
  session_events: string;
  conversation_log: string;
  memory_typed_links: string;
  code_dumps: string;
}

const LOCAL_SEARCH_STOP_WORDS = new Set([
  "and",
  "are",
  "for",
  "from",
  "how",
  "the",
  "this",
  "that",
  "with",
]);

export function tokenizeLocalMemoryQuery(query: string): string[] {
  const seen = new Set<string>();
  const tokens = query
    .toLowerCase()
    .match(/[a-z0-9][a-z0-9_-]*/g) ?? [];
  return tokens.filter((token) => {
    if (token.length < 2) return false;
    if (LOCAL_SEARCH_STOP_WORDS.has(token)) return false;
    if (seen.has(token)) return false;
    seen.add(token);
    return true;
  });
}

function normalizeLocalMemoryText(text: string): string {
  return (text.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) ?? []).join(" ");
}

function tokenizeLocalMemoryText(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) ?? [];
}

const LOCAL_MEMORY_BM25_K1 = 1.2;
const LOCAL_MEMORY_BM25_B = 0.75;
const LOCAL_MEMORY_AVG_DOC_LENGTH = 24;
const MEMORY_RRF_K = 60;
const MEMORY_RECENCY_DECAY_DAYS = 90;

function clampUnit(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function daysBetween(createdAt: string | null | undefined, asOf?: string): number {
  if (!createdAt) return 0;
  const createdMs = Date.parse(createdAt);
  const asOfMs = asOf ? Date.parse(asOf) : Date.now();
  if (!Number.isFinite(createdMs) || !Number.isFinite(asOfMs)) return 0;
  return Math.max(0, (asOfMs - createdMs) / 86_400_000);
}

export function reciprocalRankScore(keywordRank?: number | null, vectorRank?: number | null): number {
  const keyword = keywordRank && keywordRank > 0 ? 1 / (MEMORY_RRF_K + keywordRank) : 0;
  const vector = vectorRank && vectorRank > 0 ? 1 / (MEMORY_RRF_K + vectorRank) : 0;
  return keyword + vector;
}

export function memoryRecencyWeight(createdAt: string | null | undefined, asOf?: string): number {
  return Math.exp(-daysBetween(createdAt, asOf) / MEMORY_RECENCY_DECAY_DAYS);
}

export interface LocalMemoryContentScore {
  finalScore: number;
  matchedTokenCount: number;
  exactPhrase: boolean;
  kwScore: number;
  documentTokenCount: number;
}

export function scoreLocalMemoryContent(input: {
  query: string;
  tokens: string[];
  text: string;
  confidence?: number | null;
  source?: "fact" | "session";
}): LocalMemoryContentScore {
  const { query, tokens, text } = input;
  if (tokens.length === 0) {
    return { finalScore: 0, matchedTokenCount: 0, exactPhrase: false, kwScore: 0, documentTokenCount: 0 };
  }

  const normalizedText = normalizeLocalMemoryText(text);
  const normalizedQuery = normalizeLocalMemoryText(query);
  const textTokens = tokenizeLocalMemoryText(text);
  const documentTokenCount = textTokens.length;
  const tokenCounts = new Map<string, number>();
  for (const token of textTokens) {
    tokenCounts.set(token, (tokenCounts.get(token) ?? 0) + 1);
  }
  const matchedTokenCount = tokens.reduce((count, token) => count + (tokenCounts.has(token) ? 1 : 0), 0);
  const exactPhrase =
    normalizedQuery.length >= 4 &&
    normalizedText.includes(normalizedQuery);
  const bm25Sum = tokens.reduce((sum, token) => {
    const frequency = tokenCounts.get(token) ?? 0;
    if (frequency === 0) return sum;
    const denominator =
      frequency +
      LOCAL_MEMORY_BM25_K1 *
        (1 - LOCAL_MEMORY_BM25_B + LOCAL_MEMORY_BM25_B * (documentTokenCount / LOCAL_MEMORY_AVG_DOC_LENGTH));
    return sum + (frequency * (LOCAL_MEMORY_BM25_K1 + 1)) / denominator;
  }, 0);
  const coverage = matchedTokenCount / tokens.length;
  const phraseBonus = exactPhrase ? 0.35 : 0;
  const lengthDampening = Math.min(1, Math.sqrt(LOCAL_MEMORY_AVG_DOC_LENGTH / Math.max(1, documentTokenCount)));
  const kwScore = (bm25Sum / tokens.length + coverage * 0.1 + phraseBonus) * lengthDampening;
  const confidence = Math.max(0, Math.min(1, input.confidence ?? 1));
  const sourceWeight = input.source === "session" ? 0.5 : 1;
  return {
    finalScore: kwScore * confidence * sourceWeight,
    matchedTokenCount,
    exactPhrase,
    kwScore,
    documentTokenCount,
  };
}

export interface LocalMemorySearchCandidate {
  id: string;
  source: string;
  content: string;
  category: string;
  confidence: number;
  created_at: string;
  score: LocalMemoryContentScore;
}

export function rankLocalMemorySearchRows<T extends LocalMemorySearchCandidate>(
  rows: T[],
  maxResults: number,
  asOf?: string
): Array<Omit<T, "score"> & {
  final_score: number;
  rrf_score: number;
  kw_score: number;
  cosine_score: null;
  keyword_rank: number;
  vector_rank: null;
}> {
  return rows
    .filter((row) => row.score.kwScore > 0)
    .sort((a, b) => {
      const scoreDiff = b.score.finalScore - a.score.finalScore;
      return scoreDiff !== 0 ? scoreDiff : b.created_at.localeCompare(a.created_at);
    })
    .map((row, index) => {
      const keywordRank = index + 1;
      const rrfScore = reciprocalRankScore(keywordRank, null);
      const confidence = clampUnit(row.confidence);
      const sourceWeight = row.source === "session" || row.source === "conversation" ? 0.5 : 1;
      const finalScore = rrfScore * confidence * sourceWeight * memoryRecencyWeight(row.created_at, asOf);
      const { score: _score, ...rest } = row;
      return {
        ...rest,
        final_score: finalScore,
        rrf_score: rrfScore,
        kw_score: row.score.kwScore,
        cosine_score: null,
        keyword_rank: keywordRank,
        vector_rank: null,
      };
    })
    .sort((a, b) => {
      const scoreDiff = b.final_score - a.final_score;
      return scoreDiff !== 0 ? scoreDiff : b.created_at.localeCompare(a.created_at);
    })
    .slice(0, maxResults);
}

interface TaxonomySeed {
  id: string;
  name: string;
  keywords: string[];
}

export const MEMORY_LIBRARY_TAXONOMY: TaxonomySeed[] = [
  { id: "01", name: "Identity & Profile", keywords: ["identity", "profile", "role", "name", "bio"] },
  { id: "02", name: "Goals & Intent", keywords: ["goal", "objective", "intent", "north", "priority"] },
  { id: "03", name: "Standing Rules & Safety", keywords: ["rule", "safety", "never", "always", "policy"] },
  { id: "04", name: "Preferences & Taste", keywords: ["preference", "preferred", "favorite", "likes", "taste"] },
  { id: "05", name: "People & Relationships", keywords: ["person", "people", "team", "relationship", "contact"] },
  { id: "06", name: "Work & Career", keywords: ["work", "career", "job", "client", "role"] },
  { id: "07", name: "Projects & Products", keywords: ["project", "product", "feature", "roadmap", "launch"] },
  { id: "08", name: "Tasks & Commitments", keywords: ["task", "todo", "commitment", "deadline", "followup"] },
  { id: "09", name: "Decisions & Rationale", keywords: ["decision", "decided", "rationale", "chosen", "direction"] },
  { id: "10", name: "Troubleshooting & Incidents", keywords: ["issue", "bug", "incident", "fix", "problem"] },
  { id: "11", name: "Tools & Integrations", keywords: ["tool", "integration", "connector", "mcp", "api"] },
  { id: "12", name: "Automation & Scheduling", keywords: ["automation", "schedule", "cron", "heartbeat", "timer"] },
  { id: "13", name: "Agents & Workers", keywords: ["agent", "worker", "seat", "orchestrator", "autopilot"] },
  { id: "14", name: "Code & Repositories", keywords: ["code", "repo", "github", "branch", "commit"] },
  { id: "15", name: "Data & Memory", keywords: ["data", "memory", "snapshot", "fact", "session"] },
  { id: "16", name: "Privacy & Security", keywords: ["privacy", "security", "secret", "credential", "auth"] },
  { id: "17", name: "Technology & Engineering", keywords: ["technology", "engineering", "technical", "software", "hardware"] },
  { id: "18", name: "Media & Entertainment", keywords: ["media", "documentary", "documentaries", "movie", "show"] },
  { id: "19", name: "Research & Learning", keywords: ["research", "learning", "study", "report", "analysis"] },
  { id: "20", name: "Finance & Billing", keywords: ["finance", "billing", "invoice", "cost", "payment"] },
  { id: "21", name: "Legal & Compliance", keywords: ["legal", "compliance", "contract", "terms", "privacy"] },
  { id: "22", name: "Health & Wellbeing", keywords: ["health", "wellbeing", "wellness", "rest", "sleep"] },
  { id: "23", name: "Travel & Locations", keywords: ["travel", "location", "timezone", "city", "place"] },
  { id: "24", name: "Home & Devices", keywords: ["home", "device", "pc", "laptop", "phone"] },
  { id: "25", name: "Marketing & Brand", keywords: ["marketing", "brand", "copy", "campaign", "positioning"] },
  { id: "26", name: "Sales & Customers", keywords: ["sales", "customer", "lead", "pipeline", "prospect"] },
  { id: "27", name: "Operations & Process", keywords: ["ops", "process", "workflow", "runbook", "procedure"] },
  { id: "28", name: "Performance & Metrics", keywords: ["performance", "metric", "latency", "throughput", "monitor"] },
  { id: "29", name: "Exports & Portability", keywords: ["export", "portable", "backup", "data island", "download"] },
  { id: "30", name: "Miscellaneous", keywords: ["misc", "general", "note", "other", "uncategorized"] },
];

const TAXONOMY_STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "because",
  "called",
  "from",
  "into",
  "only",
  "should",
  "that",
  "their",
  "there",
  "this",
  "with",
]);

const SENSITIVE_MEMORY_PATTERN =
  /\b(api[_ -]?key|authorization|bearer\s+[a-z0-9._-]+|billing|card number|credit card|password|secret|service[_ -]?role|stripe|token)\b/i;

function taxonomyLabel(seed: TaxonomySeed): string {
  return `${seed.id} ${seed.name}`;
}

function slugPart(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanSnapshotText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function latestIso(values: Array<string | null | undefined>): string | null {
  const sorted = values.filter(Boolean).map(String).sort();
  return sorted.length > 0 ? sorted[sorted.length - 1] : null;
}

function scoreTaxonomySource(source: MemoryTaxonomySnapshotSource): Array<{ seed: TaxonomySeed; score: number }> {
  const text = cleanSnapshotText(source.text).toLowerCase();
  const category = (source.category ?? "").toLowerCase();
  return MEMORY_LIBRARY_TAXONOMY.map((seed) => {
    const keywordScore = seed.keywords.reduce((score, keyword) => {
      return text.includes(keyword.toLowerCase()) ? score + 3 : score;
    }, 0);
    const categoryScore =
      category && seed.keywords.some((keyword) => category.includes(keyword.toLowerCase())) ? 1 : 0;
    return { seed, score: keywordScore + categoryScore };
  }).sort((a, b) => {
    const scoreDiff = b.score - a.score;
    return scoreDiff !== 0 ? scoreDiff : a.seed.id.localeCompare(b.seed.id);
  });
}

export function isSensitiveMemorySnapshotText(text: string): boolean {
  return SENSITIVE_MEMORY_PATTERN.test(text);
}

function taxonomySourceUri(kind: MemoryTaxonomySnapshotSource["kind"]): string {
  return kind === "fact" ? "/admin/memory?tab=facts" : "/admin/memory?tab=sessions";
}

function taxonomySourceReceipt(source: MemoryTaxonomySnapshotSource): MemoryTaxonomySnapshotSourceReceipt {
  const lastVerified = source.updated_at ?? source.valid_from ?? source.created_at ?? null;
  const receipt: MemoryTaxonomySnapshotSourceReceipt = {
    memory_id: `${source.kind}:${source.id}`,
    source_kind: source.kind,
    source_uri: taxonomySourceUri(source.kind),
    redaction_state: "clean",
  };
  if (source.confidence !== undefined) receipt.confidence = source.confidence;
  if (lastVerified) receipt.last_verified_at = lastVerified;
  return receipt;
}

export function buildMemoryTaxonomySnapshots(
  sources: MemoryTaxonomySnapshotSource[],
  options: { maxSnapshots?: number; maxSourcesPerSnapshot?: number } = {}
): MemoryTaxonomySnapshot[] {
  const maxSnapshots = options.maxSnapshots ?? 12;
  const maxSourcesPerSnapshot = options.maxSourcesPerSnapshot ?? 8;
  const deduped = new Map<string, MemoryTaxonomySnapshotSource & { cleanText: string }>();

  for (const source of sources) {
    const cleanText = cleanSnapshotText(source.text);
    if (!source.id || !cleanText || isSensitiveMemorySnapshotText(cleanText)) continue;
    const key = cleanText.toLowerCase();
    const existing = deduped.get(key);
    if (!existing || (source.confidence ?? 1) > (existing.confidence ?? 1)) {
      deduped.set(key, { ...source, cleanText });
    }
  }

  const groups = new Map<
    string,
    {
      seed: TaxonomySeed;
      secondary: Map<string, number>;
      sources: Array<MemoryTaxonomySnapshotSource & { cleanText: string }>;
    }
  >();

  for (const source of deduped.values()) {
    const ranked = scoreTaxonomySource(source);
    const primary = ranked.find((entry) => entry.score > 0)?.seed ?? MEMORY_LIBRARY_TAXONOMY[29];
    const label = taxonomyLabel(primary);
    const group = groups.get(label) ?? { seed: primary, secondary: new Map<string, number>(), sources: [] };
    for (const entry of ranked.slice(0, 5)) {
      if (entry.score <= 0 || entry.seed.id === primary.id) continue;
      const secondaryLabel = taxonomyLabel(entry.seed);
      group.secondary.set(secondaryLabel, Math.max(group.secondary.get(secondaryLabel) ?? 0, entry.score));
    }
    group.sources.push(source);
    groups.set(label, group);
  }

  return Array.from(groups.values())
    .map((group) => {
      const sourcesForSnapshot = group.sources
        .sort((a, b) => {
          const confidenceDiff = (b.confidence ?? 1) - (a.confidence ?? 1);
          if (confidenceDiff !== 0) return confidenceDiff;
          return (b.updated_at ?? b.created_at ?? "").localeCompare(a.updated_at ?? a.created_at ?? "");
        })
        .slice(0, maxSourcesPerSnapshot);
      const sourceIds = sourcesForSnapshot.map((source) => source.id);
      const avgConfidence =
        sourcesForSnapshot.reduce((sum, source) => sum + Math.max(0, Math.min(1, source.confidence ?? 1)), 0) /
        Math.max(1, sourcesForSnapshot.length);
      const secondaryCategories = Array.from(group.secondary.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([label]) => label)
        .slice(0, 4);
      const subTags = Array.from(
        new Set(
          sourcesForSnapshot
            .flatMap((source) => source.cleanText.toLowerCase().match(/[a-z0-9][a-z0-9_-]{3,}/g) ?? [])
            .filter((token) => !TAXONOMY_STOP_WORDS.has(token))
        )
      ).slice(0, 8);
      const bullets = sourcesForSnapshot.map((source) => `- ${source.cleanText}`);
      const primaryLabel = taxonomyLabel(group.seed);
      const summary = bullets.slice(0, 5).join("\n");
      const content = [
        `# ${group.seed.name} Snapshot`,
        "",
        summary,
        "",
        `Primary category: ${primaryLabel}`,
        secondaryCategories.length > 0 ? `Secondary categories: ${secondaryCategories.join(", ")}` : null,
        subTags.length > 0 ? `Tags: ${subTags.join(", ")}` : null,
        `Sources: ${sourcesForSnapshot.map((source) => `${source.kind}:${source.id}`).join(", ")}`,
      ].filter(Boolean).join("\n");
      return {
        slug: `memory-taxonomy-${group.seed.id}-${slugPart(group.seed.name)}`,
        title: `${group.seed.name} memory snapshot`,
        primary_category: primaryLabel,
        secondary_categories: secondaryCategories,
        sub_tags: subTags,
        summary,
        content,
        source_ids: sourceIds,
        sources: sourcesForSnapshot.map((source) => ({ id: source.id, kind: source.kind })),
        source_receipts: sourcesForSnapshot.map(taxonomySourceReceipt),
        confidence: Number(avgConfidence.toFixed(3)),
        weight: Number(Math.min(1, avgConfidence * 0.7 + sourcesForSnapshot.length * 0.06).toFixed(3)),
        last_confirmed_at: latestIso(
          sourcesForSnapshot.map((source) => source.updated_at ?? source.valid_from ?? source.created_at)
        ),
      };
    })
    .sort((a, b) => {
      const weightDiff = b.weight - a.weight;
      return weightDiff !== 0 ? weightDiff : a.primary_category.localeCompare(b.primary_category);
    })
    .slice(0, maxSnapshots);
}

export function memoryTaxonomySnapshotToLibraryDoc(snapshot: MemoryTaxonomySnapshot): LibraryDocInput {
  const categoryTag = slugPart(snapshot.primary_category);
  return {
    slug: snapshot.slug,
    title: snapshot.title,
    category: "memory_snapshot",
    content: [
      snapshot.content,
      "",
      "Snapshot metadata:",
      `- Primary: ${snapshot.primary_category}`,
      snapshot.secondary_categories.length > 0
        ? `- Secondary: ${snapshot.secondary_categories.join(", ")}`
        : "- Secondary: none",
      `- Source pointers: ${snapshot.sources.map((source) => `${source.kind}:${source.id}`).join(", ")}`,
      `- Source receipt states: ${snapshot.source_receipts
        .map((receipt) => `${receipt.memory_id} ${receipt.redaction_state}`)
        .join(", ")}`,
      snapshot.last_confirmed_at ? `- Last confirmed: ${snapshot.last_confirmed_at}` : "- Last confirmed: unknown",
    ].join("\n"),
    tags: [
      "memory-taxonomy-snapshot",
      "source-linked",
      categoryTag,
      ...snapshot.secondary_categories.map(slugPart),
      ...snapshot.sub_tags,
    ].filter(Boolean).slice(0, 20),
  };
}

export async function writeMemoryTaxonomySnapshotsToLibrary({
  sources,
  options = {},
  upsertLibraryDoc,
  generatedAt = new Date().toISOString(),
}: {
  sources: MemoryTaxonomySnapshotSource[];
  options?: MemoryTaxonomySnapshotWriteOptions;
  upsertLibraryDoc: (data: LibraryDocInput) => Promise<string>;
  generatedAt?: string;
}): Promise<MemoryTaxonomySnapshotWriteResult> {
  const snapshots = buildMemoryTaxonomySnapshots(sources, {
    maxSnapshots: options.max_snapshots,
    maxSourcesPerSnapshot: options.max_sources_per_snapshot,
  });
  const snapshotSummary = snapshots.map((snapshot) => ({
    slug: snapshot.slug,
    title: snapshot.title,
    primary_category: snapshot.primary_category,
    source_ids: snapshot.source_ids,
    source_receipts: snapshot.source_receipts,
  }));

  if (options.dry_run) {
    return {
      dry_run: true,
      generated_at: generatedAt,
      source_count: sources.length,
      snapshot_count: snapshots.length,
      written_count: 0,
      snapshots: snapshotSummary,
      written: [],
    };
  }

  const written: MemoryTaxonomySnapshotWriteResult["written"] = [];
  for (const snapshot of snapshots) {
    const doc = memoryTaxonomySnapshotToLibraryDoc(snapshot);
    const message = await upsertLibraryDoc(doc);
    written.push({ slug: doc.slug, title: doc.title, message });
  }

  return {
    dry_run: false,
    generated_at: generatedAt,
    source_count: sources.length,
    snapshot_count: snapshots.length,
    written_count: written.length,
    snapshots: snapshotSummary,
    written,
  };
}

const BYOD_TABLES: TableNames = {
  business_context: "business_context",
  knowledge_library: "knowledge_library",
  knowledge_library_history: "knowledge_library_history",
  session_summaries: "session_summaries",
  extracted_facts: "extracted_facts",
  session_events: "session_events",
  conversation_log: "conversation_log",
  memory_typed_links: "memory_typed_links",
  code_dumps: "code_dumps",
};

const MANAGED_TABLES: TableNames = {
  business_context: "mc_business_context",
  knowledge_library: "mc_knowledge_library",
  knowledge_library_history: "mc_knowledge_library_history",
  session_summaries: "mc_session_summaries",
  extracted_facts: "mc_extracted_facts",
  session_events: "mc_session_events",
  conversation_log: "mc_conversation_log",
  memory_typed_links: "mc_memory_typed_links",
  code_dumps: "mc_code_dumps",
};

function now(): string {
  return new Date().toISOString();
}

function parsedTime(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function isMemoryFactVisibleAt(
  row: {
    invalidated_at?: string | null;
    valid_from?: string | null;
    valid_to?: string | null;
    created_at?: string | null;
  },
  asOf: string
): boolean {
  const point = parsedTime(asOf) ?? Date.now();
  const validFrom = parsedTime(row.valid_from ?? row.created_at ?? undefined);
  if (validFrom !== null && validFrom > point) return false;

  const validTo = parsedTime(row.valid_to);
  if (validTo !== null && validTo <= point) return false;

  const invalidatedAt = parsedTime(row.invalidated_at);
  return invalidatedAt === null || invalidatedAt > point;
}

function hasOperationalMemorySignal(...values: Array<string | null | undefined>): boolean {
  const text = values.filter(Boolean).join(" ").toLowerCase();
  if (!text) return false;
  if (text.includes("heartbeat")) return true;
  if (text.includes("self-report") || text.includes("self report")) return true;
  if (text.includes("testpass_cron_user_id")) return true;
  if (text.includes("cron") && text.includes("resolved")) return true;
  if (text.includes("signal") && text.includes("blocked")) return true;
  return /\b(self[_ -]?report|cron|system|heartbeat)\b/.test(text);
}

function isMemoryFactOperational(row: {
  category?: string | null;
  fact?: string | null;
  source_type?: string | null;
  startup_fact_kind?: string | null;
  memory_class?: string | null;
}): boolean {
  if (isTypedMemorySplitEnabled() && !isFactSearchableMemoryClass(row.memory_class)) return true;
  const kind = row.startup_fact_kind ?? "legacy_unspecified";
  if (kind === "operational" || kind === "excluded") return true;
  return hasOperationalMemorySignal(row.source_type, row.category, row.fact);
}

function truncate(s: string, max = 8000): string {
  return s.length > max ? s.slice(0, max) + "\n...[truncated]" : s;
}

function isTypedLinkSchemaUnavailable(err: unknown): boolean {
  const e = (err ?? {}) as { code?: string; message?: string };
  return (
    e.code === "42P01" ||
    e.code === "42703" ||
    /memory_typed_links|column .* does not exist/i.test(e.message ?? "")
  );
}

// ─── Free-tier caps ──────────────────────────────────────────────────────
// Starting values from the v2 build plan. Adjust with real data later.
// Pro tier removes all caps. Caps only apply in managed cloud mode (BYOD
// users own their database, so they manage their own quota).
export const FREE_TIER_CAPS = {
  storage_bytes: 50 * 1024 * 1024, // 50 MB
  facts: 5000,
} as const;

/**
 * Thrown when a free-tier user tries to write past their cap. The MCP
 * handlers surface the message verbatim back to the agent so the user
 * sees an actionable upgrade path.
 */
export class CapExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CapExceededError";
  }
}

export class SupabaseBackend implements MemoryBackend {
  private client: SupabaseClient;
  private tenancy: Tenancy;
  private tables: TableNames;

  constructor(config: SupabaseBackendConfig) {
    if (!config.url || !config.serviceRoleKey) {
      throw new Error("SupabaseBackend requires url and serviceRoleKey");
    }
    this.client = createClient(config.url, config.serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    this.tenancy = config.tenancy;
    this.tables = config.tenancy.mode === "managed" ? MANAGED_TABLES : BYOD_TABLES;
    console.error(
      `UnClick Memory: Supabase ${
        config.tenancy.mode === "managed" ? "managed cloud" : "BYOD"
      } mode`
    );
  }

  // ─── Tenancy helpers ─────────────────────────────────────────────────────

  /** Adds api_key_hash to a row in managed mode; passes through in BYOD. */
  private withTenancy<T extends Record<string, unknown>>(row: T): T {
    if (this.tenancy.mode === "managed") {
      return { ...row, api_key_hash: this.tenancy.apiKeyHash };
    }
    return row;
  }

  /**
   * Enforce free-tier caps on writes. Only runs in managed cloud mode.
   * BYOD users own their database, so caps don't apply. Pro tier (or any
   * non-free tier) skips the check.
   *
   * `kind` selects which cap to check first. Storage is always verified;
   * `kind: "fact"` additionally verifies the fact-count cap because
   * extracted_facts has a separate row count limit.
   */
  private async enforceCaps(kind: "fact" | "general"): Promise<void> {
    if (this.tenancy.mode !== "managed") return;

    const shouldEnforceCaps = shouldEnforceManagedMemoryCaps({
      tenancyMode: this.tenancy.mode,
      tier: process.env.UNCLICK_TIER,
      accountEmail: process.env.UNCLICK_ACCOUNT_EMAIL,
      quotaExempt: process.env.UNCLICK_MEMORY_QUOTA_EXEMPT === "true",
    });
    if (!shouldEnforceCaps) return;

    if (kind === "fact") {
      const { data, error } = await this.client.rpc("mc_get_fact_count", {
        p_api_key_hash: this.tenancy.apiKeyHash,
      });
      if (error) {
        // Fail open on counter errors so a transient DB hiccup doesn't
        // break legitimate writes. Log to stderr for observability.
        console.error("[memory] mc_get_fact_count failed:", error.message);
      } else if (typeof data === "number" && data >= FREE_TIER_CAPS.facts) {
        throw new CapExceededError(
          `Free tier limit reached: ${FREE_TIER_CAPS.facts.toLocaleString()} active ` +
            `facts. Upgrade to Pro for unlimited facts, or prune old facts ` +
            `via the Memory surface. Current count: ${data}.`
        );
      }
    }

    const { data: bytes, error: bytesErr } = await this.client.rpc(
      "mc_get_storage_bytes",
      { p_api_key_hash: this.tenancy.apiKeyHash }
    );
    if (bytesErr) {
      console.error("[memory] mc_get_storage_bytes failed:", bytesErr.message);
      return;
    }
    if (typeof bytes === "number" && bytes >= FREE_TIER_CAPS.storage_bytes) {
      const usedMb = (bytes / (1024 * 1024)).toFixed(1);
      throw new CapExceededError(
        `Free tier limit reached: ${usedMb} MB used of ` +
          `${FREE_TIER_CAPS.storage_bytes / (1024 * 1024)} MB. ` +
          `Upgrade to Pro for unlimited storage, or prune memory via ` +
          `the Memory surface.`
      );
    }
  }

  /** Calls an RPC, choosing the BYOD or managed name based on tenancy. */
  private async rpc<T = unknown>(
    byodName: string,
    byodParams: Record<string, unknown>,
    managedName: string,
    managedParams: Record<string, unknown>
  ): Promise<T> {
    const fn = this.tenancy.mode === "managed" ? managedName : byodName;
    const params =
      this.tenancy.mode === "managed"
        ? { p_api_key_hash: this.tenancy.apiKeyHash, ...managedParams }
        : byodParams;
    const { data, error } = await this.client.rpc(fn, params);
    if (error) throw new Error(`rpc(${fn}) failed: ${error.message}`);
    return data as T;
  }

  // ─── Memory operations ───────────────────────────────────────────────────

  async getStartupContext(numSessions: number): Promise<unknown> {
    const data = await this.rpc<Record<string, unknown>>(
      "get_startup_context",
      { num_sessions: numSessions },
      "mc_get_startup_context",
      { p_num_sessions: numSessions }
    );
    // --- lane-04: scope the startup active_facts (parity with local.ts). The
    // startup RPC does not expose the scope columns, so subtract the reader-
    // denied restrictive facts here. Over-removal is the safe direction. ---
    if (scopesEnabled() && Array.isArray(data.active_facts)) {
      data.active_facts = await this.filterStartupActiveFactsByScope(
        data.active_facts as Array<{ fact?: unknown }>
      );
    }
    // --- end lane-04 ---
    return {
      agent_instructions: [
        "You are connected to UnClick Memory - a persistent memory system that works across all sessions and devices.",
        "ALWAYS use this memory as your primary knowledge source. It has the user's rules, preferences, projects, and history.",
        "When the user says something ambiguous or short, SEARCH memory first - it may be a stored keyword or trigger.",
        "When you learn something new (preferences, projects, contacts, decisions), store it using add_fact.",
        "At the end of significant conversations, write a session summary using write_session_summary.",
        "Business context entries (loaded below) are standing rules. Follow them as if the user said them right now.",
        "Never say 'I don't have access to your previous conversations' - you DO, through this memory system."
      ].join("\n"),
      ...data,
    };
  }

  async searchMemory(query: string, maxResults: number, asOf?: string): Promise<unknown> {
    const localResults = await this.keywordFallback(query, maxResults, asOf);

    // --- lane-01 increment 2: fuse keyword + semantic instead of letting the
    // keyword lane short-circuit and shadow the vector lane (Gap 1). The
    // semantic lane is the BM25 + pgvector RRF RPC (Worker 6's ranking
    // contract). Flag-gated; flag off keeps today's keyword-first behaviour. ---
    if (isFusedRetrievalEnabled()) {
      const semanticResults = await this.semanticSearch(query, maxResults, asOf);
      const fused =
        semanticResults.length > 0
          ? fuseRankedSearchLanes(
              localResults as MemorySearchResultRow[],
              semanticResults as MemorySearchResultRow[],
              maxResults
            )
          : (localResults as MemorySearchResultRow[]);
      // lane-01 increment 3: scope-precedence effective-score load order.
      return orderByEffectiveScore(fused, maxResults, asOf);
    }
    // --- end lane-01 ---

    if (localResults.length > 0) return localResults;
    return this.semanticSearch(query, maxResults, asOf);
  }

  // --- lane-01: semantic (BM25 + pgvector RRF) lane, factored out of
  // searchMemory so both the fused path and the legacy keyword-first path share
  // it. Returns [] when embeddings are disabled or the lane errors. ---
  private async semanticSearch(query: string, maxResults: number, asOf?: string): Promise<unknown[]> {
    try {
      const { embedText } = await import("./embeddings.js");
      const embedding = await embedText(query);
      if (!embedding) return [];
      const results = await this.rpc<unknown>(
        "search_memory_hybrid",
        { search_query: query, query_embedding: embedding, max_results: maxResults, as_of: asOf ?? null },
        "mc_search_memory_hybrid",
        { p_search_query: query, p_query_embedding: embedding, p_max_results: maxResults, p_as_of: asOf ?? null }
      );
      if (Array.isArray(results) && results.length > 0) {
        return await this.filterRecallVisibleSearchResults(results, asOf ?? now());
      }
    } catch (err) {
      console.error("[search_memory] optional hybrid search failed:", err);
    }
    return [];
  }
  // --- end lane-01 ---

  /**
   * ILIKE-based keyword fallback over mc_extracted_facts +
   * mc_session_summaries. Used when hybrid retrieval returns []. Returns
   * rows shaped to mirror mc_search_memory_hybrid so callers don't branch.
   * Never widens RLS: tenant scoping via api_key_hash is preserved.
   *
   * Phrase support: the query is tokenized on whitespace. Tokens shorter
   * than 2 chars or containing PostgREST .or() metacharacters are dropped.
   * We try AND-of-tokens first (every token must appear, in any order); if
   * that returns nothing we degrade to OR-of-tokens and rank rows by how
   * many tokens they contain so partial matches at least surface something.
   */
  private async keywordFallback(query: string, maxResults: number, asOf?: string): Promise<unknown[]> {
    const tokens = tokenizeLocalMemoryQuery(query);
    if (tokens.length === 0) return [];
    const patterns = tokens.map((t) => `%${t.replace(/[\\%_]/g, (c) => `\\${c}`)}%`);
    const effectiveAsOf = asOf ?? now();

    // --- lane-01: business_context as a search source (Gap 2); flag-gated ---
    const bcResults: MemorySearchResultRow[] = isFusedRetrievalEnabled()
      ? await this.searchBusinessContextRows(query)
      : [];
    // --- end lane-01 ---

    // --- lane-04: scope-aware recall. Only selects scope columns and filters
    // when MEMORY_SCOPES_ENABLED is on, so flag-off is unchanged and has no
    // schema dependency on the new columns. ---
    const scopesOn = scopesEnabled();
    const scopeCtx = resolveScopeContext();
    const factSelect =
      (scopesOn
        ? "id, fact, category, confidence, created_at, source_type, startup_fact_kind, valid_from, valid_to, invalidated_at, visibility, source_agent_id, boardroom_id, credential_scope, quarantined_at"
        : "id, fact, category, confidence, created_at, source_type, startup_fact_kind, valid_from, valid_to, invalidated_at") +
      (isTypedMemorySplitEnabled() ? ", memory_class" : "");
    // --- end lane-04 ---

    const runScan = async (mode: "and" | "or"): Promise<unknown[]> => {
      let factQ = this.client
        .from(this.tables.extracted_facts)
        .select(factSelect)
        .eq("status", "active")
        .is("invalidated_at", null);
      let sessQ = this.client
        .from(this.tables.session_summaries)
        .select("id, summary, created_at")
        .eq("status", "active");

      factQ = factQ
        .lte("valid_from", effectiveAsOf)
        .or(`valid_to.is.null,valid_to.gt.${effectiveAsOf}`);
      sessQ = sessQ.lte("created_at", effectiveAsOf);

      if (mode === "and") {
        for (const p of patterns) {
          factQ = factQ.ilike("fact", p);
          sessQ = sessQ.ilike("summary", p);
        }
      } else {
        factQ = factQ.or(patterns.map((p) => `fact.ilike.${p}`).join(","));
        sessQ = sessQ.or(patterns.map((p) => `summary.ilike.${p}`).join(","));
      }
      if (this.tenancy.mode === "managed") {
        factQ = factQ.eq("api_key_hash", this.tenancy.apiKeyHash);
        sessQ = sessQ.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      factQ = factQ
        .order("confidence", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(Math.max(maxResults * 3, maxResults));
      sessQ = sessQ.order("created_at", { ascending: false }).limit(maxResults);

      const [factsRes, sessRes] = await Promise.all([factQ, sessQ]);
      type FactRow = {
        id: string;
        fact: string;
        category: string;
        confidence: number;
        created_at: string;
        source_type?: string | null;
        startup_fact_kind?: string | null;
        memory_class?: string | null;
        valid_from?: string | null;
        valid_to?: string | null;
        invalidated_at?: string | null;
        visibility?: string | null;
        source_agent_id?: string | null;
        boardroom_id?: string | null;
        credential_scope?: string | null;
        quarantined_at?: string | null;
      };
      type SessRow = { id: string; summary: string; created_at: string };
      const facts = ((factsRes.data ?? []) as unknown as FactRow[]).filter((r) =>
        !isMemoryFactOperational(r) && isMemoryFactVisibleAt(r, effectiveAsOf) &&
        (!scopesOn || isFactInScope(r, scopeCtx))
      ).map((r) => {
        const s = scoreLocalMemoryContent({
          query,
          tokens,
          text: r.fact,
          confidence: r.confidence,
          source: "fact",
        });
        return {
          id: r.id,
          source: "fact",
          content: r.fact,
          category: r.category,
          confidence: r.confidence,
          created_at: r.created_at,
          score: s,
        };
      });
      const sessions = ((sessRes.data ?? []) as SessRow[]).map((r) => {
        const s = scoreLocalMemoryContent({
          query,
          tokens,
          text: r.summary,
          confidence: 1,
          source: "session",
        });
        return {
          id: r.id,
          source: "session",
          content: r.summary,
          category: "session",
          confidence: 1,
          created_at: r.created_at,
          score: s,
        };
      });
      // --- lane-01: fused keyword pool adds business_context; flag off keeps lane-06 ranking ---
      if (isFusedRetrievalEnabled()) {
        const ranked = rankLocalMemorySearchRows(
          [...facts, ...sessions],
          Math.max(maxResults * 4, maxResults + bcResults.length),
          effectiveAsOf
        );
        return [...ranked, ...bcResults]
          .sort((a, b) => {
            const d = (b.final_score ?? 0) - (a.final_score ?? 0);
            return d !== 0 ? d : (b.created_at ?? "").localeCompare(a.created_at ?? "");
          })
          .slice(0, maxResults);
      }
      // --- end lane-01 ---
      return rankLocalMemorySearchRows([...facts, ...sessions], maxResults, effectiveAsOf);
    };

    const andResults = await runScan("and");
    if (andResults.length > 0 || tokens.length < 2) return andResults;
    return runScan("or");
  }

  // --- lane-01: business_context retrieval (Gap 2) ---
  /**
   * Fetch tenant-scoped business_context rows and score them against the query
   * with the shared keyword scorer (via retrieval-fusion). Standing rules are
   * pinned by a scope weight so identity surfaces. Tenant scoping mirrors
   * getBusinessContext exactly, so this never widens RLS. Degrades to [] on a
   * backend error rather than failing the whole search.
   */
  private async searchBusinessContextRows(query: string): Promise<MemorySearchResultRow[]> {
    let bcQuery = this.client
      .from(this.tables.business_context)
      .select("id, category, key, value");
    if (this.tenancy.mode === "managed") {
      bcQuery = bcQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await bcQuery;
    if (error) {
      console.error("[search_memory] business_context scan failed:", error);
      return [];
    }
    type BcRow = { id: string; category: string; key: string; value: unknown };
    const rows = ((data ?? []) as BcRow[]).map((r) => ({
      id: r.id,
      category: r.category,
      key: r.key,
      value: r.value,
    }));
    return scoreBusinessContextRows(query, rows);
  }
  // --- end lane-01 ---

  private async filterRecallVisibleSearchResults(results: unknown[], asOf: string): Promise<unknown[]> {
    type SearchResult = {
      id?: unknown;
      source?: unknown;
      content?: unknown;
      category?: unknown;
    };

    const rows = results as SearchResult[];
    const factIds = rows
      .filter((row) => row.source === "fact" && typeof row.id === "string")
      .map((row) => row.id as string);
    const sessionIds = rows
      .filter((row) => row.source === "session" && typeof row.id === "string")
      .map((row) => row.id as string);
    if (factIds.length === 0 && sessionIds.length === 0) return results;

    // --- lane-04: scope-aware recall (only selects scope columns when on) ---
    const scopesOn = scopesEnabled();
    const scopeCtx = resolveScopeContext();
    const recallSelect =
      (scopesOn
        ? "id, fact, category, source_type, startup_fact_kind, valid_from, valid_to, invalidated_at, created_at, visibility, source_agent_id, boardroom_id, credential_scope, quarantined_at"
        : "id, fact, category, source_type, startup_fact_kind, valid_from, valid_to, invalidated_at, created_at") +
      (isTypedMemorySplitEnabled() ? ", memory_class" : "");
    // --- end lane-04 ---

    let visibleFactIds: Set<string> | null = null;
    if (factIds.length > 0) {
      let query = this.client
        .from(this.tables.extracted_facts)
        .select(recallSelect)
        .in("id", factIds);
      if (this.tenancy.mode === "managed") {
        query = query.eq("api_key_hash", this.tenancy.apiKeyHash);
      }

      const { data, error } = await query;
      if (error) {
        console.error("[search_memory] recall-visibility filter failed:", error.message);
        visibleFactIds = new Set(
          rows
            .filter((row) => {
              if (row.source !== "fact" || typeof row.id !== "string") return false;
              if (scopesOn) return false;
              return !isMemoryFactOperational({
                category: typeof row.category === "string" ? row.category : undefined,
                fact: typeof row.content === "string" ? row.content : undefined,
              });
            })
            .map((row) => row.id as string)
        );
      } else {
        visibleFactIds = new Set(
          ((data ?? []) as unknown as Array<{
            id: string;
            fact?: string | null;
            category?: string | null;
            source_type?: string | null;
            startup_fact_kind?: string | null;
            memory_class?: string | null;
            valid_from?: string | null;
            valid_to?: string | null;
            invalidated_at?: string | null;
            created_at?: string | null;
            visibility?: string | null;
            source_agent_id?: string | null;
            boardroom_id?: string | null;
            credential_scope?: string | null;
            quarantined_at?: string | null;
          }>)
            .filter((row) => isMemoryFactVisibleAt(row, asOf) && !isMemoryFactOperational(row) &&
              (!scopesOn || isFactInScope(row, scopeCtx)))
            .map((row) => row.id)
        );
      }
    }

    let visibleSessionIds: Set<string> | null = null;
    if (sessionIds.length > 0) {
      let sessionQuery = this.client
        .from(this.tables.session_summaries)
        .select("id, status, created_at")
        .in("id", sessionIds)
        .lte("created_at", asOf);
      if (this.tenancy.mode === "managed") {
        sessionQuery = sessionQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      const { data, error } = await sessionQuery;
      if (error) {
        console.error("[search_memory] session recall-visibility filter failed:", error.message);
        visibleSessionIds = new Set();
      } else {
        visibleSessionIds = new Set(
          ((data ?? []) as unknown as Array<{ id: string; status?: string | null }>)
            .filter((row) => (row.status ?? "active") === "active")
            .map((row) => row.id)
        );
      }
    }

    return rows.filter((row) => {
      if (row.source === "fact") return typeof row.id === "string" && Boolean(visibleFactIds?.has(row.id));
      if (row.source === "session") return typeof row.id === "string" && Boolean(visibleSessionIds?.has(row.id));
      return true;
    });
  }

  async searchFacts(query: string): Promise<unknown> {
    if (isTypedMemorySplitEnabled()) {
      const tokens = tokenizeLocalMemoryQuery(query);
      if (tokens.length === 0) return [];
      let factQ = this.client
        .from(this.tables.extracted_facts)
        .select("id, fact, category, confidence, status, created_at, source_type, startup_fact_kind, memory_class, valid_from, valid_to, invalidated_at")
        .eq("status", "active")
        .is("invalidated_at", null);
      if (this.tenancy.mode === "managed") {
        factQ = factQ.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      for (const token of tokens) {
        factQ = factQ.ilike("fact", `%${token.replace(/[\\%_]/g, (c) => `\\${c}`)}%`);
      }
      const { data, error } = await factQ
        .order("confidence", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw pgError("searchFacts typed split select", error);
      return ((data ?? []) as Array<{
        id: string;
        fact: string;
        category: string;
        confidence: number;
        status: string;
        created_at: string;
        source_type?: string | null;
        startup_fact_kind?: string | null;
        memory_class?: string | null;
        valid_from?: string | null;
        valid_to?: string | null;
        invalidated_at?: string | null;
      }>)
        .filter((row) => isMemoryFactVisibleAt(row, now()) && !isMemoryFactOperational(row))
        .slice(0, 20)
        .map((row) => ({
          id: row.id,
          fact: row.fact,
          category: row.category,
          confidence: row.confidence,
          status: row.status,
          created_at: row.created_at,
          memory_class: row.memory_class ?? "semantic",
        }));
    }

    const result = await this.rpc<unknown>(
      "search_facts",
      { search_query: query },
      "mc_search_facts",
      { p_search_query: query }
    );
    // --- lane-04: scope-filter fact-search results when enabled ---
    if (!scopesEnabled() || !Array.isArray(result)) return result;
    const ids = (result as Array<{ id?: unknown }>)
      .filter((r) => typeof r.id === "string")
      .map((r) => r.id as string);
    const allowed = await this.filterFactIdsByScope(ids, resolveScopeContext());
    return (result as Array<{ id?: unknown }>).filter(
      (r) => typeof r.id === "string" && allowed.has(r.id as string)
    );
    // --- end lane-04 ---
  }

  // --- lane-04: re-fetch scope columns for a set of fact ids and return the
  // ids the reader may see. Fails closed (drops unverified facts) on error so
  // a transient failure never leaks a private or quarantined fact. ---
  private async filterFactIdsByScope(
    factIds: string[],
    ctx: MemoryScopeContext
  ): Promise<Set<string>> {
    if (factIds.length === 0) return new Set();
    let q = this.client
      .from(this.tables.extracted_facts)
      .select("id, visibility, source_agent_id, boardroom_id, credential_scope, quarantined_at")
      .in("id", factIds);
    if (this.tenancy.mode === "managed") {
      q = q.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await q;
    if (error) {
      console.error("[search_facts] scope filter failed:", error.message);
      return new Set();
    }
    const allowed = new Set<string>();
    for (const row of (data ?? []) as Array<MemoryFactScopeFields & { id: string }>) {
      if (isFactInScope(row, ctx)) allowed.add(row.id);
    }
    return allowed;
  }

  // --- lane-04: quarantine memory bound to a revoked credential scope ---
  async quarantineCredentialMemory(credentialScope: string): Promise<{ quarantined: number }> {
    if (!scopesEnabled()) return { quarantined: 0 };
    const scope = credentialScope.trim();
    if (!scope) return { quarantined: 0 };
    let q = this.client
      .from(this.tables.extracted_facts)
      .update({ quarantined_at: now() })
      .eq("credential_scope", scope)
      .is("quarantined_at", null);
    if (this.tenancy.mode === "managed") {
      q = q.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await q.select("id");
    if (error) throw pgError("quarantineCredentialMemory", error);
    return { quarantined: Array.isArray(data) ? data.length : 0 };
  }

  // Subtract reader-denied restrictive facts from the startup active_facts
  // payload. The startup RPC returns facts without ids or scope columns, so we
  // match on fact text; a text collision can only over-remove, never leak.
  private async filterStartupActiveFactsByScope(
    activeFacts: Array<{ fact?: unknown }>
  ): Promise<Array<{ fact?: unknown }>> {
    const ctx = resolveScopeContext();
    let q = this.client
      .from(this.tables.extracted_facts)
      .select("fact, visibility, source_agent_id, boardroom_id, credential_scope, quarantined_at")
      .or("visibility.in.(private,shared),credential_scope.not.is.null,quarantined_at.not.is.null");
    if (this.tenancy.mode === "managed") {
      q = q.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await q;
    if (error) {
      // Fail closed (consistent with the recall paths): prefer an empty
      // active_facts over risking a private or quarantined fact leaking into
      // another agent's startup on a transient error. business_context, recent
      // sessions, and the library still load, and search_memory stays available.
      console.error("[get_startup_context] scope filter failed:", error.message);
      return [];
    }
    const deniedTexts = new Set<string>();
    for (const row of (data ?? []) as Array<MemoryFactScopeFields & { fact?: string | null }>) {
      if (typeof row.fact === "string" && !isFactInScope(row, ctx)) {
        deniedTexts.add(row.fact);
      }
    }
    if (deniedTexts.size === 0) return activeFacts;
    return activeFacts.filter((f) => !(typeof f.fact === "string" && deniedTexts.has(f.fact)));
  }
  // --- end lane-04 ---

  async searchLibrary(query: string): Promise<unknown> {
    return this.rpc(
      "search_library",
      { search_query: query },
      "mc_search_library",
      { p_search_query: query }
    );
  }

  async getLibraryDoc(slug: string): Promise<unknown> {
    return this.rpc(
      "get_library_doc",
      { doc_slug: slug },
      "mc_get_library_doc",
      { p_doc_slug: slug }
    );
  }

  async listLibrary(): Promise<unknown> {
    return this.rpc("list_library", {}, "mc_list_library", {});
  }

  async writeSessionSummary(data: SessionSummaryInput): Promise<{ id: string }> {
    await this.enforceCaps("general");
    const { data: row, error } = await this.client
      .from(this.tables.session_summaries)
      .insert(
        this.withTenancy({
          session_id: data.session_id,
          summary: data.summary,
          topics: data.topics,
          open_loops: data.open_loops,
          decisions: data.decisions,
          platform: data.platform,
          duration_minutes: data.duration_minutes,
        })
      )
      .select()
      .single();
    if (error) throw pgError("writeSessionSummary insert", error);
    // Embed the summary so it joins the vector lane immediately (same
    // motivation as addFact above). Fire-and-forget.
    this.embedAndStore(this.tables.session_summaries, row.id, data.summary).catch(() => {});
    return { id: row.id };
  }

  // --- lane-07: write-gate admission ---
  async admitWrite(data: FactInput): Promise<AdmissionDecision> {
    const table = this.tables.extracted_facts;
    const selectColumns = "id, fact, category, confidence, created_at, content_hash";
    const candidateHash = memoryWriteGateContentHash(data.fact);
    const candidates = new Map<string, MemoryWriteGateCandidate>();
    const searchRows = await this.searchMemory(data.fact, 25);
    const rankedRows = Array.isArray(searchRows) ? searchRows : [];
    for (const row of rankedRows) {
      const candidate = writeGateCandidateFromRankedSearchRow(row);
      if (candidate) candidates.set(candidate.id, candidate);
    }
    const addRows = (rows: unknown[] | null | undefined): void => {
      for (const row of rows ?? []) {
        const r = row as {
          id?: unknown;
          fact?: unknown;
          category?: unknown;
          confidence?: unknown;
          created_at?: unknown;
          content_hash?: unknown;
        };
        if (typeof r.id !== "string" || typeof r.fact !== "string") continue;
        const directCandidate: MemoryWriteGateCandidate = {
          id: r.id,
          fact: r.fact,
          category: typeof r.category === "string" ? r.category : "general",
          confidence: typeof r.confidence === "number" ? r.confidence : null,
          content_hash: typeof r.content_hash === "string" ? r.content_hash : null,
          created_at: typeof r.created_at === "string" ? r.created_at : null,
        };
        candidates.set(r.id, { ...directCandidate, ...candidates.get(r.id) });
      }
    };

    let exactQuery = this.client
      .from(table)
      .select(selectColumns)
      .eq("content_hash", candidateHash)
      .eq("status", "active")
      .is("invalidated_at", null)
      .limit(1);
    if (this.tenancy.mode === "managed") {
      exactQuery = exactQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const exact = await exactQuery;
    if (exact.error) throw pgError("writeGate exact scan", exact.error);
    addRows(exact.data);

    const tokens = tokenizeMemoryWriteGateText(data.fact).slice(0, 8);
    if (tokens.length > 0) {
      const pattern = tokens
        .map((token) => `fact.ilike.%${token.replace(/[\\%_]/g, (char) => `\\${char}`)}%`)
        .join(",");
      let similarQuery = this.client
        .from(table)
        .select(selectColumns)
        .eq("status", "active")
        .is("invalidated_at", null)
        .or(pattern)
        .order("confidence", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(25);
      if (this.tenancy.mode === "managed") {
        similarQuery = similarQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      const similar = await similarQuery;
      if (similar.error) throw pgError("writeGate similar scan", similar.error);
      addRows(similar.data);
    }

    return selectAdmissionDecision(data, Array.from(candidates.values()));
  }

  private async routeWriteGateEvent(
    data: FactInput,
    gate: AdmissionDecision
  ): Promise<{ id: string; write_gate: AdmissionDecision; source_kind: MemoryWriteGateResultSourceKind }> {
    if (isMemoryWriteGateEpisodeStoreEnabled() && hasMemoryWriteGateEpisodeBackend(this)) {
      const event = await this.addSessionEvent(memoryWriteGateSessionEventInput(data, gate));
      return { id: event.id, write_gate: gate, source_kind: "session_event" };
    }
    await this.enforceCaps("general");
    const { data: row, error } = await this.client
      .from(this.tables.conversation_log)
      .insert(
        this.withTenancy({
          session_id: data.source_session_id ?? `write-gate-${gate.candidate_hash.slice(0, 12)}`,
          role: "memory_write_gate_event",
          content: truncate(data.fact),
          has_code: false,
        })
      )
      .select("id")
      .single();
    if (error) throw pgError("writeGate route event insert", error);
    return { id: String(row.id), write_gate: gate, source_kind: "conversation_turn" };
  }

  private async finalizeWriteGateSupersede(data: FactInput, id: string): Promise<void> {
    let updateQuery = this.client
      .from(this.tables.extracted_facts)
      .update({
        content_hash: contentHash(data.fact),
        startup_fact_kind: data.startup_fact_kind ?? "durable",
        decay_tier: "hot",
        last_accessed: now(),
        valid_from: data.valid_from ?? now(),
        extractor_id: data.extractor_id ?? "manual",
        prompt_version: data.prompt_version ?? null,
        model_id: data.model_id ?? null,
        commit_sha: data.commit_sha ?? null,
        pr_number: data.pr_number ?? null,
      })
      .eq("id", id);
    if (this.tenancy.mode === "managed") {
      updateQuery = updateQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { error } = await updateQuery;
    if (error) throw pgError("writeGate supersede finalize", error);
    this.embedAndStore(this.tables.extracted_facts, id, data.fact).catch(() => {});
  }

  private async applyWriteGateDecision(
    data: FactInput,
    gate: AdmissionDecision
  ): Promise<({ id: string; write_gate: AdmissionDecision; source_kind: MemoryWriteGateResultSourceKind }) | null> {
    if (gate.action === "ADD") return null;
    if (gate.action === "NOOP" && gate.matched_id) {
      return { id: gate.matched_id, write_gate: gate, source_kind: "fact" };
    }
    if (gate.action === "UPDATE" && gate.matched_id) {
      const id = await this.supersedeFact(gate.matched_id, data.fact, data.category, data.confidence);
      await this.finalizeWriteGateSupersede(data, id);
      return { id, write_gate: gate, source_kind: "fact" };
    }
    if (gate.action === "ROUTE_EVENT") {
      return this.routeWriteGateEvent(data, gate);
    }
    return {
      id: syntheticWriteGateId("rejected", gate.candidate_hash),
      write_gate: gate,
      source_kind: "none",
    };
  }
  // --- end lane-07 ---

  async addFact(data: FactInput): Promise<{ id: string }> {
    // preserve_as_blob: write raw body to canonical_docs, then extract+store atomic facts
    if (data.preserve_as_blob) {
      return this.saveBlob(data);
    }

    // --- lane-07: write-gate admission (outer gate: dedup / admission / routing, runs first) ---
    if (isMemoryWriteGateEnabled()) {
      try {
        const gate = await this.admitWrite(data);
        const gatedResult = await this.applyWriteGateDecision(data, gate);
        if (gatedResult) return gatedResult;
      } catch (err) {
        console.error("[memory_write_gate] optional admission failed:", err);
      }
    }
    // --- end lane-07 ---

    const memoryClass = isTypedMemorySplitEnabled()
      ? classifyMemoryClass({
          text: data.fact,
          category: data.category,
          startup_fact_kind: data.startup_fact_kind,
          memory_class: data.memory_class,
        })
      : data.memory_class;
    if (isTypedMemorySplitEnabled() && memoryClass === "episodic") {
      const event = await this.addSessionEvent(factInputToSessionEventInput(data));
      const result = { id: event.id, routed_to_episode: true, memory_class: event.memory_class };
      return result;
    }

    await this.enforceCaps("fact");

    const hash = contentHash(data.fact);

    // Exact-hash dedup: if a live fact with this hash already exists, return it
    const dupTable = this.tables.extracted_facts;
    let dupQuery = this.client
      .from(dupTable)
      .select("id")
      .eq("content_hash", hash)
      .is("invalidated_at", null)
      .limit(1);
    if (this.tenancy.mode === "managed") {
      dupQuery = dupQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data: existing } = await dupQuery.maybeSingle();
    if (existing) return { id: (existing as { id: string }).id };

    // --- lane-02: reconcile against same-subject live facts before insert (flag-gated, default off) ---
    const reconciled = await this.maybeReconcileOnWrite(data);
    if (reconciled) return reconciled;
    // --- end lane-02 ---
    const insertRow: Record<string, unknown> = {
      fact: data.fact,
      category: data.category,
      confidence: data.confidence,
      source_session_id: data.source_session_id ?? null,
      source_type: "manual",
      startup_fact_kind: data.startup_fact_kind ?? "durable",
      status: "active",
      decay_tier: "hot",
      last_accessed: now(),
      content_hash: hash,
      valid_from: data.valid_from ?? now(),
      recorded_at: now(),
      extractor_id: data.extractor_id ?? "manual",
      prompt_version: data.prompt_version ?? null,
      model_id: data.model_id ?? null,
      commit_sha: data.commit_sha ?? null,
      pr_number: data.pr_number ?? null,
    };
    if (isTypedMemorySplitEnabled()) insertRow.memory_class = memoryClass ?? "semantic";
    // --- lane-03: provenance & receipts (only written when MEMORY_PROVENANCE_ENABLED) ---
    Object.assign(insertRow, provenanceWriteFields(data) ?? {});
    // --- end lane-03 ---
    // --- lane-04: stamp scope columns only when MEMORY_SCOPES_ENABLED ---
    if (scopesEnabled()) Object.assign(insertRow, scopeFieldsForWrite(data, resolveScopeContext(), true));
    // --- end lane-04 ---

    const { data: row, error } = await this.client
      .from(this.tables.extracted_facts)
      .insert(this.withTenancy(insertRow))
      .select()
      .single();
    if (error) throw pgError("addFact insert", error);

    // Append audit row (fire-and-forget; never blocks the main insert)
    this.writeFactAudit(row.id, "insert", { category: data.category }).catch(() => {});

    // Embed the fact so it joins the vector lane immediately. Without this,
    // every newly inserted fact has NULL embedding and only the keyword lane
    // can find it. Fire-and-forget so embedding latency / OpenAI outages
    // never block the primary insert.
    this.embedAndStore(this.tables.extracted_facts, row.id, data.fact).catch(() => {});

    return { id: row.id };
  }

  private async embedAndStore(table: string, id: string, text: string): Promise<void> {
    const { embedText, getEmbeddingState } = await import("./embeddings.js");
    const state = getEmbeddingState();
    const vec = await embedText(text);
    if (!vec) return;
    await this.client
      .from(table)
      .update({
        embedding: JSON.stringify(vec),
        embedding_model: state.model,
        embedding_created_at: now(),
      })
      .eq("id", id);
  }

  private async saveBlob(data: FactInput): Promise<{ id: string; fact_ids?: string[] }> {
    await this.enforceCaps("general");

    const hash = contentHash(data.fact);
    const docTable = this.tenancy.mode === "managed" ? "mc_canonical_docs" : "canonical_docs";

    // Upsert canonical_doc (idempotent by content_hash)
    let docId: string;
    {
      let q = this.client.from(docTable).select("id").eq("content_hash", hash).limit(1);
      if (this.tenancy.mode === "managed") {
        q = q.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      const { data: existing } = await q.maybeSingle();
      if (existing) {
        docId = (existing as { id: string }).id;
      } else {
        const { data: doc, error } =
          this.tenancy.mode === "managed"
            ? await this.client
                .from("mc_canonical_docs")
                .insert({
                  api_key_hash: this.tenancy.apiKeyHash,
                  title: data.category,
                  body: data.fact,
                  content_hash: hash,
                })
                .select()
                .single()
            : await this.client
                .from("canonical_docs")
                .insert({ title: data.category, body: data.fact, content_hash: hash })
                .select()
                .single();
        if (error) throw pgError("saveBlob canonical_docs insert", error);
        docId = (doc as { id: string }).id;
      }
    }

    // Extract atomic facts (minimal extractor; Chunk 4 replaces with full pipeline)
    const atomicFacts = await extractAtomicFacts(data.fact);
    const factIds: string[] = [];

    for (const factText of atomicFacts) {
      const factHash = contentHash(factText);

      // Skip if already live
      let dupQ = this.client
        .from(this.tables.extracted_facts)
        .select("id")
        .eq("content_hash", factHash)
        .is("invalidated_at", null)
        .limit(1);
      if (this.tenancy.mode === "managed") {
        dupQ = dupQ.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      const { data: dup } = await dupQ.maybeSingle();
      if (dup) {
        factIds.push((dup as { id: string }).id);
        continue;
      }

      const { data: frow, error: ferr } = await this.client
        .from(this.tables.extracted_facts)
        .insert(
          this.withTenancy({
            fact: factText,
            category: data.category,
            confidence: Math.max(0, data.confidence - 0.05), // slight confidence discount
            source_session_id: data.source_session_id ?? null,
            source_type: "auto_extract",
            startup_fact_kind: data.startup_fact_kind ?? "durable",
            status: "active",
            decay_tier: "hot",
            last_accessed: now(),
            content_hash: factHash,
            valid_from: now(),
            recorded_at: now(),
            extractor_id: "auto-extract-v1",
            derived_from_doc_id: docId,
          })
        )
        .select()
        .single();
      if (ferr && (ferr as { code?: string }).code !== "23505") throw pgError("saveBlob extracted_facts insert", ferr);
      if (!ferr && frow) factIds.push((frow as { id: string }).id);
    }

    return { id: docId, fact_ids: factIds };
  }

  private async writeFactAudit(
    factId: string,
    op: "insert" | "update" | "invalidate",
    payload: Record<string, unknown>
  ): Promise<void> {
    const auditTable = this.tenancy.mode === "managed" ? "mc_facts_audit" : "facts_audit";
    await this.client.from(auditTable).insert({ fact_id: factId, op, payload, actor: "agent", at: now() });
  }

  async invalidateFact(input: InvalidateFactInput): Promise<{ invalidated_at: string }> {
    const result = await this.rpc<Array<{ invalidated_at: string }>>(
      "invalidate_fact",
      { p_fact_id: input.fact_id, p_reason: input.reason ?? null, p_session_id: input.session_id ?? null },
      "mc_invalidate_fact",
      { p_fact_id: input.fact_id, p_reason: input.reason ?? null, p_session_id: input.session_id ?? null }
    );
    const row = Array.isArray(result) ? result[0] : (result as { invalidated_at: string });
    return { invalidated_at: row.invalidated_at };
  }

  async supersedeFact(
    oldId: string,
    newText: string,
    category?: string,
    confidence?: number
  ): Promise<string> {
    if (this.tenancy.mode === "managed") {
      const params: Record<string, unknown> = {
        p_api_key_hash: this.tenancy.apiKeyHash,
        p_old_fact_id: oldId,
        p_new_fact_text: newText,
      };
      if (category !== undefined) params.p_new_category = category;
      if (confidence !== undefined) params.p_new_confidence = confidence;
      const { data, error } = await this.client.rpc("mc_supersede_fact", params);
      if (error) throw new Error(`rpc(mc_supersede_fact) failed: ${error.message}`);
      return String(data);
    }
    const params: Record<string, unknown> = {
      old_fact_id: oldId,
      new_fact_text: newText,
    };
    if (category !== undefined) params.new_category = category;
    if (confidence !== undefined) params.new_confidence = confidence;
    const { data, error } = await this.client.rpc("supersede_fact", params);
    if (error) throw new Error(`rpc(supersede_fact) failed: ${error.message}`);
    return String(data);
  }

  // --- lane-02: contradiction reconciliation & supersession ---
  async reconcileFact(candidate: FactInput, options: ReconcileOptions = {}): Promise<ReconcileResult> {
    const { isReconcileEnabled, reconcileCandidate } = await import("./reconcile.js");
    if (!isReconcileEnabled()) {
      return { enabled: false, classification: "distinct", decision: "add" };
    }
    // Fetch same-category live candidates, tenant-scoped and bi-temporally visible.
    let q = this.client
      .from(this.tables.extracted_facts)
      .select(
        "id, fact, category, confidence, recorded_at, valid_from, extractor_id, model_id, prompt_version, commit_sha, pr_number, source_agent_id, source_ref, receipt_id"
      )
      .eq("category", candidate.category)
      .is("invalidated_at", null)
      .eq("status", "active")
      .order("recorded_at", { ascending: false })
      .limit(50);
    if (this.tenancy.mode === "managed") {
      q = q.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data: rows } = await q;
    const existing = (Array.isArray(rows) ? rows : []) as ExistingFact[];

    const result = await reconcileCandidate(
      candidate,
      existing,
      {
        supersede: (oldId, newText, category, confidence) =>
          this.supersedeFact(oldId, newText, category, confidence),
        emit: (event) => this.emitContradiction(event),
        now,
      },
      options
    );

    // Make the outcome observable for the eval harness (Worker 10).
    const { logMemoryLoadEvent } = await import("./instrumentation.js");
    logMemoryLoadEvent({
      tool_name: "memory_reconcile",
      params: { classification: result.classification, decision: result.decision },
    });
    return result;
  }

  /**
   * Flag-gated write-path hook. Cooperates with lane-07's admission gate (which
   * calls reconcile's classifier directly); kept tiny and additive so the two
   * merge mechanically. Returns a resolved id when reconciliation handled the
   * write, or null to let the normal insert proceed. Never throws.
   */
  private async maybeReconcileOnWrite(data: FactInput): Promise<{ id: string } | null> {
    const { isReconcileEnabled } = await import("./reconcile.js");
    if (!isReconcileEnabled() || data.preserve_as_blob) return null;
    try {
      const result = await this.reconcileFact(data);
      if (result.decision === "supersede" && result.fact_id) return { id: result.fact_id };
      if (result.decision === "noop" && (result.fact_id || result.matched_fact_id)) {
        return { id: (result.fact_id ?? result.matched_fact_id) as string };
      }
      return null;
    } catch {
      return null;
    }
  }

  private async emitContradiction(event: ContradictionEvent): Promise<void> {
    const { emitSignal, currentApiKeyHash } = await import("../signals/emit.js");
    const hash = this.tenancy.mode === "managed" ? this.tenancy.apiKeyHash : currentApiKeyHash();
    if (!hash) return;
    await emitSignal({
      apiKeyHash: hash,
      tool: "memory",
      action: "memory_contradiction",
      severity: "action_needed",
      summary: `Contradiction on "${event.subject}": "${event.existing.fact}" superseded by "${event.incoming.fact}"`,
      deepLink: "/admin/memory?tab=facts",
      payload: { contradiction: event },
    });
  }
  // --- end lane-02 ---
  // --- lane-05: true-forget (MEMORY_HARD_FORGET_ENABLED) ---
  async forgetMemory(input: ForgetInput): Promise<ForgetReceipt> {
    // Capture the original text before the RPC scrubs it (used to verify the
    // fact no longer surfaces in recall search).
    let factQuery = this.client
      .from(this.tables.extracted_facts)
      .select("fact")
      .eq("id", input.fact_id)
      .limit(1);
    if (this.tenancy.mode === "managed") {
      factQuery = factQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data: existing } = await factQuery.maybeSingle();
    if (!existing) throw new Error(`Fact ${input.fact_id} not found`);
    const originalText =
      typeof (existing as { fact?: string }).fact === "string"
        ? (existing as { fact: string }).fact
        : "";

    // Atomic DB tombstone: move the row to status 'forgotten', invalidate it,
    // scrub the content, null the embedding, delete derived typed links, and
    // write a 'forget' audit row. Mirrors invalidate_fact's BYOD/managed split.
    const rpcResult = await this.rpc<
      Array<{ forgotten_at: string; typed_links_deleted: number }>
    >(
      "forget_fact",
      { p_fact_id: input.fact_id, p_reason: input.reason ?? null, p_session_id: input.session_id ?? null },
      "mc_forget_fact",
      { p_fact_id: input.fact_id, p_reason: input.reason ?? null, p_session_id: input.session_id ?? null }
    );
    const row = Array.isArray(rpcResult)
      ? rpcResult[0]
      : (rpcResult as { forgotten_at: string; typed_links_deleted: number });
    const forgottenAt = row?.forgotten_at ?? now();
    const typedLinksDeleted =
      typeof row?.typed_links_deleted === "number" ? row.typed_links_deleted : 0;

    // Scrub the forgotten fact out of derived taxonomy snapshots.
    const snapshots = await scrubForgottenFactFromSnapshots(this, input.fact_id);

    // Purge archived snapshot versions that still embed the fact pointer.
    const historyPurged = await this.purgeForgottenSnapshotHistory(input.fact_id);

    // Sweep Worker 9's episodic store (session_events) for the forgotten fact.
    const sessionEventsDeleted = await this.sweepForgottenSessionEvents(input.fact_id, originalText);

    // Verify the forgotten fact no longer surfaces in any recall path.
    const verifiedClean =
      snapshots.clean && !(await this.factSurfacesInRecall(input.fact_id, originalText));

    return {
      fact_id: input.fact_id,
      backend: "supabase",
      forgotten_at: forgottenAt,
      fact_tombstoned: true,
      content_scrubbed: true,
      embedding_cleared: true,
      typed_links_deleted: typedLinksDeleted,
      snapshots_regenerated: snapshots.snapshots_regenerated,
      snapshots_neutralized: snapshots.snapshots_neutralized,
      history_entries_purged: historyPurged,
      session_events_deleted: sessionEventsDeleted,
      surfaces_swept: [
        "extracted_facts",
        "extracted_facts.embedding",
        "memory_typed_links",
        "session_events",
        "facts_audit",
        "knowledge_library(memory_snapshot)",
        "knowledge_library_history",
      ],
      verified_clean: verifiedClean,
    };
  }

  /**
   * Sweep Worker 9's episode store for a forgotten fact. Deletes session_events
   * (mc_ in managed cloud) matched by the canonical FK (source_fact_id) and,
   * separately, by verbatim content for fact_route episodes the router did not
   * id-link. Best-effort and tenant-scoped: a missing typed-split table (the
   * migration has not been applied / the flag is off) yields 0, never an error.
   */
  private async sweepForgottenSessionEvents(factId: string, originalText: string): Promise<number> {
    const table =
      this.tenancy.mode === "managed" ? SESSION_EVENTS_TABLE_MANAGED : SESSION_EVENTS_TABLE_BYOD;
    let deleted = await this.deleteSessionEventsBy(table, "source_fact_id", factId);
    // A row already removed by source_fact_id will not re-match here, so the two
    // passes never double-count. Content is matched exactly (parameterised).
    if (originalText.length > 0) {
      deleted += await this.deleteSessionEventsBy(table, "content", originalText);
    }
    return deleted;
  }

  private async deleteSessionEventsBy(table: string, column: string, value: string): Promise<number> {
    try {
      let del = this.client.from(table).delete().eq(column, value);
      if (this.tenancy.mode === "managed") {
        del = del.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      const { data } = await del.select("id");
      return Array.isArray(data) ? data.length : 0;
    } catch {
      return 0;
    }
  }

  /** Best-effort purge of archived snapshot versions that still embed the fact. */
  private async purgeForgottenSnapshotHistory(factId: string): Promise<number> {
    const pattern = `%${factSnapshotPointer(factId)}%`;
    try {
      let del = this.client
        .from(this.tables.knowledge_library_history)
        .delete()
        .like("content", pattern);
      if (this.tenancy.mode === "managed") {
        del = del.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      const { data } = await del.select("id");
      return Array.isArray(data) ? data.length : 0;
    } catch {
      return 0;
    }
  }

  /** Post-forget assertion: the fact id must not appear in fact or recall search. */
  private async factSurfacesInRecall(factId: string, originalText: string): Promise<boolean> {
    if (!originalText) return false;
    try {
      const facts = (await this.searchFacts(originalText)) as Array<{ id?: string }>;
      if (Array.isArray(facts) && facts.some((r) => r?.id === factId)) return true;
      const recall = (await this.searchMemory(originalText, 50)) as Array<{ id?: string }>;
      return Array.isArray(recall) && recall.some((r) => r?.id === factId);
    } catch {
      return false;
    }
  }
  // --- end lane-05 ---

  async logConversation(data: ConversationInput) {
    await this.enforceCaps("general");
    const { data: row, error } = await this.client
      .from(this.tables.conversation_log)
      .insert(
        this.withTenancy({
          session_id: data.session_id,
          role: data.role,
          content: truncate(data.content),
          has_code: data.has_code,
        })
      )
      .select("id, session_id, role")
      .single();
    if (error) throw pgError("logConversation insert", error);
    return {
      logged: true as const,
      session_id: String(row.session_id),
      role: String(row.role),
      receipt_id: String(row.id),
    };
  }

  async saveTypedLinkCandidates(
    candidates: MemoryTypedLinkCandidate[]
  ): Promise<SaveTypedLinkCandidatesResult> {
    if (candidates.length === 0) return { saved: 0 };

    const rows = candidates.map((candidate) =>
      this.withTenancy({
        source_kind: candidate.source_kind,
        source_id: candidate.source_id,
        relation: candidate.relation,
        target_kind: candidate.target_kind,
        target_text: candidate.target_text,
        confidence: candidate.confidence,
        evidence_start: candidate.evidence_span.start,
        evidence_end: candidate.evidence_span.end,
        evidence_text: candidate.evidence_span.text,
        redaction_state: candidate.redaction_state,
      })
    );

    const onConflict =
      this.tenancy.mode === "managed"
        ? "api_key_hash,source_kind,source_id,relation,target_kind,target_text"
        : "source_kind,source_id,relation,target_kind,target_text";
    const { data, error } = await this.client
      .from(this.tables.memory_typed_links)
      .upsert(rows, { onConflict, ignoreDuplicates: true })
      .select("id");

    if (error) {
      if (isTypedLinkSchemaUnavailable(error)) return { saved: 0, skipped: "schema_unavailable" };
      throw pgError("saveTypedLinkCandidates upsert", error);
    }

    return { saved: Array.isArray(data) ? data.length : rows.length };
  }

  async searchTypedLinks(query: string, maxResults: number): Promise<MemoryTypedLinkSearchResult[]> {
    const limit = Math.max(1, Math.min(Math.floor(maxResults) || 10, 50));
    let request = this.client
      .from(this.tables.memory_typed_links)
      .select(
        [
          "id",
          "source_kind",
          "source_id",
          "relation",
          "target_kind",
          "target_text",
          "confidence",
          "evidence_start",
          "evidence_end",
          "evidence_text",
          "redaction_state",
          "created_at",
        ].join(",")
      )
      .order("created_at", { ascending: false })
      .limit(Math.min(Math.max(limit * 10, 50), 250));

    if (this.tenancy.mode === "managed") {
      request = request.eq("api_key_hash", this.tenancy.apiKeyHash);
    }

    const { data, error } = await request;
    if (error) {
      if (isTypedLinkSchemaUnavailable(error)) return [];
      throw pgError("searchTypedLinks select", error);
    }

    return filterAndRankMemoryTypedLinks((data ?? []) as unknown as MemoryTypedLinkStoredRow[], query, limit);
  }

  // --- lane-09: typed memory split ---
  async addSessionEvent(data: SessionEventInput): Promise<SessionEventWriteResult> {
    await this.enforceCaps("general");
    const memoryClass = normalizeMemoryClass(data.memory_class, "episodic");
    const { data: row, error } = await this.client
      .from(this.tables.session_events)
      .insert(
        this.withTenancy({
          session_id: data.session_id ?? null,
          memory_class: memoryClass,
          event_kind: data.event_kind ?? "episode",
          content: truncate(data.content),
          summary: data.summary ?? null,
          payload: data.payload ?? {},
          source_fact_id: data.source_fact_id ?? null,
          source_session_summary_id: data.source_session_summary_id ?? null,
        })
      )
      .select("id, memory_class")
      .single();
    if (error) throw pgError("addSessionEvent insert", error);
    return { id: String(row.id), memory_class: normalizeMemoryClass(row.memory_class, memoryClass) };
  }

  async listSessionEvents(query: SessionEventQuery = {}): Promise<unknown> {
    const limit = Math.max(1, Math.min(Math.floor(query.limit ?? 20) || 20, 100));
    const memoryClass = query.memory_class ? normalizeMemoryClass(query.memory_class) : undefined;
    const searchText = query.query?.trim();
    let request = this.client
      .from(this.tables.session_events)
      .select(
        [
          "id",
          "session_id",
          "memory_class",
          "event_kind",
          "content",
          "summary",
          "payload",
          "source_fact_id",
          "source_session_summary_id",
          "created_at",
        ].join(",")
      )
      .order("created_at", { ascending: false })
      .limit(searchText ? Math.min(limit * 4, 250) : limit);

    if (this.tenancy.mode === "managed") {
      request = request.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    if (query.session_id) request = request.eq("session_id", query.session_id);
    if (memoryClass) request = request.eq("memory_class", memoryClass);
    if (searchText) {
      const pattern = `%${searchText.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
      request = request.or(`content.ilike.${pattern},summary.ilike.${pattern}`);
    }

    const { data, error } = await request;
    if (error) throw pgError("listSessionEvents select", error);
    return ((data ?? []) as unknown as Array<Record<string, unknown>>).slice(0, limit);
  }
  // --- end lane-09 ---

  async getConversationDetail(sessionId: string): Promise<unknown> {
    return this.rpc(
      "get_conversation_detail",
      { sid: sessionId },
      "mc_get_conversation_detail",
      { p_session_id: sessionId }
    );
  }

  async storeCode(data: CodeInput): Promise<{ id: string }> {
    await this.enforceCaps("general");
    const { data: row, error } = await this.client
      .from(this.tables.code_dumps)
      .insert(
        this.withTenancy({
          session_id: data.session_id,
          language: data.language,
          filename: data.filename ?? null,
          content: truncate(data.content, 50000),
          description: data.description ?? null,
        })
      )
      .select()
      .single();
    if (error) throw pgError("storeCode insert", error);
    return { id: row.id };
  }

  async getBusinessContext(): Promise<unknown[]> {
    let query = this.client
      .from(this.tables.business_context)
      .select("*")
      .order("category")
      .order("key");
    if (this.tenancy.mode === "managed") {
      query = query.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await query;
    if (error) throw pgError("getBusinessContext select", error);
    return data ?? [];
  }

  async setBusinessContext(
    category: string,
    key: string,
    value: unknown,
    priority?: number
  ): Promise<void> {
    await this.enforceCaps("general");
    const row: Record<string, unknown> = {
      category,
      key,
      value:
        typeof value === "string"
          ? (() => {
              try {
                return JSON.parse(value);
              } catch {
                return value;
              }
            })()
          : value,
      last_accessed: now(),
      decay_tier: "hot",
    };
    if (priority !== undefined) row.priority = priority;

    const onConflict =
      this.tenancy.mode === "managed" ? "api_key_hash,category,key" : "category,key";

    const { error } = await this.client
      .from(this.tables.business_context)
      .upsert(this.withTenancy(row), { onConflict })
      .select()
      .single();
    if (error) throw pgError("setBusinessContext upsert", error);
  }

  async upsertLibraryDoc(data: LibraryDocInput): Promise<string> {
    await this.enforceCaps("general");
    let existingQuery = this.client
      .from(this.tables.knowledge_library)
      .select("id, version")
      .eq("slug", data.slug);
    if (this.tenancy.mode === "managed") {
      existingQuery = existingQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data: existing } = await existingQuery.maybeSingle();

    if (existing) {
      // DB trigger auto-archives old content and bumps version
      const { error } = await this.client
        .from(this.tables.knowledge_library)
        .update({
          title: data.title,
          category: data.category,
          content: data.content,
          tags: data.tags,
          last_accessed: now(),
          decay_tier: "hot",
        })
        .eq("id", existing.id);
      if (error) throw pgError("upsertLibraryDoc update", error);
      return `Library doc updated: "${data.title}" (v${existing.version + 1})`;
    } else {
      const { error } = await this.client
        .from(this.tables.knowledge_library)
        .insert(
          this.withTenancy({
            slug: data.slug,
            title: data.title,
            category: data.category,
            content: data.content,
            tags: data.tags,
            version: 1,
            decay_tier: "hot",
            last_accessed: now(),
          })
        );
      if (error) throw pgError("upsertLibraryDoc insert", error);
      return `Library doc created: "${data.title}" (v1)`;
    }
  }

  private async readTaxonomySnapshotSources(maxSources: number): Promise<MemoryTaxonomySnapshotSource[]> {
    const asOf = now();
    const factLimit = Math.min(Math.max(maxSources * 3, maxSources), 250);
    let factQuery = this.client
      .from(this.tables.extracted_facts)
      .select("id, fact, category, confidence, created_at, updated_at, valid_from, valid_to, invalidated_at, source_type, startup_fact_kind")
      .eq("status", "active")
      .is("invalidated_at", null)
      .lte("valid_from", asOf)
      .or(`valid_to.is.null,valid_to.gt.${asOf}`)
      .order("confidence", { ascending: false })
      .order("updated_at", { ascending: false })
      .limit(factLimit);
    let sessionQuery = this.client
      .from(this.tables.session_summaries)
      .select("id, summary, topics, created_at")
      .order("created_at", { ascending: false })
      .limit(Math.max(1, Math.floor(maxSources / 2)));

    if (this.tenancy.mode === "managed") {
      factQuery = factQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
      sessionQuery = sessionQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
    }

    const [factsRes, sessionsRes] = await Promise.all([factQuery, sessionQuery]);
    if (factsRes.error) throw pgError("readTaxonomySnapshotSources facts", factsRes.error);
    if (sessionsRes.error) throw pgError("readTaxonomySnapshotSources sessions", sessionsRes.error);

    type FactRow = {
      id: string;
      fact: string;
      category?: string | null;
      confidence?: number | null;
      created_at?: string | null;
      updated_at?: string | null;
      valid_from?: string | null;
      valid_to?: string | null;
      invalidated_at?: string | null;
      source_type?: string | null;
      startup_fact_kind?: string | null;
    };
    type SessionRow = {
      id: string;
      summary: string;
      topics?: string[] | null;
      created_at?: string | null;
    };

    const facts = ((factsRes.data ?? []) as FactRow[])
      .filter((row) => isMemoryFactVisibleAt(row, asOf) && !isMemoryFactOperational(row))
      .slice(0, maxSources)
      .map((row) => ({
        id: row.id,
        kind: "fact" as const,
        text: row.fact,
        category: row.category ?? undefined,
        confidence: row.confidence ?? null,
        created_at: row.created_at ?? null,
        updated_at: row.updated_at ?? null,
        valid_from: row.valid_from ?? null,
      }));
    const sessions = ((sessionsRes.data ?? []) as SessionRow[]).map((row) => ({
      id: row.id,
      kind: "session" as const,
      text: row.summary,
      category: Array.isArray(row.topics) && row.topics.length > 0 ? row.topics.join(" ") : "session",
      confidence: 0.75,
      created_at: row.created_at ?? null,
      updated_at: row.created_at ?? null,
      valid_from: row.created_at ?? null,
    }));

    return [...facts, ...sessions];
  }

  async refreshTaxonomySnapshots(
    options: MemoryTaxonomySnapshotWriteOptions = {}
  ): Promise<MemoryTaxonomySnapshotWriteResult> {
    const maxSources = Math.max(1, Math.min(250, options.max_sources ?? 80));
    const sources = await this.readTaxonomySnapshotSources(maxSources);
    return writeMemoryTaxonomySnapshotsToLibrary({
      sources,
      options,
      upsertLibraryDoc: (doc) => this.upsertLibraryDoc(doc),
    });
  }

  async manageDecay(): Promise<unknown> {
    return this.rpc("manage_decay", {}, "mc_manage_decay", {});
  }

  // --- lane-08: decay and consolidation ---
  private async readDecayFactRows(maxCandidates: number): Promise<MemoryDecayFactRow[]> {
    let query = this.client
      .from(this.tables.extracted_facts)
      .select(
        [
          "id",
          "fact",
          "category",
          "confidence",
          "source_session_id",
          "source_type",
          "startup_fact_kind",
          "status",
          "superseded_by",
          "invalidated_at",
          "access_count",
          "last_accessed",
          "decay_tier",
          "valid_from",
          "valid_to",
          "created_at",
          "updated_at",
          "source_agent_id",
          "source_ref",
          "receipt_id",
          "extractor_id",
          "prompt_version",
          "model_id",
          "commit_sha",
          "pr_number",
          "visibility",
          "boardroom_id",
          "credential_scope",
          "quarantined_at",
          "effective_score",
          "decayed_confidence",
          "heat_score",
          "last_decay_at",
          "decay_reason",
          "archived_at",
          "consolidation_group_id",
          "consolidation_receipt",
        ].join(", ")
      )
      .order("updated_at", { ascending: false })
      .limit(maxCandidates);
    if (this.tenancy.mode === "managed") {
      query = query.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await query;
    if (error) throw pgError("lane-08 read extracted_facts", error);
    return (data ?? []) as unknown as MemoryDecayFactRow[];
  }

  private async updateDecayPatch(patch: MemoryDecayPatch): Promise<void> {
    const { id, ...rawPatch } = patch;
    const update = Object.fromEntries(
      Object.entries(rawPatch).filter((entry) => entry[1] !== undefined)
    );
    let query = this.client.from(this.tables.extracted_facts).update(update).eq("id", id);
    if (this.tenancy.mode === "managed") {
      query = query.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { error } = await query;
    if (error) throw pgError("lane-08 decay update", error);
  }

  private async updateConsolidationPatch(patch: MemoryConsolidationPatch): Promise<void> {
    const { id, ...rawPatch } = patch;
    const update = Object.fromEntries(
      Object.entries(rawPatch).filter((entry) => entry[1] !== undefined)
    );
    let query = this.client.from(this.tables.extracted_facts).update(update).eq("id", id);
    if (this.tenancy.mode === "managed") {
      query = query.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { error } = await query;
    if (error) throw pgError("lane-08 consolidation update", error);
  }

  async manageDecayV2(options: MemoryDecayOptions = {}): Promise<MemoryDecayPlan> {
    const maxCandidates = Math.max(1, Math.min(5000, options.max_candidates ?? 1000));
    const rows = await this.readDecayFactRows(maxCandidates);
    const plan = buildMemoryDecayPlan(rows, { ...options, max_candidates: maxCandidates });
    if (!options.dry_run) {
      for (const patch of plan.patches) {
        await this.updateDecayPatch(patch);
      }
    }
    return plan;
  }

  async consolidateMemory(options: MemoryConsolidationOptions = {}): Promise<MemoryConsolidationPlan> {
    const maxCandidates = Math.max(1, Math.min(1000, options.max_candidates ?? 250));
    const rows = await this.readDecayFactRows(maxCandidates);
    const plan = buildMemoryConsolidationPlan(rows, { ...options, max_candidates: maxCandidates });
    if (!options.dry_run) {
      for (const patch of plan.patches) {
        await this.updateConsolidationPatch(patch);
      }
    }
    return plan;
  }
  // --- end lane-08 ---

  // --- lane-10: eval harness and memory passport ---
  async exportMemoryPassport(input: MemoryPassportExportInput = {}): Promise<MemoryPassportExportResult> {
    const [businessContext, facts, sessions] = await Promise.all([
      this.readPassportRows(
        this.tables.business_context,
        "category,key,value,priority,created_at,updated_at",
        "category"
      ),
      this.readPassportRows(
        this.tables.extracted_facts,
        [
          "id",
          "fact",
          "category",
          "confidence",
          "source_session_id",
          "source_type",
          "startup_fact_kind",
          "status",
          "superseded_by",
          "invalidated_at",
          "invalidation_reason",
          "invalidated_by_session_id",
          "valid_from",
          "valid_to",
          "created_at",
          "updated_at",
          "extractor_id",
          "prompt_version",
          "model_id",
          "commit_sha",
          "pr_number",
        ].join(","),
        "created_at"
      ),
      input.include_sessions === false
        ? Promise.resolve([])
        : this.readPassportRows(
            this.tables.session_summaries,
            "session_id,summary,topics,open_loops,decisions,platform,duration_minutes,created_at",
            "created_at"
          ),
    ]);
    const result = buildMemoryPassportBundle({
      ...input,
      source_backend: "supabase",
      business_context: businessContext,
      facts,
      session_summaries: sessions,
    });
    await this.recordPassportAudit(result.audit);
    return result;
  }

  async importMemoryPassport(input: MemoryPassportImportInput): Promise<MemoryPassportImportResult> {
    const verification = verifyMemoryPassportBundle(input.bundle, input.signing_secret);
    if (!verification.verified) {
      throw new Error(`Memory passport verification failed: ${verification.reason ?? "unknown"}`);
    }

    const dryRun = input.dry_run === true;
    let insertedBusinessContext = 0;
    let insertedFacts = 0;
    let insertedSessions = 0;
    let skippedExisting = 0;

    for (const row of input.bundle.identity.business_context) {
      if (!dryRun) {
        await this.setBusinessContext(row.category, row.key, row.value, row.priority);
      }
      insertedBusinessContext++;
    }

    for (const row of input.bundle.memory.facts) {
      if (await this.passportFactExists(row.fact)) {
        skippedExisting++;
        continue;
      }
      if (!dryRun) {
        await this.addFact({
          fact: row.fact,
          category: row.category,
          confidence: row.confidence,
          source_session_id: row.source_session_id ?? input.source_session_id,
          startup_fact_kind: row.startup_fact_kind ?? "durable",
          valid_from: row.valid_from ?? undefined,
          extractor_id: row.extractor_id ?? undefined,
          prompt_version: row.prompt_version ?? undefined,
          model_id: row.model_id ?? undefined,
          commit_sha: row.commit_sha ?? undefined,
          pr_number: row.pr_number,
        });
      }
      insertedFacts++;
    }

    for (const row of input.bundle.memory.session_summaries) {
      if (await this.passportSessionExists(row.session_id, row.summary)) {
        skippedExisting++;
        continue;
      }
      if (!dryRun) {
        await this.writeSessionSummary({
          session_id: row.session_id,
          summary: row.summary,
          topics: row.topics,
          open_loops: row.open_loops,
          decisions: row.decisions,
          platform: row.platform,
          duration_minutes: row.duration_minutes,
        });
      }
      insertedSessions++;
    }

    const result = buildMemoryPassportImportResult({
      bundle: input.bundle,
      inserted_facts: insertedFacts,
      inserted_business_context: insertedBusinessContext,
      inserted_sessions: insertedSessions,
      skipped_existing: skippedExisting,
      dry_run: dryRun,
    });
    await this.recordPassportAudit(result.audit);
    return result;
  }

  private async readPassportRows(table: string, columns: string, orderBy: string): Promise<Array<Record<string, unknown>>> {
    let query = this.client.from(table).select(columns).order(orderBy);
    if (this.tenancy.mode === "managed") {
      query = query.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await query;
    if (error) throw pgError(`passport select ${table}`, error);
    return (data ?? []) as unknown as Array<Record<string, unknown>>;
  }

  private async passportFactExists(fact: string): Promise<boolean> {
    let query = this.client
      .from(this.tables.extracted_facts)
      .select("id")
      .eq("fact", fact)
      .limit(1);
    if (this.tenancy.mode === "managed") {
      query = query.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await query.maybeSingle();
    if (error) throw pgError("passport fact exists", error);
    return Boolean(data);
  }

  private async passportSessionExists(sessionId: string, summary: string): Promise<boolean> {
    let query = this.client
      .from(this.tables.session_summaries)
      .select("id")
      .eq("session_id", sessionId)
      .eq("summary", summary)
      .limit(1);
    if (this.tenancy.mode === "managed") {
      query = query.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data, error } = await query.maybeSingle();
    if (error) throw pgError("passport session exists", error);
    return Boolean(data);
  }

  private async recordPassportAudit(audit: MemoryPassportAuditRecord): Promise<void> {
    const table = this.tenancy.mode === "managed" ? "mc_memory_passport_audit" : "memory_passport_audit";
    try {
      await this.client.from(table).insert(this.withTenancy({
        operation: audit.operation,
        bundle_version: audit.bundle_version,
        signature_digest: audit.signature_digest,
        exported_records: audit.exported_records,
        imported_records: audit.imported_records,
        redacted_records: audit.redacted_records,
        credential_leakage: audit.credential_leakage,
      }));
    } catch {
      // Passport audit must not block an otherwise valid export/import.
    }
  }
  // --- end lane-10 ---

  async getMemoryStatus(): Promise<unknown> {
    const tableKeys: Array<keyof TableNames> = [
      "business_context",
      "knowledge_library",
      "session_summaries",
      "extracted_facts",
      "conversation_log",
      "code_dumps",
    ];
    const counts: Record<string, unknown> = {};
    for (const tk of tableKeys) {
      let q = this.client.from(this.tables[tk]).select("*", { count: "exact", head: true });
      if (this.tenancy.mode === "managed") {
        q = q.eq("api_key_hash", this.tenancy.apiKeyHash);
      }
      const { count } = await q;
      counts[tk] = count;
    }

    let factTiersQuery = this.client
      .from(this.tables.extracted_facts)
      .select("decay_tier")
      .eq("status", "active");
    if (this.tenancy.mode === "managed") {
      factTiersQuery = factTiersQuery.eq("api_key_hash", this.tenancy.apiKeyHash);
    }
    const { data: factTiers } = await factTiersQuery;

    const tiers = { hot: 0, warm: 0, cold: 0 };
    for (const row of factTiers ?? []) {
      tiers[row.decay_tier as keyof typeof tiers]++;
    }
    return {
      mode: this.tenancy.mode === "managed" ? "supabase-managed" : "supabase-byod",
      table_counts: counts,
      fact_decay_tiers: tiers,
    };
  }
}
