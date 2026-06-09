// Numbers API integration - interesting facts about numbers, dates, and years.
// No authentication required - completely free and open.
// Base URL: https://numbersapi.com/

const NUMBERS_BASE = "https://numbersapi.com";
const NUMBERS_TIMEOUT_MS = Number(process.env.NUMBERS_TIMEOUT_MS) || 10000;

const VALID_TYPES = ["trivia", "math", "date", "year"] as const;
type NumberType = typeof VALID_TYPES[number];

// ─── API helper ───────────────────────────────────────────────────────────────

interface NumbersResponse {
  text: string;
  number: number | string;
  found: boolean;
  type: string;
}

async function numbersFetch(path: string): Promise<NumbersResponse> {
  const url = `${NUMBERS_BASE}${path}?json`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NUMBERS_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Numbers API request timed out after ${NUMBERS_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Numbers API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 404 || res.status === 403) {
    throw new Error(`Numbers API returned HTTP ${res.status}. The service at numbersapi.com may be temporarily unavailable.`);
  }
  if (!res.ok) throw new Error(`Numbers API HTTP ${res.status}`);
  return res.json() as Promise<NumbersResponse>;
}

// ─── number_fact ──────────────────────────────────────────────────────────────
// GET /{number}/{type}?json

export async function numberFact(args: Record<string, unknown>): Promise<unknown> {
  const number = String(args.number ?? "").trim();
  if (!number) return { error: "number is required." };

  const type: NumberType = VALID_TYPES.includes(String(args.type ?? "trivia") as NumberType)
    ? (String(args.type) as NumberType)
    : "trivia";

  const data = await numbersFetch(`/${encodeURIComponent(number)}/${type}`);

  return {
    number: data.number,
    type: data.type,
    fact: data.text,
    found: data.found,
  };
}

// ─── number_random ────────────────────────────────────────────────────────────
// GET /random/{type}?json

export async function numberRandom(args: Record<string, unknown>): Promise<unknown> {
  const type: NumberType = VALID_TYPES.includes(String(args.type ?? "trivia") as NumberType)
    ? (String(args.type) as NumberType)
    : "trivia";

  const data = await numbersFetch(`/random/${type}`);

  return {
    number: data.number,
    type: data.type,
    fact: data.text,
    found: data.found,
  };
}
