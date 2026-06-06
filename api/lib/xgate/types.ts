// XGate FROZEN shared contract (Master Build Plan Section 4).
//
// Builder 1 owns this file; Builders 2-8 import it and implement a `Gate`.
// Do NOT change these signatures: every other Part composes against them.
// All gates are PURE functions of a GateContext and must never throw; on any
// doubt or parse failure they return verdict "ask" (fail closed).

export type ActionClass =
  | "filesystem" | "git" | "sql" | "secret" | "ship"
  | "spend" | "scope" | "shell" | "network" | "send";

export type Environment = "dev" | "staging" | "prod";
export type AutonomyLevel = "interactive" | "unattended";
export type GateVerdict = "allow" | "deny" | "ask" | "rewrite";
export type GateMode = "off" | "watch" | "block";

export interface ActionDescriptor {
  class: ActionClass;
  /** Raw command / SQL / payload the agent wants to run. */
  raw: string;
  /** The tool name requesting it (UnClick tool id or client tool). */
  tool: string;
  /** Optional gate-specific parsed form (argv[], SQL AST, diff, ...). */
  parsed?: unknown;
  /** Target environment if the action names one. */
  targetEnv?: Environment;
  /** Estimated USD cost, for SpendGate. */
  estimatedSpendUsd?: number;
  /** Files the action would touch, if known (for ScopeGate). */
  targetFiles?: string[];
}

export interface GateContext {
  action: ActionDescriptor;
  environment: Environment;
  autonomyLevel: AutonomyLevel;
  /** ScopePack owned files, if a scope is active. */
  ownedFiles?: string[];
  /** True if the session has ingested untrusted content this turn. */
  tainted?: boolean;
  /** Epoch ms, injected so gates stay pure. */
  now: number;
}

export interface GateResult {
  gate: string;        // e.g. "SecretGate"
  verdict: GateVerdict;
  ruleId: string;      // e.g. "secret.aws_access_key" - the address of a rule
  reason: string;      // human-readable
  rewritten?: string;  // present only when verdict === "rewrite"
  evidence: string[];  // parsed argv, matched signature, etc. (redacted)
}

/** A gate is a pure function. It must never throw; on doubt return "ask". */
export type Gate = (ctx: GateContext) => GateResult;

/** Verdict precedence when combining gates: deny > ask > rewrite > allow. */
export const VERDICT_PRECEDENCE: Record<GateVerdict, number> = {
  deny: 3, ask: 2, rewrite: 1, allow: 0,
};
