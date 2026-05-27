import {
  SeoPassCheckIdSchema,
  SeoPassReportSchema,
  type SeoPassCheckId,
  type SeoPassCheckResult,
  type SeoPassCheckVerdict,
  type SeoPassCrossPassSignal,
  type SeoPassEvidence,
  type SeoPassFinding,
  type SeoPassFixPrompt,
  type SeoPassReport,
  type SeoPassReportVerdict,
  type SeoPassSeverity,
} from "./schema.js";

export type SeoPassFetchResult = {
  url: string;
  status: number;
  headers: Record<string, string>;
  body: string;
  elapsed_ms: number;
  error?: string;
};

export type SeoPassFetcher = (
  url: string,
  init?: { method?: "GET"; headers?: Record<string, string> },
) => Promise<SeoPassFetchResult>;

export type RunSeoPassInput = {
  targetUrl: string;
  generatedAt?: string;
  runId?: string;
  checks?: readonly (SeoPassCheckId | string)[];
  maxInternalLinksToProbe?: number;
  requestTimeoutMs?: number;
  maxBodyChars?: number;
  fetcher?: SeoPassFetcher;
};

type HtmlSignals = {
  title: string | null;
  description: string | null;
  viewport: string | null;
  robotsMeta: string | null;
  robotsDirectives: RobotsDirective[];
  canonical: string | null;
  canonicalLinks: Array<{ href: string | null; inHead: boolean }>;
  ogTitle: string | null;
  ogDescription: string | null;
  headings: Array<{ level: number; text: string }>;
  h1Count: number;
  links: Array<{ href: string; text: string; rel: string }>;
  jsonLdBlocks: Array<{ raw: string; parsed?: unknown; error?: string }>;
  microdataCount: number;
  microdataTypes: string[];
  rdfaCount: number;
  rdfaTypes: string[];
  imageCount: number;
  imagesWithoutAlt: number;
  scriptCount: number;
  externalLinks: number;
  wordCount: number;
  questionHeadingCount: number;
  statisticCount: number;
  dateSignals: number;
  bylineSignals: number;
};

type RobotsRule = {
  agents: string[];
  rules: Array<{ directive: "allow" | "disallow"; path: string }>;
};

type RobotsDirective = {
  source: "meta" | "x-robots-tag";
  userAgent: string | null;
  content: string;
};

const DEFAULT_CHECKS: SeoPassCheckId[] = [
  "lighthouse-performance",
  "crawlability",
  "metadata",
  "structured-data",
  "indexability",
  "canonical-signals",
  "internal-links",
  "core-web-vitals",
  "ai-overview-readiness",
];

const USER_AGENT = "UnClick-SEOPass/0.1 (+https://unclick.world)";
const DEFAULT_REQUEST_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_BODY_CHARS = 1_500_000;

export async function runSeoPass(input: RunSeoPassInput): Promise<SeoPassReport> {
  const targetUrl = normalizeUrl(input.targetUrl);
  const fetcher = input.fetcher ?? createDefaultFetcher({
    requestTimeoutMs: input.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS,
    maxBodyChars: input.maxBodyChars ?? DEFAULT_MAX_BODY_CHARS,
  });
  const checkSelection = normalizeCheckSelection(input.checks);
  const selectedChecks = new Set(checkSelection.valid);
  const runId = input.runId ?? `seopass-${stableRunSuffix(targetUrl, input.generatedAt)}`;

  const page = await fetcher(targetUrl);
  const robotsUrl = new URL("/robots.txt", targetUrl).toString();
  const sitemapUrl = new URL("/sitemap.xml", targetUrl).toString();
  const llmsUrl = new URL("/llms.txt", targetUrl).toString();
  const [robots, sitemap, llms] = await Promise.all([
    fetcher(robotsUrl),
    fetcher(sitemapUrl),
    fetcher(llmsUrl),
  ]);

  const html = page.body;
  const signals = analyzeHtml(html, targetUrl);
  const probedLinks = await probeInternalLinks({
    baseUrl: targetUrl,
    links: signals.links,
    fetcher,
    limit: input.maxInternalLinksToProbe ?? 3,
  });

  const context = {
    targetUrl,
    page,
    robots,
    sitemap,
    llms,
    signals,
    probedLinks,
  };

  const checkResults = DEFAULT_CHECKS.filter((check) => selectedChecks.has(check)).map((check) =>
    runCheck(check, context),
  );

  const score = weightedAverage(checkResults);
  const verdict = reportVerdict(score, checkResults);
  const crossPassSignals = buildCrossPassSignals(checkResults);
  const fixPrompts = checkResults.flatMap((check) =>
    check.findings.flatMap((finding) => (finding.fix_prompt ? [finding.fix_prompt] : [])),
  );

  return SeoPassReportSchema.parse({
    run_id: runId,
    target_url: targetUrl,
    generated_at: input.generatedAt ?? new Date().toISOString(),
    mode: "live-readonly",
    search_engine_readiness_score: score,
    verdict,
    checks: checkResults,
    scanner_source: {
      kind: "seopass-runner",
      mode: "live-readonly",
      target_url: targetUrl,
      shared_check_ids: [
        "schema-org-citation-grade",
        "brand-mention-readiness",
        "aggregate-ai-engine-readiness",
        "ai-bot-crawlability",
      ],
      source_urls: [targetUrl, robotsUrl, sitemapUrl, llmsUrl],
    },
    cross_pass_signals: crossPassSignals,
    fix_prompts: fixPrompts,
    summary: `SEOPass ran ${checkResults.length} read-only checks and returned ${verdict} at ${score}/100.`,
    notes: [
      "SEOPass v1 performs public, read-only evidence collection. It does not use credentials, mutate sites, submit URLs, or guarantee rankings.",
      "Core Web Vitals and Lighthouse checks use deterministic readiness proxies until the heavier Lighthouse runner is wired into the shared crawler.",
      ...(
        checkSelection.invalid.length > 0
          ? [`Ignored unsupported SEOPass check id(s): ${checkSelection.invalid.join(", ")}.`]
          : []
      ),
    ],
  });
}

function createDefaultFetcher(options: {
  requestTimeoutMs: number;
  maxBodyChars: number;
}): SeoPassFetcher {
  return async (
    url: string,
    init: { method?: "GET"; headers?: Record<string, string> } = {},
  ): Promise<SeoPassFetchResult> => {
    const started = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Math.max(1, options.requestTimeoutMs));
    try {
      const res = await fetch(url, {
        method: init.method ?? "GET",
        headers: {
          "user-agent": USER_AGENT,
          accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.8",
          ...init.headers,
        },
        redirect: "follow",
        signal: controller.signal,
      });
      const text = await res.text();
      const truncated = text.length > options.maxBodyChars;
      return {
        url: res.url || url,
        status: res.status,
        headers: {
          ...Object.fromEntries(res.headers.entries()),
          ...(truncated ? { "x-seopass-body-truncated": "true" } : {}),
        },
        body: truncated ? text.slice(0, options.maxBodyChars) : text,
        elapsed_ms: Date.now() - started,
      };
    } catch (err) {
      const message =
        err instanceof Error && err.name === "AbortError"
          ? `Request timed out after ${options.requestTimeoutMs}ms`
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
  };
}

