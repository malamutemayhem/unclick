import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createServer, IncomingMessage, ServerResponse, type Server } from "node:http";
import { AddressInfo } from "node:net";
import {
  BASELINE_HEADERS,
  checkSecurityHeaders,
} from "../runner/security-headers.js";
import { runSkeletonScan } from "../runner/index.js";
import { __resetForTests, getRun, listFindings } from "../runner/run-store.js";

interface FixtureServer {
  url: string;
  close: () => Promise<void>;
}

function startServer(headers: Record<string, string>): Promise<FixtureServer> {
  return new Promise((resolve) => {
    const server: Server = createServer((_req: IncomingMessage, res: ServerResponse) => {
      for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<html></html>");
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address() as AddressInfo;
      resolve({
        url: `http://127.0.0.1:${addr.port}`,
        close: () => new Promise((done) => server.close(() => done())),
      });
    });
  });
}

describe("checkSecurityHeaders", () => {
  let srv: FixtureServer | null = null;

  afterEach(async () => {
    if (srv) await srv.close();
    srv = null;
  });

  it("returns verdict=check when all baseline headers are present", async () => {
    srv = await startServer({
      "Content-Security-Policy": "default-src 'self'",
      "Strict-Transport-Security": "max-age=63072000",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Permissions-Policy": "geolocation=()",
    });
    const result = await checkSecurityHeaders(srv.url);
    expect(result.verdict).toBe("check");
    expect(result.checks).toHaveLength(BASELINE_HEADERS.length);
    expect(result.checks.every((c) => c.present)).toBe(true);
    expect(result.on_fail_comment).toBeUndefined();
  });

  it("returns verdict=fail and lists missing headers when none are set", async () => {
    srv = await startServer({});
    const result = await checkSecurityHeaders(srv.url);
    expect(result.verdict).toBe("fail");
    expect(result.checks.every((c) => !c.present)).toBe(true);
    expect(result.on_fail_comment).toContain("Missing headers");
    expect(result.on_fail_comment).toContain("content-security-policy");
  });

  it("flags only the missing subset when some headers are present", async () => {
    srv = await startServer({
      "Strict-Transport-Security": "max-age=31536000",
      "X-Content-Type-Options": "nosniff",
    });
    const result = await checkSecurityHeaders(srv.url);
    expect(result.verdict).toBe("fail");
    const missing = result.checks.filter((c) => !c.present).map((c) => c.header);
    expect(missing).toEqual(
      expect.arrayContaining([
        "content-security-policy",
        "x-frame-options",
        "permissions-policy",
      ]),
    );
    expect(missing).not.toContain("strict-transport-security");
  });
});

describe("runSkeletonScan", () => {
  beforeEach(() => __resetForTests());

  it("creates a run, writes a finding, and marks the run complete", async () => {
    const srv = await startServer({
      "Content-Security-Policy": "default-src 'self'",
      "Strict-Transport-Security": "max-age=63072000",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Permissions-Policy": "geolocation=()",
    });
    try {
      const result = await runSkeletonScan({
        target: { type: "url", url: srv.url },
      });
      expect(result.run.status).toBe("complete");
      expect(result.headers.verdict).toBe("check");
      const stored = getRun(result.run.id);
      expect(stored?.verdict_summary.total).toBe(1);
      expect(stored?.verdict_summary.check).toBe(1);
      expect(listFindings(result.run.id)).toHaveLength(1);
    } finally {
      await srv.close();
    }
  });
});
