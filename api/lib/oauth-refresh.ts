/**
 * OAuth access-token refresh.
 *
 * The OAuth callback (api/oauth-callback.ts) stores access_token, refresh_token,
 * and expires_at inside the encrypted credential blob. Until now nothing used the
 * refresh_token, so Google/Microsoft/Vercel access tokens (which live ~1 hour)
 * silently expired and every connector call started failing with "token invalid
 * or expired" an hour after connecting.
 *
 * This module exchanges a stored refresh_token for a fresh access_token. It is
 * called from the GET /api/credentials read path (the single chokepoint every
 * OAuth connector funnels through), so refresh happens transparently before the
 * token is ever handed to a connector. The agent never sees it.
 *
 * Design rule: refresh is best-effort. Every failure path returns null so the
 * caller falls back to the stored token. A broken refresh can never be worse
 * than today's behaviour.
 *
 * Token endpoints and client-env names mirror PLATFORM_CONFIGS in
 * api/oauth-callback.ts. GitHub is intentionally absent: it issues a long-lived
 * token with no refresh/expiry.
 */

export interface RefreshConfig {
  tokenUrl:             string;
  clientIdEnv:          string;
  clientSecretEnv:      string;
  /** "basic" sends client_id:client_secret as an Authorization header (Supabase, Reddit). */
  clientAuth?:          "body" | "basic";
  /** PKCE public clients (Vercel) may have no client secret. */
  optionalClientSecret?: boolean;
  /** Microsoft requires the scope to be re-sent on refresh. */
  scope?:               string;
}

