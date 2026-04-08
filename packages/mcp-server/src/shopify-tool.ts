// ─── Shopify Admin REST API Tool ───────────────────────────────────────────────
// Covers products, orders, customers, inventory, collections, shop info, and fulfillments.
// Auth: Shopify Admin Access Token (X-Shopify-Access-Token header).
// API version: 2024-01
// No external dependencies - native fetch only.

const SHOPIFY_API_VERSION = "2024-01";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ShopifyConfig {
  store: string;        // "mystore" or "mystore.myshopify.com"
  access_token: string; // Shopify Admin API access token
}

interface PaginationInfo {
  next?: string;
  previous?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getBaseUrl(store: string): string {
  const host = store.includes(".") ? store : `${store}.myshopify.com`;
  return `https://${host}/admin/api/${SHOPIFY_API_VERSION}`;
}

function parseLinkHeader(link: string): PaginationInfo {
  const result: PaginationInfo = {};
  for (const part of link.split(",")) {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match) {
      if (match[2] === "next")     result.next     = match[1];
      if (match[2] === "previous") result.previous = match[1];
    }
  }
  return result;
}

async function shopifyFetch(
  config:  ShopifyConfig,
  method:  string,
  path:    string,
  body?:   unknown,
  query?:  Record<string, string | number | boolean | undefined>,
): Promise<unknown> {
  const base = getBaseUrl(config.store);
  const url  = new URL(`${base}${path}`);

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const init: RequestInit = {
    method,
    headers: {
      "X-Shopify-Access-Token": config.access_token,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), init);
  } catch (err) {
    return { error: `Network error: ${err instanceof Error ? err.message : String(err)}` };
  }

  // Shopify rate limit: 429 with Retry-After header
  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    return {
      error:       "Shopify rate limit reached. Wait before retrying.",
      retry_after: retryAfter ? Number(retryAfter) : 2,
      status:      429,
    };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return { error: `Non-JSON response (HTTP ${response.status})`, status: response.status };
  }

  if (!response.ok) {
    const errPayload = data as Record<string, unknown>;
    return {
      error:  errPayload["errors"] ?? errPayload["error"] ?? "Shopify API error",
      status: response.status,
    };
  }

  const linkHeader = response.headers.get("Link");
  if (linkHeader) {
    return { ...(data as object), _pagination: parseLinkHeader(linkHeader) };
  }

  return data;
}

function requireConfig(args: Record<string, unknown>): ShopifyConfig | { error: string } {
  const store        = String(args.store        ?? "").trim();
  const access_token = String(args.access_token ?? "").trim();
  if (!store)        return { error: "store is required (e.g. 'mystore' or 'mystore.myshopify.com')." };
  if (!access_token) return { error: "access_token is required (Shopify Admin API access token)." };
  return { store, access_token };
}

// ─── shopify_products ──────────────────────────────────────────────────────────

export async function shopifyProducts(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const action = String(args.action ?? "list");

  switch (action) {
    case "list": {
      const query: Record<string, string | number | boolean | undefined> = {
        limit:            args.limit           ? Number(args.limit)           : 50,
        page_info:        args.page_info       ? String(args.page_info)       : undefined,
        status:           args.status          ? String(args.status)          : undefined,
        vendor:           args.vendor          ? String(args.vendor)          : undefined,
        product_type:     args.product_type    ? String(args.product_type)    : undefined,
        published_status: args.published_status ? String(args.published_status) : undefined,
        title:            args.title           ? String(args.title)           : undefined,
        since_id:         args.since_id        ? String(args.since_id)        : undefined,
        fields:           args.fields          ? String(args.fields)          : undefined,
      };
      return shopifyFetch(cfg, "GET", "/products.json", undefined, query);
    }

    case "get": {
      const id = String(args.id ?? "").trim();
      if (!id) return { error: "id is required for action='get'." };
      return shopifyFetch(cfg, "GET", `/products/${id}.json`);
    }

    case "create": {
      if (!args.product || typeof args.product !== "object") {
        return { error: "product object is required for action='create'." };
      }
      return shopifyFetch(cfg, "POST", "/products.json", { product: args.product });
    }

    case "update": {
      const id = String(args.id ?? "").trim();
      if (!id) return { error: "id is required for action='update'." };
      if (!args.product || typeof args.product !== "object") {
        return { error: "product object is required for action='update'." };
      }
      return shopifyFetch(cfg, "PUT", `/products/${id}.json`, { product: args.product });
    }

    default:
      return { error: `Unknown action "${action}". Valid: list, get, create, update.` };
  }
}

// ─── shopify_orders ────────────────────────────────────────────────────────────

export async function shopifyOrders(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const action = String(args.action ?? "list");

  switch (action) {
    case "list": {
      const query: Record<string, string | number | boolean | undefined> = {
        limit:            args.limit      ? Number(args.limit)   : 50,
        status:           args.status     ? String(args.status)  : "any",
        financial_status: args.financial_status ? String(args.financial_status) : undefined,
        fulfillment_status: args.fulfillment_status ? String(args.fulfillment_status) : undefined,
        since_id:         args.since_id   ? String(args.since_id) : undefined,
        created_at_min:   args.created_at_min ? String(args.created_at_min) : undefined,
        created_at_max:   args.created_at_max ? String(args.created_at_max) : undefined,
        page_info:        args.page_info  ? String(args.page_info) : undefined,
        fields:           args.fields     ? String(args.fields)  : undefined,
      };
      return shopifyFetch(cfg, "GET", "/orders.json", undefined, query);
    }

    case "get": {
      const id = String(args.id ?? "").trim();
      if (!id) return { error: "id is required for action='get'." };
      return shopifyFetch(cfg, "GET", `/orders/${id}.json`);
    }

    default:
      return { error: `Unknown action "${action}". Valid: list, get.` };
  }
}

