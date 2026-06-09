import { describe, expect, it } from "vitest";
import { COMPUTE_TIERS, TIER_META, type ComputeTier } from "./computeTypes";

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
