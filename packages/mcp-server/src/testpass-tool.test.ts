import { afterEach, describe, expect, it, vi } from "vitest";

import {
  testpassEditItem,
  testpassEvidence,
  testpassListPacks,
  testpassReportHtml,
  testpassReportJson,
  testpassReportMd,
  testpassRun,
  testpassSavePack,
  testpassStatus,
} from "./testpass-tool.js";

// Colocated TestPass connector tests. Exercise the L2 (resilience) behaviour.

describe("testpass connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  function stubApiKey() {
    vi.stubEnv("UNCLICK_API_KEY", "test-key-123");
  }

  function stubFetch(response: Partial<Response> & { ok: boolean; status: number }) {
    const textFn = (response as any).text ?? (async () => JSON.stringify((response as any)._json ?? ""));
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: response.ok,
      status: response.status,
      text: textFn,
    })));
  }

  // ── missing API key ────────────────────────────────────────────────────────

  it("returns not_connected when UNCLICK_API_KEY is missing", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "");
    const r = await testpassListPacks() as Record<string, unknown>;
    expect(r.not_connected).toBe(true);
  });

  // ── testpass_run ──────────────────────────────────────────────────────────

  it("returns an error when target_url is missing", async () => {
    stubApiKey();
    const r = await testpassRun({}) as Record<string, unknown>;
    expect(r.error).toBe("target_url is required");
  });

  it("surfaces an HTTP error from testpass start_run", async () => {
    stubApiKey();
    stubFetch({ ok: false, status: 500, text: async () => '{"detail":"internal"}' } as any);
    const r = await testpassRun({ target_url: "https://example.com" }) as Record<string, unknown>;
    expect(r.error).toMatch(/start_run failed.*HTTP 500/);
  });

  it("parses a successful testpass start_run response", async () => {
    stubApiKey();
    stubFetch({ ok: true, status: 200, text: async () => '{"run_id":"abc-123","status":"running"}' } as any);
    const r = await testpassRun({ target_url: "https://example.com", pack_id: "testpass-core" }) as Record<string, unknown>;
    expect(r.run_id).toBe("abc-123");
    expect(r.status).toBe("running");
  });

  // ── testpass_status ───────────────────────────────────────────────────────

  it("returns an error when run_id is missing from status", async () => {
    stubApiKey();
    const r = await testpassStatus({}) as Record<string, unknown>;
    expect(r.error).toBe("run_id is required");
  });

  it("surfaces an HTTP error from testpass status", async () => {
    stubApiKey();
    stubFetch({ ok: false, status: 404, text: async () => '{"detail":"not found"}' } as any);
    const r = await testpassStatus({ run_id: "abc-123" }) as Record<string, unknown>;
    expect(r.error).toMatch(/status failed.*HTTP 404/);
  });

  it("parses a successful testpass status response", async () => {
    stubApiKey();
    stubFetch({ ok: true, status: 200, text: async () => '{"run_id":"abc-123","status":"complete","pass_rate":0.95}' } as any);
    const r = await testpassStatus({ run_id: "abc-123" }) as Record<string, unknown>;
    expect(r.run_id).toBe("abc-123");
    expect(r.status).toBe("complete");
  });

  // ── testpass_report_html ──────────────────────────────────────────────────

  it("returns an error when run_id is missing from report_html", async () => {
    stubApiKey();
    const r = await testpassReportHtml({}) as Record<string, unknown>;
    expect(r.error).toBe("run_id is required");
  });

  it("returns HTML body on success", async () => {
    stubApiKey();
    const html = "<html><body>Report</body></html>";
    stubFetch({ ok: true, status: 200, text: async () => html } as any);
    const r = await testpassReportHtml({ run_id: "abc-123" }) as Record<string, unknown>;
    expect(r.format).toBe("html");
    expect(r.body).toBe(html);
    expect(r.run_id).toBe("abc-123");
  });

  // ── testpass_report_json ──────────────────────────────────────────────────

  it("returns an error when run_id is missing from report_json", async () => {
    stubApiKey();
    const r = await testpassReportJson({}) as Record<string, unknown>;
    expect(r.error).toBe("run_id is required");
  });

  it("returns parsed JSON body on success", async () => {
    stubApiKey();
    stubFetch({ ok: true, status: 200, text: async () => '{"items":[{"id":"i1","verdict":"pass"}]}' } as any);
    const r = await testpassReportJson({ run_id: "abc-123" }) as Record<string, unknown>;
    expect(r.format).toBe("json");
    expect(r.run_id).toBe("abc-123");
    expect((r.body as any).items).toHaveLength(1);
  });

  // ── testpass_report_md ────────────────────────────────────────────────────

  it("returns an error when run_id is missing from report_md", async () => {
    stubApiKey();
    const r = await testpassReportMd({}) as Record<string, unknown>;
    expect(r.error).toBe("run_id is required");
  });

  it("extracts markdown from response", async () => {
    stubApiKey();
    stubFetch({ ok: true, status: 200, text: async () => '{"markdown":"# Report\\n\\nAll passed."}' } as any);
    const r = await testpassReportMd({ run_id: "abc-123" }) as Record<string, unknown>;
    expect(r.format).toBe("md");
    expect(r.body).toMatch(/# Report/);
  });

  // ── testpass_evidence ─────────────────────────────────────────────────────

  it("returns an error when run_id is missing from evidence", async () => {
    stubApiKey();
    const r = await testpassEvidence({}) as Record<string, unknown>;
    expect(r.error).toBe("run_id is required");
  });

  it("returns an error when both item_id and check_id are missing", async () => {
    stubApiKey();
    const r = await testpassEvidence({ run_id: "abc-123" }) as Record<string, unknown>;
    expect(r.error).toBe("item_id or check_id is required");
  });

  it("finds an item by item_id and returns evidence", async () => {
    stubApiKey();
    const payload = {
      items: [{ id: "i1", check_id: "c1", evidence_ref: "ev1", verdict: "pass" }],
      evidence: { ev1: { screenshot: "base64data" } },
    };
    stubFetch({ ok: true, status: 200, text: async () => JSON.stringify(payload) } as any);
    const r = await testpassEvidence({ run_id: "abc-123", item_id: "i1" }) as Record<string, unknown>;
    expect(r.run_id).toBe("abc-123");
    expect((r.item as any).id).toBe("i1");
    expect(r.evidence_ref).toBe("ev1");
    expect((r.evidence as any).screenshot).toBe("base64data");
  });

  it("returns item not found when item_id does not match", async () => {
    stubApiKey();
    const payload = { items: [{ id: "i1", check_id: "c1" }] };
    stubFetch({ ok: true, status: 200, text: async () => JSON.stringify(payload) } as any);
    const r = await testpassEvidence({ run_id: "abc-123", item_id: "i999" }) as Record<string, unknown>;
    expect(r.error).toBe("item not found");
  });

  // ── testpass_save_pack ────────────────────────────────────────────────────

  it("returns an error when pack_id is missing from save_pack", async () => {
    stubApiKey();
    const r = await testpassSavePack({}) as Record<string, unknown>;
    expect(r.error).toBe("pack_id is required");
  });

  it("returns an error when yaml is missing from save_pack", async () => {
    stubApiKey();
    const r = await testpassSavePack({ pack_id: "my-pack" }) as Record<string, unknown>;
    expect(r.error).toBe("yaml is required");
  });

  it("parses a successful save_pack response", async () => {
    stubApiKey();
    stubFetch({ ok: true, status: 200, text: async () => '{"saved":true}' } as any);
    const r = await testpassSavePack({ pack_id: "my-pack", yaml: "items: []" }) as Record<string, unknown>;
    expect(r.saved).toBe(true);
  });

  // ── testpass_edit_item ────────────────────────────────────────────────────

  it("returns an error when run_id is missing from edit_item", async () => {
    stubApiKey();
    const r = await testpassEditItem({}) as Record<string, unknown>;
    expect(r.error).toBe("run_id is required");
  });

  it("returns an error when item_id is missing from edit_item", async () => {
    stubApiKey();
    const r = await testpassEditItem({ run_id: "abc-123" }) as Record<string, unknown>;
    expect(r.error).toBe("item_id is required");
  });

  it("returns an error for invalid verdict", async () => {
    stubApiKey();
    const r = await testpassEditItem({ run_id: "abc-123", item_id: "i1", verdict: "invalid" }) as Record<string, unknown>;
    expect(r.error).toBe("verdict must be pass|fail|na|other");
  });

  it("returns an error when notes are too short", async () => {
    stubApiKey();
    const r = await testpassEditItem({ run_id: "abc-123", item_id: "i1", verdict: "pass", notes: "ab" }) as Record<string, unknown>;
    expect(r.error).toMatch(/notes are required/i);
  });

  it("parses a successful edit_item response", async () => {
    stubApiKey();
    stubFetch({ ok: true, status: 200, text: async () => '{"updated":true}' } as any);
    const r = await testpassEditItem({
      run_id: "abc-123",
      item_id: "i1",
      verdict: "pass",
      notes: "Confirmed manually",
    }) as Record<string, unknown>;
    expect(r.updated).toBe(true);
  });

  // ── testpass_list_packs ───────────────────────────────────────────────────

  it("surfaces an HTTP error from list_packs", async () => {
    stubApiKey();
    stubFetch({ ok: false, status: 429, text: async () => '{"detail":"rate limited"}' } as any);
    const r = await testpassListPacks() as Record<string, unknown>;
    expect(r.error).toMatch(/list_packs failed.*HTTP 429/);
  });

  it("returns the parsed body from list_packs on success", async () => {
    stubApiKey();
    stubFetch({ ok: true, status: 200, text: async () => '{"packs":["core","ui"]}' } as any);
    const r = await testpassListPacks() as Record<string, unknown>;
    expect(r.packs).toEqual(["core", "ui"]);
  });

  // ── timeout / abort ───────────────────────────────────────────────────────

  it("surfaces fetch abort error", async () => {
    stubApiKey();
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(testpassStatus({ run_id: "abc-123" })).rejects.toThrow("aborted");
  });
});
