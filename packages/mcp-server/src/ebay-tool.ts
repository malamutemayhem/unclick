// ─── eBay Browse API Tool ────────────────────────────────────────────────────
// Covers item search, item details, categories, and legacy item lookup.
// Auth: OAuth 2.0 client credentials (client_id + client_secret).
//   Token is fetched automatically and cached for the request lifetime.
// API: https://api.ebay.com/buy/browse/v1
// No external dependencies - native fetch only.

import { stampMeta } from "./connector-meta.js";

const EBAY_TOKEN_URL  = "https://api.ebay.com/identity/v1/oauth2/token";
const EBAY_BROWSE_URL = "https://api.ebay.com/buy/browse/v1";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EbayConfig {
  client_id:     string;
  client_secret: string;
  marketplace?:  string; // e.g. EBAY_US, EBAY_GB (default: EBAY_US)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requireConfig(args: Record<string, unknown>): EbayConfig | { error: string } {
  const client_id     = String(args.client_id     ?? "").trim();
  const client_secret = String(args.client_secret ?? "").trim();
  if (!client_id)     return { error: "client_id is required (eBay application Client ID)." };
  if (!client_secret) return { error: "client_secret is required (eBay application Client Secret)." };
  return {
    client_id,
    client_secret,
    marketplace: args.marketplace ? String(args.marketplace) : "EBAY_US",
  };
}

async function getEbayToken(cfg: EbayConfig): Promise<string | { error: string }> {
  const credentials = Buffer.from(`${cfg.client_id}:${cfg.client_secret}`).toString("base64");
  const EBAY_TIMEOUT_MS = Number(process.env.EBAY_TIMEOUT_MS) || 15000;
  const tokenController = new AbortController();
  const tokenTimer = setTimeout(() => tokenController.abort(), EBAY_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(EBAY_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization:  `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
      signal: tokenController.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { error: `eBay token request timed out after ${EBAY_TIMEOUT_MS}ms.` };
    }
    return { error: `Network error fetching eBay token: ${err instanceof Error ? err.message : String(err)}` };
  } finally {
    clearTimeout(tokenTimer);
  }

  let data: unknown;
  try { data = await response.json(); } catch { return { error: "Non-JSON response from eBay token endpoint." }; }

  if (!response.ok) {
    const d = data as Record<string, unknown>;
    return { error: `eBay auth failed (${response.status}): ${d["error_description"] ?? d["error"] ?? "unknown"}` };
  }

  return String((data as Record<string, unknown>)["access_token"] ?? "");
}

async function ebayFetch(
  cfg:    EbayConfig,
  path:   string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<unknown> {
  const tokenResult = await getEbayToken(cfg);
  if (typeof tokenResult === "object" && "error" in tokenResult) return tokenResult;

  const url = new URL(`${EBAY_BROWSE_URL}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const EBAY_TIMEOUT_MS = Number(process.env.EBAY_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), EBAY_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        Authorization:           `Bearer ${tokenResult}`,
        "X-EBAY-C-MARKETPLACE-ID": cfg.marketplace ?? "EBAY_US",
        "Content-Type":           "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { error: `eBay request timed out after ${EBAY_TIMEOUT_MS}ms.` };
    }
    return { error: `Network error: ${err instanceof Error ? err.message : String(err)}` };
  } finally {
    clearTimeout(timer);
  }

  // eBay rate limit
  if (response.status === 429) {
    return { error: "eBay rate limit reached. Wait before retrying.", status: 429 };
  }

  let data: unknown;
  try { data = await response.json(); } catch { return { error: `Non-JSON response (HTTP ${response.status})`, status: response.status }; }

  if (!response.ok) {
    const d = data as Record<string, unknown>;
    return { error: d["errors"] ?? d["message"] ?? "eBay API error", status: response.status };
  }

  return data;
}

// ─── ebay_search ──────────────────────────────────────────────────────────────

export async function ebaySearch(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const q = String(args.q ?? "").trim();
  if (!q) return { error: "q (search query) is required." };

  const query: Record<string, string | number | boolean | undefined> = {
    q,
    limit:          args.limit          ? Number(args.limit)          : 20,
    offset:         args.offset         ? Number(args.offset)         : undefined,
    filter:         args.filter         ? String(args.filter)         : undefined,
    sort:           args.sort           ? String(args.sort)           : undefined,
    category_ids:   args.category_ids   ? String(args.category_ids)   : undefined,
    fieldgroups:    args.fieldgroups    ? String(args.fieldgroups)    : undefined,
  };

  const __res = await ebayFetch(cfg, "/item_summary/search", query) as Record<string, unknown>;
  return stampMeta(__res, {
    source: "eBay Browse API",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use ebay_get_item with a returned item id for full detail."],
  });
}

// ─── ebay_get_item ────────────────────────────────────────────────────────────

export async function ebayGetItem(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const item_id = String(args.item_id ?? "").trim();
  if (!item_id) return { error: "item_id is required." };

  const query: Record<string, string | number | boolean | undefined> = {
    fieldgroups: args.fieldgroups ? String(args.fieldgroups) : undefined,
  };

  return ebayFetch(cfg, `/item/${encodeURIComponent(item_id)}`, query);
}

// ─── ebay_get_item_by_legacy_id ───────────────────────────────────────────────

export async function ebayGetItemByLegacyId(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const legacy_item_id = String(args.legacy_item_id ?? "").trim();
  if (!legacy_item_id) return { error: "legacy_item_id is required." };

  const query: Record<string, string | number | boolean | undefined> = {
    legacy_item_id,
    legacy_variation_id:  args.legacy_variation_id  ? String(args.legacy_variation_id)  : undefined,
    legacy_variation_sku: args.legacy_variation_sku ? String(args.legacy_variation_sku) : undefined,
    fieldgroups:          args.fieldgroups           ? String(args.fieldgroups)           : undefined,
  };

  return ebayFetch(cfg, "/item/get_item_by_legacy_id", query);
}

// ─── ebay_get_categories ──────────────────────────────────────────────────────

export async function ebayGetCategories(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const category_tree_id = String(args.category_tree_id ?? "0");

  const tokenResult = await getEbayToken(cfg);
  if (typeof tokenResult === "object" && "error" in tokenResult) return tokenResult;

  const url = `https://api.ebay.com/commerce/taxonomy/v1/category_tree/${encodeURIComponent(category_tree_id)}`;

  const EBAY_TIMEOUT_MS = Number(process.env.EBAY_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), EBAY_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Authorization:           `Bearer ${tokenResult}`,
        "X-EBAY-C-MARKETPLACE-ID": cfg.marketplace ?? "EBAY_US",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { error: `eBay category tree request timed out after ${EBAY_TIMEOUT_MS}ms.` };
    }
    return { error: `Network error: ${err instanceof Error ? err.message : String(err)}` };
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    return { error: "eBay rate limit reached. Wait before retrying.", status: 429 };
  }

  let data: unknown;
  try { data = await response.json(); } catch { return { error: `Non-JSON response (HTTP ${response.status})`, status: response.status }; }

  if (!response.ok) {
    const d = data as Record<string, unknown>;
    return { error: d["errors"] ?? d["message"] ?? "eBay API error", status: response.status };
  }

  return data;
}
