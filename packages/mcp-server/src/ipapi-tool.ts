// IP geolocation integration for the UnClick MCP server.
// Uses the ip-api.com free tier via fetch - no auth required (100 req/min).
// Returns country, region, city, lat/lon, ISP, timezone, and more.

const IPAPI_BASE = "http://ip-api.com";

// --- API helper ---

async function ipapiGet(ip: string): Promise<Record<string, unknown>> {
  const path = ip ? `/${encodeURIComponent(ip)}` : "/";
  const url = `${IPAPI_BASE}/json${path}?fields=66846719`;

  const response = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ip-api.com`);
  }

  const data = await response.json() as Record<string, unknown>;

  if (data.status === "fail") {
    throw new Error(`ip-api error: ${data.message ?? "Query failed"}`);
  }

  return data;
}

function normalizeIpData(data: Record<string, unknown>) {
  return {
    ip: data.query,
    status: data.status,
    country: data.country,
    country_code: data.countryCode,
    region: data.regionName,
    region_code: data.region,
    city: data.city,
    zip: data.zip,
    lat: data.lat,
    lon: data.lon,
    timezone: data.timezone,
    isp: data.isp,
    org: data.org,
    as: data.as,
    mobile: data.mobile,
    proxy: data.proxy,
    hosting: data.hosting,
  };
}

// --- Operations ---

export async function ipLookup(args: Record<string, unknown>): Promise<unknown> {
  const ip = String(args.ip ?? "").trim();
  // Empty ip will look up the caller's IP
  const data = await ipapiGet(ip);
  return normalizeIpData(data);
}

export async function ipBatch(args: Record<string, unknown>): Promise<unknown> {
  const addresses = args.addresses;
  if (!Array.isArray(addresses) || addresses.length === 0) {
    throw new Error("addresses is required and must be a non-empty array of IP strings.");
  }
  if (addresses.length > 100) {
    throw new Error("addresses array must contain 100 or fewer IPs per request.");
  }

  const body = addresses.map((a: unknown) => ({
    query: String(a).trim(),
    fields: "66846719",
  }));

  const response = await fetch(`${IPAPI_BASE}/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ip-api.com batch endpoint`);
  }

  const results = await response.json() as Array<Record<string, unknown>>;

  return {
    count: results.length,
    results: results.map((r) => {
      if (r.status === "fail") {
        return { ip: r.query, error: r.message ?? "Query failed" };
      }
      return normalizeIpData(r);
    }),
  };
}