function runCheck(
  checkId: SeoPassCheckId,
  context: {
    targetUrl: string;
    page: SeoPassFetchResult;
    robots: SeoPassFetchResult;
    sitemap: SeoPassFetchResult;
    llms: SeoPassFetchResult;
    signals: HtmlSignals;
    probedLinks: SeoPassFetchResult[];
  },
): SeoPassCheckResult {
  switch (checkId) {
    case "lighthouse-performance":
      return performanceCheck(context);
    case "crawlability":
      return crawlabilityCheck(context);
    case "metadata":
      return metadataCheck(context);
    case "structured-data":
      return structuredDataCheck(context);
    case "indexability":
      return indexabilityCheck(context);
    case "canonical-signals":
      return canonicalSignalsCheck(context);
    case "internal-links":
      return internalLinksCheck(context);
    case "core-web-vitals":
      return coreWebVitalsCheck(context);
    case "ai-overview-readiness":
      return aiOverviewReadinessCheck(context);
  }
}

function crawlabilityCheck(context: {
  targetUrl: string;
  page: SeoPassFetchResult;
  robots: SeoPassFetchResult;
}): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  const robotsRules = parseRobots(context.robots.body);
  const targetPath = robotsPathForUrl(context.targetUrl);
  const googleAllowed = isRobotAllowed(robotsRules, "Googlebot", targetPath);
  const bingAllowed = isRobotAllowed(robotsRules, "Bingbot", targetPath);
  const aiBots = ["GPTBot", "ClaudeBot", "PerplexityBot"].map((bot) => ({
    bot,
    allowed: isRobotAllowed(robotsRules, bot, targetPath),
  }));

  if (context.page.error || context.page.status < 200 || context.page.status >= 400) {
    findings.push(
      finding({
        id: "crawlability-http-unreachable",
        check_id: "crawlability",
        severity: "critical",
        title: "Target URL was not fetchable",
        summary: `The public read-only fetch returned ${context.page.error ?? `HTTP ${context.page.status}`}.`,
        evidence: [httpEvidence(context.page, "Target URL")],
        recommendation: "Make the public URL return a stable 2xx HTML response before relying on search or AI crawlers.",
      }),
    );
  }

  const contentType = context.page.headers["content-type"] ?? "";
  if (
    context.page.status >= 200 &&
    context.page.status < 400 &&
    contentType &&
    !/\b(?:text\/html|application\/xhtml\+xml)\b/i.test(contentType)
  ) {
    findings.push(
      finding({
        id: "crawlability-non-html-response",
        check_id: "crawlability",
        severity: "high",
        title: "Target URL did not return HTML",
        summary: `The target returned content-type '${contentType}', so search snippet and schema extraction may be invalid.`,
        evidence: [httpEvidence(context.page, "Target URL")],
        recommendation: "Point SEOPass at the canonical public HTML URL for the page.",
      }),
    );
  }

  if (context.robots.status === 0 || context.robots.status >= 500) {
    findings.push(
      finding({
        id: "crawlability-robots-unreachable",
        check_id: "crawlability",
        severity: "medium",
        title: "robots.txt could not be checked",
        summary: "SEOPass could not fetch robots.txt, so crawler access could not be proven.",
        evidence: [httpEvidence(context.robots, "robots.txt")],
        recommendation: "Publish a readable robots.txt with explicit Googlebot and Bingbot policy.",
      }),
    );
  }

  if (!googleAllowed || !bingAllowed) {
    findings.push(
      finding({
        id: "crawlability-search-bot-blocked",
        check_id: "crawlability",
        severity: "critical",
        title: "A major search crawler appears blocked",
        summary: `Googlebot allowed: ${googleAllowed ? "yes" : "no"}; Bingbot allowed: ${bingAllowed ? "yes" : "no"}.`,
        evidence: [robotsEvidence(context.robots, "Search bot policy")],
        recommendation: "Review robots.txt before launch. SEOPass does not override robots rules.",
      }),
    );
  }

  if (aiBots.some((entry) => !entry.allowed)) {
    const blocked = aiBots.filter((entry) => !entry.allowed).map((entry) => entry.bot).join(", ");
    findings.push(
      finding({
        id: "crawlability-ai-bot-limited",
        check_id: "crawlability",
        severity: "low",
        title: "Some AI crawlers appear blocked",
        summary: `${blocked} appears blocked for the target path. This is not automatically wrong, but it affects GEOPass readiness.`,
        evidence: [robotsEvidence(context.robots, "AI bot policy")],
        recommendation: "Confirm that AI crawler policy matches the site's distribution strategy.",
      }),
    );
  }

  return resultFromFindings({
    check_id: "crawlability",
    label: "Crawler access",
    findings,
    evidence: [httpEvidence(context.page, "Target URL"), robotsEvidence(context.robots, "robots.txt")],
    comments: [
      `Googlebot allowed: ${googleAllowed ? "yes" : "no"}. Bingbot allowed: ${bingAllowed ? "yes" : "no"}.`,
      `AI bot sample: ${aiBots.map((entry) => `${entry.bot}=${entry.allowed ? "allow" : "block"}`).join(", ")}.`,
    ],
  });
}

function indexabilityCheck(context: {
  targetUrl: string;
  page: SeoPassFetchResult;
  robots: SeoPassFetchResult;
  sitemap: SeoPassFetchResult;
  signals: HtmlSignals;
}): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  const searchDirectives = searchRobotsDirectives(
    context.signals.robotsDirectives,
    context.page.headers["x-robots-tag"] ?? "",
  );
  const noindex = hasNoindexDirective(searchDirectives);
  const sitemapUrls = extractSitemapUrls(context.sitemap.body);
  const robotsSitemapUrls = extractRobotsSitemapUrls(context.robots.body);
  const sitemapFetchUsable = context.sitemap.status < 400 && sitemapUrls.length > 0;

  if (noindex) {
    findings.push(
      finding({
        id: "indexability-noindex",
        check_id: "indexability",
        severity: "critical",
        title: "Page is marked noindex",
        summary: "A robots meta tag or X-Robots-Tag header tells search engines not to index this URL.",
        evidence: [
          {
            kind: "html-head",
            label: "Robots directive",
            source_url: context.targetUrl,
            summary: formatRobotsDirectives(searchDirectives),
          },
        ],
        recommendation: "Remove noindex only if this page is intended to appear in search.",
      }),
    );
  }

  if (!sitemapFetchUsable && robotsSitemapUrls.length === 0) {
    findings.push(
      finding({
        id: "indexability-sitemap-missing",
        check_id: "indexability",
        severity: "medium",
        title: "Sitemap URL list was not found",
        summary: "SEOPass did not find a usable /sitemap.xml URL list.",
        evidence: [httpEvidence(context.sitemap, "sitemap.xml")],
        recommendation: "Publish a sitemap or sitemap index so search crawlers can discover public pages efficiently.",
      }),
    );
  }

  return resultFromFindings({
    check_id: "indexability",
    label: "Indexability",
    findings,
    evidence: [
      {
        kind: "sitemap",
        label: "Sitemap URL count",
        source_url: new URL("/sitemap.xml", context.targetUrl).toString(),
        summary: `${sitemapUrls.length} URL(s) found in the sitemap sample.`,
      },
      {
        kind: "robots-txt",
        label: "robots.txt Sitemap directives",
        source_url: context.robots.url,
        summary: `${robotsSitemapUrls.length} Sitemap directive(s) found in robots.txt.`,
      },
    ],
    comments: [
      `Noindex detected: ${noindex ? "yes" : "no"}. Sitemap URLs found: ${sitemapUrls.length}; robots.txt Sitemap directives found: ${robotsSitemapUrls.length}.`,
      `Robots directives checked: ${formatRobotsDirectives(searchDirectives)}.`,
    ],
  });
}

