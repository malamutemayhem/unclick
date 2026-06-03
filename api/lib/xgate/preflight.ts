// XGate preflight: the wiring that runs the gates BEFORE a catalog endpoint
// executes in the MCP tool path (unclick_call). This is what turns XGate from
// "ready" into "callable in the hot path".
//
// Safety / rollout design:
//  - OFF BY DEFAULT. Enforcement only happens when UNCLICK_XGATE_ENFORCE=1.
//    When off, runPreflight returns an allow decision immediately, so tool
//    behaviour is byte-identical to today. This makes the wiring safe to merge.
//  - Two modes when on: "shadow" (UNCLICK_XGATE_MODE=shadow, default when
//    enforce is on) evaluates and reports but never blocks; "block" actually
//    denies. Shadow lets you watch real decisions before letting it stop work.
//  - Pure decision via Part 1's evaluateGates over the Part 2-7 gates. The hot
//    path stays synchronous: gates are imported statically here, not via the
//    async registry loader (which is for the endpoint).
//  - Classification is conservative: only endpoints we can map to a real action
//    class are evaluated; everything else is allowed (the gates are about
//    destructive shell/sql/git/secret/ship, not ordinary catalog reads).

import { evaluateGates } from "./policy-engine.js";
import type { ActionClass, Environment, AutonomyLevel, GateContext, Gate } from "./types.js";
import { secretGate } from "./gates/secret-gate.js";
import { dataGate } from "./gates/data-gate.js";
import { gitGate } from "./gates/git-gate.js";
import { commandGate } from "./gates/command-gate.js";
import { shipGate } from "./gates/ship-gate.js";
import { scopeGate } from "./gates/scope-gate.js";
import { spendGate } from "./gates/spend-gate.js";

export const PREFLIGHT_GATES: Gate[] = [
  secretGate, dataGate, gitGate, commandGate, shipGate, scopeGate, spendGate,
];

export type PreflightMode = "off" | "shadow" | "block";

export interface PreflightOptions {
  /** Override env detection (for tests). */
  enforce?: boolean;
  mode?: PreflightMode;
  environment?: Environment;
  autonomyLevel?: AutonomyLevel;
  tainted?: boolean;
  now?: number;
}

export interface PreflightOutcome {
  /** Whether the caller should proceed with the endpoint. */
  proceed: boolean;
  mode: PreflightMode;
  verdict: "allow" | "deny" | "ask" | "rewrite";
  /** The gate + rule that decided, when not a plain allow. */
  gate?: string;
  ruleId?: string;
  reason?: string;
  /** True when a non-allow verdict was observed but mode let it through. */
  shadowed?: boolean;
  /** True when the endpoint mapped to a real action class and was evaluated. */
  classified?: boolean;
  /** The action class evaluated, when classified (for the ledger). */
  actionClass?: ActionClass;
}

/** Resolve the active mode from explicit opts then env. Default off. */
export function resolveMode(opts: PreflightOptions = {}): PreflightMode {
  if (opts.mode) return opts.mode;
  const enforce = opts.enforce ?? process.env.UNCLICK_XGATE_ENFORCE === "1";
  if (!enforce) return "off";
  const envMode = (process.env.UNCLICK_XGATE_MODE ?? "shadow").toLowerCase();
  return envMode === "block" ? "block" : "shadow";
}

/**
 * Map a catalog endpoint id + params to an XGate action class, or null when the
 * endpoint carries no gate-relevant risk (the common case -> allowed without
 * evaluation). Conservative by design: we only gate what we can classify.
 */
