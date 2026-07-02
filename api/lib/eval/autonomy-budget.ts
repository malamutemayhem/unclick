// Autonomy budget: the guardrail from docs/path-a-learning-and-autonomy.md
// part 3. An explicit ceiling on what the system may do without a human, so
// higher agentic rungs (self-initiate, self-schedule, coordinate) are safe to
// enable. It generalizes the existing per-provider spend guards into one
// budget: action count, spend, and an action allowlist, with destructive
// actions always escalating instead of auto-running.
//
// Pure and deterministic: the caller passes the current usage and the proposed
// action; this decides allow / escalate / deny. No IO, no clock unless injected.

export type AutonomyVerdict = "allow" | "escalate" | "deny";

export interface AutonomyBudget {
  /** Max autonomous actions in the window before a human must be looped in. */
  maxActions: number;
  /** Max autonomous spend (USD) in the window. */
  maxSpendUsd: number;
  /** Action kinds the system may take without asking. Anything else escalates. */
  allowedActions: string[];
  /** Action kinds that must ALWAYS escalate (destructive / irreversible). */
  alwaysEscalateActions?: string[];
}

export interface AutonomyUsage {
  actionsTaken: number;
  spendUsd: number;
}

export interface ProposedAction {
  kind: string;
  /** Estimated cost of this action in USD (default 0). */
  estimatedSpendUsd?: number;
  /** Caller-declared irreversibility (deploy, delete, send, pay, etc.). */
  destructive?: boolean;
}

export interface AutonomyDecision {
  verdict: AutonomyVerdict;
  reason: string;
  /** Remaining headroom after this action, when allowed. */
  remaining?: { actions: number; spendUsd: number };
}

const DESTRUCTIVE_DEFAULTS = ["deploy", "delete", "pay", "send", "publish", "rollback", "merge"];

/**
 * Decide whether a proposed action may run autonomously. Order of checks is
 * deliberate: hard "always escalate" first (destructive never auto-runs), then
 * allowlist, then the numeric budgets. Anything not explicitly allowed escalates
 * (ask a human) rather than silently denies, except budget exhaustion which is a
 * firm deny until the window resets.
 */
export function decideAutonomy(
  budget: AutonomyBudget,
  usage: AutonomyUsage,
  action: ProposedAction,
): AutonomyDecision {
  const spend = action.estimatedSpendUsd ?? 0;
  const escalateKinds = new Set([
    ...(budget.alwaysEscalateActions ?? []),
    ...DESTRUCTIVE_DEFAULTS,
  ]);

  // 1. Destructive / irreversible always escalates, regardless of budget.
  if (action.destructive || escalateKinds.has(action.kind)) {
    return {
      verdict: "escalate",
      reason: `"${action.kind}" is destructive/irreversible; a human must approve.`,
    };
  }

  // 2. Not on the allowlist => escalate (ask), do not silently deny.
  if (!budget.allowedActions.includes(action.kind)) {
    return {
      verdict: "escalate",
      reason: `"${action.kind}" is not in the autonomy allowlist; ask a human.`,
    };
  }

  // 3. Numeric budgets are firm denies until the window resets.
  if (usage.actionsTaken + 1 > budget.maxActions) {
    return {
      verdict: "deny",
      reason: `action budget exhausted (${usage.actionsTaken}/${budget.maxActions}).`,
    };
  }
  if (usage.spendUsd + spend > budget.maxSpendUsd) {
    return {
      verdict: "deny",
      reason: `spend budget exhausted ($${round(usage.spendUsd + spend)} > $${budget.maxSpendUsd}).`,
    };
  }

  return {
    verdict: "allow",
    reason: `within budget; "${action.kind}" allowed autonomously.`,
    remaining: {
      actions: budget.maxActions - (usage.actionsTaken + 1),
      spendUsd: round(budget.maxSpendUsd - (usage.spendUsd + spend)),
    },
  };
}

/** A conservative default budget: a few cheap, non-destructive actions. */
export function defaultAutonomyBudget(): AutonomyBudget {
  return {
    maxActions: 25,
    maxSpendUsd: 1,
    allowedActions: ["read", "search", "score", "route", "post_status", "save_memory", "comment"],
    alwaysEscalateActions: DESTRUCTIVE_DEFAULTS,
  };
}

function round(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100) / 100;
}
