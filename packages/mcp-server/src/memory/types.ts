import type {
  MemoryConsolidationOptions,
  MemoryConsolidationPlan,
  MemoryDecayOptions,
  MemoryDecayPlan,
} from "./consolidation.js";
import type { MemoryTypedLinkCandidate, MemoryTypedLinkSearchResult } from "./typed-links.js";
import type { MemoryVisibility } from "./scopes.js";

/**
 * Shared types for UnClick Memory backends (local + Supabase).
 */

export interface SessionSummaryInput {
  session_id: string;
  summary: string;
  topics: string[];
  open_loops: string[];
  decisions: string[];
  platform: string;
  duration_minutes?: number;
}

export interface FactInput {
  fact: string;
  category: string;
  confidence: number;
  source_session_id?: string;
  startup_fact_kind?: StartupFactKind;
  // --- lane-09: typed memory split ---
  memory_class?: MemoryClass;
  // --- end lane-09 ---
  // Bi-temporal + provenance (Chunk 2)
  valid_from?: string;
  extractor_id?: string;
  prompt_version?: string;
  model_id?: string;
  preserve_as_blob?: boolean;
  // Git linkage (Anti-Stomp)
  commit_sha?: string;
  pr_number?: number;
  // --- lane-03: provenance & receipts (persisted only when MEMORY_PROVENANCE_ENABLED) ---
  /** Canonical agent-identity column: which agent learned/wrote this fact (owner == source). */
  source_agent_id?: string;
  /** Origin pointer (url / tool-call id / message id / pr / commit). Never a secret. */
  source_ref?: string;
  /** Linkage to an XPass/AnswerPass/conversation receipt, when one exists. */
  receipt_id?: string;
  // --- end lane-03 ---
  // --- lane-04: scopes / credential-aware / boardroom visibility ---
  // Optional row-level scope. Only honored when MEMORY_SCOPES_ENABLED is on.
  // source_agent_id is declared by lane-03 (provenance) and consumed here.
  visibility?: MemoryVisibility | string;
  boardroom_id?: string;
  credential_scope?: string;
  // --- end lane-04 ---
}

export type StartupFactKind = "durable" | "operational" | "excluded" | "legacy_unspecified";

// --- lane-09: typed memory split ---
export type MemoryClass = "episodic" | "semantic" | "procedural" | "task";

export interface SessionEventInput {
  session_id?: string;
  memory_class?: MemoryClass;
  event_kind?: string;
  content: string;
  summary?: string;
  payload?: Record<string, unknown>;
  source_fact_id?: string;
  source_session_summary_id?: string;
}

export interface SessionEventQuery {
  query?: string;
  session_id?: string;
  memory_class?: MemoryClass;
  limit?: number;
}

export interface SessionEventWriteResult {
  id: string;
  memory_class: MemoryClass;
}
// --- end lane-09 ---

export type MemoryProfileCardSourceKind = "business_context" | "fact" | "session_summary";
export type MemoryReceiptRedactionState = "clean" | "redacted" | "sensitive-hidden" | "blocked";

export interface MemoryProfileCardReceipt {
  memory_id: string;
  source_kind: MemoryProfileCardSourceKind;
  source_uri: string;
  confidence?: number;
  redaction_state: MemoryReceiptRedactionState;
  last_verified_at?: string | null;
  // --- lane-03: provenance surfacing (populated only when MEMORY_PROVENANCE_ENABLED) ---
  source_agent_id?: string | null;
  source_ref?: string | null;
  receipt_id?: string | null;
  // --- end lane-03 ---
}

export interface MemoryProfileCard {
  profile_summary: string[];
  working_now: string[];
  do_not_repeat: string[];
  timezone_context?: string;
  memory_health: string[];
  source_receipts: MemoryProfileCardReceipt[];
}

export interface MemoryRetrievalPlanStep {
  step: number;
  layer: string;
  use: string;
}

export interface MemoryRetrievalPlan {
  mode: "cheap_first";
  startup_order: string[];
  steps: MemoryRetrievalPlanStep[];
  source_lookup: string;
  semantic_lookup: string;
}

export interface InvalidateFactInput {
  fact_id: string;
  reason?: string;
  session_id?: string;
}

