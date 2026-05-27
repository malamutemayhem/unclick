import { afterEach, describe, expect, it, vi } from "vitest";

import { ADDITIONAL_TOOLS } from "../tool-wiring.js";
import {
  testpassEditItem,
  testpassEvidence,
  testpassFixList,
  testpassListPacks,
  testpassRun,
  testpassSavePack,
} from "../testpass-tool.js";

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
  it("lists packs through the authenticated admin pack endpoint", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ packs: [{ slug: "testpass-core" }] }));
    globalThis.fetch = fetchMock as typeof fetch;

    await expect(testpassListPacks()).resolves.toEqual({ packs: [{ slug: "testpass-core" }] });
    expect(String(fetchMock.mock.calls[0][0])).toContain("/api/memory-admin?action=list_testpass_packs");
  });

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

  it("requires notes for manual verdict overrides", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ item: { verdict: "check" } }));
    globalThis.fetch = fetchMock as typeof fetch;

    await expect(testpassEditItem({
      run_id: "run-1",
      item_id: "item-1",
      verdict: "pass",
    })).resolves.toEqual({ error: "notes are required for manual verdict edits" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("exposes a direct fix-list alias for the markdown report", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ markdown: "# fixes" }));
    globalThis.fetch = fetchMock as typeof fetch;

    await expect(testpassFixList({ run_id: "run-1" })).resolves.toEqual({
      run_id: "run-1",
      format: "md",
      body: "# fixes",
    });
    expect(String(fetchMock.mock.calls[0][0])).toContain("action=report_md");
  });

  it("fetches one item evidence by check id from the JSON report", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({
      items: [
        { id: "item-1", check_id: "RPC-001", evidence_ref: "ev-1" },
      ],
      evidence: {
        "ev-1": { id: "ev-1", kind: "rpc_trace", payload: { ok: true } },
      },
    }));
    globalThis.fetch = fetchMock as typeof fetch;

    await expect(testpassEvidence({ run_id: "run-1", check_id: "RPC-001" })).resolves.toEqual({
      run_id: "run-1",
      item: { id: "item-1", check_id: "RPC-001", evidence_ref: "ev-1" },
      evidence_ref: "ev-1",
      evidence: { id: "ev-1", kind: "rpc_trace", payload: { ok: true } },
    });
  });

  it("advertises Other in the edit_item schema", () => {
    const tool = ADDITIONAL_TOOLS.find((candidate) => candidate.name === "testpass_edit_item");
    const verdict = tool?.inputSchema.properties?.verdict as { enum?: string[] } | undefined;
    expect(verdict?.enum).toEqual(["pass", "fail", "na", "other"]);
  });

  it("requires edit_item reviewer notes in the schema", () => {
    const tool = ADDITIONAL_TOOLS.find((candidate) => candidate.name === "testpass_edit_item");
    expect(tool?.inputSchema.required).toContain("notes");
  });

  it("advertises the research-brief MCP affordances", () => {
    const toolNames = ADDITIONAL_TOOLS.map((tool) => tool.name);
    expect(toolNames).toEqual(expect.arrayContaining([
      "testpass_list_packs",
      "testpass_evidence",
      "testpass_fix_list",
    ]));
  });
});
