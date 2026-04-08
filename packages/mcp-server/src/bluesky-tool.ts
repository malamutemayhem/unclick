// ─── Bluesky / AT Protocol Tool ───────────────────────────────────────────────
// Connects to the Bluesky social network via the AT Protocol XRPC API.
// Each call authenticates fresh via createSession (no token persistence).
// No external dependencies - Node.js built-in fetch only.

const BSKY_HOST = "https://bsky.social";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BskySession {
  accessJwt: string;
  did:       string;
  handle:    string;
}

interface AtUri {
  did:        string;
  collection: string;
  rkey:       string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function createSession(identifier: string, password: string): Promise<BskySession> {
  const res = await fetch(`${BSKY_HOST}/xrpc/com.atproto.server.createSession`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ identifier, password }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Auth failed (${res.status}): ${body}`);
  }
  return res.json() as Promise<BskySession>;
}

async function xrpcGet(
  lexicon: string,
  token:  string,
  params: Record<string, unknown> = {}
): Promise<unknown> {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) {
      if (Array.isArray(v)) {
        for (const item of v) qs.append(k, String(item));
      } else {
        qs.set(k, String(v));
      }
    }
  }
  const url = `${BSKY_HOST}/xrpc/${lexicon}${qs.toString() ? `?${qs}` : ""}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${lexicon} failed (${res.status}): ${body}`);
  }
  return res.json();
}

async function xrpcPost(
  lexicon: string,
  token:  string,
  body:   unknown
): Promise<unknown> {
  const res = await fetch(`${BSKY_HOST}/xrpc/${lexicon}`, {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${lexicon} failed (${res.status}): ${text}`);
  }
  return res.json();
}

function parseAtUri(uri: string): AtUri {
  // at://did:plc:xxxx/app.bsky.feed.post/rkey
  const match = uri.match(/^at:\/\/(did:[^/]+)\/([^/]+)\/([^/]+)$/);
  if (!match) throw new Error(`Invalid AT URI: "${uri}"`);
  return { did: match[1], collection: match[2], rkey: match[3] };
}

async function resolvePostRef(
  uri:   string,
  token: string
): Promise<{ uri: string; cid: string }> {
  const data = await xrpcGet("app.bsky.feed.getPosts", token, { uris: [uri] }) as {
    posts: Array<{ uri: string; cid: string }>;
  };
  const post = data.posts?.[0];
  if (!post) throw new Error(`Post not found: ${uri}`);
  return { uri: post.uri, cid: post.cid };
}

function nowIso(): string {
  return new Date().toISOString();
}

// ─── Action handlers ──────────────────────────────────────────────────────────

async function actionPost(
  identifier: string,
  password:   string,
  text:       string,
  langs?:     string[]
): Promise<unknown> {
  if (!text.trim()) return { error: "text is required." };
  if (text.length > 300) return { error: "Text exceeds 300 characters." };

  const session = await createSession(identifier, password);
  const record: Record<string, unknown> = {
    $type:     "app.bsky.feed.post",
    text,
    createdAt: nowIso(),
  };
  if (langs && langs.length > 0) record.langs = langs;

  const result = await xrpcPost("com.atproto.repo.createRecord", session.accessJwt, {
    repo:       session.did,
    collection: "app.bsky.feed.post",
    record,
  }) as { uri: string; cid: string };

  return {
    success:  true,
    uri:      result.uri,
    cid:      result.cid,
    text,
    author:   session.handle,
    posted_at: nowIso(),
  };
}

async function actionReadFeed(
  identifier: string,
  password:   string,
  feed_type:  "home" | "user",
  actor?:     string,
  limit:      number = 20,
  cursor?:    string
): Promise<unknown> {
  const session = await createSession(identifier, password);

  if (feed_type === "user") {
    const target = actor ?? session.handle;
    const data = await xrpcGet("app.bsky.feed.getAuthorFeed", session.accessJwt, {
      actor:  target,
      limit:  Math.min(100, Math.max(1, limit)),
      cursor,
    }) as { feed: unknown[]; cursor?: string };

    return {
      feed_type: "user",
      actor:     target,
      count:     data.feed?.length ?? 0,
      cursor:    data.cursor,
      posts:     data.feed,
    };
  }

  // home timeline
  const data = await xrpcGet("app.bsky.feed.getTimeline", session.accessJwt, {
    limit:  Math.min(100, Math.max(1, limit)),
    cursor,
  }) as { feed: unknown[]; cursor?: string };

  return {
    feed_type: "home",
    count:     data.feed?.length ?? 0,
    cursor:    data.cursor,
    posts:     data.feed,
  };
}

