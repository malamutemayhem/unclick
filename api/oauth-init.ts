import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHash, randomBytes } from "node:crypto";
import { createOAuthStateToken } from "./oauth-state.js";

const ALLOWED_PLATFORMS = new Set([
  "github", "vercel", "supabase", "xero", "reddit", "shopify",
  "spotify", "dropbox", "google-workspace", "microsoft-graph",
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

const OAUTH_API_KEY_COOKIE = "unclick_oauth_api_key";
const OAUTH_PKCE_VERIFIER_COOKIE = "unclick_oauth_pkce_verifier";
const OAUTH_COOKIE_MAX_AGE_SECONDS = 10 * 60;
const GITHUB_CANONICAL_REDIRECT_URI = "https://unclick.world/api/oauth-callback";
const PKCE_PLATFORMS = new Set(["vercel", "supabase"]);
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

function createPkcePair(): { codeVerifier: string; codeChallenge: string } {
  const codeVerifier = randomBytes(32).toString("base64url");
  const codeChallenge = createHash("sha256").update(codeVerifier).digest("base64url");
  return { codeVerifier, codeChallenge };
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

function providerSetupPending(res: VercelResponse, platform: string, missing: "client_id" | "redirect_uri") {
  const label = PLATFORM_LABELS[platform] ?? platform;
  return res.status(503).json({
    error: `${label} login is not switched on yet. Use the token fallback for now, or try again after the login setup is finished.`,
    setup_pending: true,
    provider: platform,
    missing,
  });
}

export default function handler(req: VercelRequest, res: VercelResponse) {
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
    const redirectUriEnv = REDIRECT_URI_ENV[platform];
    const redirectUri = redirectUriEnv ? resolveRedirectUri(platform, redirectUriEnv, process.env) : "";
    if (!redirectUri) {
      return providerSetupPending(res, platform, "redirect_uri");
    }
    const clientIdEnv = CLIENT_ID_ENV[platform];
    const clientId = clientIdEnv ? (process.env[clientIdEnv] ?? "").trim() : "";
    if (!clientId) {
      return providerSetupPending(res, platform, "client_id");
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
