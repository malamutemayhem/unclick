import { describe, it, expect } from "vitest";
import {
  classifySeatTier,
  buildTierSummaries,
  estimateTierCost,
  COMPUTE_TIERS,
  COMPUTE_TIER_META,
  DEFAULT_COMPUTE_TIER,
  type TierSeatInput,
  type TierScoreInput,
} from "./compute-tiers";

describe("classifySeatTier", () => {
  it("returns explicit computeTier when set", () => {
    expect(classifySeatTier({ computeTier: "api" })).toBe("api");
    expect(classifySeatTier({ computeTier: "local" })).toBe("local");
    expect(classifySeatTier({ computeTier: "subscription" })).toBe("subscription");
  });

  it("classifies Claude API as api tier", () => {
    expect(classifySeatTier({ provider: "Claude API" })).toBe("api");
  });

  it("classifies OpenAI as api tier", () => {
    expect(classifySeatTier({ provider: "OpenAI" })).toBe("api");
  });

  it("classifies Groq as api tier", () => {
    expect(classifySeatTier({ provider: "Groq" })).toBe("api");
  });

  it("classifies Replicate as api tier", () => {
    expect(classifySeatTier({ provider: "Replicate" })).toBe("api");
  });

  it("classifies Anthropic as api tier", () => {
    expect(classifySeatTier({ userAgentHint: "anthropic-sdk" })).toBe("api");
  });

  it("classifies Ollama as local tier", () => {
    expect(classifySeatTier({ provider: "Ollama" })).toBe("local");
  });

  it("classifies llama.cpp as local tier", () => {
    expect(classifySeatTier({ device: "llama.cpp server" })).toBe("local");
  });

  it("classifies LM Studio as local tier", () => {
    expect(classifySeatTier({ provider: "LM Studio" })).toBe("local");
  });

  it("classifies local GPU as local tier", () => {
    expect(classifySeatTier({ device: "local GPU node" })).toBe("local");
  });

  it("classifies self-hosted as local tier", () => {
    expect(classifySeatTier({ provider: "self-hosted vLLM" })).toBe("local");
  });

  it("classifies Codex as subscription tier (default)", () => {
    expect(classifySeatTier({ provider: "Codex" })).toBe("subscription");
  });

  it("classifies Windsurf as subscription tier (default)", () => {
    expect(classifySeatTier({ provider: "Windsurf" })).toBe("subscription");
  });

  it("classifies unknown provider as subscription tier", () => {
    expect(classifySeatTier({ provider: "Unknown AI" })).toBe("subscription");
  });

  it("defaults to subscription when no info provided", () => {
    expect(classifySeatTier({})).toBe("subscription");
  });

  it("defaults to subscription for null fields", () => {
    expect(
      classifySeatTier({ provider: null, device: null, userAgentHint: null }),
    ).toBe("subscription");
  });

  it("explicit computeTier overrides keyword match", () => {
    expect(
      classifySeatTier({ computeTier: "subscription", provider: "Ollama" }),
    ).toBe("subscription");
  });

  it("ignores invalid explicit computeTier", () => {
    expect(
      classifySeatTier({ computeTier: "invalid" as never, provider: "Ollama" }),
    ).toBe("local");
  });

  it("uses userAgentHint for classification", () => {
    expect(classifySeatTier({ userAgentHint: "ollama/0.1" })).toBe("local");
  });

  it("local keywords take precedence over api keywords", () => {
    expect(classifySeatTier({ provider: "localhost api" })).toBe("local");
  });
});

