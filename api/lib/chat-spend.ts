// ============================================================
// Chat spend gate
//
// Decide whether a Chat provider call may proceed. Fail-closed:
//   local        - free, always allowed (your own machine)
//   subscription - runs through Crews / MCP sampling, never this api
//                  endpoint, so block it defensively here
//   api          - paid; allowed only for a known provider that has a
//                  real vault key; unknown providers are blocked
//
// This is deliberately separate from the admin-chat spend inventory so
// the locked admin provider union is never widened.
// ============================================================

export type SeatLane = "subscription" | "api" | "local";

export interface ChatSpendInput {
  lane: SeatLane;
  slug: string; // provider slug (api lane) or engine label (local)
  hasVaultKey: boolean; // a decrypted provider key is present
}

export interface ChatSpendDecision {
  allowed: boolean;
  costClass: "free" | "paid";
  reason: string;
}

// Known cloud providers that the api lane may call on the user's key.
export const KNOWN_CLOUD_PROVIDERS = new Set([
  "openai",
  "openrouter",
  "groq",
  "togetherai",
  "mistral",
  "perplexity",
  "anthropic",
]);

export function decideChatProviderCall(input: ChatSpendInput): ChatSpendDecision {
  if (input.lane === "local") {
    return { allowed: true, costClass: "free", reason: "local model on your own machine" };
  }

  if (input.lane === "subscription") {
    return {
      allowed: false,
      costClass: "free",
      reason: "subscription seats run through Crews, not the api endpoint",
    };
  }

  // api lane
  if (!KNOWN_CLOUD_PROVIDERS.has(input.slug)) {
    return { allowed: false, costClass: "paid", reason: `unknown provider "${input.slug}" is blocked` };
  }
  if (!input.hasVaultKey) {
    return { allowed: false, costClass: "paid", reason: `no saved key for "${input.slug}"` };
  }
  return { allowed: true, costClass: "paid", reason: `running on your ${input.slug} key` };
}
