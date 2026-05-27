import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import yaml from "js-yaml";

const PACKS_DIR = path.resolve(
  process.env.SEOPASS_PACKS_DIR ??
    path.join(process.cwd(), "packages", "seopass", "packs", "registered"),
);

const REQUIRED_PACK_KEYS = ["name", "url", "checks", "lighthouse", "crawl", "budgets"] as const;

type SeoPassMcpRun = {
  run_id: string;
  status: "complete";
  pass: "seopass";
  target_url: string;
  generated_at: string;
  search_engine_readiness_score: number;
  verdict: "ready" | "needs-work" | "blocked";
  verdict_summary: Record<"pass" | "warn" | "fail", number>;
  report: {
    mode: "live-readonly";
    checks: Array<{
      check_id: string;
      label: string;
      score: number;
      verdict: "pass" | "warn" | "fail";
      findings: Array<{
        id: string;
        severity: "critical" | "high" | "medium" | "low" | "info";
        title: string;
        summary: string;
        recommendation: string;
        fix_prompt: string;
      }>;
    }>;
    evidence: Array<{ kind: string; source_url: string; summary: string }>;
    cross_pass_signals: Array<{ pass: "geopass"; signal: string; reason: string }>;
    notes: string[];
  };
};

type FetchTextResult = {
  url: string;
  status: number;
  headers: Record<string, string>;
  body: string;
  elapsed_ms: number;
  error?: string;
};

const RUNS = new Map<string, SeoPassMcpRun>();
const DEFAULT_CHECKS = [
  "lighthouse-performance",
  "crawlability",
  "metadata",
  "structured-data",
  "indexability",
  "canonical-signals",
  "internal-links",
  "core-web-vitals",
  "ai-overview-readiness",
] as const;

function ensurePacksDir(): void {
  fs.mkdirSync(PACKS_DIR, { recursive: true });
}

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120);
}

function loadRegisteredPack(name: string): Record<string, unknown> | null {
  ensurePacksDir();
  const candidate = fs.readdirSync(PACKS_DIR).find((file) => file.startsWith(`${safeFilename(name)}-`));
  if (!candidate) return null;
  return yaml.load(fs.readFileSync(path.join(PACKS_DIR, candidate), "utf8")) as Record<string, unknown>;
}

function lighthousePlan(pack: Record<string, unknown>): Record<string, unknown> {
  const lighthouse = (pack.lighthouse ?? {}) as Record<string, unknown>;
  return {
    runner: "lighthouse",
    target_url: pack.url,
    strategy: lighthouse.strategy ?? "mobile",
    categories: lighthouse.categories ?? ["seo"],
    output: ["json"],
    notes: [
      "SEOPass now emits a live-readonly deterministic report immediately.",
      "This plan remains for the heavier Lighthouse execution lane.",
    ],
  };
}

export async function seopassRun(args: Record<string, unknown>): Promise<unknown> {
  const url = typeof args.url === "string" ? args.url : undefined;
  const packName = typeof args.pack_name === "string" ? args.pack_name : undefined;
  if (!url && !packName) return { error: "Either url or pack_name is required" };

  const pack = packName ? loadRegisteredPack(packName) : null;
  const rawTargetUrl = url ?? (typeof pack?.url === "string" ? pack.url : "");
  const targetUrl = normalizeUrl(rawTargetUrl);
  if (!targetUrl) {
    return {
      error: url
        ? "SEOPass target URL must be a valid public http(s) URL"
        : `No registered SEOPass pack found for '${packName}'`,
    };
  }

  const checkSelection = selectChecks(pack?.checks);
  const run = await runReadonlySeoPass(targetUrl, checkSelection.checks, pack ?? {}, checkSelection.ignored);
  RUNS.set(run.run_id, run);
  return {
    ...run,
    lighthouse_plan: lighthousePlan({ ...(pack ?? {}), url: targetUrl }),
  };
}

export async function seopassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const run = RUNS.get(runId);
  if (!run) return { error: `SEOPass run '${runId}' was not found in this MCP session` };
  return run;
}

