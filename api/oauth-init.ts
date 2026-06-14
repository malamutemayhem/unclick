import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createOAuthStateToken } from "./oauth-state.js";

const ALLOWED_PLATFORMS = new Set([
  "github", "xero", "reddit", "shopify",
  "spotify", "dropbox", "google-workspace", "microsoft-graph",
]);

const REDIRECT_URI_ENV: Record<string, string> = {
  github:            "GITHUB_REDIRECT_URI",
  xero:              "XERO_REDIRECT_URI",
  reddit:            "REDDIT_REDIRECT_URI",
  shopify:           "SHOPIFY_REDIRECT_URI",
  spotify:           "SPOTIFY_REDIRECT_URI",
  dropbox:           "DROPBOX_REDIRECT_URI",
  "google-workspace": "GOOGLE_WORKSPACE_REDIRECT_URI",
  "microsoft-graph": "MICROSOFT_GRAPH_REDIRECT_URI",
};

const OAUTH_API_KEY_COOKIE = "unclick_oauth_api_key";
const OAUTH_COOKIE_MAX_AGE_SECONDS = 10 * 60;

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
    const redirectUri = redirectUriEnv ? process.env[redirectUriEnv] : "";
    if (!redirectUri) {
      return res.status(500).json({ error: `${redirectUriEnv} must be set.` });
    }

    const state = createOAuthStateToken({
      platform,
      redirectPath: `/connect/${platform}`,
      env: process.env,
      ...(normalizedStore ? { store: normalizedStore } : {}),
    });

    res.setHeader("Set-Cookie", serializeOAuthApiKeyCookie(api_key));
    return res.status(200).json({ success: true, state, redirect_uri: redirectUri });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to initialize OAuth.";
    return res.status(500).json({ error: message });
  }
}
