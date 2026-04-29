import { describe, expect, it } from "vitest";
import { buildOsvScannerCommand, osvResultFromCommand, parseOsvScannerJson } from "../probes/osv-scanner.js";

describe("OSV-Scanner probe scaffold", () => {
  it("builds a recursive JSON command spec", () => {
    const spec = buildOsvScannerCommand("/repo");
    expect(spec.command).toBe("osv-scanner");
    expect(spec.args).toEqual(["--format", "json", "--recursive", "/repo"]);
  });

  it("parses vulnerability findings from OSV JSON", () => {
    const findings = parseOsvScannerJson(JSON.stringify({
      results: [{
        packages: [{
          package: { name: "left-pad", version: "1.0.0" },
          vulnerabilities: [{
            id: "GHSA-test",
            summary: "Prototype pollution",
            severity: [{ type: "CVSS_V3", score: "HIGH" }],
          }],
        }],
      }],
    }));
    expect(findings).toHaveLength(1);
    expect(findings[0].check_id).toBe("securitypass.osv.GHSA-test");
    expect(findings[0].severity).toBe("high");
    expect(findings[0].evidence.package).toBe("left-pad");
  });

  it("wraps command output with target metadata", () => {
    const result = osvResultFromCommand(
      { type: "git", url: "https://github.com/example/repo" },
      buildOsvScannerCommand("/repo"),
      { exitCode: 0, stdout: "{\"results\":[]}", stderr: "" },
    );
    expect(result.probe).toBe("osv-scanner");
    expect(result.findings).toEqual([]);
  });
});