export async function seopassRegisterPack(args: Record<string, unknown>): Promise<unknown> {
  const packYaml = typeof args.pack_yaml === "string" ? args.pack_yaml : "";
  if (!packYaml) return { error: "pack_yaml is required" };

  let parsed: unknown;
  try {
    parsed = yaml.load(packYaml);
  } catch (err) {
    return { error: `pack_yaml is not valid YAML: ${(err as Error).message}` };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { error: "pack_yaml must be a YAML object at the top level" };
  }
  const pack = parsed as Record<string, unknown>;
  const missing = REQUIRED_PACK_KEYS.filter((key) => pack[key] === undefined);
  if (missing.length > 0) return { error: "pack is missing required keys", missing };

  const name = typeof pack.name === "string" ? pack.name : "";
  if (!name) return { error: "pack name must be a non-empty string" };

  ensurePacksDir();
  const packId = `${safeFilename(name)}-${crypto.randomBytes(4).toString("hex")}`;
  const filePath = path.join(PACKS_DIR, `${packId}.yaml`);
  fs.writeFileSync(filePath, packYaml, "utf8");
  return { pack_id: packId, name, file: filePath };
}

export async function seopassLighthousePlan(args: Record<string, unknown>): Promise<unknown> {
  const url = typeof args.url === "string" ? args.url : "";
  if (!url) return { error: "url is required" };
  return lighthousePlan({
    url,
    lighthouse: {
      strategy: args.strategy === "desktop" ? "desktop" : "mobile",
      categories: Array.isArray(args.categories) ? args.categories : ["performance", "accessibility", "best-practices", "seo"],
    },
  });
}

async function runReadonlySeoPass(
  targetUrl: string,
  checks: string[],
  pack: Record<string, unknown>,
  ignoredChecks: string[] = [],
): Promise<SeoPassMcpRun> {
  const generatedAt = new Date().toISOString();
  const runId = `seopass-${crypto.randomUUID()}`;
  const [page, robots, sitemap, llms] = await Promise.all([
    fetchText(targetUrl),
    fetchText(new URL("/robots.txt", targetUrl).toString()),
    fetchText(new URL("/sitemap.xml", targetUrl).toString()),
    fetchText(new URL("/llms.txt", targetUrl).toString()),
  ]);
  const signals = analyzeHtml(page.body, targetUrl);
  const availableChecks = new Set(checks.length > 0 ? checks : DEFAULT_CHECKS);
  const checkResults = DEFAULT_CHECKS.filter((check) => availableChecks.has(check)).map((check) =>
    buildCheck(check, { targetUrl, page, robots, sitemap, llms, signals }),
  );
  const score = Math.round(checkResults.reduce((sum, check) => sum + check.score, 0) / Math.max(1, checkResults.length));
  const verdict = checkResults.some((check) => check.findings.some((finding) => finding.severity === "critical"))
    ? "blocked"
    : score >= 85
      ? "ready"
      : score >= 55
        ? "needs-work"
        : "blocked";
  const verdictSummary = {
    pass: checkResults.filter((check) => check.verdict === "pass").length,
    warn: checkResults.filter((check) => check.verdict === "warn").length,
    fail: checkResults.filter((check) => check.verdict === "fail").length,
  };

  return {
    run_id: runId,
    status: "complete",
    pass: "seopass",
    target_url: targetUrl,
    generated_at: generatedAt,
    search_engine_readiness_score: score,
    verdict,
    verdict_summary: verdictSummary,
    report: {
      mode: "live-readonly",
      checks: checkResults,
      evidence: [
        { kind: "http-response", source_url: page.url, summary: page.error ?? `HTTP ${page.status} in ${page.elapsed_ms}ms` },
        { kind: "robots-txt", source_url: robots.url, summary: robots.error ?? `HTTP ${robots.status}` },
        { kind: "sitemap", source_url: sitemap.url, summary: `${extractSitemapUrls(sitemap.body).length} URL(s) found` },
        { kind: "llms-txt", source_url: llms.url, summary: llms.status >= 200 && llms.status < 400 ? "llms.txt found" : "llms.txt not found" },
      ],
      cross_pass_signals: crossPassSignals(checkResults),
      notes: [
        "SEOPass ran public read-only checks. It did not use credentials, mutate the site, submit URLs, or guarantee rankings.",
        `Pack source: ${typeof pack.name === "string" ? pack.name : "one-off URL"}.`,
        ...(ignoredChecks.length > 0 ? [`Ignored unsupported SEOPass check id(s): ${ignoredChecks.join(", ")}.`] : []),
      ],
    },
  };
}

