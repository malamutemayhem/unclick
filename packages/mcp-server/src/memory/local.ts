/**
 * Local JSON file storage backend for UnClick Memory.
 *
 * Zero-config mode: no accounts, no keys, no database setup.
 * Memory is stored as JSON files in ~/.unclick/memory/
 *
 * This is the default when no SUPABASE_URL is set.
 * Upgrade to Supabase for cloud sync across machines.
 */

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as crypto from "crypto";
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
  MemoryTaxonomySnapshotSource,
  MemoryTaxonomySnapshotWriteOptions,
  MemoryTaxonomySnapshotWriteResult,
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
  buildMemoryPassportBundle,
  buildMemoryPassportImportResult,
  verifyMemoryPassportBundle,
} from "./passport.js";
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
  type MemoryConsolidationPlan,
  type MemoryDecayOptions,
  type MemoryDecayPlan,
} from "./consolidation.js";
import {
  rankLocalMemorySearchRows,
  scoreLocalMemoryContent,
  tokenizeLocalMemoryQuery,
  writeMemoryTaxonomySnapshotsToLibrary,
} from "./supabase.js";
import { provenanceWriteFields, isProvenanceEnabled } from "./provenance.js";
import {
  classifyMemoryClass,
  factInputToSessionEventInput,
  isFactSearchableMemoryClass,
  isTypedMemorySplitEnabled,
  normalizeMemoryClass,
} from "./typed-memory.js";
// --- lane-01: retrieval fusion (read path) ---
import { isFusedRetrievalEnabled, scoreBusinessContextRows, orderByEffectiveScore } from "./retrieval-fusion.js";
// --- end lane-01 ---
import {
  isFactInScope,
  resolveScopeContext,
  scopeFieldsForWrite,
  scopesEnabled,
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
  writeGateCandidateFromRankedSearchRow,
} from "./write-gate.js";
// --- end lane-07 ---
// --- lane-05: true-forget ---
import {
  FORGOTTEN_TOMBSTONE_TEXT,
  factSnapshotPointer,
  scrubForgottenFactFromSnapshots,
  sessionEventBelongsToForgottenFact,
} from "./forget.js";
// --- end lane-05 ---

function dataDir(): string {
  return process.env.MEMORY_LOCAL_DATA_DIR || path.join(os.homedir(), ".unclick", "memory");
}

function ensureDir(): void {
  fs.mkdirSync(dataDir(), { recursive: true });
}

function tablePath(name: string): string {
  return path.join(dataDir(), `${name}.json`);
}

function readTable<T>(name: string): T[] {
  const file = tablePath(name);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

function writeTable<T>(name: string, data: T[]): void {
  ensureDir();
  const file = tablePath(name);
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file);
}

function uuid(): string {
  return crypto.randomUUID();
}

function now(): string {
  return new Date().toISOString();
}

function matches(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

// --- Interfaces for stored records ---

interface BusinessContextRow {
  id: string;
  category: string;
  key: string;
  value: unknown;
  priority: number;
  access_count: number;
  last_accessed: string;
  decay_tier: string;
  created_at: string;
  updated_at: string;
}

interface KnowledgeRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  tags: string[];
  version: number;
  access_count: number;
  last_accessed: string;
  decay_tier: string;
  created_at: string;
  updated_at: string;
}

interface KnowledgeHistoryRow {
  id: string;
  library_id: string;
  title: string;
  content: string;
  version: number;
  changed_at: string;
}

interface SessionRow {
  id: string;
  session_id: string;
  platform: string;
  summary: string;
  decisions: string[];
  open_loops: string[];
  topics: string[];
  duration_minutes?: number;
  created_at: string;
}

// --- lane-09: typed memory split ---
interface SessionEventRow {
  id: string;
  session_id?: string;
  memory_class: MemoryClass;
  event_kind: string;
  content: string;
  summary?: string;
  payload: Record<string, unknown>;
  source_fact_id?: string;
  source_session_summary_id?: string;
  created_at: string;
  updated_at: string;
}
// --- end lane-09 ---

interface FactRow {
  id: string;
  fact: string;
  category: string;
  confidence: number;
  source_session_id?: string;
  source_type: string;
  startup_fact_kind: "durable" | "operational" | "excluded" | "legacy_unspecified";
  // --- lane-09: typed memory split ---
  memory_class?: MemoryClass;
  // --- end lane-09 ---
  status: string;
  superseded_by?: string | null;
  invalidated_at?: string;
  invalidation_reason?: string;
  invalidated_by_session_id?: string;
  access_count: number;
  last_accessed: string;
  decay_tier: string;
  valid_from?: string;
  valid_to?: string | null;
  created_at: string;
  updated_at: string;
  // --- lane-03: provenance & receipts ---
  source_agent_id?: string | null;
  source_ref?: string | null;
  receipt_id?: string | null;
  extractor_id?: string | null;
  prompt_version?: string | null;
  model_id?: string | null;
  // --- end lane-03 ---
  // --- lane-07: write-gate ---
  content_hash?: string | null;
  // --- end lane-07 ---
  commit_sha?: string;
  pr_number?: number;
  // --- lane-04: scopes / credential-aware / Boardroom visibility ---
  // source_agent_id is declared by lane-03 (provenance) and consumed here.
  visibility?: string | null;
  boardroom_id?: string | null;
  credential_scope?: string | null;
  quarantined_at?: string | null;
  // --- end lane-04 ---
  // --- lane-06: ranking row contract ---
  final_score?: number | null;
  rrf_score?: number | null;
  kw_score?: number | null;
  cosine_score?: number | null;
  keyword_rank?: number | null;
  vector_rank?: number | null;
  // --- end lane-06 ---
  // --- lane-08: decay and consolidation ---
  effective_score?: number | null;
  decayed_confidence?: number | null;
  heat_score?: number | null;
  last_decay_at?: string | null;
  decay_reason?: string | null;
  archived_at?: string | null;
  consolidation_group_id?: string | null;
  consolidation_receipt?: Record<string, unknown> | null;
  // --- end lane-08 ---
  // --- lane-05: true-forget tombstone fields ---
  forgotten_at?: string;
  forgotten_reason?: string;
  // --- end lane-05 ---
}

