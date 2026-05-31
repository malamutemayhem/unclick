// Alpha Vantage financial data integration for the UnClick MCP server.
// Uses the Alpha Vantage REST API via fetch - no external dependencies.
// Users must register at alphavantage.co to get a free API key.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const ALPHAVANTAGE_BASE = "https://www.alphavantage.co/query";

// --- API helper ---

function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("alphavantage", args);
}

const ALPHAVANTAGE_TIMEOUT_MS = Number(process.env.ALPHAVANTAGE_TIMEOUT_MS) || 10000;

async function avFetch(apikey: string, params: Record<string, string>): Promise<unknown> {
  const url = new URL(ALPHAVANTAGE_BASE);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set("apikey", apikey);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ALPHAVANTAGE_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), { signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Alpha Vantage API request timed out after ${ALPHAVANTAGE_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Alpha Vantage API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(`Alpha Vantage API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!response.ok) {
    throw new Error(`Alpha Vantage API HTTP ${response.status}.`);
  }

  const data = await response.json();

  // Alpha Vantage returns error messages inside the response body
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    if (d["Error Message"]) throw new Error(`Alpha Vantage error: ${d["Error Message"]}`);
    if (d["Note"]) {
      // API call frequency warning - still return data
      (d as Record<string, unknown>)["_note"] = d["Note"];
      delete d["Note"];
    }
    if (d["Information"]) throw new Error(`Alpha Vantage limit: ${d["Information"]}`);
  }

  return data;
}

// --- Operations ---

export async function stockQuote(args: Record<string, unknown>): Promise<unknown> {
  const apikey = requireKey(args);
  if (typeof apikey !== "string") return apikey;
  const symbol = String(args.symbol ?? "").trim().toUpperCase();
  if (!symbol) throw new Error("symbol is required.");

  const data = await avFetch(apikey, { function: "GLOBAL_QUOTE", symbol }) as Record<string, unknown>;
  const quote = data["Global Quote"] as Record<string, string> | undefined;
  if (!quote || !quote["01. symbol"]) {
    return { symbol, quote: null, note: "No data returned. Check symbol." };
  }

  return {
    symbol: quote["01. symbol"],
    open: quote["02. open"],
    high: quote["03. high"],
    low: quote["04. low"],
    price: quote["05. price"],
    volume: quote["06. volume"],
    latest_trading_day: quote["07. latest trading day"],
    previous_close: quote["08. previous close"],
    change: quote["09. change"],
    change_percent: quote["10. change percent"],
  };
}

export async function stockSearch(args: Record<string, unknown>): Promise<unknown> {
  const apikey = requireKey(args);
  if (typeof apikey !== "string") return apikey;
  const keywords = String(args.keywords ?? "").trim();
  if (!keywords) throw new Error("keywords is required.");

  const data = await avFetch(apikey, { function: "SYMBOL_SEARCH", keywords }) as Record<string, unknown>;
  const matches = data["bestMatches"] as Array<Record<string, string>> | undefined;

  return {
    keywords,
    results: (matches ?? []).map((m) => ({
      symbol: m["1. symbol"],
      name: m["2. name"],
      type: m["3. type"],
      region: m["4. region"],
      currency: m["8. currency"],
      match_score: m["9. matchScore"],
    })),
  };
}

export async function stockDaily(args: Record<string, unknown>): Promise<unknown> {
  const apikey = requireKey(args);
  if (typeof apikey !== "string") return apikey;
  const symbol = String(args.symbol ?? "").trim().toUpperCase();
  if (!symbol) throw new Error("symbol is required.");
  const outputsize = String(args.outputsize ?? "compact");

  const data = await avFetch(apikey, {
    function: "TIME_SERIES_DAILY",
    symbol,
    outputsize,
  }) as Record<string, unknown>;

  const meta = data["Meta Data"] as Record<string, string> | undefined;
  const series = data["Time Series (Daily)"] as Record<string, Record<string, string>> | undefined;

  if (!series) return { symbol, daily: null, note: "No data returned." };

  const days = Object.entries(series)
    .slice(0, 30)
    .map(([date, v]) => ({
      date,
      open: v["1. open"],
      high: v["2. high"],
      low: v["3. low"],
      close: v["4. close"],
      volume: v["5. volume"],
    }));

  return {
    symbol,
    last_refreshed: meta?.["3. Last Refreshed"],
    outputsize,
    days,
  };
}

export async function stockIntraday(args: Record<string, unknown>): Promise<unknown> {
  const apikey = requireKey(args);
  if (typeof apikey !== "string") return apikey;
  const symbol = String(args.symbol ?? "").trim().toUpperCase();
  if (!symbol) throw new Error("symbol is required.");

  const validIntervals = ["1min", "5min", "15min", "30min", "60min"];
  const interval = String(args.interval ?? "5min");
  if (!validIntervals.includes(interval)) {
    throw new Error(`interval must be one of: ${validIntervals.join(", ")}.`);
  }

  const data = await avFetch(apikey, {
    function: "TIME_SERIES_INTRADAY",
    symbol,
    interval,
  }) as Record<string, unknown>;

  const meta = data["Meta Data"] as Record<string, string> | undefined;
  const seriesKey = `Time Series (${interval})`;
  const series = data[seriesKey] as Record<string, Record<string, string>> | undefined;

  if (!series) return { symbol, interval, bars: null, note: "No data returned." };

  const bars = Object.entries(series)
    .slice(0, 50)
    .map(([timestamp, v]) => ({
      timestamp,
      open: v["1. open"],
      high: v["2. high"],
      low: v["3. low"],
      close: v["4. close"],
      volume: v["5. volume"],
    }));

  return {
    symbol,
    interval,
    last_refreshed: meta?.["3. Last Refreshed"],
    timezone: meta?.["6. Time Zone"],
    bars,
  };
}

export async function forexRate(args: Record<string, unknown>): Promise<unknown> {
  const apikey = requireKey(args);
  if (typeof apikey !== "string") return apikey;
  const from_currency = String(args.from_currency ?? "").trim().toUpperCase();
  const to_currency = String(args.to_currency ?? "").trim().toUpperCase();
  if (!from_currency) throw new Error("from_currency is required.");
  if (!to_currency) throw new Error("to_currency is required.");

  const data = await avFetch(apikey, {
    function: "CURRENCY_EXCHANGE_RATE",
    from_currency,
    to_currency,
  }) as Record<string, unknown>;

  const rate = data["Realtime Currency Exchange Rate"] as Record<string, string> | undefined;
  if (!rate) return { from_currency, to_currency, rate: null, note: "No data returned." };

  return {
    from_currency: rate["1. From_Currency Code"],
    from_name: rate["2. From_Currency Name"],
    to_currency: rate["3. To_Currency Code"],
    to_name: rate["4. To_Currency Name"],
    exchange_rate: rate["5. Exchange Rate"],
    last_refreshed: rate["6. Last Refreshed"],
    timezone: rate["7. Time Zone"],
    bid_price: rate["8. Bid Price"],
    ask_price: rate["9. Ask Price"],
  };
}

export async function cryptoDaily(args: Record<string, unknown>): Promise<unknown> {
  const apikey = requireKey(args);
  if (typeof apikey !== "string") return apikey;
  const symbol = String(args.symbol ?? "").trim().toUpperCase();
  const market = String(args.market ?? "").trim().toUpperCase();
  if (!symbol) throw new Error("symbol is required.");
  if (!market) throw new Error("market is required (e.g. USD, EUR).");

  const data = await avFetch(apikey, {
    function: "DIGITAL_CURRENCY_DAILY",
    symbol,
    market,
  }) as Record<string, unknown>;

  const meta = data["Meta Data"] as Record<string, string> | undefined;
  const series = data["Time Series (Digital Currency Daily)"] as
    | Record<string, Record<string, string>>
    | undefined;

  if (!series) return { symbol, market, daily: null, note: "No data returned." };

  const days = Object.entries(series)
    .slice(0, 30)
    .map(([date, v]) => ({
      date,
      open: v[`1a. open (${market})`],
      high: v[`2a. high (${market})`],
      low: v[`3a. low (${market})`],
      close: v[`4a. close (${market})`],
      volume: v["5. volume"],
      market_cap: v["6. market cap (USD)"],
    }));

  return {
    symbol,
    market,
    last_refreshed: meta?.["6. Last Refreshed (UTC)"],
    days,
  };
}