function buildCheck(
  checkId: string,
  context: {
    targetUrl: string;
    page: FetchTextResult;
    robots: FetchTextResult;
    sitemap: FetchTextResult;
    llms: FetchTextResult;
    signals: ReturnType<typeof analyzeHtml>;
  },
): SeoPassMcpRun["report"]["checks"][number] {
  const findings: SeoPassMcpRun["report"]["checks"][number]["findings"] = [];
  const add = (
    id: string,
    severity: "critical" | "high" | "medium" | "low" | "info",
    title: string,
    summary: string,
    recommendation: string,
  ) => {
    findings.push({
      id,
      severity,
      title,
      summary,
      recommendation,
      fix_prompt: [
        `Fix SEOPass finding ${id}: ${title}.`,
        `Problem: ${summary}`,
        `Recommended direction: ${recommendation}`,
        "Make the smallest framework-appropriate change, then rerun SEOPass. Do not promise rankings, AI Overview placement, or AI citations.",
      ].join("\n"),
    });
  };

  if (checkId === "crawlability") {
    if (context.page.status < 200 || context.page.status >= 400) {
      add("crawlability-http-unreachable", "critical", "Target URL was not fetchable", `Public fetch returned HTTP ${context.page.status}.`, "Make the URL return stable public HTML.");
    }
    const contentType = context.page.headers["content-type"] ?? "";
    if (
      context.page.status >= 200 &&
      context.page.status < 400 &&
      contentType &&
      !/\b(?:text\/html|application\/xhtml\+xml)\b/i.test(contentType)
    ) {
      add("crawlability-non-html-response", "high", "Target URL did not return HTML", `The target returned content-type '${contentType}'.`, "Point SEOPass at the canonical public HTML URL for the page.");
    }
    if (robotsBlocksAll(context.robots.body)) {
      add("crawlability-robots-blocks-all", "critical", "robots.txt blocks all crawlers", "robots.txt contains a wildcard Disallow: / rule.", "Review robots.txt before expecting search crawlers to index this URL.");
    }
  }

  if (checkId === "metadata") {
    if (!context.signals.title) add("metadata-title-missing", "high", "Page title is missing", "No title tag was found.", "Add a unique descriptive title.");
    if (!context.signals.description) add("metadata-description-missing", "high", "Meta description is missing", "No description meta tag was found.", "Add a plain-language page summary.");
    if (!context.signals.viewport) add("metadata-viewport-missing", "high", "Viewport is missing", "No mobile viewport meta tag was found.", "Add a responsive viewport meta tag.");
    if (context.signals.h1Count === 0) add("metadata-h1-missing", "medium", "Primary H1 heading is missing", "No H1 heading was found.", "Add one clear H1 that matches the page intent.");
    if (context.signals.h1Count > 1) add("metadata-h1-duplicate", "low", "Multiple H1 headings were found", `${context.signals.h1Count} H1 headings were found.`, "Confirm the page has one primary H1 and lower-level headings for sections.");
  }

  if (checkId === "structured-data") {
    if (context.signals.jsonLdCount === 0) {
      add("structured-data-missing", "medium", "Structured data is missing", "No JSON-LD blocks were found.", "Add Organization or WebSite JSON-LD, then page-specific schema.");
    }
    if (context.signals.jsonLdParseErrors > 0) {
      add("structured-data-invalid", "high", "Structured data is invalid", `${context.signals.jsonLdParseErrors} JSON-LD block(s) failed parsing.`, "Validate JSON-LD before shipping.");
    }
  }

  if (checkId === "indexability") {
    if (/noindex/i.test(context.signals.robotsMeta)) add("indexability-noindex", "critical", "Page is marked noindex", "Robots meta contains noindex.", "Remove noindex only if this page should be searchable.");
    if (extractSitemapUrls(context.sitemap.body).length === 0) add("indexability-sitemap-missing", "medium", "Sitemap is missing or empty", "No URLs were found in /sitemap.xml.", "Publish a sitemap or sitemap index.");
  }

  if (checkId === "canonical-signals" && !context.signals.canonical) {
    add("canonical-missing", "medium", "Canonical tag is missing", "No rel=canonical tag was found.", "Add a canonical URL to reduce duplicate URL ambiguity.");
  }

  if (checkId === "internal-links" && context.signals.internalLinks < 3) {
    add("internal-links-too-few", "medium", "Internal link graph looks thin", `${context.signals.internalLinks} same-origin links were found.`, "Add clear internal paths to related content.");
  }

  if (checkId === "lighthouse-performance") {
    if (context.page.elapsed_ms > 2500) add("performance-response-slow", "medium", "Initial response is slow", `Fetch took ${context.page.elapsed_ms}ms.`, "Investigate server response time.");
    if (context.signals.scriptCount > 40) add("performance-script-heavy", "low", "Script count is high", `${context.signals.scriptCount} script tags were found.`, "Defer non-critical scripts.");
  }

  if (checkId === "core-web-vitals") {
    if (!context.signals.viewport) add("cwv-viewport-missing", "high", "Mobile viewport is missing", "Core Web Vitals readiness is weak without a viewport tag.", "Add a responsive viewport tag.");
    if (context.page.elapsed_ms > 1500) add("cwv-ttfb-proxy-warn", "medium", "TTFB readiness proxy is weak", `Fetch took ${context.page.elapsed_ms}ms.`, "Run full Lighthouse and reduce response delay.");
  }

  if (checkId === "ai-overview-readiness") {
    if (!context.signals.hasQuestionHeading && !context.signals.hasFaqSchema) add("aio-faq-readiness-thin", "medium", "Question-answer structure is thin", "No FAQ schema or question-style heading was found.", "Add real FAQ or question-led sections where useful.");
    if (!context.signals.hasDateSignal) add("aio-freshness-missing", "low", "Freshness signal is missing", "No obvious dateModified/datePublished signal was found.", "Add truthful freshness metadata where relevant.");
    if (context.llms.status >= 400) add("aio-llms-txt-missing", "info", "llms.txt was not found", "llms.txt is future-facing hygiene, not a ranking guarantee.", "Consider adding llms.txt for direct agent context.");
  }

  const highest = highestSeverity(findings);
  const score = highest === "critical" ? 10 : highest === "high" ? 35 : highest === "medium" ? 65 : highest === "low" ? 82 : highest === "info" ? 92 : 100;
  return {
    check_id: checkId,
    label: labelForCheck(checkId),
    score,
    verdict: highest === "critical" || highest === "high" ? "fail" : highest ? "warn" : "pass",
    findings,
  };
}

