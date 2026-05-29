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
  ConversationInput,
  CodeInput,
  LibraryDocInput,
  MemoryTaxonomySnapshotSource,
  MemoryTaxonomySnapshotWriteOptions,
  MemoryTaxonomySnapshotWriteResult,
  SaveTypedLinkCandidatesResult,
} from "./types.js";
import {
  filterAndRankMemoryTypedLinks,
  type MemoryTypedLinkCandidate,
  type MemoryTypedLinkSearchResult,
  type MemoryTypedLinkStoredRow,
} from "./typed-links.js";
import {
  scoreLocalMemoryContent,
  tokenizeLocalMemoryQuery,
  writeMemoryTaxonomySnapshotsToLibrary,
} from "./supabase.js";

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

interface FactRow {
  id: string;
  fact: string;
  category: string;
  confidence: number;
  source_session_id?: string;
  source_type: string;
  startup_fact_kind: "durable" | "operational" | "excluded" | "legacy_unspecified";
  status: string;
  superseded_by?: string;
  invalidated_at?: string;
  invalidation_reason?: string;
  invalidated_by_session_id?: string;
  access_count: number;
  last_accessed: string;
  decay_tier: string;
  valid_from?: string;
  valid_to?: string;
  created_at: string;
  updated_at: string;
  commit_sha?: string;
  pr_number?: number;
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

interface CodeRow {
  id: string;
  session_id: string;
  language: string;
  filename?: string;
  content: string;
  description?: string;
  created_at: string;
}

function parsedTime(value: string | undefined): number | null {
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
    const bc = readTable<BusinessContextRow>("business_context")
      .filter((r) => r.decay_tier === "hot" || r.decay_tier === "warm")
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

    const sessions = readTable<SessionRow>("session_summaries")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, numSessions);

    const allFacts = readTable<FactRow>("extracted_facts");
    const facts = allFacts
      .filter(isStartupFact)
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
      active_facts: facts.map((f) => ({ fact: f.fact, category: f.category, confidence: f.confidence, created_at: f.created_at })),
      loaded_at: now(),
    };
  }

  async searchMemory(query: string, maxResults: number, asOf?: string): Promise<unknown> {
    const tokens = tokenizeLocalMemoryQuery(query);
    if (tokens.length === 0) return [];

    const facts = readTable<FactRow>("extracted_facts")
      .filter((fact) => isRecallVisibleFact(fact, asOf))
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
          final_score: score.finalScore,
          rrf_score: 0,
          kw_score: score.matchedTokenCount,
          cosine_score: 0,
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
          final_score: score.finalScore,
          rrf_score: 0,
          kw_score: score.matchedTokenCount,
          cosine_score: 0,
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
          final_score: score.finalScore,
          rrf_score: 0,
          kw_score: score.matchedTokenCount,
          cosine_score: 0,
        };
      });

    return [...facts, ...sessions, ...conversations]
      .filter((row) => row.final_score > 0)
      .sort((a, b) => {
        const scoreDiff = b.final_score - a.final_score;
        return scoreDiff !== 0 ? scoreDiff : b.created_at.localeCompare(a.created_at);
      })
      .slice(0, maxResults);
  }

  async searchFacts(query: string): Promise<unknown> {
    return readTable<FactRow>("extracted_facts")
      .filter((f) => isRecallVisibleFact(f) && matches(f.fact, query))
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

  async addFact(data: FactInput): Promise<{ id: string }> {
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
      status: "active",
      superseded_by: undefined,
      access_count: 0,
      last_accessed: now(),
      decay_tier: "hot",
      valid_from: data.valid_from ?? now(),
      valid_to: undefined,
      created_at: now(),
      updated_at: now(),
      commit_sha: data.commit_sha,
      pr_number: data.pr_number,
    });
    writeTable("extracted_facts", rows);
    return { id };
  }

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
      status: "active",
      superseded_by: undefined,
      access_count: 0,
      last_accessed: now(),
      decay_tier: "hot",
      valid_from: now(),
      valid_to: undefined,
      created_at: now(),
      updated_at: now(),
    });
    writeTable("extracted_facts", rows);
    return newId;
  }

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

  async getMemoryStatus(): Promise<unknown> {
    const tables = ["business_context", "knowledge_library", "session_summaries", "extracted_facts", "conversation_log", "code_dumps"] as const;
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
}

function typedLinkKey(row: Pick<TypedLinkRow, "source_kind" | "source_id" | "relation" | "target_kind" | "target_text">): string {
  return [row.source_kind, row.source_id, row.relation, row.target_kind, row.target_text.toLowerCase()].join(":");
}
