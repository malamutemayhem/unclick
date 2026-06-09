/**
 * Memory operation handlers for @unclick/mcp-server.
 *
 * Wraps the 18 memory operations (get_startup_context, search_memory, add_fact,
 * write_session_summary, etc.) as plain async functions that take a single
 * params object. Used by both direct MCP tools and the unclick_call meta-tool.
 */

import { getBackend, getBackendCacheMetrics } from "./db.js";
import {
  buildCapabilityBriefing,
  buildToolGuidance,
  classifyTools,
  reportToolDetections,
} from "./tool-awareness.js";
import { resolveAgent, filterContextByLayers } from "./agent.js";
import { triggerSessionInspection } from "./session-inspection-trigger.js";
import { emitSignal } from "../signals/emit.js";
import { buildSearchMemoryCard } from "../cards/search-memory-card.js";
import { extractMemoryTypedLinkCandidates } from "./typed-links.js";
import { isTypedMemorySplitEnabled, normalizeMemoryClass } from "./typed-memory.js";
import {
  autoCaptureFromTurn,
  codeAutoCaptureEnabled,
  libraryAutoCaptureEnabled,
} from "./auto-capture.js";
import {
  isFlagEnabled,
  MEMORY_CONSOLIDATION_FLAG,
  MEMORY_DECAY_V2_FLAG,
} from "./consolidation.js";
import { recordMemoryMetric, logMemoryLoadEvent } from "./instrumentation.js";
import { isHardForgetEnabled, forgetComplianceScore } from "./forget.js";
import {
  isCorrectionsEnabled,
  CORRECTIONS_CATEGORY,
  CORRECTION_PRIORITY,
  MAX_CORRECTION_LINES,
  correctionKey,
  buildCorrectionValue,
  buildCorrectionDoNotRepeatLines,
  selectRelevantCorrections,
  countCorrections,
  emitCorrectionConsultMetric,
} from "./corrections.js";
import { isMemoryPassportEnabled, MEMORY_PASSPORT_FLAG } from "./passport.js";
import type {
  MemoryBackend,
  MemoryPassportBundle,
  MemoryProfileCard,
  MemoryProfileCardReceipt,
  MemoryProfileCardSourceKind,
  MemoryRetrievalPlan,
  MemoryReceiptRedactionState,
  SaveTypedLinkCandidatesResult,
  AdmissionDecision,
} from "./types.js";
import type { MemoryWriteGateResultSourceKind } from "./write-gate.js";
import type { MemoryTypedLinkSourceKind } from "./typed-links.js";
import { receiptProvenanceFields } from "./provenance.js";

function currentApiKeyHash(): string | null {
  return process.env.UNCLICK_API_KEY_HASH ?? null;
}

type Args = Record<string, unknown>;

