import { MCP_ACCEPT_HEADER, buildMcpHeaders, readMcpResponseBody } from "../mcp-http.js";

describe("mcp-http helpers", () => {
  it("requests both JSON and SSE MCP response formats", () => {
    expect(MCP_ACCEPT_HEADER).toContain("application/json");
    expect(MCP_ACCEPT_HEADER).toContain("text/event-stream");
  });

  it("adds the Vercel automation bypass header without putting the secret in the URL", () => {
    const previous = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET = "bypass-secret";

    try {
      expect(buildMcpHeaders()["x-vercel-protection-bypass"]).toBe("bypass-secret");
    } finally {
      if (previous === undefined) {
        delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
      } else {
        process.env.VERCEL_AUTOMATION_BYPASS_SECRET = previous;
      }
    }
  });

  it("parses JSON-RPC payloads from SSE message frames", async () => {
    const payload = { jsonrpc: "2.0", id: 1, result: { ok: true } };
    const res = new Response(`event: message\ndata: ${JSON.stringify(payload)}\n\n`, {
      headers: { "Content-Type": "text/event-stream" },
    });

    await expect(readMcpResponseBody(res)).resolves.toEqual(payload);
  });
});