function metadataCheck(context: { targetUrl: string; signals: HtmlSignals }): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  if (!context.signals.title) {
    findings.push(
      metadataFinding("metadata-title-missing", "high", "Page title is missing", "Add a unique, descriptive title element."),
    );
  } else if (context.signals.title.length < 20 || context.signals.title.length > 70) {
    findings.push(
      metadataFinding(
        "metadata-title-length",
        "medium",
        "Page title length is outside the recommended range",
        "Rewrite the title so the primary offer, brand, and search intent fit in roughly 20 to 70 characters.",
      ),
    );
  }

  if (!context.signals.description) {
    findings.push(
      metadataFinding(
        "metadata-description-missing",
        "high",
        "Meta description is missing",
        "Add a clear meta description that explains the page in plain language.",
      ),
    );
  } else if (context.signals.description.length < 50 || context.signals.description.length > 170) {
    findings.push(
      metadataFinding(
        "metadata-description-length",
        "low",
        "Meta description length may truncate or under-explain the page",
        "Tune the description to roughly 50 to 170 characters.",
      ),
    );
  }

  if (!context.signals.viewport) {
    findings.push(
      metadataFinding("metadata-viewport-missing", "high", "Mobile viewport is missing", "Add a responsive viewport meta tag."),
    );
  }

  if (context.signals.h1Count === 0) {
    findings.push(
      metadataFinding("metadata-h1-missing", "medium", "Primary H1 heading is missing", "Add one clear H1 that matches the page intent."),
    );
  } else if (context.signals.h1Count > 1) {
    findings.push(
      metadataFinding("metadata-h1-duplicate", "low", "Multiple H1 headings were found", "Confirm the page has one primary H1 and use lower-level headings for sections."),
    );
  }

  if (!context.signals.ogTitle || !context.signals.ogDescription) {
    findings.push(
      metadataFinding(
        "metadata-social-summary-incomplete",
        "low",
        "Social summary tags are incomplete",
        "Add Open Graph title and description so link previews carry the same message as search snippets.",
      ),
    );
  }

  return resultFromFindings({
    check_id: "metadata",
    label: "Metadata and snippets",
    findings,
    evidence: [
      {
        kind: "html-head",
        label: "Head metadata",
        source_url: context.targetUrl,
        summary: `title=${context.signals.title ? context.signals.title.length : 0} chars; description=${context.signals.description ? context.signals.description.length : 0} chars; viewport=${context.signals.viewport ? "yes" : "no"}; h1=${context.signals.h1Count}.`,
      },
    ],
  });
}

function canonicalSignalsCheck(context: { targetUrl: string; signals: HtmlSignals }): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  const canonicalLinks = context.signals.canonicalLinks;
  const headCanonicalLinks = canonicalLinks.filter((link) => link.inHead);
  const canonical = headCanonicalLinks.find((link) => link.href)?.href ?? canonicalLinks.find((link) => link.href)?.href ?? null;

  if (canonicalLinks.length === 0) {
    findings.push(
      finding({
        id: "canonical-missing",
        check_id: "canonical-signals",
        severity: "medium",
        title: "Canonical link is missing",
        summary: "No rel=canonical link was found in the page head.",
        evidence: [headEvidence(context.targetUrl, "Canonical tag", "No canonical URL found.")],
        recommendation: "Add a canonical URL to reduce duplicate URL ambiguity.",
      }),
    );
  } else {
    if (canonicalLinks.some((link) => !link.inHead)) {
      findings.push(
        finding({
          id: "canonical-outside-head",
          check_id: "canonical-signals",
          severity: "medium",
          title: "Canonical link appears outside the head",
          summary: "At least one rel=canonical link appears outside the HTML head, where search engines may ignore it.",
          evidence: [headEvidence(context.targetUrl, "Canonical placement", formatCanonicalLinks(canonicalLinks))],
          recommendation: "Keep one canonical link in the HTML head.",
        }),
      );
    }

    if (canonicalLinks.length > 1) {
      findings.push(
        finding({
          id: "canonical-multiple",
          check_id: "canonical-signals",
          severity: "medium",
          title: "Multiple canonical links were found",
          summary: `${canonicalLinks.length} rel=canonical links were found, which can create ambiguous canonical signals.`,
          evidence: [headEvidence(context.targetUrl, "Canonical links", formatCanonicalLinks(canonicalLinks))],
          recommendation: "Emit exactly one canonical URL for the page unless a deliberate HTTP canonical header strategy is used.",
        }),
      );
    }

    if (!canonical) {
      findings.push(
        finding({
          id: "canonical-empty",
          check_id: "canonical-signals",
          severity: "high",
          title: "Canonical href is empty",
          summary: "A rel=canonical link was found, but SEOPass could not read a usable href value.",
          evidence: [headEvidence(context.targetUrl, "Canonical tag", formatCanonicalLinks(canonicalLinks))],
          recommendation: "Set the canonical href to the absolute public URL for this page.",
        }),
      );
    } else {
      const parsed = safeUrl(canonical, context.targetUrl);
      if (!isAbsoluteHttpUrl(canonical)) {
        findings.push(
          finding({
            id: "canonical-relative-url",
            check_id: "canonical-signals",
            severity: "low",
            title: "Canonical URL is relative",
            summary: "The canonical href is relative. Google supports relative canonicals, but recommends absolute URLs to avoid long-term ambiguity.",
            evidence: [headEvidence(context.targetUrl, "Canonical tag", canonical)],
            recommendation: "Use the absolute canonical URL, including protocol and host.",
          }),
        );
      }

      if (!parsed) {
        findings.push(
          finding({
            id: "canonical-invalid",
            check_id: "canonical-signals",
            severity: "high",
            title: "Canonical URL is invalid",
            summary: `The canonical value could not be parsed: ${canonical}`,
            evidence: [headEvidence(context.targetUrl, "Canonical tag", canonical)],
            recommendation: "Use an absolute canonical URL.",
          }),
        );
      } else if (parsed.origin !== new URL(context.targetUrl).origin) {
        findings.push(
          finding({
            id: "canonical-cross-origin",
            check_id: "canonical-signals",
            severity: "medium",
            title: "Canonical points to another origin",
            summary: `Canonical points to ${parsed.origin}, not the scanned site origin.`,
            evidence: [headEvidence(context.targetUrl, "Canonical tag", parsed.toString())],
            recommendation: "Confirm the cross-origin canonical is intentional.",
          }),
        );
      }
    }
  }

  return resultFromFindings({
    check_id: "canonical-signals",
    label: "Canonical signals",
    findings,
    evidence: [headEvidence(context.targetUrl, "Canonical tag", formatCanonicalLinks(canonicalLinks) || "missing")],
  });
}