// --- lane-07: write-gate admission ---
type AddFactResultWithGate = {
  id: string;
  write_gate?: AdmissionDecision;
  source_kind?: MemoryWriteGateResultSourceKind;
};
// --- end lane-07 ---

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function num(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function arr(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

function bool(v: unknown, fallback = false): boolean {
  return typeof v === "boolean" ? v : fallback;
}

function memoryPassportSigningSecret(): string | undefined {
  return process.env.MEMORY_PASSPORT_SIGNING_SECRET;
}

function capText(text: string, max: number): string {
  return text.length > max
    ? `${text.slice(0, max)}...[truncated, call search_memory for full]`
    : text;
}

function compactJsonValue(value: unknown, max = 500): unknown {
  if (typeof value === "string") return capText(value, max);
  if (value === null || typeof value !== "object") return value;
  const serialized = JSON.stringify(value);
  return serialized.length > max ? capText(serialized, max) : value;
}

function compactStringArray(value: unknown, limit = 5, max = 120): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.slice(0, limit).map((item) => capText(String(item), max));
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function hasInvalidatedAtSet(value: unknown): boolean {
  const row = asRecord(value);
  if (!row || !("invalidated_at" in row)) return false;
  return row.invalidated_at !== null && row.invalidated_at !== undefined && row.invalidated_at !== "";
}

function factTimestamp(value: unknown): number {
  const row = asRecord(value);
  if (!row || typeof row.created_at !== "string") return 0;
  const parsed = Date.parse(row.created_at);
  return Number.isFinite(parsed) ? parsed : 0;
}

function factConfidence(value: unknown): number {
  const row = asRecord(value);
  return row && typeof row.confidence === "number" && Number.isFinite(row.confidence)
    ? row.confidence
    : 0;
}

function textMatchesOperationalSelfReport(text: string): boolean {
  const normalized = text.toLowerCase();
  const exactSignals = [
    "no fishbowl write tools",
    "testpass_cron_user_id",
    "heartbeat",
    "self-report",
    "self report",
  ];
  if (exactSignals.some((signal) => normalized.includes(signal))) return true;
  if (normalized.includes("cron") && normalized.includes("resolved")) return true;
  if (normalized.includes("signal") && normalized.includes("blocked")) return true;
  return false;
}

function activeFactPenalty(value: unknown): number {
  const row = asRecord(value);
  if (!row) return 0;

  // Startup payloads still strip most provenance, so rank-time demotion needs
  // to honor explicit markers when present and fall back to content heuristics.
  if (typeof row.startup_fact_kind === "string") {
    if (row.startup_fact_kind === "durable") return 0;
    if (row.startup_fact_kind === "operational" || row.startup_fact_kind === "excluded") return 1;
  }

  if (typeof row.source_type === "string") {
    const sourceType = row.source_type.toLowerCase();
    if (
      sourceType.includes("heartbeat") ||
      sourceType.includes("self_report") ||
      sourceType.includes("self-report") ||
      sourceType.includes("cron") ||
      sourceType.includes("system")
    ) {
      return 1;
    }
  }

  if (typeof row.fact === "string" && textMatchesOperationalSelfReport(row.fact)) return 1;
  if (typeof row.category === "string" && textMatchesOperationalSelfReport(row.category)) return 1;
  return 0;
}

function isEligibleStartupFact(value: unknown): boolean {
  return activeFactPenalty(value) === 0;
}

const PROFILE_CARD_SOURCE_PATHS: Record<MemoryProfileCardSourceKind, string> = {
  business_context: "/admin/memory?tab=business-context",
  fact: "/admin/memory?tab=facts",
  session_summary: "/admin/memory?tab=sessions",
};

const SENSITIVE_MEMORY_PATTERN = /\b(secret|token|password|credential|private key|api[_ -]?key|plaintext)\b/i;
const GUARDRAIL_PATTERN = /\b(do not|don't|never|avoid|blocked|blocker|owner auth|human decision|no secrets|no billing|no dns|no production deploy)\b/i;
const CURRENT_WORK_PATTERN = /\b(active|current|now|todo|job|pr|blocker|blocked|next|in progress|priority|scope)\b/i;
const MEMORY_REDACTION_STATES = new Set<MemoryReceiptRedactionState>([
  "clean",
  "redacted",
  "sensitive-hidden",
  "blocked",
]);

function stringifyForProfile(value: unknown, max = 120): string {
  if (typeof value === "string") return capText(value, max);
  if (value === null || value === undefined) return "";
  if (typeof value !== "object") return capText(String(value), max);
  try {
    return capText(JSON.stringify(value), max);
  } catch {
    return "";
  }
}

function hasSensitiveMemorySignal(...values: unknown[]): boolean {
  return values.some((value) => SENSITIVE_MEMORY_PATTERN.test(stringifyForProfile(value, 300)));
}

function compactProfileLine(line: string, max = 160): string {
  return capText(line.replace(/\s+/g, " ").trim(), max);
}

function profileRowId(
  row: Record<string, unknown>,
  sourceKind: MemoryProfileCardSourceKind,
  index: number
): string {
  const rawId =
    str(row.id) ||
    str(row.fact_id) ||
    str(row.session_id) ||
    str(row.slug) ||
    str(row.key) ||
    `${sourceKind}-${index}`;
  return compactProfileLine(`${sourceKind}:${rawId}`, 100);
}

function profileReceipt(
  row: Record<string, unknown>,
  sourceKind: MemoryProfileCardSourceKind,
  index: number
): MemoryProfileCardReceipt {
  const memoryId = profileRowId(row, sourceKind, index);
  const receipt: MemoryProfileCardReceipt = {
    memory_id: memoryId,
    source_kind: sourceKind,
    source_uri: PROFILE_CARD_SOURCE_PATHS[sourceKind],
    redaction_state: "clean",
  };
  if (typeof row.redaction_state === "string" && MEMORY_REDACTION_STATES.has(row.redaction_state as MemoryReceiptRedactionState)) {
    receipt.redaction_state = row.redaction_state as MemoryReceiptRedactionState;
  }
  const lastVerified = str(row.last_verified_at) || str(row.updated_at) || str(row.created_at);
  if (lastVerified) receipt.last_verified_at = lastVerified;
  if (typeof row.confidence === "number" && Number.isFinite(row.confidence)) {
    receipt.confidence = row.confidence;
  }
  // --- lane-03: surface provenance on the receipt (flag-gated; honours redaction_state) ---
  const provenance = receiptProvenanceFields(row, receipt.redaction_state);
  if (provenance) Object.assign(receipt, provenance);
  // --- end lane-03 ---
  return receipt;
}

function businessProfileScore(row: Record<string, unknown>): number {
  const category = str(row.category).toLowerCase();
  const key = str(row.key).toLowerCase();
  const priority = num(row.priority, 0);
  let score = priority;
  if (category.includes("identity") || key.includes("identity")) score += 8;
  if (category.includes("preference") || key.includes("preference")) score += 6;
  if (category.includes("workflow") || key.includes("workflow")) score += 6;
  if (category.includes("rule") || key.includes("rule")) score += 5;
  if (category.includes("context") || key.includes("context")) score += 3;
  if (category.includes("timezone") || key.includes("timezone")) score -= 2;
  return score;
}

function businessProfileLine(row: Record<string, unknown>): string | null {
  if (hasSensitiveMemorySignal(row.category, row.key, row.value)) return null;
  const category = str(row.category, "context");
  const key = str(row.key, "item");
  const value = stringifyForProfile(row.value, 50);
  return compactProfileLine(value ? `${category}/${key}: ${value}` : `${category}/${key}`, 96);
}

function factProfileLine(row: Record<string, unknown>): string | null {
  if (typeof row.fact !== "string" || hasSensitiveMemorySignal(row.fact, row.category)) return null;
  const category = str(row.category);
  const prefix = category ? `${category}: ` : "";
  return compactProfileLine(`${prefix}${row.fact}`, 96);
}

function timezoneRowScore(row: Record<string, unknown>): number {
  const valueText = stringifyForProfile(row.value, 400).toLowerCase();
  const key = str(row.key).toLowerCase();
  const category = str(row.category).toLowerCase();
  const haystack = `${category} ${key} ${valueText}`;
  if (!/(timezone|time zone|utc|gmt|operator_timezone|australia\/sydney)/i.test(haystack)) return -1;

  let score = 1;
  if (key === "operator_timezone") score += 10;
  if (key.includes("timezone") || category.includes("timezone")) score += 4;
  const value = asRecord(row.value);
  if (value) {
    if (str(value.source).toLowerCase() === "manual") score += 8;
    if (str(value.timezone) || str(value.tz)) score += 3;
    if (str(value.utc_offset) || str(value.offset)) score += 2;
  }
  return score;
}

function buildTimezoneContext(business: unknown[]): string | undefined {
  const rows = business
    .map((row, index) => ({ row: asRecord(row), index }))
    .filter((item): item is { row: Record<string, unknown>; index: number } => item.row !== null)
    .map((item) => ({ ...item, score: timezoneRowScore(item.row) }))
    .filter((item) => item.score >= 0)
    .sort((left, right) => right.score - left.score || left.index - right.index);

  const chosen = rows[0]?.row;
  if (!chosen || hasSensitiveMemorySignal(chosen.key, chosen.value)) return undefined;

  const value = asRecord(chosen.value);
  if (value) {
    const timezone = str(value.timezone) || str(value.tz);
    const offset = str(value.utc_offset) || str(value.offset);
    const privacy = str(value.privacy) || str(value.privacy_level);
    const source = str(value.source);
    const parts = [
      timezone || stringifyForProfile(chosen.value, 80),
      offset ? `(${offset})` : "",
      privacy ? `privacy ${privacy}` : "",
      source ? `${source} source` : "",
    ].filter(Boolean);
    if (parts.length > 0) return compactProfileLine(`Operator timezone: ${parts.join(", ")}`, 140);
  }

  const label = businessProfileLine(chosen);
  return label ? compactProfileLine(`Operator timezone: ${label}`, 140) : undefined;
}

function uniqueProfileItems<T extends { line: string | null | undefined }>(
  items: T[],
  limit: number
): Array<T & { line: string }> {
  const seen = new Set<string>();
  const out: Array<T & { line: string }> = [];
  for (const item of items) {
    const line = item.line;
    if (!line || seen.has(line)) continue;
    seen.add(line);
    out.push({ ...item, line });
    if (out.length >= limit) break;
  }
  return out;
}

function buildMemoryProfileCard(params: {
  business: unknown[];
  facts: unknown[];
  sessions: unknown[];
  includeSessionSummaries: boolean;
}): MemoryProfileCard {
  const businessRows = params.business
    .map((row, index) => ({ row: asRecord(row), index }))
    .filter((item): item is { row: Record<string, unknown>; index: number } => item.row !== null);
  const factRows = params.facts
    .map((row, index) => ({ row: asRecord(row), index }))
    .filter((item): item is { row: Record<string, unknown>; index: number } => item.row !== null);
  const sessionRows = params.sessions
    .map((row, index) => ({ row: asRecord(row), index }))
    .filter((item): item is { row: Record<string, unknown>; index: number } => item.row !== null);

  const profileSummaryItems = uniqueProfileItems(
    businessRows
      .slice()
      .sort((left, right) => businessProfileScore(right.row) - businessProfileScore(left.row) || left.index - right.index)
      .map((item) => ({
        ...item,
        sourceKind: "business_context" as const,
        line: businessProfileLine(item.row),
      })),
    3
  );
  const profileSummary = profileSummaryItems.map((item) => item.line);

  const factLineItems = factRows.map((item) => ({
    ...item,
    sourceKind: "fact" as const,
    line: factProfileLine(item.row),
  }));
  const currentFactItems = factLineItems.filter((item) => item.line && CURRENT_WORK_PATTERN.test(item.line));
  const workingItems = uniqueProfileItems([...currentFactItems, ...factLineItems], 3);
  const workingNow = workingItems.map((item) => item.line);

  const guardrailItems = uniqueProfileItems(
    [
      ...businessRows.map((item) => ({
        ...item,
        sourceKind: "business_context" as const,
        line: businessProfileLine(item.row),
      })),
      ...factLineItems,
    ].filter((item) => item.line && GUARDRAIL_PATTERN.test(item.line)),
    3
  );
  // --- lane-05: corrections are always-loaded standing rules pinned to the top ---
  const doNotRepeat = isCorrectionsEnabled()
    ? Array.from(
        new Set([
          ...buildCorrectionDoNotRepeatLines(businessRows),
          ...guardrailItems.map((item) => item.line),
        ])
      ).slice(0, MAX_CORRECTION_LINES)
    : guardrailItems.map((item) => item.line);
  // --- end lane-05 ---

  const sourceReceipts: MemoryProfileCardReceipt[] = [];
  const receiptIds = new Set<string>();
  for (const item of [...profileSummaryItems.slice(0, 2), ...workingItems.slice(0, 2), ...guardrailItems.slice(0, 1)]) {
    const receipt = profileReceipt(item.row, item.sourceKind, item.index);
    if (receiptIds.has(receipt.memory_id)) continue;
    receiptIds.add(receipt.memory_id);
    sourceReceipts.push(receipt);
    if (sourceReceipts.length >= 4) break;
  }
  if (params.includeSessionSummaries && sourceReceipts.length < 5) {
    const session = sessionRows[0];
    if (session) sourceReceipts.push(profileReceipt(session.row, "session_summary", session.index));
  }

  const sessionHealth = params.includeSessionSummaries
    ? `${Math.min(params.sessions.length, 3)} of ${params.sessions.length} recent session summaries returned`
    : params.sessions.length > 0
      ? `${Math.min(params.sessions.length, 3)} of ${params.sessions.length} recent session stubs returned; bodies omitted in lite mode (call load_memory lite=false for full bodies)`
      : "No recent sessions in window";

  return {
    profile_summary: profileSummary,
    working_now: workingNow,
    do_not_repeat: doNotRepeat,
    timezone_context: buildTimezoneContext(params.business),
    memory_health: [
      `${Math.min(params.business.length, 6)} of ${params.business.length} business context rows returned`,
      `${Math.min(params.facts.length, 12)} of ${params.facts.length} active facts returned`,
      sessionHealth,
    ],
    source_receipts: sourceReceipts,
  };
}

function buildMemoryRetrievalPlan(): MemoryRetrievalPlan {
  return {
    mode: "cheap_first",
    startup_order: [
      "business_context",
      "profile_card",
      "active_facts",
      "knowledge_library_index",
      "search_memory",
      "semantic_retrieval",
    ],
    steps: [
      { step: 1, layer: "business_context + profile_card", use: "identity, rules, current work" },
      { step: 2, layer: "active_facts", use: "durable facts only" },
      { step: 3, layer: "knowledge_library_index", use: "snapshot pointers" },
      { step: 4, layer: "search_memory", use: "raw source detail" },
      { step: 5, layer: "semantic_retrieval", use: "only after cheap miss" },
    ],
    source_lookup: "search_memory after compact miss",
    semantic_lookup: "vector or graph only after deterministic miss",
  };
}

export async function persistTypedLinksForMemoryWrite(
  db: Pick<MemoryBackend, "saveTypedLinkCandidates">,
  input: { source_kind: MemoryTypedLinkSourceKind; source_id: string; text: string }
): Promise<SaveTypedLinkCandidatesResult> {
  const candidates = extractMemoryTypedLinkCandidates(input);
  if (candidates.length === 0) return { saved: 0 };

  try {
    return await db.saveTypedLinkCandidates(candidates);
  } catch (err) {
    console.error("[memory] typed-link persistence failed:", err);
    return { saved: 0, skipped: "persistence_failed" };
  }
}

export function normalizeActiveFactsForLoadMemory(value: unknown): unknown {
  const context = asRecord(value);
  if (!context || !Array.isArray(context.active_facts)) return value;
  const originalFacts = context.active_facts as unknown[];

  const activeFacts = originalFacts
    .filter((row) => !hasInvalidatedAtSet(row))
    .slice()
    .sort((left, right) => {
      const penaltyDelta = activeFactPenalty(left) - activeFactPenalty(right);
      if (penaltyDelta !== 0) return penaltyDelta;

      const confidenceDelta = factConfidence(right) - factConfidence(left);
      if (confidenceDelta !== 0) return confidenceDelta;

      return factTimestamp(right) - factTimestamp(left);
    });

  const unchanged =
    activeFacts.length === originalFacts.length &&
    activeFacts.every((row, index) => row === originalFacts[index]);
  if (unchanged) return value;
  return { ...context, active_facts: activeFacts };
}

// Always-on operator preferences set on /admin/you. These are pinned into the
// compact startup payload so they reach every session regardless of how many
// higher-priority standing rules an account has accumulated.
const ALWAYS_ON_BUSINESS_KEYS = new Set(["ai_style", "about_you"]);
function isAlwaysOnPreference(row: unknown): boolean {
  const r = asRecord(row);
  return r !== null && typeof r.key === "string" && ALWAYS_ON_BUSINESS_KEYS.has(r.key);
}

export function compactStartupContextForStrictClients(
  value: unknown,
  includeSessionSummaries = false
): unknown {
  const context = asRecord(normalizeActiveFactsForLoadMemory(value));
  if (!context) return value;

  const out: Record<string, unknown> = {};
  const business = Array.isArray(context.business_context) ? context.business_context : [];
  const library = Array.isArray(context.knowledge_library_index) ? context.knowledge_library_index : [];
  const sessions = Array.isArray(context.recent_sessions) ? context.recent_sessions : [];
  const facts = Array.isArray(context.active_facts) ? context.active_facts : [];
  const startupFacts = facts.filter(isEligibleStartupFact);

  // The operator's always-on preferences (AI style + About You, set on
  // /admin/you) must reach every session. They sit at a modest priority, so on
  // an account with many higher-priority standing rules they would otherwise be
  // pushed past the compact top-6 cut and never load. Pin them in past the cut
  // and give them a roomier value cap so the directive/About-You text survives.
  const topBusiness = business.slice(0, 6);
  const pinnedBusiness = business.filter(
    (row) => isAlwaysOnPreference(row) && !topBusiness.includes(row)
  );
  const compactBusiness = [...topBusiness, ...pinnedBusiness];
  out.business_context = compactBusiness.map((row) => {
    const r = asRecord(row) ?? {};
    const valueCap = isAlwaysOnPreference(r) ? 360 : 130;
    return { category: r.category, key: r.key, value: compactJsonValue(r.value, valueCap), priority: r.priority };
  });
  out.profile_card = buildMemoryProfileCard({ business, facts: startupFacts, sessions, includeSessionSummaries });
  out.active_facts = startupFacts.slice(0, 12).map((row) => {
    const r = asRecord(row) ?? {};
    return { fact: typeof r.fact === "string" ? capText(r.fact, 44) : r.fact, category: r.category, confidence: r.confidence, created_at: r.created_at };
  });
  out.knowledge_library_index = library.slice(0, 6).map((row) => {
    const r = asRecord(row) ?? {};
    return { slug: r.slug, title: typeof r.title === "string" ? capText(r.title, 60) : r.title, category: r.category, tags: compactStringArray(r.tags, 3, 32), updated_at: r.updated_at };
  });
  // Lite mode skips the heavier session *bodies* (decisions/open_loops/topics)
  // and tightens the summary, but still surfaces a compact stub per recent
  // session. Returning [] here (the previous behavior) hid even the existence
  // and headline of the latest cross-session threads from the default load
  // path, so an agent answering "what is the latest" could not see them or know
  // to fetch full bodies via load_memory(lite=false) / search_memory.
  out.recent_sessions = sessions.slice(0, 3).map((row) => {
    const r = asRecord(row) ?? {};
    if (includeSessionSummaries) {
      return {
        session_id: r.session_id,
        platform: r.platform,
        summary: typeof r.summary === "string" ? capText(r.summary, 350) : r.summary,
        decisions: compactStringArray(r.decisions),
        open_loops: compactStringArray(r.open_loops),
        topics: compactStringArray(r.topics),
        created_at: r.created_at,
      };
    }
    return {
      session_id: r.session_id,
      platform: r.platform,
      summary: typeof r.summary === "string" ? capText(r.summary, 140) : r.summary,
      created_at: r.created_at,
    };
  });
  out.retrieval_plan = buildMemoryRetrievalPlan();
  out.response_bounds = {
    compact: true,
    business_context_returned: compactBusiness.length,
    knowledge_library_returned: Math.min(library.length, 6),
    recent_sessions_returned: Math.min(sessions.length, 3),
    recent_sessions_bodies_included: includeSessionSummaries,
    recent_sessions_available_in_loaded_window: sessions.length,
    active_facts_returned: Math.min(startupFacts.length, 12),
    active_facts_available_in_loaded_window: facts.length,
    active_facts_eligible_for_startup: startupFacts.length,
    active_facts_excluded_from_startup: facts.length - startupFacts.length,
  };
  for (const [key, value] of Object.entries(context)) {
    if (!(key in out)) out[key] = value;
  }
  return out;
}

export function compactSearchMemoryForStrictClients(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  return value.map((row) => {
    const r = asRecord(row);
    if (!r) return row;
    const out = { ...r };
    for (const key of ["content", "summary", "fact"]) {
      if (typeof out[key] === "string") out[key] = capText(out[key] as string, 800);
    }
    return out;
  });
}

export const MEMORY_HANDLERS: Record<string, (args: Args) => Promise<unknown>> = {
  async get_startup_context(args) {
    // Always-on inspection: fire and forget on every session start. Off unless
    // UNCLICK_SESSION_INSPECTION=1; never blocks or breaks load_memory.
    triggerSessionInspection();

    const db = await getBackend();
    const slug = typeof args.agent_slug === "string" ? args.agent_slug : undefined;
    const id = typeof args.agent_id === "string" ? args.agent_id : undefined;
    const fullContent = bool(args.full_content, false);
    const lite = bool(args.lite, true);
    const sessionCount = fullContent ? num(args.num_sessions, 5) : Math.min(num(args.num_sessions, 3), 3);

    const [baseContext, resolved] = await Promise.all([
      db.getStartupContext(sessionCount),
      resolveAgent({ agent_slug: slug, agent_id: id }),
    ]);
    const safeBaseContext = normalizeActiveFactsForLoadMemory(baseContext);
    const boundedContext = fullContent
      ? safeBaseContext
      : compactStartupContextForStrictClients(safeBaseContext, !lite);

    // Optional: if the client passed the list of other tools in this session,
    // classify them and attach tool_guidance so the agent can nudge the user.
    const sessionTools = Array.isArray(args.session_tools)
      ? args.session_tools.map(String).filter(Boolean)
      : [];

    let tool_guidance: unknown = undefined;
    if (sessionTools.length > 0) {
      const detections = classifyTools(sessionTools);
      const nudgeable = await reportToolDetections(detections);
      tool_guidance = buildToolGuidance(detections, nudgeable);
    }

    // Inward capability awareness: tell the agent what UnClick can do at boot,
    // so it routes real-world questions to an UnClick tool instead of web search.
    const unclick_capabilities = buildCapabilityBriefing();

    if (!resolved) {
      const base: Record<string, unknown> = {
        ...(boundedContext as Record<string, unknown>),
        unclick_capabilities,
      };
      if (tool_guidance !== undefined) base.tool_guidance = tool_guidance;
      return base;
    }

    const scoped = filterContextByLayers(boundedContext, resolved.enabled_memory_layers);
    const result: Record<string, unknown> = {
      agent: {
        id: resolved.agent.id,
        slug: resolved.agent.slug,
        name: resolved.agent.name,
        role: resolved.agent.role,
        description: resolved.agent.description,
        system_prompt: fullContent ? resolved.agent.system_prompt : capText(resolved.agent.system_prompt ?? "", 1000),
        is_default: resolved.agent.is_default,
      },
      enabled_tools: resolved.enabled_tools,
      enabled_memory_layers: resolved.enabled_memory_layers,
      memory:
        scoped && typeof scoped === "object" ? scoped : { _raw: baseContext },
    };
    result.unclick_capabilities = unclick_capabilities;
    if (tool_guidance !== undefined) result.tool_guidance = tool_guidance;
    return result;
  },

  async search_memory(args) {
    const db = await getBackend();
    const asOf = typeof args.as_of === "string" ? args.as_of : undefined;
    const query = str(args.query);
    const results = await db.searchMemory(query, num(args.max_results, 10), asOf);
    const boundedResults = bool(args.full_content, false)
      ? results
      : compactSearchMemoryForStrictClients(results);
    // Phase 1 Wizard wrap: opt-in card alongside the existing array payload.
    // Defaults off to keep backward compatibility for current consumers.
    if (bool(args.include_card, false)) {
      return { results: boundedResults, card: buildSearchMemoryCard(query, boundedResults) };
    }
    return boundedResults;
  },

  async search_facts(args) {
    const db = await getBackend();
    return db.searchFacts(str(args.query));
  },

  async search_typed_links(args) {
    const db = await getBackend();
    return db.searchTypedLinks(str(args.query), num(args.max_results, 10));
  },

  // --- lane-09: typed memory split ---
  async list_session_events(args) {
    if (!isTypedMemorySplitEnabled()) return [];
    const db = await getBackend();
    return db.listSessionEvents({
      query: typeof args.query === "string" ? args.query : undefined,
      session_id: typeof args.session_id === "string" ? args.session_id : undefined,
      memory_class: typeof args.memory_class === "string" ? normalizeMemoryClass(args.memory_class, "episodic") : undefined,
      limit: num(args.limit ?? args.max_results, 20),
    });
  },
  // --- end lane-09 ---

  async search_library(args) {
    const db = await getBackend();
    return db.searchLibrary(str(args.query));
  },

  async get_library_doc(args) {
    const db = await getBackend();
    return db.getLibraryDoc(str(args.slug));
  },

  async list_library() {
    const db = await getBackend();
    return db.listLibrary();
  },

  async write_session_summary(args) {
    const db = await getBackend();
    const result = await db.writeSessionSummary({
      session_id: str(args.session_id),
      summary: str(args.summary),
      topics: arr(args.topics),
      open_loops: arr(args.open_loops),
      decisions: arr(args.decisions),
      platform: str(args.platform, "claude-code"),
      duration_minutes: typeof args.duration_minutes === "number" ? args.duration_minutes : undefined,
    });
    const hash = currentApiKeyHash();
    if (hash) {
      void emitSignal({
        apiKeyHash: hash,
        tool: "memory",
        action: "session_saved",
        severity: "info",
        summary: "Session summary saved to memory",
        deepLink: "/admin/memory?tab=sessions",
      });
    }
    return result;
  },

  async add_fact(args) {
    const db = await getBackend();
    const factText = str(args.fact);
    const result = await db.addFact({
      fact: factText,
      category: str(args.category, "general"),
      confidence: num(args.confidence, 0.9),
      source_session_id: typeof args.source_session_id === "string" ? args.source_session_id : undefined,
      valid_from: typeof args.valid_from === "string" ? args.valid_from : undefined,
      extractor_id: typeof args.extractor_id === "string" ? args.extractor_id : undefined,
      prompt_version: typeof args.prompt_version === "string" ? args.prompt_version : undefined,
      model_id: typeof args.model_id === "string" ? args.model_id : undefined,
      preserve_as_blob: typeof args.preserve_as_blob === "boolean" ? args.preserve_as_blob : false,
      commit_sha: typeof args.commit_sha === "string" ? args.commit_sha : undefined,
      pr_number: typeof args.pr_number === "number" ? Math.floor(args.pr_number) : undefined,
      // --- lane-03: provenance pass-through (persisted only when MEMORY_PROVENANCE_ENABLED) ---
      source_agent_id: typeof args.source_agent_id === "string" ? args.source_agent_id : undefined,
      source_ref: typeof args.source_ref === "string" ? args.source_ref : undefined,
      receipt_id: typeof args.receipt_id === "string" ? args.receipt_id : undefined,
      // --- end lane-03 ---
      // --- lane-09: typed memory split ---
      memory_class: typeof args.memory_class === "string" ? normalizeMemoryClass(args.memory_class) : undefined,
      // --- end lane-09 ---
      // --- lane-04: optional row-level scope (honored when MEMORY_SCOPES_ENABLED) ---
      // source_agent_id is threaded by lane-03 (provenance); consumed here.
      visibility: typeof args.visibility === "string" ? args.visibility : undefined,
      boardroom_id: typeof args.boardroom_id === "string" ? args.boardroom_id : undefined,
      credential_scope: typeof args.credential_scope === "string" ? args.credential_scope : undefined,
      // --- end lane-04 ---
    }) as AddFactResultWithGate;

    // --- lane-07 + lane-09: classify the write result.
    // lane-09 routes episodes (routed_to_episode); lane-07 may set source_kind.
    // Typed links + the "fact_saved" signal only apply to real fact writes. ---
    const routedToEpisode = (result as { routed_to_episode?: boolean }).routed_to_episode === true;
    const sourceKind = result.source_kind ?? (routedToEpisode ? "episode" : "fact");
    if (result.write_gate) {
      logMemoryLoadEvent({
        tool_name: "memory.write_gate",
        params: {
          action: result.write_gate.action,
          reason: result.write_gate.reason,
          route_target: result.write_gate.route_target,
          duplicate_rate: result.write_gate.metrics.duplicate_rate,
          write_precision: result.write_gate.metrics.write_precision,
          source_kind: sourceKind,
        },
      });
    }
    // --- end lane-07 + lane-09 ---

    if (sourceKind === "fact") {
      await persistTypedLinksForMemoryWrite(db, {
        source_kind: "fact",
        source_id: result.id,
        text: factText,
      });
    }
    const hash = currentApiKeyHash();
    if (hash) {
      const preview = factText.slice(0, 80);
      const action = result.write_gate?.action;
      const signalSummary =
        action === "ROUTE_EVENT"
          ? "Memory write routed to event store"
          : action === "REJECT"
            ? "Memory write rejected by admission gate"
            : preview ? `Fact saved: ${preview}` : "Fact saved to memory";
      void emitSignal({
        apiKeyHash: hash,
        tool: "memory",
        action: sourceKind === "fact" ? "fact_saved" : "fact_not_saved",
        severity: "info",
        summary: signalSummary,
        deepLink: "/admin/memory?tab=facts",
      });
    }
    return result;
  },

  // --- lane-04: quarantine memory derived from a revoked credential ---
  async quarantine_credential_memory(args) {
    const db = await getBackend();
    const scope = str(args.credential_scope ?? args.platform);
    return db.quarantineCredentialMemory(scope);
  },
  // --- end lane-04 ---
  // --- lane-07: write-gate admission ---
  async admit_write(args) {
    const db = await getBackend();
    return db.admitWrite({
      fact: str(args.fact),
      category: str(args.category, "general"),
      confidence: num(args.confidence, 0.9),
      source_session_id: typeof args.source_session_id === "string" ? args.source_session_id : undefined,
      valid_from: typeof args.valid_from === "string" ? args.valid_from : undefined,
      extractor_id: typeof args.extractor_id === "string" ? args.extractor_id : undefined,
      prompt_version: typeof args.prompt_version === "string" ? args.prompt_version : undefined,
      model_id: typeof args.model_id === "string" ? args.model_id : undefined,
      preserve_as_blob: typeof args.preserve_as_blob === "boolean" ? args.preserve_as_blob : false,
      commit_sha: typeof args.commit_sha === "string" ? args.commit_sha : undefined,
      pr_number: typeof args.pr_number === "number" ? Math.floor(args.pr_number) : undefined,
    });
  },
  // --- end lane-07 ---

  async supersede_fact(args) {
    const db = await getBackend();
    const newId = await db.supersedeFact(
      str(args.old_fact_id),
      str(args.new_fact_text),
      typeof args.new_category === "string" ? args.new_category : undefined,
      typeof args.new_confidence === "number" ? args.new_confidence : undefined,
    );
    return { new_fact_id: newId };
  },

  async log_conversation(args) {
    const db = await getBackend();
    const receipt = await db.logConversation({
      session_id: str(args.session_id),
      role: str(args.role),
      content: str(args.content),
      has_code: bool(args.has_code),
    });
    await persistTypedLinksForMemoryWrite(db, {
      source_kind: "conversation_turn",
      source_id: receipt.receipt_id,
      text: str(args.content),
    });
    // Auto-capture (flag-gated, default off, best-effort). When both flags are
    // off this is a no-op and the write path is byte-identical to before.
    if (codeAutoCaptureEnabled() || libraryAutoCaptureEnabled()) {
      await autoCaptureFromTurn(db, {
        session_id: str(args.session_id),
        role: str(args.role),
        content: str(args.content),
      }).catch(() => undefined);
    }
    return receipt;
  },

  // --- lane-09: typed memory split ---
  async add_session_event(args) {
    if (!isTypedMemorySplitEnabled()) {
      return { enabled: false, skipped: "MEMORY_TYPED_SPLIT_ENABLED is off" };
    }
    const db = await getBackend();
    return db.addSessionEvent({
      session_id: typeof args.session_id === "string" ? args.session_id : undefined,
      memory_class: typeof args.memory_class === "string" ? normalizeMemoryClass(args.memory_class, "episodic") : "episodic",
      event_kind: str(args.event_kind, "episode"),
      content: str(args.content),
      summary: typeof args.summary === "string" ? args.summary : undefined,
      payload: asRecord(args.payload) ?? undefined,
      source_fact_id: typeof args.source_fact_id === "string" ? args.source_fact_id : undefined,
      source_session_summary_id: typeof args.source_session_summary_id === "string" ? args.source_session_summary_id : undefined,
    });
  },
  // --- end lane-09 ---

  async get_conversation_detail(args) {
    const db = await getBackend();
    return db.getConversationDetail(str(args.session_id));
  },

  async store_code(args) {
    const db = await getBackend();
    return db.storeCode({
      session_id: str(args.session_id),
      language: str(args.language, "typescript"),
      filename: typeof args.filename === "string" ? args.filename : undefined,
      content: str(args.code || args.content),
      description: typeof args.description === "string" ? args.description : undefined,
    });
  },

  async get_business_context() {
    const db = await getBackend();
    return db.getBusinessContext();
  },

  async set_business_context(args) {
    const db = await getBackend();
    await db.setBusinessContext(
      str(args.category),
      str(args.key),
      args.value,
      typeof args.priority === "number" ? args.priority : undefined,
    );
    return { set: true, category: str(args.category), key: str(args.key) };
  },

  async upsert_library_doc(args) {
    const db = await getBackend();
    const msg = await db.upsertLibraryDoc({
      slug: str(args.slug),
      title: str(args.title),
      category: str(args.category, "reference"),
      content: str(args.content),
      tags: arr(args.tags),
    });
    return { message: msg };
  },

  async refresh_taxonomy_snapshots(args) {
    const db = await getBackend();
    return db.refreshTaxonomySnapshots({
      dry_run: bool(args.dry_run, true),
      max_sources: num(args.max_sources, 80),
      max_snapshots: num(args.max_snapshots, 12),
      max_sources_per_snapshot: num(args.max_sources_per_snapshot, 8),
    });
  },

  async embedding_state() {
    const { getEmbeddingState } = await import("./embeddings.js");
    return getEmbeddingState();
  },

  async manage_decay(args) {
    const db = await getBackend();
    if (isFlagEnabled(MEMORY_DECAY_V2_FLAG)) {
      const result = await db.manageDecayV2({
        dry_run: bool(args.dry_run, false),
        max_candidates: num(args.max_candidates, 1000),
        now: typeof args.now === "string" ? args.now : undefined,
        source: str(args.source, "manual"),
      });
      recordMemoryMetric("hot_set_staleness", result.metrics.hot_set_staleness, {
        source: str(args.source, "manual"),
        dry_run: bool(args.dry_run, false),
      });
      return { ...result, flag: MEMORY_DECAY_V2_FLAG };
    }
    return db.manageDecay();
  },

  // --- lane-08: sleep-time consolidation ---
  async consolidate(args) {
    if (!isFlagEnabled(MEMORY_CONSOLIDATION_FLAG)) {
      return {
        skipped: "flag_disabled",
        flag: MEMORY_CONSOLIDATION_FLAG,
      };
    }
    const db = await getBackend();
    const source = str(args.source, "manual");
    const dryRun = bool(args.dry_run, false);
    const result = await db.consolidateMemory({
      dry_run: dryRun,
      max_candidates: num(args.max_candidates, 250),
      now: typeof args.now === "string" ? args.now : undefined,
      source,
      similarity_threshold: num(args.similarity_threshold, 0.92),
      same_subject_threshold: num(args.same_subject_threshold, 0.5),
    });
    recordMemoryMetric("dedup_collapse_rate", result.metrics.dedup_collapse_rate, {
      source,
      dry_run: dryRun,
    });
    if (bool(args.run_decay, true) && isFlagEnabled(MEMORY_DECAY_V2_FLAG)) {
      const decay = await db.manageDecayV2({
        dry_run: dryRun,
        max_candidates: num(args.max_candidates, 250),
        now: typeof args.now === "string" ? args.now : undefined,
        source,
      });
      recordMemoryMetric("hot_set_staleness", decay.metrics.hot_set_staleness, {
        source,
        dry_run: dryRun,
      });
      return { ...result, decay, flag: MEMORY_CONSOLIDATION_FLAG };
    }
    return {
      ...result,
      decay_skipped: isFlagEnabled(MEMORY_DECAY_V2_FLAG) ? "run_decay_false" : "decay_flag_disabled",
      flag: MEMORY_CONSOLIDATION_FLAG,
    };
  },
  // --- end lane-08 ---

  async memory_status() {
    const db = await getBackend();
    const status = await db.getMemoryStatus();
    const statusObject =
      status && typeof status === "object" && !Array.isArray(status)
        ? status as Record<string, unknown>
        : { status };
    return {
      ...statusObject,
      backend_cache: getBackendCacheMetrics(),
    };
  },

  async invalidate_fact(args) {
    const db = await getBackend();
    return db.invalidateFact({
      fact_id: str(args.fact_id),
      reason: typeof args.reason === "string" ? args.reason : undefined,
      session_id: typeof args.session_id === "string" ? args.session_id : undefined,
    });
  },

  // --- lane-02: contradiction reconciliation & supersession ---
  async reconcile_fact(args) {
    const db = await getBackend();
    return db.reconcileFact(
      {
        fact: str(args.fact),
        category: str(args.category, "general"),
        confidence: num(args.confidence, 0.9),
        source_session_id: typeof args.source_session_id === "string" ? args.source_session_id : undefined,
        extractor_id: typeof args.extractor_id === "string" ? args.extractor_id : undefined,
        model_id: typeof args.model_id === "string" ? args.model_id : undefined,
        prompt_version: typeof args.prompt_version === "string" ? args.prompt_version : undefined,
        commit_sha: typeof args.commit_sha === "string" ? args.commit_sha : undefined,
        pr_number: typeof args.pr_number === "number" ? Math.floor(args.pr_number) : undefined,
      },
      {
        session_id: typeof args.session_id === "string" ? args.session_id : undefined,
        dry_run: bool(args.dry_run, false),
      }
    );
  },
  // --- end lane-02 ---
  // --- lane-05: true-forget (MEMORY_HARD_FORGET_ENABLED) ---
  async forget(args) {
    const db = await getBackend();
    const factId = str(args.fact_id) || str(args.memory_id);
    if (!factId) throw new Error("forget requires fact_id (or memory_id)");
    const reason = typeof args.reason === "string" ? args.reason : undefined;
    const sessionId = typeof args.session_id === "string" ? args.session_id : undefined;

    // Default OFF: fall back to the existing soft invalidate so production
    // behaviour is unchanged until the coordinator flips the flag.
    if (!isHardForgetEnabled()) {
      const soft = await db.invalidateFact({ fact_id: factId, reason, session_id: sessionId });
      return {
        mode: "soft_invalidate",
        flag: "MEMORY_HARD_FORGET_ENABLED",
        flag_enabled: false,
        fact_id: factId,
        invalidated_at: soft.invalidated_at,
        note: "Hard forget is flag-gated off; fell back to reversible soft invalidate.",
      };
    }

    const receipt = await db.forgetMemory({ fact_id: factId, reason, session_id: sessionId });
    const forget_compliance = forgetComplianceScore(receipt);

    // Emit the lane-05 metric so Worker 10's harness can score forget_compliance.
    logMemoryLoadEvent({
      tool_name: "memory.forget",
      params: {
        fact_id: factId,
        forget_compliance,
        verified_clean: receipt.verified_clean,
        typed_links_deleted: receipt.typed_links_deleted,
        snapshots_regenerated: receipt.snapshots_regenerated,
        snapshots_neutralized: receipt.snapshots_neutralized,
        history_entries_purged: receipt.history_entries_purged,
        session_events_deleted: receipt.session_events_deleted ?? 0,
        backend: receipt.backend,
      },
    });

    const hash = currentApiKeyHash();
    if (hash) {
      void emitSignal({
        apiKeyHash: hash,
        tool: "memory",
        action: "memory_forgotten",
        severity: "info",
        summary: `Memory forgotten and swept from ${receipt.surfaces_swept.length} derived surfaces`,
        deepLink: "/admin/memory?tab=facts",
      });
    }

    return { mode: "hard_forget", flag_enabled: true, forget_compliance, ...receipt };
  },

  async save_correction(args) {
    if (!isCorrectionsEnabled()) {
      return {
        saved: false,
        flag: "MEMORY_CORRECTIONS_ENABLED",
        flag_enabled: false,
        note: "Corrections are flag-gated off.",
      };
    }
    const db = await getBackend();
    const correction = str(args.correction) || str(args.text) || str(args.fact);
    if (!correction) throw new Error("save_correction requires a correction");
    const input = {
      correction,
      mistake: typeof args.mistake === "string" ? args.mistake : undefined,
      key: typeof args.key === "string" ? args.key : undefined,
      source_agent_id: typeof args.source_agent_id === "string" ? args.source_agent_id : undefined,
      source_ref: typeof args.source_ref === "string" ? args.source_ref : undefined,
      receipt_id: typeof args.receipt_id === "string" ? args.receipt_id : undefined,
    };
    const key = correctionKey(input);
    await db.setBusinessContext(
      CORRECTIONS_CATEGORY,
      key,
      buildCorrectionValue(input, new Date().toISOString()),
      CORRECTION_PRIORITY,
    );
    const hash = currentApiKeyHash();
    if (hash) {
      void emitSignal({
        apiKeyHash: hash,
        tool: "memory",
        action: "correction_saved",
        severity: "info",
        summary: `Correction saved: ${correction.slice(0, 80)}`,
        deepLink: "/admin/memory?tab=business-context",
      });
    }
    return { saved: true, category: CORRECTIONS_CATEGORY, key, flag_enabled: true };
  },

  async list_corrections() {
    const db = await getBackend();
    const business = await db.getBusinessContext();
    const rows = (Array.isArray(business) ? business : [])
      .map(asRecord)
      .filter((r): r is Record<string, unknown> => r !== null);
    const corrections = rows
      .filter((r) => String(r.category ?? "").toLowerCase() === CORRECTIONS_CATEGORY)
      .map((r) => ({ key: r.key, value: r.value, priority: r.priority }));
    return { corrections, count: corrections.length, flag_enabled: isCorrectionsEnabled() };
  },

  async consult_corrections(args) {
    if (!isCorrectionsEnabled()) {
      return {
        corrections: [],
        flag: "MEMORY_CORRECTIONS_ENABLED",
        flag_enabled: false,
        note: "Corrections are flag-gated off.",
      };
    }
    const db = await getBackend();
    const business = await db.getBusinessContext();
    const rows = (Array.isArray(business) ? business : [])
      .map(asRecord)
      .filter((r): r is Record<string, unknown> => r !== null);
    const query = str(args.query) || str(args.context) || str(args.draft);
    const relevant = selectRelevantCorrections(rows, query, num(args.max_results, 5));
    const total = countCorrections(rows);
    emitCorrectionConsultMetric(query, relevant.length, total);
    return { corrections: relevant, count: relevant.length, total, flag_enabled: true };
  },
  // --- end lane-05 ---
  // --- lane-10: eval harness and memory passport ---
  async export_memory_passport(args) {
    if (!isMemoryPassportEnabled()) {
      return { enabled: false, flag: MEMORY_PASSPORT_FLAG };
    }
    const signingSecret = memoryPassportSigningSecret();
    if (!signingSecret) {
      throw new Error("MEMORY_PASSPORT_SIGNING_SECRET is required when MEMORY_PASSPORT_ENABLED is on");
    }
    const db = await getBackend();
    return db.exportMemoryPassport({
      subject_id: typeof args.subject_id === "string" ? args.subject_id : undefined,
      include_sessions: bool(args.include_sessions, true),
      signing_secret: signingSecret,
    });
  },

  async import_memory_passport(args) {
    if (!isMemoryPassportEnabled()) {
      return { enabled: false, flag: MEMORY_PASSPORT_FLAG };
    }
    const signingSecret = memoryPassportSigningSecret();
    if (!signingSecret) {
      throw new Error("MEMORY_PASSPORT_SIGNING_SECRET is required when MEMORY_PASSPORT_ENABLED is on");
    }
    const bundle = args.bundle as MemoryPassportBundle | undefined;
    if (!bundle || typeof bundle !== "object") {
      throw new Error("bundle is required for import_memory_passport");
    }
    const db = await getBackend();
    return db.importMemoryPassport({
      bundle,
      dry_run: bool(args.dry_run, false),
      signing_secret: signingSecret,
      source_session_id: typeof args.source_session_id === "string" ? args.source_session_id : undefined,
    });
  },
  // --- end lane-10 ---
};
