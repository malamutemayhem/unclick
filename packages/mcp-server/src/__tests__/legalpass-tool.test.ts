import { describe, expect, it } from "vitest";

import { ADDITIONAL_HANDLERS, ADDITIONAL_TOOLS } from "../tool-wiring.js";
import { legalpassRun, legalpassVerdict, lintLegalPassVerdict } from "../legalpass-tool.js";

describe("LegalPass MCP exposure", () => {
  it("registers legalpass_run and legalpass_verdict", () => {
    const names = ADDITIONAL_TOOLS.map((tool) => tool.name);
    expect(names).toContain("legalpass_run");
    expect(names).toContain("legalpass_verdict");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("legalpass_run");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("legalpass_verdict");
    const runTool = ADDITIONAL_TOOLS.find((tool) => tool.name === "legalpass_run");
    expect(JSON.stringify(runTool?.inputSchema)).toContain("fixture_text");
    expect(JSON.stringify(runTool?.inputSchema)).toContain("target_url");
  });

  it("plans LegalPass runs with the issue-spotter guardrail", async () => {
    const result = await legalpassRun({
      target: { kind: "url", url: "https://example.com/terms" },
      jurisdictions: ["AU"],
    }) as Record<string, unknown>;

    expect(result.status).toBe("planned");
    expect(result.pack_id).toBe("legalpass-mvp-v0");
    expect(String(result.disclaimer)).toContain("not a law firm");
    expect(result.safety).toMatchObject({
      issue_spotter_only: true,
      no_legal_advice: true,
      no_transactional_instrument: true,
    });
  });

  it("runs deterministic public fixture checks when text is provided", async () => {
    const result = await legalpassRun({
      target_url: "https://example.com/legal",
      jurisdictions: ["AU"],
      fixture_text:
        "Privacy contact details explain how we collect and use data, " +
        "retain records, share with a third party, cover liability, indemnity, " +
        "dispute support, change or terminate access, and list each dependency " +
        "license with attribution, copyleft, patent, and notice text.",
    }) as Record<string, unknown>;

    expect(result.status).toBe("complete");
    expect(result.run_id).toMatch(/^legalpass_/);
    expect(result.summary).toMatchObject({ fail: 0 });
    expect(String(result.note)).toContain("deterministic public fixture");
    expect(JSON.stringify(result)).not.toMatch(/you should/i);
  });

  it("returns a validation-style error when target.kind is missing", async () => {
    await expect(legalpassRun({ target: {} })).resolves.toMatchObject({
      error: "target.kind or target_url is required",
    });
  });

  it("lints directive LegalPass verdict language", async () => {
    expect(lintLegalPassVerdict("This clause may warrant review.")).toEqual([]);

    const result = await legalpassVerdict({
      verdict_text: "You should file this now because this is illegal.",
      disclaimer_length: "chat",
    }) as Record<string, unknown>;

    expect(result.ok).toBe(false);
    expect(result.safe_to_emit).toBe(false);
    expect(JSON.stringify(result.issues)).toContain("should");
    expect(JSON.stringify(result.issues)).toContain("this is illegal");
    expect(String(result.disclaimer)).toContain("not a law firm");
  });

  it("blocks the expanded deep-research directive phrases", async () => {
    const result = await legalpassVerdict({
      verdict_text: "The right thing to do is accept this because this is unenforceable.",
      disclaimer_length: "chat",
    }) as Record<string, unknown>;

    expect(result.safe_to_emit).toBe(false);
    expect(JSON.stringify(result.issues)).toContain("the right thing to do is");
    expect(JSON.stringify(result.issues)).toContain("this is unenforceable");
  });
});
