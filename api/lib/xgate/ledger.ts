// XGate control ledger (Master Build Plan Section 4, Part 1).
//
// Every XGate decision writes exactly one immutable control-ledger entry whose
// rule_id is the reviewable "address" of the rule that fired. This file is the
// PURE builder: it shapes one entry and redacts credentials from any text
// before it is stored. Persistence (the DB insert) lives in Part 8/9, never
// here. No IO, no wall-clock: the timestamp is taken from the injected ctx.now.

import { GateContext } from "./types.js";
import { PolicyDecision } from "./policy-engine.js";

export interface ControlLedgerEntry {
  ts: string; agent_id: string | null; session_id: string | null;
  client: string | null; model: string | null;
  action_class: string; tool: string; target: string; environment: string;
  verdict: string; rule_id: string; reason: string;
  authority: "auto" | "human" | "token" | "kill_switch";
  proof_ref?: string | null;     // xpass_receipt_v1 / commit SHA
  reversal?: string | null;
}

export interface BuildLedgerOptions {
  /** Acting agent id, if known. */
  agentId?: string | null;
  /** Session id, if known. */
  sessionId?: string | null;
  /** Client name (claude, cursor, ...), if known. */
  client?: string | null;
  /** Model id, if known. */
  model?: string | null;
  /** Proof reference (xpass_receipt_v1 / commit SHA), if any. */
  proofRef?: string | null;
  /** Reversal handle / undo reference, if any. */
  reversal?: string | null;
  /** Override timestamp (epoch ms). Defaults to ctx.now. */
  now?: number;
  /** Max length of the stored, redacted target/reason text. Default 500. */
  maxLen?: number;
}

const DEFAULT_MAX_LEN = 500;

// Credential shapes masked before anything is stored. Order matters: specific
// named signatures first, then key=value assignments, then long opaque blobs.
// Each pattern replaces the secret with a fixed placeholder so the raw value
// never reaches storage. These are masks for the ledger, not a security gate.
const SECRET_PATTERNS: Array<[RegExp, string]> = [
  // PEM private-key blocks (any flavour).
  [
    /-----BEGIN[A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END[A-Z0-9 ]*PRIVATE KEY-----/g,
    "[redacted private key]",
  ],
  // Authorization: Bearer <token> and bare bearer tokens.
  [/\b(authorization\s*:\s*bearer)\s+[a-z0-9._~+/=-]+/gi, "$1 [redacted secret]"],
  [/\b(bearer)\s+[a-z0-9._~+/=-]{8,}/gi, "$1 [redacted secret]"],
  // AWS access key id.
  [/\bAKIA[0-9A-Z]{16}\b/g, "[redacted secret]"],
  // GitHub tokens: ghp_/gho_/ghu_/ghs_/ghr_ and fine-grained github_pat_.
  [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, "[redacted secret]"],
  [/\bgithub_pat_[A-Za-z0-9_]{20,}\b/g, "[redacted secret]"],
  // Slack tokens.
  [/\bxox[baprs]-[A-Za-z0-9-]{8,}\b/g, "[redacted secret]"],
  // OpenAI-style sk- keys.
  [/\bsk-[A-Za-z0-9_-]{12,}\b/g, "[redacted secret]"],
  // Google API keys.
  [/\bAIza[0-9A-Za-z_-]{20,}\b/g, "[redacted secret]"],
  // UnClick internal keys.
  [/\b(?:uc|agt)_[A-Za-z0-9_-]{8,}\b/gi, "[redacted secret]"],
  // key/secret/password/token style assignments (key: value or key=value).
  [
    /\b(api[_-]?key|secret|token|password|passwd|access[_-]?token|refresh[_-]?token|private[_-]?key|client[_-]?secret)(\s*[:=]\s*)["']?[^"'\s,;]+/gi,
    "$1$2[redacted secret]",
  ],
  // Long opaque hex blobs (>= 32 chars).
  [/\b[0-9a-fA-F]{32,}\b/g, "[redacted secret]"],
  // Long opaque base64-ish blobs (>= 40 chars).
  [/[A-Za-z0-9+/]{40,}={0,2}/g, "[redacted secret]"],
];

/** Mask common credential shapes in free text before storage. Never throws. */
export function redactSecrets(text: string): string {
  let out = String(text ?? "");
  for (const [pattern, replacement] of SECRET_PATTERNS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function truncate(text: string, max: number): string {
  if (max <= 0 || text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 3))}...`;
}

function isoFromEpoch(ms: number): string {
  return Number.isFinite(ms) ? new Date(ms).toISOString() : new Date(0).toISOString();
}

/**
 * Build one immutable control-ledger entry from a decision. Secrets in the raw
 * action and in the deciding reason are redacted and the text is truncated.
 */
export function buildLedgerEntry(
  ctx: GateContext,
  decision: PolicyDecision,
  authority: ControlLedgerEntry["authority"],
  opts: BuildLedgerOptions = {},
): ControlLedgerEntry {
  const maxLen = opts.maxLen ?? DEFAULT_MAX_LEN;
  const tsMs = typeof opts.now === "number" ? opts.now : ctx.now;
  const action = ctx.action;

  return {
    ts: isoFromEpoch(tsMs),
    agent_id: opts.agentId ?? null,
    session_id: opts.sessionId ?? null,
    client: opts.client ?? null,
    model: opts.model ?? null,
    action_class: action.class,
    tool: action.tool,
    target: truncate(redactSecrets(action.raw ?? ""), maxLen),
    environment: ctx.environment,
    verdict: decision.verdict,
    rule_id: decision.deciding.ruleId,
    reason: truncate(redactSecrets(decision.deciding.reason ?? ""), maxLen),
    authority,
    proof_ref: opts.proofRef ?? null,
    reversal: opts.reversal ?? null,
  };
}
