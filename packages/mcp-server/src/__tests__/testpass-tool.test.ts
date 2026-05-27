import { afterEach, describe, expect, it, vi } from "vitest";

import { ADDITIONAL_TOOLS } from "../tool-wiring.js";
import { testpassEditItem, testpassRun, testpassSavePack } from "../testpass-tool.js";

const originalFetch = globalThis.fetch;
const originalApiKey = process.env.UNCLICK_API_KEY;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalApiKey === undefined) delete process.env.UNCLICK_API_KEY;
  else process.env.UNCLICK_API_KEY = originalApiKey;
  vi.restoreAllMocks();
});

function okJson(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    text: async () => JSON.stringify(body),
  } as Response;
}

describe("TestPass MCP tool", () => {
  it("passes UUID pack identifiers as pack_id instead of pack_slug", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ run_id: "run-1" }));
    globalThis.fetch = fetchMock as typeof fetch;

    await testpassRun({
      target_url: "https://example.test/mcp",
      pack_id: "550e8400-e29b-41d4-a716-446655440000",
    });

    const [, init] = fetchMock.mock.calls[0] as [unknown, RequestInit];
    expect(JSON.parse(String(init.body))).toMatchObject({
      pack_id: "550e8400-e29b-41d4-a716-446655440000",
      target: { type: "mcp", url: "https://example.test/mcp" },
    });
    expect(JSON.parse(String(init.body))).not.toHaveProperty("pack_slug");
  });

  it("sends canonical pack_yaml when saving packs", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ pack: { slug: "demo" } }));
    globalThis.fetch = fetchMock as typeof fetch;

    await testpassSavePack({ pack_id: "demo", yaml: "id: demo\nname: Demo\nversion: 1.0.0\nitems: []" });

    const [, init] = fetchMock.mock.calls[0] as [unknown, RequestInit];
    expect(JSON.parse(String(init.body))).toMatchObject({
      pack_id: "demo",
      pack_yaml: expect.stringContaining("id: demo"),
    });
  });

  it("allows manual Other verdict overrides", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ item: { verdict: "other" } }));
    globalThis.fetch = fetchMock as typeof fetch;

    const result = await testpassEditItem({
      run_id: "run-1",
      item_id: "item-1",
      verdict: "other",
      notes: "Needs human review",
    });

    expect(result).toEqual({ item: { verdict: "other" } });
    const [, init] = fetchMock.mock.calls[0] as [unknown, RequestInit];
    expect(JSON.parse(String(init.body))).toMatchObject({ verdict: "other" });
  });

  it("advertises Other in the edit_item schema", () => {
    const tool = ADDITIONAL_TOOLS.find((candidate) => candidate.name === "testpass_edit_item");
    const verdict = tool?.inputSchema.properties?.verdict as { enum?: string[] } | undefined;
    expect(verdict?.enum).toEqual(["pass", "fail", "na", "other"]);
  });
});