// --- lane-05: true-forget (MEMORY_HARD_FORGET_ENABLED) ---
/**
 * Input for a hard "forget": tombstone a fact and propagate the deletion to
 * every derived store (embeddings, typed links, taxonomy snapshots, library
 * history). Unlike InvalidateFactInput, which is a soft, reversible hide, a
 * forget scrubs the stored content so it cannot be recovered or re-surfaced.
 */
export interface ForgetInput {
  fact_id: string;
  reason?: string;
  session_id?: string;
}

/**
 * Per-surface receipt describing what a forget swept. This is the contract the
 * eval harness (Worker 10) scores for forget_compliance, so each derived store
 * reports its own result rather than collapsing into a single boolean.
 */
export interface ForgetReceipt {
  fact_id: string;
  backend: "local" | "supabase";
  forgotten_at: string;
  /** The fact row was moved to a non-active, invalidated tombstone state. */
  fact_tombstoned: boolean;
  /** The stored fact text was overwritten with a content-free tombstone marker. */
  content_scrubbed: boolean;
  /** The vector embedding was cleared (always true on backends without embeddings). */
  embedding_cleared: boolean;
  typed_links_deleted: number;
  snapshots_regenerated: number;
  snapshots_neutralized: number;
  history_entries_purged: number;
  /**
   * Episodic rows swept from Worker 9's typed-split episode store
   * (session_events / mc_session_events) for the forgotten fact. 0 when the
   * typed-split store is absent or carried no residue. Optional so receipts
   * built before the episode store existed remain valid.
   */
  session_events_deleted?: number;
  /** Derived surfaces this forget asserted clean, for audit and the metric. */
  surfaces_swept: string[];
  /**
   * True only when a post-sweep re-check confirmed the fact no longer appears in
   * fact search, full recall search, or any live taxonomy snapshot. Drives the
   * forget_compliance metric (must be true for compliance 1.0).
   */
  verified_clean: boolean;
}
// --- end lane-05 ---

export interface ConversationInput {
  session_id: string;
  role: string;
  content: string;
  has_code: boolean;
}

export interface ConversationReceipt {
  logged: true;
  session_id: string;
  role: string;
  receipt_id: string;
}

export interface CodeInput {
  session_id: string;
  language: string;
  filename?: string;
  content: string;
  description?: string;
}

export interface LibraryDocInput {
  slug: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
}

export interface SaveTypedLinkCandidatesResult {
  saved: number;
  skipped?: "schema_unavailable" | "persistence_failed";
}

export type MemoryTaxonomySourceKind = "fact" | "session";

export interface MemoryTaxonomySnapshotSource {
  id: string;
  kind: MemoryTaxonomySourceKind;
  text: string;
  category?: string;
  confidence?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  valid_from?: string | null;
}

export interface MemoryTaxonomySnapshotSourceReceipt {
  memory_id: string;
  source_kind: MemoryTaxonomySourceKind;
  source_uri: string;
  confidence?: number | null;
  redaction_state: MemoryReceiptRedactionState;
  last_verified_at?: string | null;
}

export interface MemoryTaxonomySnapshot {
  slug: string;
  title: string;
  primary_category: string;
  secondary_categories: string[];
  sub_tags: string[];
  summary: string;
  content: string;
  source_ids: string[];
  sources: Array<{ id: string; kind: MemoryTaxonomySourceKind }>;
  source_receipts: MemoryTaxonomySnapshotSourceReceipt[];
  confidence: number;
  weight: number;
  last_confirmed_at: string | null;
}

export interface MemoryTaxonomySnapshotWriteOptions {
  dry_run?: boolean;
  max_sources?: number;
  max_snapshots?: number;
  max_sources_per_snapshot?: number;
}

export interface MemoryTaxonomySnapshotWriteResult {
  dry_run: boolean;
  generated_at: string;
  source_count: number;
  snapshot_count: number;
  written_count: number;
  snapshots: Array<{
    slug: string;
    title: string;
    primary_category: string;
    source_ids: string[];
    source_receipts: MemoryTaxonomySnapshotSourceReceipt[];
  }>;
  written: Array<{
    slug: string;
    title: string;
    message: string;
  }>;
}

// --- lane-02: contradiction reconciliation & supersession ---
/** How an incoming fact relates to an existing live fact on the same subject. */
export type ReconciliationClassification =
  | "distinct"        // different subject; no interaction
  | "duplicate"       // same subject, same value (near-identical / subsumed)
  | "refinement"      // same subject, compatible / more-specific value
  | "contradiction";  // same subject, mutually-exclusive value