async function actionReply(
  identifier:  string,
  password:    string,
  text:        string,
  parent_uri:  string,
  root_uri?:   string,
  langs?:      string[]
): Promise<unknown> {
  if (!text.trim())       return { error: "text is required." };
  if (!parent_uri.trim()) return { error: "parent_uri is required." };
  if (text.length > 300)  return { error: "Text exceeds 300 characters." };

  const session = await createSession(identifier, password);

  const parentRef = await resolvePostRef(parent_uri, session.accessJwt);
  const rootRef   = root_uri
    ? await resolvePostRef(root_uri, session.accessJwt)
    : parentRef;

  const record: Record<string, unknown> = {
    $type:     "app.bsky.feed.post",
    text,
    createdAt: nowIso(),
    reply: {
      root:   rootRef,
      parent: parentRef,
    },
  };
  if (langs && langs.length > 0) record.langs = langs;

  const result = await xrpcPost("com.atproto.repo.createRecord", session.accessJwt, {
    repo:       session.did,
    collection: "app.bsky.feed.post",
    record,
  }) as { uri: string; cid: string };

  return {
    success:    true,
    uri:        result.uri,
    cid:        result.cid,
    text,
    parent_uri,
    root_uri:   rootRef.uri,
    author:     session.handle,
    posted_at:  nowIso(),
  };
}

async function actionLike(
  identifier: string,
  password:   string,
  post_uri:   string
): Promise<unknown> {
  if (!post_uri.trim()) return { error: "post_uri is required." };

  const session = await createSession(identifier, password);
  const subject = await resolvePostRef(post_uri, session.accessJwt);

  const result = await xrpcPost("com.atproto.repo.createRecord", session.accessJwt, {
    repo:       session.did,
    collection: "app.bsky.feed.like",
    record: {
      $type:     "app.bsky.feed.like",
      subject,
      createdAt: nowIso(),
    },
  }) as { uri: string; cid: string };

  return {
    success:  true,
    like_uri: result.uri,
    post_uri: subject.uri,
    author:   session.handle,
  };
}

async function actionRepost(
  identifier: string,
  password:   string,
  post_uri:   string
): Promise<unknown> {
  if (!post_uri.trim()) return { error: "post_uri is required." };

  const session = await createSession(identifier, password);
  const subject = await resolvePostRef(post_uri, session.accessJwt);

  const result = await xrpcPost("com.atproto.repo.createRecord", session.accessJwt, {
    repo:       session.did,
    collection: "app.bsky.feed.repost",
    record: {
      $type:     "app.bsky.feed.repost",
      subject,
      createdAt: nowIso(),
    },
  }) as { uri: string; cid: string };

  return {
    success:     true,
    repost_uri:  result.uri,
    post_uri:    subject.uri,
    author:      session.handle,
  };
}

async function actionSearch(
  identifier: string,
  password:   string,
  query:      string,
  type:       "posts" | "users",
  limit:      number = 25,
  cursor?:    string
): Promise<unknown> {
  if (!query.trim()) return { error: "query is required." };

  const session = await createSession(identifier, password);
  const cap     = Math.min(100, Math.max(1, limit));

  if (type === "users") {
    const data = await xrpcGet("app.bsky.actor.searchActors", session.accessJwt, {
      q:      query,
      limit:  cap,
      cursor,
    }) as { actors: unknown[]; cursor?: string };

    return {
      type:   "users",
      query,
      count:  data.actors?.length ?? 0,
      cursor: data.cursor,
      actors: data.actors,
    };
  }

  const data = await xrpcGet("app.bsky.feed.searchPosts", session.accessJwt, {
    q:      query,
    limit:  cap,
    cursor,
  }) as { posts: unknown[]; cursor?: string; hitsTotal?: number };

  return {
    type:       "posts",
    query,
    count:      data.posts?.length ?? 0,
    hits_total: data.hitsTotal,
    cursor:     data.cursor,
    posts:      data.posts,
  };
}

async function actionProfile(
  identifier: string,
  password:   string,
  actor:      string
): Promise<unknown> {
  if (!actor.trim()) return { error: "actor is required." };

  const session = await createSession(identifier, password);
  return xrpcGet("app.bsky.actor.getProfile", session.accessJwt, { actor });
}

