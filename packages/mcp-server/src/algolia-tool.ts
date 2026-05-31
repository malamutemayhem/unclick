// Algolia Search API integration for the UnClick MCP server.
// Uses the Algolia REST API via fetch - no external dependencies.
// Users must supply an Application ID and API Key from algolia.com.

import { notConnectedFor, requireCredential } from "./connector-setup.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requireCreds(
  args: Record<string, unknown>,
): { appId: string; apiKey: string } | ReturnType<typeof notConnectedFor> {
  const appId = String(args.app_id ?? process.env.ALGOLIA_APPLICATION_ID ?? "").trim();
  const apiKey = requireCredential("algolia", args);
  if (typeof apiKey !== "string") return apiKey;
  if (!appId) {
    return notConnectedFor("algolia", {
      credential: "Application ID",
      arg: "app_id",
      envVar: "ALGOLIA_APPLICATION_ID",
    });
  }
  return { appId, apiKey };
}

function baseUrl(appId: string): string {
  return `https://${appId}-dsn.algolia.net/1`;
}

async function algoGet<T>(appId: string, apiKey: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${baseUrl(appId)}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const ALGOLIA_TIMEOUT_MS = Number(process.env.ALGOLIA_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ALGOLIA_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: {
        "X-Algolia-Application-Id": appId,
        "X-Algolia-API-Key": apiKey,
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Algolia request timed out after ${ALGOLIA_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Algolia network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Algolia rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? `status ${res.status}`;
    throw new Error(`Algolia error (${res.status}): ${msg}`);
  }
  return data as T;
}

async function algoPost<T>(appId: string, apiKey: string, path: string, body: unknown): Promise<T> {
  const ALGOLIA_TIMEOUT_MS = Number(process.env.ALGOLIA_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ALGOLIA_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${baseUrl(appId)}${path}`, {
      method: "POST",
      headers: {
        "X-Algolia-Application-Id": appId,
        "X-Algolia-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Algolia request timed out after ${ALGOLIA_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Algolia network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Algolia rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? `status ${res.status}`;
    throw new Error(`Algolia error (${res.status}): ${msg}`);
  }
  return data as T;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function algoliaSearch(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const { appId, apiKey } = creds;
  const index = String(args.index ?? "").trim();
  const query = String(args.query ?? "");
  if (!index) throw new Error("index is required (Algolia index name).");

  const body: Record<string, unknown> = { query };
  if (args.filters) body.filters = String(args.filters);
  if (args.hits_per_page) body.hitsPerPage = Number(args.hits_per_page);
  if (args.page !== undefined) body.page = Number(args.page);
  if (args.facets) body.facets = args.facets;
  if (args.attributes_to_retrieve) body.attributesToRetrieve = args.attributes_to_retrieve;

  const data = await algoPost<{ hits: unknown[]; nbHits: number; page: number; nbPages: number; processingTimeMS: number }>(
    appId, apiKey, `/indexes/${encodeURIComponent(index)}/query`, body
  );
  return {
    index,
    query,
    total_hits: data.nbHits,
    page: data.page,
    total_pages: data.nbPages,
    processing_ms: data.processingTimeMS,
    hits: data.hits,
  };
}

export async function algoliaGetObject(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const { appId, apiKey } = creds;
  const index = String(args.index ?? "").trim();
  const objectId = String(args.object_id ?? "").trim();
  if (!index) throw new Error("index is required.");
  if (!objectId) throw new Error("object_id is required.");
  return algoGet(appId, apiKey, `/indexes/${encodeURIComponent(index)}/${encodeURIComponent(objectId)}`);
}

export async function algoliaListIndices(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const { appId, apiKey } = creds;
  const data = await algoGet<{ items: Array<{ name: string; entries: number; dataSize: number; fileSize: number; lastBuildTimeS: number; numberOfPendingTask: number }> }>(
    appId, apiKey, "/indexes"
  );
  return {
    count: data.items?.length ?? 0,
    indices: data.items ?? [],
  };
}

export async function algoliaBrowseIndex(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const { appId, apiKey } = creds;
  const index = String(args.index ?? "").trim();
  if (!index) throw new Error("index is required.");

  const body: Record<string, unknown> = {};
  if (args.filters) body.filters = String(args.filters);
  if (args.attributes_to_retrieve) body.attributesToRetrieve = args.attributes_to_retrieve;
  if (args.hits_per_page) body.hitsPerPage = Number(args.hits_per_page);
  if (args.cursor) body.cursor = String(args.cursor);

  const data = await algoPost<{ hits: unknown[]; cursor?: string; nbHits?: number }>(
    appId, apiKey, `/indexes/${encodeURIComponent(index)}/browse`, body
  );
  return {
    index,
    hits: data.hits,
    count: data.hits.length,
    cursor: data.cursor ?? null,
    has_more: !!data.cursor,
  };
}
