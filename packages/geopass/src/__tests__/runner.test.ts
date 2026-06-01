import { afterEach, describe, expect, it, vi } from "vitest";
import { runGeoPass } from "../runner.js";

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

const strongGeoHtml = `<!doctype html>
<html>
  <head>
    <title>UnClick GEOPass - AI answer readiness checks</title>
    <meta name="description" content="GEOPass checks whether public pages are readable, sourceable, and clear enough for AI answer engines.">
    <script type="application/ld+json">{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "UnClick",
      "url": "https://unclick.world"
    }</script>
    <script type="application/ld+json">{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": []
    }</script>
  </head>
  <body>
    <h1>GEOPass checks AI answer readiness</h1>
    <h2>What does GEOPass inspect?</h2>
    <p>GEOPass inspects public pages for answer extractability, entity clarity, citation readiness, freshness cues, and AI-readable structure.</p>
    <h2>How does it avoid false promises?</h2>
    <p>It reports readiness only. It does not guarantee rankings, AI citations, or answer-engine placement.</p>
    <ul><li>Public evidence</li><li>Clear entity names</li><li>Fresh source links</li></ul>
    <p>Updated <time datetime="2026-05-30">May 30, 2026</time>. According to public documentation, source evidence matters.</p>
    <p>See the <a href="https://developers.google.com/search/docs/appearance/ai-features">Google AI features guidance</a> and <a href="https://schema.org">schema.org</a>.</p>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </body>
</html>`;

describe("runGeoPass", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects non-public URL schemes and credentialed URLs", async () => {
    await expect(runGeoPass({ url: "file:///tmp/page.html" })).resolves.toMatchObject({
      error: expect.stringContaining("public http(s)"),
    });
    await expect(runGeoPass({ url: "https://user:pass@example.com" })).resolves.toMatchObject({
      error: expect.stringContaining("public http(s)"),
    });
  });

  it("returns a first-class live receipt for AI-answer readiness", async () => {
    installFetch({
      "https://unclick.world/": strongGeoHtml,
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/llms.txt": "# UnClick\n\nGEOPass helps AI systems read public product pages.\n\n[Docs](https://unclick.world/docs): Documentation for public checks and receipts.",
    });

    const run = await runGeoPass({
      url: "https://unclick.world",
      generatedAt: "2026-05-30T12:00:00.000Z",
      targetSha: "abc123",
    });

    expect("error" in run).toBe(false);
    if ("error" in run) throw new Error(run.error);
    expect(run.status).toBe("complete");
    expect(run.pass).toBe("geopass");
    expect(run.report.mode).toBe("live-readonly");
    expect(run.report.checks.map((check) => check.check_id)).toContain("answer-extractability");
    expect(run.report.checks.map((check) => check.check_id)).toContain("citation-readiness");
    expect(run.geopass_receipt_v1).toMatchObject({
      kind: "geopass_receipt_v1",
      mode: "live-readonly",
      target_sha: "abc123",
    });
    expect(run.geopass_receipt_v1.boundaries.join(" ")).toContain("does not guarantee");
    expect(run.ai_answer_readiness_score).toBeGreaterThanOrEqual(80);
  });

  it("blocks when robots.txt disallows AI crawlers", async () => {
    installFetch({
      "https://unclick.world/private": strongGeoHtml,
      "https://unclick.world/robots.txt": "User-agent: GPTBot\nDisallow: /\nUser-agent: ClaudeBot\nDisallow: /\n",
      "https://unclick.world/llms.txt": { status: 404, body: "not found" },
    });

    const run = await runGeoPass({
      url: "https://unclick.world/private",
      generatedAt: "2026-05-30T12:00:00.000Z",
    });

    expect("error" in run).toBe(false);
    if ("error" in run) throw new Error(run.error);
    expect(run.verdict).toBe("blocked");
    expect(run.geopass_receipt_v1.status).toBe("BLOCKER");
    expect(run.report.checks.some((check) => check.check_id === "ai-bot-crawlability" && check.verdict === "blocked")).toBe(true);
  });

  it("keeps external index checks explicit unknown instead of pretending proof", async () => {
    installFetch({
      "https://unclick.world/": strongGeoHtml,
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/llms.txt": "# UnClick\n\nHelpful file with enough public summary and links to docs.",
    });

    const run = await runGeoPass({
      url: "https://unclick.world",
      checks: ["wikidata-presence", "common-crawl-presence"],
    });

    expect("error" in run).toBe(false);
    if ("error" in run) throw new Error(run.error);
    expect(run.report.checks.map((check) => check.verdict)).toEqual(["unknown", "unknown"]);
    expect(run.geopass_receipt_v1.checked.unknown).toBe(2);
  });
});
