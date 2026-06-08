// Domain.com.au integration.
// Australian property listings, property details, and suburb statistics.
// Docs: https://developer.domain.com.au/docs/
// Auth: DOMAIN_API_KEY env var (X-Api-Key header).
// Base URL: https://api.domain.com.au/v1/

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const DOMAIN_BASE = "https://api.domain.com.au/v1";

// Resolves the API key from args/env via the connector registry, or returns a
// guided not-connected card (returned, never thrown).
function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("domain", args);
}

const DOMAIN_TIMEOUT_MS = Number(process.env.DOMAIN_TIMEOUT_MS) || 10000;

async function domainFetch(
  apiKey: string,
  path: string,
  method = "GET",
  body?: unknown
): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DOMAIN_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${DOMAIN_BASE}${path}`, {
      method,
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Domain API request timed out after ${DOMAIN_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Domain API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401 || res.status === 403) throw new Error("Invalid Domain API key.");
  if (res.status === 404) throw new Error("Resource not found.");
  if (res.status === 429) throw new Error("Domain API rate limit exceeded.");
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Domain API HTTP ${res.status}${text ? `: ${text.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<unknown>;
}

// ─── search_domain_listings ───────────────────────────────────────────────────

export async function searchDomainListings(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const listingType = String((args.listingType ?? args.listing_type) ?? "residential").toLowerCase();
    const endpoint = listingType === "commercial"
      ? "/listings/commercial/_search"
      : "/listings/residential/_search";

    const body: Record<string, unknown> = {};

    if (args.suburb || args.postcode || args.state) {
      const loc: Record<string, string> = {};
      if (args.suburb) loc["suburb"] = String(args.suburb);
      if (args.postcode) loc["postcode"] = String(args.postcode);
      if (args.state) loc["state"] = String(args.state);
      body["locations"] = [loc];
    }

    if (args.property_types) body["propertyTypes"] = args.property_types;
    if (args.listing_types) body["listingType"] = args.listing_types;
    if (args.minPrice ?? args.min_price) body["minPrice"] = Number(args.minPrice ?? args.min_price);
    if (args.maxPrice ?? args.max_price) body["maxPrice"] = Number(args.maxPrice ?? args.max_price);
    if (args.minBedrooms ?? args.min_bedrooms) body["minBedrooms"] = Number(args.minBedrooms ?? args.min_bedrooms);
    if (args.maxBedrooms ?? args.max_bedrooms) body["maxBedrooms"] = Number(args.maxBedrooms ?? args.max_bedrooms);
    body["pageSize"] = Math.min(50, Number((args.pageSize ?? args.page_size) ?? 10));
    if (args.page_number) body["pageNumber"] = Number(args.page_number);

    const data = await domainFetch(apiKey, endpoint, "POST", body) as Array<Record<string, unknown>>;

    return {
      listing_type: listingType,
      count: data.length,
      results: data.map((item) => {
        const listing = item["listing"] as Record<string, unknown> | undefined ?? item;
        return {
          id: listing["id"],
          status: listing["status"],
          type: listing["type"],
          address: listing["addressParts"] ?? listing["address"],
          price: listing["price"] ?? listing["priceDetails"],
          bedrooms: listing["bedrooms"],
          bathrooms: listing["bathrooms"],
          carspaces: listing["carspaces"],
          property_types: listing["propertyTypes"],
          headline: listing["headline"],
          url: listing["url"],
          agency: (listing["advertiser"] as Record<string, unknown>)?.["name"],
        };
      }),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_domain_property ─────────────────────────────────────────────────────

export async function getDomainProperty(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const propertyId = String((args.listing_id ?? args.property_id) ?? "").trim();
    if (!propertyId) return { error: "property_id is required." };

    const data = await domainFetch(apiKey, `/listings/${propertyId}`) as Record<string, unknown>;

    return stampMeta({
      id: data["id"],
      status: data["status"],
      type: data["type"],
      address: data["addressParts"] ?? data["address"],
      price: data["price"] ?? data["priceDetails"],
      bedrooms: data["bedrooms"],
      bathrooms: data["bathrooms"],
      carspaces: data["carspaces"],
      land_area_sqm: data["landAreaSqm"],
      building_area_sqm: data["buildingAreaSqm"],
      property_types: data["propertyTypes"],
      headline: data["headline"],
      description: data["description"],
      url: data["url"],
      listed_date: data["dateListed"],
      agency: data["advertiser"],
      features: data["features"],
      inspection_times: data["inspectionSchedule"],
    }, {
      source: "Domain",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use domain_suburb_stats for area trends, or domain_search_listings for comparable listings."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_domain_suburb_stats ──────────────────────────────────────────────────

export async function getDomainSuburbStats(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const suburb = String(args.suburb ?? "").trim();
    const state = String(args.state ?? "").trim();
    if (!suburb) return { error: "suburb is required." };
    if (!state) return { error: "state is required (e.g. NSW, VIC, QLD)." };

    const propertyCategory = String((args.propertyCategory ?? args.property_category) ?? "house").toLowerCase();
    const bedrooms = args.bedrooms ? Number(args.bedrooms) : undefined;

    const path = `/suburbPerformanceStatistics/${state}/${encodeURIComponent(suburb)}/${propertyCategory}${bedrooms !== undefined ? `/${bedrooms}` : ""}`;
    const data = await domainFetch(apiKey, path) as Record<string, unknown>;

    return {
      suburb,
      state,
      property_category: propertyCategory,
      bedrooms: bedrooms ?? "all",
      statistics: data,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
