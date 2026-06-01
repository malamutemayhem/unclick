// ── The Guardian Open Platform API tool ────────────────────────────────────────
// Free tier supports full article text (show-fields=body).
// Docs: https://open-platform.theguardian.com/documentation/
// Env var: GUARDIAN_API_KEY

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const GUARDIAN_BASE = "https://content.guardianapis.com";

const GUARDIAN_TIMEOUT_MS = Number(process.env.GUARDIAN_TIMEOUT_MS) || 10000;

async function guardianGet(
  apiKey: string,
  path: string,
  params: Record<string, string | number | boolean>
): Promise<Record<string, unknown>> {
  const qs = new URLSearchParams({ "api-key": apiKey });
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GUARDIAN_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${GUARDIAN_BASE}${path}?${qs}`, { signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Guardian API request timed out after ${GUARDIAN_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Guardian API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Guardian API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Guardian API HTTP ${res.status}: ${body || res.statusText}`);
  }
  const json = (await res.json()) as { response: Record<string, unknown> };
  return json.response;
}

// Resolves the API key from args/env via the connector registry, or returns a
// guided not-connected card (returned, never thrown, so a setup gap is not
// mistaken for a connector fault).
function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("guardian", args);
}

// ── Tool functions ─────────────────────────────────────────────────────────────

export async function guardianSearchArticles(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const query = String(args.query ?? "").trim();
    if (!query) return { error: "query is required." };
    const params: Record<string, string | number> = {
      q:           query,
      "show-fields": "headline,trailText,byline,wordcount,body",
    };
    if (args.section)   params.section   = String(args.section);
    if (args.from_date) params["from-date"] = String(args.from_date);
    if (args.to_date)   params["to-date"]   = String(args.to_date);
    if (args.order_by)  params["order-by"]  = String(args.order_by);
    if (args.page_size) params["page-size"] = Number(args.page_size);
    if (args.page)      params.page         = Number(args.page);
    const data = await guardianGet(apiKey, "/search", params);
    return stampMeta({
      total:        data.total,
      page:         data.currentPage,
      pages:        data.pages,
      articles:     data.results,
    }, {
      source: "The Guardian Open Platform",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use guardian_get_article with a returned article id for the full body, or guardian_get_sections to browse topics."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function guardianGetArticle(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const id = String(args.id ?? "").trim();
    if (!id) return { error: "id is required (e.g. 'world/2024/jan/01/article-slug')." };
    const data = await guardianGet(apiKey, `/${id}`, { "show-fields": "all" });
    return data.content ?? data;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function guardianGetSections(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const params: Record<string, string> = {};
    if (args.query) params.q = String(args.query);
    const data = await guardianGet(apiKey, "/sections", params);
    return { sections: data.results };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function guardianGetTags(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const query = String(args.query ?? "").trim();
    if (!query) return { error: "query is required." };
    const params: Record<string, string | number> = { q: query };
    if (args.section)   params.section   = String(args.section);
    if (args.type)      params.type      = String(args.type);
    if (args.page_size) params["page-size"] = Number(args.page_size);
    const data = await guardianGet(apiKey, "/tags", params);
    return { total: data.total, tags: data.results };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function guardianGetEdition(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const edition = String(args.edition ?? "uk").trim().toLowerCase();
    // Edition IDs: uk, us, au
    const data = await guardianGet(apiKey, "/editions", {});
    const editions = (data.results as Array<Record<string, unknown>>) ?? [];
    const found = editions.find(
      (e) =>
        String(e.id).toLowerCase() === edition ||
        String(e.code).toLowerCase() === edition
    );
    if (!found) return { available_editions: editions.map((e) => ({ id: e.id, code: e.code, webTitle: e.webTitle })) };
    return found;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
