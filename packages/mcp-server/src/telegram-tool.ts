// Telegram Bot API integration for the UnClick MCP server.
// Uses the official Telegram Bot API via fetch - no external dependencies.
// Users must create a bot via @BotFather on Telegram to get a token.

const TELEGRAM_API_BASE = "https://api.telegram.org";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TelegramResponse<T> {
  ok: boolean;
  result?: T;
  description?: string;
  error_code?: number;
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  is_bot: boolean;
}

interface TelegramChat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
}

interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  sender_chat?: TelegramChat;
  chat: TelegramChat;
  date: number;
  text?: string;
  caption?: string;
  photo?: unknown[];
  document?: { file_name?: string; mime_type?: string; file_id: string };
  reply_to_message?: { message_id: number; text?: string };
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_message?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
}

interface TelegramChatMember {
  status: string;
  user: TelegramUser;
}

// ─── API helper ──────────────────────────────────────────────────────────────

async function telegramCall<T>(
  token: string,
  method: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const url = `${TELEGRAM_API_BASE}/bot${token}/${method}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Telegram API`);
  }

  const data = (await response.json()) as TelegramResponse<T>;
  if (!data.ok) {
    const code = data.error_code ? ` (code ${data.error_code})` : "";
    throw new Error(`Telegram API error${code}: ${data.description ?? "Unknown error"}`);
  }

  return data.result as T;
}

// ─── Message normalization ────────────────────────────────────────────────────

function normalizeMessage(msg: TelegramMessage) {
  const sender = msg.from
    ? {
        id: msg.from.id,
        name: [msg.from.first_name, msg.from.last_name].filter(Boolean).join(" "),
        username: msg.from.username,
        is_bot: msg.from.is_bot,
      }
    : msg.sender_chat
    ? { id: msg.sender_chat.id, name: msg.sender_chat.title ?? "Channel", username: msg.sender_chat.username }
    : null;

  return {
    message_id: msg.message_id,
    date: new Date(msg.date * 1000).toISOString(),
    sender,
    chat: {
      id: msg.chat.id,
      type: msg.chat.type,
      name: msg.chat.title ?? msg.chat.username ?? msg.chat.first_name ?? String(msg.chat.id),
    },
    text: msg.text ?? msg.caption ?? null,
    has_media: Array.isArray(msg.photo) || msg.document !== undefined,
    document_name: msg.document?.file_name ?? null,
    reply_to: msg.reply_to_message?.message_id ?? null,
  };
}

// ─── Token validation ─────────────────────────────────────────────────────────

function requireToken(token: unknown): string {
  const t = String(token ?? "").trim();
  if (!t) throw new Error("bot_token is required. Create a bot at @BotFather on Telegram.");
  return t;
}

// ─── Operations ──────────────────────────────────────────────────────────────

export async function telegramSend(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.bot_token);
  const chatId = args.chat_id;
  if (!chatId) throw new Error("chat_id is required.");
  const text = String(args.text ?? "").trim();
  if (!text) throw new Error("text is required.");

  const params: Record<string, unknown> = {
    chat_id: chatId,
    text,
  };

  const parseMode = args.parse_mode;
  if (parseMode === "Markdown" || parseMode === "HTML" || parseMode === "MarkdownV2") {
    params.parse_mode = parseMode;
  }

  if (args.reply_to_message_id) {
    params.reply_to_message_id = Number(args.reply_to_message_id);
  }

  if (args.disable_notification === true) {
    params.disable_notification = true;
  }

  const msg = await telegramCall<TelegramMessage>(token, "sendMessage", params);
  return {
    success: true,
    message_id: msg.message_id,
    chat_id: msg.chat.id,
    date: new Date(msg.date * 1000).toISOString(),
    text: msg.text,
  };
}