export function classifyEndpoint(
  endpointId: string,
  params: Record<string, unknown>,
): { class: ActionClass; raw: string } | null {
  const id = endpointId.toLowerCase();
  const str = (k: string): string => {
    const v = params[k];
    return typeof v === "string" ? v : "";
  };

  // SQL execution endpoints (neon/turso/supabase execute_sql, query, etc.)
  if (/(execute_sql|run_sql|\bquery\b|\bsql\b)/.test(id)) {
    const raw = str("sql") || str("query") || str("statement") || "";
    if (raw) return { class: "sql", raw };
  }
  // Git / repo write endpoints.
  if (/(github|gitlab)/.test(id) && /(push|force|delete|merge|reset)/.test(id + JSON.stringify(params).toLowerCase())) {
    return { class: "git", raw: str("command") || JSON.stringify(params) };
  }
  // Shell / command execution endpoints.
  if (/(\bexec\b|\bshell\b|\bcommand\b|run_command|bash)/.test(id)) {
    const raw = str("command") || str("cmd") || str("script") || "";
    if (raw) return { class: "shell", raw };
  }
  // Deploy / publish / release endpoints.
  if (/(deploy|publish|release|rollback)/.test(id)) {
    return { class: "ship", raw: endpointId };
  }
  // Outbound send endpoints (email, sms, message) -> secret/exfil relevant.
  if (/(send_email|email_send|send_sms|send_message|email\.send|whatsapp|telegram_send|slack)/.test(id)) {
    return { class: "send", raw: JSON.stringify(params) };
  }
  return null;
}

/**
 * Run the gates for a catalog endpoint call. Returns whether to proceed. When
 * enforcement is off, always proceeds (allow) without evaluating. When in
 * shadow mode, evaluates and reports but still proceeds. Only "block" mode with
 * a deny/ask actually stops the call. Never throws.
 */
export function runPreflight(
  endpointId: string,
  params: Record<string, unknown>,
  opts: PreflightOptions = {},
): PreflightOutcome {
  const mode = resolveMode(opts);
  if (mode === "off") {
    return { proceed: true, mode, verdict: "allow" };
  }

  let classified: { class: ActionClass; raw: string } | null = null;
  try {
    classified = classifyEndpoint(endpointId, params);
  } catch {
    classified = null;
  }
  if (!classified) {
    return { proceed: true, mode, verdict: "allow" };
  }

  const ctx: GateContext = {
    action: {
      class: classified.class,
      raw: classified.raw,
      tool: endpointId,
      targetFiles: Array.isArray(params.targetFiles)
        ? (params.targetFiles as string[])
        : undefined,
      estimatedSpendUsd:
        typeof params.estimatedSpendUsd === "number" ? params.estimatedSpendUsd : undefined,
    },
    environment: opts.environment ?? (process.env.UNCLICK_XGATE_ENV as Environment) ?? "prod",
    autonomyLevel: opts.autonomyLevel ?? "unattended",
    tainted: opts.tainted ?? false,
    now: opts.now ?? Date.now(),
  };

  let decision;
  try {
    decision = evaluateGates(PREFLIGHT_GATES, ctx);
  } catch {
    // Defense in depth: the engine should never throw, but if it does, fail
    // closed in block mode (deny) and open in shadow mode (proceed + report).
    return {
      proceed: mode !== "block",
      mode,
      verdict: "ask",
      reason: "xgate preflight engine error; failing " + (mode === "block" ? "closed" : "open"),
      shadowed: mode !== "block",
      classified: true,
      actionClass: classified.class,
    };
  }

  const blocking = decision.verdict === "deny" || decision.verdict === "ask";
  if (!blocking) {
    return { proceed: true, mode, verdict: decision.verdict, classified: true, actionClass: classified.class };
  }

  if (mode === "shadow") {
    return {
      proceed: true,
      mode,
      verdict: decision.verdict,
      gate: decision.deciding.gate,
      ruleId: decision.deciding.ruleId,
      reason: decision.deciding.reason,
      shadowed: true,
      classified: true,
      actionClass: classified.class,
    };
  }

  // block mode: stop the call.
  return {
    proceed: false,
    mode,
    verdict: decision.verdict,
    gate: decision.deciding.gate,
    ruleId: decision.deciding.ruleId,
    reason: decision.deciding.reason,
    classified: true,
    actionClass: classified.class,
  };
}
