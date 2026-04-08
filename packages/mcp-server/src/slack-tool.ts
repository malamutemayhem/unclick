// ── Slack Web API tool ─────────────────────────────────────────────────────────
// Calls the official Slack Web API over HTTPS using fetch (no SDK needed).
// All actions require a Bot Token (xoxb-...) with the appropriate OAuth scopes.
//
// Required scopes per action:
//   slack_send          - chat:write
//   slack_read          - channels:history, groups:history, im:history, mpim:history
//   slack_search        - search:read
//   slack_thread_reply  - chat:write
//   slack_channels      - channels:read, groups:read, im:read, mpim:read
//   slack_react         - reactions:write
//   slack_upload        - files:write

const SLACK_API = "https://slack.com/api";

// ── HTTP helpers ───────────────────────────────────────────────────────────────

async function slackGet(
  token: string,
  method: string,
  params: Record<string, string | number | boolean>
): Promise<Record<string, unknown>> {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    qs.set(k, String(v));
  }
  const res = await fetch(`${SLACK_API}/${method}?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Slack HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

async function slackPost(
  token: string,
  method: string,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const res = await fetch(`${SLACK_API}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Slack HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

// ── Slack error translator ─────────────────────────────────────────────────────

function translateError(code: string): string {
  const known: Record<string, string> = {
    channel_not_found:        "Channel not found. Check the channel ID or name.",
    not_in_channel:           "Bot is not in that channel. Invite it first: /invite @bot.",
    is_archived:              "Channel is archived and cannot receive messages.",
    msg_too_long:             "Message exceeds Slack's 40,000 character limit.",
    no_text:                  "Message text is required.",
    not_authed:               "Missing or invalid bot token (xoxb-...).",
    invalid_auth:             "Bot token is invalid or revoked.",
    account_inactive:         "Bot account has been deactivated.",
    token_revoked:            "Bot token has been revoked.",
    token_expired:            "Bot token has expired.",
    missing_scope:            "Bot token is missing a required OAuth scope.",
    cant_invite_self:         "Cannot invite the bot to a channel it already occupies.",
    message_not_found:        "Message not found. Verify the channel and timestamp (ts).",
    invalid_timestamp:        "Invalid message timestamp. Use the exact ts value from Slack.",
    already_reacted:          "Bot has already added that reaction to this message.",
    invalid_name:             "Invalid emoji name. Use a standard Slack emoji name without colons.",
    too_many_reactions:       "Message has reached the reaction limit.",
    file_not_found:           "File not found.",
    posting_to_general_channel_denied: "Workspace settings block posting to #general.",
    ratelimited:              "Rate limited by Slack. Wait a moment and retry.",
  };
  return known[code] ?? `Slack error: ${code}`;
}

function handleSlackResponse(data: Record<string, unknown>): unknown {
  if (!data.ok) {
    const code = String(data.error ?? "unknown_error");
    return { error: translateError(code), slack_error: code };
  }
  return data;
}

// ── Action implementations ─────────────────────────────────────────────────────

async function actionSend(
  token:   string,
  args:    Record<string, unknown>
): Promise<unknown> {
  const channel = String(args.channel ?? "").trim();
  if (!channel) return { error: "channel is required." };

  const text = String(args.text ?? "").trim();
  if (!text && !args.blocks) return { error: "text or blocks is required." };

  const body: Record<string, unknown> = { channel };
  if (text)        body.text   = text;
  if (args.blocks) body.blocks = args.blocks;
  if (args.thread_ts) body.thread_ts = String(args.thread_ts);
  if (args.username)  body.username  = String(args.username);

  const data = await slackPost(token, "chat.postMessage", body);
  const result = handleSlackResponse(data) as Record<string, unknown>;
  if (result.error) return result;

  return {
    ok:      true,
    channel: data.channel,
    ts:      data.ts,
    message: (data.message as Record<string, unknown>)?.text ?? text,
  };
}

async function actionRead(
  token: string,
  args:  Record<string, unknown>
): Promise<unknown> {
  const channel = String(args.channel ?? "").trim();
  if (!channel) return { error: "channel is required." };

  const limit = Math.min(200, Math.max(1, Number(args.limit ?? 20)));
  const params: Record<string, string | number | boolean> = { channel, limit };
  if (args.oldest) params.oldest = String(args.oldest);
  if (args.latest) params.latest = String(args.latest);

  const data = await slackGet(token, "conversations.history", params);
  const result = handleSlackResponse(data) as Record<string, unknown>;
  if ((result as Record<string, unknown>).error) return result;

  const messages = (data.messages as Array<Record<string, unknown>>).map((m) => ({
    ts:        m.ts,
    user:      m.user,
    bot_id:    m.bot_id,
    text:      m.text,
    type:      m.type,
    thread_ts: m.thread_ts,
    reply_count: m.reply_count,
  }));

  return {
    ok:            true,
    channel,
    count:         messages.length,
    has_more:      data.has_more,
    messages,
  };
}

async function actionSearch(
  token: string,
  args:  Record<string, unknown>
): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required." };

  const count = Math.min(100, Math.max(1, Number(args.count ?? 20)));
  const params: Record<string, string | number | boolean> = {
    query,
    count,
    sort:      String(args.sort ?? "timestamp"),
    sort_dir:  String(args.sort_dir ?? "desc"),
  };

  const data = await slackGet(token, "search.messages", params);
  const result = handleSlackResponse(data) as Record<string, unknown>;
  if ((result as Record<string, unknown>).error) return result;

  const matches = data.messages as Record<string, unknown>;
  const items   = (matches.matches as Array<Record<string, unknown>> ?? []).map((m) => ({
    ts:        m.ts,
    channel:   (m.channel as Record<string, unknown>)?.id,
    channel_name: (m.channel as Record<string, unknown>)?.name,
    user:      m.username,
    text:      m.text,
    permalink: m.permalink,
  }));

  return {
    ok:    true,
    query,
    total: (matches.total as number) ?? items.length,
    count: items.length,
    messages: items,
  };
}