function structuredDataCheck(context: { targetUrl: string; signals: HtmlSignals }): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  const parsedBlocks = context.signals.jsonLdBlocks.filter((block) => block.parsed !== undefined);
  const parseErrors = context.signals.jsonLdBlocks.filter((block) => block.error);
  const nonJsonLdTypes = new Set([...context.signals.microdataTypes, ...context.signals.rdfaTypes]);
  const schemaTypes = new Set([
    ...parsedBlocks.flatMap((block) => schemaTypesFromJsonLd(block.parsed)),
    ...nonJsonLdTypes,
  ]);
  const hasStructuredData = parsedBlocks.length > 0 || context.signals.microdataCount > 0 || context.signals.rdfaCount > 0;

  for (const error of parseErrors) {
    findings.push(
      finding({
        id: "structured-data-jsonld-invalid",
        check_id: "structured-data",
        severity: "high",
        title: "JSON-LD could not be parsed",
        summary: error.error ?? "A JSON-LD block failed parsing.",
        evidence: [schemaEvidence(context.targetUrl, "JSON-LD parse error", error.raw.slice(0, 160))],
        recommendation: "Validate JSON-LD before shipping so search engines and AI agents can trust the entity graph.",
      }),
    );
  }

  if (!hasStructuredData) {
    findings.push(
      finding({
        id: "structured-data-missing",
        check_id: "structured-data",
        severity: "medium",
        title: "Structured data is missing",
        summary: "No parseable JSON-LD, Microdata, or RDFa structured data was found.",
        evidence: [schemaEvidence(context.targetUrl, "Structured-data formats", "0 JSON-LD blocks; 0 Microdata items; 0 RDFa items.")],
        recommendation: "Add Organization or WebSite schema at minimum, then page-specific schema where useful.",
      }),
    );
  }

  if (parsedBlocks.length === 0 && hasStructuredData) {
    findings.push(
      finding({
        id: "structured-data-jsonld-recommended",
        check_id: "structured-data",
        severity: "low",
        title: "Structured data uses non-JSON-LD markup",
        summary: "Microdata or RDFa was detected. Google supports it, but JSON-LD is usually easier to maintain and validate.",
        evidence: [
          schemaEvidence(
            context.targetUrl,
            "Structured-data formats",
            `${context.signals.microdataCount} Microdata item(s); ${context.signals.rdfaCount} RDFa item(s).`,
          ),
        ],
        recommendation: "Keep the existing valid markup if it is deliberate, or migrate durable entity data to JSON-LD for maintainability.",
      }),
    );
  }

  if (hasStructuredData && !hasAny(schemaTypes, ["Organization", "WebSite", "SoftwareApplication", "LocalBusiness"])) {
    findings.push(
      finding({
        id: "structured-data-entity-graph-thin",
        check_id: "structured-data",
        severity: "medium",
        title: "Entity graph is thin",
        summary: `Found schema types: ${Array.from(schemaTypes).join(", ") || "none"}, but no Organization/WebSite-level entity anchor.`,
        evidence: [schemaEvidence(context.targetUrl, "Schema types", Array.from(schemaTypes).join(", ") || "none")],
        recommendation: "Add an Organization or WebSite entity with sameAs links to help search and AI systems reconcile the brand.",
      }),
    );
  }

  return resultFromFindings({
    check_id: "structured-data",
    label: "Structured data",
    findings,
    evidence: [
      schemaEvidence(
        context.targetUrl,
        "Schema inventory",
        `${parsedBlocks.length} parseable JSON-LD block(s); ${context.signals.microdataCount} Microdata item(s); ${context.signals.rdfaCount} RDFa item(s); types=${Array.from(schemaTypes).join(", ") || "none"}.`,
      ),
    ],
    comments: [
      `Schema types: ${Array.from(schemaTypes).join(", ") || "none"}.`,
      `Structured-data formats: JSON-LD=${parsedBlocks.length}; Microdata=${context.signals.microdataCount}; RDFa=${context.signals.rdfaCount}.`,
    ],
  });
}

function internalLinksCheck(context: {
  targetUrl: string;
  signals: HtmlSignals;
  probedLinks: SeoPassFetchResult[];
}): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  const origin = new URL(context.targetUrl).origin;
  const internalLinks = uniqueUrls(
      context.signals.links
        .map((link) => safeUrl(link.href, context.targetUrl))
        .filter((url): url is URL => url !== null && url.origin === origin)
        .map((url) => url.toString()),
  );
  const brokenLinks = context.probedLinks.filter((link) => link.status >= 400 || link.status === 0);

  if (internalLinks.length < 3) {
    findings.push(
      finding({
        id: "internal-links-too-few",
        check_id: "internal-links",
        severity: "medium",
        title: "Internal link graph looks thin",
        summary: `Only ${internalLinks.length} unique same-origin link(s) were found on the page.`,
        evidence: [internalLinkEvidence(context.targetUrl, "Internal links", `${internalLinks.length} unique same-origin link(s).`)],
        recommendation: "Add clear internal paths to related pages, docs, pricing, case studies, or next steps.",
      }),
    );
  }

  if (brokenLinks.length > 0) {
    findings.push(
      finding({
        id: "internal-links-broken",
        check_id: "internal-links",
        severity: "high",
        title: "Some sampled internal links failed",
        summary: `${brokenLinks.length} sampled internal link(s) returned errors.`,
        evidence: brokenLinks.slice(0, 3).map((link) => httpEvidence(link, "Sampled internal link")),
        recommendation: "Fix broken internal links before using SEOPass as release evidence.",
      }),
    );
  }

  return resultFromFindings({
    check_id: "internal-links",
    label: "Internal links",
    findings,
    evidence: [internalLinkEvidence(context.targetUrl, "Internal link sample", `${internalLinks.length} unique internal link(s); ${brokenLinks.length} sampled broken.`)],
    comments: [`Probed ${context.probedLinks.length} internal link(s).`],
  });
}

