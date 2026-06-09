import type { ApiProvider } from "./computeTypes";

export interface ApiProviderCatalogEntry {
  slug: string;
  name: string;
  description: string;
  defaultEndpoint: string;
  models: ApiProviderModel[];
}

export interface ApiProviderModel {
  id: string;
  name: string;
  costPerMInput?: number;
  costPerMOutput?: number;
  contextWindow?: number;
  maxOutput?: number;
}

export const API_PROVIDER_CATALOG: ApiProviderCatalogEntry[] = [
  {
    slug: "anthropic",
    name: "Anthropic",
    description: "Claude models for reasoning and code",
    defaultEndpoint: "https://api.anthropic.com/v1",
    models: [
      { id: "claude-opus-4-6", name: "Claude Opus 4.6", costPerMInput: 15, costPerMOutput: 75, contextWindow: 200000, maxOutput: 32000 },
      { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", costPerMInput: 3, costPerMOutput: 15, contextWindow: 200000, maxOutput: 16000 },
      { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", costPerMInput: 0.8, costPerMOutput: 4, contextWindow: 200000, maxOutput: 8192 },
    ],
  },
  {
    slug: "openai",
    name: "OpenAI",
    description: "GPT models and assistants",
    defaultEndpoint: "https://api.openai.com/v1",
    models: [
      { id: "gpt-4.1", name: "GPT-4.1", costPerMInput: 2, costPerMOutput: 8, contextWindow: 1048576, maxOutput: 32768 },
      { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", costPerMInput: 0.4, costPerMOutput: 1.6, contextWindow: 1048576, maxOutput: 32768 },
      { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", costPerMInput: 0.1, costPerMOutput: 0.4, contextWindow: 1048576, maxOutput: 32768 },
      { id: "o3", name: "o3", costPerMInput: 2, costPerMOutput: 8, contextWindow: 200000, maxOutput: 100000 },
      { id: "o4-mini", name: "o4-mini", costPerMInput: 1.1, costPerMOutput: 4.4, contextWindow: 200000, maxOutput: 100000 },
    ],
  },
  {
    slug: "groq",
    name: "Groq",
    description: "Fast LPU inference",
    defaultEndpoint: "https://api.groq.com/openai/v1",
    models: [
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", costPerMInput: 0.59, costPerMOutput: 0.79, contextWindow: 128000, maxOutput: 32768 },
      { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", costPerMInput: 0.24, costPerMOutput: 0.24, contextWindow: 32768, maxOutput: 32768 },
    ],
  },
  {
    slug: "together",
    name: "Together AI",
    description: "Open-source model hosting",
    defaultEndpoint: "https://api.together.xyz/v1",
    models: [
      { id: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo", name: "Llama 3.1 70B Turbo", costPerMInput: 0.88, costPerMOutput: 0.88, contextWindow: 131072 },
      { id: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo", name: "Llama 3.1 8B Turbo", costPerMInput: 0.18, costPerMOutput: 0.18, contextWindow: 131072 },
    ],
  },
  {
    slug: "mistral",
    name: "Mistral",
    description: "European AI models",
    defaultEndpoint: "https://api.mistral.ai/v1",
    models: [
      { id: "mistral-large-latest", name: "Mistral Large", costPerMInput: 2, costPerMOutput: 6, contextWindow: 128000 },
      { id: "mistral-small-latest", name: "Mistral Small", costPerMInput: 0.1, costPerMOutput: 0.3, contextWindow: 32000 },
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    description: "Search-augmented AI",
    defaultEndpoint: "https://api.perplexity.ai",
    models: [
      { id: "sonar-pro", name: "Sonar Pro", costPerMInput: 3, costPerMOutput: 15, contextWindow: 200000 },
      { id: "sonar", name: "Sonar", costPerMInput: 1, costPerMOutput: 1, contextWindow: 128000 },
    ],
  },
];

export function findCatalogEntry(slug: string): ApiProviderCatalogEntry | undefined {
  return API_PROVIDER_CATALOG.find((entry) => entry.slug === slug);
}

export function findModel(slug: string, modelId: string): ApiProviderModel | undefined {
  return findCatalogEntry(slug)?.models.find((m) => m.id === modelId);
}

export function formatCost(costPerM: number | undefined): string {
  if (costPerM === undefined) return "-";
  if (costPerM < 1) return `$${costPerM.toFixed(2)}/M`;
  return `$${costPerM}/M`;
}

export function formatContextWindow(tokens: number | undefined): string {
  if (tokens === undefined) return "-";
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
  return `${Math.round(tokens / 1000)}K`;
}

export const API_PROVIDER_STORAGE_KEY = "unclick_api_providers_v1";

export interface StoredApiProvider {
  id: string;
  slug: string;
  name: string;
  modelId: string;
  endpoint: string;
  status: ApiProvider["status"];
  rateLimitRpm?: number;
  addedAt: string;
}

export function loadStoredProviders(): StoredApiProvider[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(API_PROVIDER_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredProviders(providers: StoredApiProvider[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(API_PROVIDER_STORAGE_KEY, JSON.stringify(providers));
}
