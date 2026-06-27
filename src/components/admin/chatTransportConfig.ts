// ============================================================
// Chat transport config (client)
//
// Providers the api lane can call on the user's own key. OpenRouter is
// first-class: its model list is pulled LIVE from the public catalog
// (fetchOpenRouterModels) so new and trending models appear on their own,
// with the curated list below as an offline fallback. Other providers
// keep a curated current set, and the picker also allows a custom model
// id so nothing is ever a dead end. The slug matches
// user_credentials.platform_slug so the server finds the key.
// ============================================================

export const CHAT_API_KEY_STORAGE = "unclick_api_key";
export const CHAT_API_ENDPOINT = "/api/chat";

export interface ChatModelOption {
  value: string;
  label: string;
  hint?: string;
}

export interface ChatProviderOption {
  slug: string;
  label: string;
  models: ChatModelOption[];
}

export const CHAT_PROVIDERS: ChatProviderOption[] = [
  {
    slug: "openrouter",
    label: "OpenRouter",
    // Fallback only - the live catalog (fetchOpenRouterModels) is primary.
    models: [
      { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
      { value: "openai/gpt-4o", label: "GPT-4o" },
      { value: "openai/gpt-4o-mini", label: "GPT-4o mini" },
      { value: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash" },
      { value: "deepseek/deepseek-chat", label: "DeepSeek V3" },
      { value: "meta-llama/llama-3.3-70b-instruct", label: "Llama 3.3 70B" },
      { value: "qwen/qwen-2.5-72b-instruct", label: "Qwen 2.5 72B" },
      { value: "x-ai/grok-2", label: "Grok 2" },
      { value: "z-ai/glm-4.6", label: "GLM 4.6" },
      { value: "mistralai/mistral-large", label: "Mistral Large" },
    ],
  },
  {
    slug: "openai",
    label: "OpenAI",
    models: [
      { value: "gpt-4o", label: "GPT-4o" },
      { value: "gpt-4o-mini", label: "GPT-4o mini" },
      { value: "o3-mini", label: "o3-mini" },
    ],
  },
  {
    slug: "anthropic",
    label: "Anthropic",
    models: [
      { value: "claude-opus-4-8", label: "Claude Opus 4.8" },
      { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6" },
      { value: "claude-haiku-4-5", label: "Claude Haiku 4.5" },
    ],
  },
  {
    slug: "groq",
    label: "Groq",
    models: [
      { value: "llama-3.3-70b-versatile", label: "Llama 3.3 70B" },
      { value: "llama-3.1-8b-instant", label: "Llama 3.1 8B (instant)" },
    ],
  },
  {
    slug: "mistral",
    label: "Mistral",
    models: [
      { value: "mistral-large-latest", label: "Mistral Large" },
      { value: "mistral-small-latest", label: "Mistral Small" },
    ],
  },
  {
    slug: "perplexity",
    label: "Perplexity",
    models: [
      { value: "sonar", label: "Sonar" },
      { value: "sonar-pro", label: "Sonar Pro" },
      { value: "sonar-reasoning", label: "Sonar Reasoning" },
    ],
  },
  {
    slug: "togetherai",
    label: "Together",
    models: [
      { value: "meta-llama/Llama-3.3-70B-Instruct-Turbo", label: "Llama 3.3 70B" },
      { value: "deepseek-ai/DeepSeek-V3", label: "DeepSeek V3" },
      { value: "Qwen/Qwen2.5-72B-Instruct-Turbo", label: "Qwen 2.5 72B" },
    ],
  },
];

export function findChatProvider(slug: string): ChatProviderOption | undefined {
  return CHAT_PROVIDERS.find((p) => p.slug === slug);
}

// Read the UnClick api key from localStorage, validating the prefix.
export function getChatApiKey(): string | null {
  try {
    const k = localStorage.getItem(CHAT_API_KEY_STORAGE);
    return k && (k.startsWith("uc_") || k.startsWith("agt_")) ? k : null;
  } catch {
    return null;
  }
}

// Rough live token estimate for the meter (~4 chars per token). Labeled
// "est" in the UI; exact counts come from the server-persisted turn.
export function estimateTokens(text: string): number {
  return Math.max(0, Math.ceil(text.length / 4));
}

// ─── OpenRouter live catalog ──────────────────────────────────────
//
// The public models list is unauthenticated and CORS-open, so the browser
// can read it directly. We sort popular families to the top and keep the
// long tail alphabetical so search ("glm", "opus", "deepseek") always works.

const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";

interface OpenRouterModel {
  id?: string;
  name?: string;
  context_length?: number;
}

const POPULAR_HINTS = [
  "anthropic/claude-opus",
  "anthropic/claude-sonnet",
  "anthropic/claude",
  "openai/gpt-5",
  "openai/gpt-4o",
  "openai/o",
  "google/gemini-3",
  "google/gemini-2",
  "deepseek",
  "x-ai/grok",
  "meta-llama/llama-4",
  "meta-llama/llama-3",
  "qwen",
  "z-ai/glm",
  "moonshot",
  "mistralai/mistral-large",
  "mistralai",
];

function popularityRank(id: string): number {
  const i = POPULAR_HINTS.findIndex((h) => id.startsWith(h));
  return i === -1 ? POPULAR_HINTS.length : i;
}

function contextHint(n?: number): string | undefined {
  if (!n || n <= 0) return undefined;
  return n >= 1000 ? `${Math.round(n / 1000)}K ctx` : `${n} ctx`;
}

// Fetch the live OpenRouter model catalog. Returns null on any failure so
// the caller can fall back to the curated list; never throws.
export async function fetchOpenRouterModels(timeoutMs = 8000): Promise<ChatModelOption[] | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(OPENROUTER_MODELS_URL, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;

    const body = (await res.json()) as { data?: OpenRouterModel[] };
    const rows = Array.isArray(body?.data) ? body.data : [];
    const options: ChatModelOption[] = rows
      .filter((m): m is OpenRouterModel & { id: string } => typeof m.id === "string" && m.id.length > 0)
      .map((m) => ({
        value: m.id,
        label: m.name || m.id,
        hint: contextHint(m.context_length),
      }));

    if (options.length === 0) return null;

    options.sort((a, b) => {
      const rank = popularityRank(a.value) - popularityRank(b.value);
      return rank !== 0 ? rank : a.label.localeCompare(b.label);
    });
    return options;
  } catch {
    return null;
  }
}
