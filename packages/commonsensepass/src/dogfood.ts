import { commonsensepassCheck } from "./check.js";
import {
  COMMONSENSEPASS_WORKER_FIXTURES,
  type CommonSensePassFixture,
} from "./fixtures.js";
import type { CommonSensePassResult, RuleId, Verdict } from "./schema.js";

export interface CommonSensePassDogfoodCase {
  id: string;
  title: string;
  status: "passing" | "failing";
  expected_verdict: Verdict;
  actual_verdict: Verdict;
  expected_rule_id: RuleId | null | undefined;
  actual_rule_id: RuleId | null;
  reason: string;
  evidence_refs: string[];
  next_action?: string;
  route_to?: string;
}

export interface CommonSensePassDogfoodReceipt {
  kind: "commonsensepass_dogfood_receipt_v1";
  generatedAt: string;
  status: "passing" | "failing";
  source: string;
  headline: string;
  proofPolicy: string;
  scenarioIds: string[];
  summary: {
    total: number;
    passing: number;
    failing: number;
  };
  results: CommonSensePassDogfoodCase[];
}

export const COMMONSENSEPASS_DOGFOOD_SCENARIO_IDS = [
  "false-quiet-with-backlog",
  "no-work-with-backlog",
  "duplicate-wake-suppress",
  "done-without-proof",
  "quiet-empty-queue-pass",
  "route-specialist-lane",
] as const;

export function buildCommonSensePassDogfoodReceipt(options: {
  generatedAt?: string;
  source?: string;
  scenarioIds?: readonly string[];
} = {}): CommonSensePassDogfoodReceipt {
  const scenarioIds = options.scenarioIds ?? COMMONSENSEPASS_DOGFOOD_SCENARIO_IDS;
  const results = scenarioIds.map((id) => runFixture(id));
  const passing = results.filter((result) => result.status === "passing").length;
  const failing = results.length - passing;

  return {
    kind: "commonsensepass_dogfood_receipt_v1",
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    status: failing === 0 ? "passing" : "failing",
    source: options.source ?? "commonsensepass fixture dogfood runner",
    headline: "CommonSensePass blocks fake quiet, fake done, duplicate wakes, and wrong-lane work.",
    proofPolicy:
      "Passing means each listed scenario executed through commonsensepassCheck and matched its expected verdict and rule id.",
    scenarioIds: [...scenarioIds],
    summary: {
      total: results.length,
      passing,
      failing,
    },
    results,
  };
}

function runFixture(id: string): CommonSensePassDogfoodCase {
  const fixture = COMMONSENSEPASS_WORKER_FIXTURES.find((candidate) => candidate.id === id);
  if (!fixture) {
    throw new Error(`Missing CommonSensePass dogfood fixture: ${id}`);
  }
  const result = runFixtureInput(fixture);
  const expectedRuleId = fixture.expected_rule_id;
  const status =
    result.verdict === fixture.expected_verdict &&
    (expectedRuleId === undefined || result.rule_id === expectedRuleId)
      ? "passing"
      : "failing";

  return {
    id: fixture.id,
    title: fixture.title,
    status,
    expected_verdict: fixture.expected_verdict,
    actual_verdict: result.verdict,
    expected_rule_id: expectedRuleId,
    actual_rule_id: result.rule_id,
    reason: result.reason,
    evidence_refs: result.evidence.map((evidence) => evidence.ref),
    next_action: result.next_action,
    route_to: result.route_to,
  };
}

function runFixtureInput(fixture: CommonSensePassFixture): CommonSensePassResult {
  if (fixture.reserved_result) return fixture.reserved_result;
  if (!fixture.input) {
    throw new Error(`CommonSensePass fixture ${fixture.id} has no executable input`);
  }
  return commonsensepassCheck(fixture.input);
}
