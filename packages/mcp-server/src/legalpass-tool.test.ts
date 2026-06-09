import { describe, expect, it } from "vitest";

import {
  legalpassEditItem,
  legalpassRun,
  legalpassSavePack,
  legalpassStatus,
  legalpassVerdict,
  lintLegalPassVerdict,
} from "./legalpass-tool.js";

describe("legalpass connector (L2)", () => {
  // ── lintLegalPassVerdict ───────────────────────────────────────────────────

  it("returns empty array for clean text", () => {
    const issues = lintLegalPassVerdict("This clause appears unusual compared to similar contracts.");
    expect(issues).toEqual([]);
  });

  it("catches forbidden directive verbs", () => {
    const issues = lintLegalPassVerdict("You should sign this contract.");
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0].phrase).toBe("should");
  });

  it("catches definitive legal conclusions", () => {
    const issues = lintLegalPassVerdict("This is illegal under Australian law.");
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0].phrase).toBe("this is illegal");
  });

  it("catches substitute-for-lawyer claims", () => {
    const issues = lintLegalPassVerdict("Our AI lawyer will handle your case.");
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.some((i) => i.phrase === "ai lawyer")).toBe(true);
  });

  it("catches multiple forbidden phrases and sorts by index", () => {
    const issues = lintLegalPassVerdict("You must do this and it is safe to sign.");
    expect(issues.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < issues.length; i++) {
      expect(issues[i].index).toBeGreaterThanOrEqual(issues[i - 1].index);
    }
  });

  // ── legalpassVerdict ──────────────────────────────────────────────────────

  it("returns ok:true for clean verdict text", async () => {
    const r = await legalpassVerdict({ verdict_text: "This clause appears standard." }) as Record<string, unknown>;
    expect(r.ok).toBe(true);
    expect(r.safe_to_emit).toBe(true);
    expect(r.issues).toEqual([]);
    expect(r.disclaimer).toBeDefined();
  });

  it("returns ok:false for forbidden verdict text", async () => {
    const r = await legalpassVerdict({ verdict_text: "You should accept this." }) as Record<string, unknown>;
    expect(r.ok).toBe(false);
    expect(r.safe_to_emit).toBe(false);
    expect((r.issues as unknown[]).length).toBeGreaterThan(0);
  });

  it("returns allowed_framing phrases", async () => {
    const r = await legalpassVerdict({ verdict_text: "" }) as Record<string, unknown>;
    expect(Array.isArray(r.allowed_framing)).toBe(true);
    expect((r.allowed_framing as string[])).toContain("appears");
    expect((r.allowed_framing as string[])).toContain("consider");
  });

  // ── legalpassRun ──────────────────────────────────────────────────────────

  it("returns an error for unknown pack_id", async () => {
    const r = await legalpassRun({ pack_id: "nonexistent-pack", target_url: "https://example.com" }) as Record<string, unknown>;
    expect(r.error).toMatch(/was not found/);
  });

  it("returns an error when target is missing", async () => {
    const r = await legalpassRun({}) as Record<string, unknown>;
    expect(r.error).toMatch(/target/i);
  });

  it("creates a planned run when no fixture_text is given", async () => {
    const r = await legalpassRun({
      target_url: "https://example.com",
    }) as Record<string, unknown>;
    expect(r.status).toBe("planned");
    expect(r.run_id).toBeDefined();
    expect(r.disclaimer).toBeDefined();
    expect((r as any).safety.issue_spotter_only).toBe(true);
    expect((r as any).safety.no_legal_advice).toBe(true);
    expect((r as any).legalpass_receipt_v1).toBeDefined();
  });

  it("creates a complete run with fixture_text", async () => {
    const r = await legalpassRun({
      target_url: "https://example.com",
      fixture_text: "We collect your email for contact purposes. Use data to improve service. You may delete your account. Patent notice applies.",
    }) as Record<string, unknown>;
    expect(r.status).toBe("complete");
    expect(r.run_id).toBeDefined();
    expect(Array.isArray((r as any).items)).toBe(true);
  });

  it("rejects an unsupported target kind via target object", async () => {
    const r = await legalpassRun({
      target: { kind: "unsupported" },
    }) as Record<string, unknown>;
    expect(r.error).toMatch(/target\.kind must be/);
  });

  // ── legalpassStatus ───────────────────────────────────────────────────────

  it("returns an error when run_id is missing", async () => {
    const r = await legalpassStatus({}) as Record<string, unknown>;
    expect(r.error).toBe("run_id is required");
  });

  it("returns an error for unknown run_id", async () => {
    const r = await legalpassStatus({ run_id: "no-such-run" }) as Record<string, unknown>;
    expect(r.error).toMatch(/was not found/);
  });

  it("returns a previously created run by run_id", async () => {
    const created = await legalpassRun({
      target_url: "https://status-test.example.com",
    }) as Record<string, unknown>;
    const runId = created.run_id as string;
    const r = await legalpassStatus({ run_id: runId }) as Record<string, unknown>;
    expect(r.run_id).toBe(runId);
    expect(r.status).toBe("planned");
  });

  // ── legalpassSavePack ─────────────────────────────────────────────────────

  it("returns an error when pack object is missing", async () => {
    const r = await legalpassSavePack({}) as Record<string, unknown>;
    expect(r.error).toMatch(/pack object or yaml is required/);
  });

  it("returns an error when pack.id is missing", async () => {
    const r = await legalpassSavePack({
      pack: { targets: ["url"], hats: [{ hat_id: "privacy" }] },
    }) as Record<string, unknown>;
    expect(r.error).toMatch(/pack\.id or pack_id is required/);
  });

  it("saves a valid pack", async () => {
    const r = await legalpassSavePack({
      pack: {
        id: "test-pack-save",
        targets: ["url"],
        hats: [{ hat_id: "privacy", enabled: true }, { hat_id: "citation_verifier", enabled: true }],
      },
    }) as Record<string, unknown>;
    expect(r.saved).toBe(true);
    expect(r.pack_id).toBe("test-pack-save");
  });

  it("rejects duplicate pack without overwrite", async () => {
    await legalpassSavePack({
      pack: {
        id: "test-pack-dup",
        targets: ["url"],
        hats: [{ hat_id: "privacy" }, { hat_id: "citation_verifier" }],
      },
    });
    const r = await legalpassSavePack({
      pack: {
        id: "test-pack-dup",
        targets: ["url"],
        hats: [{ hat_id: "privacy" }, { hat_id: "citation_verifier" }],
      },
    }) as Record<string, unknown>;
    expect(r.error).toMatch(/already exists.*overwrite/);
  });

  it("accepts yaml string as pack input", async () => {
    const yamlStr = `
id: test-pack-yaml
targets:
  - url
hats:
  - hat_id: privacy
    enabled: true
  - hat_id: citation_verifier
    enabled: true
`;
    const r = await legalpassSavePack({ yaml: yamlStr }) as Record<string, unknown>;
    expect(r.saved).toBe(true);
    expect(r.pack_id).toBe("test-pack-yaml");
  });

  it("rejects packs with invalid target kinds", async () => {
    const r = await legalpassSavePack({
      pack: {
        id: "bad-targets",
        targets: ["fax"],
        hats: [{ hat_id: "privacy" }],
      },
    }) as Record<string, unknown>;
    expect(r.error).toMatch(/targets may only include/);
  });

  // ── legalpassEditItem ─────────────────────────────────────────────────────

  it("returns an error when run_id is missing from edit_item", async () => {
    const r = await legalpassEditItem({}) as Record<string, unknown>;
    expect(r.error).toBe("run_id is required");
  });

  it("returns an error when item_id is missing from edit_item", async () => {
    const r = await legalpassEditItem({ run_id: "some-run" }) as Record<string, unknown>;
    expect(r.error).toBe("item_id is required");
  });

  it("returns an error for unknown run_id in edit_item", async () => {
    const r = await legalpassEditItem({ run_id: "no-such-run", item_id: "i1" }) as Record<string, unknown>;
    expect(r.error).toMatch(/was not found/);
  });

  it("returns an error for invalid verdict", async () => {
    const created = await legalpassRun({
      target_url: "https://edit-test.example.com",
      fixture_text: "We collect your email for contact. Use data to improve. Patent notice.",
    }) as Record<string, unknown>;
    const items = (created as any).items as Array<{ item_id: string }>;
    if (items.length > 0) {
      const r = await legalpassEditItem({
        run_id: created.run_id,
        item_id: items[0].item_id,
        verdict: "invalid_verdict",
      }) as Record<string, unknown>;
      expect(r.error).toMatch(/verdict must be/);
    }
  });

  it("rejects edit_item with forbidden phrasing in notes", async () => {
    const created = await legalpassRun({
      target_url: "https://lint-edit.example.com",
      fixture_text: "We collect your email for contact. Use data to improve. Patent notice.",
    }) as Record<string, unknown>;
    const items = (created as any).items as Array<{ item_id: string }>;
    if (items.length > 0) {
      const r = await legalpassEditItem({
        run_id: created.run_id,
        item_id: items[0].item_id,
        verdict: "check",
        finding: "You should sign this.",
      }) as Record<string, unknown>;
      expect(r.error).toMatch(/forbidden phrasing/);
    }
  });
});
