import { describe, it, expect } from "vitest";
import {
  visualImpact, prepDifficulty, bubbleRisk, colorStability,
  inclusionCost, needsSealing, organic, prepMethod,
  bestProject, resinInclusions,
} from "../resin-inclusion-calc.js";

describe("visualImpact", () => {
  it("clock part gear highest visual impact", () => {
    expect(visualImpact("clock_part_gear")).toBeGreaterThan(visualImpact("glitter_flake_mix"));
  });
});

describe("prepDifficulty", () => {
  it("insect specimen embed hardest to prep", () => {
    expect(prepDifficulty("insect_specimen_embed")).toBeGreaterThan(prepDifficulty("glitter_flake_mix"));
  });
});

describe("bubbleRisk", () => {
  it("insect specimen embed highest bubble risk", () => {
    expect(bubbleRisk("insect_specimen_embed")).toBeGreaterThan(bubbleRisk("glitter_flake_mix"));
  });
});

describe("colorStability", () => {
  it("glitter flake mix best color stability", () => {
    expect(colorStability("glitter_flake_mix")).toBeGreaterThan(colorStability("dried_flower_press"));
  });
});

describe("inclusionCost", () => {
  it("insect specimen embed most expensive", () => {
    expect(inclusionCost("insect_specimen_embed")).toBeGreaterThan(inclusionCost("dried_flower_press"));
  });
});

describe("needsSealing", () => {
  it("dried flower press needs sealing", () => {
    expect(needsSealing("dried_flower_press")).toBe(true);
  });
  it("glitter flake mix does not need sealing", () => {
    expect(needsSealing("glitter_flake_mix")).toBe(false);
  });
});

describe("organic", () => {
  it("dried flower press is organic", () => {
    expect(organic("dried_flower_press")).toBe(true);
  });
  it("clock part gear is not organic", () => {
    expect(organic("clock_part_gear")).toBe(false);
  });
});

describe("prepMethod", () => {
  it("glitter flake mix uses stir into resin", () => {
    expect(prepMethod("glitter_flake_mix")).toBe("stir_into_resin");
  });
});

describe("bestProject", () => {
  it("clock part gear best for steampunk statement ring", () => {
    expect(bestProject("clock_part_gear")).toBe("steampunk_statement_ring");
  });
});

describe("resinInclusions", () => {
  it("returns 5 types", () => {
    expect(resinInclusions()).toHaveLength(5);
  });
});
