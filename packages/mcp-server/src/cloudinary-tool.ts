// Cloudinary integration for the UnClick MCP server.
// Uses the Cloudinary Admin API via fetch - no external dependencies.
// Auth: Basic auth with api_key + api_secret, scoped to your cloud_name
// (Dashboard at https://console.cloudinary.com/).

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const CLOUDINARY_SOURCE = "Cloudinary Admin API";

interface CloudinaryCreds {
  baseUrl: string;
  authHeader: string;
}

function requireCreds(args: Record<string, unknown>): CloudinaryCreds | NotConnectedResult {
  const cloudName = String(args.cloud_name ?? process.env.CLOUDINARY_CLOUD_NAME ?? "").trim();
  const apiKey = String(args.api_key ?? process.env.CLOUDINARY_API_KEY ?? "").trim();
  const apiSecret = String(args.api_secret ?? process.env.CLOUDINARY_API_SECRET ?? "").trim();
  if (!cloudName || !apiKey || !apiSecret) return notConnectedFor("cloudinary");
  return {
    baseUrl: `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}`,
    authHeader: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
  };
}

async function clFetch<T>(creds: CloudinaryCreds, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${creds.baseUrl}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const CLOUDINARY_TIMEOUT_MS = Number(process.env.CLOUDINARY_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLOUDINARY_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Authorization: creds.authHeader, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Cloudinary request timed out after ${CLOUDINARY_TIMEOUT_MS}ms.`);
    throw new Error(`Cloudinary network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Cloudinary rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Cloudinary error (${res.status}): ${(data.error as { message?: string })?.message ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: CLOUDINARY_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function cloudinaryListResources(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const type = String(args.resource_type ?? "image");
  const params: Record<string, string> = { max_results: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.prefix) params.prefix = String(args.prefix);
  const data = await clFetch(creds, `/resources/${encodeURIComponent(type)}`, params);
  return stamp(data, ["Use cloudinary_get_usage to see your storage and transformation quota."]);
}

export async function cloudinaryGetUsage(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const data = await clFetch(creds, "/usage");
  return stamp(data, ["Use cloudinary_list_resources to browse your uploaded media."]);
}