interface ConversationRow {
  id: string;
  session_id: string;
  role: string;
  content: string;
  has_code: boolean;
  created_at: string;
}

interface TypedLinkRow extends MemoryTypedLinkStoredRow {
  id: string;
  source_kind: MemoryTypedLinkStoredRow["source_kind"];
  source_id: string;
  relation: MemoryTypedLinkStoredRow["relation"];
  target_kind: MemoryTypedLinkStoredRow["target_kind"];
  target_text: string;
  confidence: number;
  evidence_start: number;
  evidence_end: number;
  evidence_text: string;
  redaction_state: MemoryTypedLinkStoredRow["redaction_state"];
  created_at: string;
}

interface PassportAuditRow extends MemoryPassportAuditRecord {
  id: string;
  created_at: string;
}

interface CodeRow {
  id: string;
  session_id: string;
  language: string;
  filename?: string;
  content: string;
  description?: string;
  created_at: string;
}

function parsedTime(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function factVisibleAt(fact: FactRow, asOf?: string): boolean {
  const point = parsedTime(asOf) ?? Date.now();
  const validFrom = parsedTime(fact.valid_from ?? fact.created_at);
  if (validFrom !== null && validFrom > point) return false;

  const validTo = parsedTime(fact.valid_to);
  if (validTo !== null && validTo <= point) return false;

  const invalidatedAt = parsedTime(fact.invalidated_at);
  if (invalidatedAt !== null && invalidatedAt <= point) return false;

  return true;
}

function operationalTextSignal(...values: Array<string | undefined>): boolean {
  const text = values.filter(Boolean).join(" ").toLowerCase();
  if (!text) return false;
  if (text.includes("heartbeat")) return true;
  if (text.includes("self-report") || text.includes("self report")) return true;
  if (text.includes("testpass_cron_user_id")) return true;
  if (text.includes("cron") && text.includes("resolved")) return true;
  if (text.includes("signal") && text.includes("blocked")) return true;
  return /\b(self[_ -]?report|cron|system|heartbeat)\b/.test(text);
}

function startupFactPenalty(fact: FactRow): number {
  const kind = fact.startup_fact_kind ?? "legacy_unspecified";
  if (kind === "operational" || kind === "excluded") return 2;
  if (operationalTextSignal(fact.source_type, fact.category, fact.fact)) return 2;
  return kind === "durable" ? 0 : 1;
}

function isRecallVisibleFact(fact: FactRow, asOf?: string): boolean {
  if (isTypedMemorySplitEnabled() && !isFactSearchableMemoryClass(fact.memory_class)) return false;
  return fact.status === "active" &&
    factVisibleAt(fact, asOf) &&
    startupFactPenalty(fact) < 2;
}

function isStartupFact(fact: FactRow): boolean {
  return isRecallVisibleFact(fact) &&
    fact.decay_tier === "hot";
}

function sessionVisibleAt(row: { created_at: string }, asOf?: string): boolean {
  const point = parsedTime(asOf);
  if (point === null) return true;
  const created = parsedTime(row.created_at);
  return created === null || created <= point;
}

// --- Backend Implementation ---

export class LocalBackend implements MemoryBackend {
  constructor() {
    ensureDir();
    console.error(`UnClick Memory: local mode (data at ${dataDir()})`);
  }

  async getStartupContext(numSessions: number): Promise<unknown> {
    // --- lane-04: scope-aware startup (no-op unless MEMORY_SCOPES_ENABLED) ---
    const startupScopesOn = scopesEnabled();
    const startupScopeCtx = resolveScopeContext();
    // --- end lane-04 ---
    const bc = readTable<BusinessContextRow>("business_context")
      .filter((r) => r.decay_tier === "hot" || r.decay_tier === "warm")
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

    const sessions = readTable<SessionRow>("session_summaries")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, numSessions);

    const allFacts = readTable<FactRow>("extracted_facts");
    const facts = allFacts
      .filter(isStartupFact)
      .filter((fact) => !startupScopesOn || isFactInScope(fact, startupScopeCtx))
      .sort((a, b) => {
        const penalty = startupFactPenalty(a) - startupFactPenalty(b);
        if (penalty !== 0) return penalty;
        return b.confidence - a.confidence || new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      .slice(0, 50);

    const library = readTable<KnowledgeRow>("knowledge_library")
      .filter((r) => r.decay_tier === "hot" || r.decay_tier === "warm")
      .map((r) => ({ slug: r.slug, title: r.title, category: r.category, tags: r.tags, version: r.version, updated_at: r.updated_at }))
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    // Touch access counts
    const allBc = readTable<BusinessContextRow>("business_context");
    for (const row of allBc) {
      if (row.decay_tier === "hot" || row.decay_tier === "warm") {
        row.access_count = (row.access_count ?? 0) + 1;
        row.last_accessed = now();
      }
    }
    writeTable("business_context", allBc);

    const surfacedFactIds = new Set(facts.map((fact) => fact.id));
    if (surfacedFactIds.size > 0) {
      for (const fact of allFacts) {
        if (!surfacedFactIds.has(fact.id)) continue;
        fact.access_count = (fact.access_count ?? 0) + 1;
        fact.last_accessed = now();
        fact.updated_at = now();
      }
      writeTable("extracted_facts", allFacts);
    }

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
      business_context: bc.map((r) => ({ category: r.category, key: r.key, value: r.value, priority: r.priority })),
      knowledge_library_index: library,
      recent_sessions: sessions.map((s) => ({
        session_id: s.session_id, platform: s.platform, summary: s.summary,
        decisions: s.decisions, open_loops: s.open_loops, topics: s.topics, created_at: s.created_at,
      })),
      active_facts: facts.map((f) => ({
        fact: f.fact,
        category: f.category,
        confidence: f.confidence,
        created_at: f.created_at,
        // --- lane-03: carry id + provenance so the profile card can surface receipts (flag-gated) ---
        ...(isProvenanceEnabled()
          ? {
              id: f.id,
              source_agent_id: f.source_agent_id ?? null,
              source_ref: f.source_ref ?? null,
              receipt_id: f.receipt_id ?? null,
            }
          : {}),
        // --- end lane-03 ---
      })),
      loaded_at: now(),
    };
  }

  async searchMemory(query: string, maxResults: number, asOf?: string): Promise<unknown> {
    const tokens = tokenizeLocalMemoryQuery(query);
    if (tokens.length === 0) return [];

    // --- lane-04: scope-aware recall (no-op unless MEMORY_SCOPES_ENABLED) ---
    const scopesOn = scopesEnabled();
    const scopeCtx = resolveScopeContext();
    const inScope = (fact: FactRow): boolean => !scopesOn || isFactInScope(fact, scopeCtx);
    // --- end lane-04 ---

    const facts = readTable<FactRow>("extracted_facts")
      .filter((fact) => isRecallVisibleFact(fact, asOf))
      .filter(inScope)
      .map((fact) => {
        const score = scoreLocalMemoryContent({
          query,
          tokens,
          text: fact.fact,
          confidence: fact.confidence,
          source: "fact",
        });
        return {
          id: fact.id,
          source: "fact",
          content: fact.fact,
          category: fact.category,
          confidence: fact.confidence,
          created_at: fact.created_at,
          score,
        };
      });

    const sessions = readTable<SessionRow>("session_summaries")
      .filter((session) => sessionVisibleAt(session, asOf))
      .map((session) => {
        const score = scoreLocalMemoryContent({
          query,
          tokens,
          text: session.summary,
          confidence: 1,
          source: "session",
        });
        return {
          id: session.id,
          source: "session",
          content: session.summary,
          category: "session",
          confidence: 1,
          created_at: session.created_at,
          score,
        };
      });

    const conversations = readTable<ConversationRow>("conversation_log")
      .filter((row) => sessionVisibleAt(row, asOf))
      .map((row) => {
        const score = scoreLocalMemoryContent({
          query,
          tokens,
          text: row.content,
          confidence: 0.5,
          source: "session",
        });
        return {
          id: row.id,
          source: "conversation",
          content: row.content,
          category: row.role,
          confidence: 0.5,
          created_at: row.created_at,
          score,
        };
      });

    // --- lane-01: fused read path (flag on) adds business_context (Gap 2) + effective-score order.
    // Flag off keeps lane-06 canonical ranking, byte-identical. ---
    if (isFusedRetrievalEnabled()) {
      const businessContext = scoreBusinessContextRows(
        query,
        readTable<BusinessContextRow>("business_context").map((r) => ({
          id: r.id,
          category: r.category,
          key: r.key,
          value: r.value,
          created_at: r.created_at,
        }))
      );
      // Lane 6 owns keyword ranking; run the keyword rows through it (assigns
      // final_score) before fusing with the already-scored business_context rows.
      const ranked = rankLocalMemorySearchRows(
        [...facts, ...sessions, ...conversations],
        Math.max(maxResults * 4, maxResults + businessContext.length),
        asOf
      );
      return orderByEffectiveScore([...ranked, ...businessContext], maxResults, asOf);
    }
    // --- end lane-01 ---

    return rankLocalMemorySearchRows([...facts, ...sessions, ...conversations], maxResults, asOf);
  }

  async searchFacts(query: string): Promise<unknown> {
    const scopesOn = scopesEnabled();
    const scopeCtx = resolveScopeContext();
    return readTable<FactRow>("extracted_facts")
      .filter((f) => isRecallVisibleFact(f) && matches(f.fact, query))
      .filter((f) => !scopesOn || isFactInScope(f, scopeCtx))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 20)
      .map((f) => ({ id: f.id, fact: f.fact, category: f.category, confidence: f.confidence, status: f.status, created_at: f.created_at }));
  }

  async searchLibrary(query: string): Promise<unknown> {
    return readTable<KnowledgeRow>("knowledge_library")
      .filter((r) => matches(r.title, query) || matches(r.content, query) || (r.tags ?? []).some((t) => matches(t, query)))
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 10)
      .map((r) => ({ id: r.id, title: r.title, slug: r.slug, category: r.category, tags: r.tags, content: r.content, version: r.version, updated_at: r.updated_at }));
  }

  async getLibraryDoc(slug: string): Promise<unknown> {
    const docs = readTable<KnowledgeRow>("knowledge_library");
    const doc = docs.find((d) => d.slug === slug);
    if (!doc) return null;

    // Touch access
    doc.access_count = (doc.access_count ?? 0) + 1;
    doc.last_accessed = now();
    writeTable("knowledge_library", docs);

    const history = readTable<KnowledgeHistoryRow>("knowledge_library_history")
      .filter((h) => h.library_id === doc.id)
      .map((h) => ({ version: h.version, changed_at: h.changed_at }))
      .sort((a, b) => b.version - a.version);

    return { ...doc, history };
  }

  async listLibrary(): Promise<unknown> {
    return readTable<KnowledgeRow>("knowledge_library")
      .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title))
      .map((r) => ({ slug: r.slug, title: r.title, category: r.category, tags: r.tags, version: r.version, updated_at: r.updated_at }));
  }

  async writeSessionSummary(data: SessionSummaryInput): Promise<{ id: string }> {
    const id = uuid();
    const rows = readTable<SessionRow>("session_summaries");
    rows.push({
      id,
      session_id: data.session_id,
      platform: data.platform,
      summary: data.summary,
      decisions: data.decisions,
      open_loops: data.open_loops,
      topics: data.topics,
      duration_minutes: data.duration_minutes,
      created_at: now(),
    });
    writeTable("session_summaries", rows);
    return { id };
  }

  // --- lane-07: write-gate admission ---
  async admitWrite(data: FactInput): Promise<AdmissionDecision> {
    const candidates = new Map<string, MemoryWriteGateCandidate>();
    const searchRows = await this.searchMemory(data.fact, 25);
    const rankedRows = Array.isArray(searchRows) ? searchRows : [];
    for (const row of rankedRows) {
      const candidate = writeGateCandidateFromRankedSearchRow(row);
      if (candidate) candidates.set(candidate.id, candidate);
    }
    for (const row of readTable<FactRow>("extracted_facts")
      .filter((row) => row.status === "active" && !row.invalidated_at)
      .map((row) => ({
        id: row.id,
        fact: row.fact,
        category: row.category,
        confidence: row.confidence,
        content_hash: row.content_hash ?? memoryWriteGateContentHash(row.fact),
        created_at: row.created_at,
      }))) {
      candidates.set(row.id, { ...row, ...candidates.get(row.id) });
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
    const rows = readTable<ConversationRow>("conversation_log");
    const id = uuid();
    rows.push({
      id,
      session_id: data.source_session_id ?? `write-gate-${gate.candidate_hash.slice(0, 12)}`,
      role: "memory_write_gate_event",
      content: data.fact,
      has_code: false,
      created_at: now(),
    });
    writeTable("conversation_log", rows);
    return { id, write_gate: gate, source_kind: "conversation_turn" };
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
    // --- lane-07: write-gate admission (outer gate: dedup / admission / routing, runs first) ---
    if (isMemoryWriteGateEnabled()) {
      const gate = await this.admitWrite(data);
      const gatedResult = await this.applyWriteGateDecision(data, gate);
      if (gatedResult) return gatedResult;
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

    // --- lane-02: reconcile against same-subject live facts before insert (flag-gated, default off) ---
    const reconciled = await this.maybeReconcileOnWrite(data);
    if (reconciled) return reconciled;
    // --- end lane-02 ---
    const id = uuid();
    const rows = readTable<FactRow>("extracted_facts");
    rows.push({
      id,
      fact: data.fact,
      category: data.category,
      confidence: data.confidence,
      source_session_id: data.source_session_id,
      source_type: "manual",
      startup_fact_kind: data.startup_fact_kind ?? "durable",
      memory_class: memoryClass,
      status: "active",
      superseded_by: undefined,
      access_count: 0,
      last_accessed: now(),
      decay_tier: "hot",
      valid_from: data.valid_from ?? now(),
      valid_to: undefined,
      created_at: now(),
      updated_at: now(),
      content_hash: memoryWriteGateContentHash(data.fact),
      extractor_id: data.extractor_id,
      prompt_version: data.prompt_version,
      model_id: data.model_id,
      commit_sha: data.commit_sha,
      pr_number: data.pr_number,
      // --- lane-03: provenance & receipts (only written when MEMORY_PROVENANCE_ENABLED) ---
      ...(provenanceWriteFields(data) ?? {}),
      // --- end lane-03 ---
      // --- lane-04: stamp scope columns (null unless MEMORY_SCOPES_ENABLED) ---
      ...scopeFieldsForWrite(data, resolveScopeContext(), scopesEnabled()),
      // --- end lane-04 ---
    });
    writeTable("extracted_facts", rows);
    return { id };
  }

  // --- lane-04: quarantine memory bound to a revoked credential scope ---
  async quarantineCredentialMemory(credentialScope: string): Promise<{ quarantined: number }> {
    if (!scopesEnabled()) return { quarantined: 0 };
    const scope = credentialScope.trim();
    if (!scope) return { quarantined: 0 };
    const rows = readTable<FactRow>("extracted_facts");
    let count = 0;
    for (const row of rows) {
      if ((row.credential_scope ?? null) === scope && !row.quarantined_at) {
        row.quarantined_at = now();
        row.updated_at = now();
        count += 1;
      }
    }
    if (count > 0) writeTable("extracted_facts", rows);
    return { quarantined: count };
  }
  // --- end lane-04 ---

  async supersedeFact(oldId: string, newText: string, category?: string, confidence?: number): Promise<string> {
    const rows = readTable<FactRow>("extracted_facts");
    const old = rows.find((f) => f.id === oldId);
    if (!old) throw new Error(`Fact ${oldId} not found`);

    const newId = uuid();
    old.status = "superseded";
    old.superseded_by = newId;
    old.valid_to = now();
    old.updated_at = now();

    rows.push({
      id: newId,
      fact: newText,
      category: category ?? old.category,
      confidence: confidence ?? 1.0,
      source_session_id: undefined,
      source_type: "manual",
      startup_fact_kind: "durable",
      memory_class: isTypedMemorySplitEnabled() ? "semantic" : undefined,
      status: "active",
      superseded_by: undefined,
      access_count: 0,
      last_accessed: now(),
      decay_tier: "hot",
      valid_from: now(),
      valid_to: undefined,
      created_at: now(),
      updated_at: now(),
      content_hash: memoryWriteGateContentHash(newText),
    });
    writeTable("extracted_facts", rows);
    return newId;
  }

  // --- lane-02: contradiction reconciliation & supersession ---
  async reconcileFact(candidate: FactInput, options: ReconcileOptions = {}): Promise<ReconcileResult> {
    const { isReconcileEnabled, reconcileCandidate } = await import("./reconcile.js");
    if (!isReconcileEnabled()) {
      return { enabled: false, classification: "distinct", decision: "add" };
    }
    const existing: ExistingFact[] = readTable<FactRow>("extracted_facts")
      .filter((f) => f.category === candidate.category && isRecallVisibleFact(f))
      .map((f) => {
        // W3 provenance lands on the fact row via PR #1290; read forward-compatibly.
        const prov = f as FactRow &
          Partial<Pick<ExistingFact, "source_agent_id" | "source_ref" | "receipt_id">>;
        return {
          id: f.id,
          fact: f.fact,
          category: f.category,
          confidence: f.confidence,
          recorded_at: f.created_at,
          valid_from: f.valid_from,
          commit_sha: f.commit_sha,
          pr_number: f.pr_number,
          source_agent_id: prov.source_agent_id,
          source_ref: prov.source_ref,
          receipt_id: prov.receipt_id,
        };
      });

    const result = await reconcileCandidate(
      candidate,
      existing,
      {
        supersede: (oldId, newText, category, confidence) =>
          this.supersedeFact(oldId, newText, category, confidence),
        emit: (event) => this.recordContradiction(event),
        now,
      },
      options
    );

    const { logMemoryLoadEvent } = await import("./instrumentation.js");
    logMemoryLoadEvent({
      tool_name: "memory_reconcile",
      params: { classification: result.classification, decision: result.decision },
    });
    return result;
  }

  /**
   * Flag-gated write-path hook. Cooperates with lane-07's admission gate; kept
   * tiny and additive so the two merge mechanically. Returns a resolved id when
   * reconciliation handled the write, or null to let the normal insert proceed.
   * Never throws.
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

  private recordContradiction(event: ContradictionEvent): void {
    const rows = readTable<ContradictionEvent & { id: string }>("contradiction_events");
    rows.push({ id: uuid(), ...event });
    writeTable("contradiction_events", rows);
  }
  // --- end lane-02 ---

  async logConversation(data: ConversationInput) {
    const rows = readTable<ConversationRow>("conversation_log");
    const id = uuid();
    rows.push({
      id,
      session_id: data.session_id,
      role: data.role,
      content: data.content,
      has_code: data.has_code,
      created_at: now(),
    });
    writeTable("conversation_log", rows);
    return {
      logged: true as const,
      session_id: data.session_id,
      role: data.role,
      receipt_id: id,
    };
  }

  async saveTypedLinkCandidates(
    candidates: MemoryTypedLinkCandidate[]
  ): Promise<SaveTypedLinkCandidatesResult> {
    if (candidates.length === 0) return { saved: 0 };

    const rows = readTable<TypedLinkRow>("memory_typed_links");
    const existing = new Set(rows.map(typedLinkKey));
    let saved = 0;

    for (const candidate of candidates) {
      const row: TypedLinkRow = {
        id: uuid(),
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
        created_at: now(),
      };
      const key = typedLinkKey(row);
      if (existing.has(key)) continue;
      existing.add(key);
      rows.push(row);
      saved += 1;
    }

    if (saved > 0) writeTable("memory_typed_links", rows);
    return { saved };
  }

  async searchTypedLinks(query: string, maxResults: number): Promise<MemoryTypedLinkSearchResult[]> {
    return filterAndRankMemoryTypedLinks(readTable<TypedLinkRow>("memory_typed_links"), query, maxResults);
  }

  // --- lane-09: typed memory split ---
  async addSessionEvent(data: SessionEventInput): Promise<SessionEventWriteResult> {
    const rows = readTable<SessionEventRow>("session_events");
    const id = uuid();
    const memoryClass = normalizeMemoryClass(data.memory_class, "episodic");
    rows.push({
      id,
      session_id: data.session_id,
      memory_class: memoryClass,
      event_kind: data.event_kind ?? "episode",
      content: data.content,
      summary: data.summary,
      payload: data.payload ?? {},
      source_fact_id: data.source_fact_id,
      source_session_summary_id: data.source_session_summary_id,
      created_at: now(),
      updated_at: now(),
    });
    writeTable("session_events", rows);
    return { id, memory_class: memoryClass };
  }

  async listSessionEvents(query: SessionEventQuery = {}): Promise<unknown> {
    const limit = Math.max(1, Math.min(100, query.limit ?? 20));
    const memoryClass = query.memory_class ? normalizeMemoryClass(query.memory_class) : undefined;
    const needle = query.query?.toLowerCase();
    return readTable<SessionEventRow>("session_events")
      .filter((row) => !query.session_id || row.session_id === query.session_id)
      .filter((row) => !memoryClass || row.memory_class === memoryClass)
      .filter((row) => {
        if (!needle) return true;
        const summary = row.summary ?? "";
        return row.content.toLowerCase().includes(needle) || summary.toLowerCase().includes(needle);
      })
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, limit)
      .map((row) => ({
        id: row.id,
        session_id: row.session_id,
        memory_class: row.memory_class,
        event_kind: row.event_kind,
        content: row.content,
        summary: row.summary,
        payload: row.payload,
        source_fact_id: row.source_fact_id,
        source_session_summary_id: row.source_session_summary_id,
        created_at: row.created_at,
      }));
  }
  // --- end lane-09 ---

  async getConversationDetail(sessionId: string): Promise<unknown> {
    return readTable<ConversationRow>("conversation_log")
      .filter((r) => r.session_id === sessionId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map((r) => ({ id: r.id, role: r.role, content: r.content, has_code: r.has_code, created_at: r.created_at }));
  }

  async storeCode(data: CodeInput): Promise<{ id: string }> {
    const id = uuid();
    const rows = readTable<CodeRow>("code_dumps");
    rows.push({
      id,
      session_id: data.session_id,
      language: data.language,
      filename: data.filename,
      content: data.content,
      description: data.description,
      created_at: now(),
    });
    writeTable("code_dumps", rows);
    return { id };
  }

  async getBusinessContext(): Promise<unknown[]> {
    return readTable<BusinessContextRow>("business_context")
      .sort((a, b) => a.category.localeCompare(b.category) || a.key.localeCompare(b.key));
  }

  async setBusinessContext(category: string, key: string, value: unknown, priority?: number): Promise<void> {
    const rows = readTable<BusinessContextRow>("business_context");
    const existing = rows.find((r) => r.category === category && r.key === key);
    if (existing) {
      existing.value = value;
      existing.last_accessed = now();
      existing.decay_tier = "hot";
      existing.updated_at = now();
      if (priority !== undefined) existing.priority = priority;
    } else {
      rows.push({
        id: uuid(),
        category,
        key,
        value,
        priority: priority ?? 0,
        access_count: 0,
        last_accessed: now(),
        decay_tier: "hot",
        created_at: now(),
        updated_at: now(),
      });
    }
    writeTable("business_context", rows);
  }

  async upsertLibraryDoc(data: LibraryDocInput): Promise<string> {
    const docs = readTable<KnowledgeRow>("knowledge_library");
    const existing = docs.find((d) => d.slug === data.slug);

    if (existing) {
      // Archive old version
      const history = readTable<KnowledgeHistoryRow>("knowledge_library_history");
      history.push({
        id: uuid(),
        library_id: existing.id,
        title: existing.title,
        content: existing.content,
        version: existing.version,
        changed_at: now(),
      });
      writeTable("knowledge_library_history", history);

      // Update
      existing.title = data.title;
      existing.category = data.category;
      existing.content = data.content;
      existing.tags = data.tags;
      existing.version += 1;
      existing.last_accessed = now();
      existing.decay_tier = "hot";
      existing.updated_at = now();
      writeTable("knowledge_library", docs);
      return `Library doc updated: "${data.title}" (v${existing.version})`;
    } else {
      docs.push({
        id: uuid(),
        title: data.title,
        slug: data.slug,
        category: data.category,
        content: data.content,
        tags: data.tags,
        version: 1,
        access_count: 0,
        last_accessed: now(),
        decay_tier: "hot",
        created_at: now(),
        updated_at: now(),
      });
      writeTable("knowledge_library", docs);
      return `Library doc created: "${data.title}" (v1)`;
    }
  }

  async refreshTaxonomySnapshots(
    options: MemoryTaxonomySnapshotWriteOptions = {}
  ): Promise<MemoryTaxonomySnapshotWriteResult> {
    const maxSources = Math.max(1, Math.min(250, options.max_sources ?? 80));
    const facts: MemoryTaxonomySnapshotSource[] = readTable<FactRow>("extracted_facts")
      .filter((fact) => fact.status === "active" && factVisibleAt(fact) && startupFactPenalty(fact) < 2)
      .sort((a, b) => b.confidence - a.confidence || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, maxSources)
      .map((fact) => ({
        id: fact.id,
        kind: "fact" as const,
        text: fact.fact,
        category: fact.category,
        confidence: fact.confidence,
        created_at: fact.created_at,
        updated_at: fact.updated_at,
      }));
    const sessions: MemoryTaxonomySnapshotSource[] = readTable<SessionRow>("session_summaries")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, Math.max(1, Math.floor(maxSources / 2)))
      .map((session) => ({
        id: session.id,
        kind: "session" as const,
        text: session.summary,
        category: session.topics.join(" ") || "session",
        confidence: 0.75,
        created_at: session.created_at,
        updated_at: session.created_at,
      }));

    return writeMemoryTaxonomySnapshotsToLibrary({
      sources: [...facts, ...sessions],
      options,
      upsertLibraryDoc: (doc) => this.upsertLibraryDoc(doc),
    });
  }

  async manageDecay(): Promise<unknown> {
    const threshold = {
      hot_to_warm: 21 * 24 * 60 * 60 * 1000,   // 21 days
      warm_to_cold: 60 * 24 * 60 * 60 * 1000,   // 60 days
      bc_hot_to_warm: 30 * 24 * 60 * 60 * 1000,  // 30 days
      bc_warm_to_cold: 90 * 24 * 60 * 60 * 1000,  // 90 days
    };
    const nowMs = Date.now();
    let bcDecayed = 0;
    let klDecayed = 0;
    let efDecayed = 0;

    // Business context
    const bc = readTable<BusinessContextRow>("business_context");
    for (const row of bc) {
      const age = nowMs - new Date(row.last_accessed).getTime();
      if (row.decay_tier === "hot" && age > threshold.bc_hot_to_warm) { row.decay_tier = "warm"; bcDecayed++; }
      if (row.decay_tier !== "cold" && age > threshold.bc_warm_to_cold) { row.decay_tier = "cold"; bcDecayed++; }
    }
    writeTable("business_context", bc);

    // Knowledge library
    const kl = readTable<KnowledgeRow>("knowledge_library");
    for (const row of kl) {
      const age = nowMs - new Date(row.last_accessed).getTime();
      if (row.decay_tier === "hot" && age > threshold.bc_hot_to_warm) { row.decay_tier = "warm"; klDecayed++; }
      if (row.decay_tier !== "cold" && age > threshold.bc_warm_to_cold) { row.decay_tier = "cold"; klDecayed++; }
    }
    writeTable("knowledge_library", kl);

    // Facts
    const ef = readTable<FactRow>("extracted_facts");
    for (const row of ef) {
      if (row.status !== "active") continue;
      const age = nowMs - new Date(row.last_accessed).getTime();
      if (row.decay_tier === "hot" && age > threshold.hot_to_warm) { row.decay_tier = "warm"; efDecayed++; }
      if (row.decay_tier !== "cold" && age > threshold.warm_to_cold) { row.decay_tier = "cold"; efDecayed++; }
    }
    writeTable("extracted_facts", ef);

    return {
      ran_at: now(),
      business_context_decayed: bcDecayed,
      knowledge_library_decayed: klDecayed,
      extracted_facts_decayed: efDecayed,
    };
  }

  // --- lane-08: decay and consolidation ---
  async manageDecayV2(options: MemoryDecayOptions = {}): Promise<MemoryDecayPlan> {
    const rows = readTable<FactRow>("extracted_facts");
    const plan = buildMemoryDecayPlan(rows, options);
    if (!options.dry_run) {
      const byId = new Map(rows.map((row) => [row.id, row]));
      for (const patch of plan.patches) {
        const row = byId.get(patch.id);
        if (!row) continue;
        row.confidence = patch.confidence ?? row.confidence;
        row.status = patch.status ?? row.status;
        row.decay_tier = patch.decay_tier ?? row.decay_tier;
        row.effective_score = patch.effective_score ?? row.effective_score;
        row.decayed_confidence = patch.decayed_confidence ?? row.decayed_confidence;
        row.heat_score = patch.heat_score ?? row.heat_score;
        row.last_decay_at = patch.last_decay_at ?? row.last_decay_at;
        row.decay_reason = patch.decay_reason ?? row.decay_reason;
        row.archived_at = patch.archived_at === undefined ? row.archived_at : patch.archived_at;
        row.updated_at = patch.updated_at ?? row.updated_at;
      }
      writeTable("extracted_facts", rows);
    }
    return plan;
  }

  async consolidateMemory(options: MemoryConsolidationOptions = {}): Promise<MemoryConsolidationPlan> {
    const rows = readTable<FactRow>("extracted_facts");
    const plan = buildMemoryConsolidationPlan(rows, options);
    if (!options.dry_run) {
      const byId = new Map(rows.map((row) => [row.id, row]));
      for (const patch of plan.patches) {
        const row = byId.get(patch.id);
        if (!row) continue;
        row.fact = patch.fact ?? row.fact;
        row.confidence = patch.confidence ?? row.confidence;
        row.status = patch.status ?? row.status;
        row.superseded_by = patch.superseded_by === undefined ? row.superseded_by : patch.superseded_by;
        row.valid_to = patch.valid_to === undefined ? row.valid_to : patch.valid_to;
        row.decay_tier = patch.decay_tier ?? row.decay_tier;
        row.consolidation_group_id = patch.consolidation_group_id ?? row.consolidation_group_id;
        row.consolidation_receipt = patch.consolidation_receipt ?? row.consolidation_receipt;
        row.updated_at = patch.updated_at ?? row.updated_at;
      }
      writeTable("extracted_facts", rows);
    }
    return plan;
  }
  // --- end lane-08 ---

  async getMemoryStatus(): Promise<unknown> {
    const tables = ["business_context", "knowledge_library", "session_summaries", "extracted_facts", "session_events", "conversation_log", "code_dumps"] as const;
    const counts: Record<string, number> = {};
    for (const t of tables) {
      counts[t] = readTable(t).length;
    }

    const facts = readTable<FactRow>("extracted_facts").filter((f) => f.status === "active");
    const tiers = { hot: 0, warm: 0, cold: 0 };
    for (const f of facts) {
      tiers[f.decay_tier as keyof typeof tiers]++;
    }

    return {
      mode: "local",
      data_dir: dataDir(),
      table_counts: counts,
      fact_decay_tiers: tiers,
    };
  }

  async invalidateFact(_input: InvalidateFactInput): Promise<{ invalidated_at: string }> {
    const rows = readTable<FactRow>("extracted_facts");
    const fact = rows.find((row) => row.id === _input.fact_id);
    if (!fact) throw new Error(`Fact ${_input.fact_id} not found`);

    const invalidatedAt = now();
    fact.invalidated_at = invalidatedAt;
    fact.valid_to = invalidatedAt;
    fact.invalidation_reason = _input.reason;
    fact.invalidated_by_session_id = _input.session_id;
    fact.updated_at = invalidatedAt;
    writeTable("extracted_facts", rows);
    return { invalidated_at: invalidatedAt };
  }

  // --- lane-05: true-forget (MEMORY_HARD_FORGET_ENABLED) ---
  async forgetMemory(input: ForgetInput): Promise<ForgetReceipt> {
    const rows = readTable<FactRow>("extracted_facts");
    const fact = rows.find((row) => row.id === input.fact_id);
    if (!fact) throw new Error(`Fact ${input.fact_id} not found`);

    const originalText = fact.fact;
    const forgottenAt = now();

    // 1. Tombstone the fact row: move it out of every status='active' read path,
    //    invalidate it bi-temporally, and scrub the stored content so it cannot
    //    be recovered. The id and the forgotten_at marker remain for audit.
    fact.status = "forgotten";
    fact.invalidated_at = forgottenAt;
    fact.valid_to = forgottenAt;
    fact.invalidation_reason = input.reason;
    fact.invalidated_by_session_id = input.session_id;
    fact.forgotten_at = forgottenAt;
    fact.forgotten_reason = input.reason;
    fact.fact = FORGOTTEN_TOMBSTONE_TEXT;
    fact.decay_tier = "cold";
    fact.updated_at = forgottenAt;
    writeTable("extracted_facts", rows);

    // 2. Delete typed links derived from this fact.
    const links = readTable<TypedLinkRow>("memory_typed_links");
    const keptLinks = links.filter(
      (row) => !(row.source_id === input.fact_id && row.source_kind === "fact")
    );
    const typedLinksDeleted = links.length - keptLinks.length;
    if (typedLinksDeleted > 0) writeTable("memory_typed_links", keptLinks);

    // 2b. Sweep Worker 9's episodic store: drop session_events linked to the
    //     forgotten fact (source_fact_id) or carrying its verbatim content
    //     (fact_route episodes). No-op when the typed-split store is absent.
    const events = readTable<{ source_fact_id?: string; content?: string }>("session_events");
    const keptEvents = events.filter(
      (row) => !sessionEventBelongsToForgottenFact(row, input.fact_id, originalText)
    );
    const sessionEventsDeleted = events.length - keptEvents.length;
    if (sessionEventsDeleted > 0) writeTable("session_events", keptEvents);

    // 3. Scrub the forgotten fact out of derived taxonomy snapshots.
    const snapshots = await scrubForgottenFactFromSnapshots(this, input.fact_id);

    // 4. Purge library version-history that still embeds the fact pointer, so the
    //    forgotten content is not recoverable from an archived snapshot version.
    const pointer = factSnapshotPointer(input.fact_id);
    const history = readTable<KnowledgeHistoryRow>("knowledge_library_history");
    const keptHistory = history.filter((row) => !(row.content ?? "").includes(pointer));
    const historyPurged = history.length - keptHistory.length;
    if (historyPurged > 0) writeTable("knowledge_library_history", keptHistory);

    // 5. Verify the forgotten fact no longer surfaces in any recall path.
    const verifiedClean =
      snapshots.clean && !(await this.factSurfacesInRecall(input.fact_id, originalText));

    return {
      fact_id: input.fact_id,
      backend: "local",
      forgotten_at: forgottenAt,
      fact_tombstoned: true,
      content_scrubbed: true,
      embedding_cleared: true, // local backend stores no embeddings
      typed_links_deleted: typedLinksDeleted,
      snapshots_regenerated: snapshots.snapshots_regenerated,
      snapshots_neutralized: snapshots.snapshots_neutralized,
      history_entries_purged: historyPurged,
      session_events_deleted: sessionEventsDeleted,
      surfaces_swept: [
        "extracted_facts",
        "memory_typed_links",
        "session_events",
        "knowledge_library(memory_snapshot)",
        "knowledge_library_history",
      ],
      verified_clean: verifiedClean,
    };
  }

  /** Post-forget assertion: the fact id must not appear in fact or recall search. */
  private async factSurfacesInRecall(factId: string, originalText: string): Promise<boolean> {
    const facts = (await this.searchFacts(originalText)) as Array<{ id?: string }>;
    if (facts.some((row) => row?.id === factId)) return true;
    const recall = (await this.searchMemory(originalText, 50)) as Array<{ id?: string }>;
    return recall.some((row) => row?.id === factId);
  }
  // --- end lane-05 ---
  // --- lane-10: eval harness and memory passport ---
  async exportMemoryPassport(input: MemoryPassportExportInput = {}): Promise<MemoryPassportExportResult> {
    const result = buildMemoryPassportBundle({
      ...input,
      source_backend: "local",
      business_context: readTable<Record<string, unknown>>("business_context"),
      facts: readTable<Record<string, unknown>>("extracted_facts"),
      session_summaries: readTable<Record<string, unknown>>("session_summaries"),
    });
    this.recordPassportAudit(result.audit);
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

    const existingFacts = new Set(
      readTable<FactRow>("extracted_facts").map((row) => row.fact.toLowerCase().trim())
    );
    const existingSessions = new Set(
      readTable<SessionRow>("session_summaries").map((row) => `${row.session_id}\n${row.summary}`)
    );

    for (const row of input.bundle.identity.business_context) {
      if (!dryRun) {
        await this.setBusinessContext(row.category, row.key, row.value, row.priority);
      }
      insertedBusinessContext++;
    }

    for (const row of input.bundle.memory.facts) {
      const key = row.fact.toLowerCase().trim();
      if (existingFacts.has(key)) {
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
        existingFacts.add(key);
      }
      insertedFacts++;
    }

    for (const row of input.bundle.memory.session_summaries) {
      const key = `${row.session_id}\n${row.summary}`;
      if (existingSessions.has(key)) {
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
        existingSessions.add(key);
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
    this.recordPassportAudit(result.audit);
    return result;
  }

  private recordPassportAudit(audit: MemoryPassportAuditRecord): void {
    const rows = readTable<PassportAuditRow>("memory_passport_audit");
    rows.push({
      id: uuid(),
      created_at: now(),
      ...audit,
    });
    writeTable("memory_passport_audit", rows);
  }
  // --- end lane-10 ---
}

function typedLinkKey(row: Pick<TypedLinkRow, "source_kind" | "source_id" | "relation" | "target_kind" | "target_text">): string {
  return [row.source_kind, row.source_id, row.relation, row.target_kind, row.target_text.toLowerCase()].join(":");
}
