import { afterEach, describe, expect, it, vi } from "vitest";
import { seopassLighthousePlan, seopassRegisterPack, seopassRun, seopassStatus } from "./seopass-tool.js";

function installFetch(fixtures: Record<string, string | { status: number; body: string; headers?: Record<string, string>; url?: string }>): void {
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    const normalized = new URL(url).toString();
    const fixture = fixtures[normalized] ?? fixtures[normalized.replace(/\/$/, "")];
    const status = typeof fixture === "object" ? fixture.status : fixture ? 200 : 404;
    const body = typeof fixture === "object" ? fixture.body : fixture ?? "not found";
    const headers = typeof fixture === "object" ? fixture.headers ?? {} : {};
    return {
      url: typeof fixture === "object" && fixture.url ? fixture.url : normalized,
      status,
      headers: new Headers(headers),
      text: async () => body,
    };
  }));
}

const healthyHtml = `<!doctype html>
<html>
  <head>
    <title>UnClick SEOPass - SEO verdicts for AI-native teams</title>
    <meta name="description" content="SEOPass scans technical SEO, metadata, schema, and AI-era search readiness, then returns fix prompts.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="canonical" href="https://unclick.world/">
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"UnClick"}</script>
  </head>
  <body>
    <h1>SEO verdicts you can fix in your IDE</h1>
    <h2>How does SEOPass work?</h2>
    <a href="https://unclick.world/about">About</a>
    <a href="https://unclick.world/pricing">Pricing</a>
    <a href="https://unclick.world/docs">Docs</a>
    <time datetime="2026-05-27">Updated May 27, 2026</time>
  </body>
</html>`;

