// ConvertKit API integration for the UnClick MCP server.
// Uses the ConvertKit v3 REST API via fetch - no external dependencies.
// Users must supply an api_key (read ops) and/or api_secret (subscriber management)
// from app.convertkit.com/account_settings/advanced_settings.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const CK_API_BASE = "https://api.convertkit.com/v3";

// --- Types -------------------------------------------------------------------

interface CkSubscriber {
  id: number;
  first_name: string | null;
  email_address: string;
  state: string;
  created_at: string;
  fields: Record<string, string | null>;
}

interface CkSubscribersResponse {
  total_subscribers: number;
  page: number;
  total_pages: number;
  subscribers: CkSubscriber[];
}

interface CkForm {
  id: number;
  name: string;
  created_at: string;
  type: string;
  format: string | null;
  embed_js: string;
  embed_url: string;
  archived: boolean;
  uid: string;
}

interface CkSequence {
  id: number;
  name: string;
  hold: boolean;
  repeat: boolean;
  created_at: string;
}

interface CkTag {
  id: number;
  name: string;
  created_at: string;
}

interface CkSubscribeResponse {
  subscription: {
    id: number;
    state: string;
    created_at: string;
    source: string | null;
    referrer: string | null;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: CkSubscriber;
  };
}

// --- Auth validation ---------------------------------------------------------

function requireApiKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("convertkit", args);
}

function requireApiSecret(args: Record<string, unknown>): string | NotConnectedResult {
  const secret = String(args.api_secret ?? process.env.CONVERTKIT_API_SECRET ?? "").trim();
  if (!secret) return requireCredential("convertkit", { ...args, api_key: "" });
  return secret;
}

// --- API helpers -------------------------------------------------------------

const CONVERTKIT_TIMEOUT_MS = Number(process.env.CONVERTKIT_TIMEOUT_MS) || 15000;

async function ckGet<T>(path: string, queryParams: Record<string, string | undefined>): Promise<T> {
  const params = Object.entries(queryParams)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v!)}`)
    .join("&");
  const url = `${CK_API_BASE}${path}${params ? "?" + params : ""}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONVERTKIT_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`ConvertKit request timed out after ${CONVERTKIT_TIMEOUT_MS}ms.`);
    }
    throw new Error(`ConvertKit network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`ConvertKit rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`ConvertKit error: ${msg}`);
  }
  return data as T;
}

async function ckPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONVERTKIT_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${CK_API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`ConvertKit request timed out after ${CONVERTKIT_TIMEOUT_MS}ms.`);
    }
    throw new Error(`ConvertKit network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`ConvertKit rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`ConvertKit error: ${msg}`);
  }
  return data as T;
}

// --- Operations --------------------------------------------------------------

export async function ckListSubscribers(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiSecret = requireApiSecret(args);
    if (typeof apiSecret !== "string") return apiSecret;

    const params: Record<string, string | undefined> = { api_secret: apiSecret };
    if (args.page) params.page = String(args.page);
    if (args.from) params.from = String(args.from);
    if (args.to) params.to = String(args.to);
    if (args.updated_from) params.updated_from = String(args.updated_from);
    if (args.updated_to) params.updated_to = String(args.updated_to);
    if (args.sort_order) params.sort_order = String(args.sort_order);
    if (args.sort_field) params.sort_field = String(args.sort_field);

    const result = await ckGet<CkSubscribersResponse>("/subscribers", params);
    return stampMeta({
      total_subscribers: result.total_subscribers,
      page: result.page,
      total_pages: result.total_pages,
      count: result.subscribers.length,
      subscribers: result.subscribers.map((s) => ({
        id: s.id,
        first_name: s.first_name,
        email_address: s.email_address,
        state: s.state,
        created_at: s.created_at,
        fields: s.fields,
      })),
    }, {
      source: "Kit (ConvertKit)",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use ck_tag_subscriber to tag someone, or ck_list_tags to see your tags."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ckAddSubscriber(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const formId = String(args.form_id ?? "").trim();
    if (!formId) throw new Error("form_id is required.");
    const email = String(args.email ?? "").trim();
    if (!email) throw new Error("email is required.");

    const body: Record<string, unknown> = { api_key: apiKey, email };
    if (args.first_name) body.first_name = String(args.first_name);
    if (args.fields && typeof args.fields === "object") body.fields = args.fields;

    const result = await ckPost<CkSubscribeResponse>(`/forms/${formId}/subscribe`, body);
    const sub = result.subscription;
    return {
      subscription_id: sub.id,
      state: sub.state,
      created_at: sub.created_at,
      subscriber: {
        id: sub.subscriber.id,
        first_name: sub.subscriber.first_name,
        email_address: sub.subscriber.email_address,
        state: sub.subscriber.state,
      },
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ckListForms(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const result = await ckGet<{ forms: CkForm[] }>("/forms", { api_key: apiKey });
    const forms = result.forms ?? [];
    return {
      count: forms.length,
      forms: forms.map((f) => ({
        id: f.id,
        name: f.name,
        type: f.type,
        format: f.format,
        archived: f.archived,
        embed_url: f.embed_url,
        created_at: f.created_at,
      })),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ckListSequences(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const result = await ckGet<{ courses: CkSequence[] }>("/sequences", { api_key: apiKey });
    const sequences = result.courses ?? [];
    return {
      count: sequences.length,
      sequences: sequences.map((s) => ({
        id: s.id,
        name: s.name,
        hold: s.hold,
        repeat: s.repeat,
        created_at: s.created_at,
      })),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ckListTags(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const result = await ckGet<{ tags: CkTag[] }>("/tags", { api_key: apiKey });
    const tags = result.tags ?? [];
    return {
      count: tags.length,
      tags: tags.map((t) => ({
        id: t.id,
        name: t.name,
        created_at: t.created_at,
      })),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ckTagSubscriber(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const tagId = String(args.tag_id ?? "").trim();
    if (!tagId) throw new Error("tag_id is required.");
    const email = String(args.email ?? "").trim();
    if (!email) throw new Error("email is required.");

    const body: Record<string, unknown> = { api_key: apiKey, email };
    if (args.first_name) body.first_name = String(args.first_name);

    const result = await ckPost<CkSubscribeResponse>(`/tags/${tagId}/subscribe`, body);
    const sub = result.subscription;
    return {
      subscription_id: sub.id,
      state: sub.state,
      created_at: sub.created_at,
      subscriber: {
        id: sub.subscriber.id,
        first_name: sub.subscriber.first_name,
        email_address: sub.subscriber.email_address,
        state: sub.subscriber.state,
      },
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
