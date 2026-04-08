// Open Exchange Rates integration for the UnClick MCP server.
// Uses the Open Exchange Rates REST API via fetch - no external dependencies.
// Users must register at openexchangerates.org to get a free App ID.

const OXR_BASE = "https://openexchangerates.org/api";

// --- API helper ---

function requireAppId(): string {
  const id = (process.env.OPENEXCHANGERATES_APP_ID ?? "").trim();
  if (!id) throw new Error("OPENEXCHANGERATES_APP_ID environment variable is required.");
  return id;
}

async function oxrFetch(path: string, params: Record<string, string> = {}): Promise<unknown> {
  const app_id = requireAppId();
  const url = new URL(`${OXR_BASE}${path}`);
  url.searchParams.set("app_id", app_id);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const response = await fetch(url.toString());
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} from Open Exchange Rates API${text ? `: ${text}` : ""}`);
  }

  const data = await response.json() as Record<string, unknown>;

  if (data.error) {
    throw new Error(`Open Exchange Rates error: ${data.description ?? data.message ?? "Unknown error"}`);
  }

  return data;
}

// --- Operations ---

export async function forexLatest(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string> = {};
  const base = String(args.base ?? "").trim().toUpperCase();
  const symbols = String(args.symbols ?? "").trim().toUpperCase();

  // Note: changing base currency requires a paid plan
  if (base) params.base = base;
  if (symbols) params.symbols = symbols;

  const data = await oxrFetch("/latest.json", params) as Record<string, unknown>;

  return {
    base: data.base,
    timestamp: data.timestamp,
    date: new Date(Number(data.timestamp) * 1000).toISOString().split("T")[0],
    rates: data.rates,
  };
}

export async function forexHistorical(args: Record<string, unknown>): Promise<unknown> {
  const date = String(args.date ?? "").trim();
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("date is required in YYYY-MM-DD format.");
  }

  const params: Record<string, string> = {};
  const base = String(args.base ?? "").trim().toUpperCase();
  const symbols = String(args.symbols ?? "").trim().toUpperCase();

  if (base) params.base = base;
  if (symbols) params.symbols = symbols;

  const data = await oxrFetch(`/historical/${date}.json`, params) as Record<string, unknown>;

  return {
    base: data.base,
    date: data.date ?? date,
    timestamp: data.timestamp,
    rates: data.rates,
  };
}

export async function forexCurrencies(_args: Record<string, unknown>): Promise<unknown> {
  const data = await oxrFetch("/currencies.json");
  const currencies = data as Record<string, string>;

  return {
    count: Object.keys(currencies).length,
    currencies,
  };
}

export async function forexConvert(args: Record<string, unknown>): Promise<unknown> {
  const value = Number(args.value);
  if (!value || isNaN(value)) throw new Error("value is required and must be a number.");
  const from = String(args.from ?? "").trim().toUpperCase();
  const to = String(args.to ?? "").trim().toUpperCase();
  if (!from) throw new Error("from currency is required.");
  if (!to) throw new Error("to currency is required.");

  const params: Record<string, string> = {};
  const date = String(args.date ?? "").trim();
  if (date) params.date = date;

  const data = await oxrFetch(`/convert/${value}/${from}/${to}`, params) as Record<string, unknown>;

  const meta = data.meta as Record<string, unknown> | undefined;
  const response = data.response as Record<string, unknown> | undefined;

  return {
    from,
    to,
    value,
    result: response?.value ?? data.response,
    rate: meta?.rate ?? null,
    timestamp: meta?.timestamp ?? null,
  };
}