export async function telegramRead(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.bot_token);
  const chatId = args.chat_id !== undefined ? String(args.chat_id) : null;
  const limit = Math.min(100, Math.max(1, Number(args.limit ?? 20)));
  const offset = args.offset !== undefined ? Number(args.offset) : undefined;

  // getUpdates returns messages received by the bot (since last checked or from offset)
  const params: Record<string, unknown> = { limit: 100 };
  if (offset !== undefined) params.offset = offset;

  const updates = await telegramCall<TelegramUpdate[]>(token, "getUpdates", params);

  // Extract messages from updates
  let messages = updates
    .map((u) => u.message ?? u.channel_post ?? u.edited_message ?? u.edited_channel_post)
    .filter((m): m is TelegramMessage => m !== undefined);

  // Filter by chat_id if provided
  if (chatId !== null) {
    messages = messages.filter((m) => String(m.chat.id) === chatId);
  }

  // Return last N messages (most recent)
  const recent = messages.slice(-limit).reverse();
  const nextOffset = updates.length > 0 ? updates[updates.length - 1].update_id + 1 : offset;

  return {
    count: recent.length,
    next_offset: nextOffset,
    messages: recent.map(normalizeMessage),
  };
}

export async function telegramSearch(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.bot_token);
  const chatId = args.chat_id !== undefined ? String(args.chat_id) : null;
  const query = String(args.query ?? "").toLowerCase().trim();
  if (!query) throw new Error("query is required.");
  const limit = Math.min(50, Math.max(1, Number(args.limit ?? 10)));
  const offset = args.offset !== undefined ? Number(args.offset) : undefined;

  // Fetch all available updates and filter by keyword
  const params: Record<string, unknown> = { limit: 100 };
  if (offset !== undefined) params.offset = offset;

  const updates = await telegramCall<TelegramUpdate[]>(token, "getUpdates", params);

  let messages = updates
    .map((u) => u.message ?? u.channel_post ?? u.edited_message ?? u.edited_channel_post)
    .filter((m): m is TelegramMessage => m !== undefined);

  if (chatId !== null) {
    messages = messages.filter((m) => String(m.chat.id) === chatId);
  }

  // Filter by keyword in text or caption
  const matched = messages.filter((m) => {
    const content = (m.text ?? m.caption ?? "").toLowerCase();
    return content.includes(query);
  });

  const results = matched.slice(0, limit).reverse();

  return {
    query,
    count: results.length,
    messages: results.map(normalizeMessage),
    note: "Search covers messages received by the bot since last getUpdates call. For full history search, use a Telegram client.",
  };
}

export async function telegramSendMedia(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.bot_token);
  const chatId = args.chat_id;
  if (!chatId) throw new Error("chat_id is required.");
  const mediaType = String(args.media_type ?? "photo").toLowerCase();
  const mediaUrl = String(args.media_url ?? "").trim();
  if (!mediaUrl) throw new Error("media_url is required (URL to the file).");

  const supportedTypes = ["photo", "document", "audio", "video", "animation"];
  if (!supportedTypes.includes(mediaType)) {
    throw new Error(`Unsupported media_type "${mediaType}". Supported: ${supportedTypes.join(", ")}.`);
  }

  const params: Record<string, unknown> = {
    chat_id: chatId,
    [mediaType]: mediaUrl,
  };

  if (args.caption) {
    params.caption = String(args.caption);
    if (args.parse_mode) params.parse_mode = args.parse_mode;
  }

  if (args.disable_notification === true) {
    params.disable_notification = true;
  }

  const methodMap: Record<string, string> = {
    photo: "sendPhoto",
    document: "sendDocument",
    audio: "sendAudio",
    video: "sendVideo",
    animation: "sendAnimation",
  };

  const msg = await telegramCall<TelegramMessage>(token, methodMap[mediaType], params);
  return {
    success: true,
    message_id: msg.message_id,
    chat_id: msg.chat.id,
    date: new Date(msg.date * 1000).toISOString(),
    media_type: mediaType,
    caption: msg.caption ?? null,
  };
}

