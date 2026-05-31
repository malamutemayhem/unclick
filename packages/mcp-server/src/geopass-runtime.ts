/* eslint-disable @typescript-eslint/ban-ts-comment, no-var, no-empty */
// @ts-nocheck
/* Generated from @unclick/geopass source so Vercel bundles GEOPass with the MCP function. */

// packages/geopass/src/schema.ts
import { z } from "zod";
var GeoPassSeveritySchema = z.enum([
  "critical",
  "high",
  "medium",
  "low",
  "info"
]);
var GeoPassVerdictSchema = z.enum([
  "ready",
  "needs-work",
  "blocked",
  "unknown"
]);
var GeoPassEngineIdSchema = z.enum([
  "chatgpt",
  "claude",
  "perplexity",
  "gemini",
  "copilot",
  "grok",
  "meta-ai"
]);
var GeoPassBotIdSchema = z.enum([
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
  "Twitterbot",
  "FacebookBot"
]);
var GeoPassCheckIdSchema = z.enum([
  "ai-bot-crawlability",
  "llms-txt",
  "answer-extractability",
  "entity-clarity",
  "citation-readiness",
  "freshness-cues",
  "content-structure",
  "schema-org-citation-grade",
  "brand-mention-readiness",
  "wikidata-presence",
  "common-crawl-presence",
  "aggregate-ai-engine-readiness"
]);
var GeoPassEvidenceSchema = z.object({
  kind: z.enum([
    "robots-txt",
    "llms-txt",
    "schema-org",
    "html",
    "http",
    "content",
    "date",
    "external-link",
    "wikidata",
    "common-crawl",
    "brand-query",
    "lighthouse",
    "manual-note"
  ]),
  label: z.string().min(1),
  source_url: z.string().url().optional(),
  summary: z.string().min(1)
});
var GeoPassFindingSchema = z.object({
  id: z.string().min(1),
  check_id: GeoPassCheckIdSchema,
  severity: GeoPassSeveritySchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  evidence: z.array(GeoPassEvidenceSchema).default([]),
  recommendation: z.string().min(1).optional()
});
var GeoPassCheckResultSchema = z.object({
  check_id: GeoPassCheckIdSchema,
  label: z.string().min(1),
  score: z.number().min(0).max(100),
  verdict: GeoPassVerdictSchema,
  findings: z.array(GeoPassFindingSchema).default([])
});
var GeoPassCrossPassSignalSchema = z.object({
  pass: z.enum(["seopass", "flowpass", "legalpass", "sloppass", "uxpass"]),
  signal: z.string().min(1),
  score: z.number().min(0).max(100).optional()
});
var GeoPassReportSchema = z.object({
  target_url: z.string().url(),
  generated_at: z.string().datetime(),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]).default("plan-only"),
  engines: z.array(GeoPassEngineIdSchema).min(1),
  aggregate_ai_engine_readiness_score: z.number().min(0).max(100),
  verdict: GeoPassVerdictSchema,
  checks: z.array(GeoPassCheckResultSchema).min(1),
  cross_pass_signals: z.array(GeoPassCrossPassSignalSchema).default([]),
  notes: z.array(z.string().min(1)).default([])
});
var GeoPassReceiptSchema = z.object({
  kind: z.literal("geopass_receipt_v1"),
  status: z.enum(["PASS", "WARN", "BLOCKER"]),
  run_id: z.string().min(1),
  target_url: z.string().url(),
  generated_at: z.string().datetime(),
  mode: z.literal("live-readonly"),
  target_sha: z.string().min(1).optional(),
  score: z.number().min(0).max(100),
  verdict: GeoPassVerdictSchema,
  checked: z.object({
    total: z.number().int().min(0),
    ready: z.number().int().min(0),
    needs_work: z.number().int().min(0),
    blocked: z.number().int().min(0),
    unknown: z.number().int().min(0)
  }),
  evidence_sources: z.array(GeoPassEvidenceSchema).default([]),
  action_needed: z.array(z.string().min(1)).default([]),
  boundaries: z.array(z.string().min(1))
});

