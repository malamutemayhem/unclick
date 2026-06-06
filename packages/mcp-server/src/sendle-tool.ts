// Sendle AU courier integration.
// Quote, order, and track domestic and international courier shipments.
// Docs: https://developers.sendle.com/
// Auth: SENDLE_ID + SENDLE_API_KEY env vars (HTTP Basic Auth).
// Base URL: https://api.sendle.com/api/

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const SENDLE_BASE = "https://api.sendle.com/api";

interface SendleAuth {
  id: string;
  key: string;
}

function getAuth(args: Record<string, unknown>): SendleAuth | NotConnectedResult {
  const id = String(args.sendle_id ?? process.env.SENDLE_ID ?? "").trim();
  const key = String(args.api_key ?? process.env.SENDLE_API_KEY ?? "").trim();
  if (!id || !key) return notConnectedFor("sendle");
  return { id, key };
}

function basicAuth(auth: SendleAuth): string {
  return "Basic " + Buffer.from(`${auth.id}:${auth.key}`).toString("base64");
}

const SENDLE_TIMEOUT_MS = Number(process.env.SENDLE_TIMEOUT_MS) || 10000;

async function sendleFetch(
  auth: SendleAuth,
  path: string,
  method = "GET",
  body?: unknown
): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SENDLE_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${SENDLE_BASE}${path}`, {
      method,
      headers: {
        Authorization: basicAuth(auth),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Sendle API request timed out after ${SENDLE_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Sendle API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401 || res.status === 403) throw new Error("Invalid Sendle credentials.");
  if (res.status === 404) throw new Error("Resource not found.");
  if (res.status === 422) {
    const text = await res.text().catch(() => "");
    throw new Error(`Sendle validation error: ${text.slice(0, 300)}`);
  }
  if (res.status === 429) throw new Error("Sendle API rate limit exceeded.");
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Sendle API HTTP ${res.status}${text ? `: ${text.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<unknown>;
}

// ─── get_sendle_quote ─────────────────────────────────────────────────────────

export async function getSendleQuote(args: Record<string, unknown>): Promise<unknown> {
  try {
    const auth = getAuth(args);
    if ("not_connected" in auth) return auth;
    const pickupPostcode = String(args.pickup_postcode ?? "").trim();
    const deliveryPostcode = String(args.delivery_postcode ?? "").trim();
    if (!pickupPostcode) return { error: "pickup_postcode is required." };
    if (!deliveryPostcode) return { error: "delivery_postcode is required." };

    const params = new URLSearchParams({
      "pickup_suburb": String(args.pickup_suburb ?? ""),
      "pickup_postcode": pickupPostcode,
      "pickup_country": String(args.pickup_country ?? "AU"),
      "delivery_suburb": String(args.delivery_suburb ?? ""),
      "delivery_postcode": deliveryPostcode,
      "delivery_country": String(args.delivery_country ?? "AU"),
      "weight_value": String((args.weight_value ?? args.weight_kg) ?? "1"),
      "weight_units": "kg",
    });

    if (args.volume_l) params.set("volume_value", String(args.volume_l));
    if (args.volume_l) params.set("volume_units", "l");

    const data = await sendleFetch(auth, `/quote?${params}`) as Array<Record<string, unknown>>;

    return {
      pickup_postcode: pickupPostcode,
      delivery_postcode: deliveryPostcode,
      weight_kg: (args.weight_value ?? args.weight_kg) ?? 1,
      quotes: Array.isArray(data)
        ? data.map((q) => ({
            plan: q["plan_name"],
            product: q["product"],
            eta_days_min: ((q["eta"] as Record<string, unknown>)?.["days_range"] as unknown[])?.[0],
            eta_days_max: ((q["eta"] as Record<string, unknown>)?.["days_range"] as unknown[])?.[1],
            price_aud: (q["quote"] as Record<string, unknown>)?.["gross"],
            price_aud_tax: (q["quote"] as Record<string, unknown>)?.["tax"],
          }))
        : [],
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── create_sendle_order ──────────────────────────────────────────────────────

export async function createSendleOrder(args: Record<string, unknown>): Promise<unknown> {
  try {
    const auth = getAuth(args);
    if ("not_connected" in auth) return auth;

    const body: Record<string, unknown> = {
      pickup_date: args.pickup_date,
      description: args.description ?? "Parcel",
      weight: { value: Number(args.weight_kg ?? 1), units: "kg" },
      sender: args.sender,
      receiver: args.receiver,
    };

    if (args.customer_reference) body["customer_reference"] = args.customer_reference;
    if (args.metadata) body["metadata"] = args.metadata;

    const data = await sendleFetch(auth, "/orders", "POST", body) as Record<string, unknown>;

    return {
      order_id: data["order_id"],
      state: data["state"],
      tracking_url: data["tracking_url"],
      label_url: (data["labels"] as Array<Record<string, unknown>>)?.[0]?.["url"],
      sendle_reference: data["sendle_reference"],
      customer_reference: data["customer_reference"],
      pickup_date: data["pickup_date"],
      eta: data["eta"],
      price_aud: (data["quote"] as Record<string, unknown>)?.["gross"],
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── track_sendle_parcel ──────────────────────────────────────────────────────

export async function trackSendleParcel(args: Record<string, unknown>): Promise<unknown> {
  try {
    const auth = getAuth(args);
    if ("not_connected" in auth) return auth;
    const ref = String((args.tracking_id ?? args.tracking_ref) ?? args.sendle_reference ?? "").trim();
    if (!ref) return { error: "tracking_ref is required (Sendle reference number)." };

    const data = await sendleFetch(auth, `/tracking/${encodeURIComponent(ref)}`) as Record<string, unknown>;

    return stampMeta({
      tracking_ref: ref,
      state: data["state"],
      tracking_events: (data["tracking_events"] as Array<Record<string, unknown>> | undefined)?.map((e) => ({
        event_type: e["event_type"],
        description: e["description"],
        scan_time: e["scan_time"],
        location: e["location"],
      })),
      estimated_delivery: data["estimated_delivery"],
    }, {
      source: "Sendle",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use get_sendle_quote for pricing, or create_sendle_order to book."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
