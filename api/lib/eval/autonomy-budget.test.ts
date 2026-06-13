import { describe, it, expect } from "vitest";
import { decideAutonomy, defaultAutonomyBudget, type AutonomyBudget } from "./autonomy-budget.js";

const budget: AutonomyBudget = {
  maxActions: 3,
  maxSpendUsd: 1,
  allowedActions: ["read", "score", "route"],
  alwaysEscalateActions: ["deploy"],
};
const fresh = { actionsTaken: 0, spendUsd: 0 };

describe("decideAutonomy", () => {
  it("allows an allowlisted action within budget and reports headroom", () => {
    const d = decideAutonomy(budget, fresh, { kind: "score" });
    expect(d.verdict).toBe("allow");
    expect(d.remaining).toEqual({ actions: 2, spendUsd: 1 });
  });

  it("escalates destructive actions regardless of budget", () => {
    const d = decideAutonomy(budget, fresh, { kind: "deploy" });
    expect(d.verdict).toBe("escalate");
  });

  it("escalates an action flagged destructive even if its kind is allowlisted", () => {
    const d = decideAutonomy(budget, fresh, { kind: "read", destructive: true });
    expect(d.verdict).toBe("escalate");
  });

  it("escalates (asks) for an action not on the allowlist", () => {
    const d = decideAutonomy(budget, fresh, { kind: "tweet" });
    expect(d.verdict).toBe("escalate");
    expect(d.reason).toContain("allowlist");
  });

  it("denies once the action count is exhausted", () => {
    const d = decideAutonomy(budget, { actionsTaken: 3, spendUsd: 0 }, { kind: "read" });
    expect(d.verdict).toBe("deny");
    expect(d.reason).toContain("action budget");
  });

  it("denies when the spend ceiling would be crossed", () => {
    const d = decideAutonomy(budget, { actionsTaken: 0, spendUsd: 0.9 }, { kind: "score", estimatedSpendUsd: 0.2 });
    expect(d.verdict).toBe("deny");
    expect(d.reason).toContain("spend budget");
  });

  it("default budget escalates common destructive kinds", () => {
    const b = defaultAutonomyBudget();
    expect(decideAutonomy(b, fresh, { kind: "delete" }).verdict).toBe("escalate");
    expect(decideAutonomy(b, fresh, { kind: "read" }).verdict).toBe("allow");
  });
});