function performanceCheck(context: { targetUrl: string; page: SeoPassFetchResult; signals: HtmlSignals }): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  const htmlBytes = byteLength(context.page.body);

  if (context.page.elapsed_ms > 2500) {
    findings.push(
      finding({
        id: "performance-response-slow",
        check_id: "lighthouse-performance",
        severity: "medium",
        title: "Initial HTML response is slow",
        summary: `The read-only fetch took ${context.page.elapsed_ms}ms.`,
        evidence: [httpEvidence(context.page, "Target URL")],
        recommendation: "Investigate server response time and render-blocking work before relying on this page for search acquisition.",
      }),
    );
  }

  if (htmlBytes > 500_000) {
    findings.push(
      finding({
        id: "performance-html-heavy",
        check_id: "lighthouse-performance",
        severity: "medium",
        title: "HTML payload is heavy",
        summary: `The HTML payload is ${htmlBytes} bytes.`,
        evidence: [pageEvidence(context.targetUrl, "HTML size", `${htmlBytes} bytes.`)],
        recommendation: "Reduce inlined data and scripts. Heavy first responses hurt crawlers and mobile users.",
      }),
    );
  }

  if (context.page.headers["x-seopass-body-truncated"] === "true") {
    findings.push(
      finding({
        id: "performance-html-truncated",
        check_id: "lighthouse-performance",
        severity: "medium",
        title: "HTML snapshot exceeded the SEOPass body cap",
        summary: "SEOPass truncated the public HTML snapshot before analysis to keep the run bounded.",
        evidence: [pageEvidence(context.targetUrl, "HTML cap", `${htmlBytes} bytes retained for analysis.`)],
        recommendation: "Reduce oversized inline HTML/data or run the deeper crawler lane with an explicit larger cap.",
      }),
    );
  }

  if (context.signals.scriptCount > 40) {
    findings.push(
      finding({
        id: "performance-script-heavy",
        check_id: "lighthouse-performance",
        severity: "low",
        title: "Script count is high",
        summary: `${context.signals.scriptCount} script tags were found in the HTML.`,
        evidence: [pageEvidence(context.targetUrl, "Script count", `${context.signals.scriptCount} script tag(s).`)],
        recommendation: "Review script loading and defer non-critical scripts.",
      }),
    );
  }

  return resultFromFindings({
    check_id: "lighthouse-performance",
    label: "Performance readiness",
    findings,
    evidence: [
      httpEvidence(context.page, "Target URL"),
      pageEvidence(context.targetUrl, "Performance proxy", `${htmlBytes} HTML bytes; ${context.signals.scriptCount} script tag(s).`),
    ],
    comments: ["This is a deterministic performance readiness proxy, not a Lighthouse score."],
  });
}

function coreWebVitalsCheck(context: { targetUrl: string; page: SeoPassFetchResult; signals: HtmlSignals }): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  if (!context.signals.viewport) {
    findings.push(
      finding({
        id: "cwv-mobile-viewport-missing",
        check_id: "core-web-vitals",
        severity: "high",
        title: "Mobile viewport is missing",
        summary: "Without a viewport tag, mobile-first indexing and Core Web Vitals readiness are weakened.",
        evidence: [headEvidence(context.targetUrl, "Viewport", "missing")],
        recommendation: "Add `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`.",
      }),
    );
  }

  if (context.signals.imageCount > 0 && context.signals.imagesWithoutAlt / context.signals.imageCount > 0.5) {
    findings.push(
      finding({
        id: "cwv-image-seo-alt-gaps",
        check_id: "core-web-vitals",
        severity: "low",
        title: "Most images lack alt text",
        summary: `${context.signals.imagesWithoutAlt}/${context.signals.imageCount} image tag(s) lack alt text.`,
        evidence: [pageEvidence(context.targetUrl, "Image alt inventory", `${context.signals.imagesWithoutAlt}/${context.signals.imageCount} missing alt.`)],
        recommendation: "Add useful alt text to meaningful images and empty alt to decorative images.",
      }),
    );
  }

  if (context.page.elapsed_ms > 1500) {
    findings.push(
      finding({
        id: "cwv-ttfb-proxy-warn",
        check_id: "core-web-vitals",
        severity: "medium",
        title: "TTFB readiness proxy is weak",
        summary: `The initial response took ${context.page.elapsed_ms}ms in this run.`,
        evidence: [httpEvidence(context.page, "Target URL")],
        recommendation: "Run full Lighthouse and reduce server/render delay for better Core Web Vitals confidence.",
      }),
    );
  }

  return resultFromFindings({
    check_id: "core-web-vitals",
    label: "Core Web Vitals readiness",
    findings,
    evidence: [pageEvidence(context.targetUrl, "CWV proxy", `viewport=${context.signals.viewport ? "yes" : "no"}; response=${context.page.elapsed_ms}ms.`)],
    comments: ["CWV readiness uses public HTML proxies in this package runner; full Lighthouse remains the heavier runner lane."],
  });
}

function aiOverviewReadinessCheck(context: {
  targetUrl: string;
  page: SeoPassFetchResult;
  llms: SeoPassFetchResult;
  signals: HtmlSignals;
}): SeoPassCheckResult {
  const findings: SeoPassFinding[] = [];
  const searchDirectives = searchRobotsDirectives(
    context.signals.robotsDirectives,
    context.page.headers["x-robots-tag"] ?? "",
  );
  const hasFaqSchema = context.signals.jsonLdBlocks.some((block) =>
    schemaTypesFromJsonLd(block.parsed).includes("FAQPage"),
  );
  const hasAuthorSignals = context.signals.bylineSignals > 0;
  const hasFreshnessSignals = context.signals.dateSignals > 0;
  const hasCitationSignals = context.signals.externalLinks >= 2 || context.signals.statisticCount >= 2;

  if (hasSnippetLimitingDirective(searchDirectives)) {
    findings.push(
      finding({
        id: "aio-preview-controls-limit-ai-features",
        check_id: "ai-overview-readiness",
        severity: "medium",
        title: "Search preview controls limit AI feature eligibility",
        summary: "A search robots directive such as nosnippet or max-snippet:0 can limit snippet use and AI Overview/AI Mode input.",
        evidence: [headEvidence(context.targetUrl, "Robots snippet controls", formatRobotsDirectives(searchDirectives))],
        recommendation: "Keep restrictive preview controls only when intentional. If AI-era discoverability matters, allow useful snippets without exposing private content.",
      }),
    );
  }

  if (!hasFaqSchema && context.signals.questionHeadingCount < 2) {
    findings.push(
      finding({
        id: "aio-faq-readiness-thin",
        check_id: "ai-overview-readiness",
        severity: "medium",
        title: "Question-answer structure is thin",
        summary: "SEOPass did not find FAQ schema or multiple question-style headings.",
        evidence: [pageEvidence(context.targetUrl, "Question structure", `${context.signals.questionHeadingCount} question-style heading(s); FAQ schema=${hasFaqSchema ? "yes" : "no"}.`)],
        recommendation: "Add clear question-led sections or FAQPage schema where it genuinely helps users.",
      }),
    );
  }

  if (!hasFaqSchema && context.signals.wordCount < 80) {
    findings.push(
      finding({
        id: "aio-content-depth-thin",
        check_id: "ai-overview-readiness",
        severity: "low",
        title: "Body copy is thin for answer extraction",
        summary: `SEOPass found roughly ${context.signals.wordCount} visible word(s) and no FAQ schema.`,
        evidence: [pageEvidence(context.targetUrl, "Visible text depth", `${context.signals.wordCount} visible word(s).`)],
        recommendation: "Add useful plain-HTML explanation, examples, or answer sections where the page is meant to satisfy search intent.",
      }),
    );
  }

  if (!hasAuthorSignals) {
    findings.push(
      finding({
        id: "aio-author-signals-thin",
        check_id: "ai-overview-readiness",
        severity: "low",
        title: "Author or ownership signals are thin",
        summary: "No obvious byline, author, or sameAs-style signal was detected in the page snapshot.",
        evidence: [pageEvidence(context.targetUrl, "E-E-A-T signals", "No obvious author or ownership signal found.")],
        recommendation: "Expose author, organization, and sameAs signals where they are truthful.",
      }),
    );
  }

  if (!hasFreshnessSignals) {
    findings.push(
      finding({
        id: "aio-freshness-missing",
        check_id: "ai-overview-readiness",
        severity: "low",
        title: "Freshness signal is missing",
        summary: "No obvious datePublished, dateModified, updated, or time element was detected.",
        evidence: [pageEvidence(context.targetUrl, "Freshness signals", "0 obvious freshness signal(s).")],
        recommendation: "Add truthful dateModified/datePublished signals to content that should be evaluated for freshness.",
      }),
    );
  }

  if (!hasCitationSignals) {
    findings.push(
      finding({
        id: "aio-citation-density-low",
        check_id: "ai-overview-readiness",
        severity: "low",
        title: "Citation and statistic density is low",
        summary: "SEOPass found few external citations or statistic-like facts in the page body.",
        evidence: [pageEvidence(context.targetUrl, "Citation readiness", `${context.signals.externalLinks} external link(s); ${context.signals.statisticCount} statistic-like sentence(s).`)],
        recommendation: "For citation-targeted pages, add original facts, sources, and statistics in plain HTML.",
      }),
    );
  }

  if (context.llms.status >= 400 || context.llms.body.trim().length === 0) {
    findings.push(
      finding({
        id: "aio-llms-txt-missing",
        check_id: "ai-overview-readiness",
        severity: "info",
        title: "llms.txt was not found",
        summary: "llms.txt is not a confirmed citation driver, but it can be useful future-proofing and direct agent context.",
        evidence: [httpEvidence(context.llms, "llms.txt")],
        recommendation: "Consider adding llms.txt as honest AI-agent hygiene. Do not market it as a ranking guarantee.",
      }),
    );
  }

  return resultFromFindings({
    check_id: "ai-overview-readiness",
    label: "AI-era search readiness",
    findings,
    evidence: [
      pageEvidence(
        context.targetUrl,
        "AI-era signals",
        `FAQ=${hasFaqSchema ? "yes" : "no"}; author=${hasAuthorSignals ? "yes" : "no"}; freshness=${hasFreshnessSignals ? "yes" : "no"}; citations=${hasCitationSignals ? "yes" : "no"}.`,
      ),
    ],
    comments: ["SEOPass scores AIO readiness as deterministic hygiene, not as a promise of AI Overview inclusion."],
  });
}