async function actionFollow(
  identifier: string,
  password:   string,
  actor:      string,
  unfollow:   boolean
): Promise<unknown> {
  if (!actor.trim()) return { error: "actor is required." };

  const session = await createSession(identifier, password);

  // Resolve actor to DID (accepts handle or DID)
  const profile = await xrpcGet("app.bsky.actor.getProfile", session.accessJwt, {
    actor,
  }) as { did: string; handle: string };

  const subjectDid = profile.did;

  if (unfollow) {
    // Find the follow record via listRecords
    const records = await xrpcGet("com.atproto.repo.listRecords", session.accessJwt, {
      repo:       session.did,
      collection: "app.bsky.graph.follow",
      limit:      100,
    }) as { records: Array<{ uri: string; value: { subject: string } }> };

    const followRecord = records.records?.find((r) => r.value?.subject === subjectDid);
    if (!followRecord) {
      return { error: `You are not following @${profile.handle}.` };
    }

    const parsed = parseAtUri(followRecord.uri);
    await xrpcPost("com.atproto.repo.deleteRecord", session.accessJwt, {
      repo:       session.did,
      collection: "app.bsky.graph.follow",
      rkey:       parsed.rkey,
    });

    return {
      success:    true,
      action:     "unfollowed",
      actor:      profile.handle,
      actor_did:  subjectDid,
      author:     session.handle,
    };
  }

  const result = await xrpcPost("com.atproto.repo.createRecord", session.accessJwt, {
    repo:       session.did,
    collection: "app.bsky.graph.follow",
    record: {
      $type:     "app.bsky.graph.follow",
      subject:   subjectDid,
      createdAt: nowIso(),
    },
  }) as { uri: string; cid: string };

  return {
    success:    true,
    action:     "followed",
    follow_uri: result.uri,
    actor:      profile.handle,
    actor_did:  subjectDid,
    author:     session.handle,
  };
}

// ─── Public dispatcher ────────────────────────────────────────────────────────

export async function blueskyAction(
  action: string,
  args:   Record<string, unknown>
): Promise<unknown> {
  const identifier = String(args.identifier ?? "").trim();
  const password   = String(args.password   ?? "").trim();

  if (!identifier) return { error: "identifier is required (Bluesky handle or email)." };
  if (!password)   return { error: "password is required." };

  try {
    switch (action) {
      case "bluesky_post": {
        const text  = String(args.text ?? "");
        const langs = Array.isArray(args.langs) ? args.langs.map(String) : undefined;
        return actionPost(identifier, password, text, langs);
      }

      case "bluesky_read_feed": {
        const feed_type = (args.feed_type as "home" | "user") ?? "home";
        const actor     = args.actor ? String(args.actor) : undefined;
        const limit     = Math.min(100, Math.max(1, Number(args.limit ?? 20)));
        const cursor    = args.cursor ? String(args.cursor) : undefined;
        return actionReadFeed(identifier, password, feed_type, actor, limit, cursor);
      }

      case "bluesky_reply": {
        const text       = String(args.text ?? "");
        const parent_uri = String(args.parent_uri ?? "");
        const root_uri   = args.root_uri ? String(args.root_uri) : undefined;
        const langs      = Array.isArray(args.langs) ? args.langs.map(String) : undefined;
        return actionReply(identifier, password, text, parent_uri, root_uri, langs);
      }

      case "bluesky_like": {
        const post_uri = String(args.post_uri ?? "");
        return actionLike(identifier, password, post_uri);
      }

      case "bluesky_repost": {
        const post_uri = String(args.post_uri ?? "");
        return actionRepost(identifier, password, post_uri);
      }

      case "bluesky_search": {
        const query  = String(args.query ?? "");
        const type   = (args.type as "posts" | "users") ?? "posts";
        const limit  = Math.min(100, Math.max(1, Number(args.limit ?? 25)));
        const cursor = args.cursor ? String(args.cursor) : undefined;
        return actionSearch(identifier, password, query, type, limit, cursor);
      }

      case "bluesky_profile": {
        const actor = String(args.actor ?? "");
        return actionProfile(identifier, password, actor);
      }

      case "bluesky_follow": {
        const actor    = String(args.actor ?? "");
        const unfollow = args.unfollow === true;
        return actionFollow(identifier, password, actor, unfollow);
      }

      default:
        return {
          error:
            `Unknown Bluesky action: "${action}". ` +
            "Valid actions: bluesky_post, bluesky_read_feed, bluesky_reply, " +
            "bluesky_like, bluesky_repost, bluesky_search, bluesky_profile, bluesky_follow.",
        };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
