import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createMcpOAuthClientId, isSafeOAuthRedirectUri } from "./lib/mcp-oauth.js";

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [
    ...new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ].slice(0, 10);
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

  const clientName = typeof body.client_name === "string" ? body.client_name : "MCP client";
  let registeredClient;
  try {
    registeredClient = createMcpOAuthClientId({ clientName, redirectUris }, process.env);
  } catch {
    return res.status(500).json({ error: "MCP OAuth signing secret is not configured" });
  }

  return res.status(201).json({
    client_id: registeredClient.client_id,
    client_id_issued_at: registeredClient.client_id_issued_at,
    client_name: clientName,
    redirect_uris: redirectUris,
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    token_endpoint_auth_method: "none",
  });
}
