// Nager.Date public holidays API.
// No API key required - completely free and open.
// Base URL: https://date.nager.at/api/v3/

import { stampMeta } from "./connector-meta.js";

const HOLIDAYS_BASE = "https://date.nager.at/api/v3";
const HOLIDAYS_TIMEOUT_MS = Number(process.env.HOLIDAYS_TIMEOUT_MS) || 10000;

// ─── API helper ──────────────────────────────────────────────────────────────

async function holidayFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HOLIDAYS_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${HOLIDAYS_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Nager.Date request timed out after ${HOLIDAYS_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Nager.Date network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Nager.Date rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Nager.Date HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

// ─── Validation helpers ──────────────────────────────────────────────────────

function validateCountryCode(raw: unknown): string | null {
  if (!raw) return null;
  const code = String(raw).toUpperCase().trim();
  if (!/^[A-Z]{2}$/.test(code)) return null;
  return code;
}

// ─── Response types ──────────────────────────────────────────────────────────

interface RawHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

interface RawCountry {
  countryCode: string;
  name: string;
}

interface RawLongWeekend {
  startDate: string;
  endDate: string;
  dayCount: number;
  needBridgeDay: boolean;
}

// ─── Normalizer ──────────────────────────────────────────────────────────────

function normalizeHoliday(h: RawHoliday) {
  return {
    date: h.date,
    local_name: h.localName,
    name: h.name,
    country_code: h.countryCode,
    types: h.types,
    is_global: h.global,
  };
}

// ─── holidays_by_country ─────────────────────────────────────────────────────
// GET /PublicHolidays/{year}/{countryCode}

export async function holidaysByCountry(args: Record<string, unknown>): Promise<unknown> {
  try {
    const code = validateCountryCode(args.country_code);
    if (!code) return { error: "country_code is required (2-letter ISO code, e.g. US, AU, GB, DE)." };

    const year = args.year ? Number(args.year) : new Date().getFullYear();
    if (!Number.isFinite(year)) return { error: "year must be a valid number." };

    const data = await holidayFetch<RawHoliday[]>(`/PublicHolidays/${year}/${code}`);

    return stampMeta({
      country_code: code,
      year,
      count: data.length,
      holidays: data.map(normalizeHoliday),
    }, {
      source: "Nager.Date",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use holidays_next_worldwide to see upcoming holidays for a country.",
        "Use holiday_long_weekends to find long weekends.",
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── holidays_next_worldwide ─────────────────────────────────────────────────
// GET /NextPublicHolidays/{countryCode}

export async function holidaysNextWorldwide(args: Record<string, unknown>): Promise<unknown> {
  try {
    const code = validateCountryCode(args.country_code);
    if (!code) return { error: "country_code is required (2-letter ISO code, e.g. US, AU, GB, DE)." };

    const data = await holidayFetch<RawHoliday[]>(`/NextPublicHolidays/${code}`);

    return stampMeta({
      country_code: code,
      count: data.length,
      holidays: data.map(normalizeHoliday),
    }, {
      source: "Nager.Date",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use holidays_by_country to look up a specific year.",
        "Use holiday_countries to list all supported countries.",
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── holiday_countries ───────────────────────────────────────────────────────
// GET /AvailableCountries

export async function holidayCountries(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await holidayFetch<RawCountry[]>("/AvailableCountries");

    return stampMeta({
      count: data.length,
      countries: data.map((c) => ({
        country_code: c.countryCode,
        name: c.name,
      })),
    }, {
      source: "Nager.Date",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use holidays_by_country with a country_code to get public holidays.",
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── holiday_long_weekends ───────────────────────────────────────────────────
// GET /LongWeekend/{year}/{countryCode}

export async function holidayLongWeekends(args: Record<string, unknown>): Promise<unknown> {
  try {
    const code = validateCountryCode(args.country_code);
    if (!code) return { error: "country_code is required (2-letter ISO code, e.g. US, AU, GB, DE)." };

    const year = args.year ? Number(args.year) : new Date().getFullYear();
    if (!Number.isFinite(year)) return { error: "year must be a valid number." };

    const data = await holidayFetch<RawLongWeekend[]>(`/LongWeekend/${year}/${code}`);

    return stampMeta({
      country_code: code,
      year,
      count: data.length,
      long_weekends: data.map((w) => ({
        start_date: w.startDate,
        end_date: w.endDate,
        day_count: w.dayCount,
        needs_bridge_day: w.needBridgeDay,
      })),
    }, {
      source: "Nager.Date",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use holidays_by_country to see which holiday creates each long weekend.",
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