export async function telegramGetUpdates(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.bot_token);
  const limit = Math.min(100, Math.max(1, Number(args.limit ?? 20)));
  const timeout = Math.min(30, Math.max(0, Number(args.timeout ?? 0)));
  const offset = args.offset !== undefined ? Number(args.offset) : undefined;

  const params: Record<string, unknown> = { limit, timeout };
  if (offset !== undefined) params.offset = offset;

  // Filter to specific update types if requested
  const allowedUpdates = args.allowed_updates;
  if (Array.isArray(allowedUpdates) && allowedUpdates.length > 0) {
    params.allowed_updates = allowedUpdates;
  }

  const updates = await telegramCall<TelegramUpdate[]>(token, "getUpdates", params);

  const nextOffset = updates.length > 0 ? updates[updates.length - 1].update_id + 1 : offset;

  const formatted = updates.map((u) => {
    const msg = u.message ?? u.channel_post ?? u.edited_message ?? u.edited_channel_post;
    return {
      update_id: u.update_id,
      type: u.message
        ? "message"
        : u.channel_post
        ? "channel_post"
        : u.edited_message
        ? "edited_message"
        : u.edited_channel_post
        ? "edited_channel_post"
        : "other",
      message: msg ? normalizeMessage(msg) : null,
    };
  });

  return {
    count: updates.length,
    next_offset: nextOffset,
    updates: formatted,
  };
}

export async function telegramManageChat(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.bot_token);
  const action = String(args.action ?? "").trim();
  const chatId = args.chat_id;
  if (!chatId) throw new Error("chat_id is required.");

  const validActions = ["info", "members", "pin", "unpin"];
  if (!action) throw new Error(`action is required. Valid values: ${validActions.join(", ")}.`);
  if (!validActions.includes(action)) {
    throw new Error(`Unknown action "${action}". Valid values: ${validActions.join(", ")}.`);
  }

  if (action === "info") {
    const chat = await telegramCall<TelegramChat & Record<string, unknown>>(token, "getChat", {
      chat_id: chatId,
    });
    return {
      id: chat.id,
      type: chat.type,
      title: chat.title ?? null,
      username: chat.username ?? null,
      first_name: chat.first_name ?? null,
      description: (chat as Record<string, unknown>).description ?? null,
      invite_link: (chat as Record<string, unknown>).invite_link ?? null,
      member_count: (chat as Record<string, unknown>).member_count ?? null,
    };
  }

  if (action === "members") {
    const members = await telegramCall<TelegramChatMember[]>(token, "getChatAdministrators", {
      chat_id: chatId,
    });
    return {
      count: members.length,
      administrators: members.map((m) => ({
        status: m.status,
        user_id: m.user.id,
        name: [m.user.first_name, m.user.last_name].filter(Boolean).join(" "),
        username: m.user.username ?? null,
        is_bot: m.user.is_bot,
      })),
    };
  }

  if (action === "pin") {
    const messageId = Number(args.message_id);
    if (!messageId) throw new Error("message_id is required for pin action.");
    const disableNotification = args.disable_notification === true;
    await telegramCall<boolean>(token, "pinChatMessage", {
      chat_id: chatId,
      message_id: messageId,
      disable_notification: disableNotification,
    });
    return { success: true, action: "pin", message_id: messageId, chat_id: chatId };
  }

  if (action === "unpin") {
    const messageId = args.message_id !== undefined ? Number(args.message_id) : undefined;
    const params: Record<string, unknown> = { chat_id: chatId };
    if (messageId !== undefined) params.message_id = messageId;
    await telegramCall<boolean>(token, "unpinChatMessage", params);
    return {
      success: true,
      action: "unpin",
      message_id: messageId ?? "most recent pinned",
      chat_id: chatId,
    };
  }

  // Should not reach here
  throw new Error(`Unhandled action: ${action}`);
}
