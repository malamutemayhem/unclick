/**
 * Built-in web tools for UnClick MCP: web_search, web_scrape, search_docs.
 *
 * These back up UnClick's "you can remove Exa/Tavily/Firecrawl/context7" nudge
 * by giving it real first-party implementations. All three proxy to third-party
 * APIs configured via Vercel env vars:
 *
 *   - TAVILY_API_KEY    (preferred for search + extract)
 *   - EXA_API_KEY       (fallback for search)
 *   - BRAVE_SEARCH_API_KEY (fallback for search)
 *   - FIRECRAWL_API_KEY (preferred for scrape; Tavily extract is fallback)
 *
 * When none are configured, the tools return a friendly message pointing users
 * at settings. context7 (search_docs) is free and needs no key.
 */

import { getBackend } from "./memory/db.js";

type JSONValue = string | number | boolean | null | JSONValue[] | { [k: string]: JSONValue };

async function safeJson(res: Response): Promise<JSONValue> {
  try {
    return (await res.json()) as JSONValue;
  } catch {
    return null;
  }
}

// ─── Fact auto-save helper ─────────────────────────────────────────────────

async function saveFactSafely(fact: string, category: string, confidence = 0.5): Promise<void> {
  try {
    const db = await getBackend();
    await db.addFact({ fact, category, confidence });
  } catch {
    // Never let memory errors break the tool call.
  }
}

// ─── Web search ────────────────────────────────────────────────────────────

export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
  score?: number;
}

export interface WebSearchResponse {
  query: string;
  results: WebSearchResult[];
  provider: string;
  remembered?: string;
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + "\u2026" : s;
}

async function searchTavily(
  query: string,
  limit: number,
  topic: string,
  apiKey: string
): Promise<WebSearchResult[]> {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: limit,
      topic: topic === "news" ? "news" : "general",
      include_answer: false,
    }),
  });
  if (!res.ok) throw new Error(`Tavily search failed: HTTP ${res.status}`);
  const data = (await safeJson(res)) as { results?: Array<{ title: string; url: string; content: string; score?: number }> } | null;
  return (data?.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    snippet: truncate(r.content ?? "", 400),
    score: r.score,
  }));
}

async function searchExa(
  query: string,
  limit: number,
  apiKey: string
): Promise<WebSearchResult[]> {
  const res = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ query, numResults: limit, contents: { text: true } }),
  });
  if (!res.ok) throw new Error(`Exa search failed: HTTP ${res.status}`);
  const data = (await safeJson(res)) as {
    results?: Array<{ title?: string; url: string; text?: string; score?: number }>;
  } | null;
  return (data?.results ?? []).map((r) => ({
    title: r.title ?? r.url,
    url: r.url,
    snippet: truncate(r.text ?? "", 400),
    score: r.score,
  }));
}

async function searchBrave(
  query: string,
  limit: number,
  apiKey: string
): Promise<WebSearchResult[]> {
  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", query);
  url.searchParams.set("count", String(limit));
  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "X-Subscription-Token": apiKey,
    },
  });
  if (!res.ok) throw new Error(`Brave search failed: HTTP ${res.status}`);
  const data = (await safeJson(res)) as {
    web?: { results?: Array<{ title: string; url: string; description: string }> };
  } | null;
  return (data?.web?.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    snippet: truncate(r.description ?? "", 400),
  }));
}

export async function webSearch(args: {
  query?: string;
  limit?: number;
  topic?: string;
}): Promise<WebSearchResponse | { error: string }> {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required" };
  const limit = Math.min(Math.max(Number(args.limit) || 5, 1), 10);
  const topic = String(args.topic ?? "general");

  const tavilyKey = process.env.TAVILY_API_KEY;
  const exaKey = process.env.EXA_API_KEY;
  const braveKey = process.env.BRAVE_SEARCH_API_KEY;

  let results: WebSearchResult[] = [];
  let provider = "";

  try {
    if (tavilyKey) {
      results = await searchTavily(query, limit, topic, tavilyKey);
      provider = "tavily";
    } else if (exaKey) {
      results = await searchExa(query, limit, exaKey);
      provider = "exa";
    } else if (braveKey) {
      results = await searchBrave(query, limit, braveKey);
      provider = "brave";
    } else {
      return {
        error:
          "Web search is not configured. Ask your admin to add a search API key (TAVILY_API_KEY, EXA_API_KEY, or BRAVE_SEARCH_API_KEY) in settings.",
      };
    }
  } catch (err) {
    return { error: (err as Error).message };
  }

  // Low-confidence fact so decay handles noise. The brief favors saving on scrape,
  // but the "UnClick remembers your searches" promise needs something in the log.
  let remembered: string | undefined;
  if (results.length > 0 && query.length >= 4) {
    const top = results[0];
    const factText = `Searched for "${query}" on ${new Date().toISOString().slice(0, 10)}. Top result: ${top.title} (${top.url})`;
    void saveFactSafely(factText, "search", 0.5);
    remembered = factText;
  }

  return { query, results, provider, remembered };
}

