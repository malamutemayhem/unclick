// Reddit API MCP Tool
// Connects to Reddit via OAuth2 bearer tokens (oauth.reddit.com).
// No external dependencies - uses global fetch (Node 18+).
// Rate limit: Reddit allows 60 requests/minute for OAuth clients.

const REDDIT_BASE = "https://oauth.reddit.com";
const USER_AGENT = "UnClick-MCP/1.0 by unclick.dev";

// Per-process rate limit tracking (headers from Reddit responses)
let _remaining = 60;
let _resetAt = Date.now() + 60_000;

// ── Internal fetch helper ────────────────────────────────────────────────────

async function rFetch(
  method: "GET" | "POST",
  path: string,
  accessToken: string,
  body?: Record<string, string | number | boolean>
): Promise<unknown> {
  // Guard: if we have no remaining quota and reset hasn't passed, bail early
  if (_remaining <= 0 && Date.now() < _resetAt) {
    const waitMs = _resetAt - Date.now();
    return {
      error: "rate_limited",
      message: `Reddit rate limit reached. Resets in ${Math.ceil(waitMs / 1000)}s.`,
      retry_after_ms: waitMs,
    };
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": USER_AGENT,
  };

  let url = `${REDDIT_BASE}${path}`;
  let fetchBody: string | undefined;

  if (method === "GET" && body) {
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries(body).map(([k, v]) => [k, String(v)])
      )
    ).toString();
    url = `${url}?${qs}`;
  } else if (method === "POST" && body) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    fetchBody = new URLSearchParams(
      Object.fromEntries(
        Object.entries(body).map(([k, v]) => [k, String(v)])
      )
    ).toString();
  }

  const res = await fetch(url, { method, headers, body: fetchBody });

  // Update rate limit state from response headers
  const rem = res.headers.get("x-ratelimit-remaining");
  const rst = res.headers.get("x-ratelimit-reset");
  if (rem !== null) _remaining = parseFloat(rem);
  if (rst !== null) _resetAt = Date.now() + parseFloat(rst) * 1_000;

  if (res.status === 429) {
    const retryAfter = res.headers.get("retry-after");
    return {
      error: "rate_limited",
      message: "Reddit API rate limit exceeded.",
      retry_after_seconds: retryAfter ? Number(retryAfter) : 60,
    };
  }

  if (res.status === 401) {
    return {
      error: "unauthorized",
      message: "Invalid or expired access token. Re-authenticate via Reddit OAuth2.",
    };
  }

  if (res.status === 403) {
    return {
      error: "forbidden",
      message: "Access denied. Check token scopes or subreddit permissions.",
    };
  }

  if (res.status === 404) {
    return { error: "not_found", message: `Resource not found: ${path}` };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { error: `http_${res.status}`, message: text || res.statusText };
  }

  const json = await res.json() as Record<string, unknown>;

  // Reddit wraps API errors in { error: ..., message: ... }
  if (json && typeof json === "object" && "error" in json) {
    return { error: json["error"], message: json["message"] };
  }

  return json;
}

// ── Shape helpers ────────────────────────────────────────────────────────────

function shapePosts(listing: unknown): unknown[] {
  if (
    !listing ||
    typeof listing !== "object" ||
    !("data" in (listing as object))
  ) return [];

  const data = (listing as Record<string, unknown>)["data"] as Record<string, unknown>;
  const children = Array.isArray(data?.["children"]) ? data["children"] as unknown[] : [];

  return children.map((child) => {
    const d = ((child as Record<string, unknown>)["data"] ?? {}) as Record<string, unknown>;
    return {
      id: d["id"],
      name: d["name"],
      title: d["title"],
      author: d["author"],
      subreddit: d["subreddit"],
      score: d["score"],
      upvote_ratio: d["upvote_ratio"],
      num_comments: d["num_comments"],
      url: d["url"],
      permalink: d["permalink"] ? `https://reddit.com${d["permalink"]}` : null,
      selftext: d["selftext"] ?? null,
      is_self: d["is_self"],
      created_utc: d["created_utc"],
      nsfw: d["over_18"],
      spoiler: d["spoiler"],
      flair: d["link_flair_text"] ?? null,
    };
  });
}

function shapeComments(listing: unknown): unknown[] {
  if (
    !listing ||
    typeof listing !== "object" ||
    !("data" in (listing as object))
  ) return [];

  const data = (listing as Record<string, unknown>)["data"] as Record<string, unknown>;
  const children = Array.isArray(data?.["children"]) ? data["children"] as unknown[] : [];

  return children
    .filter((c) => {
      const kind = (c as Record<string, unknown>)["kind"];
      return kind === "t1";
    })
    .map((child) => {
      const d = ((child as Record<string, unknown>)["data"] ?? {}) as Record<string, unknown>;
      return {
        id: d["id"],
        name: d["name"],
        author: d["author"],
        body: d["body"],
        score: d["score"],
        created_utc: d["created_utc"],
        permalink: d["permalink"] ? `https://reddit.com${d["permalink"]}` : null,
        parent_id: d["parent_id"],
        subreddit: d["subreddit"],
      };
    });
}

