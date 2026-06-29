// Temporary diagnostic endpoint.
//
// Reports which AI-key / Supabase env var NAMES the running serverless function
// can actually see, plus each value's LENGTH. It never returns any value, only
// names and lengths, so it is safe to expose briefly while debugging the
// "UNCLICK_AI_KEY_SECRET missing" error. Delete this file once the env is fixed.

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  const want = [
    "UNCLICK_AI_KEY_SECRET",
    "UNCLICK_AI_KEY_SECRET_V2",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];

  const present: Record<string, boolean> = {};
  const lengths: Record<string, number> = {};
  for (const k of want) {
    const v = process.env[k];
    present[k] = Boolean(v && v.trim());
    lengths[k] = (v ?? "").length;
  }

  // Every env var name that looks related, so a typo'd or space-padded variant
  // of the real name shows up here (names only, never values).
  const matchingKeys = Object.keys(process.env)
    .filter((k) => /UNCLICK|SECRET/i.test(k))
    .sort();

  return res.status(200).json({ present, lengths, matchingKeys });
}
