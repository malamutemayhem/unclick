// CoinMarketCap crypto data integration for the UnClick MCP server.
// Uses the CoinMarketCap Pro API via fetch - no external dependencies.
// Users must register at coinmarketcap.com to get a free API key.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const CMC_BASE = "https://pro-api.coinmarketcap.com/v1";

// --- API helper ---

function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("coinmarketcap", args);
}

const CMC_TIMEOUT_MS = Number(process.env.COINMARKETCAP_TIMEOUT_MS) || 10000;

async function cmcFetch(apiKey: string, path: string, params: Record<string, string> = {}): Promise<unknown> {
  const url = new URL(`${CMC_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CMC_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
        "Accept": "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`CoinMarketCap API request timed out after ${CMC_TIMEOUT_MS}ms.`);
    }
    throw new Error(`CoinMarketCap API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(`CoinMarketCap API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`CoinMarketCap API HTTP ${response.status}${text ? `: ${text.slice(0, 200)}` : ""}`);
  }

  const data = await response.json() as Record<string, unknown>;
  const status = data.status as Record<string, unknown> | undefined;

  if (status?.error_code && Number(status.error_code) !== 0) {
    throw new Error(`CoinMarketCap error ${status.error_code}: ${status.error_message ?? "Unknown error"}`);
  }

  return data.data ?? data;
}

// --- Operations ---

export async function cmcListings(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const limit = String(Math.min(5000, Math.max(1, Number(args.limit ?? 100))));
  const convert = String(args.convert ?? "USD").trim().toUpperCase();

  const data = await cmcFetch(apiKey, "/cryptocurrency/listings/latest", { limit, convert }) as Array<Record<string, unknown>>;

  return {
    convert,
    limit: Number(limit),
    coins: (Array.isArray(data) ? data : []).map((c) => {
      const quote = (c.quote as Record<string, Record<string, unknown>> | undefined)?.[convert];
      return {
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        slug: c.slug,
        cmc_rank: c.cmc_rank,
        circulating_supply: c.circulating_supply,
        total_supply: c.total_supply,
        max_supply: c.max_supply,
        price: quote?.price ?? null,
        volume_24h: quote?.volume_24h ?? null,
        market_cap: quote?.market_cap ?? null,
        percent_change_1h: quote?.percent_change_1h ?? null,
        percent_change_24h: quote?.percent_change_24h ?? null,
        percent_change_7d: quote?.percent_change_7d ?? null,
        last_updated: quote?.last_updated ?? null,
      };
    }),
  };
}

export async function cmcQuotes(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const symbol = String(args.symbol ?? "").trim().toUpperCase();
  const id = String(args.id ?? "").trim();
  if (!symbol && !id) throw new Error("symbol or id is required.");

  const params: Record<string, string> = { convert: "USD" };
  if (symbol) params.symbol = symbol;
  if (id) params.id = id;

  const data = await cmcFetch(apiKey, "/cryptocurrency/quotes/latest", params) as Record<string, unknown>;

  // data is keyed by symbol or id
  const entries = Object.values(data).map((c) => {
    const coin = c as Record<string, unknown>;
    const quote = (coin.quote as Record<string, Record<string, unknown>> | undefined)?.USD;
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      cmc_rank: coin.cmc_rank,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      price: quote?.price ?? null,
      volume_24h: quote?.volume_24h ?? null,
      market_cap: quote?.market_cap ?? null,
      percent_change_1h: quote?.percent_change_1h ?? null,
      percent_change_24h: quote?.percent_change_24h ?? null,
      percent_change_7d: quote?.percent_change_7d ?? null,
      last_updated: quote?.last_updated ?? null,
    };
  });

  return { quotes: entries };
}

export async function cmcInfo(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const symbol = String(args.symbol ?? "").trim().toUpperCase();
  if (!symbol) throw new Error("symbol is required.");

  const data = await cmcFetch(apiKey, "/cryptocurrency/info", { symbol }) as Record<string, unknown>;

  const entries = Object.values(data).map((c) => {
    const coin = c as Record<string, unknown>;
    const urls = coin.urls as Record<string, string[]> | undefined;
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      slug: coin.slug,
      description: String(coin.description ?? "").slice(0, 500),
      logo: coin.logo,
      date_added: coin.date_added,
      date_launched: coin.date_launched,
      category: coin.category,
      tags: Array.isArray(coin.tags) ? coin.tags.slice(0, 10) : null,
      urls: urls
        ? {
            website: urls.website ?? [],
            whitepaper: urls.technical_doc ?? [],
            explorer: urls.explorer ?? [],
          }
        : null,
    };
  });

  return { info: entries };
}

export async function cmcTrending(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const limit = String(Math.min(200, Math.max(1, Number(args.limit ?? 10))));

  const data = await cmcFetch(apiKey, "/cryptocurrency/trending/latest", { limit, convert: "USD" });

  const coins = Array.isArray(data) ? data : [];
  return {
    limit: Number(limit),
    trending: (coins as Array<Record<string, unknown>>).map((c) => {
      const quote = (c.quote as Record<string, Record<string, unknown>> | undefined)?.USD;
      return {
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        cmc_rank: c.cmc_rank,
        price: quote?.price ?? null,
        percent_change_24h: quote?.percent_change_24h ?? null,
        market_cap: quote?.market_cap ?? null,
      };
    }),
  };
}

export async function cmcGlobalMetrics(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const data = await cmcFetch(apiKey, "/global-metrics/quotes/latest", { convert: "USD" }) as Record<string, unknown>;
  const quote = (data.quote as Record<string, Record<string, unknown>> | undefined)?.USD;

  return {
    active_cryptocurrencies: data.active_cryptocurrencies,
    total_cryptocurrencies: data.total_cryptocurrencies,
    active_market_pairs: data.active_market_pairs,
    active_exchanges: data.active_exchanges,
    btc_dominance: data.btc_dominance,
    eth_dominance: data.eth_dominance,
    total_market_cap: quote?.total_market_cap ?? null,
    total_volume_24h: quote?.total_volume_24h ?? null,
    total_volume_24h_reported: quote?.total_volume_24h_reported ?? null,
    altcoin_volume_24h: quote?.altcoin_volume_24h ?? null,
    altcoin_market_cap: quote?.altcoin_market_cap ?? null,
    defi_volume_24h: quote?.defi_volume_24h ?? null,
    defi_market_cap: quote?.defi_market_cap ?? null,
    last_updated: data.last_updated,
  };
}
