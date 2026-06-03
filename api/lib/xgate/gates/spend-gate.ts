import type { Gate, GateContext, GateResult } from "../types.js";

const GATE = "SpendGate";
const DEFAULT_MAX_SPEND_USD = 1;

export interface SpendGateOptions {
  maxSpendUsd?: number;
}

function result(
  verdict: GateResult["verdict"],
  ruleId: string,
  reason: string,
  evidence: string[] = [],
): GateResult {
  return { gate: GATE, verdict, ruleId, reason, evidence };
}

function formatUsd(value: number): string {
  return value.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

export function createSpendGate(options: SpendGateOptions = {}): Gate {
  return (ctx: GateContext): GateResult => {
    try {
      const maxSpendUsd = options.maxSpendUsd ?? DEFAULT_MAX_SPEND_USD;

      if (!Number.isFinite(maxSpendUsd) || maxSpendUsd < 0) {
        return result(
          "ask",
          "spend.invalid_budget",
          "SpendGate budget could not be parsed.",
          [`max_usd:${String(maxSpendUsd)}`],
        );
      }

      const estimatedSpendUsd = ctx.action.estimatedSpendUsd;

      if (estimatedSpendUsd === undefined) {
        if (ctx.action.class === "spend") {
          return result(
            "ask",
            "spend.missing_estimate",
            "Spend action does not include an estimated cost.",
            [`max_usd:${formatUsd(maxSpendUsd)}`],
          );
        }

        return result("allow", "spend.no_estimate", "The action has no estimated spend.");
      }

      if (!Number.isFinite(estimatedSpendUsd) || estimatedSpendUsd < 0) {
        return result(
          "ask",
          "spend.invalid_estimate",
          "Estimated spend could not be parsed.",
          [`estimated_usd:${String(estimatedSpendUsd)}`],
        );
      }

      if (estimatedSpendUsd > maxSpendUsd) {
        return result(
          "deny",
          "spend.over_budget",
          "Estimated spend is above the configured budget.",
          [`estimated_usd:${formatUsd(estimatedSpendUsd)}`, `max_usd:${formatUsd(maxSpendUsd)}`],
        );
      }

      return result(
        "allow",
        "spend.within_budget",
        "Estimated spend is within the configured budget.",
        [`estimated_usd:${formatUsd(estimatedSpendUsd)}`, `max_usd:${formatUsd(maxSpendUsd)}`],
      );
    } catch (error) {
      return result(
        "ask",
        "spend.parse_error",
        "SpendGate could not safely evaluate the action.",
        [error instanceof Error ? error.message : "unknown error"],
      );
    }
  };
}

export const spendGate: Gate = createSpendGate();

