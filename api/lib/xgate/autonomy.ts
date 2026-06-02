import type { ActionClass, GateContext, GateResult, GateVerdict } from "./types.js";
import type { PolicyDecision } from "./policy-engine.js";

export interface AutonomyBudget {
  priorDenialCount?: number;
  maxConsecutiveDenials?: number;
  destructiveClasses?: readonly ActionClass[];
}

export interface AutonomyDecision extends PolicyDecision {
  authority: "auto";
  consecutiveDenialCount: number;
  halt: boolean;
  haltReason: string | null;
}

const DEFAULT_MAX_CONSECUTIVE_DENIALS = 3;
const DEFAULT_DESTRUCTIVE_CLASSES: readonly ActionClass[] = [
  "filesystem",
  "git",
  "network",
  "secret",
  "send",
  "shell",
  "ship",
  "spend",
  "sql",
];
const EXFILTRATION_CLASSES = new Set<ActionClass>(["network", "send"]);

export function applyAutonomy(
  decision: PolicyDecision,
  ctx: GateContext,
  budget: AutonomyBudget = {},
): AutonomyDecision {
  const withAutonomyRules = applyCrossCuttingRules(decision, ctx, budget);
  const maxConsecutiveDenials = normalizePositiveInteger(
    budget.maxConsecutiveDenials,
    DEFAULT_MAX_CONSECUTIVE_DENIALS,
  );
  const priorDenialCount = normalizeNonNegativeInteger(budget.priorDenialCount);
  const consecutiveDenialCount = withAutonomyRules.verdict === "deny" ? priorDenialCount + 1 : 0;
  const halt = consecutiveDenialCount >= maxConsecutiveDenials;

  return {
    ...withAutonomyRules,
    authority: "auto",
    consecutiveDenialCount,
    halt,
    haltReason: halt
      ? `XGate halted after ${consecutiveDenialCount} consecutive denied decisions.`
      : null,
  };
}

export function isDestructiveAction(
  actionClass: ActionClass,
  destructiveClasses: readonly ActionClass[] = DEFAULT_DESTRUCTIVE_CLASSES,
): boolean {
  return destructiveClasses.includes(actionClass);
}

function applyCrossCuttingRules(
  decision: PolicyDecision,
  ctx: GateContext,
  budget: AutonomyBudget,
): PolicyDecision {
  const destructiveClasses = budget.destructiveClasses ?? DEFAULT_DESTRUCTIVE_CLASSES;

  if (ctx.tainted && EXFILTRATION_CLASSES.has(ctx.action.class)) {
    const verdict: GateVerdict = ctx.autonomyLevel === "unattended" ? "deny" : "ask";
    if (isMoreRestrictive(verdict, decision.verdict)) {
      return withOverride(decision, {
        gate: "Autonomy",
        verdict,
        ruleId: "autonomy.tainted_exfiltration",
        reason:
          "This turn has ingested untrusted content, so outbound or send-capable actions need stricter review.",
        evidence: [`action_class:${ctx.action.class}`, `autonomy:${ctx.autonomyLevel}`],
      });
    }
  }

  if (
    ctx.autonomyLevel === "unattended" &&
    decision.verdict === "ask" &&
    isDestructiveAction(ctx.action.class, destructiveClasses)
  ) {
    return withOverride(decision, {
      gate: "Autonomy",
      verdict: "deny",
      ruleId: "autonomy.unattended_destructive",
      reason: "Unattended runs cannot wait for human approval on destructive actions.",
      evidence: [`action_class:${ctx.action.class}`, `environment:${ctx.environment}`],
    });
  }

  return decision;
}

function withOverride(decision: PolicyDecision, override: GateResult): PolicyDecision {
  return {
    verdict: override.verdict,
    results: [...safeResults(decision), override],
    deciding: override,
  };
}

function safeResults(decision: PolicyDecision): GateResult[] {
  return Array.isArray(decision.results) ? decision.results : [decision.deciding].filter(Boolean);
}

function isMoreRestrictive(next: GateVerdict, current: GateVerdict): boolean {
  return verdictRank(next) > verdictRank(current);
}

function verdictRank(verdict: GateVerdict): number {
  if (verdict === "deny") return 3;
  if (verdict === "ask") return 2;
  if (verdict === "rewrite") return 1;
  return 0;
}

function normalizePositiveInteger(input: unknown, fallback: number): number {
  const parsed = Number(input);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}

function normalizeNonNegativeInteger(input: unknown): number {
  const parsed = Number(input);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.floor(parsed);
}
