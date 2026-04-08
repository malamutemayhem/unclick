// ── Mastodon MCP Tool ─────────────────────────────────────────────────────────
// Works with any Mastodon-compatible instance: Mastodon, Pleroma, Akkoma, Misskey.
// User supplies their instance URL + access token as parameters.
// Uses Mastodon REST API v1/v2 via fetch. No external dependencies.

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizeInstance(raw: string): string {
  const url = raw.trim().replace(/\/+$/, "");
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

async function mastodonFetch(
  instanceUrl: string,
  token: string,
  method: string,
  path: string,
  body?: Record<string, unknown>
): Promise<unknown> {
  const base = normalizeInstance(instanceUrl);
  const url = `${base}${path}`;

  const init: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (body !== undefined && method !== "GET") {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);

  let data: unknown;
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const errMsg =
      data && typeof data === "object" && "error" in (data as object)
        ? String((data as Record<string, unknown>).error)
        : `HTTP ${res.status} ${res.statusText}`;
    return { error: errMsg, status: res.status };
  }

  return data;
}

async function mastodonGet(
  instanceUrl: string,
  token: string,
  path: string
): Promise<unknown> {
  return mastodonFetch(instanceUrl, token, "GET", path);
}

async function mastodonPost(
  instanceUrl: string,
  token: string,
  path: string,
  body?: Record<string, unknown>
): Promise<unknown> {
  return mastodonFetch(instanceUrl, token, "POST", path, body);
}

// ── Field extractors ──────────────────────────────────────────────────────────
// Return a safe subset of the API response to keep responses compact.

function slimStatus(s: Record<string, unknown>): Record<string, unknown> {
  return {
    id: s.id,
    created_at: s.created_at,
    url: s.url,
    uri: s.uri,
    content: s.content,
    text: s.text,
    visibility: s.visibility,
    sensitive: s.sensitive,
    spoiler_text: s.spoiler_text,
    reblogs_count: s.reblogs_count,
    favourites_count: s.favourites_count,
    replies_count: s.replies_count,
    reblog: s.reblog ? slimStatus(s.reblog as Record<string, unknown>) : null,
    in_reply_to_id: s.in_reply_to_id,
    account: slimAccount(s.account as Record<string, unknown>),
    media_attachments: s.media_attachments,
    tags: s.tags,
    mentions: s.mentions,
  };
}

function slimAccount(a: Record<string, unknown>): Record<string, unknown> {
  return {
    id: a.id,
    username: a.username,
    acct: a.acct,
    display_name: a.display_name,
    url: a.url,
    avatar: a.avatar,
    followers_count: a.followers_count,
    following_count: a.following_count,
    statuses_count: a.statuses_count,
    note: a.note,
    bot: a.bot,
    locked: a.locked,
    created_at: a.created_at,
    fields: a.fields,
  };
}

function slimNotification(n: Record<string, unknown>): Record<string, unknown> {
  return {
    id: n.id,
    type: n.type,
    created_at: n.created_at,
    account: n.account ? slimAccount(n.account as Record<string, unknown>) : null,
    status: n.status ? slimStatus(n.status as Record<string, unknown>) : null,
  };
}

// ── Action handlers ───────────────────────────────────────────────────────────

async function actionPost(args: Record<string, unknown>): Promise<unknown> {
  const instance = String(args.instance_url ?? "").trim();
  const token    = String(args.access_token ?? "").trim();
  const status   = String(args.status ?? "").trim();

  if (!instance) return { error: "instance_url is required." };
  if (!token)    return { error: "access_token is required." };
  if (!status)   return { error: "status text is required." };

  const body: Record<string, unknown> = { status };

  if (args.visibility) {
    body.visibility = String(args.visibility);
  }
  if (args.spoiler_text) {
    body.spoiler_text = String(args.spoiler_text);
  }
  if (args.sensitive === true) {
    body.sensitive = true;
  }
  if (Array.isArray(args.media_ids) && args.media_ids.length > 0) {
    body.media_ids = args.media_ids.map(String);
  }

  const result = await mastodonPost(instance, token, "/api/v1/statuses", body);
  if (result && typeof result === "object" && "id" in (result as object)) {
    return slimStatus(result as Record<string, unknown>);
  }
  return result;
}

