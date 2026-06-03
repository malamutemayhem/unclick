import { describe, expect, it } from "vitest";
import { scopeGate } from "./scope-gate.js";
import type { GateContext } from "../types.js";

const baseCtx: GateContext = {
  action: {
    class: "filesystem",
    raw: "write file",
    tool: "test.write",
    targetFiles: ["api/lib/xgate/gates/scope-gate.ts"],
  },
  environment: "dev",
  autonomyLevel: "interactive",
  ownedFiles: ["api/lib/xgate/gates/scope-gate.ts"],
  now: Date.parse("2026-06-02T00:00:00.000Z"),
};

describe("scopeGate", () => {
  it("denies an out-of-scope write", () => {
    const decision = scopeGate({
      ...baseCtx,
      action: {
        ...baseCtx.action,
        targetFiles: ["api/lib/xgate/gates/scope-gate.ts", "package.json"],
      },
    });

    expect(decision.verdict).toBe("deny");
    expect(decision.ruleId).toBe("scope.out_of_bounds");
    expect(decision.evidence.join(" ")).toContain("package.json");
  });

  it("allows an in-scope write", () => {
    const decision = scopeGate(baseCtx);
    expect(decision.verdict).toBe("allow");
    expect(decision.ruleId).toBe("scope.in_bounds");
  });

  it("allows when no active scope exists", () => {
    const decision = scopeGate({
      ...baseCtx,
      ownedFiles: undefined,
      action: { ...baseCtx.action, targetFiles: ["package.json"] },
    });

    expect(decision.verdict).toBe("allow");
    expect(decision.ruleId).toBe("scope.no_active_scope");
  });

  it("asks when a write has unknown targets", () => {
    const decision = scopeGate({
      ...baseCtx,
      action: {
        class: "filesystem",
        raw: "write file",
        tool: "test.write",
      },
    });

    expect(decision.verdict).toBe("ask");
    expect(decision.ruleId).toBe("scope.unknown_targets");
  });

  it("normalizes dot segments, slashes, and trailing separators", () => {
    const decision = scopeGate({
      ...baseCtx,
      ownedFiles: ["./api/lib/xgate/gates/"],
      action: {
        ...baseCtx.action,
        targetFiles: [".\\api\\lib\\xgate\\gates\\..\\gates\\scope-gate.ts"],
      },
    });

    expect(decision.verdict).toBe("allow");
    expect(decision.ruleId).toBe("scope.in_bounds");
  });
});

