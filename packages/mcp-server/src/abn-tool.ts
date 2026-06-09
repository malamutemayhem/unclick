// Australian Business Registry (ABN Lookup) integration.
// Uses the official ABR JSON web services. Base URL: https://abr.business.gov.au/json/
//
// Authentication: the ABR web services accept an authentication GUID. We read it
// from the ABN_GUID environment variable so it is a SHARED, SERVER-SIDE secret.
// Every user's lookup authenticates with the deployment's single GUID, which
// keeps ABN Lookup a public, built-in tool that needs no per-user key or setup.
// The GUID is never required from the caller (an optional `guid` arg can
// override it for self-hosters). Set ABN_GUID in the server environment; never
// commit it.

import { stampMeta } from "./connector-meta.js";

const ABN_BASE = "https://abr.business.gov.au/json";
const ABN_TIMEOUT_MS = Number(process.env.ABN_TIMEOUT_MS) || 10000;

// Shared server-side GUID (or an optional per-call override). Empty when
// unconfigured; the request is still attempted (public/unauthenticated).
function abnGuid(args: Record<string, unknown>): string {
  return String(args.guid ?? process.env.ABN_GUID ?? "").trim();
}

// ─── JSONP helper ─────────────────────────────────────────────────────────────

async function fetchJsonp(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ABN_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`ABR API request timed out after ${ABN_TIMEOUT_MS}ms.`);
    }
    throw new Error(`ABR API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`ABR API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    throw new Error(`ABR API HTTP ${res.status}`);
  }
  const text = await res.text();
  // Strip JSONP wrapper: callback({...}) or callback([...])
  const match = text.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(([\s\S]*)\)\s*;?\s*$/);
  if (!match) {
    throw new Error("Unexpected ABR API response format (not JSONP).");
  }
  try {
    return JSON.parse(match[1]) as unknown;
  } catch {
    throw new Error("ABR API returned invalid JSON inside JSONP wrapper.");
  }
}

// The ABR JSON AbnDetails endpoint returns BusinessName (trading names) as an
// array of plain strings. Be defensive in case an object shape is ever seen.
function businessNames(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((b) =>
      typeof b === "string"
        ? b
        : String((b as Record<string, unknown>)?.["OrganisationName"] ?? (b as Record<string, unknown>)?.["Name"] ?? "").trim(),
    )
    .filter(Boolean);
}

// ─── abn_lookup ───────────────────────────────────────────────────────────────
// GET /AbnDetails.aspx?abn={abn}&guid={guid}&callback=callback
// Returns entity name, type, ABN status, GST status, main business location.

export async function abnLookup(args: Record<string, unknown>): Promise<unknown> {
  const abn = String(args.abn ?? "").trim().replace(/\s/g, "");
  if (!abn) return { error: "abn is required (11-digit Australian Business Number)." };

  const params = new URLSearchParams({ abn, callback: "callback" });
  const guid = abnGuid(args);
  if (guid) params.set("guid", guid);

  const url = `${ABN_BASE}/AbnDetails.aspx?${params}`;
  const data = await fetchJsonp(url) as Record<string, unknown>;

  if (data["Message"]) {
    const msg = String(data["Message"]);
    if (msg && msg.toLowerCase() !== "no record found") {
      return { error: msg };
    }
  }

  if (!data["Abn"]) {
    return { error: "No business found for that ABN.", abn };
  }

  return stampMeta({
    abn: data["Abn"],
    entity_name: data["EntityName"] ?? null,
    entity_type_code: data["EntityTypeCode"] ?? null,
    entity_type: data["EntityTypeName"] ?? null,
    abn_status: data["AbnStatus"] ?? null,
    abn_status_effective_from: data["AbnStatusEffectiveFrom"] ?? null,
    gst_registered_from: data["Gst"] ?? null,
    gst_status: data["Gst"] ? "Registered" : "Not registered",
    acn: data["Acn"] || null,
    address_state: data["AddressState"] ?? null,
    address_postcode: data["AddressPostcode"] ?? null,
    business_names: businessNames(data["BusinessName"]),
  }, {
    source: "Australian Business Register",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use abn_search to find businesses by name."],
  });
}

// ─── abn_search ───────────────────────────────────────────────────────────────
// GET /MatchingNames.aspx?name={name}&maxResults={n}&guid={guid}&callback=callback
// The documented ABR JSON name-search endpoint. Returns matching businesses with
// their ABNs. (Requires the GUID for full results; supplied server-side.)

export async function abnSearch(args: Record<string, unknown>): Promise<unknown> {
  const name = String(args.name ?? "").trim();
  if (!name) return { error: "name is required." };

  const maxResults = Math.min(50, Math.max(1, Number(args.max_results) || 20));
  const params = new URLSearchParams({ name, maxResults: String(maxResults), callback: "callback" });
  if (args.postcode) params.set("postcode", String(args.postcode));
  const guid = abnGuid(args);
  if (guid) params.set("guid", guid);

  const url = `${ABN_BASE}/MatchingNames.aspx?${params}`;
  const data = await fetchJsonp(url) as Record<string, unknown>;

  if (data["Message"]) {
    const msg = String(data["Message"]);
    if (msg) return { error: msg };
  }

  const names = Array.isArray(data["Names"]) ? data["Names"] as Array<Record<string, unknown>> : [];

  return stampMeta({
    query: name,
    count: names.length,
    results: names.map((n) => ({
      abn: n["Abn"],
      name: n["Name"],
      name_type: n["NameType"],
      abn_status: n["AbnStatus"],
      is_current: n["IsCurrent"],
      state: n["State"] ?? null,
      postcode: n["Postcode"] ?? null,
      score: n["Score"] ?? null,
    })),
  }, {
    source: "Australian Business Register",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use abn_lookup with a returned abn for full registration details."],
  });
}