async function actionReadTimeline(args: Record<string, unknown>): Promise<unknown> {
  const instance  = String(args.instance_url ?? "").trim();
  const token     = String(args.access_token ?? "").trim();
  const timeline  = String(args.timeline ?? "home").trim();
  const limit     = Math.min(40, Math.max(1, Number(args.limit ?? 20)));

  if (!instance) return { error: "instance_url is required." };
  if (!token)    return { error: "access_token is required." };

  const validTimelines = ["home", "local", "public"];
  if (!validTimelines.includes(timeline)) {
    return { error: `Invalid timeline. Valid options: ${validTimelines.join(", ")}.` };
  }

  // home uses /api/v1/timelines/home, local+public use /api/v1/timelines/public
  let path: string;
  if (timeline === "home") {
    path = `/api/v1/timelines/home?limit=${limit}`;
  } else if (timeline === "local") {
    path = `/api/v1/timelines/public?local=true&limit=${limit}`;
  } else {
    path = `/api/v1/timelines/public?limit=${limit}`;
  }

  if (args.max_id) {
    path += `&max_id=${encodeURIComponent(String(args.max_id))}`;
  }

  const result = await mastodonGet(instance, token, path);
  if (Array.isArray(result)) {
    return {
      timeline,
      count: result.length,
      statuses: result.map((s) => slimStatus(s as Record<string, unknown>)),
    };
  }
  return result;
}

async function actionReply(args: Record<string, unknown>): Promise<unknown> {
  const instance      = String(args.instance_url ?? "").trim();
  const token         = String(args.access_token ?? "").trim();
  const inReplyToId   = String(args.in_reply_to_id ?? "").trim();
  const status        = String(args.status ?? "").trim();

  if (!instance)    return { error: "instance_url is required." };
  if (!token)       return { error: "access_token is required." };
  if (!inReplyToId) return { error: "in_reply_to_id is required." };
  if (!status)      return { error: "status text is required." };

  const body: Record<string, unknown> = {
    status,
    in_reply_to_id: inReplyToId,
  };

  if (args.visibility) {
    body.visibility = String(args.visibility);
  }
  if (args.spoiler_text) {
    body.spoiler_text = String(args.spoiler_text);
  }

  const result = await mastodonPost(instance, token, "/api/v1/statuses", body);
  if (result && typeof result === "object" && "id" in (result as object)) {
    return slimStatus(result as Record<string, unknown>);
  }
  return result;
}

async function actionBoost(args: Record<string, unknown>): Promise<unknown> {
  const instance = String(args.instance_url ?? "").trim();
  const token    = String(args.access_token ?? "").trim();
  const id       = String(args.status_id ?? "").trim();
  const unboost  = args.unboost === true;

  if (!instance) return { error: "instance_url is required." };
  if (!token)    return { error: "access_token is required." };
  if (!id)       return { error: "status_id is required." };

  const action = unboost ? "unreblog" : "reblog";
  const result = await mastodonPost(instance, token, `/api/v1/statuses/${id}/${action}`);

  if (result && typeof result === "object" && "id" in (result as object)) {
    return { action, status: slimStatus(result as Record<string, unknown>) };
  }
  return result;
}

async function actionFavorite(args: Record<string, unknown>): Promise<unknown> {
  const instance    = String(args.instance_url ?? "").trim();
  const token       = String(args.access_token ?? "").trim();
  const id          = String(args.status_id ?? "").trim();
  const unfavorite  = args.unfavorite === true;

  if (!instance) return { error: "instance_url is required." };
  if (!token)    return { error: "access_token is required." };
  if (!id)       return { error: "status_id is required." };

  const action = unfavorite ? "unfavourite" : "favourite";
  const result = await mastodonPost(instance, token, `/api/v1/statuses/${id}/${action}`);

  if (result && typeof result === "object" && "id" in (result as object)) {
    return { action, status: slimStatus(result as Record<string, unknown>) };
  }
  return result;
}

async function actionSearch(args: Record<string, unknown>): Promise<unknown> {
  const instance  = String(args.instance_url ?? "").trim();
  const token     = String(args.access_token ?? "").trim();
  const query     = String(args.query ?? "").trim();
  const type      = args.type ? String(args.type) : undefined;
  const limit     = Math.min(40, Math.max(1, Number(args.limit ?? 20)));
  const resolve   = args.resolve !== false;

  if (!instance) return { error: "instance_url is required." };
  if (!token)    return { error: "access_token is required." };
  if (!query)    return { error: "query is required." };

  let path = `/api/v2/search?q=${encodeURIComponent(query)}&limit=${limit}&resolve=${resolve}`;
  if (type) {
    const validTypes = ["accounts", "statuses", "hashtags"];
    if (!validTypes.includes(type)) {
      return { error: `Invalid type. Valid options: ${validTypes.join(", ")}.` };
    }
    path += `&type=${type}`;
  }

  const result = await mastodonGet(instance, token, path);
  if (result && typeof result === "object") {
    const r = result as Record<string, unknown>;
    return {
      query,
      accounts: Array.isArray(r.accounts)
        ? r.accounts.map((a) => slimAccount(a as Record<string, unknown>))
        : [],
      statuses: Array.isArray(r.statuses)
        ? r.statuses.map((s) => slimStatus(s as Record<string, unknown>))
        : [],
      hashtags: r.hashtags ?? [],
    };
  }
  return result;
}

