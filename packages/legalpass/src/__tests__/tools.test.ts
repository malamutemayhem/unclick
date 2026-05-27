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

    const status = await legalpassStatusTool.handler({ run_id: result.run_id });
    expect(status.run_id).toBe(result.run_id);
    expect(status.summary).toEqual(result.summary);
  });

  it("keeps no-text URL runs honest as pending issue-spotter plans", async () => {
    const result = await legalpassRunTool.handler({
      target: { kind: "url", url: "https://example.com/terms" },
      profile: "smoke",
    });

    expect(result.status).toBe("complete");
    expect(result.summary.pending).toBeGreaterThan(0);
    expect(result.summary.check).toBe(0);
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
  });

  it("edits an item and blocks directive legal language", async () => {
    const result = await legalpassRunTool.handler({
      target: { kind: "url", url: "https://example.com/legal" },
      fixture_text: "This sparse public page has a privacy heading only.",
    });
    const itemId = result.items[0]?.item_id;
    expect(itemId).toBeTruthy();

    const edited = await legalpassEditItemTool.handler({
      run_id: result.run_id,
      item_id: itemId,
      verdict: "other",
      finding: "This item may warrant review by a qualified practitioner.",
    });

    expect(edited.updated).toBe(true);
    expect(edited.summary.other).toBeGreaterThan(0);

    await expect(
      legalpassEditItemTool.handler({
        run_id: result.run_id,
        item_id: itemId,
        finding: "You should sign this now.",
      }),
    ).rejects.toThrow(/forbidden phrasing/);
  });
});