// packages/geopass/src/scanner-plan.ts
var DEFAULT_GEOPASS_ENGINES = [
  "chatgpt",
  "claude",
  "perplexity",
  "gemini",
  "copilot",
  "grok",
  "meta-ai"
];
var DEFAULT_GEOPASS_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
  "Twitterbot",
  "FacebookBot"
];
var DEFAULT_GEOPASS_SCANNER_STEPS = [
  {
    id: "ai-bot-crawlability",
    label: "AI bot crawlability matrix",
    purpose: "Plan robots.txt and public bot access checks for major generative engines.",
    evidenceKinds: ["robots-txt", "manual-note"],
    sharedWith: ["seopass"]
  },
  {
    id: "llms-txt",
    label: "llms.txt presence and quality",
    purpose: "Check whether the site publishes a useful llms.txt guide for AI readers.",
    evidenceKinds: ["llms-txt"],
    sharedWith: ["seopass", "sloppass"]
  },
  {
    id: "answer-extractability",
    label: "Answer extractability",
    purpose: "Check whether public page copy contains direct, reusable answers rather than only abstract marketing claims.",
    evidenceKinds: ["html", "content"],
    sharedWith: ["seopass", "uxpass"]
  },
  {
    id: "entity-clarity",
    label: "Entity clarity",
    purpose: "Check whether the page names the organization, product, or author clearly enough for answer engines to ground summaries.",
    evidenceKinds: ["html", "schema-org"],
    sharedWith: ["seopass", "legalpass"]
  },
  {
    id: "citation-readiness",
    label: "Citation and sourceability readiness",
    purpose: "Check whether visible sources, support links, statistics, or evidence cues make claims easier to cite accurately.",
    evidenceKinds: ["external-link", "content", "schema-org"],
    sharedWith: ["seopass", "legalpass", "sloppass"]
  },
  {
    id: "freshness-cues",
    label: "Freshness and update cues",
    purpose: "Check whether visible publication or update signals help answer engines avoid stale summaries.",
    evidenceKinds: ["date", "html"],
    sharedWith: ["seopass"]
  },
  {
    id: "content-structure",
    label: "AI-readable content structure",
    purpose: "Check heading, list, paragraph, and FAQ-style structure that helps AI systems extract reliable answers.",
    evidenceKinds: ["html", "content"],
    sharedWith: ["seopass", "flowpass", "uxpass"]
  },
  {
    id: "schema-org-citation-grade",
    label: "schema.org citation-grade validation",
    purpose: "Plan structured data checks that make public facts easier to cite accurately.",
    evidenceKinds: ["schema-org"],
    sharedWith: ["seopass", "legalpass"]
  },
  {
    id: "brand-mention-readiness",
    label: "Brand mention readiness",
    purpose: "Plan public-safe brand query fixtures without paid API calls or live prompts.",
    evidenceKinds: ["brand-query"],
    sharedWith: ["seopass", "uxpass"]
  },
  {
    id: "wikidata-presence",
    label: "Wikidata presence",
    purpose: "Plan public entity presence checks for citation context and disambiguation.",
    evidenceKinds: ["wikidata"],
    sharedWith: ["seopass"]
  },
  {
    id: "common-crawl-presence",
    label: "Common Crawl presence",
    purpose: "Plan public web corpus presence checks without fetching private content.",
    evidenceKinds: ["common-crawl"],
    sharedWith: ["seopass"]
  },
  {
    id: "aggregate-ai-engine-readiness",
    label: "Aggregate AI engine readiness score",
    purpose: "Combine public diagnostics into one readiness score and shared pass signals.",
    evidenceKinds: ["lighthouse", "manual-note"],
    sharedWith: ["seopass", "flowpass", "legalpass", "sloppass", "uxpass"]
  }
];
var DISALLOWED_ACTIONS = [
  "live crawler execution",
  "paid API calls",
  "credential access",
  "production database writes",
  "guaranteed citations"
];
function createGeoPassScannerPlan(input) {
  const engines = (input.engines ?? DEFAULT_GEOPASS_ENGINES).map(
    (engine) => GeoPassEngineIdSchema.parse(engine)
  );
  const bots = (input.bots ?? DEFAULT_GEOPASS_BOTS).map(
    (bot) => GeoPassBotIdSchema.parse(bot)
  );
  const checks = new Set(
    (input.checks ?? DEFAULT_GEOPASS_SCANNER_STEPS.map((step) => step.id)).map(
      (check) => GeoPassCheckIdSchema.parse(check)
    )
  );
  return {
    targetUrl: new URL(input.targetUrl).toString(),
    mode: "plan-only",
    engines,
    bots,
    steps: DEFAULT_GEOPASS_SCANNER_STEPS.filter((step) => checks.has(step.id)),
    disallowedActions: DISALLOWED_ACTIONS
  };
}