describe("buildTierSummaries", () => {
  const seats: TierSeatInput[] = [
    { id: "s1", provider: "Claude API" },
    { id: "s2", provider: "OpenAI" },
    { id: "s3", provider: "Ollama" },
    { id: "s4", provider: "Codex" },
    { id: "s5", provider: "Windsurf" },
  ];

  const scores: TierScoreInput[] = [
    { id: "s1", score: 90, status: "strong" },
    { id: "s2", score: 70, status: "watch" },
    { id: "s3", score: 85, status: "strong" },
    { id: "s4", score: 60, status: "watch" },
    { id: "s5", score: 40, status: "stale" },
  ];

  it("returns one summary per tier that has seats", () => {
    const summaries = buildTierSummaries(seats, scores);
    expect(summaries.length).toBe(3);
    const tiers = summaries.map((s) => s.tier);
    expect(tiers).toContain("api");
    expect(tiers).toContain("local");
    expect(tiers).toContain("subscription");
  });

  it("counts seats correctly per tier", () => {
    const summaries = buildTierSummaries(seats, scores);
    const api = summaries.find((s) => s.tier === "api")!;
    const local = summaries.find((s) => s.tier === "local")!;
    const sub = summaries.find((s) => s.tier === "subscription")!;
    expect(api.seatCount).toBe(2);
    expect(local.seatCount).toBe(1);
    expect(sub.seatCount).toBe(2);
  });

  it("counts eligible seats (strong or watch)", () => {
    const summaries = buildTierSummaries(seats, scores);
    const api = summaries.find((s) => s.tier === "api")!;
    const local = summaries.find((s) => s.tier === "local")!;
    const sub = summaries.find((s) => s.tier === "subscription")!;
    expect(api.eligibleCount).toBe(2);
    expect(local.eligibleCount).toBe(1);
    expect(sub.eligibleCount).toBe(1);
  });

  it("calculates average health score", () => {
    const summaries = buildTierSummaries(seats, scores);
    const api = summaries.find((s) => s.tier === "api")!;
    const local = summaries.find((s) => s.tier === "local")!;
    const sub = summaries.find((s) => s.tier === "subscription")!;
    expect(api.avgHealthScore).toBe(80);
    expect(local.avgHealthScore).toBe(85);
    expect(sub.avgHealthScore).toBe(50);
  });

  it("sets estimatedCost to 0 for local tier", () => {
    const summaries = buildTierSummaries(seats, scores);
    const local = summaries.find((s) => s.tier === "local")!;
    expect(local.estimatedCost).toBe(0);
  });

  it("sets estimatedCost to null for non-local tiers", () => {
    const summaries = buildTierSummaries(seats, scores);
    const api = summaries.find((s) => s.tier === "api")!;
    const sub = summaries.find((s) => s.tier === "subscription")!;
    expect(api.estimatedCost).toBeNull();
    expect(sub.estimatedCost).toBeNull();
  });

  it("omits tiers with no seats", () => {
    const onlySub: TierSeatInput[] = [{ id: "s1", provider: "Codex" }];
    const subScores: TierScoreInput[] = [{ id: "s1", score: 80, status: "strong" }];
    const summaries = buildTierSummaries(onlySub, subScores);
    expect(summaries.length).toBe(1);
    expect(summaries[0].tier).toBe("subscription");
  });

  it("returns empty array for empty input", () => {
    expect(buildTierSummaries([], [])).toEqual([]);
  });

  it("handles seats with no matching scores", () => {
    const noScoreSeats: TierSeatInput[] = [{ id: "s1", provider: "Ollama" }];
    const summaries = buildTierSummaries(noScoreSeats, []);
    expect(summaries.length).toBe(1);
    expect(summaries[0].avgHealthScore).toBe(0);
    expect(summaries[0].eligibleCount).toBe(0);
  });

  it("uses labels from COMPUTE_TIER_META", () => {
    const summaries = buildTierSummaries(seats, scores);
    for (const s of summaries) {
      expect(s.label).toBe(COMPUTE_TIER_META[s.tier].label);
    }
  });

  it("respects explicit computeTier on seats", () => {
    const explicit: TierSeatInput[] = [
      { id: "s1", computeTier: "api", provider: "Ollama" },
    ];
    const explicitScores: TierScoreInput[] = [{ id: "s1", score: 80, status: "strong" }];
    const summaries = buildTierSummaries(explicit, explicitScores);
    expect(summaries.length).toBe(1);
    expect(summaries[0].tier).toBe("api");
  });
});

describe("estimateTierCost", () => {
  it("returns 0 for local tier", () => {
    expect(estimateTierCost("local", 1_000_000)).toBe(0);
  });

  it("returns null for subscription tier", () => {
    expect(estimateTierCost("subscription", 1_000_000)).toBeNull();
  });

  it("returns per-token cost for api tier", () => {
    expect(estimateTierCost("api", 1_000_000)).toBe(3.0);
  });

  it("uses custom cost rate", () => {
    expect(estimateTierCost("api", 1_000_000, 15.0)).toBe(15.0);
  });

  it("scales linearly with token count", () => {
    expect(estimateTierCost("api", 500_000)).toBe(1.5);
    expect(estimateTierCost("api", 2_000_000)).toBe(6.0);
  });

  it("returns 0 for zero tokens on api tier", () => {
    expect(estimateTierCost("api", 0)).toBe(0);
  });
});

describe("constants", () => {
  it("COMPUTE_TIERS has three entries", () => {
    expect(COMPUTE_TIERS).toHaveLength(3);
    expect(COMPUTE_TIERS).toEqual(["api", "local", "subscription"]);
  });

  it("DEFAULT_COMPUTE_TIER is subscription", () => {
    expect(DEFAULT_COMPUTE_TIER).toBe("subscription");
  });

  it("COMPUTE_TIER_META has entry for each tier", () => {
    for (const tier of COMPUTE_TIERS) {
      const meta = COMPUTE_TIER_META[tier];
      expect(meta).toBeDefined();
      expect(meta.label).toBeTruthy();
      expect(meta.description).toBeTruthy();
      expect(meta.icon).toBeTruthy();
      expect(meta.costModel).toBeTruthy();
      expect(typeof meta.defaultRoutingWeight).toBe("number");
    }
  });
});
