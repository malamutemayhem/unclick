/**
 * Playbooks: agent-generated, reusable workflow memory.
 *
 * A Playbook is a distilled multi-step tool sequence an agent found itself
 * repeating (the "skill memory" layer). Playbooks are stored as versioned
 * Knowledge Library docs (category "playbook"), so both the local JSON and
 * Supabase backends get versioning, history, access counts, and decay tiers
 * for free with zero schema changes.
 *
 * Trust model: every playbook starts as "draft". It is promoted to "trusted"
 * only after TRUST_MIN_SUCCESSES successful recorded runs AND at least one
 * PASS verification receipt (an XPass-style receipt id attached via
 * record_playbook_run or save_playbook). A trusted playbook whose success
 * rate falls below TRUST_DEMOTION_SUCCESS_RATE drops back to draft.
 *
 * Operations are exposed through MEMORY_HANDLERS, so they are callable via
 * unclick_call with endpoint_id "memory.save_playbook" etc.
 */

import { getBackend } from "./db.js";
import { emitSignal } from "../signals/emit.js";

export const PLAYBOOK_CATEGORY = "playbook";
export const PLAYBOOK_SLUG_PREFIX = "playbook-";
export const PLAYBOOK_DOC_KIND = "playbook_doc_v1";

export const TRUST_MIN_SUCCESSES = 3;
export const TRUST_DEMOTION_SUCCESS_RATE = 0.5;

const MAX_NAME_LENGTH = 120;
const MAX_TEXT_FIELD_LENGTH = 500;
const MAX_STEPS = 30;
const MAX_PRECONDITIONS = 10;
const MAX_TAGS = 8;
const MAX_RECEIPTS = 20;

export interface PlaybookStep {
  tool: string;
  action?: string;
  params_hint?: string;
  expect?: string;
}

export interface PlaybookVerificationReceipt {
  pass: string;
  receipt_id: string;
  verdict: string;
  recorded_at: string;
}

export interface PlaybookStats {
  runs: number;
  successes: number;
  failures: number;
  last_run_at?: string;
  last_outcome?: "success" | "failure";
}

export type PlaybookStatus = "draft" | "trusted";

export interface PlaybookDoc {
  kind: typeof PLAYBOOK_DOC_KIND;
  name: string;
  goal: string;
  trigger?: string;
  steps: PlaybookStep[];
  preconditions: string[];
  status: PlaybookStatus;
  stats: PlaybookStats;
  verification: { receipts: PlaybookVerificationReceipt[] };
  source?: { agent_id?: string; session_id?: string };
  created_at: string;
}

type Args = Record<string, unknown>;

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function cap(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) : text;
}

function now(): string {
  return new Date().toISOString();
}

