// Twitch API (Helix) integration for the UnClick MCP server.
// Uses the Twitch REST API via fetch - no external dependencies.
// Requires TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET environment variables.
// App access token is fetched automatically and cached in memory for the process lifetime.

const TWITCH_BASE = "https://api.twitch.tv/helix";
const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";

// ─── Token cache ──────────────────────────────────────────────────────────────

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAppToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.TWITCH_CLIENT_ID?.trim() ?? "";
  const clientSecret = process.env.TWITCH_CLIENT_SECRET?.trim() ?? "";

  if (!clientId) throw new Error("TWITCH_CLIENT_ID environment variable is not set.");
  if (!clientSecret) throw new Error("TWITCH_CLIENT_SECRET environment variable is not set.");

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const response = await fetch(TWITCH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching Twitch access token`);
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
    token_type: string;
  };

  cachedToken = data.access_token;
  // Subtract 60s buffer from expiry
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;

  return cachedToken;
}

// ─── API helper ───────────────────────────────────────────────────────────────

async function twitchCall(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<unknown> {
  const clientId = process.env.TWITCH_CLIENT_ID?.trim() ?? "";
  if (!clientId) throw new Error("TWITCH_CLIENT_ID environment variable is not set.");

  const token = await getAppToken();
  const url = new URL(`${TWITCH_BASE}${path}`);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      "Client-Id": clientId,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    // Clear token cache on 401 so next call retries
    if (response.status === 401) {
      cachedToken = null;
      tokenExpiresAt = 0;
    }
    throw new Error(`HTTP ${response.status} from Twitch API`);
  }

  return response.json();
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function twitchGetStreams(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | number | undefined> = {};
  if (args.game_id) params.game_id = String(args.game_id);
  if (args.user_login) params.user_login = String(args.user_login);
  if (args.language) params.language = String(args.language);
  if (args.first) params.first = Number(args.first);
  return twitchCall("/streams", params);
}

export async function twitchSearchChannels(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) throw new Error("query is required.");
  const params: Record<string, string | boolean | undefined> = { query };
  if (args.live_only !== undefined) params.live_only = Boolean(args.live_only);
  return twitchCall("/search/channels", params);
}

export async function twitchSearchCategories(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) throw new Error("query is required.");
  return twitchCall("/search/categories", { query });
}

export async function twitchGetTopGames(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, number | undefined> = {};
  if (args.first) params.first = Number(args.first);
  return twitchCall("/games/top", params);
}

export async function twitchGetUser(args: Record<string, unknown>): Promise<unknown> {
  const login = String(args.login ?? "").trim();
  if (!login) throw new Error("login is required.");
  return twitchCall("/users", { login });
}

export async function twitchGetChannel(args: Record<string, unknown>): Promise<unknown> {
  const broadcasterId = args.broadcaster_id;
  if (!broadcasterId) throw new Error("broadcaster_id is required.");
  return twitchCall("/channels", { broadcaster_id: String(broadcasterId) });
}

export async function twitchGetClips(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | number | undefined> = {};
  if (args.broadcaster_id) params.broadcaster_id = String(args.broadcaster_id);
  if (args.game_id) params.game_id = String(args.game_id);
  if (args.first) params.first = Number(args.first);
  if (!params.broadcaster_id && !params.game_id) {
    throw new Error("broadcaster_id or game_id is required.");
  }
  return twitchCall("/clips", params);
}

export async function twitchGetVideos(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | number | undefined> = {};
  if (args.user_id) params.user_id = String(args.user_id);
  if (args.game_id) params.game_id = String(args.game_id);
  if (args.first) params.first = Number(args.first);
  if (!params.user_id && !params.game_id) {
    throw new Error("user_id or game_id is required.");
  }
  return twitchCall("/videos", params);
}
