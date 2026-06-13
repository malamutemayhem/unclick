// JSONPlaceholder - fake REST API for testing and prototyping.
// No API key required - completely free and open.
// Base URL: https://jsonplaceholder.typicode.com/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://jsonplaceholder.typicode.com";
const TIMEOUT_MS = Number(process.env.JSONPLACEHOLDER_TIMEOUT_MS) || 10000;

async function jpFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`JSONPlaceholder request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`JSONPlaceholder network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`JSONPlaceholder rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`JSONPlaceholder HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "jsonplaceholder.typicode.com" };

export async function jpListPosts(args: Record<string, unknown>): Promise<unknown> {
  const userId = args.userId ? Number(args.userId) : undefined;
  try {
    let path = "/posts";
    if (userId) path += `?userId=${userId}`;
    const data = await jpFetch<unknown[]>(path);
    return stampMeta({ count: data.length, posts: data.slice(0, 10) }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use jp_get_post with an ID for the full post.", "Use jp_list_comments to see comments on a post."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function jpGetPost(args: Record<string, unknown>): Promise<unknown> {
  const id = Number(args.id ?? 0);
  if (!id) return { error: "id is required (1-100)." };
  try {
    const data = await jpFetch(`/posts/${id}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use jp_list_comments to see comments on this post."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function jpListComments(args: Record<string, unknown>): Promise<unknown> {
  const postId = Number(args.postId ?? 0);
  if (!postId) return { error: "postId is required." };
  try {
    const data = await jpFetch(`/posts/${postId}/comments`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use jp_list_users to see all users."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function jpListUsers(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await jpFetch("/users");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use jp_list_posts with userId to see a user's posts."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
