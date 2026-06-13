import { describe, it, expect } from "vitest";
import {
  requireTestFloor,
  checkPrScope,
  detectDuplicatePaths,
} from "./parallel-build-guard.js";

describe("requireTestFloor", () => {
  it("passes when a new logic file ships with its co-located test", () => {
    const r = requireTestFloor([
      "api/lib/xgate/gates/secret-gate.ts",
      "api/lib/xgate/gates/secret-gate.test.ts",
    ]);
    expect(r.ok).toBe(true);
    expect(r.covered).toContain("api/lib/xgate/gates/secret-gate.ts");
  });

  it("flags a logic file shipped with no test (the Part 10 page case)", () => {
    const r = requireTestFloor(["src/pages/admin/AdminXGate.tsx"]);
    expect(r.ok).toBe(false);
    expect(r.missingTests).toEqual(["src/pages/admin/AdminXGate.tsx"]);
  });

  it("exempts types, index, schema, config, generated, and non-code files", () => {
    const r = requireTestFloor([
      "api/lib/xgate/types.ts",
      "api/lib/eval/index.ts",
      "packages/foo/src/schema.ts",
      "vitest.config.ts",
      "docs/UnClick-brainmap.generated.json",
      "docs/readme.md",
      "supabase/migrations/x.sql",
    ]);
    expect(r.ok).toBe(true);
    expect(r.missingTests).toEqual([]);
  });

  it("ignores files outside logic roots", () => {
    const r = requireTestFloor(["scripts/thing.mjs", "random/elsewhere.ts"]);
    expect(r.ok).toBe(true);
  });

  it("matches a test in the same changeset even if listed first", () => {
    const r = requireTestFloor([
      "api/lib/fleet/parallel-build-guard.test.ts",
      "api/lib/fleet/parallel-build-guard.ts",
    ]);
    expect(r.ok).toBe(true);
  });
});

describe("checkPrScope", () => {
  it("passes when every changed file is inside an owned glob", () => {
    const r = checkPrScope(
      ["api/lib/xgate/gates/git-gate.ts", "api/lib/xgate/gates/git-gate.test.ts"],
      ["api/lib/xgate/gates/"],
    );
    expect(r.ok).toBe(true);
  });

  it("flags a file written outside the declared scope (the Part 7 case)", () => {
    const r = checkPrScope(
      [
        "api/lib/xgate/gates/scope-gate.ts",
        "api/lib/xgate/types.ts", // out of lane: Part 1 owns this
      ],
      ["api/lib/xgate/gates/scope-gate.ts", "api/lib/xgate/gates/spend-gate.ts"],
    );
    expect(r.ok).toBe(false);
    expect(r.outOfScope).toEqual(["api/lib/xgate/types.ts"]);
  });

  it("supports ** globs across depth", () => {
    const r = checkPrScope(["api/lib/xgate/gates/a/b/c.ts"], ["api/lib/xgate/**"]);
    expect(r.ok).toBe(true);
  });

  it("supports single-star within a segment only", () => {
    const within = checkPrScope(["api/lib/x/secret-gate.ts"], ["api/lib/x/*.ts"]);
    expect(within.ok).toBe(true);
    const across = checkPrScope(["api/lib/x/deep/secret-gate.ts"], ["api/lib/x/*.ts"]);
    expect(across.ok).toBe(false);
  });

  it("fails closed when no scope is declared", () => {
    const r = checkPrScope(["api/lib/anything.ts"], []);
    expect(r.ok).toBe(false);
    expect(r.outOfScope).toEqual(["api/lib/anything.ts"]);
  });
});

describe("detectDuplicatePaths", () => {
  it("reports a path created by more than one branch (the contract dup case)", () => {
    const r = detectDuplicatePaths([
      { branch: "part-1", addedFiles: ["api/lib/xgate/types.ts", "api/lib/xgate/ledger.ts"] },
      { branch: "part-2", addedFiles: ["api/lib/xgate/types.ts", "api/lib/xgate/gates/secret-gate.ts"] },
      { branch: "part-7", addedFiles: ["api/lib/xgate/types.ts", "api/lib/xgate/policy-engine.ts"] },
    ]);
    expect(r.ok).toBe(false);
    const dup = r.collisions.find((c) => c.path === "api/lib/xgate/types.ts");
    expect(dup?.branches).toEqual(["part-1", "part-2", "part-7"]);
  });

  it("passes when every branch owns distinct paths", () => {
    const r = detectDuplicatePaths([
      { branch: "a", addedFiles: ["api/lib/xgate/gates/git-gate.ts"] },
      { branch: "b", addedFiles: ["api/lib/xgate/gates/ship-gate.ts"] },
    ]);
    expect(r.ok).toBe(true);
    expect(r.collisions).toEqual([]);
  });

  it("normalizes paths so ./ and trailing-slash variants collide", () => {
    const r = detectDuplicatePaths([
      { branch: "a", addedFiles: ["./api/lib/x.ts"] },
      { branch: "b", addedFiles: ["api/lib/x.ts"] },
    ]);
    expect(r.ok).toBe(false);
  });
});
