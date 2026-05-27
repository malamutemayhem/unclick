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

type RobotsRule = {
  agents: string[];
  rules: Array<{ directive: "allow" | "disallow"; path: string }>;
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
const DEFAULT_REQUEST_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_BODY_CHARS = 1_500_000;

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
  const validation = validatePack(pack);
  if (validation) return validation;

  ensurePacksDir();
  const packId = `${safeFilename(name)}-${crypto.randomBytes(4).toString("hex")}`;
  const filePath = path.join(PACKS_DIR, `${packId}.yaml`);
  fs.writeFileSync(filePath, packYaml, "utf8");
  return { pack_id: packId, name, file: filePath };
}

export async function seopassLighthousePlan(args: Record<string, unknown>): Promise<unknown> {
  const url = typeof args.url === "string" ? args.url : "";
  if (!url) return { error: "url is required" };
  const targetUrl = normalizeUrl(url);
  if (!targetUrl) return { error: "SEOPass target URL must be a valid public http(s) URL" };
  return lighthousePlan({
    url: targetUrl,
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
    const robotsRules = parseRobots(context.robots.body);
    const targetPath = robotsPathForUrl(context.targetUrl);
    const googleAllowed = isRobotAllowed(robotsRules, "Googlebot", targetPath);
    const bingAllowed = isRobotAllowed(robotsRules, "Bingbot", targetPath);
    const aiBots = ["GPTBot", "ClaudeBot", "PerplexityBot"].map((bot) => ({
      bot,
      allowed: isRobotAllowed(robotsRules, bot, targetPath),
    }));

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
    if (!googleAllowed || !bingAllowed) {
      add(
        "crawlability-search-bot-blocked",
        "critical",
        "A major search crawler appears blocked",
        `Googlebot allowed: ${googleAllowed ? "yes" : "no"}; Bingbot allowed: ${bingAllowed ? "yes" : "no"}.`,
        "Review robots.txt before expecting search crawlers to index this URL.",
      );
    }
    if (aiBots.some((entry) => !entry.allowed)) {
      const blocked = aiBots.filter((entry) => !entry.allowed).map((entry) => entry.bot).join(", ");
      add("crawlability-ai-bot-limited", "low", "Some AI crawlers appear blocked", `${blocked} appears blocked for this target path.`, "Confirm AI crawler policy matches the site's distribution strategy.");
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
    const hasStructuredData =
      context.signals.jsonLdCount > 0 ||
      context.signals.microdataCount > 0 ||
      context.signals.rdfaCount > 0;
    if (!hasStructuredData) {
      add("structured-data-missing", "medium", "Structured data is missing", "No JSON-LD, Microdata, or RDFa markup was found.", "Add Organization or WebSite schema, then page-specific schema.");
    }
    if (context.signals.jsonLdCount === 0 && hasStructuredData) {
      add("structured-data-jsonld-recommended", "low", "Structured data uses non-JSON-LD markup", "Microdata or RDFa was detected. Google supports it, but JSON-LD is usually easier to maintain and validate.", "Keep the existing valid markup if deliberate, or migrate durable entity data to JSON-LD.");
    }
    if (context.signals.jsonLdParseErrors > 0) {
      add("structured-data-invalid", "high", "Structured data is invalid", `${context.signals.jsonLdParseErrors} JSON-LD block(s) failed parsing.`, "Validate JSON-LD before shipping.");
    }
  }

  if (checkId === "indexability") {
    const searchDirectives = searchRobotsDirectives(context.signals.robotsDirectives, context.page.headers["x-robots-tag"] ?? "");
    if (hasNoindexDirective(searchDirectives)) add("indexability-noindex", "critical", "Page is marked noindex", `Search robots directives contain noindex: ${formatRobotsDirectives(searchDirectives)}.`, "Remove noindex only if this page should be searchable.");
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
    const searchDirectives = searchRobotsDirectives(context.signals.robotsDirectives, context.page.headers["x-robots-tag"] ?? "");
    if (hasSnippetLimitingDirective(searchDirectives)) add("aio-preview-controls-limit-ai-features", "medium", "Search preview controls limit AI feature eligibility", "A search robots directive such as nosnippet or max-snippet:0 can limit snippet use and AI Overview/AI Mode input.", "Keep restrictive preview controls only when intentional.");
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "UnClick-SEOPass/0.1 (+https://unclick.world)",
        accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.8",
      },
      signal: controller.signal,
    });
    const text = await res.text();
    const truncated = text.length > DEFAULT_MAX_BODY_CHARS;
    return {
      url: res.url || url,
      status: res.status,
      headers: {
        ...(res.headers ? Object.fromEntries(res.headers.entries()) : {}),
        ...(truncated ? { "x-seopass-body-truncated": "true" } : {}),
      },
      body: truncated ? text.slice(0, DEFAULT_MAX_BODY_CHARS) : text,
      elapsed_ms: Date.now() - started,
    };
  } catch (err) {
    const message =
      err instanceof Error && err.name === "AbortError"
        ? `Request timed out after ${DEFAULT_REQUEST_TIMEOUT_MS}ms`
        : err instanceof Error
          ? err.message
          : String(err);
    return {
      url,
      status: 0,
      headers: {},
      body: "",
      elapsed_ms: Date.now() - started,
      error: message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function analyzeHtml(html: string, baseUrl: string): {
  title: boolean;
  description: boolean;
  viewport: boolean;
  canonical: boolean;
  robotsMeta: string;
  robotsDirectives: Array<{ source: "meta" | "x-robots-tag"; userAgent: string | null; content: string }>;
  h1Count: number;
  jsonLdCount: number;
  jsonLdParseErrors: number;
  microdataCount: number;
  rdfaCount: number;
  internalLinks: number;
  scriptCount: number;
  hasQuestionHeading: boolean;
  hasFaqSchema: boolean;
  hasDateSignal: boolean;
} {
  const jsonLdBlocks = Array.from(html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)).map((match) => match[1]?.trim() ?? "");
  const microdataCount = (html.match(/<[^>]+\b(?:itemscope|itemtype)\b[^>]*>/gi) ?? []).length;
  const rdfaCount = (html.match(/<[^>]+\b(?:typeof|vocab)\s*=[^>]*>/gi) ?? []).length;
  return {
    title: /<title\b[^>]*>[\s\S]*?<\/title>/i.test(html),
    description: /<meta\b[^>]*(?:name=["']description["'][^>]*content=|content=[^>]*name=["']description["'])/i.test(html),
    viewport: /<meta\b[^>]*(?:name=["']viewport["'][^>]*content=|content=[^>]*name=["']viewport["'])/i.test(html),
    canonical: /<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=/i.test(html),
    robotsMeta: /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i.exec(html)?.[1] ?? "",
    robotsDirectives: extractRobotsMetaDirectives(html),
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
    microdataCount,
    rdfaCount,
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
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    return null;
  }
}

function normalizeUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return url.toString();
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    return null;
  }
}

function extractSitemapUrls(body: string): string[] {
  return Array.from(body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)).map((match) => match[1] ?? "").filter(Boolean);
}

function extractRobotsMetaDirectives(html: string): Array<{ source: "meta"; userAgent: string | null; content: string }> {
  return Array.from(html.matchAll(/<meta\b[^>]*>/gi))
    .map((match) => match[0])
    .flatMap((tag) => {
      const name = attrValue(tag, "name")?.toLowerCase() ?? "";
      const content = attrValue(tag, "content")?.trim() ?? "";
      if (!content || !["robots", "googlebot", "googlebot-news", "bingbot"].includes(name)) return [];
      return [{ source: "meta" as const, userAgent: name, content }];
    });
}

function searchRobotsDirectives(
  metaDirectives: Array<{ source: "meta" | "x-robots-tag"; userAgent: string | null; content: string }>,
  xRobotsHeader: string,
): Array<{ source: "meta" | "x-robots-tag"; userAgent: string | null; content: string }> {
  return [...metaDirectives, ...extractXRobotsDirectives(xRobotsHeader)].filter((directive) =>
    directiveAppliesToSearch(directive.userAgent),
  );
}

function extractXRobotsDirectives(header: string): Array<{ source: "x-robots-tag"; userAgent: string | null; content: string }> {
  if (!header.trim()) return [];
  const directives: Array<{ source: "x-robots-tag"; userAgent: string | null; content: string }> = [];
  let currentAgent: string | null = null;
  for (const rawPart of header.split(",")) {
    const part = rawPart.trim();
    if (!part) continue;
    const separatorIndex = part.indexOf(":");
    if (separatorIndex > 0) {
      const candidate = part.slice(0, separatorIndex).trim().toLowerCase();
      const content = part.slice(separatorIndex + 1).trim();
      if (isXRobotsAgentToken(candidate)) {
        currentAgent = candidate;
        if (content) directives.push({ source: "x-robots-tag", userAgent: currentAgent, content });
        continue;
      }
    }
    directives.push({ source: "x-robots-tag", userAgent: currentAgent, content: part });
  }
  return directives;
}

function attrValue(tag: string, attr: string): string | null {
  return new RegExp(`\\b${attr}\\s*=\\s*(["'])(.*?)\\1`, "i").exec(tag)?.[2] ?? null;
}

function isXRobotsAgentToken(value: string): boolean {
  if (!/^[a-z0-9*_.-]+$/i.test(value)) return false;
  return ![
    "all",
    "indexifembedded",
    "max-image-preview",
    "max-snippet",
    "max-video-preview",
    "noimageindex",
    "nofollow",
    "noindex",
    "none",
    "nosnippet",
    "notranslate",
    "unavailable_after",
  ].includes(value.toLowerCase());
}

function directiveAppliesToSearch(userAgent: string | null): boolean {
  if (!userAgent || userAgent === "*" || userAgent === "robots") return true;
  return ["googlebot", "bingbot"].includes(userAgent.toLowerCase());
}

function hasNoindexDirective(
  directives: Array<{ source: "meta" | "x-robots-tag"; userAgent: string | null; content: string }>,
): boolean {
  return directives.some((directive) =>
    hasDirectiveToken(directive.content, "noindex") || hasDirectiveToken(directive.content, "none"),
  );
}

function hasSnippetLimitingDirective(
  directives: Array<{ source: "meta" | "x-robots-tag"; userAgent: string | null; content: string }>,
): boolean {
  return directives.some((directive) =>
    hasDirectiveToken(directive.content, "nosnippet") || /\bmax-snippet\s*:\s*0(?:\D|$)/i.test(directive.content),
  );
}

function hasDirectiveToken(content: string, token: string): boolean {
  return new RegExp(`(?:^|[,\\s])${token}(?:[,\\s]|$)`, "i").test(content);
}

function formatRobotsDirectives(
  directives: Array<{ source: "meta" | "x-robots-tag"; userAgent: string | null; content: string }>,
): string {
  if (directives.length === 0) return "none";
  return directives.map((directive) => `${directive.source}:${directive.userAgent ?? "all"}=${directive.content}`).join("; ");
}

function parseRobots(body: string): RobotsRule[] {
  const groups: RobotsRule[] = [];
  let current: RobotsRule | null = null;
  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    if (!line) {
      current = null;
      continue;
    }
    const separatorIndex = line.indexOf(":");
    if (separatorIndex < 0) continue;
    const key = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = line.slice(separatorIndex + 1).trim();
    if (key === "user-agent") {
      if (!current || current.rules.length > 0) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(normalizeRobotAgentToken(value));
    } else if ((key === "allow" || key === "disallow") && current) {
      current.rules.push({ directive: key, path: value });
    }
  }
  return groups;
}

function isRobotAllowed(groups: RobotsRule[], userAgent: string, path: string): boolean {
  if (groups.length === 0) return true;
  const rules = matchingRobotsRules(groups, userAgent);
  if (rules.length === 0) return true;
  const matchedRules = rules
    .filter((rule) => robotsPathMatches(rule.path, path))
    .sort((a, b) => b.path.length - a.path.length);
  const strongest = matchedRules[0];
  if (!strongest) return true;
  if (strongest.directive === "allow") return true;
  const sameLengthAllow = matchedRules.find((rule) => rule.directive === "allow" && rule.path.length === strongest.path.length);
  return Boolean(sameLengthAllow);
}

function matchingRobotsRules(
  groups: RobotsRule[],
  userAgent: string,
): Array<{ directive: "allow" | "disallow"; path: string }> {
  const normalizedAgent = normalizeRobotAgentToken(userAgent);
  const matches = groups.flatMap((group) => {
    const matchingAgents = group.agents.filter((agent) => robotAgentMatches(agent, normalizedAgent));
    if (matchingAgents.length === 0) return [];
    const specificity = Math.max(...matchingAgents.map((agent) => (agent === "*" ? 0 : normalizeRobotAgentToken(agent).length)));
    return [{ group, specificity }];
  });
  if (matches.length === 0) return [];
  const strongestSpecificity = Math.max(...matches.map((match) => match.specificity));
  return matches
    .filter((match) => match.specificity === strongestSpecificity)
    .flatMap((match) => match.group.rules);
}

function robotAgentMatches(agent: string, normalizedAgent: string): boolean {
  const normalizedRuleAgent = normalizeRobotAgentToken(agent);
  return normalizedRuleAgent === "*" || normalizedAgent === normalizedRuleAgent;
}

function normalizeRobotAgentToken(agent: string): string {
  const trimmed = agent.toLowerCase().trim();
  if (trimmed === "*") return "*";
  return trimmed.replace(/\*+$/g, "").split("/")[0] ?? "";
}

function robotsPathMatches(rulePath: string, path: string): boolean {
  if (!rulePath) return false;
  const endAnchored = rulePath.endsWith("$");
  const rawPattern = endAnchored ? rulePath.slice(0, -1) : rulePath;
  const escaped = rawPattern
    .split("*")
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${escaped}${endAnchored ? "$" : ""}`).test(path);
}

function robotsPathForUrl(value: string): string {
  const url = new URL(value);
  return `${url.pathname || "/"}${url.search}`;
}

function selectChecks(input: unknown): { checks: string[]; ignored: string[] } {
  const requested = Array.isArray(input) ? input.filter((check): check is string => typeof check === "string") : [];
  if (requested.length === 0) return { checks: [...DEFAULT_CHECKS], ignored: [] };
  const valid = requested.filter((check) => DEFAULT_CHECKS.includes(check as (typeof DEFAULT_CHECKS)[number]));
  const ignored = requested.filter((check) => !DEFAULT_CHECKS.includes(check as (typeof DEFAULT_CHECKS)[number]));
  return { checks: valid.length > 0 ? valid : [...DEFAULT_CHECKS], ignored };
}

function validatePack(pack: Record<string, unknown>): { error: string; details?: unknown } | null {
  const url = typeof pack.url === "string" ? pack.url : "";
  if (!normalizeUrl(url)) return { error: "pack url must be a valid public http(s) URL" };
  if (!Array.isArray(pack.checks)) return { error: "pack checks must be an array" };
  const invalidChecks = pack.checks.filter((check) => typeof check !== "string" || !DEFAULT_CHECKS.includes(check as (typeof DEFAULT_CHECKS)[number]));
  if (invalidChecks.length > 0) {
    return { error: "pack contains unsupported SEOPass check id(s)", details: invalidChecks };
  }
  return null;
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
