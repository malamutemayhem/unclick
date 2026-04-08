// CoinMarketCap crypto data integration for the UnClick MCP server.
// Uses the CoinMarketCap Pro API via fetch - no external dependencies.
// Users must register at coinmarketcap.com to get a free API key.

const CMC_BASE = "https://pro-api.coinmarketcap.com/v1";

// --- API helper ---

function requireKey(): string {
  const key = (process.env.COINMARKETCAP_API_KEY ?? "").trim();
  if (!key) throw new Error("COINMARKETCAP_API_KEY environment variable is required.");
  return key;
}

async function cmcFetch(path: string, params: Record<string, string> = {}): Promise<unknown> {
  const apiKey = requireKey();
  const url = new URL(`${CMC_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const response = await fetch(url.toString(), {
    headers: {
      "X-CMC_PRO_API_KEY": apiKey,
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} from CoinMarketCap API${text ? `: ${text}` : ""}`);
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
  const limit = String(Math.min(5000, Math.max(1, Number(args.limit ?? 100))));
  const convert = String(args.convert ?? "USD").trim().toUpperCase();

  const data = await cmcFetch("/cryptocurrency/listings/latest", { limit, convert }) as Array<Record<string, unknown>>;

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
  const symbol = String(args.symbol ?? "").trim().toUpperCase();
  const id = String(args.id ?? "").trim();
  if (!symbol && !id) throw new Error("symbol or id is required.");

  const params: Record<string, string> = { convert: "USD" };
  if (symbol) params.symbol = symbol;
  if (id) params.id = id;

  const data = await cmcFetch("/cryptocurrency/quotes/latest", params) as Record<string, unknown>;

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
  const symbol = String(args.symbol ?? "").trim().toUpperCase();
  if (!symbol) throw new Error("symbol is required.");

  const data = await cmcFetch("/cryptocurrency/info", { symbol }) as Record<string, unknown>;

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
  const limit = String(Math.min(200, Math.max(1, Number(args.limit ?? 10))));

  const data = await cmcFetch("/cryptocurrency/trending/latest", { limit, convert: "USD" });

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

export async function cmcGlobalMetrics(_args: Record<string, unknown>): Promise<unknown> {
  const data = await cmcFetch("/global-metrics/quotes/latest", { convert: "USD" }) as Record<string, unknown>;
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
