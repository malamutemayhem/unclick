// REST Countries integration for the UnClick MCP server.
// Uses the REST Countries public API via fetch - no auth required.
// Data covers all 250 countries with rich metadata.

const RESTCOUNTRIES_BASE = "https://restcountries.com/v3.1";

// --- API helper ---

async function rcFetch(path: string, fields?: string): Promise<unknown> {
  const url = new URL(`${RESTCOUNTRIES_BASE}${path}`);
  if (fields) url.searchParams.set("fields", fields);

  const response = await fetch(url.toString(), {
    headers: { "Accept": "application/json" },
  });

  if (response.status === 404) {
    return { results: [], note: "No countries matched the query." };
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} from REST Countries API${text ? `: ${text}` : ""}`);
  }

  return response.json();
}

// --- Normalizer ---

function normalizeCountry(c: Record<string, unknown>) {
  const name = c.name as Record<string, unknown> | undefined;
  const currencies = c.currencies as Record<string, Record<string, string>> | undefined;
  const languages = c.languages as Record<string, string> | undefined;
  const capital = c.capital as string[] | undefined;
  const flags = c.flags as Record<string, string> | undefined;
  const maps = c.maps as Record<string, string> | undefined;

  return {
    name: name?.common ?? c.name,
    official_name: name?.official ?? null,
    cca2: c.cca2 ?? null,
    cca3: c.cca3 ?? null,
    capital: capital?.[0] ?? null,
    region: c.region ?? null,
    subregion: c.subregion ?? null,
    population: c.population ?? null,
    area: c.area ?? null,
    flag_emoji: c.flag ?? null,
    flag_url: flags?.png ?? null,
    google_maps: maps?.googleMaps ?? null,
    currencies: currencies
      ? Object.entries(currencies).map(([code, info]) => ({
          code,
          name: info.name,
          symbol: info.symbol,
        }))
      : null,
    languages: languages ? Object.values(languages) : null,
    timezones: c.timezones ?? null,
    continents: c.continents ?? null,
    landlocked: c.landlocked ?? null,
    borders: c.borders ?? null,
    independent: c.independent ?? null,
    un_member: c.unMember ?? null,
  };
}

// --- Operations ---

export async function countryAll(args: Record<string, unknown>): Promise<unknown> {
  const fields = String(args.fields ?? "").trim();
  const data = await rcFetch("/all", fields || undefined);

  if (data && typeof data === "object" && "results" in data) return data;

  const countries = data as Array<Record<string, unknown>>;
  return {
    count: countries.length,
    countries: countries.map(normalizeCountry),
  };
}

export async function countryByName(args: Record<string, unknown>): Promise<unknown> {
  const name = String(args.name ?? "").trim();
  if (!name) throw new Error("name is required.");

  const data = await rcFetch(`/name/${encodeURIComponent(name)}`);

  if (data && typeof data === "object" && "results" in data) return data;

  const countries = data as Array<Record<string, unknown>>;
  return {
    count: countries.length,
    countries: countries.map(normalizeCountry),
  };
}

export async function countryByCode(args: Record<string, unknown>): Promise<unknown> {
  const code = String(args.code ?? "").trim().toUpperCase();
  if (!code) throw new Error("code is required (ISO 2 or 3 letter code).");

  const data = await rcFetch(`/alpha/${encodeURIComponent(code)}`);

  if (data && typeof data === "object" && "results" in data) return data;

  // /alpha/{code} can return a single object or array
  const arr = Array.isArray(data) ? data : [data];
  return {
    count: arr.length,
    countries: (arr as Array<Record<string, unknown>>).map(normalizeCountry),
  };
}

export async function countryByRegion(args: Record<string, unknown>): Promise<unknown> {
  const region = String(args.region ?? "").trim();
  const validRegions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];
  if (!region) throw new Error(`region is required. Valid values: ${validRegions.join(", ")}.`);

  const data = await rcFetch(`/region/${encodeURIComponent(region)}`);

  if (data && typeof data === "object" && "results" in data) return data;

  const countries = data as Array<Record<string, unknown>>;
  return {
    region,
    count: countries.length,
    countries: countries.map(normalizeCountry),
  };
}

export async function countryByCurrency(args: Record<string, unknown>): Promise<unknown> {
  const currency = String(args.currency ?? "").trim().toUpperCase();
  if (!currency) throw new Error("currency is required (e.g. USD, EUR).");

  const data = await rcFetch(`/currency/${encodeURIComponent(currency)}`);

  if (data && typeof data === "object" && "results" in data) return data;

  const countries = data as Array<Record<string, unknown>>;
  return {
    currency,
    count: countries.length,
    countries: countries.map(normalizeCountry),
  };
}

export async function countryByLanguage(args: Record<string, unknown>): Promise<unknown> {
  const language = String(args.language ?? "").trim().toLowerCase();
  if (!language) throw new Error("language is required (e.g. english, spanish).");

  const data = await rcFetch(`/lang/${encodeURIComponent(language)}`);

  if (data && typeof data === "object" && "results" in data) return data;

  const countries = data as Array<Record<string, unknown>>;
  return {
    language,
    count: countries.length,
    countries: countries.map(normalizeCountry),
  };
}
