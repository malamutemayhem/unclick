export type ComputeTier = "api" | "local" | "subscription";

export interface ComputeProvider {
  id: string;
  name: string;
  tier: ComputeTier;
  status: "active" | "inactive" | "error";
  icon?: string;
}

export interface ApiProvider extends ComputeProvider {
  tier: "api";
  endpoint: string;
  model: string;
  costPerMToken?: number;
  rateLimitRpm?: number;
}

export interface LocalProvider extends ComputeProvider {
  tier: "local";
  device: string;
  lastHeartbeat: string | null;
  seatId: string | null;
}

export interface SubscriptionProvider extends ComputeProvider {
  tier: "subscription";
  plan: string;
  renewsAt: string | null;
  seatsIncluded: number;
  seatsUsed: number;
}

export type AnyProvider = ApiProvider | LocalProvider | SubscriptionProvider;

export interface TierSummary {
  tier: ComputeTier;
  label: string;
  description: string;
  providerCount: number;
  activeCount: number;
}

export const TIER_META: Record<ComputeTier, { label: string; description: string }> = {
  api: {
    label: "API",
    description: "Cloud API endpoints billed per token or per call",
  },
  local: {
    label: "Local",
    description: "On-device compute from PC tethers and local agents",
  },
  subscription: {
    label: "Subscription",
    description: "Recurring seat capacity from provider subscriptions",
  },
};

export const COMPUTE_TIERS: ComputeTier[] = ["api", "local", "subscription"];

const API_KEYWORDS = [
  "api", "openai", "anthropic", "claude-api", "groq", "mistral",
  "together", "cohere", "deepseek", "fireworks", "perplexity",
  "replicate", "anyscale",
];

const LOCAL_KEYWORDS = [
  "ollama", "local", "llama.cpp", "lmstudio", "lm studio",
  "llamafile", "mlx", "gguf", "localhost", "127.0.0.1",
  "vllm", "text-generation", "kobold",
];

export function classifyComputeTier(
  provider: string | undefined,
  device: string | undefined,
): ComputeTier {
  const haystack = `${provider ?? ""} ${device ?? ""}`.toLowerCase();
  if (API_KEYWORDS.some((kw) => haystack.includes(kw))) return "api";
  if (LOCAL_KEYWORDS.some((kw) => haystack.includes(kw))) return "local";
  return "subscription";
}

export function resolveComputeTier(
  explicitTier: ComputeTier | undefined,
  provider: string | undefined,
  device: string | undefined,
): ComputeTier {
  if (explicitTier) return explicitTier;
  return classifyComputeTier(provider, device);
}

export type ComputeTierFilter = ComputeTier | "all";

export function filterSeatsByTier<T extends { computeTier?: ComputeTier; provider?: string; device?: string }>(
  seats: T[],
  filter: ComputeTierFilter,
): T[] {
  if (filter === "all") return seats;
  return seats.filter((seat) =>
    resolveComputeTier(seat.computeTier, seat.provider, seat.device) === filter,
  );
}

export function countSeatsByTier<T extends { computeTier?: ComputeTier; provider?: string; device?: string }>(
  seats: T[],
): Record<ComputeTier, number> {
  const counts: Record<ComputeTier, number> = { api: 0, local: 0, subscription: 0 };
  for (const seat of seats) {
    counts[resolveComputeTier(seat.computeTier, seat.provider, seat.device)]++;
  }
  return counts;
}
