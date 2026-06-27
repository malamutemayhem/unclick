import { describe, it, expect } from "vitest";
import {
  lustre, durability, handleEase, coverageEven,
  leafCost, genuine, tarnishProof, metalContent,
  bestUse, goldLeafs,
} from "../gold-leaf-calc.js";

describe("lustre", () => {
  it("genuine gold 23k highest lustre", () => {
    expect(lustre("genuine_gold_23k")).toBeGreaterThan(lustre("imitation_gold_dutch"));
  });
});

describe("durability", () => {
  it("genuine gold 23k most durable", () => {
    expect(durability("genuine_gold_23k")).toBeGreaterThan(durability("variegated_leaf_blend"));
  });
});

describe("handleEase", () => {
  it("imitation gold dutch easiest handle", () => {
    expect(handleEase("imitation_gold_dutch")).toBeGreaterThan(handleEase("silver_leaf_pure"));
  });
});

describe("coverageEven", () => {
  it("genuine gold 23k most even coverage", () => {
    expect(coverageEven("genuine_gold_23k")).toBeGreaterThan(coverageEven("variegated_leaf_blend"));
  });
});

describe("leafCost", () => {
  it("genuine gold 23k most expensive", () => {
    expect(leafCost("genuine_gold_23k")).toBeGreaterThan(leafCost("imitation_gold_dutch"));
  });
});

describe("genuine", () => {
  it("genuine gold 23k is genuine", () => {
    expect(genuine("genuine_gold_23k")).toBe(true);
  });
  it("imitation gold dutch not genuine", () => {
    expect(genuine("imitation_gold_dutch")).toBe(false);
  });
});

describe("tarnishProof", () => {
  it("genuine gold 23k is tarnish proof", () => {
    expect(tarnishProof("genuine_gold_23k")).toBe(true);
  });
  it("silver leaf pure not tarnish proof", () => {
    expect(tarnishProof("silver_leaf_pure")).toBe(false);
  });
});

describe("metalContent", () => {
  it("copper leaf warm uses copper alloy sheet", () => {
    expect(metalContent("copper_leaf_warm")).toBe("copper_alloy_sheet");
  });
});

describe("bestUse", () => {
  it("imitation gold dutch best for craft decorative gild", () => {
    expect(bestUse("imitation_gold_dutch")).toBe("craft_decorative_gild");
  });
});

describe("goldLeafs", () => {
  it("returns 5 types", () => {
    expect(goldLeafs()).toHaveLength(5);
  });
});
