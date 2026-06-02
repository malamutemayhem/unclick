import { describe, expect, it } from "vitest";
import {
  DEFAULT_IDEA_PROMOTE_THRESHOLD,
  IDEA_PROMOTE_THRESHOLD_ENV,
  PROMOTION_LABEL_ADMIN_OVERRIDE,
  PROMOTION_LABEL_VOTE_BACKED,
  evaluateIdeaPromotion,
  ideaPromotionLabel,
  resolveIdeaPromoteThreshold,
} from "./fishbowl-idea-promotion";

describe("resolveIdeaPromoteThreshold", () => {
  it("defaults to 3 when the env var is unset", () => {
    expect(resolveIdeaPromoteThreshold({})).toBe(DEFAULT_IDEA_PROMOTE_THRESHOLD);
    expect(DEFAULT_IDEA_PROMOTE_THRESHOLD).toBe(3);
  });

  it("defaults when the env var is empty or whitespace", () => {
    expect(resolveIdeaPromoteThreshold({ [IDEA_PROMOTE_THRESHOLD_ENV]: "" })).toBe(3);
    expect(resolveIdeaPromoteThreshold({ [IDEA_PROMOTE_THRESHOLD_ENV]: "   " })).toBe(3);
  });

  it("reads a valid positive integer override", () => {
    expect(resolveIdeaPromoteThreshold({ [IDEA_PROMOTE_THRESHOLD_ENV]: "5" })).toBe(5);
  });

  it("allows 0 (votes become advisory) without breaking", () => {
    expect(resolveIdeaPromoteThreshold({ [IDEA_PROMOTE_THRESHOLD_ENV]: "0" })).toBe(0);
  });

  it("floors fractional values", () => {
    expect(resolveIdeaPromoteThreshold({ [IDEA_PROMOTE_THRESHOLD_ENV]: "2.9" })).toBe(2);
  });

  it("clamps negative values to 0", () => {
    expect(resolveIdeaPromoteThreshold({ [IDEA_PROMOTE_THRESHOLD_ENV]: "-4" })).toBe(0);
  });

  it("falls back to the default for non-numeric junk", () => {
    expect(resolveIdeaPromoteThreshold({ [IDEA_PROMOTE_THRESHOLD_ENV]: "lots" })).toBe(3);
  });
});

describe("evaluateIdeaPromotion", () => {
  it("allows a normal agent once upvotes reach the threshold", () => {
    const decision = evaluateIdeaPromotion({ upvotes: 3, isAdminCaller: false, threshold: 3 });
    expect(decision.allowed).toBe(true);
    expect(decision.adminOverride).toBe(false);
    expect(decision.threshold).toBe(3);
    expect(decision.upvotes).toBe(3);
  });

  it("blocks a normal agent below the threshold", () => {
    const decision = evaluateIdeaPromotion({ upvotes: 2, isAdminCaller: false, threshold: 3 });
    expect(decision.allowed).toBe(false);
    expect(decision.adminOverride).toBe(false);
    expect(decision.reason).toContain("2 upvotes < threshold 3");
  });

  it("lets an admin override a below-threshold idea and flags the override", () => {
    const decision = evaluateIdeaPromotion({ upvotes: 0, isAdminCaller: true, threshold: 3 });
    expect(decision.allowed).toBe(true);
    expect(decision.adminOverride).toBe(true);
    expect(decision.reason).toContain("admin override");
  });

  it("does NOT flag an override when an admin promotes an idea that already met the threshold", () => {
    const decision = evaluateIdeaPromotion({ upvotes: 5, isAdminCaller: true, threshold: 3 });
    expect(decision.allowed).toBe(true);
    expect(decision.adminOverride).toBe(false);
  });

  it("uses the env-resolved threshold when none is passed", () => {
    // No explicit threshold -> resolves from process.env (unset in test => 3).
    const allowed = evaluateIdeaPromotion({ upvotes: 3, isAdminCaller: false });
    expect(allowed.allowed).toBe(true);
    const blocked = evaluateIdeaPromotion({ upvotes: 2, isAdminCaller: false });
    expect(blocked.allowed).toBe(false);
  });

  it("treats a non-finite upvote count as 0", () => {
    const decision = evaluateIdeaPromotion({
      upvotes: Number.NaN,
      isAdminCaller: false,
      threshold: 1,
    });
    expect(decision.upvotes).toBe(0);
    expect(decision.allowed).toBe(false);
  });

  it("with threshold 0 promotes any idea without an override flag", () => {
    const decision = evaluateIdeaPromotion({ upvotes: 0, isAdminCaller: false, threshold: 0 });
    expect(decision.allowed).toBe(true);
    expect(decision.adminOverride).toBe(false);
  });
});

describe("ideaPromotionLabel", () => {
  it("labels an admin override with the exact spec wording", () => {
    const decision = evaluateIdeaPromotion({ upvotes: 0, isAdminCaller: true, threshold: 3 });
    expect(ideaPromotionLabel(decision)).toBe(PROMOTION_LABEL_ADMIN_OVERRIDE);
    expect(ideaPromotionLabel(decision)).toBe("promoted-by-admin (override)");
  });

  it("labels a vote-backed promotion", () => {
    const decision = evaluateIdeaPromotion({ upvotes: 4, isAdminCaller: false, threshold: 3 });
    expect(ideaPromotionLabel(decision)).toBe(PROMOTION_LABEL_VOTE_BACKED);
  });
});
