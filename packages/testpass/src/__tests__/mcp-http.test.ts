import { MCP_ACCEPT_HEADER, buildMcpHeaders, readMcpResponseBody } from "../mcp-http.js";

describe("mcp-http helpers", () => {
  const originalToken = process.env.TESTPASS_TOKEN;
  const originalTargetBypassSecret = process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET;
  const originalVercelBypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

  afterEach(() => {
    if (originalToken === undefined) delete process.env.TESTPASS_TOKEN;
    else process.env.TESTPASS_TOKEN = originalToken;
    if (originalTargetBypassSecret === undefined) delete process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET;
    else process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET = originalTargetBypassSecret;
    if (originalVercelBypassSecret === undefined) delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    else process.env.VERCEL_AUTOMATION_BYPASS_SECRET = originalVercelBypassSecret;
  });

  it("requests both JSON and SSE MCP response formats", () => {
    expect(MCP_ACCEPT_HEADER).toContain("application/json");
    expect(MCP_ACCEPT_HEADER).toContain("text/event-stream");
  });

  it("adds target auth headers without putting them into the URL", () => {
    process.env.TESTPASS_TOKEN = "uc_target";
    process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET = "vercel-secret";
    delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

    expect(buildMcpHeaders("https://unclick-preview.vercel.app/api/mcp")).toMatchObject({
      Authorization: "Bearer uc_target",
      "x-vercel-protection-bypass": "vercel-secret",
    });
    expect(buildMcpHeaders("https://unclick.world/api/mcp")["x-vercel-protection-bypass"]).toBeUndefined();
  });

  it("adds the Vercel automation bypass header without putting the secret in the URL", () => {
    delete process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET;
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET = "bypass-secret";

    expect(buildMcpHeaders("https://preview.vercel.app/api/mcp")["x-vercel-protection-bypass"]).toBe("bypass-secret");
    expect(buildMcpHeaders("https://unclick.world/api/mcp")["x-vercel-protection-bypass"]).toBeUndefined();
  });

  it("parses JSON-RPC payloads from SSE message frames", async () => {
    const payload = { jsonrpc: "2.0", id: 1, result: { ok: true } };
    const res = new Response(`event: message\ndata: ${JSON.stringify(payload)}\n\n`, {
      headers: { "Content-Type": "text/event-stream" },
    });

    await expect(readMcpResponseBody(res)).resolves.toEqual(payload);
  });
});
