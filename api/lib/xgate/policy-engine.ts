// XGate policy engine (Master Build Plan Section 4, Part 1).
//
// evaluateGates runs every gate and combines their verdicts fail-closed: the
// most restrictive verdict wins (deny > ask > rewrite > allow). Pure: no IO,
// no wall-clock, no network. Defense-in-depth: if a gate throws or returns a
// malformed result we treat that gate as "ask" rather than propagating, so a
// buggy gate can never silently allow a destructive action.

import { Gate, GateContext, GateResult, VERDICT_PRECEDENCE } from "./types.js";

export interface PolicyDecision {
  verdict: GateResult["verdict"];
  results: GateResult[];     // every gate's result
  deciding: GateResult;      // the most-restrictive one that set the verdict
}

// Used as the decision when no gates run (empty list = allow).
const DEFAULT_ALLOW: GateResult = {
  gate: "PolicyEngine",
  verdict: "allow",
  ruleId: "policy.no_gates",
  reason: "No gates evaluated; nothing objected.",
  evidence: [],
};

function gateName(gate: Gate): string {
  const name = (gate as { name?: string }).name;
  return typeof name === "string" && name.length > 0 ? name : "unknown";
}

function isValidResult(result: unknown): result is GateResult {
  if (!result || typeof result !== "object") return false;
  const candidate = result as Partial<GateResult>;
  return (
    typeof candidate.verdict === "string" &&
    Object.prototype.hasOwnProperty.call(VERDICT_PRECEDENCE, candidate.verdict) &&
    typeof candidate.gate === "string" &&
    typeof candidate.ruleId === "string" &&
    typeof candidate.reason === "string" &&
    Array.isArray(candidate.evidence)
  );
}

function failClosed(gate: string, ruleId: string, reason: string): GateResult {
  return { gate, verdict: "ask", ruleId, reason, evidence: [] };
}

/** Run all gates, combine fail-closed (most restrictive wins). Pure. */
export function evaluateGates(gates: Gate[], ctx: GateContext): PolicyDecision {
  const results: GateResult[] = [];

  for (const gate of gates) {
    const name = gateName(gate);
    let result: GateResult;
    try {
      result = gate(ctx);
    } catch {
      results.push(
        failClosed(name, "policy.gate_threw", "Gate threw an error; treating as ask (fail closed)."),
      );
      continue;
    }
    if (!isValidResult(result)) {
      results.push(
        failClosed(
          name,
          "policy.gate_invalid_result",
          "Gate returned an invalid result; treating as ask (fail closed).",
        ),
      );
      continue;
    }
    results.push(result);
  }

  // Most restrictive wins; on a tie the earliest gate that reached the peak
  // precedence is the deciding one (it is "the rule that set the verdict").
  let deciding: GateResult = results.length > 0 ? results[0] : DEFAULT_ALLOW;
  for (let i = 1; i < results.length; i++) {
    if (VERDICT_PRECEDENCE[results[i].verdict] > VERDICT_PRECEDENCE[deciding.verdict]) {
      deciding = results[i];
    }
  }

  return { verdict: deciding.verdict, results, deciding };
}
