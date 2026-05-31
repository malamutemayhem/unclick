// Gumroad Digital Sales API.
// Docs: https://app.gumroad.com/api
// Auth: access_token query param
// Base: https://api.gumroad.com/v2

const GUMROAD_API_BASE = "https://api.gumroad.com/v2";

function requireKey(args: Record<string, unknown>): string {
  const key = String(args.api_key ?? args.access_token ?? "").trim();
  if (!key) throw new Error("api_key is required. Get your access token from app.gumroad.com/settings/advanced.");
  return key;
}

const GUMROAD_TIMEOUT_MS = Number(process.env.GUMROAD_TIMEOUT_MS) || 10000;

async function grGet<T>(accessToken: string, path: string, query?: Record<string, string>): Promise<T> {
  const url = new URL(`${GUMROAD_API_BASE}${path}`);
  url.searchParams.set("access_token", accessToken);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, v);
    }
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GUMROAD_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Gumroad request timed out after ${GUMROAD_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Gumroad network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Gumroad rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  const data = await res.json() as Record<string, unknown>;
  if (!data.success) {
    const msg = (data.message as string) ?? `status ${res.status}`;
    throw new Error(`Gumroad error: ${msg}`);
  }
  return data as T;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function gumroad_list_products(args: Record<string, unknown>): Promise<unknown> {
  const token = requireKey(args);
  const data = await grGet<{ products: unknown[] }>(token, "/products");
  return {
    count: data.products?.length ?? 0,
    products: data.products ?? [],
  };
}

export async function gumroad_get_product(args: Record<string, unknown>): Promise<unknown> {
  const token = requireKey(args);
  const id = String(args.product_id ?? "").trim();
  if (!id) throw new Error("product_id is required.");
  const data = await grGet<{ product: unknown }>(token, `/products/${encodeURIComponent(id)}`);
  return data.product;
}

export async function gumroad_list_sales(args: Record<string, unknown>): Promise<unknown> {
  const token = requireKey(args);
  const query: Record<string, string> = {};
  if (args.product_id) query.product_id = String(args.product_id);
  if (args.email) query.email = String(args.email);
  if (args.after) query.after = String(args.after);
  if (args.before) query.before = String(args.before);
  if (args.page) query.page = String(args.page);

  const data = await grGet<{ sales: unknown[]; next_page_url: string | null }>(token, "/sales", query);
  return {
    count: data.sales?.length ?? 0,
    next_page_url: data.next_page_url ?? null,
    sales: data.sales ?? [],
  };
}

export async function gumroad_get_sale(args: Record<string, unknown>): Promise<unknown> {
  const token = requireKey(args);
  const id = String(args.sale_id ?? "").trim();
  if (!id) throw new Error("sale_id is required.");
  const data = await grGet<{ sale: unknown }>(token, `/sales/${encodeURIComponent(id)}`);
  return data.sale;
}

export async function gumroad_list_subscribers(args: Record<string, unknown>): Promise<unknown> {
  const token = requireKey(args);
  const productId = String(args.product_id ?? "").trim();
  if (!productId) throw new Error("product_id is required.");
  const query: Record<string, string> = {};
  if (args.email) query.email = String(args.email);

  const data = await grGet<{ subscribers: unknown[] }>(
    token, `/products/${encodeURIComponent(productId)}/subscribers`, query
  );
  return {
    count: data.subscribers?.length ?? 0,
    subscribers: data.subscribers ?? [],
  };
}
