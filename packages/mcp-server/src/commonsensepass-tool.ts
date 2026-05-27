import {
  COMMONSENSEPASS_RULE_METADATA,
  COMMONSENSEPASS_WORKER_FIXTURES,
  commonsensepassCheck,
  fixtureIdsByVerdict,
  type ClaimInput,
  type ClaimKind,
  type CommonSensePassResult,
} from "@unclick/commonsensepass";

export const COMMONSENSEPASS_CLAIM_KINDS = [
  "healthy",
  "quiet",
  "no_work",
  "pass",
  "done",
  "merge_ready",
  "duplicate_wake",
  "route",
] as const satisfies readonly ClaimKind[];

export const COMMONSENSEPASS_VERDICTS = [
  "PASS",
  "BLOCKER",
  "HOLD",
  "SUPPRESS",
  "ROUTE",
] as const;

export async function commonsensepassCheckTool(
  args: Record<string, unknown>,
): Promise<CommonSensePassResult & { claim: ClaimKind }> {
  const input = normalizeCheckInput(args);
  return {
    claim: input.claim,
    ...commonsensepassCheck(input),
  };
}

export async function commonsensepassRulesTool(args: Record<string, unknown>): Promise<unknown> {
  const includeFixtures = args.include_fixtures === true;
  return {
    tool: "commonsensepass_rules",
    purpose: "Worker-readable CommonSensePass rule catalog.",
    claim_kinds: COMMONSENSEPASS_CLAIM_KINDS,
    verdicts: COMMONSENSEPASS_VERDICTS,
    default_for_unsupported_claims: "HOLD",
    rules: COMMONSENSEPASS_RULE_METADATA,
    fixture_ids_by_verdict: fixtureIdsByVerdict(),
    fixtures: includeFixtures ? COMMONSENSEPASS_WORKER_FIXTURES : undefined,
  };
}

function normalizeCheckInput(args: Record<string, unknown>): ClaimInput {
  const rawContext = isRecord(args.context) ? args.context : {};
  const context = {
    ...rawContext,
    now_ms: typeof rawContext.now_ms === "number" ? rawContext.now_ms : Date.now(),
  } as unknown as ClaimInput["context"];

  return {
    claim: args.claim as ClaimKind,
    context,
    evidence: Array.isArray(args.evidence) ? (args.evidence as ClaimInput["evidence"]) : undefined,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
