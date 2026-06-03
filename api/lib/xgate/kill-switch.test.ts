import { describe, expect, it } from "vitest";
import { applyKillSwitch, isKillSwitchActive } from "./kill-switch";

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

describe("isKillSwitchActive", () => {
  it("only treats an explicit active true value as active", () => {
    expect(isKillSwitchActive({ active: true })).toBe(true);
    expect(isKillSwitchActive({ active: false })).toBe(false);
    expect(isKillSwitchActive(null)).toBe(false);
  });
});

describe("applyKillSwitch", () => {
  it("keeps inactive decisions unchanged", () => {
    const applied = applyKillSwitch(decision("ask"), { active: false });

    expect(applied.verdict).toBe("ask");
    expect(applied.authority).toBe("auto");
    expect(applied.killSwitchActive).toBe(false);
  });

  it("forces non-allow decisions to deny under kill switch authority", () => {
    const applied = applyKillSwitch(decision("ask"), {
      active: true,
      reason: "incident response",
      updated_at: "2026-06-02T00:00:00.000Z",
    });

    expect(applied.verdict).toBe("deny");
    expect(applied.authority).toBe("kill_switch");
    expect(applied.deciding).toMatchObject({
      gate: "KillSwitch",
      ruleId: "kill_switch.active",
      verdict: "deny",
    });
    expect(applied.results).toHaveLength(2);
  });

  it("leaves allow decisions frictionless when only non-allow decisions are stopped", () => {
    const applied = applyKillSwitch(decision("allow"), { active: true });

    expect(applied.verdict).toBe("allow");
    expect(applied.authority).toBe("auto");
    expect(applied.killSwitchActive).toBe(true);
  });
});
