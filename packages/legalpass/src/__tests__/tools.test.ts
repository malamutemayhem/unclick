import { beforeEach, describe, expect, it } from "vitest";
import {
  LEGALPASS_TOOLS,
  legalpassRunTool,
  legalpassStatusTool,
  legalpassSavePackTool,
  legalpassEditItemTool,
} from "../tools/index.js";
import { resetLegalPassToolStore } from "../tools/store.js";
import type { PackInput } from "../pack-schema.js";

const VALID_PACK: PackInput = {
  id: "custom-legalpass-pack",
  name: "Custom LegalPass Pack",
  version: "0.1.0",
  targets: ["url"],
  jurisdictions: ["AU"],
  hats: [
    { hat_id: "privacy", enabled: true, weight: 1 },
    { hat_id: "citation_verifier", enabled: true, weight: 1 },
  ],
  profile: "smoke",
  items: [
    {
      id: "privacy.001",
      hat_id: "privacy",
      title: "Privacy signal",
      category: "privacy",
      severity: "high",
    },
  ],
};

describe("LegalPass MCP tool registration", () => {
  beforeEach(() => {
    resetLegalPassToolStore();
  });

  it("registers all four tools", () => {
    expect(LEGALPASS_TOOLS).toHaveLength(4);
  });

  it("uses the canonical tool names", () => {
    const names = LEGALPASS_TOOLS.map((t) => t.name).sort();
    expect(names).toEqual([
      "legalpass_edit_item",
      "legalpass_run",
      "legalpass_save_pack",
      "legalpass_status",
    ]);
  });

  it("each tool has a non-empty description and JSON-schema input shape", () => {
    for (const tool of LEGALPASS_TOOLS) {
      expect(tool.description.length).toBeGreaterThan(0);
      expect(tool.inputSchema).toHaveProperty("type", "object");
      expect(tool.inputSchema).toHaveProperty("properties");
    }
  });

  it("runs a deterministic fixture report and stores the status", async () => {
    const args: Parameters<typeof legalpassRunTool.handler>[0] = {
      target: { kind: "url", url: "https://example.com/legal" },
      jurisdictions: ["AU"],
      fixture_documents: [
        {
          id: "public-pages",
          kind: "website",
          title: "Public legal pages",
          text:
            "Privacy contact details explain how we collect and use data, " +
            "retain records, share with a third party, cover liability, " +
            "indemnity, dispute support, and when we change or terminate access.",
        },
        {
          id: "oss",
          kind: "oss-manifest",
          title: "OSS manifest",
          text:
            "Each dependency has a license entry, attribution, copyleft marker, " +
            "patent grant, and notice text.",
        },
      ],
    };
    const result = await legalpassRunTool.handler(args);
    const repeat = await legalpassRunTool.handler(args);

    expect(result.status).toBe("complete");
    expect(result.pack_id).toBe("legalpass-mvp-v0");
    expect(repeat.run_id).toBe(result.run_id);
    expect(repeat).toEqual(result);
    expect(result.summary.fail).toBe(0);
    expect(result.summary.check).toBeGreaterThan(0);
    expect(JSON.stringify(result)).not.toMatch(/you should/i);
    expect(JSON.stringify(result)).not.toMatch(/ask a qualified/i);

    const status = await legalpassStatusTool.handler({ run_id: result.run_id });
    expect(status.run_id).toBe(result.run_id);
    expect(status.summary).toEqual(result.summary);
    expect(status.audit_log).toEqual([]);
  });

  it("keeps no-text URL runs honest as pending issue-spotter plans", async () => {
    const result = await legalpassRunTool.handler({
      target: { kind: "url", url: "https://example.com/terms" },
      profile: "smoke",
    });

    expect(result.status).toBe("complete");
    expect(result.summary.pending).toBeGreaterThan(0);
    expect(result.summary.check).toBe(0);
    expect(JSON.stringify(result)).not.toMatch(/ask a qualified/i);
  });

  it("rejects duplicate runtime jurisdictions", async () => {
    await expect(
      legalpassRunTool.handler({
        target: { kind: "url", url: "https://example.com/terms" },
        jurisdictions: ["AU", "AU"],
      }),
    ).rejects.toThrow(/jurisdictions must be unique/);
  });

  it("rejects private fixture documents until guarded ingestion exists", async () => {
    await expect(
      legalpassRunTool.handler({
        target: { kind: "contract_upload", upload_ref: "upload-123" },
        fixture_documents: [
          {
            id: "private-contract",
            kind: "terms-of-service",
            title: "Private contract",
            text: "Privacy contact and data use terms.",
            public_only: false,
          },
        ],
      }),
    ).rejects.toThrow(/fixture_documents must be public_only/);
  });

  it("validates and stores custom packs with Citation Verifier required", async () => {
    const result = await legalpassSavePackTool.handler({
      pack: VALID_PACK,
    });

    expect(result).toMatchObject({
      pack_id: "custom-legalpass-pack",
      saved: true,
      item_count: 1,
      hat_count: 2,
    });

    await expect(
      legalpassSavePackTool.handler({ pack: VALID_PACK }),
    ).rejects.toThrow(/already exists/);

    await expect(
      legalpassSavePackTool.handler({
        pack: {
          ...VALID_PACK,
          id: "missing-citation-verifier",
          hats: [{ hat_id: "privacy", enabled: true, weight: 1 }],
        },
      }),
    ).rejects.toThrow(/citation_verifier/);

    await expect(
      legalpassSavePackTool.handler({
        pack: {
          ...VALID_PACK,
          id: "missing-runnable-hat",
          hats: [{ hat_id: "citation_verifier", enabled: true, weight: 1 }],
        },
      }),
    ).rejects.toThrow(/phase-one LegalPass hat/);
  });

  it("uses the saved pack target support and enabled phase-one hats", async () => {
    await legalpassSavePackTool.handler({ pack: VALID_PACK });

    const result = await legalpassRunTool.handler({
      pack_id: VALID_PACK.id,
      target: { kind: "url", url: "https://example.com/privacy" },
      fixture_text: "Privacy contact details explain how we collect and use data.",
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.hat_id).toBe("privacy-policy");
    expect(JSON.stringify(result)).not.toMatch(/ask a qualified/i);

    await expect(
      legalpassRunTool.handler({
        pack_id: VALID_PACK.id,
        target: { kind: "repo", repo: "malamutemayhem/unclick" },
      }),
    ).rejects.toThrow(/does not support target kind/);

    await legalpassSavePackTool.handler({
      pack: {
        ...VALID_PACK,
        hats: [
          { hat_id: "privacy", enabled: true, weight: 1 },
          { hat_id: "consumer_tos", enabled: true, weight: 1 },
          { hat_id: "citation_verifier", enabled: true, weight: 1 },
        ],
      },
      overwrite: true,
    });
    const expanded = await legalpassRunTool.handler({
      pack_id: VALID_PACK.id,
      target: { kind: "url", url: "https://example.com/privacy" },
      fixture_text: "Privacy contact details explain how we collect and use data.",
    });
    expect(expanded.run_id).not.toBe(result.run_id);
    expect(expanded.items.length).toBeGreaterThan(result.items.length);
  });

  it("edits an item and blocks directive legal language", async () => {
    const runArgs: Parameters<typeof legalpassRunTool.handler>[0] = {
      target: { kind: "url", url: "https://example.com/legal" },
      fixture_text: "This sparse public page has a privacy heading only.",
    };
    const result = await legalpassRunTool.handler(runArgs);
    const itemId = result.items[0]?.item_id;
    expect(itemId).toBeTruthy();

    const edited = await legalpassEditItemTool.handler({
      run_id: result.run_id,
      item_id: itemId,
      verdict: "other",
      finding: "This item may warrant review by a qualified practitioner.",
      reviewer_note: "Founder accepted this flag after reviewing the context.",
      actor_user_id: "user-123",
    });

    expect(edited.updated).toBe(true);
    expect(edited.summary.other).toBeGreaterThan(0);
    expect(edited.audit_entry).toMatchObject({
      event: "legalpass_item_edit",
      run_id: result.run_id,
      item_id: itemId,
      actor_user_id: "user-123",
      reviewer_note: "Founder accepted this flag after reviewing the context.",
    });
    expect(edited.audit_entry.before.verdict).toBe(result.items[0]?.verdict);
    expect(edited.audit_entry.after.verdict).toBe("other");

    const statusAfterEdit = await legalpassStatusTool.handler({ run_id: result.run_id });
    expect(statusAfterEdit.audit_log).toHaveLength(1);
    expect(statusAfterEdit.audit_log[0]).toMatchObject({
      event: "legalpass_item_edit",
      item_id: itemId,
    });
    expect(
      statusAfterEdit.items.find((item) => item.item_id === itemId)?.verdict,
    ).toBe("other");

    const repeatedRun = await legalpassRunTool.handler(runArgs);
    expect(repeatedRun.audit_log).toHaveLength(1);
    expect(
      repeatedRun.items.find((item) => item.item_id === itemId)?.verdict,
    ).toBe("other");

    await expect(
      legalpassEditItemTool.handler({
        run_id: result.run_id,
        item_id: itemId,
        finding: "You should sign this now.",
      }),
    ).rejects.toThrow(/forbidden phrasing/);

    await expect(
      legalpassEditItemTool.handler({
        run_id: "   ",
        item_id: itemId,
        verdict: "other",
      }),
    ).rejects.toThrow(/run_id must not be blank/);

    await expect(
      legalpassEditItemTool.handler({
        run_id: result.run_id,
        item_id: itemId,
        verdict: "approve" as never,
      }),
    ).rejects.toThrow(/verdict must be/);

    await expect(
      legalpassEditItemTool.handler({
        run_id: result.run_id,
        item_id: itemId,
        finding: "   ",
      }),
    ).rejects.toThrow(/finding must not be blank/);

    await expect(
      legalpassEditItemTool.handler({
        run_id: result.run_id,
        item_id: itemId,
        reviewer_note: "The right thing to do is accept this.",
      }),
    ).rejects.toThrow(/forbidden phrasing/);
  });
});
