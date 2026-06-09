import { describe, expect, it } from "vitest";
import {
  COMPUTE_TIERS,
  TIER_META,
  classifyComputeTier,
  resolveComputeTier,
  filterSeatsByTier,
  countSeatsByTier,
  type ComputeTier,
} from "./computeTypes";

describe("computeTypes", () => {
  it("defines exactly three tiers in order", () => {
    expect(COMPUTE_TIERS).toEqual(["api", "local", "subscription"]);
  });

  it("has metadata for every tier", () => {
    for (const tier of COMPUTE_TIERS) {
      const meta = TIER_META[tier];
      expect(meta.label).toBeTruthy();
      expect(meta.description).toBeTruthy();
    }
  });

  it("tier labels are short display-friendly strings", () => {
    expect(TIER_META.api.label).toBe("API");
    expect(TIER_META.local.label).toBe("Local");
    expect(TIER_META.subscription.label).toBe("Subscription");
  });

  it("ComputeTier type accepts valid tiers", () => {
    const tiers: ComputeTier[] = ["api", "local", "subscription"];
    expect(tiers).toHaveLength(3);
  });
});

describe("classifyComputeTier", () => {
  it("classifies OpenAI as api", () => {
    expect(classifyComputeTier("OpenAI", "Cloud")).toBe("api");
  });

  it("classifies Anthropic as api", () => {
    expect(classifyComputeTier("Anthropic", "API server")).toBe("api");
  });

  it("classifies Groq as api", () => {
    expect(classifyComputeTier("Groq", "Cloud GPU")).toBe("api");
  });

  it("classifies Ollama as local", () => {
    expect(classifyComputeTier("Ollama", "Desktop")).toBe("local");
  });

  it("classifies localhost as local", () => {
    expect(classifyComputeTier("Custom", "localhost:11434")).toBe("local");
  });

  it("classifies LM Studio as local", () => {
    expect(classifyComputeTier("LM Studio", "MacBook")).toBe("local");
  });

  it("classifies ChatGPT as subscription (default)", () => {
    expect(classifyComputeTier("ChatGPT", "Browser")).toBe("subscription");
  });

  it("classifies unknown providers as subscription", () => {
    expect(classifyComputeTier("Unknown AI", "Unknown device")).toBe("subscription");
  });

  it("handles undefined values", () => {
    expect(classifyComputeTier(undefined, undefined)).toBe("subscription");
  });
});

describe("resolveComputeTier", () => {
  it("uses explicit tier when set", () => {
    expect(resolveComputeTier("api", "Ollama", "Desktop")).toBe("api");
  });

  it("falls back to classification when no explicit tier", () => {
    expect(resolveComputeTier(undefined, "Ollama", "Desktop")).toBe("local");
  });
});

describe("filterSeatsByTier", () => {
  const seats = [
    { id: "1", provider: "OpenAI", device: "API" },
    { id: "2", provider: "Ollama", device: "Desktop" },
    { id: "3", provider: "ChatGPT", device: "Browser" },
    { id: "4", provider: "Groq", device: "Cloud" },
  ];

  it("returns all seats when filter is 'all'", () => {
    expect(filterSeatsByTier(seats, "all")).toHaveLength(4);
  });

  it("filters api seats", () => {
    const result = filterSeatsByTier(seats, "api");
    expect(result).toHaveLength(2);
    expect(result.map((s) => s.id)).toEqual(["1", "4"]);
  });

  it("filters local seats", () => {
    const result = filterSeatsByTier(seats, "local");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filters subscription seats", () => {
    const result = filterSeatsByTier(seats, "subscription");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("respects explicit computeTier over classification", () => {
    const explicitSeats = [
      { id: "1", provider: "Ollama", device: "Desktop", computeTier: "api" as const },
    ];
    expect(filterSeatsByTier(explicitSeats, "api")).toHaveLength(1);
    expect(filterSeatsByTier(explicitSeats, "local")).toHaveLength(0);
  });
});

describe("countSeatsByTier", () => {
  it("counts seats per tier", () => {
    const seats = [
      { provider: "OpenAI", device: "API" },
      { provider: "Ollama", device: "Desktop" },
      { provider: "ChatGPT", device: "Browser" },
      { provider: "Groq", device: "Cloud" },
    ];
    const counts = countSeatsByTier(seats);
    expect(counts.api).toBe(2);
    expect(counts.local).toBe(1);
    expect(counts.subscription).toBe(1);
  });

  it("returns zeros for empty array", () => {
    const counts = countSeatsByTier([]);
    expect(counts).toEqual({ api: 0, local: 0, subscription: 0 });
  });
});
