import { describe, expect, it } from "vitest";

import { runSeoPass, type SeoPassFetcher } from "../runner.js";

function fixtureFetcher(fixtures: Record<string, { status?: number; body?: string; headers?: Record<string, string> }>): SeoPassFetcher {
  return async (url) => {
    const normalized = new URL(url).toString();
    const fixture = fixtures[normalized] ?? fixtures[normalized.replace(/\/$/, "")];
    return {
      url: normalized,
      status: fixture?.status ?? 404,
      headers: fixture?.headers ?? {},
      body: fixture?.body ?? "not found",
      elapsed_ms: 42,
    };
  };
}

const healthyHtml = `<!doctype html>
<html>
  <head>
    <title>UnClick SEOPass - SEO verdicts for AI-native sites</title>
    <meta name="description" content="SEOPass scans technical SEO, metadata, schema, and AI-era search readiness, then returns fix prompts for builders.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="UnClick SEOPass">
    <meta property="og:description" content="SEO verdicts you can fix in your IDE.">
    <link rel="canonical" href="https://example.com/">
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Organization", "@id": "https://example.com/#org", "name": "Example", "sameAs": ["https://www.linkedin.com/company/example"] },
          { "@type": "FAQPage", "mainEntity": [] },
          { "@type": "Article", "headline": "SEOPass guide", "dateModified": "2026-05-27", "author": { "@type": "Person", "name": "Chris" } }
        ]
      }
    </script>
  </head>
  <body>
    <h1>SEO verdicts you can fix in your IDE</h1>
    <h2>How does SEOPass work?</h2>
    <p>SEOPass is a read-only verdict engine. Updated on 27 May 2026 by Chris.</p>
    <p>Teams cut fix discovery time by 42 percent when reports include direct acceptance criteria.</p>
    <p>See the <a href="https://example.com/about">about page</a>, <a href="https://example.com/pricing">pricing</a>, and <a href="https://example.com/docs">docs</a>.</p>
    <p>External sources: <a href="https://developers.google.com/search/docs">Google Search docs</a> and <a href="https://schema.org">Schema.org</a>.</p>
    <img src="/logo.png" alt="Example logo">
  </body>
</html>`;

const healthyFetcher: SeoPassFetcher = async (url) => {
  const parsed = new URL(url);
  if (parsed.pathname === "/robots.txt") {
    return { url: parsed.toString(), status: 200, headers: {} as Record<string, string>, body: "User-agent: *\nAllow: /\n", elapsed_ms: 42 };
  }
  if (parsed.pathname === "/sitemap.xml") {
    return {
      url: parsed.toString(),
      status: 200,
      headers: {} as Record<string, string>,
      body: "<urlset><url><loc>https://example.com/</loc></url></urlset>",
      elapsed_ms: 42,
    };
  }
  if (parsed.pathname === "/llms.txt") {
    return {
      url: parsed.toString(),
      status: 200,
      headers: {} as Record<string, string>,
      body: "# Example\n> AI-readable overview\n\n## Docs\n[Docs](https://example.com/docs): Product docs.",
      elapsed_ms: 42,
    };
  }
  return { url: parsed.toString(), status: 200, headers: { "content-type": "text/html; charset=utf-8" }, body: healthyHtml, elapsed_ms: 42 };
};

