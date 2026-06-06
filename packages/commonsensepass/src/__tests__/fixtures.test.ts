import { describe, expect, it } from "vitest";
import { commonsensepassCheck } from "../check.js";
import {
  COMMONSENSEPASS_WORKER_FIXTURES,
  CommonSensePassFixture,
  fixtureIdsByVerdict,
} from "../fixtures.js";
import { Verdict } from "../schema.js";

const REQUIRED_SCENARIOS = [
  "false-quiet-with-backlog",
  "stale-proof-pass",
  "duplicate-wake-suppress",
  "no-work-with-backlog",
  "merge-ready-without-proof",
  "done-without-proof",
  "route-specialist-lane",
];

function resultForFixture(fixture: CommonSensePassFixture) {
  if (fixture.reserved_result) return fixture.reserved_result;
  if (!fixture.input) {
    throw new Error(`Fixture ${fixture.id} has no input or reserved result.`);
  }
  return commonsensepassCheck(fixture.input);
}

describe("CommonSensePass worker fixtures", () => {
  it("covers every public verdict", () => {
    const idsByVerdict = fixtureIdsByVerdict();
    const verdicts: Verdict[] = [
      "PASS",
      "BLOCKER",
      "HOLD",
      "SUPPRESS",
      "ROUTE",
    ];

    for (const verdict of verdicts) {
      expect(idsByVerdict[verdict].length, verdict).toBeGreaterThan(0);
    }
  });

  it("deterministically produces the expected verdict and rule id", () => {
    for (const fixture of COMMONSENSEPASS_WORKER_FIXTURES) {
      const result = resultForFixture(fixture);
      expect(result.verdict, fixture.id).toBe(fixture.expected_verdict);
      expect(result.rule_id, fixture.id).toBe(fixture.expected_rule_id);
    }
  });

  it("includes the named live worker failure modes", () => {
    const fixtureIds = new Set(
      COMMONSENSEPASS_WORKER_FIXTURES.map((fixture) => fixture.id),
    );

    for (const requiredScenario of REQUIRED_SCENARIOS) {
      expect(fixtureIds.has(requiredScenario), requiredScenario).toBe(true);
    }
  });

  it("emits ROUTE through executable R6 lane evidence", () => {
    const routeFixture = COMMONSENSEPASS_WORKER_FIXTURES.find(
      (fixture) => fixture.expected_verdict === "ROUTE",
    );
    if (!routeFixture) {
      throw new Error("Missing CommonSensePass ROUTE fixture");
    }

    const result = resultForFixture(routeFixture);
    expect(result.rule_id).toBe("R6");
    expect(result.route_to).toBe("securitypass");
  });
});