// ─── shopify_customers ─────────────────────────────────────────────────────────

export async function shopifyCustomers(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const action = String(args.action ?? "list");

  switch (action) {
    case "list": {
      const query: Record<string, string | number | boolean | undefined> = {
        limit:          args.limit    ? Number(args.limit)    : 50,
        since_id:       args.since_id ? String(args.since_id) : undefined,
        created_at_min: args.created_at_min ? String(args.created_at_min) : undefined,
        created_at_max: args.created_at_max ? String(args.created_at_max) : undefined,
        updated_at_min: args.updated_at_min ? String(args.updated_at_min) : undefined,
        page_info:      args.page_info ? String(args.page_info) : undefined,
        fields:         args.fields   ? String(args.fields)   : undefined,
      };
      return shopifyFetch(cfg, "GET", "/customers.json", undefined, query);
    }

    case "get": {
      const id = String(args.id ?? "").trim();
      if (!id) return { error: "id is required for action='get'." };
      return shopifyFetch(cfg, "GET", `/customers/${id}.json`);
    }

    case "search": {
      const q = String(args.query ?? "").trim();
      if (!q) return { error: "query is required for action='search'." };
      const query: Record<string, string | number | boolean | undefined> = {
        query:     q,
        limit:     args.limit ? Number(args.limit) : 50,
        fields:    args.fields ? String(args.fields) : undefined,
      };
      return shopifyFetch(cfg, "GET", "/customers/search.json", undefined, query);
    }

    default:
      return { error: `Unknown action "${action}". Valid: list, get, search.` };
  }
}

// ─── shopify_inventory ─────────────────────────────────────────────────────────

export async function shopifyInventory(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const query: Record<string, string | number | boolean | undefined> = {
    limit: args.limit ? Number(args.limit) : 50,
  };

  if (args.inventory_item_ids) {
    const ids = Array.isArray(args.inventory_item_ids)
      ? args.inventory_item_ids.map(String).join(",")
      : String(args.inventory_item_ids);
    query["inventory_item_ids"] = ids;
  }

  if (args.location_ids) {
    const ids = Array.isArray(args.location_ids)
      ? args.location_ids.map(String).join(",")
      : String(args.location_ids);
    query["location_ids"] = ids;
  }

  if (!query["inventory_item_ids"] && !query["location_ids"]) {
    return {
      error: "At least one of inventory_item_ids or location_ids is required.",
    };
  }

  return shopifyFetch(cfg, "GET", "/inventory_levels.json", undefined, query);
}

// ─── shopify_collections ───────────────────────────────────────────────────────

export async function shopifyCollections(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const type  = String(args.type ?? "all");
  const limit = args.limit ? Number(args.limit) : 50;
  const query: Record<string, string | number | boolean | undefined> = {
    limit,
    since_id: args.since_id ? String(args.since_id) : undefined,
    title:    args.title    ? String(args.title)    : undefined,
    fields:   args.fields   ? String(args.fields)   : undefined,
  };

  if (type === "smart") {
    return shopifyFetch(cfg, "GET", "/smart_collections.json", undefined, query);
  }

  if (type === "custom") {
    return shopifyFetch(cfg, "GET", "/custom_collections.json", undefined, query);
  }

  // "all" - fetch both and merge
  const [custom, smart] = await Promise.all([
    shopifyFetch(cfg, "GET", "/custom_collections.json", undefined, query),
    shopifyFetch(cfg, "GET", "/smart_collections.json", undefined, query),
  ]);

  if (typeof custom === "object" && custom !== null && "error" in custom) return custom;
  if (typeof smart  === "object" && smart  !== null && "error" in smart)  return smart;

  const customList = ((custom as Record<string, unknown>)["custom_collections"] ?? []) as unknown[];
  const smartList  = ((smart  as Record<string, unknown>)["smart_collections"]  ?? []) as unknown[];

  return {
    custom_collections: customList,
    smart_collections:  smartList,
    total:              customList.length + smartList.length,
  };
}

// ─── shopify_shop ──────────────────────────────────────────────────────────────

export async function shopifyShop(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;
  return shopifyFetch(cfg, "GET", "/shop.json");
}

// ─── shopify_fulfillments ──────────────────────────────────────────────────────

export async function shopifyFulfillments(args: Record<string, unknown>): Promise<unknown> {
  const cfg = requireConfig(args);
  if ("error" in cfg) return cfg;

  const order_id = String(args.order_id ?? "").trim();
  if (!order_id) return { error: "order_id is required." };

  const action = String(args.action ?? "list");

  switch (action) {
    case "list": {
      const query: Record<string, string | number | boolean | undefined> = {
        limit:     args.limit    ? Number(args.limit)    : 50,
        since_id:  args.since_id ? String(args.since_id) : undefined,
        fields:    args.fields   ? String(args.fields)   : undefined,
      };
      return shopifyFetch(cfg, "GET", `/orders/${order_id}/fulfillments.json`, undefined, query);
    }

    case "create": {
      if (!args.fulfillment || typeof args.fulfillment !== "object") {
        return { error: "fulfillment object is required for action='create'." };
      }
      return shopifyFetch(
        cfg,
        "POST",
        `/orders/${order_id}/fulfillments.json`,
        { fulfillment: args.fulfillment },
      );
    }

    default:
      return { error: `Unknown action "${action}". Valid: list, create.` };
  }
}
