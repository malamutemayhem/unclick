// ============================================================
// Chat transport config (client)
//
// Providers the api lane can call on the user's own key. OpenRouter is
// first-class. The model lists are a curated starter set; the OpenRouter
// live catalog dropdown lands with the Seats / API setup work. The slug
// matches user_credentials.platform_slug so the server finds the key.
// ============================================================

export const CHAT_API_KEY_STORAGE = "unclick_api_key";
export const CHAT_API_ENDPOINT = "/api/chat";

export interface ChatModelOption {
  value: string;
  label: string;
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
    models: [
      { value: "openai/gpt-4o-mini", label: "GPT-4o mini" },
      { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
      { value: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash" },
      { value: "meta-llama/llama-3.1-70b-instruct", label: "Llama 3.1 70B" },
    ],
  },
  {
    slug: "openai",
    label: "OpenAI",
    models: [
      { value: "gpt-4o-mini", label: "GPT-4o mini" },
      { value: "gpt-4o", label: "GPT-4o" },
    ],
  },
  {
    slug: "anthropic",
    label: "Anthropic",
    models: [
      { value: "claude-haiku-4-5", label: "Claude Haiku 4.5" },
      { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6" },
    ],
  },
  {
    slug: "groq",
    label: "Groq",
    models: [{ value: "llama-3.3-70b-versatile", label: "Llama 3.3 70B" }],
  },
  {
    slug: "mistral",
    label: "Mistral",
    models: [{ value: "mistral-large-latest", label: "Mistral Large" }],
  },
  {
    slug: "perplexity",
    label: "Perplexity",
    models: [{ value: "sonar", label: "Sonar" }],
  },
  {
    slug: "togetherai",
    label: "Together",
    models: [{ value: "meta-llama/Llama-3.3-70B-Instruct-Turbo", label: "Llama 3.3 70B" }],
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
