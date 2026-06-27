import { describe, it, expect } from "vitest";
import { hashCode, assign, assignBatch, isInVariant, variantDistribution, Experiment } from "../ab-splitter.js";

const experiment: Experiment = {
  name: "button-color",
  variants: ["red", "blue", "green"],
};

describe("hashCode", () => {
  it("returns consistent hash", () => {
    expect(hashCode("hello")).toBe(hashCode("hello"));
  });

  it("returns different hash for different strings", () => {
    expect(hashCode("hello")).not.toBe(hashCode("world"));
  });

  it("returns non-negative", () => {
    expect(hashCode("test")).toBeGreaterThanOrEqual(0);
  });
});

describe("assign", () => {
  it("returns a valid variant", () => {
    const variant = assign(experiment, "user1");
    expect(experiment.variants).toContain(variant);
  });

  it("is deterministic for same user", () => {
    const v1 = assign(experiment, "user1");
    const v2 = assign(experiment, "user1");
    expect(v1).toBe(v2);
  });

  it("respects weights", () => {
    const weighted: Experiment = { name: "test", variants: ["a", "b"], weights: [100, 0] };
    expect(assign(weighted, "user1")).toBe("a");
    expect(assign(weighted, "user2")).toBe("a");
    expect(assign(weighted, "user3")).toBe("a");
  });
});

describe("assignBatch", () => {
  it("assigns multiple users", () => {
    const result = assignBatch(experiment, ["u1", "u2", "u3"]);
    expect(result.size).toBe(3);
    for (const v of result.values()) {
      expect(experiment.variants).toContain(v);
    }
  });
});

describe("isInVariant", () => {
  it("checks variant membership", () => {
    const v = assign(experiment, "user1");
    expect(isInVariant(experiment, "user1", v)).toBe(true);
  });
});

describe("variantDistribution", () => {
  it("distributes users across variants", () => {
    const users = Array.from({ length: 100 }, (_, i) => `user_${i}`);
    const dist = variantDistribution(experiment, users);
    let total = 0;
    for (const count of dist.values()) total += count;
    expect(total).toBe(100);
    expect(dist.size).toBe(3);
  });
});
