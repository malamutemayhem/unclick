import { afterEach, describe, expect, it, vi } from "vitest";

import { ADDITIONAL_TOOLS } from "../tool-wiring.js";
import {
  normalizeTaskId,
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
  it("lists packs through the API-key-capable testpass endpoint", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ packs: [{ slug: "testpass-core" }] }));
    globalThis.fetch = fetchMock as typeof fetch;

    await expect(testpassListPacks()).resolves.toEqual({ packs: [{ slug: "testpass-core" }] });
    expect(String(fetchMock.mock.calls[0][0])).toContain("/api/testpass?action=list_packs");
    const [, init] = fetchMock.mock.calls[0] as [unknown, RequestInit];
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer uc_test");
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

  it("passes a valid UUID task_id through unchanged", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ run_id: "run-1" }));
    globalThis.fetch = fetchMock as typeof fetch;

    await testpassRun({
      target_url: "https://example.test/mcp",
      task_id: "3f3754ef-d25d-523c-96d6-6b3471ded29a",
    });

    const [, init] = fetchMock.mock.calls[0] as [unknown, RequestInit];
    expect(JSON.parse(String(init.body)).task_id).toBe("3f3754ef-d25d-523c-96d6-6b3471ded29a");
  });

  it("normalizes a non-UUID task_id into a stable UUID instead of letting the API 400", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn(async (..._args: unknown[]) => okJson({ run_id: "run-1" }));
    globalThis.fetch = fetchMock as typeof fetch;

    await testpassRun({
      target_url: "https://example.test/mcp",
      task_id: "audit-seat-20260611-smoke1",
    });

    const [, init] = fetchMock.mock.calls[0] as [unknown, RequestInit];
    const sent = JSON.parse(String(init.body)).task_id as string;
    expect(sent).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    // Deterministic: the same input maps to the same UUID so retries stay idempotent.
    expect(sent).toBe(normalizeTaskId("audit-seat-20260611-smoke1"));
    expect(normalizeTaskId("audit-seat-20260611-smoke1")).toBe(normalizeTaskId("audit-seat-20260611-smoke1"));
    expect(normalizeTaskId("a-different-key")).not.toBe(sent);
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

  it("warns agents that fail-to-pass edits are signal flagged", () => {
    const tool = ADDITIONAL_TOOLS.find((candidate) => candidate.name === "testpass_edit_item");
    expect(tool?.description).toContain("Fail-to-pass edits are flagged in mc_signals");
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