async function actionThreadReply(
  token: string,
  args:  Record<string, unknown>
): Promise<unknown> {
  const channel   = String(args.channel   ?? "").trim();
  const thread_ts = String(args.thread_ts ?? "").trim();
  const text      = String(args.text      ?? "").trim();

  if (!channel)   return { error: "channel is required."   };
  if (!thread_ts) return { error: "thread_ts is required." };
  if (!text && !args.blocks) return { error: "text or blocks is required." };

  const body: Record<string, unknown> = { channel, thread_ts };
  if (text)        body.text   = text;
  if (args.blocks) body.blocks = args.blocks;

  const data = await slackPost(token, "chat.postMessage", body);
  const result = handleSlackResponse(data) as Record<string, unknown>;
  if ((result as Record<string, unknown>).error) return result;

  return {
    ok:        true,
    channel:   data.channel,
    ts:        data.ts,
    thread_ts: (data.message as Record<string, unknown>)?.thread_ts ?? thread_ts,
    text,
  };
}

async function actionChannels(
  token: string,
  args:  Record<string, unknown>
): Promise<unknown> {
  const types  = String(args.types ?? "public_channel");
  const limit  = Math.min(1000, Math.max(1, Number(args.limit ?? 100)));
  const params: Record<string, string | number | boolean> = {
    types,
    limit,
    exclude_archived: args.exclude_archived !== false,
  };

  const data = await slackGet(token, "conversations.list", params);
  const result = handleSlackResponse(data) as Record<string, unknown>;
  if ((result as Record<string, unknown>).error) return result;

  const channels = (data.channels as Array<Record<string, unknown>>).map((c) => ({
    id:          c.id,
    name:        c.name,
    is_private:  c.is_private,
    is_archived: c.is_archived,
    is_member:   c.is_member,
    num_members: c.num_members,
    topic:       (c.topic as Record<string, unknown>)?.value,
    purpose:     (c.purpose as Record<string, unknown>)?.value,
  }));

  return {
    ok:    true,
    types,
    count: channels.length,
    channels,
  };
}

