/**
 * Regression test for the dispatcher Authorization header.
 *
 * The TestPass runner makes outbound HTTP requests to the target MCP server.
 * When that target sits behind Vercel's auth wall (or any Bearer-gated layer),
 * the dispatcher must forward `process.env.TESTPASS_TOKEN` as a Bearer token,
 * otherwise every check returns "Authentication Required" HTML and the run
 * fails before product behaviour is ever exercised.
 */

import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { runDeterministicChecks } from "../runner/deterministic.js";
import { probeServer } from "../probe.js";
import { loadPackFromYaml } from "../pack-loader.js";

jest.mock("../run-manager.js", () => ({
  updateItem:     jest.fn().mockResolvedValue(undefined),
  createEvidence: jest.fn().mockResolvedValue("evidence-id-stub"),
}));

function makeAuthCapturingServer(): Promise<{
  url: string;
  close: () => void;
  authHeaders: string[];
}> {
  const authHeaders: string[] = [];
  return new Promise((resolve) => {
    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      authHeaders.push((req.headers.authorization as string | undefined) ?? "");
      let raw = "";
      req.on("data", (c: Buffer) => (raw += c.toString()));
      req.on("end", () => {
        const rpc = JSON.parse(raw || "{}") as { id?: number; method?: string };
        if (rpc.id === undefined) {
          res.writeHead(204).end();
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          jsonrpc: "2.0",
          id:      rpc.id,
          result:  rpc.method === "ping" ? {} : {
            protocolVersion: "2024-11-05",
            serverInfo:      { name: "test-mcp", version: "1.0.0" },
            capabilities:    { tools: {} },
            instructions:    "test",
          },
        }));
      });
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address() as { port: number };
      resolve({
        url:         `http://127.0.0.1:${addr.port}`,
        close:       () => server.close(),
        authHeaders,
      });
    });
  });
}

const PACK_YAML = `
id: testpass-core
name: TestPass Core v0
version: 0.1.0
items:
  - id: RPC-001
    title: jsonrpc field
    category: json-rpc
    severity: critical
    check_type: deterministic
`;

describe("dispatcher Authorization header", () => {
  const originalToken = process.env.TESTPASS_TOKEN;
  afterEach(() => {
    if (originalToken === undefined) delete process.env.TESTPASS_TOKEN;
    else process.env.TESTPASS_TOKEN = originalToken;
  });

  it("deterministic runner sends Bearer token when TESTPASS_TOKEN is set", async () => {
    process.env.TESTPASS_TOKEN = "test-token-abc";
    const srv = await makeAuthCapturingServer();
    try {
      const pack = loadPackFromYaml(PACK_YAML);
      const config = { supabaseUrl: "http://unused", serviceRoleKey: "unused" };
      await runDeterministicChecks(config, "run-1", srv.url, pack, "standard");
      expect(srv.authHeaders.length).toBeGreaterThan(0);
      for (const h of srv.authHeaders) {
        expect(h).toBe("Bearer test-token-abc");
      }
    } finally {
      srv.close();
    }
  });

  it("probe sends Bearer token when TESTPASS_TOKEN is set", async () => {
    process.env.TESTPASS_TOKEN = "probe-token-xyz";
    const srv = await makeAuthCapturingServer();
    try {
      await probeServer(srv.url, { timeoutMs: 2_000 });
      expect(srv.authHeaders.length).toBeGreaterThan(0);
      for (const h of srv.authHeaders) {
        expect(h).toBe("Bearer probe-token-xyz");
      }
    } finally {
      srv.close();
    }
  });

  it("omits Authorization when TESTPASS_TOKEN is unset", async () => {
    delete process.env.TESTPASS_TOKEN;
    const srv = await makeAuthCapturingServer();
    try {
      await probeServer(srv.url, { timeoutMs: 2_000 });
      for (const h of srv.authHeaders) {
        expect(h).toBe("");
      }
    } finally {
      srv.close();
    }
  });
});
