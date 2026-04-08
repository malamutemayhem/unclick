// Tomorrow.io weather intelligence integration for the UnClick MCP server.
// Uses the Tomorrow.io REST API via fetch - no external dependencies.
// Users must register at tomorrow.io to get a free API key.

const TOMORROWIO_BASE = "https://api.tomorrow.io/v4";

// --- API helper ---

function requireKey(): string {
  const key = (process.env.TOMORROWIO_API_KEY ?? "").trim();
  if (!key) throw new Error("TOMORROWIO_API_KEY environment variable is required.");
  return key;
}

async function tioFetch(
  path: string,
  params: Record<string, string> = {},
  method: "GET" | "POST" = "GET",
  body?: unknown
): Promise<unknown> {
  const apiKey = requireKey();
  const url = new URL(`${TOMORROWIO_BASE}${path}`);
  url.searchParams.set("apikey", apiKey);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const options: RequestInit = {
    method,
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
  };

  if (method === "POST" && body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), options);
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} from Tomorrow.io API${text ? `: ${text}` : ""}`);
  }

  return response.json();
}

// --- Value formatters ---

function formatRealtime(data: Record<string, unknown>) {
  const loc = data.location as Record<string, unknown> | undefined;
  const timelines = data.data as Record<string, unknown> | undefined;
  const values = (timelines?.values as Record<string, unknown>) ?? {};

  return {
    location: loc
      ? { lat: loc.lat, lon: loc.lon, name: loc.name ?? null }
      : null,
    time: timelines?.time ?? null,
    temperature_c: values.temperature ?? null,
    feels_like_c: values.temperatureApparent ?? null,
    humidity_pct: values.humidity ?? null,
    wind_speed_ms: values.windSpeed ?? null,
    wind_direction_deg: values.windDirection ?? null,
    wind_gust_ms: values.windGust ?? null,
    precipitation_intensity: values.precipitationIntensity ?? null,
    precipitation_probability: values.precipitationProbability ?? null,
    precipitation_type: values.precipitationType ?? null,
    cloud_cover_pct: values.cloudCover ?? null,
    visibility_km: values.visibility ?? null,
    uv_index: values.uvIndex ?? null,
    weather_code: values.weatherCode ?? null,
  };
}

// --- Operations ---

export async function tomorrowRealtime(args: Record<string, unknown>): Promise<unknown> {
  const location = String(args.location ?? "").trim();
  if (!location) throw new Error("location is required (city name, lat/lon, or postal code).");

  const data = await tioFetch("/weather/realtime", { location }) as Record<string, unknown>;
  return formatRealtime(data);
}

export async function tomorrowForecast(args: Record<string, unknown>): Promise<unknown> {
  const location = String(args.location ?? "").trim();
  if (!location) throw new Error("location is required.");

  const params: Record<string, string> = { location };

  const timesteps = String(args.timesteps ?? "1h");
  params.timesteps = timesteps;

  const fields = String(args.fields ?? "").trim();
  if (fields) params.fields = fields;

  const data = await tioFetch("/weather/forecast", params) as Record<string, unknown>;

  const timelines = data.timelines as Record<string, unknown> | undefined;
  const hourly = (timelines?.hourly as Array<Record<string, unknown>>) ?? [];
  const daily = (timelines?.daily as Array<Record<string, unknown>>) ?? [];

  const formatInterval = (interval: Record<string, unknown>) => ({
    time: interval.time,
    values: interval.values,
  });

  return {
    location,
    timesteps,
    hourly: hourly.slice(0, 24).map(formatInterval),
    daily: daily.slice(0, 10).map(formatInterval),
  };
}

export async function tomorrowHistory(args: Record<string, unknown>): Promise<unknown> {
  const location = String(args.location ?? "").trim();
  const startTime = String(args.startTime ?? "").trim();
  const endTime = String(args.endTime ?? "").trim();

  if (!location) throw new Error("location is required.");
  if (!startTime) throw new Error("startTime is required (ISO 8601 datetime).");
  if (!endTime) throw new Error("endTime is required (ISO 8601 datetime).");

  const params: Record<string, string> = { location, startTime, endTime };

  const data = await tioFetch("/weather/history/recent", params) as Record<string, unknown>;

  const timelines = data.data as Record<string, unknown> | undefined;
  const intervals = (timelines?.timelines as Array<Record<string, unknown>>) ?? [];

  return {
    location,
    startTime,
    endTime,
    intervals: intervals.slice(0, 100).map((i) => ({
      time: i.startTime,
      values: (i.values as Record<string, unknown>) ?? null,
    })),
  };
}
