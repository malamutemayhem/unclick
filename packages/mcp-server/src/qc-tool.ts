// QC Checklist tool -- runs a sequential quality checklist against a website or API.
// Pure computation with native fetch(). No external dependencies.

const TIMEOUT_MS = 10_000;

const DEFAULT_BANNED_WORDS = [
  "delve", "tapestry", "landscape", "robust", "leverage", "harness",
  "empower", "revolutionize", "seamlessly", "utilize", "facilitate",
  "synergy",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface CheckResult {
  check: string;
  status: "pass" | "fail" | "warn";
  detail: string;
  duration_ms: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function runCheck(name: string, fn: () => Promise<Omit<CheckResult, "duration_ms">>): Promise<CheckResult> {
  const start = Date.now();
  try {
    const partial = await fn();
    return { ...partial, duration_ms: Date.now() - start };
  } catch (err: unknown) {
    return {
      check: name,
      status: "fail",
      detail: `Error: ${err instanceof Error ? err.message : String(err)}`,
      duration_ms: Date.now() - start,
    };
  }
}

function extractVisibleText(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ─── Individual checks ─────────────────────────────────────────────────────────

async function checkSiteLoads(url: string): Promise<Omit<CheckResult, "duration_ms">> {
  const start = Date.now();
  const res = await fetchWithTimeout(url, { method: "GET", redirect: "follow" });
  const ms = Date.now() - start;
  if (res.status === 200) {
    return {
      check: "site_loads",
      status: ms > 3000 ? "warn" : "pass",
      detail: `HTTP 200 in ${ms}ms`,
    };
  }
  return { check: "site_loads", status: "fail", detail: `HTTP ${res.status}` };
}

async function checkSslValid(url: string): Promise<Omit<CheckResult, "duration_ms">> {
  if (!url.startsWith("https://")) {
    return { check: "ssl_valid", status: "fail", detail: "URL does not use HTTPS" };
  }
  const res = await fetchWithTimeout(url, { method: "HEAD" });
  if (res.ok || res.status < 400) {
    return { check: "ssl_valid", status: "pass", detail: "HTTPS connection succeeded" };
  }
  return { check: "ssl_valid", status: "fail", detail: `HTTPS returned HTTP ${res.status}` };
}

async function checkMetaTags(url: string): Promise<Omit<CheckResult, "duration_ms">> {
  const res = await fetchWithTimeout(url);
  const html = await res.text();

  const missing: string[] = [];
  const patterns: Array<{ name: string; pattern: RegExp }> = [
    { name: "title", pattern: /<title[^>]*>[^<]+<\/title>/i },
    { name: "meta description", pattern: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i },
    { name: "og:title", pattern: /<meta[^>]+property=["']og:title["'][^>]+content=["'][^"']+["']/i },
    { name: "og:description", pattern: /<meta[^>]+property=["']og:description["'][^>]+content=["'][^"']+["']/i },
    { name: "og:image", pattern: /<meta[^>]+property=["']og:image["'][^>]+content=["'][^"']+["']/i },
  ];

  for (const c of patterns) {
    if (!c.pattern.test(html)) missing.push(c.name);
  }

  if (missing.length === 0) {
    return { check: "meta_tags", status: "pass", detail: "All required meta tags present" };
  }
  return { check: "meta_tags", status: "fail", detail: `Missing: ${missing.join(", ")}` };
}

async function checkOgImageValid(url: string): Promise<Omit<CheckResult, "duration_ms">> {
  const res = await fetchWithTimeout(url);
  const html = await res.text();

  const match =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

  if (!match) {
    return { check: "og_image_valid", status: "fail", detail: "No og:image tag found" };
  }

  const imageUrl = match[1];
  const imgRes = await fetchWithTimeout(imageUrl, { method: "HEAD" });
  const contentType = imgRes.headers.get("content-type") ?? "";

  if (!imgRes.ok) {
    return { check: "og_image_valid", status: "fail", detail: `og:image returned HTTP ${imgRes.status}` };
  }
  if (contentType.startsWith("text/html")) {
    return { check: "og_image_valid", status: "fail", detail: "og:image URL returns HTML, not an image" };
  }
  return { check: "og_image_valid", status: "pass", detail: `og:image is valid (${contentType || "unknown type"})` };
}

async function checkRobotsTxt(url: string): Promise<Omit<CheckResult, "duration_ms">> {
  const base = new URL(url);
  const robotsUrl = `${base.protocol}//${base.host}/robots.txt`;
  const res = await fetchWithTimeout(robotsUrl);
  if (res.status === 200) {
    const text = await res.text();
    if (text.toLowerCase().includes("user-agent")) {
      return { check: "robots_txt", status: "pass", detail: "robots.txt exists with User-agent directives" };
    }
    return { check: "robots_txt", status: "warn", detail: "robots.txt exists but no User-agent directive found" };
  }
  return { check: "robots_txt", status: "fail", detail: `robots.txt returned HTTP ${res.status}` };
}

async function checkSitemap(url: string): Promise<Omit<CheckResult, "duration_ms">> {
  const base = new URL(url);
  const sitemapUrl = `${base.protocol}//${base.host}/sitemap.xml`;
  const res = await fetchWithTimeout(sitemapUrl);
  if (res.status === 200) {
    return { check: "sitemap", status: "pass", detail: "sitemap.xml found" };
  }
  return { check: "sitemap", status: "fail", detail: `sitemap.xml returned HTTP ${res.status}` };
}

async function checkNoConsoleErrors(url: string): Promise<Omit<CheckResult, "duration_ms">> {
  const res = await fetchWithTimeout(url);
  const html = await res.text();

  const errorPatterns = [/console\.error\s*\(/gi, /throw new Error\s*\(/gi];
  let count = 0;
  for (const p of errorPatterns) {
    const matches = html.match(p);
    if (matches) count += matches.length;
  }

  if (count === 0) {
    return {
      check: "no_console_errors",
      status: "pass",
      detail: "No console.error or throw patterns in HTML source (static check only -- runtime JS not evaluated)",
    };
  }
  return {
    check: "no_console_errors",
    status: "warn",
    detail: `Found ${count} console.error/throw pattern(s) in HTML source (static check only)`,
  };
}

async function checkLinks(url: string): Promise<Omit<CheckResult, "duration_ms">> {
  const res = await fetchWithTimeout(url);
  const html = await res.text();
  const base = new URL(url);
  const hrefPattern = /href=["']([^"'#][^"']*?)["']/gi;
  const links: string[] = [];
  let m;

  while ((m = hrefPattern.exec(html)) !== null && links.length < 20) {
    const href = m[1];
    if (/^(mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      links.push(new URL(href, base).href);
    } catch {
      // skip unparseable hrefs
    }
  }

  const broken: string[] = [];
  for (const link of links) {
    try {
      const linkRes = await fetchWithTimeout(link, { method: "HEAD" });
      if (linkRes.status === 404) broken.push(`${link} -> 404`);
    } catch {
      broken.push(`${link} -> unreachable`);
    }
  }

  if (broken.length === 0) {
    return { check: "link_check", status: "pass", detail: `Checked ${links.length} link(s), none returned 404` };
  }
  return {
    check: "link_check",
    status: "fail",
    detail: `${broken.length} broken link(s): ${broken.slice(0, 5).join("; ")}`,
  };
}

function buildResponseTimeSummary(results: CheckResult[]): Omit<CheckResult, "duration_ms"> {
  const slow = results.filter(r => r.duration_ms > 3000);
  if (slow.length === 0) {
    return { check: "response_time", status: "pass", detail: "All checks completed within 3 seconds" };
  }
  return {
    check: "response_time",
    status: "warn",
    detail: `${slow.length} check(s) exceeded 3s: ${slow.map(r => `${r.check} (${r.duration_ms}ms)`).join(", ")}`,
  };
}

async function checkCopy(url: string, bannedWords: string[]): Promise<Omit<CheckResult, "duration_ms">> {
  const res = await fetchWithTimeout(url);
  const html = await res.text();
  const text = extractVisibleText(html);

  const issues: string[] = [];

  const emDashRe = /\u2014/g;
  let em;
  while ((em = emDashRe.exec(text)) !== null && issues.length < 5) {
    const ctx = text.slice(Math.max(0, em.index - 20), em.index + 21).trim();
    issues.push(`em-dash: "...${ctx}..."`);
  }

  const enDashRe = /\u2013/g;
  let en;
  while ((en = enDashRe.exec(text)) !== null && issues.length < 8) {
    const ctx = text.slice(Math.max(0, en.index - 20), en.index + 21).trim();
    issues.push(`en-dash: "...${ctx}..."`);
  }

  const lower = text.toLowerCase();
  for (const word of bannedWords) {
    const idx = lower.indexOf(word.toLowerCase());
    if (idx !== -1) {
      const ctx = text.slice(Math.max(0, idx - 30), idx + word.length + 30).trim();
      issues.push(`"${word}": "...${ctx}..."`);
    }
  }

  if (issues.length === 0) {
    return { check: "copy_check", status: "pass", detail: "No em dashes, en dashes, or banned words found" };
  }
  return {
    check: "copy_check",
    status: "fail",
    detail: `${issues.length} issue(s): ${issues.slice(0, 5).join(" | ")}`,
  };
}

// ─── Ordered check runner ──────────────────────────────────────────────────────

const ALL_CHECKS = [
  "site_loads", "ssl_valid", "meta_tags", "og_image_valid",
  "robots_txt", "sitemap", "no_console_errors", "link_check",
  "response_time", "copy_check",
];

// ─── qc_run_checklist ─────────────────────────────────────────────────────────

export async function qcRunChecklist(args: Record<string, unknown>): Promise<unknown> {
  const url = String(args.url ?? "").trim();
  if (!url) return { error: "url is required" };

  const requested: string[] = Array.isArray(args.checks) ? (args.checks as string[]) : ALL_CHECKS;

  const results: CheckResult[] = [];

  for (const name of requested) {
    if (name === "response_time") continue; // computed after all other checks

    let result: CheckResult;
    switch (name) {
      case "site_loads":        result = await runCheck(name, () => checkSiteLoads(url)); break;
      case "ssl_valid":         result = await runCheck(name, () => checkSslValid(url)); break;
      case "meta_tags":         result = await runCheck(name, () => checkMetaTags(url)); break;
      case "og_image_valid":    result = await runCheck(name, () => checkOgImageValid(url)); break;
      case "robots_txt":        result = await runCheck(name, () => checkRobotsTxt(url)); break;
      case "sitemap":           result = await runCheck(name, () => checkSitemap(url)); break;
      case "no_console_errors": result = await runCheck(name, () => checkNoConsoleErrors(url)); break;
      case "link_check":        result = await runCheck(name, () => checkLinks(url)); break;
      case "copy_check":        result = await runCheck(name, () => checkCopy(url, DEFAULT_BANNED_WORDS)); break;
      default:
        result = { check: name, status: "warn", detail: `Unknown check "${name}" skipped`, duration_ms: 0 };
    }
    results.push(result);
  }

  if (requested.includes("response_time")) {
    const rt = buildResponseTimeSummary(results);
    results.push({ ...rt, duration_ms: 0 });
  }

  const passed  = results.filter(r => r.status === "pass").length;
  const failed  = results.filter(r => r.status === "fail").length;
  const warned  = results.filter(r => r.status === "warn").length;
  const totalMs = results.reduce((s, r) => s + r.duration_ms, 0);

  return {
    url,
    summary: { passed, failed, warnings: warned, total: results.length, total_ms: totalMs },
    results,
  };
}

// ─── qc_check_api ─────────────────────────────────────────────────────────────

export async function qcCheckApi(args: Record<string, unknown>): Promise<unknown> {
  const baseUrl = String(args.base_url ?? "").replace(/\/$/, "");
  if (!baseUrl) return { error: "base_url is required" };

  type Endpoint = { path: string; method?: string; expected_status?: number };
  const endpoints: Endpoint[] = Array.isArray(args.endpoints) ? (args.endpoints as Endpoint[]) : [];
  if (endpoints.length === 0) return { error: "endpoints array is required and must not be empty" };

  const results = [];

  for (const ep of endpoints) {
    const fullUrl = `${baseUrl}${ep.path}`;
    const method = (ep.method ?? "GET").toUpperCase();
    const expected = ep.expected_status ?? 200;
    const start = Date.now();
    try {
      const res = await fetchWithTimeout(fullUrl, { method });
      results.push({
        path: ep.path,
        method,
        expected_status: expected,
        actual_status: res.status,
        status: res.status === expected ? "pass" : "fail",
        duration_ms: Date.now() - start,
      });
    } catch (err: unknown) {
      results.push({
        path: ep.path,
        method,
        expected_status: expected,
        actual_status: null,
        status: "fail",
        detail: err instanceof Error ? err.message : String(err),
        duration_ms: Date.now() - start,
      });
    }
  }

  const passed = results.filter(r => r.status === "pass").length;
  const failed = results.filter(r => r.status === "fail").length;

  return {
    base_url: baseUrl,
    summary: { passed, failed, total: results.length },
    results,
  };
}

// ─── qc_copy_audit ────────────────────────────────────────────────────────────

export async function qcCopyAudit(args: Record<string, unknown>): Promise<unknown> {
  const url = String(args.url ?? "").trim();
  if (!url) return { error: "url is required" };

  const bannedWords: string[] = Array.isArray(args.banned_words)
    ? (args.banned_words as string[])
    : DEFAULT_BANNED_WORDS;

  const start = Date.now();
  const res = await fetchWithTimeout(url);
  const html = await res.text();
  const text = extractVisibleText(html);
  const fetchMs = Date.now() - start;

  type Occurrence = { type: string; value: string; context: string; position: number };
  const occurrences: Occurrence[] = [];

  // Em dash (U+2014)
  const emRe = /\u2014/g;
  let m;
  while ((m = emRe.exec(text)) !== null) {
    occurrences.push({
      type: "em_dash",
      value: "\u2014",
      context: text.slice(Math.max(0, m.index - 40), m.index + 41).trim(),
      position: m.index,
    });
  }

  // En dash (U+2013)
  const enRe = /\u2013/g;
  while ((m = enRe.exec(text)) !== null) {
    occurrences.push({
      type: "en_dash",
      value: "\u2013",
      context: text.slice(Math.max(0, m.index - 40), m.index + 41).trim(),
      position: m.index,
    });
  }

  // Banned words (all occurrences)
  const lower = text.toLowerCase();
  for (const word of bannedWords) {
    const lw = word.toLowerCase();
    let pos = 0;
    while (true) {
      const idx = lower.indexOf(lw, pos);
      if (idx === -1) break;
      occurrences.push({
        type: "banned_word",
        value: word,
        context: text.slice(Math.max(0, idx - 40), idx + word.length + 40).trim(),
        position: idx,
      });
      pos = idx + 1;
    }
  }

  occurrences.sort((a, b) => a.position - b.position);

  const uniqueIssues = [...new Set(occurrences.map(o => o.type === "banned_word" ? `"${o.value}"` : o.type))];

  return {
    url,
    fetch_ms: fetchMs,
    banned_words_checked: bannedWords,
    total_occurrences: occurrences.length,
    summary: occurrences.length === 0
      ? "No issues found"
      : `Found ${occurrences.length} occurrence(s): ${uniqueIssues.join(", ")}`,
    occurrences,
  };
}