/** The action taken to resolve an incoming fact against the store. */
export type ReconcileDecision =
  | "add"        // insert as a new fact (distinct, or no live match)
  | "noop"       // drop the incoming write (duplicate of a live fact)
  | "supersede"; // replace the prior fact newest-wins, history preserved

/** One side of a contradiction, carrying provenance through (Worker 3 fields). */
export interface ContradictionParty {
  fact_id?: string;
  fact: string;
  category: string;
  confidence?: number;
  recorded_at?: string;
  valid_from?: string;
  extractor_id?: string;
  model_id?: string;
  prompt_version?: string;
  commit_sha?: string;
  pr_number?: number;
  // W3 provenance (PR #1290): single canonical agent column, owner == source.
  source_agent_id?: string;
  source_ref?: string;
  receipt_id?: string;
}

/** A first-class contradiction event raised for Boardroom / admin visibility. */
export interface ContradictionEvent {
  kind: "memory_contradiction";
  subject: string;
  category: string;
  classification: ReconciliationClassification;
  resolution: ReconcileDecision;
  similarity: number;
  incoming: ContradictionParty;
  existing: ContradictionParty;
  detected_at: string;
  session_id?: string;
}

export interface ReconcileOptions {
  session_id?: string;
  /** Override same-subject / duplicate thresholds (eval-harness tuning). */
  thresholds?: { sameSubject?: number; duplicate?: number };
  /** When true, classify and report but do not supersede or emit. */
  dry_run?: boolean;
}

export interface ReconcileResult {
  /** false when MEMORY_RECONCILE_ENABLED is off (a pass-through no-op). */
  enabled: boolean;
  classification: ReconciliationClassification;
  decision: ReconcileDecision;
  /** id of the live fact that was superseded (decision === "supersede"). */
  superseded_fact_id?: string;
  /** id of the newly written or kept fact. */
  fact_id?: string;
  /** the matched live fact id for duplicate / refinement / contradiction. */
  matched_fact_id?: string;
  similarity?: number;
  contradiction?: ContradictionEvent;
}
// --- end lane-02 ---
// --- lane-07: write-gate admission ---
export type MemoryWriteGateAction = "ADD" | "UPDATE" | "DELETE" | "NOOP" | "ROUTE_EVENT" | "REJECT";

export type MemoryWriteGateRouteTarget = "fact_store" | "episode_store" | "none";

export interface MemoryWriteGateMetrics {
  duplicate_rate: number;
  write_precision: number;
  duplicate_blocked: boolean;
  admitted_to_fact_store: boolean;
}

export interface MemoryWriteGateCandidate {
  id: string;
  fact: string;
  category: string;
  confidence?: number | null;
  content_hash?: string | null;
  created_at?: string | null;
  source?: "fact" | "session" | "conversation" | string;
  final_score?: number | null;
  rrf_score?: number | null;
  kw_score?: number | null;
  cosine_score?: number | null;
  keyword_rank?: number | null;
  vector_rank?: number | null;
}

export interface AdmissionDecision {
  action: MemoryWriteGateAction;
  admitted: boolean;
  reason: string;
  candidate_hash: string;
  candidate_category?: string;
  matched_id?: string;
  matched_hash?: string | null;
  matched_text?: string;
  similarity?: number;
  route_target?: MemoryWriteGateRouteTarget;
  cool_down_seconds?: number;
  metrics: MemoryWriteGateMetrics;
}
// --- end lane-07 ---

export type MemoryPassportStartupFactKind = "durable" | "operational" | "excluded" | "legacy_unspecified";

export interface MemoryPassportBusinessContextRecord {
  category: string;
  key: string;
  value: unknown;
  priority: number;
  created_at?: string;
  updated_at?: string;
}

export interface MemoryPassportFactRecord {
  id?: string;
  fact: string;
  category: string;
  confidence: number;
  source_session_id?: string | null;
  source_type?: string;
  startup_fact_kind?: MemoryPassportStartupFactKind;
  status?: string;
  superseded_by?: string | null;
  invalidated_at?: string | null;
  invalidation_reason?: string | null;
  invalidated_by_session_id?: string | null;
  valid_from?: string | null;
  valid_to?: string | null;
  created_at?: string;
  updated_at?: string;
  extractor_id?: string | null;
  prompt_version?: string | null;
  model_id?: string | null;
  commit_sha?: string | null;
  pr_number?: number;
  source_agent_id?: string | null;
  source_ref?: string | null;
  receipt_id?: string | null;
}

