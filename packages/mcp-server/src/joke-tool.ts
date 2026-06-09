// JokeAPI v2 - programming, dad, and general jokes.
// No API key required - completely free and open.
// Base URL: https://v2.jokeapi.dev/

import { stampMeta } from "./connector-meta.js";

const JOKEAPI_BASE = "https://v2.jokeapi.dev";
const JOKE_TIMEOUT_MS = Number(process.env.JOKE_TIMEOUT_MS) || 10000;

interface SingleJokeRaw {
  error: boolean;
  category: string;
  type: "single";
  joke: string;
  id: number;
}

interface TwoPartJokeRaw {
  error: boolean;
  category: string;
  type: "twopart";
  setup: string;
  delivery: string;
  id: number;
}

type JokeRaw = SingleJokeRaw | TwoPartJokeRaw;

interface MultiJokeResponse {
  error: boolean;
  amount: number;
  jokes: JokeRaw[];
}

interface CategoriesResponse {
  error: boolean;
  categories: string[];
  categoryAliases: Array<{ alias: string; resolved: string }>;
}

async function jokeFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), JOKE_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${JOKEAPI_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`JokeAPI request timed out after ${JOKE_TIMEOUT_MS}ms.`);
    }
    throw new Error(`JokeAPI network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`JokeAPI rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`JokeAPI HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

function normalizeJoke(joke: JokeRaw): Record<string, unknown> {
  if (joke.type === "single") {
    return { type: "single", category: joke.category, joke: (joke as SingleJokeRaw).joke, id: joke.id };
  }
  const tp = joke as TwoPartJokeRaw;
  return { type: "twopart", category: tp.category, setup: tp.setup, delivery: tp.delivery, id: tp.id };
}

// ─── joke_random ─────────────────────────────────────────────────────────────
// GET /joke/{category}?type={type}&amount={amount}

export async function jokeRandom(args: Record<string, unknown>): Promise<unknown> {
  try {
    const category = String(args.category ?? "Any");
    const params = new URLSearchParams();

    if (args.type) {
      const t = String(args.type).toLowerCase();
      if (["single", "twopart"].includes(t)) params.set("type", t);
    }

    const amount = args.amount ? Math.min(10, Math.max(1, Number(args.amount))) : undefined;
    if (amount && amount > 1) params.set("amount", String(amount));

    const qs = params.toString();
    const path = `/joke/${encodeURIComponent(category)}${qs ? `?${qs}` : ""}`;

    if (amount && amount > 1) {
      const data = await jokeFetch<MultiJokeResponse>(path);
      return stampMeta({
        count: data.jokes.length,
        jokes: data.jokes.map(normalizeJoke),
      }, {
        source: "JokeAPI v2",
        fetched_at: new Date().toISOString(),
        next_steps: ["Use joke_categories to see all available categories."],
      });
    }

    const data = await jokeFetch<JokeRaw>(path);
    return stampMeta(normalizeJoke(data), {
      source: "JokeAPI v2",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use joke_categories to see all available categories."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── joke_categories ─────────────────────────────────────────────────────────
// GET /categories

export async function jokeCategories(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await jokeFetch<CategoriesResponse>("/categories");
    return stampMeta({
      categories: data.categories,
      categoryAliases: data.categoryAliases,
    }, {
      source: "JokeAPI v2",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use joke_random with a category to get jokes from that category."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
