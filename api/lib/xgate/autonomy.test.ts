import { describe, expect, it } from "vitest";
import { applyAutonomy } from "./autonomy";

const baseContext = {
  action: {
    class: "sql",
    raw: "DELETE FROM users",
    tool: "supabase.query",
  },
  environment: "prod",
  autonomyLevel: "interactive",
  now: 1,
} as const;

function result(verdict: "allow" | "deny" | "ask" | "rewrite") {
  return {
    gate: "FixtureGate",
    verdict,
    ruleId: `fixture.${verdict}`,
    reason: "fixture decision",
    evidence: [],
  };
}

function decision(verdict: "allow" | "deny" | "ask" | "rewrite") {
  const deciding = result(verdict);
  return {
    verdict,
    results: [deciding],
    deciding,
  };
}

describe("applyAutonomy", () => {
  it("turns unattended asks on destructive actions into denies", () => {
    const applied = applyAutonomy(decision("ask"), {
      ...baseContext,
      autonomyLevel: "unattended",
    });

    expect(applied.verdict).toBe("deny");
    expect(applied.deciding).toMatchObject({
      gate: "Autonomy",
      ruleId: "autonomy.unattended_destructive",
    });
    expect(applied.consecutiveDenialCount).toBe(1);
    expect(applied.halt).toBe(false);
  });

  it("leaves interactive asks for human review", () => {
    const applied = applyAutonomy(decision("ask"), baseContext);

    expect(applied.verdict).toBe("ask");
    expect(applied.deciding.ruleId).toBe("fixture.ask");
    expect(applied.consecutiveDenialCount).toBe(0);
  });

  it("halts after the configured consecutive denial limit", () => {
    const applied = applyAutonomy(decision("deny"), baseContext, {
      priorDenialCount: 2,
      maxConsecutiveDenials: 3,
    });

    expect(applied.verdict).toBe("deny");
    expect(applied.consecutiveDenialCount).toBe(3);
    expect(applied.halt).toBe(true);
    expect(applied.haltReason).toContain("3 consecutive denied decisions");
  });

  it("escalates tainted outbound actions before they can exfiltrate", () => {
    const applied = applyAutonomy(decision("allow"), {
      ...baseContext,
      action: {
        class: "network",
        raw: "POST https://example.com",
        tool: "http.post",
      },
      tainted: true,
    });

    expect(applied.verdict).toBe("ask");
    expect(applied.deciding.ruleId).toBe("autonomy.tainted_exfiltration");
  });
});
