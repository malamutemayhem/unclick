import { afterEach, describe, expect, it, vi } from "vitest";

import { geopassRun, geopassStatus } from "./geopass-tool.js";
import { ADDITIONAL_HANDLERS, ADDITIONAL_TOOLS } from "./tool-wiring.js";

function installFetch(fixtures: Record<string, string | { status: number; body: string; headers?: Record<string, string>; url?: string }>): void {
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    const normalized = new URL(url).toString();
    const fixture = fixtures[normalized] ?? fixtures[normalized.replace(/\/$/, "")];
    const status = typeof fixture === "object" ? fixture.status : fixture ? 200 : 404;
    const body = typeof fixture === "object" ? fixture.body : fixture ?? "not found";
    const headers = typeof fixture === "object" ? fixture.headers ?? { "content-type": "text/html" } : { "content-type": "text/html" };
    return {
      url: typeof fixture === "object" && fixture.url ? fixture.url : normalized,
      ok: status >= 200 && status < 300,
      status,
      headers: new Headers(headers),
      text: async () => body,
    };
  }));
}

const html = `<!doctype html>
<html>
  <head>
    <title>GEOPass public AI answer readiness</title>
    <meta name="description" content="Public readiness checks for AI answer engines.">
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"UnClick"}</script>
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}</script>
  </head>
  <body>
    <h1>GEOPass public AI answer readiness</h1>
    <h2>What does GEOPass check?</h2>
    <p>It checks answer extractability, entity clarity, citation readiness, freshness cues, and content structure for public pages.</p>
    <h2>How does GEOPass stay honest?</h2>
    <p>It reports readiness only and does not guarantee rankings or citations.</p>
    <p>Updated <time datetime="2026-05-30">May 30, 2026</time>. Source: public Google guidance.</p>
    <ul><li>AI bot visibility</li><li>Readable evidence</li><li>Public source links</li></ul>
    <a href="https://developers.google.com/search/docs/appearance/ai-features">Google AI features guidance</a>
    <a href="https://schema.org">schema.org</a>
    <a href="/about">About</a>
  </body>
</html>`;

describe("geopass-tool", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("registers GEOPass run and status tools", () => {
    const names = ADDITIONAL_TOOLS.map((tool) => tool.name);

    expect(names).toContain("geopass_run");
    expect(names).toContain("geopass_status");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("geopass_run");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("geopass_status");
  });

  it("rejects missing or invalid targets before storing a run", async () => {
    await expect(geopassRun({})).resolves.toMatchObject({ error: "url or target_url is required" });
    await expect(geopassRun({ url: "file:///tmp/page.html" })).resolves.toMatchObject({
      error: expect.stringContaining("public http(s)"),
    });
  });

  it("runs GEOPass and exposes a receipt through status", async () => {
    installFetch({
      "https://unclick.world/": html,
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/llms.txt": "# UnClick\n\nGEOPass gives AI answer engines public summaries and canonical docs links.\n\n[Docs](https://unclick.world/docs): Docs.",
    });

    const run = await geopassRun({
      url: "https://unclick.world",
      target_sha: "abc123",
    }) as Record<string, unknown>;

    expect(run).toMatchObject({
      status: "complete",
      pass: "geopass",
    });
    expect(String(run.run_id)).toMatch(/^geopass-/);
    expect((run.geopass_receipt_v1 as Record<string, unknown>).kind).toBe("geopass_receipt_v1");
    expect((run.geopass_receipt_v1 as Record<string, unknown>).target_sha).toBe("abc123");

    const status = await geopassStatus({ run_id: run.run_id }) as Record<string, unknown>;
    expect(status.run_id).toBe(run.run_id);
    expect((status.report as { checks?: Array<{ check_id?: string }> }).checks?.map((check) => check.check_id)).toContain("answer-extractability");
  });

  it("keeps external index rows unknown when specifically requested", async () => {
    installFetch({
      "https://unclick.world/": html,
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/llms.txt": "# UnClick\n\nHelpful file.",
    });

    const run = await geopassRun({
      target_url: "https://unclick.world",
      checks: ["wikidata-presence", "common-crawl-presence"],
    }) as Record<string, unknown>;

    expect((run.geopass_receipt_v1 as { checked?: { unknown?: number } }).checked?.unknown).toBe(2);
  });
});