function resultFromFindings(input: {
  check_id: SeoPassCheckId;
  label: string;
  findings: SeoPassFinding[];
  evidence?: SeoPassEvidence[];
  comments?: string[];
}): SeoPassCheckResult {
  const severity = highestSeverity(input.findings);
  const verdict = verdictFromSeverity(severity);
  const score = scoreFromSeverity(severity, input.findings.length);
  const evidenceFindings =
    input.findings.length === 0 && input.evidence
      ? [
          {
            id: `${input.check_id}-passed`,
            check_id: input.check_id,
            severity: "info" as const,
            title: `${input.label} passed`,
            summary: "No blocking issue was found in this read-only check.",
            evidence: input.evidence,
          },
        ]
      : input.findings;

  return {
    check_id: input.check_id,
    label: input.label,
    score,
    verdict,
    findings: evidenceFindings,
    comments: input.comments ?? [],
  };
}

function finding(input: Omit<SeoPassFinding, "fix_prompt"> & { fix_prompt?: SeoPassFixPrompt }): SeoPassFinding {
  const prompt = input.fix_prompt ?? defaultFixPrompt(input);
  return { ...input, fix_prompt: prompt };
}

function defaultFixPrompt(input: Omit<SeoPassFinding, "fix_prompt">): SeoPassFixPrompt {
  return {
    title: `Fix SEOPass finding: ${input.title}`,
    frameworks: ["nextjs", "astro", "wordpress", "shopify", "webflow", "html"],
    prompt: [
      `Fix this SEOPass finding without making ranking guarantees: ${input.title}.`,
      `Finding id: ${input.id}. Check: ${input.check_id}. Severity: ${input.severity}.`,
      `Problem: ${input.summary}`,
      input.recommendation ? `Recommended direction: ${input.recommendation}` : "",
      "Implement the smallest framework-appropriate change, preserve existing product copy unless it is the issue, then rerun SEOPass.",
    ]
      .filter(Boolean)
      .join("\n"),
    acceptance: [
      "The page still renders publicly.",
      "The relevant SEOPass finding no longer appears.",
      "No claim promises a search ranking, AI Overview placement, or AI citation.",
    ],
  };
}

function metadataFinding(id: string, severity: SeoPassSeverity, title: string, recommendation: string): SeoPassFinding {
  return finding({
    id,
    check_id: "metadata",
    severity,
    title,
    summary: recommendation,
    evidence: [{ kind: "html-head", label: "Metadata", summary: recommendation }],
    recommendation,
  });
}

function normalizeCheckSelection(checks?: readonly (SeoPassCheckId | string)[]): {
  valid: SeoPassCheckId[];
  invalid: string[];
} {
  if (!checks) return { valid: DEFAULT_CHECKS, invalid: [] };
  const valid: SeoPassCheckId[] = [];
  const invalid: string[] = [];
  for (const check of checks) {
    const parsed = SeoPassCheckIdSchema.safeParse(check);
    if (parsed.success) {
      if (!valid.includes(parsed.data)) valid.push(parsed.data);
    } else {
      invalid.push(String(check));
    }
  }
  if (valid.length === 0) {
    throw new Error("At least one valid SEOPass check id is required.");
  }
  return { valid, invalid };
}

function weightedAverage(results: SeoPassCheckResult[]): number {
  if (results.length === 0) return 0;
  return Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length);
}

function reportVerdict(score: number, results: SeoPassCheckResult[]): SeoPassReportVerdict {
  if (results.some((result) => result.findings.some((finding) => finding.severity === "critical"))) return "blocked";
  if (score >= 85) return "ready";
  if (score >= 55) return "needs-work";
  return "blocked";
}

function buildCrossPassSignals(results: SeoPassCheckResult[]): SeoPassCrossPassSignal[] {
  const signals: SeoPassCrossPassSignal[] = [];
  for (const result of results) {
    if (result.check_id === "structured-data" && result.verdict !== "pass") {
      signals.push({
        pass: "geopass",
        signal: "schema-org-citation-grade",
        source_check_id: result.check_id,
        score: result.score,
        reason: "Weak structured data also reduces entity grounding for GEOPass.",
      });
    }
    if (result.check_id === "ai-overview-readiness" && result.verdict !== "pass") {
      signals.push({
        pass: "geopass",
        signal: "brand-mention-readiness",
        source_check_id: result.check_id,
        score: result.score,
        reason: "AI-era search gaps should be expanded into a GEOPass engine-readiness scan.",
      });
    }
    if (result.check_id === "crawlability" && result.findings.some((finding) => finding.id.includes("ai-bot"))) {
      signals.push({
        pass: "geopass",
        signal: "ai-bot-crawlability",
        source_check_id: result.check_id,
        score: result.score,
        reason: "AI crawler policy belongs in the shared SEOPass/GEOPass crawler-access matrix.",
      });
    }
  }
  return signals;
}

