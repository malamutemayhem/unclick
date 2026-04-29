import { describe, expect, it } from "vitest";
import { DEFAULT_CHECKS } from "../categories.js";
import { SlopPassRunInputSchema } from "../schema.js";

describe("SlopPass run schema", () => {
  it("accepts the canonical target, files, and provider shape", () => {
    const parsed = SlopPassRunInputSchema.parse({
      target: { kind: "files", label: "fixture", files: ["src/example.ts"] },
      files: [{ path: "src/example.ts", content: "export const ok = true;" }],
    });

    expect(parsed.provider).toBe("http");
    expect(parsed.target.label).toBe("fixture");
  });

  it("keeps the six PRD categories as built-in checks", () => {
    expect(DEFAULT_CHECKS).toEqual([
      "grounding_api_reality",
      "logic_plausibility",
      "scaffold_without_substance",
      "test_proof_theatre",
      "slopocalypse_failure_mode",
      "maintenance_change_risk",
    ]);
  });

  it("rejects a run without files", () => {
    expect(() =>
      SlopPassRunInputSchema.parse({
        target: { kind: "files", label: "empty" },
        files: [],
      })
    ).toThrow();
  });
});
