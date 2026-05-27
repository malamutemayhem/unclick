import { describe, expect, it } from "vitest";
import {
  createFixtureSlopPassReport,
  createProvidedSourceSlopPassReport,
  createSlopPassVerdictPack,
} from "../verdict-pack.js";

describe("SlopPass verdict pack", () => {
  it("creates a plan-only advisory pack for shared scanner wiring", () => {
    const pack = createSlopPassVerdictPack({
      target: { kind: "repo", label: "unclick", ref: "main" },
      generated_at: "2026-05-09T18:42:00.000Z",
      scanner_source: {
        kind: "geopass-plan",
        mode: "plan-only",
        source_id: "geopass-source-adapter",
        shared_check_ids: ["static-source-file-inventory"],
      },
    });

    expect(pack.mode).toBe("plan-only");
    expect(pack.verdict).toBe("unknown");
    expect(pack.scanner_source.kind).toBe("geopass-plan");
    expect(pack.scope.provider).toBe("plan-only");
    expect(pack.not_checked[0]?.reason).toContain("provided source or diff evidence");
    expect(pack.smell_checks.length).toBeGreaterThan(0);
  });

  it("evaluates provided source files deterministically", () => {
    const pack = createProvidedSourceSlopPassReport({
      target: { kind: "files", label: "generated source", files: ["src/generated.ts"] },
      generated_at: "2026-05-09T18:42:00.000Z",
      files: [
        {
          path: "src/generated.ts",
          content: "export const value: any = eval(input);",
        },
      ],
      checks: ["grounding_api_reality", "maintenance_change_risk"],
    });

    expect(pack.mode).toBe("provided-source");
    expect(pack.scanner_source.kind).toBe("provided-source");
    expect(pack.scope.provider).toBe("provided-source");
    expect(pack.verdict).toBe("fail");
    expect(pack.findings).toContainEqual(
      expect.objectContaining({
        category: "grounding_api_reality",
        title: "Dynamic code execution is present",
      }),
    );
    expect(pack.not_checked.length).toBeGreaterThan(0);
  });

  it("refuses empty source evidence instead of returning a passing pack", () => {
    expect(() =>
      createProvidedSourceSlopPassReport({
        target: { kind: "files", label: "empty source", files: ["src/empty.ts"] },
        files: [{ path: "src/empty.ts", content: "" }],
      }),
    ).toThrow();
  });

  it("deduplicates files reviewed for repeated provided-source slices", () => {
    const pack = createProvidedSourceSlopPassReport({
      target: { kind: "files", label: "duplicate source", files: ["src/repeat.ts"] },
      files: [
        { path: "src/repeat.ts", content: "export const first: any = 1;" },
        { path: "src/repeat.ts", content: "export const second: any = 2;" },
      ],
      checks: ["maintenance_change_risk"],
    });

    expect(pack.scope.files_reviewed).toEqual(["src/repeat.ts"]);
    expect(pack.findings.filter((finding) => finding.title === "Type safety was bypassed")).toHaveLength(2);
  });

  it("skips blank source slices when non-empty evidence is available", () => {
    const pack = createProvidedSourceSlopPassReport({
      target: { kind: "files", label: "mixed source", files: ["src/blank.ts", "src/full.ts"] },
      files: [
        { path: "src/blank.ts", content: "  \n" },
        { path: "src/full.ts", content: "export const value: any = 1;" },
      ],
      checks: ["maintenance_change_risk"],
    });

    expect(pack.scope.files_reviewed).toEqual(["src/full.ts"]);
    expect(pack.findings).toHaveLength(1);
  });

  it("keeps the legacy fixture helper as a compatibility alias", () => {
    const pack = createFixtureSlopPassReport({
      target: { kind: "files", label: "legacy helper", files: ["src/legacy.ts"] },
      files: [{ path: "src/legacy.ts", content: "export const ok = true;" }],
    });

    expect(pack.mode).toBe("provided-source");
    expect(pack.scope.provider).toBe("provided-source");
  });

  it("keeps secret-looking provided-source evidence redacted", () => {
    const pack = createProvidedSourceSlopPassReport({
      target: { kind: "files", label: "secret source", files: ["src/config.ts"] },
      files: [
        {
          path: "src/config.ts",
          content: "export const apiKey = 'demo_token_value_12345';",
        },
      ],
      checks: ["maintenance_change_risk"],
    });

    expect(pack.verdict).toBe("fail");
    expect(JSON.stringify(pack)).not.toContain("demo_token_value_12345");
    expect(pack.findings[0]?.evidence).toBe("[redacted-secret-like-literal]");
  });
});
