/**
 * UnClick OAuth Callback Handler
 * Vercel serverless function - exchanges OAuth authorization code for tokens
 * and stores them encrypted in Supabase via the credentials endpoint.
 *
 * GET /api/oauth-callback
 *   Handles provider redirects from registered OAuth apps, exchanges the code,
 *   stores credentials, then redirects back to /connect/:platform.
 *
 * POST /api/oauth-callback
 *   Body: {
 *     platform: string        // e.g. "xero"
 *     code:     string        // OAuth authorization code from platform redirect
 *     api_key:  string        // User's UnClick API key (used as encryption key)
 *     state?:   string        // CSRF state token verified server-side
 *   }
 *   Returns: { success: true, platform, message } or { error: string }
 *
 * Platform-specific token exchange logic lives in PLATFORM_CONFIGS below.
 * Adding a new OAuth platform = add an entry to PLATFORM_CONFIGS.
 *
 * Required env vars per platform:
 *   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI
 *   XERO_CLIENT_ID, XERO_CLIENT_SECRET, XERO_REDIRECT_URI
 *   REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_REDIRECT_URI
 *   SHOPIFY_{STORE}_CLIENT_ID, etc. (Shopify is per-store, handled specially)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyOAuthStateToken, type OAuthStatePayload } from "./oauth-state.js";

// ─── Platform OAuth configs ────────────────────────────────────────────────────

const OAUTH_API_KEY_COOKIE = "unclick_oauth_api_key";

class OAuthRequestError extends Error {
  status = 400;
}

interface OAuthConfig {
  tokenUrl:    string;
  clientIdEnv: string;
  clientSecretEnv: string;
  redirectUriEnv:  string;
  /** Extract the credential fields we want to store from the token response */
  extractCredentials: (
    tokenResponse: Record<string, unknown>,
    platform:      string,
    env:           NodeJS.ProcessEnv
  ) => Promise<Record<string, string>>;
}

const PLATFORM_CONFIGS: Record<string, OAuthConfig> = {

  github: {
    tokenUrl:        "https://github.com/login/oauth/access_token",
    clientIdEnv:     "GITHUB_CLIENT_ID",
    clientSecretEnv: "GITHUB_CLIENT_SECRET",
    redirectUriEnv:  "GITHUB_REDIRECT_URI",
    async extractCredentials(tokenResponse) {
      const accessToken = String(tokenResponse.access_token ?? "");
      if (!accessToken) throw new Error("No access_token in GitHub token response.");
      return { api_key: accessToken };
    },
  },

  xero: {
    tokenUrl:         "https://identity.xero.com/connect/token",
    clientIdEnv:      "XERO_CLIENT_ID",
    clientSecretEnv:  "XERO_CLIENT_SECRET",
    redirectUriEnv:   "XERO_REDIRECT_URI",
    async extractCredentials(tokenResponse, _platform, _env) {
      const accessToken = String(tokenResponse.access_token ?? "");
      if (!accessToken) throw new Error("No access_token in Xero token response.");

      // Fetch tenant list to get the first (or only) tenant_id
      let tenantId = "";
      try {
        const tenantsRes = await fetch("https://api.xero.com/connections", {
          headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
        });
        if (tenantsRes.ok) {
          const tenants = (await tenantsRes.json()) as Array<{ tenantId: string; tenantName?: string }>;
          if (tenants.length > 0) tenantId = tenants[0].tenantId;
        }
      } catch {
        // tenant fetch failed - caller will need to provide tenant_id manually
      }

      return { access_token: accessToken, tenant_id: tenantId };
    },
  },

  reddit: {
    tokenUrl:        "https://www.reddit.com/api/v1/access_token",
    clientIdEnv:     "REDDIT_CLIENT_ID",
    clientSecretEnv: "REDDIT_CLIENT_SECRET",
    redirectUriEnv:  "REDDIT_REDIRECT_URI",
    async extractCredentials(tokenResponse) {
      const accessToken = String(tokenResponse.access_token ?? "");
      if (!accessToken) throw new Error("No access_token in Reddit token response.");
      return { access_token: accessToken };
    },
  },

  spotify: {
    tokenUrl:        "https://accounts.spotify.com/api/token",
    clientIdEnv:     "SPOTIFY_CLIENT_ID",
    clientSecretEnv: "SPOTIFY_CLIENT_SECRET",
    redirectUriEnv:  "SPOTIFY_REDIRECT_URI",
    async extractCredentials(tokenResponse) {
      const accessToken = String(tokenResponse.access_token ?? "");
      if (!accessToken) throw new Error("No access_token in Spotify token response.");
      const refreshToken = String(tokenResponse.refresh_token ?? "");
      return refreshToken ? { access_token: accessToken, refresh_token: refreshToken } : { access_token: accessToken };
    },
  },

  dropbox: {
    tokenUrl:        "https://api.dropboxapi.com/oauth2/token",
    clientIdEnv:     "DROPBOX_CLIENT_ID",
    clientSecretEnv: "DROPBOX_CLIENT_SECRET",
    redirectUriEnv:  "DROPBOX_REDIRECT_URI",
    async extractCredentials(tokenResponse) {
      const accessToken = String(tokenResponse.access_token ?? "");
      if (!accessToken) throw new Error("No access_token in Dropbox token response.");
      const refreshToken = String(tokenResponse.refresh_token ?? "");
      return refreshToken ? { access_token: accessToken, refresh_token: refreshToken } : { access_token: accessToken };
    },
  },

  // One Google OAuth app covers Gmail, Drive, Calendar, Docs, Sheets (scopes
  // live on the connector config). Sensitive Gmail scopes may need Google's
  // app verification before non-test accounts can consent.
  "google-workspace": {
    tokenUrl:        "https://oauth2.googleapis.com/token",
    clientIdEnv:     "GOOGLE_WORKSPACE_CLIENT_ID",
    clientSecretEnv: "GOOGLE_WORKSPACE_CLIENT_SECRET",
    redirectUriEnv:  "GOOGLE_WORKSPACE_REDIRECT_URI",
    async extractCredentials(tokenResponse) {
      const accessToken = String(tokenResponse.access_token ?? "");
      if (!accessToken) throw new Error("No access_token in Google token response.");
      const refreshToken = String(tokenResponse.refresh_token ?? "");
      return refreshToken ? { access_token: accessToken, refresh_token: refreshToken } : { access_token: accessToken };
    },
  },

  // One Azure AD app covers Outlook mail, Calendar, OneDrive, Teams via Graph.
  "microsoft-graph": {
    tokenUrl:        "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientIdEnv:     "MICROSOFT_GRAPH_CLIENT_ID",
    clientSecretEnv: "MICROSOFT_GRAPH_CLIENT_SECRET",
    redirectUriEnv:  "MICROSOFT_GRAPH_REDIRECT_URI",
    async extractCredentials(tokenResponse) {
      const accessToken = String(tokenResponse.access_token ?? "");
      if (!accessToken) throw new Error("No access_token in Microsoft token response.");
      const refreshToken = String(tokenResponse.refresh_token ?? "");
      return refreshToken ? { access_token: accessToken, refresh_token: refreshToken } : { access_token: accessToken };
    },
  },

  // Shopify OAuth is per-store - the redirect URI and token URL include the store name.
  // Handled specially in the handler below.

};

