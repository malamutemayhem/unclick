// ─── AI provider balance ─────────────────────────────────────────────────
//
// Returns the remaining credit/balance for an account's AI provider key, for the
// providers that expose it. OpenRouter is the one popular provider with a usable
// per-key balance API; the big labs (OpenAI, Anthropic, Google, ...) do not
// expose a wallet balance to a normal API key, so those return { supported:false }.
//
// The key is read from the account-scoped (server-scheme) vault row and decrypted
// with the server secret - same path as api/chat.ts - and is used only to call the
// provider's balance endpoint server-side. It is never returned or logged.
//
// GET /api/ai-provider-balance?platform=openrouter[&label=...]

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveAccountLane } from "./lib/account-lane.js";
import { readProviderKeyForAccount, type EncryptedCredential } from "./lib/chat-crypto.js";

async function fetchWithTimeout(url: string, init: RequestInit, ms = 8000): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function fetchServerVaultRow(
  supabaseUrl: string,
  serviceKey: string,
  laneHash: string,
  slug: string,
  label: string | null,
): Promise<EncryptedCredential | null> {
  let url =
    `${supabaseUrl}/rest/v1/user_credentials` +
    `?lane_hash=eq.${encodeURIComponent(laneHash)}` +
    `&enc_scheme=eq.server` +
    `&platform_slug=eq.${encodeURIComponent(slug)}` +
    `&select=encryption_iv,encryption_tag,encrypted_data,encryption_salt`;
  if (label) url += `&label=eq.${encodeURIComponent(label)}`;
  url += `&order=label.asc.nullsfirst&limit=1`;
  const r = await fetch(url, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!r.ok) return null;
  const rows = (await r.json().catch(() => null)) as EncryptedCredential[] | null;
  return rows && rows.length > 0 ? rows[0] : null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Cache-Control", "private, no-store");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "GET required" });

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const aiSecret = process.env.UNCLICK_AI_KEY_SECRET || process.env.UNCLICK_AI_KEY_SECRET_V2;
  if (!supabaseUrl || !serviceKey || !aiSecret) {
    return res.status(500).json({ error: "Server not configured." });
  }

  const lane = await resolveAccountLane(req.headers.authorization, supabaseUrl, serviceKey);
  if (!lane) return res.status(401).json({ error: "Sign in to view balances." });

  const platform = String((req.query.platform ?? "") || "").trim();
  const label = req.query.label ? String(req.query.label) : null;
  if (!platform) return res.status(400).json({ error: "platform is required." });

  // Only OpenRouter exposes a usable per-key balance today.
  if (platform !== "openrouter") {
    return res.status(200).json({ supported: false });
  }

  let providerKey: string | null = null;
  try {
    const row = await fetchServerVaultRow(supabaseUrl, serviceKey, lane, platform, label);
    if (row) providerKey = readProviderKeyForAccount(aiSecret, lane, row);
  } catch {
    providerKey = null;
  }
  if (!providerKey) return res.status(404).json({ error: "No key for that provider." });

  try {
    const keyRes = await fetchWithTimeout("https://openrouter.ai/api/v1/key", {
      headers: { Authorization: `Bearer ${providerKey}` },
    });
    if (!keyRes.ok) {
      return res.status(200).json({ supported: true, provider: "openrouter", error: "Balance lookup failed." });
    }
    const kd = ((await keyRes.json().catch(() => ({}))) as { data?: Record<string, unknown> }).data ?? {};
    let used = typeof kd.usage === "number" ? (kd.usage as number) : null;
    let limit = typeof kd.limit === "number" ? (kd.limit as number) : null;
    let remaining =
      typeof kd.limit_remaining === "number"
        ? (kd.limit_remaining as number)
        : limit != null && used != null
          ? limit - used
          : null;

    // No per-key limit set: fall back to the account credit balance.
    if (limit == null) {
      try {
        const cRes = await fetchWithTimeout("https://openrouter.ai/api/v1/credits", {
          headers: { Authorization: `Bearer ${providerKey}` },
        });
        if (cRes.ok) {
          const cd = ((await cRes.json().catch(() => ({}))) as { data?: Record<string, unknown> }).data ?? {};
          const total = typeof cd.total_credits === "number" ? (cd.total_credits as number) : null;
          const usage = typeof cd.total_usage === "number" ? (cd.total_usage as number) : null;
          if (total != null && usage != null) {
            limit = total;
            used = usage;
            remaining = total - usage;
          }
        }
      } catch {
        // keep the key-level numbers
      }
    }

    return res.status(200).json({
      supported: true,
      provider: "openrouter",
      used,
      limit,
      remaining,
      is_free_tier: Boolean(kd.is_free_tier),
      currency: "USD",
    });
  } catch {
    return res.status(200).json({ supported: true, provider: "openrouter", error: "Balance lookup failed." });
  }
}
