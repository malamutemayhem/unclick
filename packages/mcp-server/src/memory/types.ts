import type { MemoryTypedLinkCandidate, MemoryTypedLinkSearchResult } from "./typed-links.js";

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
  // Bi-temporal + provenance (Chunk 2)
  valid_from?: string;
  extractor_id?: string;
  prompt_version?: string;
  model_id?: string;
  preserve_as_blob?: boolean;
  // Git linkage (Anti-Stomp)
  commit_sha?: string;
  pr_number?: number;
}

export type StartupFactKind = "durable" | "operational" | "excluded" | "legacy_unspecified";

export type MemoryProfileCardSourceKind = "business_context" | "fact" | "session_summary";
export type MemoryReceiptRedactionState = "clean" | "redacted" | "sensitive-hidden" | "blocked";

export interface MemoryProfileCardReceipt {
  memory_id: string;
  source_kind: MemoryProfileCardSourceKind;
  source_uri: string;
  confidence?: number;
  redaction_state: MemoryReceiptRedactionState;
  last_verified_at?: string | null;
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

  // --- lane-02: contradiction reconciliation & supersession ---
  /**
   * Reconcile an incoming fact against existing live facts on the same subject.
   * Newest-wins supersession with history preserved; a genuine contradiction
   * raises exactly one contradiction event. Flag-gated by
   * MEMORY_RECONCILE_ENABLED; a disabled call returns an "distinct"/"add" no-op.
   */
  reconcileFact(candidate: FactInput, options?: ReconcileOptions): Promise<ReconcileResult>;
  // --- end lane-02 ---
}