async function fetchText(url: string): Promise<FetchTextResult> {
  const started = Date.now();
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "UnClick-SEOPass/0.1 (+https://unclick.world)",
        accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.8",
      },
    });
    return {
      url: res.url || url,
      status: res.status,
      headers: res.headers ? Object.fromEntries(res.headers.entries()) : {},
      body: await res.text(),
      elapsed_ms: Date.now() - started,
    };
  } catch (err) {
    return {
      url,
      status: 0,
      headers: {},
      body: "",
      elapsed_ms: Date.now() - started,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

function analyzeHtml(html: string, baseUrl: string): {
  title: boolean;
  description: boolean;
  viewport: boolean;
  canonical: boolean;
  robotsMeta: string;
  h1Count: number;
  jsonLdCount: number;
  jsonLdParseErrors: number;
  internalLinks: number;
  scriptCount: number;
  hasQuestionHeading: boolean;
  hasFaqSchema: boolean;
  hasDateSignal: boolean;
} {
  const jsonLdBlocks = Array.from(html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)).map((match) => match[1]?.trim() ?? "");
  return {
    title: /<title\b[^>]*>[\s\S]*?<\/title>/i.test(html),
    description: /<meta\b[^>]*(?:name=["']description["'][^>]*content=|content=[^>]*name=["']description["'])/i.test(html),
    viewport: /<meta\b[^>]*(?:name=["']viewport["'][^>]*content=|content=[^>]*name=["']viewport["'])/i.test(html),
    canonical: /<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=/i.test(html),
    robotsMeta: /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i.exec(html)?.[1] ?? "",
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    jsonLdCount: jsonLdBlocks.length,
    jsonLdParseErrors: jsonLdBlocks.filter((block) => {
      try {
        JSON.parse(block);
        return false;
      } catch {
        return true;
      }
    }).length,
    internalLinks: Array.from(html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)).filter((match) => {
      const href = match[1] ?? "";
      const parsed = safeUrl(href, baseUrl);
      return parsed !== null && parsed.origin === new URL(baseUrl).origin;
    }).length,
    scriptCount: (html.match(/<script\b/gi) ?? []).length,
    hasQuestionHeading: /<h[1-6]\b[^>]*>[^<]*(?:\?|how|what|why|when|where|which|can|should)/i.test(html),
    hasFaqSchema: /FAQPage/i.test(html),
    hasDateSignal: /\b(datePublished|dateModified|updated_time|<time\b|last updated|updated on)\b/i.test(html),
  };
}

function safeUrl(value: string, base: string): URL | null {
  try {
    return new URL(value, base);
  } catch {
    return null;
  }
}

function normalizeUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function extractSitemapUrls(body: string): string[] {
  return Array.from(body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)).map((match) => match[1] ?? "").filter(Boolean);
}

function selectChecks(input: unknown): { checks: string[]; ignored: string[] } {
  const requested = Array.isArray(input) ? input.filter((check): check is string => typeof check === "string") : [];
  if (requested.length === 0) return { checks: [...DEFAULT_CHECKS], ignored: [] };
  const valid = requested.filter((check) => DEFAULT_CHECKS.includes(check as (typeof DEFAULT_CHECKS)[number]));
  const ignored = requested.filter((check) => !DEFAULT_CHECKS.includes(check as (typeof DEFAULT_CHECKS)[number]));
  return { checks: valid.length > 0 ? valid : [...DEFAULT_CHECKS], ignored };
}

function robotsBlocksAll(body: string): boolean {
  return /user-agent:\s*\*[\s\S]*?disallow:\s*\/(?:\s|$)/i.test(body);
}

function highestSeverity(
  findings: SeoPassMcpRun["report"]["checks"][number]["findings"],
): "critical" | "high" | "medium" | "low" | "info" | null {
  return ["critical", "high", "medium", "low", "info"].find((severity) =>
    findings.some((finding) => finding.severity === severity),
  ) as "critical" | "high" | "medium" | "low" | "info" | undefined ?? null;
}

function labelForCheck(checkId: string): string {
  return {
    "lighthouse-performance": "Performance readiness",
    crawlability: "Crawler access",
    metadata: "Metadata and snippets",
    "structured-data": "Structured data",
    indexability: "Indexability",
    "canonical-signals": "Canonical signals",
    "internal-links": "Internal links",
    "core-web-vitals": "Core Web Vitals readiness",
    "ai-overview-readiness": "AI-era search readiness",
  }[checkId] ?? checkId;
}

function crossPassSignals(
  checks: SeoPassMcpRun["report"]["checks"],
): SeoPassMcpRun["report"]["cross_pass_signals"] {
  const signals: SeoPassMcpRun["report"]["cross_pass_signals"] = [];
  if (checks.some((check) => check.check_id === "structured-data" && check.verdict !== "pass")) {
    signals.push({ pass: "geopass", signal: "schema-org-citation-grade", reason: "Structured-data gaps also reduce entity grounding for GEOPass." });
  }
  if (checks.some((check) => check.check_id === "ai-overview-readiness" && check.verdict !== "pass")) {
    signals.push({ pass: "geopass", signal: "brand-mention-readiness", reason: "AI-era search gaps should be expanded into a GEOPass engine-readiness scan." });
  }
  if (checks.some((check) => check.check_id === "crawlability" && check.verdict !== "pass")) {
    signals.push({ pass: "geopass", signal: "ai-bot-crawlability", reason: "Crawler access should feed the shared SEOPass/GEOPass crawler matrix." });
  }
  return signals;
}
