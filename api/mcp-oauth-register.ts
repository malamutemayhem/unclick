import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomBytes } from "node:crypto";
import { isSafeOAuthRedirectUri } from "./lib/mcp-oauth.js";

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });

  const body = (req.body ?? {}) as Record<string, unknown>;
  const redirectUris = asStringArray(body.redirect_uris);
  if (redirectUris.length > 0 && redirectUris.some((uri) => !isSafeOAuthRedirectUri(uri))) {
    return res.status(400).json({ error: "redirect_uris must be https, localhost, or 127.0.0.1 URLs" });
  }

  const now = Math.floor(Date.now() / 1000);
  return res.status(201).json({
    client_id: `unclick-mcp-${randomBytes(16).toString("base64url")}`,
    client_id_issued_at: now,
    client_name: typeof body.client_name === "string" ? body.client_name : "MCP client",
    redirect_uris: redirectUris,
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    token_endpoint_auth_method: "none",
  });
}
