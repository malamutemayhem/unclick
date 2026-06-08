import { describe, it, expect } from "vitest";
import { evaluate, allowedActions } from "../permission-policy.js";
import type { Policy } from "../permission-policy.js";

describe("evaluate", () => {
  it("allows matching action", () => {
    const policy: Policy = {
      name: "basic",
      statements: [{ effect: "allow", actions: ["read"], resources: ["*"] }],
    };
    expect(evaluate([policy], { action: "read", resource: "doc1" })).toBe("allow");
  });

  it("denies unmatched action", () => {
    const policy: Policy = {
      name: "basic",
      statements: [{ effect: "allow", actions: ["read"], resources: ["*"] }],
    };
    expect(evaluate([policy], { action: "write", resource: "doc1" })).toBe("deny");
  });

  it("explicit deny overrides allow", () => {
    const policies: Policy[] = [
      { name: "allow", statements: [{ effect: "allow", actions: ["*"], resources: ["*"] }] },
      { name: "deny", statements: [{ effect: "deny", actions: ["delete"], resources: ["*"] }] },
    ];
    expect(evaluate(policies, { action: "delete", resource: "doc1" })).toBe("deny");
    expect(evaluate(policies, { action: "read", resource: "doc1" })).toBe("allow");
  });

  it("matches wildcard actions", () => {
    const policy: Policy = {
      name: "admin",
      statements: [{ effect: "allow", actions: ["*"], resources: ["*"] }],
    };
    expect(evaluate([policy], { action: "anything", resource: "anywhere" })).toBe("allow");
  });

  it("evaluates conditions", () => {
    const policy: Policy = {
      name: "cond",
      statements: [{
        effect: "allow",
        actions: ["read"],
        resources: ["*"],
        conditions: { role: { in: ["admin", "editor"] } },
      }],
    };
    expect(evaluate([policy], { action: "read", resource: "x", environment: { role: "admin" } })).toBe("allow");
    expect(evaluate([policy], { action: "read", resource: "x", environment: { role: "viewer" } })).toBe("deny");
  });

  it("matches resource patterns", () => {
    const policy: Policy = {
      name: "scoped",
      statements: [{ effect: "allow", actions: ["read"], resources: ["docs/*"] }],
    };
    expect(evaluate([policy], { action: "read", resource: "docs/123" })).toBe("allow");
    expect(evaluate([policy], { action: "read", resource: "images/456" })).toBe("deny");
  });
});

describe("allowedActions", () => {
  it("lists allowed actions for resource", () => {
    const policy: Policy = {
      name: "basic",
      statements: [
        { effect: "allow", actions: ["read", "write"], resources: ["docs/*"] },
        { effect: "deny", actions: ["write"], resources: ["docs/*"] },
      ],
    };
    expect(allowedActions([policy], "docs/123")).toEqual(["read"]);
  });
});
