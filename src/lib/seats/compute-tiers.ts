export type ComputeTier = "api" | "local" | "subscription";

export interface ComputeTierMeta {
  label: string;
  description: string;
  icon: string;
  costModel: string;
  defaultRoutingWeight: number;
}

export const COMPUTE_TIERS: readonly ComputeTier[] = ["api", "local", "subscription"] as const;

export const DEFAULT_COMPUTE_TIER: ComputeTier = "subscription";

export const COMPUTE_TIER_META: Record<ComputeTier, ComputeTierMeta> = {
  api: {
    label: "API",
    description: "Cloud endpoints billed per call or token",
    icon: "cloud",
    costModel: "per-use",
    defaultRoutingWeight: 1.0,
  },
  local: {
    label: "Local",
    description: "On-device or self-hosted compute",
    icon: "hard-drive",
    costModel: "owned",
    defaultRoutingWeight: 1.2,
  },
  subscription: {
    label: "Subscription",
    description: "SaaS platform seats with fixed billing",
    icon: "credit-card",
    costModel: "fixed",
    defaultRoutingWeight: 1.0,
  },
};

const API_KEYWORDS = [
  "api",
  "openai",
  "anthropic",
  "claude api",
  "groq",
  "replicate",
  "together",
  "mistral api",
  "cohere",
  "perplexity",
  "fireworks",
  "anyscale",
  "deepinfra",
];

const LOCAL_KEYWORDS = [
  "ollama",
  "llamacpp",
  "llama.cpp",
  "local",
  "localhost",
  "self-hosted",
  "on-device",
  "gpu",
  "mlx",
  "gguf",
  "vllm",
  "text-generation-webui",
  "lm studio",
  "lmstudio",
  "koboldcpp",
  "jan.ai",
  "gpt4all",
];

export interface SeatTierInput {
  provider?: string | null;
  device?: string | null;
  userAgentHint?: string | null;
  computeTier?: ComputeTier | null;
}

export function classifySeatTier(seat: SeatTierInput): ComputeTier {
  if (seat.computeTier && COMPUTE_TIERS.includes(seat.computeTier)) {
    return seat.computeTier;
  }

  const haystack = [seat.provider, seat.device, seat.userAgentHint]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (!haystack) return DEFAULT_COMPUTE_TIER;

  for (const keyword of LOCAL_KEYWORDS) {
    if (haystack.includes(keyword)) return "local";
  }

  for (const keyword of API_KEYWORDS) {
    if (haystack.includes(keyword)) return "api";
  }

  return DEFAULT_COMPUTE_TIER;
}

export interface TierSeatInput {
  id: string;
  computeTier?: ComputeTier | null;
  provider?: string | null;
  device?: string | null;
  userAgentHint?: string | null;
  isVirtual?: boolean;
}

export interface TierScoreInput {
  id: string;
  score: number;
  status: string;
}

export interface ComputeTierSummary {
  tier: ComputeTier;
  label: string;
  seatCount: number;
  eligibleCount: number;
  avgHealthScore: number;
  estimatedCost: number | null;
}

export function buildTierSummaries(
  seats: TierSeatInput[],
  scores: TierScoreInput[],
): ComputeTierSummary[] {
  const scoreById = new Map(scores.map((s) => [s.id, s]));

  const grouped = new Map<ComputeTier, TierSeatInput[]>();
  for (const seat of seats) {
    const tier = classifySeatTier(seat);
    const list = grouped.get(tier);
    if (list) {
      list.push(seat);
    } else {
      grouped.set(tier, [seat]);
    }
  }

  const summaries: ComputeTierSummary[] = [];

  for (const tier of COMPUTE_TIERS) {
    const tierSeats = grouped.get(tier);
    if (!tierSeats || tierSeats.length === 0) continue;

    const tierScores = tierSeats
      .map((s) => scoreById.get(s.id))
      .filter((s): s is TierScoreInput => s != null);

    const eligibleCount = tierScores.filter(
      (s) => s.status === "strong" || s.status === "watch",
    ).length;

    const avgHealthScore =
      tierScores.length > 0
        ? Math.round(
            tierScores.reduce((sum, s) => sum + s.score, 0) / tierScores.length,
          )
        : 0;

    summaries.push({
      tier,
      label: COMPUTE_TIER_META[tier].label,
      seatCount: tierSeats.length,
      eligibleCount,
      avgHealthScore,
      estimatedCost: tier === "local" ? 0 : null,
    });
  }

  return summaries;
}

export function estimateTierCost(
  tier: ComputeTier,
  tokens: number,
  costPerMillionTokens = 3.0,
): number | null {
  if (tier === "local") return 0;
  if (tier === "subscription") return null;
  return (tokens / 1_000_000) * costPerMillionTokens;
}