export interface MemoryPassportSessionRecord {
  session_id: string;
  summary: string;
  topics: string[];
  open_loops: string[];
  decisions: string[];
  platform: string;
  duration_minutes?: number;
  created_at?: string;
}

export interface MemoryPassportSignature {
  algorithm: "hmac-sha256";
  key_id: string;
  value: string;
}

export interface MemoryPassportBundle {
  version: "memory-passport-v1";
  exported_at: string;
  subject_id?: string;
  source_backend: "local" | "supabase";
  identity: {
    business_context: MemoryPassportBusinessContextRecord[];
  };
  memory: {
    facts: MemoryPassportFactRecord[];
    session_summaries: MemoryPassportSessionRecord[];
  };
  summary: {
    exported_records: number;
    redacted_records: number;
  };
  signature: MemoryPassportSignature;
}

export interface MemoryPassportMetrics {
  passport_roundtrip_fidelity: number | null;
  passport_credential_leakage: number;
}

export interface MemoryPassportAuditRecord {
  operation: "export" | "import";
  bundle_version: string;
  signature_digest: string;
  exported_records: number;
  imported_records: number;
  redacted_records: number;
  credential_leakage: number;
}

export interface MemoryPassportExportInput {
  subject_id?: string;
  include_sessions?: boolean;
  signing_secret?: string;
}

export interface MemoryPassportExportResult {
  bundle: MemoryPassportBundle;
  metrics: MemoryPassportMetrics;
  audit: MemoryPassportAuditRecord;
}

export interface MemoryPassportImportInput {
  bundle: MemoryPassportBundle;
  dry_run?: boolean;
  signing_secret?: string;
  source_session_id?: string;
}

export interface MemoryPassportImportResult {
  imported: boolean;
  dry_run: boolean;
  inserted_facts: number;
  inserted_business_context: number;
  inserted_sessions: number;
  skipped_existing: number;
  metrics: MemoryPassportMetrics;
  audit: MemoryPassportAuditRecord;
}

export interface MemoryBackend {
  /** Load startup context (business context + recent sessions + hot facts). */
  getStartupContext(numSessions: number): Promise<unknown>;

  /** Full-text / hybrid search across facts and session summaries. */
  searchMemory(query: string, maxResults: number, asOf?: string): Promise<unknown>;

  /** Search extracted facts. */
  searchFacts(query: string): Promise<unknown>;

  /** Search knowledge library. */
  searchLibrary(query: string): Promise<unknown>;

  /** Get a specific library doc by slug. */
  getLibraryDoc(slug: string): Promise<unknown>;

  /** List all library documents. */
  listLibrary(): Promise<unknown>;

  /** Write end-of-session summary. */
  writeSessionSummary(data: SessionSummaryInput): Promise<{ id: string }>;

  /** Add an extracted fact. */
  addFact(data: FactInput): Promise<{ id: string }>;

  /** Replace a fact with a new version. */
  supersedeFact(oldId: string, newText: string, category?: string, confidence?: number): Promise<string>;

  /** Log a conversation message. */
  logConversation(data: ConversationInput): Promise<ConversationReceipt>;

  /** Persist deterministic typed-link candidates extracted from Memory writes. */
  saveTypedLinkCandidates(candidates: MemoryTypedLinkCandidate[]): Promise<SaveTypedLinkCandidatesResult>;

  /** Search persisted typed links extracted from Memory writes. */
  searchTypedLinks(query: string, maxResults: number): Promise<MemoryTypedLinkSearchResult[]>;

  /** Get full conversation log for a session. */
  getConversationDetail(sessionId: string): Promise<unknown>;

  /** Store a code block. */
  storeCode(data: CodeInput): Promise<{ id: string }>;

  /** Get all business context entries. */
  getBusinessContext(): Promise<unknown[]>;

  /** Set or update a business context entry. */
  setBusinessContext(category: string, key: string, value: unknown, priority?: number): Promise<void>;

  /** Create or update a knowledge library doc. */
  upsertLibraryDoc(data: LibraryDocInput): Promise<string>;

  /** Build and store source-linked taxonomy snapshots in the Library. */
  refreshTaxonomySnapshots(options?: MemoryTaxonomySnapshotWriteOptions): Promise<MemoryTaxonomySnapshotWriteResult>;

