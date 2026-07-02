import { stampMeta } from "./connector-meta.js";

const BASE = "https://date.nager.at/api/v3";
const TIMEOUT = 8_000;

export async function abstractCountryInfo(args: Record<string, unknown>) {
  const code = String(args.country_code ?? "").trim().toUpperCase();
  if (!code) return { error: "country_code (ISO 3166-1 alpha-2) is required" };
  const url = `${BASE}/CountryInfo/${encodeURIComponent(code)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`Nager.Date country info ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `date.nager.at CountryInfo/${code}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["use borders array for neighboring countries", "check officialLanguages"],
  });
}

export async function abstractLongWeekends(args: Record<string, unknown>) {
  const year = String(args.year ?? new Date().getFullYear());
  const code = String(args.country_code ?? "").trim().toUpperCase();
  if (!code) return { error: "country_code is required" };
  const url = `${BASE}/LongWeekend/${year}/${encodeURIComponent(code)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`Nager.Date long weekends ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `date.nager.at LongWeekend/${year}/${code}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check startDate/endDate for planning", "dayCount tells you how many days off"],
  });
}
