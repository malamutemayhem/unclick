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
