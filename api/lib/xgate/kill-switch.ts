import type { GateResult } from "./types.js";
import type { PolicyDecision } from "./policy-engine.js";

export interface KillSwitchState {
  api_key_hash?: string | null;
  active?: boolean | null;
  reason?: string | null;
  updated_at?: string | null;
}

export interface KillSwitchDecision extends PolicyDecision {
  authority: "auto" | "kill_switch";
  killSwitchActive: boolean;
}

export function isKillSwitchActive(state: KillSwitchState | null | undefined): boolean {
  return state?.active === true;
}

export function applyKillSwitch(
  decision: PolicyDecision,
  state: KillSwitchState | null | undefined,
): KillSwitchDecision {
  const killSwitchActive = isKillSwitchActive(state);

  if (!killSwitchActive || decision.verdict === "allow") {
    return {
      ...decision,
      authority: "auto",
      killSwitchActive,
    };
  }

  const override: GateResult = {
    gate: "KillSwitch",
    verdict: "deny",
    ruleId: "kill_switch.active",
    reason: state?.reason ? `Global XGate kill switch active: ${state.reason}` : "Global XGate kill switch active.",
    evidence: state?.updated_at ? [`updated_at:${state.updated_at}`] : [],
  };

  return {
    verdict: "deny",
    results: [...safeResults(decision), override],
    deciding: override,
    authority: "kill_switch",
    killSwitchActive: true,
  };
}

function safeResults(decision: PolicyDecision): GateResult[] {
  return Array.isArray(decision.results) ? decision.results : [decision.deciding].filter(Boolean);
}