function highestSeverity(findings: SeoPassFinding[]): SeoPassSeverity | null {
  const order: SeoPassSeverity[] = ["critical", "high", "medium", "low", "info"];
  return order.find((severity) => findings.some((finding) => finding.severity === severity)) ?? null;
}

function verdictFromSeverity(severity: SeoPassSeverity | null): SeoPassCheckVerdict {
  if (severity === "critical" || severity === "high") return "fail";
  if (severity === "medium" || severity === "low" || severity === "info") return "warn";
  return "pass";
}

function scoreFromSeverity(severity: SeoPassSeverity | null, findingCount: number): number {
  if (!severity) return 100;
  const base = { critical: 10, high: 35, medium: 65, low: 82, info: 92 }[severity];
  return Math.max(0, base - Math.max(0, findingCount - 1) * 4);
}

function httpEvidence(result: SeoPassFetchResult, label: string): SeoPassEvidence {
  return {
    kind: "http-response",
    label,
    source_url: result.url,
    summary: result.error ? result.error : `HTTP ${result.status} in ${result.elapsed_ms}ms.`,
  };
}

function robotsEvidence(result: SeoPassFetchResult, label: string): SeoPassEvidence {
  return {
    kind: "robots-txt",
    label,
    source_url: result.url,
    summary: result.status >= 200 && result.status < 400 ? "robots.txt fetched and parsed." : `robots.txt returned HTTP ${result.status || 0}.`,
  };
}

function headEvidence(url: string, label: string, summary: string): SeoPassEvidence {
  return { kind: "html-head", label, source_url: url, summary };
}

function schemaEvidence(url: string, label: string, summary: string): SeoPassEvidence {
  return { kind: "structured-data", label, source_url: url, summary };
}

function internalLinkEvidence(url: string, label: string, summary: string): SeoPassEvidence {
  return { kind: "internal-link", label, source_url: url, summary };
}

function pageEvidence(url: string, label: string, summary: string): SeoPassEvidence {
  return { kind: "page-snapshot", label, source_url: url, summary };
}

