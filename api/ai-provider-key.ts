// ─── AI provider keys (account-scoped, login-authed) ───────────────────────
//
// Saves and lists the website chat's AI provider keys (OpenRouter, Anthropic,
// ...). Unlike BackstagePass credentials, these are:
//   - authed by the logged-in SESSION (or a uc_/agt_ key) - no cached key, and
//   - encrypted with a stable SERVER secret bound to the account lane.
// So recycling the master api key never touches them: the lane and the secret
// stay constant. Rows are written to user_credentials with enc_scheme='server'.
//
// Requires env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, UNCLICK_AI_KEY_SECRET
// (a long random string, set once and NEVER changed - changing it makes every
// stored AI key undecryptable).

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveAccountLane } from "./lib/account-lane.js";
import { encryptForAccount } from "./lib/chat-crypto.js";

function sbHeaders(serviceKey: string): Record<string, string> {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Cache-Control", "private, no-store");
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // Fallback to a V2 name so a typo or stray character in the original env var
  // name can be sidestepped without another code change.
  const aiSecret = process.env.UNCLICK_AI_KEY_SECRET || process.env.UNCLICK_AI_KEY_SECRET_V2;
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: "Server not configured." });
  }
  if (!aiSecret) {
    return res.status(500).json({ error: "AI key storage is not configured (UNCLICK_AI_KEY_SECRET missing)." });
  }

  const lane = await resolveAccountLane(req.headers.authorization, supabaseUrl, serviceKey);
  if (!lane) return res.status(401).json({ error: "Sign in to manage AI keys." });

  // ── GET: list this account's AI provider keys (metadata only) ────────────
  if (req.method === "GET") {
    const url =
      `${supabaseUrl}/rest/v1/user_credentials?lane_hash=eq.${encodeURIComponent(lane)}` +
      `&enc_scheme=eq.server` +
      `&select=id,platform_slug,label,is_valid,last_tested_at,last_used_at,created_at,updated_at` +
      `&order=created_at.desc`;
    const r = await fetch(url, { headers: sbHeaders(serviceKey) });
    if (!r.ok) return res.status(502).json({ error: "Lookup failed." });
    const rows = (await r.json().catch(() => [])) as unknown[];
    return res.status(200).json({ providers: Array.isArray(rows) ? rows : [] });
  }

  // ── POST: save an AI provider key (encrypted with the account secret) ─────
  if (req.method === "POST") {
    const body = req.body as { platform?: string; api_key?: string; label?: string | null } | undefined;
    const platform = String(body?.platform ?? "").trim();
    const providerKey = String(body?.api_key ?? "").trim();
    const label = body?.label && String(body.label).trim() ? String(body.label).trim() : null;
    if (!platform) return res.status(400).json({ error: "platform is required." });
    if (!providerKey) return res.status(400).json({ error: "api_key is required." });

    const enc = encryptForAccount(aiSecret, lane, JSON.stringify({ api_key: providerKey }));
    const now = new Date().toISOString();
    const row = {
      api_key_hash:    lane, // server-scheme rows are stamped to the stable lane
      lane_hash:       lane,
      enc_scheme:      "server",
      platform_slug:   platform,
      label,
      encrypted_data:  enc.encrypted_data,
      encryption_iv:   enc.encryption_iv,
      encryption_tag:  enc.encryption_tag,
      encryption_salt: enc.encryption_salt,
      is_valid:        true,
      updated_at:      now,
    };

    const r = await fetch(
      `${supabaseUrl}/rest/v1/user_credentials?on_conflict=api_key_hash,platform_slug,label`,
      {
        method: "POST",
        headers: { ...sbHeaders(serviceKey), Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify(row),
      },
    );
    if (!r.ok) {
      const detail = (await r.text().catch(() => "")).slice(0, 200);
      return res.status(r.status).json({ error: "Failed to save AI key.", detail });
    }
    return res.status(200).json({ success: true, platform, label });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
