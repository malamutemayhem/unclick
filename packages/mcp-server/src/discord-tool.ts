// Discord REST API v10 integration
// All operations pass the bot token as a parameter - no server-side credential storage.

const DISCORD_API = "https://discord.com/api/v10";

interface DiscordErrorBody {
  code?: number;
  message?: string;
}

async function discordFetch(
  method: string,
  path: string,
  token: string,
  body?: unknown
): Promise<unknown> {
  const headers: Record<string, string> = {
    Authorization: `Bot ${token}`,
    "User-Agent": "UnClickMCP/1.0 (https://unclick.io)",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${DISCORD_API}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 204 No Content - success with no body (e.g. react)
  if (res.status === 204) return { success: true };

  const data = (await res.json()) as unknown;

  if (!res.ok) {
    const err = data as DiscordErrorBody;
    return {
      error: err.message ?? "Discord API error",
      discord_code: err.code,
      http_status: res.status,
    };
  }

  return data;
}

function requireParam(
  args: Record<string, unknown>,
  key: string
): { value: string } | { error: string } {
  const v = String(args[key] ?? "").trim();
  if (!v) return { error: `${key} is required.` };
  return { value: v };
}

// ── discord_send ──────────────────────────────────────────────────────────────
// POST /channels/{channel_id}/messages

export async function discordSend(
  args: Record<string, unknown>
): Promise<unknown> {
  const token = requireParam(args, "bot_token");
  if ("error" in token) return token;
  const channelId = requireParam(args, "channel_id");
  if ("error" in channelId) return channelId;
  const content = requireParam(args, "content");
  if ("error" in content) return content;

  const body: Record<string, unknown> = { content: content.value };
  if (args.reply_to) {
    body.message_reference = { message_id: String(args.reply_to) };
  }
  if (args.tts === true) body.tts = true;

  return discordFetch(
    "POST",
    `/channels/${channelId.value}/messages`,
    token.value,
    body
  );
}

// ── discord_read ──────────────────────────────────────────────────────────────
// GET /channels/{channel_id}/messages

export async function discordRead(
  args: Record<string, unknown>
): Promise<unknown> {
  const token = requireParam(args, "bot_token");
  if ("error" in token) return token;
  const channelId = requireParam(args, "channel_id");
  if ("error" in channelId) return channelId;

  const limit = Math.min(100, Math.max(1, Number(args.limit ?? 50)));
  const params = new URLSearchParams({ limit: String(limit) });
  if (args.before) params.set("before", String(args.before));
  if (args.after) params.set("after", String(args.after));

  return discordFetch(
    "GET",
    `/channels/${channelId.value}/messages?${params}`,
    token.value
  );
}

// ── discord_thread ────────────────────────────────────────────────────────────
// Create a thread from a message, create a standalone thread, or reply to one.
//
// Modes:
//   thread_id provided          -> reply to an existing thread
//   message_id provided         -> create thread from that message
//   neither                     -> create a standalone thread in the channel

export async function discordThread(
  args: Record<string, unknown>
): Promise<unknown> {
  const token = requireParam(args, "bot_token");
  if ("error" in token) return token;
  const channelId = requireParam(args, "channel_id");
  if ("error" in channelId) return channelId;

  // Reply to an existing thread
  if (args.thread_id) {
    const threadId = String(args.thread_id).trim();
    const content = String(args.content ?? "").trim();
    if (!content) return { error: "content is required when replying to a thread." };
    return discordFetch(
      "POST",
      `/channels/${threadId}/messages`,
      token.value,
      { content }
    );
  }

  // Create a thread from an existing message
  if (args.message_id) {
    const messageId = String(args.message_id).trim();
    const name = String(args.name ?? "").trim();
    if (!name) return { error: "name is required to create a thread." };
    const body: Record<string, unknown> = { name };
    if (args.auto_archive_duration) {
      body.auto_archive_duration = Number(args.auto_archive_duration);
    }
    return discordFetch(
      "POST",
      `/channels/${channelId.value}/messages/${messageId}/threads`,
      token.value,
      body
    );
  }

  // Create a standalone (forum-style) thread
  const name = String(args.name ?? "").trim();
  if (!name) return { error: "name is required to create a thread." };

  const body: Record<string, unknown> = {
    name,
    type: 11, // GUILD_PUBLIC_THREAD
  };
  if (args.auto_archive_duration) {
    body.auto_archive_duration = Number(args.auto_archive_duration);
  }
  if (args.content) {
    body.message = { content: String(args.content) };
  }

  return discordFetch(
    "POST",
    `/channels/${channelId.value}/threads`,
    token.value,
    body
  );
}

// ── discord_react ─────────────────────────────────────────────────────────────
// PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me

export async function discordReact(
  args: Record<string, unknown>
): Promise<unknown> {
  const token = requireParam(args, "bot_token");
  if ("error" in token) return token;
  const channelId = requireParam(args, "channel_id");
  if ("error" in channelId) return channelId;
  const messageId = requireParam(args, "message_id");
  if ("error" in messageId) return messageId;
  const emoji = requireParam(args, "emoji");
  if ("error" in emoji) return emoji;

  // Custom emojis must be formatted as name:id (e.g. "thumbsup:123456789")
  const encodedEmoji = encodeURIComponent(emoji.value);

  return discordFetch(
    "PUT",
    `/channels/${channelId.value}/messages/${messageId.value}/reactions/${encodedEmoji}/@me`,
    token.value
  );
}

// ── discord_channels ──────────────────────────────────────────────────────────
// GET /guilds/{guild_id}/channels

export async function discordChannels(
  args: Record<string, unknown>
): Promise<unknown> {
  const token = requireParam(args, "bot_token");
  if ("error" in token) return token;
  const guildId = requireParam(args, "guild_id");
  if ("error" in guildId) return guildId;

  return discordFetch("GET", `/guilds/${guildId.value}/channels`, token.value);
}

// ── discord_members ───────────────────────────────────────────────────────────
// GET /guilds/{guild_id}/members

export async function discordMembers(
  args: Record<string, unknown>
): Promise<unknown> {
  const token = requireParam(args, "bot_token");
  if ("error" in token) return token;
  const guildId = requireParam(args, "guild_id");
  if ("error" in guildId) return guildId;

  const limit = Math.min(1000, Math.max(1, Number(args.limit ?? 100)));
  const params = new URLSearchParams({ limit: String(limit) });
  if (args.after) params.set("after", String(args.after));

  return discordFetch(
    "GET",
    `/guilds/${guildId.value}/members?${params}`,
    token.value
  );
}

// ── discord_search ────────────────────────────────────────────────────────────
// GET /guilds/{guild_id}/messages/search

export async function discordSearch(
  args: Record<string, unknown>
): Promise<unknown> {
  const token = requireParam(args, "bot_token");
  if ("error" in token) return token;
  const guildId = requireParam(args, "guild_id");
  if ("error" in guildId) return guildId;
  const query = requireParam(args, "query");
  if ("error" in query) return query;

  const params = new URLSearchParams({ content: query.value });
  if (args.channel_id) params.set("channel_id", String(args.channel_id));
  if (args.author_id) params.set("author_id", String(args.author_id));
  if (args.has) params.set("has", String(args.has));
  if (args.limit) {
    params.set("limit", String(Math.min(25, Math.max(1, Number(args.limit)))));
  }
  if (args.offset) params.set("offset", String(Number(args.offset)));

  return discordFetch(
    "GET",
    `/guilds/${guildId.value}/messages/search?${params}`,
    token.value
  );
}
