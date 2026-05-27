import { afterEach, describe, expect, it, vi } from "vitest";
import { seopassRun, seopassStatus } from "./seopass-tool.js";

function installFetch(fixtures: Record<string, string | { status: number; body: string }>): void {
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    const normalized = new URL(url).toString();
    const fixture = fixtures[normalized] ?? fixtures[normalized.replace(/\/$/, "")];
    const status = typeof fixture === "object" ? fixture.status : fixture ? 200 : 404;
    const body = typeof fixture === "object" ? fixture.body : fixture ?? "not found";
    return {
      url: normalized,
      status,
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
});