function analyzeHtml(html: string, baseUrl: string): HtmlSignals {
  const text = stripTags(html);
  const headings = extractHeadings(html);
  const links = extractLinks(html, baseUrl);
  const imageTags = Array.from(html.matchAll(/<img\b[^>]*>/gi)).map((match) => match[0]);
  const microdataTags = Array.from(html.matchAll(/<[^>]+\b(?:itemscope|itemtype)\b[^>]*>/gi)).map((match) => match[0]);
  const rdfaTags = Array.from(html.matchAll(/<[^>]+\b(?:typeof|vocab)\s*=[^>]*>/gi)).map((match) => match[0]);
  const jsonLdBlocks = Array.from(html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)).map((match) => {
    const raw = decodeEntities(match[1]?.trim() ?? "");
    try {
      return { raw, parsed: JSON.parse(raw) };
    } catch (err) {
      return { raw, error: err instanceof Error ? err.message : String(err) };
    }
  });

  return {
    title: extractTitle(html),
    description: extractMeta(html, "name", "description"),
    viewport: extractMeta(html, "name", "viewport"),
    robotsMeta: extractMeta(html, "name", "robots"),
    robotsDirectives: extractRobotsMetaDirectives(html),
    canonical: extractLinkRel(html, "canonical"),
    canonicalLinks: extractCanonicalLinks(html),
    ogTitle: extractMeta(html, "property", "og:title"),
    ogDescription: extractMeta(html, "property", "og:description"),
    headings,
    h1Count: headings.filter((heading) => heading.level === 1).length,
    links,
    jsonLdBlocks,
    microdataCount: microdataTags.length,
    microdataTypes: uniqueStrings(microdataTags.flatMap((tag) => schemaTypesFromAttr(getAttr(tag, "itemtype")))),
    rdfaCount: rdfaTags.length,
    rdfaTypes: uniqueStrings(rdfaTags.flatMap((tag) => schemaTypesFromAttr(getAttr(tag, "typeof")))),
    imageCount: imageTags.length,
    imagesWithoutAlt: imageTags.filter((tag) => !/\salt\s*=/i.test(tag)).length,
    scriptCount: (html.match(/<script\b/gi) ?? []).length,
    externalLinks: links.filter((link) => {
      const url = safeUrl(link.href, baseUrl);
      return Boolean(url && url.origin !== new URL(baseUrl).origin);
    }).length,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    questionHeadingCount: headings.filter((heading) => /\?|\b(how|what|why|when|where|which|can|should)\b/i.test(heading.text)).length,
    statisticCount: (text.match(/\b\d+(?:\.\d+)?\s*(?:%|percent|x|times|users|customers|seconds|ms|days|weeks|months|years)\b/gi) ?? []).length,
    dateSignals: (html.match(/\b(datePublished|dateModified|updated_time|<time\b|last updated|updated on)\b/gi) ?? []).length,
    bylineSignals: (html.match(/\b(author|byline|rel=["']author|sameAs|Person)\b/gi) ?? []).length,
  };
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return cleanText(match?.[1] ?? "") || null;
}

function extractMeta(html: string, attr: "name" | "property", value: string): string | null {
  const tags = Array.from(html.matchAll(/<meta\b[^>]*>/gi)).map((match) => match[0]);
  for (const tag of tags) {
    if (getAttr(tag, attr)?.toLowerCase() === value.toLowerCase()) {
      return getAttr(tag, "content") ?? null;
    }
  }
  return null;
}

function extractRobotsMetaDirectives(html: string): RobotsDirective[] {
  return Array.from(html.matchAll(/<meta\b[^>]*>/gi))
    .map((match) => match[0])
    .flatMap((tag): RobotsDirective[] => {
      const name = getAttr(tag, "name")?.toLowerCase() ?? "";
      const content = getAttr(tag, "content")?.trim() ?? "";
      if (!content || !["robots", "googlebot", "googlebot-news", "bingbot"].includes(name)) return [];
      return [{ source: "meta", userAgent: name, content }];
    });
}

function extractLinkRel(html: string, rel: string): string | null {
  const tags = Array.from(html.matchAll(/<link\b[^>]*>/gi)).map((match) => match[0]);
  for (const tag of tags) {
    const relValue = getAttr(tag, "rel")?.toLowerCase() ?? "";
    if (relValue.split(/\s+/).includes(rel.toLowerCase())) return getAttr(tag, "href") ?? null;
  }
  return null;
}

function extractCanonicalLinks(html: string): Array<{ href: string | null; inHead: boolean }> {
  const headMatch = /<head\b[^>]*>[\s\S]*?<\/head>/i.exec(html);
  const headStart = headMatch?.index ?? -1;
  const headEnd = headStart >= 0 ? headStart + (headMatch?.[0].length ?? 0) : -1;
  return Array.from(html.matchAll(/<link\b[^>]*>/gi)).flatMap((match) => {
    const tag = match[0];
    const relValue = getAttr(tag, "rel")?.toLowerCase() ?? "";
    if (!relValue.split(/\s+/).includes("canonical")) return [];
    const tagIndex = match.index ?? -1;
    return [
      {
        href: getAttr(tag, "href")?.trim() || null,
        inHead: headStart >= 0 && tagIndex >= headStart && tagIndex < headEnd,
      },
    ];
  });
}

function formatCanonicalLinks(links: Array<{ href: string | null; inHead: boolean }>): string {
  return links
    .map((link) => `${link.inHead ? "head" : "body"}:${link.href ?? "missing-href"}`)
    .join("; ");
}

function extractLinks(html: string, baseUrl: string): Array<{ href: string; text: string; rel: string }> {
  return Array.from(html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)).flatMap((match) => {
    const attrs = match[1] ?? "";
    const href = getAttr(attrs, "href");
    if (!href) return [];
    const parsed = safeUrl(href, baseUrl);
    if (!parsed || !["http:", "https:"].includes(parsed.protocol)) return [];
    return [{ href: parsed.toString(), text: cleanText(match[2] ?? ""), rel: getAttr(attrs, "rel") ?? "" }];
  });
}

function extractHeadings(html: string): Array<{ level: number; text: string }> {
  return Array.from(html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)).map((match) => ({
    level: Number(match[1]),
    text: cleanText(match[2] ?? ""),
  }));
}

function schemaTypesFromAttr(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(/\s+/)
    .map((part) => normalizeSchemaType(part))
    .filter((type): type is string => Boolean(type));
}

function normalizeSchemaType(value: string): string | null {
  const cleaned = decodeEntities(value.trim()).replace(/^schema:/i, "");
  if (!cleaned) return null;
  const lastHash = cleaned.split("#").filter(Boolean).pop() ?? cleaned;
  const lastSlash = lastHash.split("/").filter(Boolean).pop() ?? lastHash;
  const compact = lastSlash.replace(/[^A-Za-z0-9_-]/g, "");
  return compact || null;
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function getAttr(tag: string, attr: string): string | null {
  const match = tag.match(new RegExp(`\\b${attr}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match?.[2] ? decodeEntities(match[2]) : null;
}

function stripTags(html: string): string {
  return cleanText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function cleanText(value: string): string {
  return decodeEntities(value.replace(/\s+/g, " ").trim());
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
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

function searchRobotsDirectives(metaDirectives: RobotsDirective[], xRobotsHeader: string): RobotsDirective[] {
  return [...metaDirectives, ...extractXRobotsDirectives(xRobotsHeader)].filter((directive) =>
    directiveAppliesToSearch(directive.userAgent),
  );
}

function extractXRobotsDirectives(header: string): RobotsDirective[] {
  if (!header.trim()) return [];
  const directives: RobotsDirective[] = [];
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

function isXRobotsAgentToken(value: string): boolean {
  if (!/^[a-z0-9*_.-]+$/i.test(value)) return false;
  return ![
    "noindex",
    "nofollow",
    "none",
    "nosnippet",
    "max-snippet",
    "max-image-preview",
    "max-video-preview",
    "notranslate",
    "noimageindex",
    "unavailable_after",
    "indexifembedded",
    "all",
  ].includes(value.toLowerCase());
}

function directiveAppliesToSearch(userAgent: string | null): boolean {
  if (!userAgent || userAgent === "*" || userAgent === "robots") return true;
  return ["googlebot", "bingbot"].includes(userAgent.toLowerCase());
}

function hasNoindexDirective(directives: RobotsDirective[]): boolean {
  return directives.some((directive) =>
    hasDirectiveToken(directive.content, "noindex") || hasDirectiveToken(directive.content, "none"),
  );
}

function hasSnippetLimitingDirective(directives: RobotsDirective[]): boolean {
  return directives.some((directive) =>
    hasDirectiveToken(directive.content, "nosnippet") || /\bmax-snippet\s*:\s*0(?:\D|$)/i.test(directive.content),
  );
}

function hasDirectiveToken(content: string, token: string): boolean {
  return new RegExp(`(?:^|[,\\s])${token}(?:[,\\s]|$)`, "i").test(content);
}

function formatRobotsDirectives(directives: RobotsDirective[]): string {
  if (directives.length === 0) return "none";
  return directives
    .map((directive) => `${directive.source}:${directive.userAgent ?? "all"}=${directive.content}`)
    .join("; ");
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
    const matchingAgents = group.agents.filter((agent) =>
      robotAgentMatches(agent, normalizedAgent),
    );
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

function robotsPathForUrl(value: string): string {
  const url = new URL(value);
  return `${url.pathname || "/"}${url.search}`;
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

function extractSitemapUrls(body: string): string[] {
  return Array.from(body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)).map((match) => decodeEntities(match[1] ?? "").trim()).filter(Boolean);
}

function extractRobotsSitemapUrls(body: string): string[] {
  return uniqueStrings(
    body.split(/\r?\n/).flatMap((rawLine) => {
      const line = rawLine.replace(/#.*/, "").trim();
      if (!line) return [];
      const separatorIndex = line.indexOf(":");
      if (separatorIndex < 0) return [];
      const key = line.slice(0, separatorIndex).trim().toLowerCase();
      const value = line.slice(separatorIndex + 1).trim();
      return key === "sitemap" && value ? [decodeEntities(value)] : [];
    }),
  );
}

function isAbsoluteHttpUrl(value: string): boolean {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    return false;
  }
}

function schemaTypesFromJsonLd(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(schemaTypesFromJsonLd);
  if (typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  const ownType = record["@type"];
  const graphTypes = schemaTypesFromJsonLd(record["@graph"]);
  const typeValues = Array.isArray(ownType) ? ownType : ownType ? [ownType] : [];
  return [...typeValues.filter((type): type is string => typeof type === "string"), ...graphTypes];
}

async function probeInternalLinks(input: {
  baseUrl: string;
  links: Array<{ href: string }>;
  fetcher: SeoPassFetcher;
  limit: number;
}): Promise<SeoPassFetchResult[]> {
  if (input.limit <= 0) return [];
  const origin = new URL(input.baseUrl).origin;
  const urls = uniqueUrls(
    input.links
      .map((link) => safeUrl(link.href, input.baseUrl))
      .filter((url): url is URL => url !== null && url.origin === origin)
      .map((url) => url.toString())
      .filter((url) => url !== input.baseUrl),
  ).slice(0, input.limit);
  return Promise.all(urls.map((url) => input.fetcher(url)));
}

function safeUrl(value: string, base?: string): URL | null {
  try {
    return new URL(value, base);
  } catch (err) {
    if (!(err instanceof Error)) throw err;
    return null;
  }
}

function normalizeUrl(value: string): string {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("SEOPass only supports public http(s) URLs.");
  }
  return url.toString();
}

function uniqueUrls(urls: string[]): string[] {
  return Array.from(new Set(urls));
}

function byteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}

function hasAny(values: Set<string>, expected: string[]): boolean {
  return expected.some((value) => values.has(value));
}

function stableRunSuffix(targetUrl: string, generatedAt?: string): string {
  const seed = `${targetUrl}|${generatedAt ?? Date.now().toString()}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
