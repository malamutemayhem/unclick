import { MCP_ACCEPT_HEADER, buildMcpHeaders, readMcpResponseBody } from "../mcp-http.js";

describe("mcp-http helpers", () => {
  const originalToken = process.env.TESTPASS_TOKEN;
  const originalBypassSecret = process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET;

  afterEach(() => {
    if (originalToken === undefined) delete process.env.TESTPASS_TOKEN;
    else process.env.TESTPASS_TOKEN = originalToken;
    if (originalBypassSecret === undefined) delete process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET;
    else process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET = originalBypassSecret;
  });

  it("requests both JSON and SSE MCP response formats", () => {
    expect(MCP_ACCEPT_HEADER).toContain("application/json");
    expect(MCP_ACCEPT_HEADER).toContain("text/event-stream");
  });

  it("adds target auth headers without putting them into the URL", () => {
    process.env.TESTPASS_TOKEN = "uc_target";
    process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET = "vercel-secret";

    expect(buildMcpHeaders()).toMatchObject({
      Authorization: "Bearer uc_target",
      "x-vercel-protection-bypass": "vercel-secret",
    });
  });

  it("parses JSON-RPC payloads from SSE message frames", async () => {
    const payload = { jsonrpc: "2.0", id: 1, result: { ok: true } };
    const res = new Response(`event: message\ndata: ${JSON.stringify(payload)}\n\n`, {
      headers: { "Content-Type": "text/event-stream" },
    });

    await expect(readMcpResponseBody(res)).resolves.toEqual(payload);
  });
});
