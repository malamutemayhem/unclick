import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHash, randomBytes } from "node:crypto";
import { createOAuthStateToken } from "./oauth-state.js";

const ALLOWED_PLATFORMS = new Set([
  "github", "vercel", "supabase", "xero", "reddit", "shopify",
  "spotify", "dropbox", "google-workspace", "microsoft-graph",
  "higgsfield",
]);

const REDIRECT_URI_ENV: Record<string, string> = {
  github:            "GITHUB_REDIRECT_URI",
  vercel:            "VERCEL_REDIRECT_URI",
  supabase:          "SUPABASE_OAUTH_REDIRECT_URI",
  xero:              "XERO_REDIRECT_URI",
  reddit:            "REDDIT_REDIRECT_URI",
  shopify:           "SHOPIFY_REDIRECT_URI",
  spotify:           "SPOTIFY_REDIRECT_URI",
  dropbox:           "DROPBOX_REDIRECT_URI",
  "google-workspace": "GOOGLE_WORKSPACE_REDIRECT_URI",
  "microsoft-graph": "MICROSOFT_GRAPH_REDIRECT_URI",
};

const CLIENT_ID_ENV: Record<string, string> = {
  github:            "GITHUB_CLIENT_ID",
  vercel:            "VERCEL_CLIENT_ID",
  supabase:          "SUPABASE_OAUTH_CLIENT_ID",
  xero:              "XERO_CLIENT_ID",
  reddit:            "REDDIT_CLIENT_ID",
  shopify:           "SHOPIFY_CLIENT_ID",
  spotify:           "SPOTIFY_CLIENT_ID",
  dropbox:           "DROPBOX_CLIENT_ID",
  "google-workspace": "GOOGLE_WORKSPACE_CLIENT_ID",
  "microsoft-graph": "MICROSOFT_GRAPH_CLIENT_ID",
};

const CLIENT_SECRET_ENV: Record<string, string> = {
  github:            "GITHUB_CLIENT_SECRET",
  vercel:            "VERCEL_CLIENT_SECRET",
  supabase:          "SUPABASE_OAUTH_CLIENT_SECRET",
  xero:              "XERO_CLIENT_SECRET",
  reddit:            "REDDIT_CLIENT_SECRET",
  shopify:           "SHOPIFY_CLIENT_SECRET",
  spotify:           "SPOTIFY_CLIENT_SECRET",
  dropbox:           "DROPBOX_CLIENT_SECRET",
  "google-workspace": "GOOGLE_WORKSPACE_CLIENT_SECRET",
  "microsoft-graph": "MICROSOFT_GRAPH_CLIENT_SECRET",
};

const OAUTH_API_KEY_COOKIE = "unclick_oauth_api_key";
const OAUTH_PKCE_VERIFIER_COOKIE = "unclick_oauth_pkce_verifier";
const HIGGSFIELD_MCP_OAUTH_COOKIE = "unclick_higgsfield_mcp_oauth";
const OAUTH_COOKIE_MAX_AGE_SECONDS = 10 * 60;
const GITHUB_CANONICAL_REDIRECT_URI = "https://unclick.world/api/oauth-callback";
const PKCE_PLATFORMS = new Set(["vercel", "supabase"]);
const OPTIONAL_CLIENT_SECRET_PLATFORMS = new Set(["vercel"]);
const PLATFORM_LABELS: Record<string, string> = {
  github: "GitHub",
  vercel: "Vercel",
  supabase: "Supabase",
  xero: "Xero",
  reddit: "Reddit",
  shopify: "Shopify",
  spotify: "Spotify",
  dropbox: "Dropbox",
  "google-workspace": "Google Workspace",
  "microsoft-graph": "Microsoft Graph",
};
const UNCLICK_APP_ORIGIN = "https://unclick.world";
const HIGGSFIELD_MCP_REGISTER_URL = "https://mcp.higgsfield.ai/oauth2/register";
const HIGGSFIELD_MCP_AUTHORIZE_URL = "https://mcp.higgsfield.ai/oauth2/authorize";
const HIGGSFIELD_MCP_RESOURCE = "https://mcp.higgsfield.ai";
const HIGGSFIELD_MCP_SCOPE = "openid email offline_access";