export function playbookSlug(nameOrSlug: string): string {
  const base = nameOrSlug
    .toLowerCase()
    .replace(/^playbook-/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${PLAYBOOK_SLUG_PREFIX}${base}`;
}

function statusTag(status: PlaybookStatus): string {
  return `status:${status}`;
}

function buildTags(status: PlaybookStatus, userTags: unknown): string[] {
  const cleaned = (Array.isArray(userTags) ? userTags : [])
    .map((t) => cap(String(t).trim(), 60))
    .filter((t) => t.length > 0 && t !== PLAYBOOK_CATEGORY && !t.startsWith("status:"))
    .slice(0, MAX_TAGS);
  return [PLAYBOOK_CATEGORY, statusTag(status), ...cleaned];
}

function statusFromTags(tags: unknown): PlaybookStatus {
  const list = Array.isArray(tags) ? tags.map(String) : [];
  return list.includes(statusTag("trusted")) ? "trusted" : "draft";
}

function normalizeSteps(v: unknown): PlaybookStep[] | null {
  if (!Array.isArray(v) || v.length === 0 || v.length > MAX_STEPS) return null;
  const steps: PlaybookStep[] = [];
  for (const raw of v) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    const rec = raw as Record<string, unknown>;
    const tool = str(rec.tool).trim();
    if (!tool) return null;
    const step: PlaybookStep = { tool: cap(tool, MAX_NAME_LENGTH) };
    if (typeof rec.action === "string" && rec.action.trim()) {
      step.action = cap(rec.action.trim(), MAX_TEXT_FIELD_LENGTH);
    }
    if (rec.params_hint !== undefined) {
      const hint = typeof rec.params_hint === "string" ? rec.params_hint : JSON.stringify(rec.params_hint);
      if (hint && hint.trim()) step.params_hint = cap(hint.trim(), MAX_TEXT_FIELD_LENGTH);
    }
    if (typeof rec.expect === "string" && rec.expect.trim()) {
      step.expect = cap(rec.expect.trim(), MAX_TEXT_FIELD_LENGTH);
    }
    steps.push(step);
  }
  return steps;
}

function normalizeReceipt(v: unknown, recordedAt = now()): PlaybookVerificationReceipt | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const rec = v as Record<string, unknown>;
  const receiptId = str(rec.receipt_id).trim();
  if (!receiptId) return null;
  return {
    pass: cap(str(rec.pass, "unspecified").trim() || "unspecified", MAX_NAME_LENGTH),
    receipt_id: cap(receiptId, MAX_NAME_LENGTH * 2),
    verdict: cap(str(rec.verdict, "PASS").trim().toUpperCase() || "PASS", 20),
    recorded_at: str(rec.recorded_at).trim() || recordedAt,
  };
}

function hasPassReceipt(doc: PlaybookDoc): boolean {
  return doc.verification.receipts.some((r) => r.verdict === "PASS");
}

/**
 * Recompute status from stats and receipts. Promotion and demotion are both
 * deterministic so the same playbook state always yields the same verdict.
 */
export function resolveStatus(doc: PlaybookDoc): PlaybookStatus {
  const { runs, successes } = doc.stats;
  const successRate = runs > 0 ? successes / runs : 0;
  if (doc.status === "trusted") {
    return successRate < TRUST_DEMOTION_SUCCESS_RATE ? "draft" : "trusted";
  }
  if (successes >= TRUST_MIN_SUCCESSES && hasPassReceipt(doc) && successRate >= TRUST_DEMOTION_SUCCESS_RATE) {
    return "trusted";
  }
  return "draft";
}

function extractLibraryRow(value: unknown): Record<string, unknown> | null {
  if (Array.isArray(value)) return value.length > 0 ? extractLibraryRow(value[0]) : null;
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

function parsePlaybookDoc(row: Record<string, unknown>): PlaybookDoc | null {
  if (typeof row.content !== "string") return null;
  try {
    const parsed = JSON.parse(row.content) as Partial<PlaybookDoc>;
    if (!parsed || parsed.kind !== PLAYBOOK_DOC_KIND) return null;
    const steps = normalizeSteps(parsed.steps);
    if (!steps || typeof parsed.name !== "string" || typeof parsed.goal !== "string") return null;
    const stats = parsed.stats && typeof parsed.stats === "object" ? parsed.stats : undefined;
    const receipts = Array.isArray(parsed.verification?.receipts) ? parsed.verification.receipts : [];
    return {
      kind: PLAYBOOK_DOC_KIND,
      name: parsed.name,
      goal: parsed.goal,
      trigger: typeof parsed.trigger === "string" ? parsed.trigger : undefined,
      steps,
      preconditions: Array.isArray(parsed.preconditions) ? parsed.preconditions.map(String) : [],
      status: parsed.status === "trusted" ? "trusted" : "draft",
      stats: {
        runs: typeof stats?.runs === "number" ? stats.runs : 0,
        successes: typeof stats?.successes === "number" ? stats.successes : 0,
        failures: typeof stats?.failures === "number" ? stats.failures : 0,
        last_run_at: typeof stats?.last_run_at === "string" ? stats.last_run_at : undefined,
        last_outcome: stats?.last_outcome === "success" || stats?.last_outcome === "failure" ? stats.last_outcome : undefined,
      },
      verification: {
        receipts: receipts
          .map((r) => normalizeReceipt(r))
          .filter((r): r is PlaybookVerificationReceipt => r !== null)
          .slice(-MAX_RECEIPTS),
      },
      source: parsed.source && typeof parsed.source === "object" ? parsed.source : undefined,
      created_at: typeof parsed.created_at === "string" ? parsed.created_at : now(),
    };
  } catch {
    return null;
  }
}

async function loadPlaybookRow(slug: string): Promise<
  | { ok: true; row: Record<string, unknown>; doc: PlaybookDoc }
  | { ok: false; error: string; not_found?: boolean }
> {
  const db = await getBackend();
  const raw = await db.getLibraryDoc(slug);
  const row = extractLibraryRow(raw);
  if (!row || (typeof row.slug === "string" && row.slug !== slug)) {
    return { ok: false, not_found: true, error: `No playbook found at slug "${slug}". Use list_playbooks to see what exists.` };
  }
  if (str(row.category) !== PLAYBOOK_CATEGORY) {
    return { ok: false, error: `Library doc "${slug}" exists but is not a playbook (category "${str(row.category)}").` };
  }
  const doc = parsePlaybookDoc(row);
  if (!doc) {
    return { ok: false, error: `Playbook "${slug}" content is unreadable; re-save it with save_playbook.` };
  }
  return { ok: true, row, doc };
}

async function persistPlaybook(slug: string, doc: PlaybookDoc, userTags?: unknown): Promise<string> {
  const db = await getBackend();
  return db.upsertLibraryDoc({
    slug,
    title: doc.name,
    category: PLAYBOOK_CATEGORY,
    content: JSON.stringify(doc, null, 2),
    tags: buildTags(doc.status, userTags),
  });
}

function emitPlaybookSignal(action: string, summary: string): void {
  const hash = process.env.UNCLICK_API_KEY_HASH;
  if (!hash) return;
  void emitSignal({
    apiKeyHash: hash,
    tool: "memory",
    action,
    severity: "info",
    summary,
    deepLink: "/admin/memory?tab=library",
  });
}

export async function savePlaybook(args: Args): Promise<unknown> {
  const name = cap(str(args.name).trim(), MAX_NAME_LENGTH);
  const goal = cap(str(args.goal).trim(), MAX_TEXT_FIELD_LENGTH);
  if (!name) return { saved: false, error: "name is required: a short label for the workflow, e.g. 'Weekly revenue summary to Slack'." };
  if (!goal) return { saved: false, error: "goal is required: one sentence on what this playbook achieves." };
  const steps = normalizeSteps(args.steps);
  if (!steps) {
    return {
      saved: false,
      error: `steps is required: 1-${MAX_STEPS} ordered entries, each { tool: "<tool name>", action?, params_hint?, expect? }.`,
    };
  }

  const slug = playbookSlug(name);
  const existing = await loadPlaybookRow(slug);
  if (!existing.ok && !existing.not_found) return { saved: false, error: existing.error };

  // Updates keep the run history and trust state; the library layer archives
  // the previous version automatically.
  const prior = existing.ok ? existing.doc : null;
  const doc: PlaybookDoc = {
    kind: PLAYBOOK_DOC_KIND,
    name,
    goal,
    trigger: str(args.trigger).trim() ? cap(str(args.trigger).trim(), MAX_TEXT_FIELD_LENGTH) : prior?.trigger,
    steps,
    preconditions: (Array.isArray(args.preconditions) ? args.preconditions : [])
      .map((p) => cap(String(p).trim(), MAX_TEXT_FIELD_LENGTH))
      .filter((p) => p.length > 0)
      .slice(0, MAX_PRECONDITIONS),
    status: prior?.status ?? "draft",
    stats: prior?.stats ?? { runs: 0, successes: 0, failures: 0 },
    verification: prior?.verification ?? { receipts: [] },
    source: {
      agent_id: str(args.agent_id).trim() || prior?.source?.agent_id,
      session_id: str(args.session_id).trim() || prior?.source?.session_id,
    },
    created_at: prior?.created_at ?? now(),
  };

  const receipt = normalizeReceipt(args.verification);
  if (receipt) {
    doc.verification.receipts = [...doc.verification.receipts, receipt].slice(-MAX_RECEIPTS);
  }
  doc.status = resolveStatus(doc);

  const message = await persistPlaybook(slug, doc, args.tags);
  emitPlaybookSignal("playbook_saved", `Playbook saved: ${name}`);
  return {
    saved: true,
    slug,
    status: doc.status,
    message,
    next_steps: [
      `Run the workflow, then call memory.record_playbook_run with slug "${slug}" and outcome success or failure.`,
      `Promotion to trusted needs ${TRUST_MIN_SUCCESSES} successful runs and one PASS verification receipt.`,
    ],
  };
}

export async function getPlaybook(args: Args): Promise<unknown> {
  const ref = str(args.slug) || str(args.name);
  if (!ref.trim()) return { found: false, error: "Pass slug or name of the playbook to fetch." };
  const slug = playbookSlug(ref.trim());
  const loaded = await loadPlaybookRow(slug);
  if (!loaded.ok) return { found: false, error: loaded.error };
  const successRate = loaded.doc.stats.runs > 0
    ? Math.round((loaded.doc.stats.successes / loaded.doc.stats.runs) * 100) / 100
    : null;
  return {
    found: true,
    slug,
    version: typeof loaded.row.version === "number" ? loaded.row.version : undefined,
    updated_at: typeof loaded.row.updated_at === "string" ? loaded.row.updated_at : undefined,
    success_rate: successRate,
    playbook: loaded.doc,
  };
}

export async function listPlaybooks(args: Args): Promise<unknown> {
  const db = await getBackend();
  const all = await db.listLibrary();
  const rows = Array.isArray(all) ? all : [];
  const statusFilter = str(args.status).trim();
  const playbooks = rows
    .map((r) => extractLibraryRow(r))
    .filter((r): r is Record<string, unknown> => r !== null && str(r.category) === PLAYBOOK_CATEGORY)
    .map((r) => ({
      slug: str(r.slug),
      name: str(r.title),
      status: statusFromTags(r.tags),
      version: typeof r.version === "number" ? r.version : undefined,
      updated_at: typeof r.updated_at === "string" ? r.updated_at : undefined,
      tags: (Array.isArray(r.tags) ? r.tags.map(String) : []).filter(
        (t) => t !== PLAYBOOK_CATEGORY && !t.startsWith("status:"),
      ),
    }))
    .filter((p) => !statusFilter || p.status === statusFilter);
  return {
    count: playbooks.length,
    playbooks,
    hint: playbooks.length === 0
      ? "No playbooks yet. When you repeat a multi-step tool sequence, distill it with memory.save_playbook so future sessions can reuse it."
      : "Call memory.get_playbook with a slug for full steps, then record each run with memory.record_playbook_run.",
  };
}

export async function recordPlaybookRun(args: Args): Promise<unknown> {
  const ref = str(args.slug) || str(args.name);
  if (!ref.trim()) return { recorded: false, error: "Pass slug (or name) of the playbook this run executed." };
  const outcome = str(args.outcome).trim().toLowerCase();
  if (outcome !== "success" && outcome !== "failure") {
    return { recorded: false, error: 'outcome must be "success" or "failure".' };
  }
  const slug = playbookSlug(ref.trim());
  const loaded = await loadPlaybookRow(slug);
  if (!loaded.ok) return { recorded: false, error: loaded.error };

  const doc = loaded.doc;
  doc.stats.runs += 1;
  if (outcome === "success") doc.stats.successes += 1;
  else doc.stats.failures += 1;
  doc.stats.last_run_at = now();
  doc.stats.last_outcome = outcome;

  const receipt = normalizeReceipt(
    args.verification ?? (str(args.receipt_id).trim()
      ? { receipt_id: args.receipt_id, pass: args.pass, verdict: args.verdict }
      : undefined),
  );
  if (receipt) {
    doc.verification.receipts = [...doc.verification.receipts, receipt].slice(-MAX_RECEIPTS);
  }

  const previousStatus = doc.status;
  doc.status = resolveStatus(doc);
  await persistPlaybook(slug, doc);

  if (previousStatus === "draft" && doc.status === "trusted") {
    emitPlaybookSignal("playbook_trusted", `Playbook promoted to trusted: ${doc.name}`);
  }

  const successRate = Math.round((doc.stats.successes / doc.stats.runs) * 100) / 100;
  const result: Record<string, unknown> = {
    recorded: true,
    slug,
    outcome,
    status: doc.status,
    stats: doc.stats,
    success_rate: successRate,
  };
  if (previousStatus !== doc.status) {
    result.status_changed = `${previousStatus} -> ${doc.status}`;
  }
  if (doc.status === "draft") {
    const needsSuccesses = Math.max(0, TRUST_MIN_SUCCESSES - doc.stats.successes);
    result.trust_gap = hasPassReceipt(doc)
      ? `${needsSuccesses} more successful run(s) needed for trusted status.`
      : `Needs ${needsSuccesses} more successful run(s) and one PASS verification receipt for trusted status.`;
  }
  return result;
}
