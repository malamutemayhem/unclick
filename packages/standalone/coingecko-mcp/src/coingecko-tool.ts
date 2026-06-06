// CoinGecko crypto market data integration for the UnClick MCP server.
// Free tier requires no API key. Set COINGECKO_API_KEY for higher rate limits.
// Uses the CoinGecko public REST API via fetch - no external dependencies.

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

// --- API helper ---

async function cgFetch(path: string, params: Record<string, string> = {}): Promise<unknown> {
  const url = new URL(`${COINGECKO_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const headers: Record<string, string> = { "Accept": "application/json" };
  const apiKey = (process.env.COINGECKO_API_KEY ?? "").trim();
  if (apiKey) headers["x-cg-demo-api-key"] = apiKey;

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} from CoinGecko API${text ? `: ${text}` : ""}`);
  }

  return response.json();
}

// --- Operations ---

export async function cryptoPrice(args: Record<string, unknown>): Promise<unknown> {
  const ids = String(args.ids ?? "").trim();
  const vs_currencies = String(args.vs_currencies ?? "usd").trim();
  if (!ids) throw new Error("ids is required (comma-separated coin IDs, e.g. bitcoin,ethereum).");

  const data = await cgFetch("/simple/price", {
    ids,
    vs_currencies,
    include_market_cap: "true",
    include_24hr_vol: "true",
    include_24hr_change: "true",
    include_last_updated_at: "true",
  });

  return { ids, vs_currencies, prices: data };
}

export async function cryptoCoin(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim().toLowerCase();
  if (!id) throw new Error("id is required (e.g. bitcoin, ethereum).");

  const data = await cgFetch(`/coins/${encodeURIComponent(id)}`, {
    localization: "false",
    tickers: "false",
    community_data: "false",
    developer_data: "false",
    sparkline: "false",
  }) as Record<string, unknown>;

  const market = data.market_data as Record<string, unknown> | undefined;

  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    description: (data.description as Record<string, string> | undefined)?.en?.slice(0, 500) ?? null,
    homepage: (data.links as Record<string, unknown> | undefined)?.homepage ?? null,
    image: (data.image as Record<string, string> | undefined)?.large ?? null,
    categories: data.categories,
    genesis_date: data.genesis_date,
    market_cap_rank: data.market_cap_rank,
    coingecko_score: data.coingecko_score,
    market_data: market
      ? {
          current_price: (market.current_price as Record<string, number> | undefined) ?? null,
          market_cap: (market.market_cap as Record<string, number> | undefined) ?? null,
          total_volume: (market.total_volume as Record<string, number> | undefined) ?? null,
          price_change_24h: market.price_change_24h ?? null,
          price_change_percentage_24h: market.price_change_percentage_24h ?? null,
          price_change_percentage_7d: market.price_change_percentage_7d ?? null,
          price_change_percentage_30d: market.price_change_percentage_30d ?? null,
          ath: (market.ath as Record<string, number> | undefined) ?? null,
          atl: (market.atl as Record<string, number> | undefined) ?? null,
          circulating_supply: market.circulating_supply ?? null,
          total_supply: market.total_supply ?? null,
          max_supply: market.max_supply ?? null,
        }
      : null,
    last_updated: data.last_updated,
  };
}

export async function cryptoSearch(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) throw new Error("query is required.");

  const data = await cgFetch("/search", { query }) as Record<string, unknown>;

  return {
    query,
    coins: ((data.coins as Array<Record<string, unknown>>) ?? []).slice(0, 20).map((c) => ({
      id: c.id,
      name: c.name,
      symbol: c.symbol,
      market_cap_rank: c.market_cap_rank,
      thumb: c.thumb,
    })),
    exchanges: ((data.exchanges as Array<Record<string, unknown>>) ?? []).slice(0, 5).map((e) => ({
      id: e.id,
      name: e.name,
      thumb: e.thumb,
    })),
  };
}

export async function cryptoTrending(_args: Record<string, unknown>): Promise<unknown> {
  const data = await cgFetch("/search/trending") as Record<string, unknown>;

  const coins = (data.coins as Array<{ item: Record<string, unknown> }>) ?? [];

  return {
    trending_coins: coins.map(({ item }) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      market_cap_rank: item.market_cap_rank,
      score: item.score,
      price_btc: item.price_btc,
      data: (item.data as Record<string, unknown> | undefined) ?? null,
    })),
  };
}

export async function cryptoTopCoins(args: Record<string, unknown>): Promise<unknown> {
  const vs_currency = String(args.vs_currency ?? "usd").trim().toLowerCase();
  const order = String(args.order ?? "market_cap_desc");
  const per_page = String(Math.min(250, Math.max(1, Number(args.per_page ?? 50))));
  const page = String(Math.max(1, Number(args.page ?? 1)));

  const data = await cgFetch("/coins/markets", {
    vs_currency,
    order,
    per_page,
    page,
    sparkline: "false",
  }) as Array<Record<string, unknown>>;

  return {
    vs_currency,
    order,
    page: Number(page),
    per_page: Number(per_page),
    coins: data.map((c) => ({
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      image: c.image,
      current_price: c.current_price,
      market_cap: c.market_cap,
      market_cap_rank: c.market_cap_rank,
      total_volume: c.total_volume,
      price_change_24h: c.price_change_24h,
      price_change_percentage_24h: c.price_change_percentage_24h,
      circulating_supply: c.circulating_supply,
      ath: c.ath,
      atl: c.atl,
      last_updated: c.last_updated,
    })),
  };
}

export async function cryptoCoinHistory(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim().toLowerCase();
  const date = String(args.date ?? "").trim();
  if (!id) throw new Error("id is required (e.g. bitcoin).");
  if (!date) throw new Error("date is required in DD-MM-YYYY format.");

  const data = await cgFetch(`/coins/${encodeURIComponent(id)}/history`, {
    date,
    localization: "false",
  }) as Record<string, unknown>;

  const market = data.market_data as Record<string, unknown> | undefined;

  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    date,
    market_data: market
      ? {
          current_price: market.current_price,
          market_cap: market.market_cap,
          total_volume: market.total_volume,
        }
      : null,
  };
}
