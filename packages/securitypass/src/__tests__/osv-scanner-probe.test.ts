import { describe, expect, it } from "vitest";
import { buildOsvScannerCommand, osvResultFromCommand, parseOsvScannerJson } from "../probes/osv-scanner.js";

describe("OSV-Scanner probe scaffold", () => {
  it("builds a recursive JSON command spec", () => {
    const spec = buildOsvScannerCommand("/repo");
    expect(spec.command).toBe("osv-scanner");
    expect(spec.args).toEqual([
      "scan",
      "source",
      "--format",
      "json",
      "--recursive",
      "--no-call-analysis=rust",
      "/repo",
    ]);
    expect(spec.timeoutMs).toBeGreaterThan(0);
  });

  it("parses vulnerability findings from OSV JSON", () => {
    const findings = parseOsvScannerJson(JSON.stringify({
      results: [{
        source: { path: "/repo/package-lock.json", type: "lockfile" },
        packages: [{
          package: { name: "left-pad", version: "1.0.0", ecosystem: "npm" },
          vulnerabilities: [{
            id: "GHSA-test",
            aliases: ["CVE-2026-0001"],
            summary: "Prototype pollution",
            severity: [{ type: "CVSS_V3", score: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H" }],
            affected: [{
              ranges: [{
                type: "SEMVER",
                events: [
                  { introduced: "0" },
                  { fixed: "1.0.1" },
                ],
              }],
            }],
            references: [{ type: "ADVISORY", url: "https://osv.dev/GHSA-test" }],
            modified: "2026-05-01T00:00:00Z",
          }],
          groups: [{
            ids: ["GHSA-test", "CVE-2026-0001"],
            experimentalAnalysis: { "GHSA-test": { called: false } },
          }],
        }],
      }],
    }));
    expect(findings).toHaveLength(1);
    expect(findings[0].check_id).toBe("securitypass.osv.GHSA-test");
    expect(findings[0].severity).toBe("high");
    expect(findings[0].evidence.package).toBe("left-pad");
    expect(findings[0].evidence.ecosystem).toBe("npm");
    expect(findings[0].evidence.source_path).toBe("/repo/package-lock.json");
    expect(findings[0].evidence.aliases).toEqual(["CVE-2026-0001"]);
    expect(findings[0].evidence.fixed_versions).toEqual(["1.0.1"]);
    expect(findings[0].evidence.references).toEqual([{ type: "ADVISORY", url: "https://osv.dev/GHSA-test" }]);
    expect(findings[0].evidence.modified).toBe("2026-05-01T00:00:00Z");
    expect(findings[0].evidence.cvss_scores).toEqual([{
      type: "CVSS_V3",
      vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H",
      score: 8.8,
    }]);
    expect(findings[0].evidence.call_analysis).toEqual([{
      ids: ["GHSA-test", "CVE-2026-0001"],
      analysis: { "GHSA-test": { called: false } },
    }]);
  });

  it("scores official OSV CVSS vector strings from affected severity entries", () => {
    const findings = parseOsvScannerJson(JSON.stringify({
      results: [{
        packages: [{
          package: { name: "x509-validation", version: "1.4.0", ecosystem: "Hackage" },
          vulnerabilities: [{
            id: "HSEC-2023-0006",
            summary: "x509-validation does not enforce pathLenConstraint",
            affected: [{
              severity: [{
                type: "CVSS_V3",
                score: "CVSS:3.1/AV:N/AC:H/PR:H/UI:R/S:U/C:H/I:H/A:N",
              }],
            }],
          }],
        }],
      }],
    }));

    expect(findings[0].severity).toBe("medium");
    expect(findings[0].evidence.cvss_scores).toEqual([{
      type: "CVSS_V3",
      vector: "CVSS:3.1/AV:N/AC:H/PR:H/UI:R/S:U/C:H/I:H/A:N",
      score: 5.7,
    }]);
  });

  it("keeps older CVSS v2 vectors from being treated as low text", () => {
    const findings = parseOsvScannerJson(JSON.stringify({
      results: [{
        packages: [{
          package: { name: "legacy", version: "1.0.0", ecosystem: "npm" },
          vulnerabilities: [{
            id: "CVE-LEGACY",
            severity: [{ type: "CVSS_V2", score: "AV:N/AC:L/Au:N/C:P/I:P/A:P" }],
          }],
        }],
      }],
    }));

    expect(findings[0].severity).toBe("high");
    expect(findings[0].evidence.cvss_scores).toEqual([{
      type: "CVSS_V2",
      vector: "AV:N/AC:L/Au:N/C:P/I:P/A:P",
      score: 7.5,
    }]);
  });

  it("falls back conservatively for newer CVSS vectors it cannot numerically score yet", () => {
    const findings = parseOsvScannerJson(JSON.stringify({
      results: [{
        packages: [{
          package: { name: "future-vector", version: "1.0.0", ecosystem: "Ubuntu" },
          vulnerabilities: [{
            id: "UBUNTU-CVE-2026-1234",
            severity: [{
              type: "CVSS_V4",
              score: "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:N/VA:N/SC:N/SI:N/SA:N",
            }],
          }],
        }],
      }],
    }));

    expect(findings[0].severity).toBe("high");
    expect(findings[0].evidence.cvss_scores).toEqual([]);
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