// ─── Shopify special handling ─────────────────────────────────────────────────

async function exchangeShopify(
  code:     string,
  store:    string,
  env:      NodeJS.ProcessEnv
): Promise<Record<string, string>> {
  const clientId     = env.SHOPIFY_CLIENT_ID ?? "";
  const clientSecret = env.SHOPIFY_CLIENT_SECRET ?? "";
  if (!clientId || !clientSecret) {
    throw new Error("SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET must be set.");
  }

  const host     = store.includes(".") ? store : `${store}.myshopify.com`;
  const tokenUrl = `https://${host}/admin/oauth/access_token`;

  const res = await fetch(tokenUrl, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  if (!res.ok) throw new Error(`Shopify token exchange failed: ${res.status}`);
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("No access_token in Shopify response.");

  return { store: host.replace(".myshopify.com", ""), access_token: data.access_token };
}

// ─── Generic OAuth token exchange ─────────────────────────────────────────────

async function exchangeCode(
  config:      OAuthConfig,
  code:        string,
  env:         NodeJS.ProcessEnv
): Promise<Record<string, string>> {
  const clientId     = env[config.clientIdEnv]     ?? "";
  const clientSecret = env[config.clientSecretEnv] ?? "";
  const redirectUri  = env[config.redirectUriEnv]  ?? "";

  if (!clientId || !clientSecret) {
    throw new Error(
      `${config.clientIdEnv} and ${config.clientSecretEnv} env vars must be set.`
    );
  }

  const body = new URLSearchParams({
    grant_type:    "authorization_code",
    code,
    redirect_uri:  redirectUri,
    client_id:     clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(config.tokenUrl, {
    method:  "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept:         "application/json",
    },
    body:    body.toString(),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Token exchange failed (${res.status}): ${errText}`);
  }

  const tokenResponse = (await res.json()) as Record<string, unknown>;
  return config.extractCredentials(tokenResponse, "", env);
}

// ─── Store credentials via internal credentials endpoint ──────────────────────

async function storeCredentials(
  platform:    string,
  credentials: Record<string, string>,
  apiKey:      string,
  baseUrl:     string
): Promise<void> {
  const res = await fetch(`${baseUrl}/api/credentials`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ platform, credentials, api_key: apiKey }),
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `Credential storage failed (${res.status})`);
  }
}

// ─── Browser callback helpers ────────────────────────────────────────────────

function firstQueryValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function readCookie(req: VercelRequest, name: string): string {
  const cookieHeader = req.headers.cookie ?? "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const prefix = `${name}=`;
  for (const cookie of cookies) {
    if (!cookie.startsWith(prefix)) continue;
    return decodeURIComponent(cookie.slice(prefix.length));
  }
  return "";
}

function clearOAuthApiKeyCookie(): string {
  return [
    `${OAUTH_API_KEY_COOKIE}=`,
    "Path=/api/oauth-callback",
    "Max-Age=0",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

function appendQuery(path: string, params: Record<string, string>): string {
  const url = new URL(path, "https://unclick.world");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}`;
}

function redirectBack(
  res: VercelResponse,
  statePayload: OAuthStatePayload | null,
  params: Record<string, string>
) {
  const redirectPath = statePayload?.redirectPath?.startsWith("/connect/")
    ? statePayload.redirectPath
    : "/admin/apps";
  res.setHeader("Set-Cookie", clearOAuthApiKeyCookie());
  return res.redirect(302, appendQuery(redirectPath, params));
}

async function completeOAuthConnection(args: {
  platform: string;
  code: string;
  apiKey: string;
  state: string;
  store?: string;
  baseUrl: string;
  env: NodeJS.ProcessEnv;
}): Promise<{ platform: string; statePayload: OAuthStatePayload }> {
  const { platform, code, apiKey, state, store, baseUrl, env } = args;

  if (!platform) throw new OAuthRequestError("platform is required.");
  if (!code) throw new OAuthRequestError("code is required.");
  if (!apiKey) throw new OAuthRequestError("api_key is required.");
  if (!state) throw new OAuthRequestError("state is required.");

  if (!apiKey.startsWith("uc_") && !apiKey.startsWith("agt_")) {
    throw new OAuthRequestError("Invalid api_key format.");
  }

  const statePayload = verifyOAuthStateToken(state, env);
  if (statePayload.platform !== platform) {
    throw new OAuthRequestError("OAuth state platform mismatch.");
  }
  if (statePayload.redirectPath !== `/connect/${platform}`) {
    throw new OAuthRequestError("OAuth state redirect mismatch.");
  }

  let credentials: Record<string, string>;

  if (platform === "shopify") {
    const verifiedStore = statePayload.store ?? store;
    if (!verifiedStore) throw new OAuthRequestError("store is required for Shopify.");
    credentials = await exchangeShopify(code, verifiedStore, env);
  } else {
    const config = PLATFORM_CONFIGS[platform];
    if (!config) {
      throw new OAuthRequestError(`OAuth not configured for platform "${platform}". Use the manual credential form instead.`);
    }
    credentials = await exchangeCode(config, code, env);
  }

  await storeCredentials(platform, credentials, apiKey, baseUrl);
  return { platform, statePayload };
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin",  "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://unclick.world";

  if (req.method === "GET") {
    const code = firstQueryValue(req.query.code);
    const state = firstQueryValue(req.query.state);
    const providerError = firstQueryValue(req.query.error_description)
      || firstQueryValue(req.query.error)
      || "";
    let statePayload: OAuthStatePayload | null = null;

    try {
      if (state) statePayload = verifyOAuthStateToken(state, process.env);
      if (providerError) {
        return redirectBack(res, statePayload, { oauth_error: providerError });
      }
      if (!statePayload) throw new Error("Missing OAuth state. Please try again.");

      await completeOAuthConnection({
        platform: statePayload.platform,
        code,
        apiKey: readCookie(req, OAUTH_API_KEY_COOKIE),
        state,
        baseUrl,
        env: process.env,
      });

      return redirectBack(res, statePayload, { connected: "1" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Connection failed. Please try again.";
      return redirectBack(res, statePayload, { oauth_error: message });
    }
  }

  const { platform, code, api_key, state, store } = (req.body ?? {}) as {
    platform?: string;
    code?:     string;
    api_key?:  string;
    state?:    string;
    store?:    string; // Shopify only
  };

  try {
    const result = await completeOAuthConnection({
      platform: platform ?? "",
      code: code ?? "",
      apiKey: api_key ?? "",
      state: state ?? "",
      store,
      baseUrl,
      env: process.env,
    });

    return res.status(200).json({
      success:  true,
      platform: result.platform,
      message:  `Connected to ${result.platform} successfully.`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const status = err instanceof OAuthRequestError ? err.status : 500;
    return res.status(status).json({ error: message });
  }
}