export const OAUTH_REFRESH_CONFIGS: Record<string, RefreshConfig> = {
  gmail:              { tokenUrl: "https://oauth2.googleapis.com/token",                              clientIdEnv: "GOOGLE_WORKSPACE_CLIENT_ID",  clientSecretEnv: "GOOGLE_WORKSPACE_CLIENT_SECRET" },
  "google-drive":     { tokenUrl: "https://oauth2.googleapis.com/token",                              clientIdEnv: "GOOGLE_WORKSPACE_CLIENT_ID",  clientSecretEnv: "GOOGLE_WORKSPACE_CLIENT_SECRET" },
  "google-workspace": { tokenUrl: "https://oauth2.googleapis.com/token",                              clientIdEnv: "GOOGLE_WORKSPACE_CLIENT_ID",  clientSecretEnv: "GOOGLE_WORKSPACE_CLIENT_SECRET" },
  onedrive:           { tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",       clientIdEnv: "MICROSOFT_GRAPH_CLIENT_ID",   clientSecretEnv: "MICROSOFT_GRAPH_CLIENT_SECRET", scope: "offline_access User.Read Files.Read" },
  "microsoft-graph":  { tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",       clientIdEnv: "MICROSOFT_GRAPH_CLIENT_ID",   clientSecretEnv: "MICROSOFT_GRAPH_CLIENT_SECRET", scope: "offline_access User.Read Files.Read Mail.Read" },
  vercel:             { tokenUrl: "https://api.vercel.com/login/oauth/token",                         clientIdEnv: "VERCEL_CLIENT_ID",            clientSecretEnv: "VERCEL_CLIENT_SECRET", optionalClientSecret: true },
  supabase:           { tokenUrl: "https://api.supabase.com/v1/oauth/token",                          clientIdEnv: "SUPABASE_OAUTH_CLIENT_ID",    clientSecretEnv: "SUPABASE_OAUTH_CLIENT_SECRET", clientAuth: "basic" },
  dropbox:            { tokenUrl: "https://api.dropboxapi.com/oauth2/token",                          clientIdEnv: "DROPBOX_CLIENT_ID",           clientSecretEnv: "DROPBOX_CLIENT_SECRET" },
  spotify:            { tokenUrl: "https://accounts.spotify.com/api/token",                           clientIdEnv: "SPOTIFY_CLIENT_ID",           clientSecretEnv: "SPOTIFY_CLIENT_SECRET" },
  reddit:             { tokenUrl: "https://www.reddit.com/api/v1/access_token",                       clientIdEnv: "REDDIT_CLIENT_ID",            clientSecretEnv: "REDDIT_CLIENT_SECRET", clientAuth: "basic" },
  xero:               { tokenUrl: "https://identity.xero.com/connect/token",                          clientIdEnv: "XERO_CLIENT_ID",              clientSecretEnv: "XERO_CLIENT_SECRET" },
};

/** Refresh when the token has under this long left (or no known expiry). */
const DEFAULT_SKEW_MS = 120_000;
/** If a provider omits expires_in, assume this TTL so we don't refresh every call. */
const FALLBACK_TTL_MS = 30 * 60_000;

export function isExpiring(expiresAt: unknown, skewMs = DEFAULT_SKEW_MS): boolean {
  if (typeof expiresAt !== "string" || !expiresAt) return true; // unknown expiry -> treat as expiring
  const t = Date.parse(expiresAt);
  if (!Number.isFinite(t)) return true;
  return t - Date.now() <= skewMs;
}

/**
 * True when this platform's stored credential can and should be refreshed now.
 * Requires a refresh-capable platform and a stored refresh_token. `force` skips
 * the expiry check (used by the reactive 401-retry path).
 */
export function needsRefresh(
  platform:    string,
  credentials: Record<string, unknown>,
  force = false
): boolean {
  if (!OAUTH_REFRESH_CONFIGS[platform]) return false;
  const refreshToken = typeof credentials.refresh_token === "string" ? credentials.refresh_token.trim() : "";
  if (!refreshToken) return false;
  return force || isExpiring(credentials.expires_at);
}

/**
 * Exchange the stored refresh_token for a fresh access_token.
 * Returns an updated credentials object (new access_token / expires_at, and the
 * rotated refresh_token when the provider issues one) or null on any failure.
 * Never throws.
 */
export async function refreshOAuthCredential(
  platform:    string,
  credentials: Record<string, string>,
  env:         NodeJS.ProcessEnv = process.env
): Promise<Record<string, string> | null> {
  const config = OAUTH_REFRESH_CONFIGS[platform];
  if (!config) return null;

  const refreshToken = (credentials.refresh_token ?? "").trim();
  if (!refreshToken) return null;

  const clientId     = (env[config.clientIdEnv] ?? "").trim();
  const clientSecret = (env[config.clientSecretEnv] ?? "").trim();
  if (!clientId) return null;
  if (!clientSecret && !config.optionalClientSecret) return null;

  const body = new URLSearchParams({
    grant_type:    "refresh_token",
    refresh_token: refreshToken,
  });
  if (config.scope) body.set("scope", config.scope);

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept:         "application/json",
  };
  if (config.clientAuth === "basic") {
    headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`, "utf8").toString("base64")}`;
  } else {
    body.set("client_id", clientId);
    if (clientSecret) body.set("client_secret", clientSecret);
  }

  let res: { ok: boolean; json: () => Promise<unknown> };
  try {
    res = await fetch(config.tokenUrl, { method: "POST", headers, body: body.toString() });
  } catch {
    return null; // network failure -> fall back to stored token
  }
  if (!res.ok) return null; // refresh rejected (e.g. revoked) -> fall back

  let data: Record<string, unknown>;
  try {
    data = (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }

  const newAccess = typeof data.access_token === "string" ? data.access_token.trim() : "";
  if (!newAccess) return null;

  const expiresIn = Number(data.expires_in ?? 0);
  const expiresAt = Number.isFinite(expiresIn) && expiresIn > 0
    ? new Date(Date.now() + expiresIn * 1000).toISOString()
    : new Date(Date.now() + FALLBACK_TTL_MS).toISOString();

  // Most providers omit refresh_token on refresh (keep the existing one);
  // some (Microsoft, Supabase) rotate it and must be persisted.
  const rotatedRefresh = typeof data.refresh_token === "string" && data.refresh_token.trim()
    ? data.refresh_token.trim()
    : refreshToken;

  const updated: Record<string, string> = {
    ...credentials,
    access_token:  newAccess,
    refresh_token: rotatedRefresh,
    expires_at:    expiresAt,
  };

  // Some connectors read the token under `api_key` (Vercel stores both). Keep the
  // alias in sync so the fresh token reaches them too.
  if (typeof credentials.api_key === "string") {
    updated.api_key = newAccess;
  }

  return updated;
}
