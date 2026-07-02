import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createMcpOAuthAccessToken,
  createMcpOAuthRefreshToken,
  MCP_OAUTH_RESOURCE,
  verifyMcpOAuthToken,
  verifyPkceS256,
} from "./lib/mcp-oauth.js";

function bodyParams(body: unknown): URLSearchParams {
  if (typeof body === "string") return new URLSearchParams(body);
  if (body && typeof body === "object") {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
      if (typeof value === "string") params.set(key, value);
    }
    return params;
  }
  return new URLSearchParams();
}

function oauthError(res: VercelResponse, status: number, error: string, description?: string) {
  return res.status(status).json({
    error,
    ...(description ? { error_description: description } : {}),
  });
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return oauthError(res, 405, "invalid_request", "POST required");

  const params = bodyParams(req.body);
  const grantType = params.get("grant_type") ?? "";

  if (grantType === "authorization_code") {
    const code = params.get("code") ?? "";
    const redirectUri = params.get("redirect_uri") ?? "";
    const clientId = params.get("client_id") ?? "";
    const codeVerifier = params.get("code_verifier") ?? "";
    const resource = params.get("resource") ?? MCP_OAUTH_RESOURCE;

    if (resource !== MCP_OAUTH_RESOURCE) return oauthError(res, 400, "invalid_target", "Invalid resource");

    let payload;
    try {
      payload = verifyMcpOAuthToken(code, "code", process.env);
    } catch (err) {
      return oauthError(res, 400, "invalid_grant", err instanceof Error ? err.message : "Invalid code");
    }

    if (payload.redirect_uri !== redirectUri || payload.client_id !== clientId) {
      return oauthError(res, 400, "invalid_grant", "Authorization code was issued for a different client");
    }
    if (!verifyPkceS256(codeVerifier, payload.code_challenge ?? "")) {
      return oauthError(res, 400, "invalid_grant", "PKCE verification failed");
    }

    const access = createMcpOAuthAccessToken({ scope: payload.scope, userId: payload.sub }, process.env);
    const refresh = createMcpOAuthRefreshToken({ scope: payload.scope, userId: payload.sub }, process.env);
    return res.status(200).json({
      token_type: "Bearer",
      scope: payload.scope,
      access_token: access.access_token,
      expires_in: access.expires_in,
      refresh_token: refresh.refresh_token,
    });
  }

  if (grantType === "refresh_token") {
    const refreshToken = params.get("refresh_token") ?? "";
    let payload;
    try {
      payload = verifyMcpOAuthToken(refreshToken, "refresh", process.env);
    } catch (err) {
      return oauthError(res, 400, "invalid_grant", err instanceof Error ? err.message : "Invalid refresh token");
    }
    const access = createMcpOAuthAccessToken({ scope: payload.scope, userId: payload.sub }, process.env);
    const refresh = createMcpOAuthRefreshToken({ scope: payload.scope, userId: payload.sub }, process.env);
    return res.status(200).json({
      token_type: "Bearer",
      scope: payload.scope,
      access_token: access.access_token,
      expires_in: access.expires_in,
      refresh_token: refresh.refresh_token,
    });
  }

  return oauthError(res, 400, "unsupported_grant_type", "Use authorization_code or refresh_token");
}
