// Open Trivia Database integration.
// No authentication required - completely free and open.
// Base URL: https://opentdb.com/

import { stampMeta } from "./connector-meta.js";

const OPENTDB_BASE = "https://opentdb.com";

// Response codes from the API
const RESPONSE_CODES: Record<number, string> = {
  0: "Success",
  1: "No results - the database does not have enough questions for the requested parameters.",
  2: "Invalid parameter - one or more query parameters is invalid.",
  3: "Token not found.",
  4: "Token is empty - all available questions have been returned.",
  5: "Rate limit - too many requests. Please wait 5 seconds before trying again.",
};

const TRIVIA_TIMEOUT_MS = Number(process.env.TRIVIA_TIMEOUT_MS) || 10000;

async function triviaFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TRIVIA_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${OPENTDB_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Open Trivia DB request timed out after ${TRIVIA_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Open Trivia DB network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Open Trivia DB rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Open Trivia DB HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

interface CategoryResponse {
  trivia_categories: Array<{ id: number; name: string }>;
}

// ─── trivia_questions ─────────────────────────────────────────────────────────
// GET /api.php?amount={n}&category={id}&difficulty={easy|medium|hard}&type={multiple|boolean}

export async function triviaQuestions(args: Record<string, unknown>): Promise<unknown> {
  const amount = Math.min(50, Math.max(1, Number(args.amount ?? 10)));
  const params = new URLSearchParams({ amount: String(amount) });

  if (args.category) params.set("category", String(args.category));
  if (args.difficulty) {
    const diff = String(args.difficulty).toLowerCase();
    if (["easy", "medium", "hard"].includes(diff)) params.set("difficulty", diff);
  }
  if (args.type) {
    const type = String(args.type).toLowerCase();
    if (["multiple", "boolean"].includes(type)) params.set("type", type);
  }

  const data = await triviaFetch<TriviaResponse>(`/api.php?${params}`);

  if (data.response_code !== 0) {
    return {
      error: RESPONSE_CODES[data.response_code] ?? `API error (code ${data.response_code}).`,
      response_code: data.response_code,
    };
  }

  return stampMeta({
    count: data.results.length,
    questions: data.results.map((q) => ({
      category: q.category,
      type: q.type,
      difficulty: q.difficulty,
      question: decodeHtmlEntities(q.question),
      correct_answer: decodeHtmlEntities(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeHtmlEntities),
      all_answers: shuffle([q.correct_answer, ...q.incorrect_answers]).map(decodeHtmlEntities),
    })),
  }, {
    source: "Open Trivia DB",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use trivia_categories to list the available topic ids."],
  });
}

// ─── trivia_categories ────────────────────────────────────────────────────────
// GET /api_category.php

export async function triviaCategories(_args: Record<string, unknown>): Promise<unknown> {
  const data = await triviaFetch<CategoryResponse>("/api_category.php");

  return {
    count: data.trivia_categories.length,
    categories: data.trivia_categories,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rsquo;/g, "\u2019");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