function isValidAccountKey(value: string): boolean {
  return value.startsWith("uc_") || value.startsWith("agt_");
}

function serializeOAuthApiKeyCookie(apiKey: string): string {
  return [
    `${OAUTH_API_KEY_COOKIE}=${encodeURIComponent(apiKey)}`,
    "Path=/api/oauth-callback",
    `Max-Age=${OAUTH_COOKIE_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

function serializePkceVerifierCookie(codeVerifier: string): string {
  return [
    `${OAUTH_PKCE_VERIFIER_COOKIE}=${encodeURIComponent(codeVerifier)}`,
    "Path=/api/oauth-callback",
    `Max-Age=${OAUTH_COOKIE_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

function serializeHiggsfieldMcpOAuthCookie(value: string): string {
  return [
    `${HIGGSFIELD_MCP_OAUTH_COOKIE}=${encodeURIComponent(value)}`,
    "Path=/api/oauth-callback",
    `Max-Age=${OAUTH_COOKIE_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

function createPkcePair(): { codeVerifier: string; codeChallenge: string } {
  const codeVerifier = randomBytes(32).toString("base64url");
  const codeChallenge = createHash("sha256").update(codeVerifier).digest("base64url");
  return { codeVerifier, codeChallenge };
}

function base64UrlJson(value: unknown): string {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

function pkceChallenge(verifier: string): string {
  return createHash("sha256").update(verifier, "utf8").digest("base64url");
}

function requestOrigin(req: VercelRequest): string {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin.trim().replace(/\/+$/, "") : "";
  if (/^https:\/\/unclick\.world$/i.test(origin)) return origin;
  if (/^https:\/\/[a-z0-9.-]+\.vercel\.app$/i.test(origin)) return origin;
  return UNCLICK_APP_ORIGIN;
}

function resolveRedirectUri(platform: string, redirectUriEnv: string, env: NodeJS.ProcessEnv): string {
  const redirectUri = (env[redirectUriEnv] ?? "").trim();

  if (platform === "github") {
    try {
      const url = new URL(redirectUri);
      if (url.hostname === "unclick.world" && url.pathname === "/connect/github") {
        return GITHUB_CANONICAL_REDIRECT_URI;
      }
    } catch {
      // Fall through and let the missing/invalid env value fail below.
    }
  }

  return redirectUri;
}

type OAuthSetupMissing = "client_id" | "client_secret" | "redirect_uri" | "state_secret";

const MISSING_LABELS: Record<OAuthSetupMissing, string> = {
  client_id:     "client ID",
  client_secret: "client secret",
  redirect_uri:  "redirect URI",
  state_secret:  "OAuth state secret",
};

function formatMissing(fields: OAuthSetupMissing[]): string {
  const labels = fields.map((field) => MISSING_LABELS[field]);
  if (labels.length <= 1) return labels[0] ?? "OAuth setup";
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

function providerSetupPending(res: VercelResponse, platform: string, missing: OAuthSetupMissing[]) {
  const label = PLATFORM_LABELS[platform] ?? platform;
  const missingText = formatMissing(missing);
  return res.status(503).json({
    error: `${label} login is not switched on yet. Missing ${missingText}. Use the token fallback for now, or try again after the login setup is finished.`,
    setup_pending: true,
    provider: platform,
    missing: missing[0],
    missing_fields: missing,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const { platform, store, api_key } = (req.body ?? {}) as {
    platform?: string;
    store?: string;
    api_key?: string;
  };

  if (!platform || !ALLOWED_PLATFORMS.has(platform)) {
    return res.status(400).json({ error: "Unsupported OAuth platform." });
  }
  if (!api_key || !isValidAccountKey(api_key)) {
    return res.status(400).json({ error: "A private UnClick account key is required." });
  }

  const normalizedStore =
    platform === "shopify" && typeof store === "string"
      ? store.trim().replace(/\.myshopify\.com$/i, "")
      : undefined;

  if (platform === "shopify" && !normalizedStore) {
    return res.status(400).json({ error: "store is required for Shopify." });
  }

  try {
    if (platform === "higgsfield") {
      const redirectUri = `${requestOrigin(req)}/api/oauth-callback`;
      const state = createOAuthStateToken({
        platform,
        redirectPath: `/connect/${platform}`,
        env: process.env,
      });
      const codeVerifier = randomBytes(48).toString("base64url");
      const codeChallenge = pkceChallenge(codeVerifier);

      const registerRes = await fetch(HIGGSFIELD_MCP_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_name: "UnClick Higgsfield MCP",
          redirect_uris: [redirectUri],
          grant_types: ["authorization_code", "refresh_token"],
          response_types: ["code"],
          token_endpoint_auth_method: "none",
        }),
      });
      const registration = (await registerRes.json().catch(() => ({}))) as Record<string, unknown>;
      const clientId = typeof registration.client_id === "string" ? registration.client_id : "";
      if (!registerRes.ok || !clientId) {
        return res.status(502).json({ error: "Higgsfield did not return a usable MCP login client." });
      }

      const authorization = new URL(HIGGSFIELD_MCP_AUTHORIZE_URL);
      authorization.searchParams.set("response_type", "code");
      authorization.searchParams.set("client_id", clientId);
      authorization.searchParams.set("redirect_uri", redirectUri);
      authorization.searchParams.set("scope", HIGGSFIELD_MCP_SCOPE);
      authorization.searchParams.set("state", state);
      authorization.searchParams.set("code_challenge", codeChallenge);
      authorization.searchParams.set("code_challenge_method", "S256");
      authorization.searchParams.set("resource", HIGGSFIELD_MCP_RESOURCE);

      res.setHeader("Set-Cookie", [
        serializeOAuthApiKeyCookie(api_key),
        serializeHiggsfieldMcpOAuthCookie(base64UrlJson({
          state,
          client_id: clientId,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        })),
      ]);
      return res.status(200).json({
        success: true,
        state,
        redirect_uri: redirectUri,
        authorization_url: authorization.toString(),
      });
    }

    const redirectUriEnv = REDIRECT_URI_ENV[platform];
    const redirectUri = redirectUriEnv ? resolveRedirectUri(platform, redirectUriEnv, process.env) : "";
    const clientIdEnv = CLIENT_ID_ENV[platform];
    const clientId = clientIdEnv ? (process.env[clientIdEnv] ?? "").trim() : "";
    const clientSecretEnv = CLIENT_SECRET_ENV[platform];
    const clientSecret = clientSecretEnv ? (process.env[clientSecretEnv] ?? "").trim() : "";
    const setupMissing: OAuthSetupMissing[] = [];
    if (!redirectUri) setupMissing.push("redirect_uri");
    if (!clientId) setupMissing.push("client_id");
    if (clientSecretEnv && !clientSecret && !OPTIONAL_CLIENT_SECRET_PLATFORMS.has(platform)) {
      setupMissing.push("client_secret");
    }
    if (
      clientSecretEnv &&
      !clientSecret &&
      OPTIONAL_CLIENT_SECRET_PLATFORMS.has(platform) &&
      !process.env.OAUTH_STATE_SECRET
    ) {
      setupMissing.push("state_secret");
    }
    if (setupMissing.length > 0) {
      return providerSetupPending(res, platform, setupMissing);
    }

    const state = createOAuthStateToken({
      platform,
      redirectPath: `/connect/${platform}`,
      env: process.env,
      ...(normalizedStore ? { store: normalizedStore } : {}),
    });

    const cookies = [serializeOAuthApiKeyCookie(api_key)];
    const pkce = PKCE_PLATFORMS.has(platform) ? createPkcePair() : null;
    if (pkce) cookies.push(serializePkceVerifierCookie(pkce.codeVerifier));

    res.setHeader("Set-Cookie", cookies);
    return res.status(200).json({
      success: true,
      state,
      redirect_uri: redirectUri,
      client_id: clientId,
      ...(pkce ? { code_challenge: pkce.codeChallenge, code_challenge_method: "S256" } : {}),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to initialize OAuth.";
    return res.status(500).json({ error: message });
  }
}
