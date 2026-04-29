import { describe, expect, it } from "vitest";
import { buildGitleaksCommand, gitleaksResultFromCommand, parseGitleaksJson } from "../probes/gitleaks.js";

describe("Gitleaks probe scaffold", () => {
  it("builds an inert JSON command spec", () => {
    const spec = buildGitleaksCommand("/repo");
    expect(spec.command).toBe("gitleaks");
    expect(spec.args).toContain("detect");
    expect(spec.args).toContain("--report-format");
    expect(spec.args).toContain("json");
  });

  it("redacts secret evidence from parsed findings", () => {
    const findings = parseGitleaksJson(JSON.stringify([{
      RuleID: "generic-api-key",
      Description: "Generic API Key",
      File: ".env",
      StartLine: 2,
      Secret: "sk_live_secret",
    }]));
    expect(findings).toHaveLength(1);
    expect(findings[0].severity).toBe("critical");
    expect(findings[0].evidence.secret_redacted).toBe("[redacted]");
    expect(JSON.stringify(findings)).not.toContain("sk_live_secret");
  });

  it("wraps command output without executing anything", () => {
    const command = buildGitleaksCommand("/repo");
    const result = gitleaksResultFromCommand(
      { type: "git", url: "https://github.com/example/repo" },
      command,
      { exitCode: 1, stdout: "[]", stderr: "scan complete" },
    );
    expect(result.probe).toBe("gitleaks");
    expect(result.findings).toEqual([]);
    expect(result.raw).toEqual({ exitCode: 1, stderr: "scan complete" });
  });
});

