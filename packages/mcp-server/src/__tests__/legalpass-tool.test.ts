import { describe, expect, it } from "vitest";

import { ADDITIONAL_HANDLERS, ADDITIONAL_TOOLS } from "../tool-wiring.js";
import {
  legalpassEditItem,
  legalpassRun,
  legalpassSavePack,
  legalpassStatus,
  legalpassVerdict,
  lintLegalPassVerdict,
} from "../legalpass-tool.js";

describe("LegalPass MCP exposure", () => {
  it("registers the deep-research MCP surface", () => {
    const names = ADDITIONAL_TOOLS.map((tool) => tool.name);
    for (const toolName of [
      "legalpass_run",
      "legalpass_status",
      "legalpass_save_pack",
      "legalpass_edit_item",
      "legalpass_verdict",
    ]) {
      expect(names).toContain(toolName);
      expect(ADDITIONAL_HANDLERS).toHaveProperty(toolName);
    }
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
    expect(JSON.stringify(result.items)).toContain("fixture_text");
    expect(String(result.note)).toContain("deterministic public fixture");
    expect(JSON.stringify(result)).not.toMatch(/you should/i);
    expect(JSON.stringify(result)).not.toMatch(/ask a qualified/i);

    const status = await legalpassStatus({ run_id: result.run_id }) as Record<string, unknown>;
    expect(status.run_id).toBe(result.run_id);
    expect(status.summary).toEqual(result.summary);
  });

  it("saves custom packs and records human edit audit entries", async () => {
    const saved = await legalpassSavePack({
      pack: {
        id: "mcp-custom-legalpass-pack",
        targets: ["url"],
        hats: [
          { hat_id: "privacy", enabled: true },
          { hat_id: "citation_verifier", enabled: true },
        ],
        items: [{ id: "privacy.001" }],
      },
    }) as Record<string, unknown>;

    expect(saved).toMatchObject({
      pack_id: "mcp-custom-legalpass-pack",
      saved: true,
      hat_count: 2,
    });

    await expect(
      legalpassSavePack({
        pack: {
          id: "mcp-missing-citation",
          targets: ["url"],
          hats: [{ hat_id: "privacy", enabled: true }],
        },
      }),
    ).resolves.toMatchObject({ error: expect.stringMatching(/citation_verifier/) });
    await expect(
      legalpassSavePack({
        pack: {
          id: "mcp-missing-runnable-hat",
          targets: ["url"],
          hats: [{ hat_id: "citation_verifier", enabled: true }],
        },
      }),
    ).resolves.toMatchObject({ error: expect.stringMatching(/phase-one LegalPass hat/) });

    const runArgs = {
      pack_id: "mcp-custom-legalpass-pack",
      target_url: "https://example.com/privacy",
      fixture_text: "Privacy contact details explain how we collect and use data.",
    };
    const run = await legalpassRun(runArgs) as Record<string, unknown>;
    expect((run.items as unknown[])).toHaveLength(3);
    const firstItem = (run.items as Array<Record<string, unknown>>)[0];
    const edited = await legalpassEditItem({
      run_id: run.run_id,
      item_id: firstItem.item_id,
      verdict: "other",
      notes: "Founder accepted this issue-spotter flag after review.",
      actor_user_id: "user-123",
    }) as Record<string, unknown>;

    expect(edited).toMatchObject({
      updated: true,
      audit_entry: {
        event: "legalpass_item_edit",
        actor_user_id: "user-123",
      },
    });
    const statusAfterEdit = await legalpassStatus({ run_id: run.run_id }) as Record<string, unknown>;
    expect(statusAfterEdit.audit_log as unknown[]).toHaveLength(1);
    expect(
      (statusAfterEdit.items as Array<Record<string, unknown>>)[0]?.verdict,
    ).toBe("other");
    const rerun = await legalpassRun(runArgs) as Record<string, unknown>;
    expect(rerun.audit_log as unknown[]).toHaveLength(1);
    expect((rerun.items as Array<Record<string, unknown>>)[0]?.verdict).toBe("other");
    await expect(
      legalpassEditItem({
        run_id: run.run_id,
        item_id: firstItem.item_id,
        notes: "The right thing to do is accept this.",
      }),
    ).resolves.toMatchObject({ error: "forbidden phrasing" });
  });

  it("returns a validation-style error when target.kind is missing", async () => {
    await expect(legalpassRun({ target: {} })).resolves.toMatchObject({
      error: "target.kind or target_url is required",
    });
  });

  it("rejects malformed MCP targets and pack shapes", async () => {
    await expect(legalpassRun({
      target_url: "ftp://example.com/terms",
    })).resolves.toMatchObject({ error: "target_url must be a valid http(s) URL" });
    await expect(legalpassRun({
      target: { kind: "url" },
    })).resolves.toMatchObject({ error: "target.url must be a valid http(s) URL" });
    await expect(legalpassRun({
      target: { kind: "contract_upload" },
    })).resolves.toMatchObject({ error: "target.upload_ref is required for contract_upload runs" });
    await expect(legalpassRun({
      target: { kind: "repo" },
    })).resolves.toMatchObject({ error: "target.repo is required for repo runs" });
    await expect(legalpassRun({
      target: { kind: "email", url: "https://example.com" },
    })).resolves.toMatchObject({ error: "target.kind must be url|contract_upload|repo" });

    await expect(
      legalpassSavePack({
        pack: {
          id: "mcp-invalid-target-pack",
          targets: ["email"],
          hats: [
            { hat_id: "privacy", enabled: true },
            { hat_id: "citation_verifier", enabled: true },
          ],
        },
      }),
    ).resolves.toMatchObject({ error: "pack.targets may only include url, contract_upload, or repo" });
    await expect(
      legalpassSavePack({
        pack: {
          id: "mcp-invalid-hat-pack",
          targets: ["url"],
          hats: [
            { hat_id: "privacy", enabled: true },
            { hat_id: "unknown_hat", enabled: true },
            { hat_id: "citation_verifier", enabled: true },
          ],
        },
      }),
    ).resolves.toMatchObject({ error: "pack.hats contains an unknown LegalPass hat_id" });
  });

  it("includes the enabled pack shape in MCP run identity", async () => {
    const packId = "mcp-overwrite-run-identity";
    await legalpassSavePack({
      pack: {
        id: packId,
        targets: ["url"],
        hats: [
          { hat_id: "privacy", enabled: true },
          { hat_id: "citation_verifier", enabled: true },
        ],
      },
      overwrite: true,
    });
    const first = await legalpassRun({
      pack_id: packId,
      target_url: "https://example.com/legal",
      fixture_text: "Privacy contact details explain how we collect and use data.",
    }) as Record<string, unknown>;

    await legalpassSavePack({
      pack: {
        id: packId,
        targets: ["url"],
        hats: [
          { hat_id: "privacy", enabled: true },
          { hat_id: "consumer_tos", enabled: true },
          { hat_id: "citation_verifier", enabled: true },
        ],
      },
      overwrite: true,
    });
    const second = await legalpassRun({
      pack_id: packId,
      target_url: "https://example.com/legal",
      fixture_text: "Privacy contact details explain how we collect and use data.",
    }) as Record<string, unknown>;

    expect(second.run_id).not.toBe(first.run_id);
    expect((second.items as unknown[]).length).toBeGreaterThan((first.items as unknown[]).length);
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
      verdict_text:
        "The right thing to do is accept this because this is unenforceable. " +
        "LegalPass is an AI lawyer with automatic compliance.",
      disclaimer_length: "chat",
    }) as Record<string, unknown>;

    expect(result.safe_to_emit).toBe(false);
    expect(JSON.stringify(result.issues)).toContain("the right thing to do is");
    expect(JSON.stringify(result.issues)).toContain("this is unenforceable");
    expect(JSON.stringify(result.issues)).toContain("ai lawyer");
    expect(JSON.stringify(result.issues)).toContain("automatic compliance");
  });

  it("blocks imperative referral wording in MCP verdict text", async () => {
    const result = await legalpassVerdict({
      verdict_text: "Ask a qualified lawyer before acting on this item.",
    }) as Record<string, unknown>;

    expect(result.safe_to_emit).toBe(false);
    expect(JSON.stringify(result.issues)).toContain("ask a qualified lawyer");
  });
});