  /** Run memory decay management. */
  manageDecay(): Promise<unknown>;

  /** Get memory usage stats. */
  getMemoryStatus(): Promise<unknown>;

  /** Mark a fact as invalidated (does not delete it). Writes an audit row. */
  invalidateFact(input: InvalidateFactInput): Promise<{ invalidated_at: string }>;

  // --- lane-09: typed memory split ---
  /** Store an episodic memory outside the atomic fact index. */
  addSessionEvent(data: SessionEventInput): Promise<SessionEventWriteResult>;

  /** Search or list episodic memory explicitly. */
  listSessionEvents(query?: SessionEventQuery): Promise<unknown>;
  // --- end lane-09 ---
  // --- lane-08: decay and consolidation ---
  manageDecayV2(options?: MemoryDecayOptions): Promise<MemoryDecayPlan>;
  consolidateMemory(options?: MemoryConsolidationOptions): Promise<MemoryConsolidationPlan>;
  // --- end lane-08 ---
  // --- lane-04: scopes / credential-aware memory ---
  /**
   * Quarantine every fact bound to a credential scope (for example on
   * keychain_disconnect). Quarantined facts never surface in recall. No-op
   * unless MEMORY_SCOPES_ENABLED is on. Returns the number quarantined.
   */
  quarantineCredentialMemory(credentialScope: string): Promise<{ quarantined: number }>;
  // --- end lane-04 ---
  // --- lane-02: contradiction reconciliation & supersession ---
  /**
   * Reconcile an incoming fact against existing live facts on the same subject.
   * Newest-wins supersession with history preserved; a genuine contradiction
   * raises exactly one contradiction event. Flag-gated by
   * MEMORY_RECONCILE_ENABLED; a disabled call returns an "distinct"/"add" no-op.
   */
  reconcileFact(candidate: FactInput, options?: ReconcileOptions): Promise<ReconcileResult>;
  // --- end lane-02 ---
  // --- lane-07: write-gate admission ---
  admitWrite(candidate: FactInput): Promise<AdmissionDecision>;
  // --- end lane-07 ---
  // --- lane-05: true-forget (MEMORY_HARD_FORGET_ENABLED) ---
  /**
   * Hard-forget a fact: tombstone the row, scrub its content, and propagate the
   * deletion through every derived store (embeddings, typed links, taxonomy
   * snapshots, library history). Distinct from invalidateFact, which only hides
   * a fact from recall while keeping its content for audit/supersession.
   */
  forgetMemory(input: ForgetInput): Promise<ForgetReceipt>;
  // --- end lane-05 ---
  // --- lane-10: eval harness and memory passport ---
  exportMemoryPassport(input?: MemoryPassportExportInput): Promise<MemoryPassportExportResult>;
  importMemoryPassport(input: MemoryPassportImportInput): Promise<MemoryPassportImportResult>;
  // --- end lane-10 ---
}

// --- lane-01: retrieval fusion (read path) ---
/**
 * Source a search hit came from. Lane-01 adds "business_context" so standing
 * rules / identity are searchable, not just always-loaded at startup.
 */
export type MemorySearchSource = "fact" | "session" | "conversation" | "business_context";

/**
 * Canonical search-result row emitted by searchMemory in both backends and
 * scored by Worker 10's eval harness. The keyword/RRF score fields
 * (final_score / rrf_score / kw_score / cosine_score) are already produced
 * today; lane-01 adds business_context as a source plus the ordering inputs.
 * effective_score is supplied by lane-08 (decay) when available; lane-01 orders
 * on it when present and degrades to final_score when absent.
 */
export interface MemorySearchResultRow {
  id: string;
  source: MemorySearchSource;
  content: string;
  category: string;
  confidence: number;
  created_at: string;
  final_score: number;
  rrf_score: number;
  kw_score: number;
  cosine_score: number;
  /** 1-based rank in the keyword lane (lane-06 ranking contract; null when absent). */
  keyword_rank?: number | null;
  /** 1-based rank in the vector / semantic lane (lane-06 ranking contract; null when absent). */
  vector_rank?: number | null;
  /** Scope-precedence weight applied to final_score (lane-01 ordering, Gap 7). */
  scope_weight?: number;
  /** Decay-derived effective score (lane-08); lane-01 orders on it when present. */
  effective_score?: number;
}
// --- end lane-01 ---