async function actionProfile(args: Record<string, unknown>): Promise<unknown> {
  const instance  = String(args.instance_url ?? "").trim();
  const token     = String(args.access_token ?? "").trim();
  const accountId = args.account_id ? String(args.account_id).trim() : undefined;
  const acct      = args.acct ? String(args.acct).trim() : undefined;

  if (!instance) return { error: "instance_url is required." };
  if (!token)    return { error: "access_token is required." };

  let path: string;
  if (accountId) {
    path = `/api/v1/accounts/${encodeURIComponent(accountId)}`;
  } else if (acct) {
    path = `/api/v1/accounts/lookup?acct=${encodeURIComponent(acct)}`;
  } else {
    // Return the authenticated user's own profile
    path = "/api/v1/accounts/verify_credentials";
  }

  const result = await mastodonGet(instance, token, path);
  if (result && typeof result === "object" && "id" in (result as object)) {
    return slimAccount(result as Record<string, unknown>);
  }
  return result;
}

async function actionFollow(args: Record<string, unknown>): Promise<unknown> {
  const instance  = String(args.instance_url ?? "").trim();
  const token     = String(args.access_token ?? "").trim();
  const accountId = String(args.account_id ?? "").trim();
  const unfollow  = args.unfollow === true;

  if (!instance)  return { error: "instance_url is required." };
  if (!token)     return { error: "access_token is required." };
  if (!accountId) return { error: "account_id is required." };

  const action = unfollow ? "unfollow" : "follow";
  const result = await mastodonPost(instance, token, `/api/v1/accounts/${accountId}/${action}`);

  if (result && typeof result === "object") {
    const r = result as Record<string, unknown>;
    // /follow returns a Relationship object
    return {
      action,
      account_id: accountId,
      relationship: {
        id: r.id,
        following: r.following,
        followed_by: r.followed_by,
        blocking: r.blocking,
        muting: r.muting,
        requested: r.requested,
        endorsed: r.endorsed,
      },
    };
  }
  return result;
}

async function actionNotifications(args: Record<string, unknown>): Promise<unknown> {
  const instance  = String(args.instance_url ?? "").trim();
  const token     = String(args.access_token ?? "").trim();
  const limit     = Math.min(30, Math.max(1, Number(args.limit ?? 15)));
  const types     = Array.isArray(args.types) ? args.types.map(String) : undefined;

  if (!instance) return { error: "instance_url is required." };
  if (!token)    return { error: "access_token is required." };

  let path = `/api/v1/notifications?limit=${limit}`;
  if (args.max_id) {
    path += `&max_id=${encodeURIComponent(String(args.max_id))}`;
  }
  if (types && types.length > 0) {
    for (const t of types) {
      path += `&types[]=${encodeURIComponent(t)}`;
    }
  }

  const result = await mastodonGet(instance, token, path);
  if (Array.isArray(result)) {
    return {
      count: result.length,
      notifications: result.map((n) => slimNotification(n as Record<string, unknown>)),
    };
  }
  return result;
}

// ── Public dispatcher ─────────────────────────────────────────────────────────

export async function mastodonAction(
  toolName: string,
  args: Record<string, unknown>
): Promise<unknown> {
  switch (toolName) {
    case "mastodon_post":          return actionPost(args);
    case "mastodon_read_timeline": return actionReadTimeline(args);
    case "mastodon_reply":         return actionReply(args);
    case "mastodon_boost":         return actionBoost(args);
    case "mastodon_favorite":      return actionFavorite(args);
    case "mastodon_search":        return actionSearch(args);
    case "mastodon_profile":       return actionProfile(args);
    case "mastodon_follow":        return actionFollow(args);
    case "mastodon_notifications": return actionNotifications(args);
    default:
      return {
        error: `Unknown Mastodon action: "${toolName}". Valid tools: mastodon_post, mastodon_read_timeline, mastodon_reply, mastodon_boost, mastodon_favorite, mastodon_search, mastodon_profile, mastodon_follow, mastodon_notifications.`,
      };
  }
}