async function actionReact(
  token: string,
  args:  Record<string, unknown>
): Promise<unknown> {
  const channel = String(args.channel   ?? "").trim();
  const ts      = String(args.timestamp ?? "").trim();
  const name    = String(args.emoji     ?? "").trim().replace(/^:|:$/g, "");

  if (!channel) return { error: "channel is required."   };
  if (!ts)      return { error: "timestamp is required." };
  if (!name)    return { error: "emoji is required."     };

  const data = await slackPost(token, "reactions.add", { channel, timestamp: ts, name });
  const result = handleSlackResponse(data) as Record<string, unknown>;
  if ((result as Record<string, unknown>).error) return result;

  return { ok: true, channel, timestamp: ts, emoji: name };
}

async function actionUpload(
  token: string,
  args:  Record<string, unknown>
): Promise<unknown> {
  const channels = String(args.channels ?? "").trim();
  const filename = String(args.filename ?? "file.txt").trim();
  const content  = String(args.content  ?? "").trim();

  if (!channels) return { error: "channels is required (channel ID or comma-separated IDs)." };
  if (!content)  return { error: "content is required."  };

  // Use the v2 upload flow: get upload URL, upload, then finalize.
  // Step 1: request an upload URL
  const urlRes = await slackGet(token, "files.getUploadURLExternal", {
    filename,
    length: Buffer.byteLength(content, "utf8"),
  });
  const urlResult = handleSlackResponse(urlRes) as Record<string, unknown>;
  if ((urlResult as Record<string, unknown>).error) return urlResult;

  const uploadUrl = String(urlRes.upload_url ?? "");
  const fileId    = String(urlRes.file_id    ?? "");

  // Step 2: POST the file content to the upload URL
  const uploadRes = await fetch(uploadUrl, {
    method:  "POST",
    headers: { "Content-Type": "application/octet-stream" },
    body:    content,
  });
  if (!uploadRes.ok) {
    return { error: `File upload to Slack storage failed: HTTP ${uploadRes.status}` };
  }

  // Step 3: finalize and share to the channel(s)
  const finalBody: Record<string, unknown> = {
    files:           [{ id: fileId }],
    channel_id:      channels.split(",")[0].trim(),
  };
  if (args.initial_comment) finalBody.initial_comment = String(args.initial_comment);

  const finalRes = await slackPost(token, "files.completeUploadExternal", finalBody);
  const finalResult = handleSlackResponse(finalRes) as Record<string, unknown>;
  if ((finalResult as Record<string, unknown>).error) return finalResult;

  const files = finalRes.files as Array<Record<string, unknown>>;
  const file  = files?.[0];
  return {
    ok:        true,
    file_id:   file?.id,
    filename:  file?.name ?? filename,
    permalink: file?.permalink,
    channels:  channels.split(",").map((c) => c.trim()),
  };
}

// ── Public dispatcher ──────────────────────────────────────────────────────────

export async function slackAction(
  action: string,
  args:   Record<string, unknown>
): Promise<unknown> {
  const token = String(args.bot_token ?? "").trim();
  if (!token)           return { error: "bot_token is required."                     };
  if (!token.startsWith("xoxb-")) return { error: "bot_token must start with xoxb-. Check your Slack app's Bot Token." };

  try {
    switch (action) {
      case "slack_send":         return actionSend(token, args);
      case "slack_read":         return actionRead(token, args);
      case "slack_search":       return actionSearch(token, args);
      case "slack_thread_reply": return actionThreadReply(token, args);
      case "slack_channels":     return actionChannels(token, args);
      case "slack_react":        return actionReact(token, args);
      case "slack_upload":       return actionUpload(token, args);
      default:
        return {
          error:
            `Unknown slack action: "${action}". ` +
            "Valid actions: slack_send, slack_read, slack_search, " +
            "slack_thread_reply, slack_channels, slack_react, slack_upload.",
        };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { error: message };
  }
}