// packages/geopass/src/runner.ts
import { createHash, randomUUID } from "node:crypto";
var DEFAULT_TIMEOUT_MS = 1e4;
var DEFAULT_MAX_BODY_CHARS = 125e4;
var LIVE_CHECKS = [
  "ai-bot-crawlability",
  "llms-txt",
  "answer-extractability",
  "entity-clarity",
  "citation-readiness",
  "freshness-cues",
  "content-structure",
  "schema-org-citation-grade",
  "brand-mention-readiness",
  "aggregate-ai-engine-readiness"
];
var AI_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot"
];
var RECEIPT_BOUNDARIES = [
  "GEOPass reports public read-only readiness only.",
  "GEOPass does not guarantee rankings, citations, AI Overview inclusion, or answer-engine placement.",
  "This run fetches public http(s) pages only and does not use credentials, paid APIs, production data, or private prompts."
];
function normalizePublicHttpUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
}
function stableRunId(targetUrl, generatedAt) {
  const digest = createHash("sha256").update(`${targetUrl}:${generatedAt}:${randomUUID()}`).digest("hex").slice(0, 12);
  return `geopass-${digest}`;
}
function headersToRecord(headers) {
  const output = {};
  headers.forEach((value, key) => {
    output[key.toLowerCase()] = value;
  });
  return output;
}
async function fetchText(url, fetchImpl, timeoutMs, maxBodyChars) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "UnClick-GEOPass/0.1 (+https://unclick.world)" }
    });
    const body = await response.text();
    const truncated = body.length > maxBodyChars;
    return {
      url: response.url || url,
      status: response.status,
      ok: response.ok,
      headers: headersToRecord(response.headers),
      body: truncated ? body.slice(0, maxBodyChars) : body,
      truncated
    };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      headers: {},
      body: "",
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timer);
  }
}
function stripHtml(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&#39;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, " ").trim();
}
function firstMatch(html, pattern) {
  return pattern.exec(html)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
}
function allMatches(html, pattern) {
  return Array.from(
    html.matchAll(pattern),
    (match) => stripHtml(match[1] ?? "").replace(/\s+/g, " ").trim()
  ).filter(Boolean);
}
function countMatches(text, pattern) {
  return Array.from(text.matchAll(pattern)).length;
}
function getMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return firstMatch(
    html,
    new RegExp(`<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i")
  );
}
function hasSchemaType(html, typeName) {
  const pattern = new RegExp(`"@type"\\s*:\\s*"?${typeName}"?`, "i");
  return pattern.test(html);
}
function linkCount(html, baseUrl, external) {
  let count = 0;
  const base = new URL(baseUrl);
  for (const match of html.matchAll(/<a\b[^>]+href=["']([^"']+)["'][^>]*>/gi)) {
    try {
      const href = new URL(match[1] ?? "", base);
      if ((href.protocol === "http:" || href.protocol === "https:") && href.origin !== base.origin === external) {
        count += 1;
      }
    } catch {
    }
  }
  return count;
}
function hasAboutOrContactLink(html) {
  return /<a\b[^>]+href=["'][^"']*(about|contact|company|team)[^"']*["'][^>]*>/i.test(html);
}
function analyzeHtml(html, targetUrl) {
  const text = stripHtml(html);
  const lower = text.toLowerCase();
  const h1 = allMatches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
  const h2 = allMatches(html, /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi);
  const description = getMeta(html, "description") || getMeta(html, "og:description");
  const title = firstMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i) || getMeta(html, "og:title");
  const hasJsonLd = /<script\b[^>]+type=["']application\/ld\+json["'][^>]*>/i.test(html);
  return {
    title,
    description,
    h1,
    h2,
    text,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    paragraphCount: countMatches(html, /<p\b/gi),
    listCount: countMatches(html, /<(ul|ol|li)\b/gi),
    questionCount: countMatches(`${h1.join(" ")} ${h2.join(" ")} ${text}`, /\b(what|why|how|when|where|who|can|does|is|are)\b[^.?!]{0,80}\?/gi),
    externalLinkCount: linkCount(html, targetUrl, true),
    hasJsonLd,
    hasMicrodata: /\bitemscope\b/i.test(html),
    hasRdfa: /\btypeof=["'][^"']+["']/i.test(html),
    hasOrganizationSchema: hasJsonLd && (hasSchemaType(html, "Organization") || hasSchemaType(html, "LocalBusiness") || hasSchemaType(html, "Product")),
    hasArticleSchema: hasJsonLd && (hasSchemaType(html, "Article") || hasSchemaType(html, "NewsArticle") || hasSchemaType(html, "BlogPosting")),
    hasFaqSchema: hasJsonLd && hasSchemaType(html, "FAQPage"),
    hasAuthorCue: /\b(author|byline|written by|reviewed by|editor|team)\b/i.test(lower),
    hasAboutOrContactLink: hasAboutOrContactLink(html),
    hasFreshnessCue: /<time\b/i.test(html) || /\b(updated|last updated|published|reviewed)\b/i.test(lower) || /\b20\d{2}[-/]\d{1,2}[-/]\d{1,2}\b/.test(text),
    hasStatisticCue: /\b\d+(\.\d+)?%|\b\d+x\b|\b\d{2,}\b/.test(text),
    hasSourceCue: /\b(source|sources|citation|research|study|report|evidence|according to|data from)\b/i.test(lower)
  };
}
function evidence(kind, label, summary, sourceUrl) {
  return {
    kind,
    label,
    summary,
    ...sourceUrl ? { source_url: sourceUrl } : {}
  };
}
function finding(checkId, id, severity, title, summary, recommendation, findingEvidence) {
  return {
    id,
    check_id: checkId,
    severity,
    title,
    summary,
    recommendation,
    evidence: findingEvidence
  };
}
function verdictFor(score, findings) {
  if (findings.some((item) => item.severity === "critical" || item.severity === "high") && score < 55) {
    return "blocked";
  }
  if (score >= 85) return "ready";
  if (score >= 45) return "needs-work";
  return "blocked";
}
function result(checkId, label, score, findings) {
  return {
    check_id: checkId,
    label,
    score: Math.max(0, Math.min(100, Math.round(score))),
    verdict: verdictFor(score, findings),
    findings
  };
}
function pageUnavailableResult(checkId, targetUrl, page) {
  return result(checkId, labelFor(checkId), 0, [
    finding(
      checkId,
      `${checkId}-target-unavailable`,
      "critical",
      "Target page was not readable",
      page.error ? `The public page fetch failed: ${page.error}.` : `The public page returned HTTP ${page.status}.`,
      "Make the public page return readable HTML before using it as GEOPass evidence.",
      [evidence("http", "Target fetch", page.error ?? `HTTP ${page.status}`, targetUrl)]
    )
  ]);
}
function labelFor(checkId) {
  return {
    "ai-bot-crawlability": "AI bot crawlability matrix",
    "llms-txt": "llms.txt presence and quality",
    "answer-extractability": "Answer extractability",
    "entity-clarity": "Entity clarity",
    "citation-readiness": "Citation and sourceability readiness",
    "freshness-cues": "Freshness and update cues",
    "content-structure": "AI-readable content structure",
    "schema-org-citation-grade": "schema.org citation-grade validation",
    "brand-mention-readiness": "Brand mention readiness",
    "wikidata-presence": "Wikidata presence",
    "common-crawl-presence": "Common Crawl presence",
    "aggregate-ai-engine-readiness": "Aggregate AI engine readiness score"
  }[checkId];
}
function robotsBlockedBots(robotsBody, pathname) {
  const groups = [];
  let current = null;
  for (const rawLine of robotsBody.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (key === "user-agent") {
      current = { agents: [value.toLowerCase()], rules: [] };
      groups.push(current);
    } else if ((key === "allow" || key === "disallow") && current) {
      current.rules.push({ directive: key, path: value });
    }
  }
  return AI_BOTS.filter((bot) => {
    const token = bot.toLowerCase();
    const matching = groups.filter(
      (group) => group.agents.some((agent) => agent === "*" || token.includes(agent.replace(/\*$/, "")))
    );
    const rules = matching.flatMap((group) => group.rules).filter((rule) => rule.path !== "");
    const disallows = rules.filter((rule) => rule.directive === "disallow" && pathMatches(pathname, rule.path));
    if (disallows.length === 0) return false;
    const strongestDisallow = Math.max(...disallows.map((rule) => rule.path.length));
    const strongestAllow = Math.max(
      0,
      ...rules.filter((rule) => rule.directive === "allow" && pathMatches(pathname, rule.path)).map((rule) => rule.path.length)
    );
    return strongestDisallow >= strongestAllow;
  });
}
function pathMatches(pathname, rulePath) {
  const cleanRule = rulePath.replace(/\*.*/, "");
  if (cleanRule === "/" || cleanRule === "") return cleanRule === "/";
  return pathname.startsWith(cleanRule);
}
function buildAiBotCrawlability(targetUrl, robots) {
  if (robots.status === 0 || robots.status >= 500 || robots.status === 429) {
    return result("ai-bot-crawlability", labelFor("ai-bot-crawlability"), 60, [
      finding(
        "ai-bot-crawlability",
        "ai-bot-crawlability-robots-unavailable",
        "medium",
        "robots.txt was not safely checkable",
        robots.error ? `robots.txt fetch failed: ${robots.error}.` : `robots.txt returned HTTP ${robots.status}.`,
        "Make robots.txt consistently available so AI crawler access can be checked.",
        [evidence("robots-txt", "robots.txt fetch", robots.error ?? `HTTP ${robots.status}`, new URL("/robots.txt", targetUrl).toString())]
      )
    ]);
  }
  if (robots.status === 404) {
    return result("ai-bot-crawlability", labelFor("ai-bot-crawlability"), 88, []);
  }
  const blocked = robotsBlockedBots(robots.body, new URL(targetUrl).pathname || "/");
  if (blocked.length === 0) {
    return result("ai-bot-crawlability", labelFor("ai-bot-crawlability"), 100, []);
  }
  return result("ai-bot-crawlability", labelFor("ai-bot-crawlability"), 35, [
    finding(
      "ai-bot-crawlability",
      "ai-bot-crawlability-blocked",
      "high",
      "AI crawler access is blocked",
      `robots.txt appears to block ${blocked.join(", ")} for this path.`,
      "Review whether AI search crawlers should be allowed to read this public page.",
      [evidence("robots-txt", "Blocked AI bot rules", blocked.join(", "), new URL("/robots.txt", targetUrl).toString())]
    )
  ]);
}
function buildLlmsTxt(targetUrl, llms) {
  if (llms.ok && llms.body.trim().length >= 160) {
    const score = /\[[^\]]+\]\(https?:\/\//.test(llms.body) ? 100 : 88;
    return result("llms-txt", labelFor("llms-txt"), score, []);
  }
  if (llms.ok) {
    return result("llms-txt", labelFor("llms-txt"), 68, [
      finding(
        "llms-txt",
        "llms-txt-thin",
        "medium",
        "llms.txt exists but is thin",
        "The llms.txt file exists but does not yet provide enough product context, summaries, or source links for AI readers.",
        "Add a concise product summary, canonical docs links, and important public pages to llms.txt.",
        [evidence("llms-txt", "Public llms.txt", "File exists but is short.", new URL("/llms.txt", targetUrl).toString())]
      )
    ]);
  }
  return result("llms-txt", labelFor("llms-txt"), 58, [
    finding(
      "llms-txt",
      "llms-txt-missing",
      "medium",
      "llms.txt was not found",
      "No public llms.txt file was available at the target origin.",
      "Consider publishing llms.txt with public summaries and canonical links for AI readers.",
      [evidence("llms-txt", "Public llms.txt", `HTTP ${llms.status || "fetch failed"}`, new URL("/llms.txt", targetUrl).toString())]
    )
  ]);
}
function buildAnswerExtractability(targetUrl, signals) {
  const findings = [];
  let score = 55;
  if (signals.wordCount >= 350) score += 15;
  if (signals.questionCount > 0 || signals.hasFaqSchema) score += 15;
  if (signals.paragraphCount >= 4) score += 10;
  if (signals.h2.length >= 2) score += 5;
  if (signals.wordCount < 180) {
    findings.push(finding(
      "answer-extractability",
      "answer-extractability-thin-page",
      "medium",
      "Page copy is thin for AI answer reuse",
      "The page has limited visible body copy, which makes direct answer extraction brittle.",
      "Add clear, visible answers to the main questions a customer or answer engine would ask.",
      [evidence("content", "Visible body text", `${signals.wordCount} visible words`, targetUrl)]
    ));
  }
  if (signals.questionCount === 0 && !signals.hasFaqSchema) {
    findings.push(finding(
      "answer-extractability",
      "answer-extractability-no-questions",
      "low",
      "No explicit question-answer structure was found",
      "AI answer engines often benefit from direct question headings, FAQ structure, or plain answer blocks.",
      "Add direct headings or FAQ-style sections for important user questions.",
      [evidence("html", "Heading scan", `${signals.h2.length} h2 heading(s), ${signals.questionCount} question heading(s)`, targetUrl)]
    ));
  }
  return result("answer-extractability", labelFor("answer-extractability"), score, findings);
}
function buildEntityClarity(targetUrl, signals) {
  const findings = [];
  let score = 45;
  if (signals.title) score += 15;
  if (signals.description) score += 15;
  if (signals.h1.length > 0) score += 10;
  if (signals.hasOrganizationSchema) score += 15;
  if (signals.hasAboutOrContactLink) score += 10;
  if (!signals.hasOrganizationSchema) {
    findings.push(finding(
      "entity-clarity",
      "entity-clarity-schema-missing",
      "medium",
      "Organization or product schema was not found",
      "The page does not expose obvious Organization, LocalBusiness, or Product JSON-LD for entity grounding.",
      "Add truthful schema that matches visible page content.",
      [evidence("schema-org", "Schema scan", "No Organization, LocalBusiness, or Product JSON-LD found.", targetUrl)]
    ));
  }
  if (!signals.description) {
    findings.push(finding(
      "entity-clarity",
      "entity-clarity-description-missing",
      "low",
      "Meta description is missing",
      "The page lacks a concise public description for summarizers and search snippets.",
      "Add a clear meta description that states what the product, organization, or page is about.",
      [evidence("html", "Meta description scan", "No description meta tag found.", targetUrl)]
    ));
  }
  return result("entity-clarity", labelFor("entity-clarity"), score, findings);
}
function buildCitationReadiness(targetUrl, signals) {
  const findings = [];
  let score = 45;
  if (signals.externalLinkCount >= 2) score += 20;
  if (signals.hasSourceCue) score += 15;
  if (signals.hasStatisticCue) score += 10;
  if (signals.hasArticleSchema || signals.hasAuthorCue) score += 10;
  if (signals.externalLinkCount === 0 && !signals.hasSourceCue) {
    findings.push(finding(
      "citation-readiness",
      "citation-readiness-no-visible-sources",
      "medium",
      "Visible source cues are weak",
      "The page has no obvious external source links or source/evidence wording for answer engines to cite.",
      "Add visible support links, evidence, data sources, or authored references for important claims.",
      [evidence("external-link", "External link scan", `${signals.externalLinkCount} external link(s) found.`, targetUrl)]
    ));
  }
  return result("citation-readiness", labelFor("citation-readiness"), score, findings);
}
function buildFreshness(targetUrl, signals) {
  if (signals.hasFreshnessCue) {
    return result("freshness-cues", labelFor("freshness-cues"), 95, []);
  }
  return result("freshness-cues", labelFor("freshness-cues"), 62, [
    finding(
      "freshness-cues",
      "freshness-cues-missing",
      "low",
      "Freshness cues are not visible",
      "The page does not expose obvious published, reviewed, or last-updated cues.",
      "Add visible freshness or review dates where current information matters.",
      [evidence("date", "Freshness scan", "No visible time/date/update cue found.", targetUrl)]
    )
  ]);
}
function buildContentStructure(targetUrl, signals) {
  const findings = [];
  let score = 45;
  if (signals.h1.length === 1) score += 15;
  if (signals.h2.length >= 2) score += 15;
  if (signals.paragraphCount >= 3) score += 10;
  if (signals.listCount > 0) score += 10;
  if (signals.hasFaqSchema || signals.questionCount > 0) score += 10;
  if (signals.h1.length === 0) {
    findings.push(finding(
      "content-structure",
      "content-structure-h1-missing",
      "medium",
      "No H1 was found",
      "The page lacks a clear top-level heading.",
      "Add one clear H1 that names the page subject.",
      [evidence("html", "Heading scan", "No H1 found.", targetUrl)]
    ));
  }
  if (signals.h2.length < 2) {
    findings.push(finding(
      "content-structure",
      "content-structure-heading-depth-thin",
      "low",
      "Heading structure is thin",
      "The page has limited subheading structure for answer extraction.",
      "Break important topics into descriptive H2 sections.",
      [evidence("html", "Heading scan", `${signals.h2.length} H2 heading(s) found.`, targetUrl)]
    ));
  }
  return result("content-structure", labelFor("content-structure"), score, findings);
}
function buildSchemaCitationGrade(targetUrl, signals) {
  const findings = [];
  let score = 45;
  if (signals.hasJsonLd) score += 25;
  if (signals.hasMicrodata || signals.hasRdfa) score += 10;
  if (signals.hasOrganizationSchema || signals.hasArticleSchema || signals.hasFaqSchema) score += 20;
  if (!signals.hasJsonLd && !signals.hasMicrodata && !signals.hasRdfa) {
    findings.push(finding(
      "schema-org-citation-grade",
      "schema-org-citation-grade-missing",
      "medium",
      "Structured data was not found",
      "No JSON-LD, microdata, or RDFa was detected on the page.",
      "Add truthful structured data that matches visible page facts.",
      [evidence("schema-org", "Structured data scan", "No structured data detected.", targetUrl)]
    ));
  }
  return result("schema-org-citation-grade", labelFor("schema-org-citation-grade"), score, findings);
}
function buildBrandMentionReadiness(targetUrl, signals) {
  const findings = [];
  let score = 55;
  if (signals.title && signals.h1.length > 0) score += 15;
  if (signals.description) score += 10;
  if (signals.hasAboutOrContactLink) score += 10;
  if (signals.hasOrganizationSchema) score += 10;
  if (!signals.title || signals.h1.length === 0) {
    findings.push(finding(
      "brand-mention-readiness",
      "brand-mention-readiness-weak-page-name",
      "medium",
      "Page naming is weak for brand/entity mention",
      "The page needs both a clear title and visible H1 for answer engines to label it consistently.",
      "Use a direct title and H1 that name the product, brand, organization, or topic.",
      [evidence("brand-query", "Title and H1 scan", `title=${signals.title ? "present" : "missing"}; h1=${signals.h1.length}`, targetUrl)]
    ));
  }
  return result("brand-mention-readiness", labelFor("brand-mention-readiness"), score, findings);
}
function buildPlanOnlyExternalIndex(checkId, targetUrl) {
  return {
    check_id: checkId,
    label: labelFor(checkId),
    score: 50,
    verdict: "unknown",
    findings: [
      finding(
        checkId,
        `${checkId}-not-live-readonly`,
        "info",
        "External index lookup was not run",
        "This GEOPass live-readonly slice does not query external entity or web-corpus APIs.",
        "Run a separately scoped public API adapter before using this row as index-presence proof.",
        [evidence(checkId === "wikidata-presence" ? "wikidata" : "common-crawl", "External index boundary", "Not queried in this public-safe run.", targetUrl)]
      )
    ]
  };
}
function buildAggregate(targetUrl, checks) {
  const source = checks.filter((check) => check.check_id !== "aggregate-ai-engine-readiness");
  const score = Math.round(source.reduce((sum, check) => sum + check.score, 0) / Math.max(1, source.length));
  const blockers = source.filter((check) => check.verdict === "blocked");
  const weak = source.filter((check) => check.verdict === "needs-work");
  const findings = [];
  if (blockers.length > 0) {
    findings.push(finding(
      "aggregate-ai-engine-readiness",
      "aggregate-ai-engine-readiness-blockers",
      "high",
      "GEOPass has blocked rows",
      `${blockers.length} check(s) are blocked: ${blockers.map((check) => check.check_id).join(", ")}.`,
      "Resolve blocked rows before treating this page as AI-answer ready.",
      [evidence("manual-note", "Aggregate readiness", `Blocked rows: ${blockers.map((check) => check.check_id).join(", ")}`, targetUrl)]
    ));
  } else if (weak.length > 0) {
    findings.push(finding(
      "aggregate-ai-engine-readiness",
      "aggregate-ai-engine-readiness-needs-work",
      "medium",
      "GEOPass has readiness gaps",
      `${weak.length} check(s) need work: ${weak.map((check) => check.check_id).join(", ")}.`,
      "Use the row recommendations as the next public content fixes.",
      [evidence("manual-note", "Aggregate readiness", `Needs-work rows: ${weak.map((check) => check.check_id).join(", ")}`, targetUrl)]
    ));
  }
  return result("aggregate-ai-engine-readiness", labelFor("aggregate-ai-engine-readiness"), score, findings);
}
function verdictSummary(checks) {
  return checks.reduce(
    (summary, check) => {
      if (check.verdict === "ready") summary.ready += 1;
      if (check.verdict === "needs-work") summary.needs_work += 1;
      if (check.verdict === "blocked") summary.blocked += 1;
      if (check.verdict === "unknown") summary.unknown += 1;
      return summary;
    },
    { ready: 0, needs_work: 0, blocked: 0, unknown: 0 }
  );
}
function crossPassSignals(checks) {
  const byId = new Map(checks.map((check) => [check.check_id, check]));
  const signals = [];
  const llms = byId.get("llms-txt");
  if (llms && llms.verdict !== "ready") {
    signals.push({ pass: "seopass", signal: "llms.txt gap also weakens AI-era search readiness", score: llms.score });
  }
  const schema = byId.get("schema-org-citation-grade");
  if (schema && schema.verdict !== "ready") {
    signals.push({ pass: "legalpass", signal: "schema must truthfully match visible public claims", score: schema.score });
  }
  const structure = byId.get("content-structure");
  if (structure && structure.verdict !== "ready") {
    signals.push({ pass: "uxpass", signal: "thin public structure can make answer extraction and human scanning weaker", score: structure.score });
  }
  const citation = byId.get("citation-readiness");
  if (citation && citation.verdict !== "ready") {
    signals.push({ pass: "sloppass", signal: "unsupported or source-light claims need copy/content cleanup", score: citation.score });
  }
  return signals;
}
function receiptFor(report, runId, targetSha) {
  const summary = verdictSummary(report.checks);
  const status = report.verdict === "ready" ? "PASS" : report.verdict === "blocked" ? "BLOCKER" : "WARN";
  const evidenceSources = report.checks.flatMap((check) => check.findings).flatMap((item) => item.evidence).filter((item, index, all) => all.findIndex((candidate) => candidate.kind === item.kind && candidate.label === item.label && candidate.source_url === item.source_url) === index).slice(0, 12);
  const actionNeeded = report.checks.flatMap((check) => check.findings).map((item) => item.recommendation).filter((item) => Boolean(item)).filter((item, index, all) => all.indexOf(item) === index).slice(0, 8);
  return {
    kind: "geopass_receipt_v1",
    status,
    run_id: runId,
    target_url: report.target_url,
    generated_at: report.generated_at,
    mode: "live-readonly",
    ...targetSha ? { target_sha: targetSha } : {},
    score: report.aggregate_ai_engine_readiness_score,
    verdict: report.verdict,
    checked: {
      total: report.checks.length,
      ready: summary.ready,
      needs_work: summary.needs_work,
      blocked: summary.blocked,
      unknown: summary.unknown
    },
    evidence_sources: evidenceSources,
    action_needed: actionNeeded,
    boundaries: RECEIPT_BOUNDARIES
  };
}
async function runGeoPass(input) {
  const rawUrl = input.url ?? input.targetUrl ?? "";
  const targetUrl = normalizePublicHttpUrl(rawUrl);
  if (!targetUrl) {
    return { error: "GEOPass target URL must be a valid public http(s) URL without credentials" };
  }
  const generatedAt = input.generatedAt ?? (/* @__PURE__ */ new Date()).toISOString();
  const fetchImpl = input.fetchImpl ?? globalThis.fetch;
  if (!fetchImpl) return { error: "No fetch implementation is available for GEOPass live-readonly run" };
  const selectedChecks = new Set(input.checks?.length ? input.checks : LIVE_CHECKS);
  const page = await fetchText(targetUrl, fetchImpl, input.timeoutMs ?? DEFAULT_TIMEOUT_MS, input.maxBodyChars ?? DEFAULT_MAX_BODY_CHARS);
  const analysisUrl = normalizePublicHttpUrl(page.url) ?? targetUrl;
  const [robots, llms] = await Promise.all([
    fetchText(new URL("/robots.txt", analysisUrl).toString(), fetchImpl, input.timeoutMs ?? DEFAULT_TIMEOUT_MS, input.maxBodyChars ?? DEFAULT_MAX_BODY_CHARS),
    fetchText(new URL("/llms.txt", analysisUrl).toString(), fetchImpl, input.timeoutMs ?? DEFAULT_TIMEOUT_MS, input.maxBodyChars ?? DEFAULT_MAX_BODY_CHARS)
  ]);
  const htmlReadable = page.ok && (page.headers["content-type"] ?? "text/html").toLowerCase().includes("html");
  const signals = htmlReadable ? analyzeHtml(page.body, analysisUrl) : null;
  const checks = [];
  for (const checkId of LIVE_CHECKS.filter((id) => selectedChecks.has(id))) {
    if (!signals && checkId !== "ai-bot-crawlability" && checkId !== "llms-txt") {
      checks.push(pageUnavailableResult(checkId, analysisUrl, page));
      continue;
    }
    if (checkId === "ai-bot-crawlability") checks.push(buildAiBotCrawlability(analysisUrl, robots));
    if (checkId === "llms-txt") checks.push(buildLlmsTxt(analysisUrl, llms));
    if (signals && checkId === "answer-extractability") checks.push(buildAnswerExtractability(analysisUrl, signals));
    if (signals && checkId === "entity-clarity") checks.push(buildEntityClarity(analysisUrl, signals));
    if (signals && checkId === "citation-readiness") checks.push(buildCitationReadiness(analysisUrl, signals));
    if (signals && checkId === "freshness-cues") checks.push(buildFreshness(analysisUrl, signals));
    if (signals && checkId === "content-structure") checks.push(buildContentStructure(analysisUrl, signals));
    if (signals && checkId === "schema-org-citation-grade") checks.push(buildSchemaCitationGrade(analysisUrl, signals));
    if (signals && checkId === "brand-mention-readiness") checks.push(buildBrandMentionReadiness(analysisUrl, signals));
  }
  for (const externalCheckId of ["wikidata-presence", "common-crawl-presence"]) {
    if (selectedChecks.has(externalCheckId)) checks.push(buildPlanOnlyExternalIndex(externalCheckId, analysisUrl));
  }
  if (selectedChecks.has("aggregate-ai-engine-readiness")) {
    checks.push(buildAggregate(analysisUrl, checks));
  }
  const summary = verdictSummary(checks);
  const aggregate = checks.find((check) => check.check_id === "aggregate-ai-engine-readiness");
  const score = aggregate?.score ?? Math.round(checks.reduce((sum, check) => sum + check.score, 0) / Math.max(1, checks.length));
  const verdict = summary.blocked > 0 ? "blocked" : score >= 85 ? "ready" : "needs-work";
  const report = {
    target_url: analysisUrl,
    generated_at: generatedAt,
    mode: "live-readonly",
    engines: DEFAULT_GEOPASS_ENGINES,
    aggregate_ai_engine_readiness_score: score,
    verdict,
    checks,
    cross_pass_signals: crossPassSignals(checks),
    notes: [
      "Readiness only. GEOPass does not guarantee AI citations, rankings, or answer-engine placement.",
      "This run used public http(s) fetches only and did not use credentials, paid APIs, production data, or private prompts.",
      ...page.truncated ? ["The target page body was truncated for bounded analysis."] : []
    ]
  };
  const runId = stableRunId(analysisUrl, generatedAt);
  return {
    run_id: runId,
    status: "complete",
    pass: "geopass",
    target_url: analysisUrl,
    generated_at: generatedAt,
    ai_answer_readiness_score: score,
    verdict,
    verdict_summary: summary,
    report,
    geopass_receipt_v1: receiptFor(report, runId, input.targetSha)
  };
}
export {
  DEFAULT_GEOPASS_BOTS,
  DEFAULT_GEOPASS_ENGINES,
  DEFAULT_GEOPASS_SCANNER_STEPS,
  GeoPassBotIdSchema,
  GeoPassCheckIdSchema,
  GeoPassCheckResultSchema,
  GeoPassCrossPassSignalSchema,
  GeoPassEngineIdSchema,
  GeoPassEvidenceSchema,
  GeoPassFindingSchema,
  GeoPassReceiptSchema,
  GeoPassReportSchema,
  GeoPassSeveritySchema,
  GeoPassVerdictSchema,
  createGeoPassScannerPlan,
  runGeoPass
};