// ─── Web scrape ────────────────────────────────────────────────────────────

export interface WebScrapeResponse {
  url: string;
  format: "text" | "markdown" | "html";
  content: string;
  title?: string;
  provider: string;
}

async function scrapeFirecrawl(
  url: string,
  format: "text" | "markdown" | "html",
  apiKey: string
): Promise<{ content: string; title?: string }> {
  const fcFormat = format === "html" ? "html" : "markdown";
  const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ url, formats: [fcFormat] }),
  });
  if (!res.ok) throw new Error(`Firecrawl scrape failed: HTTP ${res.status}`);
  const data = (await safeJson(res)) as {
    data?: { markdown?: string; html?: string; metadata?: { title?: string } };
  } | null;
  const raw = format === "html" ? data?.data?.html : data?.data?.markdown;
  return { content: raw ?? "", title: data?.data?.metadata?.title };
}

async function scrapeTavily(
  url: string,
  apiKey: string
): Promise<{ content: string; title?: string }> {
  const res = await fetch("https://api.tavily.com/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, urls: [url] }),
  });
  if (!res.ok) throw new Error(`Tavily extract failed: HTTP ${res.status}`);
  const data = (await safeJson(res)) as {
    results?: Array<{ raw_content?: string; url: string }>;
  } | null;
  const first = data?.results?.[0];
  return { content: first?.raw_content ?? "" };
}

function markdownToText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function webScrape(args: {
  url?: string;
  format?: string;
}): Promise<WebScrapeResponse | { error: string }> {
  const url = String(args.url ?? "").trim();
  if (!url) return { error: "url is required" };
  const formatInput = String(args.format ?? "markdown");
  const format: "text" | "markdown" | "html" =
    formatInput === "text" || formatInput === "html" ? formatInput : "markdown";

  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  const tavilyKey = process.env.TAVILY_API_KEY;

  try {
    let content = "";
    let title: string | undefined;
    let provider = "";

    if (firecrawlKey) {
      const r = await scrapeFirecrawl(url, format, firecrawlKey);
      content = r.content;
      title = r.title;
      provider = "firecrawl";
    } else if (tavilyKey) {
      const r = await scrapeTavily(url, tavilyKey);
      content = r.content;
      provider = "tavily";
    } else {
      return {
        error:
          "Web scrape is not configured. Ask your admin to add FIRECRAWL_API_KEY or TAVILY_API_KEY in settings.",
      };
    }

    if (format === "text") {
      content = markdownToText(content);
    }

    const factText = `Read ${title ?? url} on ${new Date().toISOString().slice(0, 10)} via web_scrape.`;
    void saveFactSafely(factText, "reference", 0.6);

    return { url, format, title, content, provider };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

// ─── Docs lookup (context7) ────────────────────────────────────────────────

export interface SearchDocsResponse {
  library: string;
  library_id?: string;
  topic?: string;
  content: string;
  provider: "context7";
}

async function context7JsonRpc<T>(method: string, params: Record<string, unknown>): Promise<T> {
  const res = await fetch("https://mcp.context7.com/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: method, arguments: params },
    }),
  });
  if (!res.ok) throw new Error(`context7 failed: HTTP ${res.status}`);
  const data = (await safeJson(res)) as {
    result?: { content?: Array<{ type: string; text?: string }> };
  } | null;
  const text = data?.result?.content?.find((c) => c.type === "text")?.text ?? "";
  return text as unknown as T;
}

export async function searchDocs(args: {
  library?: string;
  topic?: string;
  max_tokens?: number;
}): Promise<SearchDocsResponse | { error: string }> {
  const library = String(args.library ?? "").trim();
  if (!library) return { error: "library is required" };
  const topic = args.topic ? String(args.topic) : undefined;
  const maxTokens = Math.min(Math.max(Number(args.max_tokens) || 5000, 500), 20000);

  try {
    const libraryId = await context7JsonRpc<string>("resolve-library-id", {
      libraryName: library,
    });

    // resolve-library-id returns a human-readable list; extract first `/org/project`
    const match = libraryId.match(/\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/);
    const resolvedId = match ? match[0] : library;

    const docs = await context7JsonRpc<string>("get-library-docs", {
      context7CompatibleLibraryID: resolvedId,
      tokens: maxTokens,
      topic,
    });

    const factText = topic
      ? `Looked up ${library} docs on "${topic}" via search_docs.`
      : `Looked up ${library} documentation via search_docs.`;
    void saveFactSafely(factText, "technical", 0.7);

    return {
      library,
      library_id: resolvedId,
      topic,
      content: docs,
      provider: "context7",
    };
  } catch (err) {
    return { error: (err as Error).message };
  }
}
