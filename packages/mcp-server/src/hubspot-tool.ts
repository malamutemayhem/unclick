// HubSpot CRM integration for the UnClick MCP server.
// Uses the HubSpot REST API v3 via fetch - no external dependencies.
// Auth: a Private App access token (Authorization: Bearer). Create one at
// https://app.hubspot.com/settings/integrations/private-apps.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const HS_BASE = "https://api.hubapi.com";
const HS_SOURCE = "HubSpot CRM API v3";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("hubspot", args);
}

async function hsFetch<T>(
  token: string,
  method: string,
  path: string,
  opts?: { params?: Record<string, string>; body?: unknown },
): Promise<T> {
  const url = new URL(`${HS_BASE}${path}`);
  if (opts?.params) Object.entries(opts.params).forEach(([k, v]) => url.searchParams.set(k, v));
  const HUBSPOT_TIMEOUT_MS = Number(process.env.HUBSPOT_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HUBSPOT_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(opts?.body ? { "Content-Type": "application/json" } : {}),
      },
      body: opts?.body ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`HubSpot request timed out after ${HUBSPOT_TIMEOUT_MS}ms.`);
    }
    throw new Error(`HubSpot network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("HubSpot rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`HubSpot error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, tool: string, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: HS_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

const DEFAULT_CONTACT_PROPS = "firstname,lastname,email,company,phone,lifecyclestage";
const DEFAULT_COMPANY_PROPS = "name,domain,industry,city,country";
const DEFAULT_DEAL_PROPS = "dealname,amount,dealstage,pipeline,closedate";

// ─── Operations ───────────────────────────────────────────────────────────────

export async function hubspotListContacts(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = {
    limit: String(Math.min(100, Number(args.limit) || 25)),
    properties: String(args.properties ?? DEFAULT_CONTACT_PROPS),
  };
  if (args.after) params.after = String(args.after);
  const data = await hsFetch(token, "GET", "/crm/v3/objects/contacts", { params });
  return stamp(data, "hubspot_list_contacts", [
    "Use hubspot_get_contact for one record, or hubspot_search_contacts to filter by name or email.",
  ]);
}

export async function hubspotGetContact(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = String(args.contact_id ?? "").trim();
  if (!id) return { error: "contact_id is required." };
  const params = { properties: String(args.properties ?? DEFAULT_CONTACT_PROPS) };
  const data = await hsFetch(token, "GET", `/crm/v3/objects/contacts/${encodeURIComponent(id)}`, { params });
  return stamp(data, "hubspot_get_contact", [
    "Use hubspot_list_deals to see deals, or hubspot_list_companies for the associated company.",
  ]);
}

export async function hubspotSearchContacts(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (searches name, email, and company)." };
  const body = {
    query,
    limit: Math.min(100, Number(args.limit) || 25),
    properties: String(args.properties ?? DEFAULT_CONTACT_PROPS).split(","),
  };
  const data = await hsFetch(token, "POST", "/crm/v3/objects/contacts/search", { body });
  return stamp(data, "hubspot_search_contacts", [
    "Use hubspot_get_contact with a returned id for the full record.",
  ]);
}

export async function hubspotListCompanies(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = {
    limit: String(Math.min(100, Number(args.limit) || 25)),
    properties: String(args.properties ?? DEFAULT_COMPANY_PROPS),
  };
  if (args.after) params.after = String(args.after);
  const data = await hsFetch(token, "GET", "/crm/v3/objects/companies", { params });
  return stamp(data, "hubspot_list_companies", [
    "Use hubspot_list_deals to see open deals, or hubspot_list_contacts for people.",
  ]);
}

export async function hubspotListDeals(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = {
    limit: String(Math.min(100, Number(args.limit) || 25)),
    properties: String(args.properties ?? DEFAULT_DEAL_PROPS),
  };
  if (args.after) params.after = String(args.after);
  const data = await hsFetch(token, "GET", "/crm/v3/objects/deals", { params });
  return stamp(data, "hubspot_list_deals", [
    "Use hubspot_search_contacts to find the people on a deal.",
  ]);
}

export async function hubspotCreateContact(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const email = String(args.email ?? "").trim();
  const properties = (args.properties && typeof args.properties === "object")
    ? args.properties as Record<string, unknown>
    : {};
  if (!email && !properties.email) return { error: "email (or properties.email) is required." };
  const body = { properties: { ...(email ? { email } : {}), ...properties } };
  const data = await hsFetch(token, "POST", "/crm/v3/objects/contacts", { body });
  return stamp(data, "hubspot_create_contact", [
    "Use hubspot_get_contact with the returned id to confirm the record.",
  ]);
}