describe("seopass-tool", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requires a url or pack_name", async () => {
    const result = (await seopassRun({})) as { error?: string };
    expect(result.error).toMatch(/Either url or pack_name is required/);
  });

  it("rejects non-http target URLs", async () => {
    const result = (await seopassRun({ url: "ftp://unclick.world" })) as { error?: string };
    expect(result.error).toMatch(/http\(s\)/);
  });

  it("rejects invalid pack URLs and unsupported check ids before storing", async () => {
    const badUrl = (await seopassRegisterPack({
      pack_yaml: [
        "name: Bad",
        "url: ftp://unclick.world",
        "checks:",
        "  - metadata",
        "lighthouse: {}",
        "crawl: {}",
        "budgets: {}",
      ].join("\n"),
    })) as { error?: string };
    expect(badUrl.error).toMatch(/public http\(s\)/);

    const badCheck = (await seopassRegisterPack({
      pack_yaml: [
        "name: Bad",
        "url: https://unclick.world",
        "checks:",
        "  - made-up-check",
        "lighthouse: {}",
        "crawl: {}",
        "budgets: {}",
      ].join("\n"),
    })) as { error?: string; details?: unknown[] };
    expect(badCheck.error).toMatch(/unsupported SEOPass check/);
    expect(badCheck.details).toEqual(["made-up-check"]);
  });

  it("rejects non-http Lighthouse plan targets", async () => {
    const result = (await seopassLighthousePlan({ url: "file:///tmp/page.html" })) as { error?: string };
    expect(result.error).toMatch(/http\(s\)/);
  });

  it("runs and stores a live-readonly SEOPass report", async () => {
    installFetch({
      "https://unclick.world/": healthyHtml,
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick\n> Agent-native tooling.\n\n## Pages\n[Docs](https://unclick.world/docs): Docs.",
    });

    const run = (await seopassRun({ url: "https://unclick.world" })) as {
      run_id?: string;
      status?: string;
      pass?: string;
      report?: { mode?: string };
      verdict_summary?: { fail?: number };
    };

    expect(run.status).toBe("complete");
    expect(run.pass).toBe("seopass");
    expect(run.report?.mode).toBe("live-readonly");
    expect(run.verdict_summary?.fail).toBe(0);
    expect(run.run_id).toMatch(/^seopass-/);

    const status = (await seopassStatus({ run_id: run.run_id })) as { run_id?: string; status?: string };
    expect(status.run_id).toBe(run.run_id);
    expect(status.status).toBe("complete");
  });

  it("returns a blocker verdict when robots and noindex block search", async () => {
    installFetch({
      "https://unclick.world/private": "<html><head><title>Private</title><meta name=\"robots\" content=\"noindex\"></head><body><h1>Private</h1></body></html>",
      "https://unclick.world/robots.txt": "User-agent: *\nDisallow: /\n",
      "https://unclick.world/sitemap.xml": { status: 404, body: "not found" },
      "https://unclick.world/llms.txt": { status: 404, body: "not found" },
    });

    const run = (await seopassRun({ url: "https://unclick.world/private" })) as {
      verdict?: string;
      verdict_summary?: { fail?: number };
      report?: { cross_pass_signals?: unknown[] };
    };

    expect(run.verdict).toBe("blocked");
    expect(run.verdict_summary?.fail).toBeGreaterThan(0);
    expect(run.report?.cross_pass_signals?.length).toBeGreaterThan(0);
  });

  it("detects crawler-specific noindex without treating unrelated bot headers as search blockers", async () => {
    installFetch({
      "https://unclick.world/page": {
        status: 200,
        headers: { "content-type": "text/html", "x-robots-tag": "otherbot: noindex" },
        body: "<html><head><title>Page</title><meta name=\"googlebot\" content=\"noindex\"></head><body><h1>Page</h1></body></html>",
      },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/page</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const googlebotRun = (await seopassRun({ url: "https://unclick.world/page" })) as {
      report?: { checks?: Array<{ findings?: Array<{ id?: string }> }> };
    };
    expect(googlebotRun.report?.checks?.some((check) => check.findings?.some((finding) => finding.id === "indexability-noindex"))).toBe(true);

    installFetch({
      "https://unclick.world/page": {
        status: 200,
        headers: { "content-type": "text/html", "x-robots-tag": "otherbot: noindex" },
        body: "<html><head><title>Page</title></head><body><h1>Page</h1></body></html>",
      },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/page</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const unrelatedBotRun = (await seopassRun({ url: "https://unclick.world/page" })) as {
      report?: { checks?: Array<{ findings?: Array<{ id?: string }> }> };
    };
    expect(unrelatedBotRun.report?.checks?.some((check) => check.findings?.some((finding) => finding.id === "indexability-noindex"))).toBe(false);
  });

  it("uses robots.txt Sitemap directives as sitemap evidence in MCP runs", async () => {
    installFetch({
      "https://unclick.world/page": { status: 200, body: healthyHtml, headers: { "content-type": "text/html" } },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\nSitemap: https://unclick.world/custom-sitemap.xml\n",
      "https://unclick.world/sitemap.xml": { status: 404, body: "not found" },
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world/page" })) as {
      report?: { checks?: Array<{ check_id?: string; findings?: Array<{ id?: string }> }> };
    };
    const indexability = run.report?.checks?.find((check) => check.check_id === "indexability");
    expect(indexability?.findings?.some((finding) => finding.id === "indexability-sitemap-missing")).toBe(false);
  });

  it("rejects relative robots.txt Sitemap directives in MCP runs", async () => {
    installFetch({
      "https://unclick.world/page": { status: 200, body: healthyHtml, headers: { "content-type": "text/html" } },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n",
      "https://unclick.world/sitemap.xml": { status: 404, body: "not found" },
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world/page" })) as {
      report?: { checks?: Array<{ check_id?: string; findings?: Array<{ id?: string }> }> };
    };
    const findings = run.report?.checks
      ?.find((check) => check.check_id === "indexability")
      ?.findings?.map((finding) => finding.id) ?? [];
    expect(findings).toContain("indexability-sitemap-missing");
    expect(findings).toContain("indexability-robots-sitemap-invalid");
  });

  it("ignores robots.txt rules after Google's 500 KiB parsing limit in MCP runs", async () => {
    const robotsBody = [
      "User-agent: *",
      "Allow: /",
      "a".repeat(512 * 1024),
      "User-agent: Googlebot",
      "Disallow: /private",
    ].join("\n");
    installFetch({
      "https://unclick.world/private": { status: 200, body: healthyHtml, headers: { "content-type": "text/html" } },
      "https://unclick.world/robots.txt": robotsBody,
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/private</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world/private" })) as {
      report?: { checks?: Array<{ check_id?: string; findings?: Array<{ id?: string }> }> };
    };
    const findings = run.report?.checks
      ?.find((check) => check.check_id === "crawlability")
      ?.findings?.map((finding) => finding.id) ?? [];
    expect(findings).toContain("crawlability-robots-too-large");
    expect(findings).not.toContain("crawlability-search-bot-blocked");
  });

  it("applies robots rules to path/query and decorated user-agent tokens in MCP runs", async () => {
    installFetch({
      "https://unclick.world/search?draft=1": { status: 200, body: healthyHtml, headers: { "content-type": "text/html" } },
      "https://unclick.world/robots.txt": "User-agent: googlebot*\nDisallow: /*?draft=\nUser-agent: Bingbot\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/search</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world/search?draft=1" })) as {
      verdict?: string;
      report?: { checks?: Array<{ findings?: Array<{ id?: string }> }> };
    };

    expect(run.verdict).toBe("blocked");
    expect(run.report?.checks?.some((check) => check.findings?.some((finding) => finding.id === "crawlability-search-bot-blocked"))).toBe(true);
  });

  it("flags canonical placement, duplicate, and relative canonical issues in MCP runs", async () => {
    installFetch({
      "https://unclick.world/page": {
        status: 200,
        headers: { "content-type": "text/html" },
        body: `<!doctype html><html><head>
          <title>UnClick Page</title>
          <meta name="description" content="A page with canonical edge cases.">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="canonical" href="/canonical-page">
          <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"UnClick"}</script>
        </head><body>
          <h1>UnClick Page</h1>
          <h2>How does it work?</h2>
          <a href="https://unclick.world/about">About</a>
          <a href="https://unclick.world/pricing">Pricing</a>
          <a href="https://unclick.world/docs">Docs</a>
          <link rel="canonical" href="https://unclick.world/body-canonical">
          <time datetime="2026-05-27">Updated May 27, 2026</time>
        </body></html>`,
      },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/page</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world/page" })) as {
      report?: { checks?: Array<{ check_id?: string; findings?: Array<{ id?: string }> }> };
    };
    const canonicalFindings = run.report?.checks
      ?.find((check) => check.check_id === "canonical-signals")
      ?.findings?.map((finding) => finding.id) ?? [];
    expect(canonicalFindings).toContain("canonical-relative-url");
    expect(canonicalFindings).toContain("canonical-multiple");
    expect(canonicalFindings).toContain("canonical-outside-head");
  });

  it("accepts HTTP Link rel=canonical and flags conflicting canonical signals in MCP runs", async () => {
    installFetch({
      "https://unclick.world/page": {
        status: 200,
        headers: { "content-type": "text/html", link: "<https://unclick.world/page>; rel=\"canonical\"" },
        body: "<!doctype html><html><head><title>UnClick Page</title></head><body><h1>UnClick Page</h1></body></html>",
      },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/page</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const headerOnly = (await seopassRun({ url: "https://unclick.world/page" })) as {
      report?: { checks?: Array<{ check_id?: string; findings?: Array<{ id?: string }> }> };
    };
    expect(headerOnly.report?.checks?.find((check) => check.check_id === "canonical-signals")?.findings?.map((finding) => finding.id)).not.toContain("canonical-missing");

    installFetch({
      "https://unclick.world/page": {
        status: 200,
        headers: { "content-type": "text/html", Link: "<https://unclick.world/header-canonical>; rel=\"canonical\"" },
        body: healthyHtml.replace("https://unclick.world/", "https://unclick.world/html-canonical"),
      },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/page</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const conflicting = (await seopassRun({ url: "https://unclick.world/page" })) as {
      report?: { checks?: Array<{ check_id?: string; findings?: Array<{ id?: string }> }> };
    };
    expect(conflicting.report?.checks?.find((check) => check.check_id === "canonical-signals")?.findings?.map((finding) => finding.id)).toContain("canonical-conflicting-signals");
  });

  it("flags canonical link attributes that Google ignores in MCP runs", async () => {
    installFetch({
      "https://unclick.world/": {
        status: 200,
        headers: { "content-type": "text/html" },
        body: healthyHtml.replace(
          '<link rel="canonical" href="https://unclick.world/">',
          '<link rel="canonical" href="https://unclick.world/" hreflang="en" media="screen">',
        ),
      },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world" })) as {
      report?: { checks?: Array<{ check_id?: string; findings?: Array<{ id?: string }> }> };
    };
    const findings = run.report?.checks
      ?.find((check) => check.check_id === "canonical-signals")
      ?.findings?.map((finding) => finding.id) ?? [];
    expect(findings).toContain("canonical-ignored-attributes");
    expect(findings).toContain("canonical-no-usable-signal");
  });

  it("recognizes Microdata as structured-data evidence in the MCP run", async () => {
    installFetch({
      "https://unclick.world/": `<!doctype html><html><head><title>UnClick</title></head><body>
        <section itemscope itemtype="https://schema.org/Organization"><span itemprop="name">UnClick</span></section>
      </body></html>`,
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world" })) as {
      report?: { checks?: Array<{ findings?: Array<{ id?: string }> }> };
    };

    expect(run.report?.checks?.some((check) => check.findings?.some((finding) => finding.id === "structured-data-missing"))).toBe(false);
    expect(run.report?.checks?.some((check) => check.findings?.some((finding) => finding.id === "structured-data-jsonld-recommended"))).toBe(true);
  });

  it("warns when robots preview controls limit AI-era search eligibility", async () => {
    installFetch({
      "https://unclick.world/": healthyHtml.replace("</head>", "<meta name=\"robots\" content=\"nosnippet\"></head>"),
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world" })) as {
      report?: { checks?: Array<{ findings?: Array<{ id?: string }> }> };
    };

    expect(run.report?.checks?.some((check) => check.findings?.some((finding) => finding.id === "aio-preview-controls-limit-ai-features"))).toBe(true);
  });

  it("warns when data-nosnippet may hide content from AI-era answer extraction in MCP runs", async () => {
    installFetch({
      "https://unclick.world/": healthyHtml.replace("<h2>How does SEOPass work?</h2>", "<section data-nosnippet><h2>How does SEOPass work?</h2>").replace("</body>", "</section></body>"),
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world" })) as {
      report?: { checks?: Array<{ findings?: Array<{ id?: string }> }> };
    };

    expect(run.report?.checks?.some((check) => check.findings?.some((finding) => finding.id === "aio-data-nosnippet-present"))).toBe(true);
  });

  it("uses the final fetched URL for MCP robots, sitemap, llms, canonical, and link analysis", async () => {
    installFetch({
      "https://unclick.world/start": {
        status: 200,
        url: "https://www.unclick.world/final",
        headers: { "content-type": "text/html" },
        body: healthyHtml
          .replace("https://unclick.world/", "https://www.unclick.world/final")
          .replace("https://unclick.world/about", "https://www.unclick.world/about")
          .replace("https://unclick.world/pricing", "https://www.unclick.world/pricing")
          .replace("https://unclick.world/docs", "https://www.unclick.world/docs"),
      },
      "https://www.unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://www.unclick.world/sitemap.xml": "<urlset><url><loc>https://www.unclick.world/final</loc></url></urlset>",
      "https://www.unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world/start" })) as {
      target_url?: string;
      report?: { notes?: string[]; checks?: Array<{ check_id?: string; findings?: Array<{ id?: string }> }> };
    };

    expect(run.target_url).toBe("https://www.unclick.world/final");
    expect(run.report?.notes?.join(" ")).toMatch(/Requested URL resolved/);
    expect(run.report?.checks?.find((check) => check.check_id === "canonical-signals")?.findings?.map((finding) => finding.id)).not.toContain("canonical-cross-origin");
    expect(run.report?.checks?.find((check) => check.check_id === "internal-links")?.findings?.map((finding) => finding.id)).not.toContain("internal-links-too-few");
  });

  it("checks current AI search and training crawler policy tokens in MCP runs", async () => {
    installFetch({
      "https://unclick.world/": healthyHtml,
      "https://unclick.world/robots.txt": [
        "User-agent: OAI-SearchBot",
        "Disallow: /",
        "User-agent: Claude-SearchBot",
        "Disallow: /",
        "User-agent: Google-Extended",
        "Disallow: /",
        "User-agent: *",
        "Allow: /",
      ].join("\n"),
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world" })) as {
      report?: { checks?: Array<{ check_id?: string; findings?: Array<{ id?: string; summary?: string }> }> };
    };
    const aiFinding = run.report?.checks
      ?.find((check) => check.check_id === "crawlability")
      ?.findings?.find((finding) => finding.id === "crawlability-ai-bot-limited");
    expect(aiFinding?.summary).toContain("OAI-SearchBot");
    expect(aiFinding?.summary).toContain("Claude-SearchBot");
    expect(aiFinding?.summary).toContain("Google-Extended");
  });

  it("flags non-HTML target URLs as an MCP run gap", async () => {
    installFetch({
      "https://unclick.world/report.pdf": { status: 200, body: "%PDF-1.7", headers: { "content-type": "application/pdf" } },
      "https://unclick.world/robots.txt": "User-agent: *\nAllow: /\n",
      "https://unclick.world/sitemap.xml": "<urlset><url><loc>https://unclick.world/report.pdf</loc></url></urlset>",
      "https://unclick.world/llms.txt": "# UnClick",
    });

    const run = (await seopassRun({ url: "https://unclick.world/report.pdf" })) as {
      verdict_summary?: { fail?: number };
      report?: { checks?: Array<{ findings?: Array<{ id?: string }> }> };
    };

    expect(run.verdict_summary?.fail).toBeGreaterThan(0);
    expect(run.report?.checks?.some((check) => check.findings?.some((finding) => finding.id === "crawlability-non-html-response"))).toBe(true);
  });
});