describe("runSeoPass", () => {
  it("runs a live-readonly deterministic report from public fixtures", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com",
      generatedAt: "2026-05-27T08:00:00.000Z",
      runId: "fixture-run",
      fetcher: healthyFetcher,
    });

    expect(report.run_id).toBe("fixture-run");
    expect(report.mode).toBe("live-readonly");
    expect(report.verdict).toBe("ready");
    expect(report.search_engine_readiness_score).toBeGreaterThanOrEqual(85);
    expect(report.checks.map((check) => check.verdict)).not.toContain("unknown");
    expect(report.scanner_source.kind).toBe("seopass-runner");
  });

  it("blocks when search crawlers and indexability are explicitly unsafe", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com/private",
      generatedAt: "2026-05-27T08:00:00.000Z",
      fetcher: fixtureFetcher({
        "https://example.com/private": {
          body: "<html><head><meta name=\"robots\" content=\"noindex\"><title>x</title></head><body><h1>Private</h1></body></html>",
        },
        "https://example.com/robots.txt": { body: "User-agent: *\nDisallow: /\n" },
        "https://example.com/sitemap.xml": { status: 404, body: "not found" },
        "https://example.com/llms.txt": { status: 404, body: "not found" },
      }),
    });

    expect(report.verdict).toBe("blocked");
    expect(report.checks.find((check) => check.check_id === "crawlability")?.verdict).toBe("fail");
    expect(report.checks.find((check) => check.check_id === "indexability")?.findings.some((finding) => finding.id === "indexability-noindex")).toBe(true);
  });

  it("honors crawler-specific robots index directives without false positives from unrelated agents", async () => {
    const googlebotBlocked = await runSeoPass({
      targetUrl: "https://example.com/page",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["indexability"],
      fetcher: fixtureFetcher({
        "https://example.com/page": {
          body: "<html><head><title>Page</title><meta name=\"googlebot\" content=\"noindex\"></head><body><h1>Page</h1></body></html>",
          headers: { "content-type": "text/html", "x-robots-tag": "otherbot: noindex" },
        },
        "https://example.com/robots.txt": { body: "User-agent: *\nAllow: /\n" },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/page</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });
    expect(googlebotBlocked.checks[0]?.findings.some((finding) => finding.id === "indexability-noindex")).toBe(true);

    const unrelatedBotBlocked = await runSeoPass({
      targetUrl: "https://example.com/page",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["indexability"],
      fetcher: fixtureFetcher({
        "https://example.com/page": {
          body: "<html><head><title>Page</title></head><body><h1>Page</h1></body></html>",
          headers: { "content-type": "text/html", "x-robots-tag": "otherbot: noindex" },
        },
        "https://example.com/robots.txt": { body: "User-agent: *\nAllow: /\n" },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/page</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });
    expect(unrelatedBotBlocked.checks[0]?.findings.some((finding) => finding.id === "indexability-noindex")).toBe(false);
  });

  it("recognizes Microdata and RDFa instead of claiming structured data is missing", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["structured-data"],
      fetcher: fixtureFetcher({
        "https://example.com/": {
          body: `<!doctype html><html><head><title>Example</title></head><body>
            <section itemscope itemtype="https://schema.org/Organization"><span itemprop="name">Example</span></section>
            <section vocab="https://schema.org/" typeof="WebSite"><span property="name">Example site</span></section>
          </body></html>`,
        },
        "https://example.com/robots.txt": { body: "User-agent: *\nAllow: /\n" },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });

    const findings = report.checks[0]?.findings ?? [];
    expect(findings.some((finding) => finding.id === "structured-data-missing")).toBe(false);
    expect(findings.some((finding) => finding.id === "structured-data-jsonld-recommended")).toBe(true);
  });

  it("warns when search preview controls limit AI feature eligibility", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["ai-overview-readiness"],
      fetcher: fixtureFetcher({
        "https://example.com/": {
          body: healthyHtml.replace("</head>", "<meta name=\"robots\" content=\"max-snippet:0\"></head>"),
          headers: { "content-type": "text/html" },
        },
        "https://example.com/robots.txt": { body: "User-agent: *\nAllow: /\n" },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });

    expect(report.checks[0]?.findings.some((finding) => finding.id === "aio-preview-controls-limit-ai-features")).toBe(true);
  });

  it("emits GEOPass cross-pass signals for shared SEO/GEO gaps", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com",
      generatedAt: "2026-05-27T08:00:00.000Z",
      maxInternalLinksToProbe: 0,
      fetcher: fixtureFetcher({
        "https://example.com/": {
          body: "<html><head><title>Thin page</title><meta name=\"description\" content=\"Too thin\"></head><body><h1>Thin</h1></body></html>",
        },
        "https://example.com/robots.txt": { body: "User-agent: *\nAllow: /\nUser-agent: GPTBot\nDisallow: /\n" },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/</loc></url></urlset>" },
        "https://example.com/llms.txt": { status: 404, body: "not found" },
      }),
    });

    expect(report.cross_pass_signals.some((signal) => signal.pass === "geopass")).toBe(true);
    expect(report.fix_prompts.length).toBeGreaterThan(0);
  });

  it("rejects non-http targets before fetching", async () => {
    await expect(runSeoPass({ targetUrl: "ftp://example.com", fetcher: healthyFetcher })).rejects.toThrow(/http\(s\)/);
  });

  it("ignores unsupported check ids when at least one valid check remains", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["metadata", "not-a-real-check"],
      fetcher: healthyFetcher,
    });

    expect(report.checks.map((check) => check.check_id)).toEqual(["metadata"]);
    expect(report.notes.join(" ")).toMatch(/Ignored unsupported SEOPass check id/);
  });

  it("honors explicit search bot groups instead of inheriting a wildcard block", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["crawlability"],
      fetcher: fixtureFetcher({
        "https://example.com/": { body: healthyHtml, headers: { "content-type": "text/html" } },
        "https://example.com/robots.txt": {
          body: [
            "User-agent: Googlebot",
            "",
            "User-agent: Bingbot",
            "",
            "User-agent: *",
            "Disallow: /",
            "",
          ].join("\n"),
        },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });

    const crawlability = report.checks.find((check) => check.check_id === "crawlability");
    expect(crawlability?.findings.some((finding) => finding.id === "crawlability-search-bot-blocked")).toBe(false);
    expect(crawlability?.findings.some((finding) => finding.id === "crawlability-ai-bot-limited")).toBe(true);
  });

  it("does not let a specific media crawler rule block general Googlebot", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["crawlability"],
      fetcher: fixtureFetcher({
        "https://example.com/": { body: healthyHtml, headers: { "content-type": "text/html" } },
        "https://example.com/robots.txt": {
          body: [
            "User-agent: Googlebot-Image",
            "Disallow: /",
            "",
            "User-agent: *",
            "Allow: /",
            "",
          ].join("\n"),
        },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });

    const crawlability = report.checks.find((check) => check.check_id === "crawlability");
    expect(crawlability?.findings.some((finding) => finding.id === "crawlability-search-bot-blocked")).toBe(false);
  });

  it("handles robots wildcard path rules for blocked private paths", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com/private/page",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["crawlability"],
      fetcher: fixtureFetcher({
        "https://example.com/private/page": { body: healthyHtml, headers: { "content-type": "text/html" } },
        "https://example.com/robots.txt": {
          body: "User-agent: *\nAllow: /private/public$\nDisallow: /private/*\n",
        },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/private/page</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });

    const crawlability = report.checks.find((check) => check.check_id === "crawlability");
    expect(crawlability?.findings.some((finding) => finding.id === "crawlability-search-bot-blocked")).toBe(true);
  });

  it("applies robots rules to path and query strings", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com/search?draft=1",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["crawlability"],
      fetcher: fixtureFetcher({
        "https://example.com/search?draft=1": { body: healthyHtml, headers: { "content-type": "text/html" } },
        "https://example.com/robots.txt": {
          body: "User-agent: Googlebot\nDisallow: /*?draft=\nUser-agent: Bingbot\nAllow: /\n",
        },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/search</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });

    const crawlability = report.checks.find((check) => check.check_id === "crawlability");
    expect(crawlability?.findings.some((finding) => finding.id === "crawlability-search-bot-blocked")).toBe(true);
  });

  it("normalizes decorated robots user-agent tokens", async () => {
    const report = await runSeoPass({
      targetUrl: "https://example.com/private",
      generatedAt: "2026-05-27T08:00:00.000Z",
      checks: ["crawlability"],
      fetcher: fixtureFetcher({
        "https://example.com/private": { body: healthyHtml, headers: { "content-type": "text/html" } },
        "https://example.com/robots.txt": {
          body: "User-agent: googlebot*\nDisallow: /private\nUser-agent: *\nAllow: /\n",
        },
        "https://example.com/sitemap.xml": { body: "<urlset><url><loc>https://example.com/private</loc></url></urlset>" },
        "https://example.com/llms.txt": { body: "# Example" },
      }),
    });

    const crawlability = report.checks.find((check) => check.check_id === "crawlability");
    expect(crawlability?.findings.some((finding) => finding.id === "crawlability-search-bot-blocked")).toBe(true);
  });
});
