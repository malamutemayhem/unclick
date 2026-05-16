/**
 * Thin embedding wrapper.
 *
 * OpenAI remains opt-in. The local provider is a deterministic, dependency-free
 * hashed text embedding so Memory can test and run an open-source lane without
 * forcing paid provider credentials.
 */

export const OPENAI_EMBEDDING_MODEL = "text-embedding-3-small";
export const LOCAL_EMBEDDING_MODEL = "unclick-local-hash-embedding-v1";
export const EMBEDDING_MODEL = OPENAI_EMBEDDING_MODEL;
export const EMBEDDING_DIMS = 1536;

// OpenAI hard limit for text-embedding-3-small is 8191 tokens (~32K chars).
// Slicing at 32000 chars is a safe approximation.
const MAX_INPUT_CHARS = 32_000;

interface OpenAIEmbeddingResponse {
  data: Array<{ embedding: number[] }>;
}

export interface MemoryEmbeddingState {
  enabled: boolean;
  provider: "none" | "openai" | "local";
  model: string | null;
  dimensions: number;
  admin_state: "disabled" | "ready" | "missing_credentials";
  reason: string;
}

function shouldSkipEmbedding(text: string): boolean {
  const value = text.trim();
  if (!value) return true;

  const lower = value.toLowerCase();
  if (lower.length < 24) return true;
  if (lower.startsWith("heartbeat_last_state:")) return true;
  if (lower.includes("<heartbeat") || lower.includes("</heartbeat>")) return true;

  return [
    "dont_notify",
    "unclick healthy",
    "no new signals",
    "user is caught up",
    "memory self-echo",
    "fact saved: heartbeat_last_state",
    "only memory self-echo signals",
    "top queue unchanged",
  ].some((needle) => lower.includes(needle));
}

export function isOpenAIEmbeddingsEnabled(): boolean {
  const raw = process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED ?? "";
  return raw === "1" || raw.toLowerCase() === "true";
}

function flagEnabled(name: string): boolean {
  const raw = process.env[name] ?? "";
  return raw === "1" || raw.toLowerCase() === "true";
}

export function getEmbeddingState(): MemoryEmbeddingState {
  const provider = String(process.env.MEMORY_EMBEDDINGS_PROVIDER ?? "").trim().toLowerCase();
  const localRequested =
    provider === "local" ||
    provider === "open-source" ||
    provider === "opensource" ||
    provider === "hash" ||
    flagEnabled("MEMORY_OPEN_SOURCE_EMBEDDINGS_ENABLED") ||
    flagEnabled("MEMORY_LOCAL_EMBEDDINGS_ENABLED");

  if (localRequested) {
    return {
      enabled: true,
      provider: "local",
      model: LOCAL_EMBEDDING_MODEL,
      dimensions: EMBEDDING_DIMS,
      admin_state: "ready",
      reason: "Local open-source hashed embeddings enabled.",
    };
  }

  if (isOpenAIEmbeddingsEnabled()) {
    const hasKey = Boolean(process.env.OPENAI_API_KEY);
    return {
      enabled: hasKey,
      provider: "openai",
      model: OPENAI_EMBEDDING_MODEL,
      dimensions: EMBEDDING_DIMS,
      admin_state: hasKey ? "ready" : "missing_credentials",
      reason: hasKey
        ? "OpenAI embeddings enabled by MEMORY_OPENAI_EMBEDDINGS_ENABLED."
        : "OpenAI embeddings requested but OPENAI_API_KEY is not set.",
    };
  }

  return {
    enabled: false,
    provider: "none",
    model: null,
    dimensions: EMBEDDING_DIMS,
    admin_state: "disabled",
    reason: "Embedding writes are disabled; local keyword retrieval remains available.",
  };
}

function hash32(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function localEmbeddingTokens(text: string): string[] {
  const words = text.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) ?? [];
  const grams: string[] = [];
  for (const word of words) {
    grams.push(word);
    if (word.length >= 5) {
      for (let i = 0; i <= word.length - 3; i += 1) {
        grams.push(word.slice(i, i + 3));
      }
    }
  }
  for (let i = 0; i < words.length - 1; i += 1) {
    grams.push(`${words[i]} ${words[i + 1]}`);
  }
  return grams;
}

export function embedTextLocal(text: string): number[] | null {
  if (shouldSkipEmbedding(text)) return null;
  const tokens = localEmbeddingTokens(text.slice(0, MAX_INPUT_CHARS));
  if (tokens.length === 0) return null;
  const vector = Array.from({ length: EMBEDDING_DIMS }, () => 0);
  for (const token of tokens) {
    const hash = hash32(token);
    const index = hash % EMBEDDING_DIMS;
    const sign = hash & 1 ? 1 : -1;
    vector[index] += sign;
  }
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (!Number.isFinite(norm) || norm === 0) return null;
  return vector.map((value) => Number((value / norm).toFixed(6)));
}

export async function embedText(text: string): Promise<number[] | null> {
  const state = getEmbeddingState();
  if (!state.enabled) return null;
  if (shouldSkipEmbedding(text)) return null;

  if (state.provider === "local") {
    return embedTextLocal(text);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_EMBEDDING_MODEL,
        input: text.slice(0, MAX_INPUT_CHARS),
      }),
    });
    if (!res.ok) {
      console.error(`[embeddings] OpenAI error ${res.status}: ${await res.text()}`);
      return null;
    }
    const data = (await res.json()) as OpenAIEmbeddingResponse;
    return data.data[0]?.embedding ?? null;
  } catch (err) {
    console.error("[embeddings] fetch failed:", err);
    return null;
  }
}
