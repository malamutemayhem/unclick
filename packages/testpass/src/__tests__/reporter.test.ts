import { generateHtmlReport, generateJsonReport } from "../reporter.js";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockRestResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    text: async () => JSON.stringify(body),
  } as Response;
}

describe("TestPass reporter", () => {
  const config = { supabaseUrl: "https://supabase.test", serviceRoleKey: "service-key" };
  const run = {
    id: "run-1",
    pack_id: "pack-1",
    target: { type: "mcp", url: "https://example.test/mcp" },
    profile: "smoke",
    status: "complete",
    actor_user_id: "user-1",
    verdict_summary: { total: 1, check: 1, na: 0, fail: 0, other: 0, pending: 0, pass_rate: 1 },
    started_at: "2026-05-27T08:00:00.000Z",
    completed_at: "2026-05-27T08:00:02.000Z",
  };
  const items = [
    {
      id: "item-1",
      run_id: "run-1",
      check_id: "RPC-001",
      title: "jsonrpc field",
      category: "json-rpc",
      severity: "critical",
      verdict: "check",
      on_fail_comment: null,
      time_ms: 12,
      cost_usd: 0,
      evidence_ref: "evidence-1",
      created_at: "2026-05-27T08:00:01.000Z",
    },
  ];
  const evidence = [
    {
      id: "evidence-1",
      kind: "http_trace",
      payload: { request: { method: "POST" }, response: { jsonrpc: "2.0" } },
    },
  ];

  function installReporterFetch() {
    globalThis.fetch = jest.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("testpass_runs")) return mockRestResponse([run]);
      if (url.includes("testpass_items")) return mockRestResponse(items);
      if (url.includes("testpass_evidence")) return mockRestResponse(evidence);
      return mockRestResponse([]);
    }) as typeof fetch;
  }

  it("renders non-screenshot evidence and the run started_at timestamp in HTML", async () => {
    installReporterFetch();

    const html = await generateHtmlReport(config, "run-1");

    expect(html).toContain("Started 2026-05-27T08:00:00.000Z");
    expect(html).toContain("http_trace");
    expect(html).toContain("&quot;jsonrpc&quot;: &quot;2.0&quot;");
  });

  it("includes evidence rows in JSON reports", async () => {
    installReporterFetch();

    const report = await generateJsonReport(config, "run-1") as {
      evidence?: Record<string, { kind?: string }>;
    };

    expect(report.evidence?.["evidence-1"]?.kind).toBe("http_trace");
  });
});
