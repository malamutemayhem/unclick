import { describe, expect, it } from "vitest";
import {
  XGATE_EVAL_FIXTURES,
  findXGateEvalFixture,
  matchesXGateFixture,
  type XGateEvalDecision,
} from "./xgate-fixtures.js";

const SECRET_SHAPE = /\b(AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{12,}|xox[baprs]-[A-Za-z0-9-]{8,})\b/;

describe("XGate eval fixtures", () => {
  it("keeps the canonical fixture ids stable and unique", () => {
    const ids = XGATE_EVAL_FIXTURES.map((fixture) => fixture.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(findXGateEvalFixture("xgate.git.force_push_main")?.expected.verdict).toBe("deny");
    expect(findXGateEvalFixture("xgate.secret.commit_denied")?.expected.gate).toBe("SecretGate");
    expect(findXGateEvalFixture("xgate.scope.scoped_delete_allowed")?.expected.verdict).toBe("allow");
    expect(findXGateEvalFixture("xgate.trendslop.sycophancy_rewrite")?.expected.ruleId).toBe("TSG-AGREE-001");
    expect(findXGateEvalFixture("xgate.trendslop.context_ask")?.expected.ruleId).toBe("TSG-CTX-001");
    expect(findXGateEvalFixture("xgate.trendslop.buzzword_rewrite")?.expected.ruleId).toBe("TSG-BUZZ-001");
    expect(findXGateEvalFixture("xgate.trendslop.premise_deny")?.expected.ruleId).toBe("TSG-PREMISE-001");
    expect(findXGateEvalFixture("xgate.trendslop.stance_flip_rewrite")?.expected.ruleId).toBe("TSG-FLIP-001");
  });

  it("stores redacted secret scenarios without hardcoded credential values", () => {
    for (const fixture of XGATE_EVAL_FIXTURES) {
      expect(fixture.context.action.raw).not.toMatch(SECRET_SHAPE);
      expect(JSON.stringify(fixture.context.action.parsed ?? {})).not.toMatch(SECRET_SHAPE);
    }
  });

  it("matches decisions only when the expected verdict and rule line up", () => {
    for (const fixture of XGATE_EVAL_FIXTURES) {
      const passingDecision: XGateEvalDecision = {
        verdict: fixture.expected.verdict,
        gate: fixture.expected.gate,
        ruleId: fixture.expected.ruleId,
        actionClass: fixture.expected.actionClass,
      };
      const failingDecision: XGateEvalDecision = { ...passingDecision, verdict: "ask" };

      expect(matchesXGateFixture(fixture, passingDecision)).toBe(true);
      expect(matchesXGateFixture(fixture, failingDecision)).toBe(fixture.expected.verdict === "ask");
    }
  });
});