// ── Exported operation functions ─────────────────────────────────────────────

export interface RedditReadArgs {
  access_token: string;
  subreddit: string;
  sort?: string;
  limit?: number;
  after?: string;
  t?: string;
}

export async function redditRead(args: RedditReadArgs): Promise<unknown> {
  const sub = args.subreddit.replace(/^r\//i, "");
  const sort = args.sort ?? "hot";
  const limit = Math.min(100, Math.max(1, Number(args.limit ?? 25)));
  const params: Record<string, string | number | boolean> = { limit };
  if (args.after) params["after"] = args.after;
  if (sort === "top" && args.t) params["t"] = args.t;

  const result = await rFetch("GET", `/r/${sub}/${sort}.json`, args.access_token, params);
  if (result && typeof result === "object" && "error" in (result as object)) return result;

  const posts = shapePosts(result);
  const data = (result as Record<string, unknown>)?.["data"] as Record<string, unknown> | undefined;

  return {
    subreddit: sub,
    sort,
    count: posts.length,
    after: data?.["after"] ?? null,
    before: data?.["before"] ?? null,
    posts,
  };
}

export interface RedditPostArgs {
  access_token: string;
  subreddit: string;
  title: string;
  kind: string;
  text?: string;
  url?: string;
  nsfw?: boolean;
  spoiler?: boolean;
  flair_id?: string;
  flair_text?: string;
}

export async function redditPost(args: RedditPostArgs): Promise<unknown> {
  const sub = args.subreddit.replace(/^r\//i, "");
  if (!args.title?.trim()) return { error: "validation", message: "title is required." };
  if (args.kind === "self" && !args.text) return { error: "validation", message: "text is required for self posts." };
  if (args.kind === "link" && !args.url) return { error: "validation", message: "url is required for link posts." };

  const body: Record<string, string | number | boolean> = {
    sr: sub,
    title: args.title,
    kind: args.kind,
    api_type: "json",
    resubmit: true,
    nsfw: args.nsfw ?? false,
    spoiler: args.spoiler ?? false,
  };

  if (args.kind === "self") body["text"] = args.text!;
  if (args.kind === "link") body["url"] = args.url!;
  if (args.flair_id) body["flair_id"] = args.flair_id;
  if (args.flair_text) body["flair_text"] = args.flair_text;

  const result = await rFetch("POST", "/api/submit", args.access_token, body);
  if (result && typeof result === "object" && "error" in (result as object)) return result;

  // Reddit wraps submit response in json.data
  const json = (result as Record<string, unknown>)?.["json"] as Record<string, unknown> | undefined;
  const errors = json?.["errors"] as unknown[];
  if (errors && errors.length > 0) {
    return { error: "submit_error", errors };
  }

  const postData = json?.["data"] as Record<string, unknown> | undefined;
  return {
    success: true,
    id: postData?.["id"],
    name: postData?.["name"],
    url: postData?.["url"],
  };
}

export interface RedditCommentArgs {
  access_token: string;
  parent_id: string;
  text: string;
}

export async function redditComment(args: RedditCommentArgs): Promise<unknown> {
  if (!args.parent_id?.trim()) return { error: "validation", message: "parent_id is required (e.g. t3_abc123 or t1_def456)." };
  if (!args.text?.trim()) return { error: "validation", message: "text is required." };

  const body: Record<string, string | number | boolean> = {
    parent: args.parent_id,
    text: args.text,
    api_type: "json",
  };

  const result = await rFetch("POST", "/api/comment", args.access_token, body);
  if (result && typeof result === "object" && "error" in (result as object)) return result;

  const json = (result as Record<string, unknown>)?.["json"] as Record<string, unknown> | undefined;
  const errors = json?.["errors"] as unknown[];
  if (errors && errors.length > 0) {
    return { error: "comment_error", errors };
  }

  const things = (json?.["data"] as Record<string, unknown>)?.["things"] as unknown[];
  const first = things?.[0] as Record<string, unknown> | undefined;
  const d = (first?.["data"] ?? {}) as Record<string, unknown>;

  return {
    success: true,
    id: d["id"],
    name: d["name"],
    author: d["author"],
    body: d["body"],
    created_utc: d["created_utc"],
    permalink: d["permalink"] ? `https://reddit.com${d["permalink"]}` : null,
  };
}

export interface RedditSearchArgs {
  access_token: string;
  query: string;
  subreddit?: string;
  sort?: string;
  t?: string;
  limit?: number;
  after?: string;
}

export async function redditSearch(args: RedditSearchArgs): Promise<unknown> {
  if (!args.query?.trim()) return { error: "validation", message: "query is required." };

  const limit = Math.min(100, Math.max(1, Number(args.limit ?? 25)));
  const params: Record<string, string | number | boolean> = {
    q: args.query,
    sort: args.sort ?? "relevance",
    limit,
    type: "link",
  };

  if (args.t) params["t"] = args.t;
  if (args.after) params["after"] = args.after;
  if (args.subreddit) params["restrict_sr"] = true;

  const sub = args.subreddit?.replace(/^r\//i, "");
  const path = sub ? `/r/${sub}/search.json` : "/search.json";

  const result = await rFetch("GET", path, args.access_token, params);
  if (result && typeof result === "object" && "error" in (result as object)) return result;

  const posts = shapePosts(result);
  const data = (result as Record<string, unknown>)?.["data"] as Record<string, unknown> | undefined;

  return {
    query: args.query,
    subreddit: sub ?? null,
    sort: args.sort ?? "relevance",
    count: posts.length,
    after: data?.["after"] ?? null,
    results: posts,
  };
}

export interface RedditUserArgs {
  access_token: string;
  username: string;
  include_posts?: boolean;
  include_comments?: boolean;
  limit?: number;
}

export async function redditUser(args: RedditUserArgs): Promise<unknown> {
  const username = args.username.replace(/^u\//i, "");
  if (!username) return { error: "validation", message: "username is required." };

  const limit = Math.min(100, Math.max(1, Number(args.limit ?? 10)));

  const [aboutResult, ...activityResults] = await Promise.all([
    rFetch("GET", `/user/${username}/about.json`, args.access_token),
    args.include_posts !== false
      ? rFetch("GET", `/user/${username}/submitted.json`, args.access_token, { limit })
      : Promise.resolve(null),
    args.include_comments !== false
      ? rFetch("GET", `/user/${username}/comments.json`, args.access_token, { limit })
      : Promise.resolve(null),
  ]);

  if (aboutResult && typeof aboutResult === "object" && "error" in (aboutResult as object)) {
    return aboutResult;
  }

  const userData = ((aboutResult as Record<string, unknown>)?.["data"] ?? {}) as Record<string, unknown>;

  const profile = {
    id: userData["id"],
    name: userData["name"],
    created_utc: userData["created_utc"],
    link_karma: userData["link_karma"],
    comment_karma: userData["comment_karma"],
    is_verified: userData["verified"],
    is_mod: userData["is_mod"],
    icon_img: userData["icon_img"],
    snoovatar_img: userData["snoovatar_img"],
    subreddit: userData["subreddit"]
      ? {
          display_name: (userData["subreddit"] as Record<string, unknown>)?.["display_name"],
          public_description: (userData["subreddit"] as Record<string, unknown>)?.["public_description"],
          subscribers: (userData["subreddit"] as Record<string, unknown>)?.["subscribers"],
        }
      : null,
  };

  const [postsResult, commentsResult] = activityResults;
  const result: Record<string, unknown> = { profile };

  if (postsResult && !(typeof postsResult === "object" && "error" in (postsResult as object))) {
    result["recent_posts"] = shapePosts(postsResult);
  }
  if (commentsResult && !(typeof commentsResult === "object" && "error" in (commentsResult as object))) {
    result["recent_comments"] = shapeComments(commentsResult);
  }

  return result;
}

export interface RedditVoteArgs {
  access_token: string;
  id: string;
  dir: number;
}

export async function redditVote(args: RedditVoteArgs): Promise<unknown> {
  if (!args.id?.trim()) return { error: "validation", message: "id (fullname) is required, e.g. t3_abc123." };
  const dir = Number(args.dir);
  if (dir !== 1 && dir !== 0 && dir !== -1) {
    return { error: "validation", message: "dir must be 1 (upvote), 0 (remove vote), or -1 (downvote)." };
  }

  const result = await rFetch("POST", "/api/vote", args.access_token, {
    id: args.id,
    dir,
  });

  if (result && typeof result === "object" && "error" in (result as object)) return result;

  return {
    success: true,
    id: args.id,
    dir,
    action: dir === 1 ? "upvoted" : dir === -1 ? "downvoted" : "vote_removed",
  };
}

export interface RedditSubscribeArgs {
  access_token: string;
  subreddit: string;
  action: string;
}

export async function redditSubscribe(args: RedditSubscribeArgs): Promise<unknown> {
  const sub = args.subreddit.replace(/^r\//i, "");
  if (!sub) return { error: "validation", message: "subreddit is required." };
  if (args.action !== "sub" && args.action !== "unsub") {
    return { error: "validation", message: "action must be 'sub' or 'unsub'." };
  }

  // Fetch subreddit info to get the fullname (sr_name param is also accepted)
  const result = await rFetch("POST", "/api/subscribe", args.access_token, {
    action: args.action,
    sr_name: sub,
  });

  if (result && typeof result === "object" && "error" in (result as object)) return result;

  return {
    success: true,
    subreddit: sub,
    action: args.action === "sub" ? "subscribed" : "unsubscribed",
  };
}
