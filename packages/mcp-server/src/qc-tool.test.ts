import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { qcCheckApi, qcCopyAudit, qcRunChecklist } from "./qc-tool.js";

interface ChecklistResult {
  summary: {
    passed: number;
    failed: number;
    warnings: number;
    total: number;
  };
  results: Array<{ check: string; status: string }>;
}

interface ApiResult {
  summary: {
    passed: number;
    failed: number;
    total: number;
  };
}

interface CopyAuditResult {
  total_occurrences: number;
  occurrences: Array<{ type: string; value: string }>;
}

describe("qc-tool", () => {
  let server: Server;
  let baseUrl = "";

  beforeAll(async () => {
    server = createServer((req, res) => {
      const url = req.url ?? "/";
      const origin = `http://${req.headers.host}`;

      if (url === "/robots.txt") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("User-agent: *\nAllow: /\n");
        return;
      }

      if (url === "/sitemap.xml") {
        res.writeHead(200, { "content-type": "application/xml" });
        res.end("<urlset><url><loc>/</loc></url></urlset>");
        return;
      }

      if (url === "/og.png") {
        res.writeHead(200, { "content-type": "image/png" });
        res.end("");
        return;
      }

      if (url === "/api/health") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
        return;
      }

      if (url === "/copy-bad") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end("<main>Care \u2014 robust proof text.</main>");
        return;
      }

      if (url === "/missing") {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("not found");
        return;
      }

      res.writeHead(200, { "content-type": "text/html" });
      res.end(`<!doctype html>
        <html>
          <head>
            <title>QC Fixture</title>
            <meta name="description" content="Proof page for QC checks">
            <meta property="og:title" content="QC Fixture">
            <meta property="og:description" content="Proof page for QC checks">
            <meta property="og:image" content="${origin}/og.png">
          </head>
          <body>
            <a href="/api/health">Health</a>
            <p>Clear proof page for checks.</p>
          </body>
        </html>`);
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", resolve);
    });
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  it("runs the website checklist against a local target", async () => {
    const result = await qcRunChecklist({
      url: baseUrl,
      checks: ["site_loads", "meta_tags", "robots_txt", "sitemap", "no_console_errors", "link_check", "copy_check", "response_time"],
    }) as ChecklistResult;

    expect(result.summary.failed).toBe(0);
    expect(result.summary.total).toBe(8);
    expect(result.results.map((item) => item.check)).toContain("copy_check");
  });

  it("checks API endpoint status expectations", async () => {
    const result = await qcCheckApi({
      base_url: baseUrl,
      endpoints: [
        { path: "/api/health", expected_status: 200 },
        { path: "/missing", expected_status: 404 },
      ],
    }) as ApiResult;

    expect(result.summary).toEqual({ passed: 2, failed: 0, total: 2 });
  });

  it("audits copy issues with context", async () => {
    const result = await qcCopyAudit({
      url: `${baseUrl}/copy-bad`,
      banned_words: ["robust"],
    }) as CopyAuditResult;

    expect(result.total_occurrences).toBeGreaterThanOrEqual(2);
    expect(result.occurrences.map((item) => item.type)).toEqual(expect.arrayContaining(["em_dash", "banned_word"]));
  });
});
