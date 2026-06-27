import { describe, it, expect } from "vitest";
import {
  barkRemove, controlGrip, bladeLife, reachRange,
  knifeCost, folding, forHollow, bladeProfile,
  bestUse, drawknifeBark,
} from "../drawknife-bark-calc.js";

describe("barkRemove", () => {
  it("straight blade flat best bark remove", () => {
    expect(barkRemove("straight_blade_flat")).toBeGreaterThan(barkRemove("mini_blade_detail"));
  });
});

describe("controlGrip", () => {
  it("mini blade detail best control grip", () => {
    expect(controlGrip("mini_blade_detail")).toBeGreaterThan(controlGrip("folding_blade_travel"));
  });
});

describe("bladeLife", () => {
  it("straight blade flat longest blade life", () => {
    expect(bladeLife("straight_blade_flat")).toBeGreaterThan(bladeLife("mini_blade_detail"));
  });
});

describe("reachRange", () => {
  it("straight blade flat best reach range", () => {
    expect(reachRange("straight_blade_flat")).toBeGreaterThan(reachRange("mini_blade_detail"));
  });
});

describe("knifeCost", () => {
  it("inshave deep hollow most expensive", () => {
    expect(knifeCost("inshave_deep_hollow")).toBeGreaterThan(knifeCost("folding_blade_travel"));
  });
});

describe("folding", () => {
  it("folding blade travel is folding", () => {
    expect(folding("folding_blade_travel")).toBe(true);
  });
  it("straight blade flat not folding", () => {
    expect(folding("straight_blade_flat")).toBe(false);
  });
});

describe("forHollow", () => {
  it("inshave deep hollow is for hollow", () => {
    expect(forHollow("inshave_deep_hollow")).toBe(true);
  });
  it("straight blade flat not for hollow", () => {
    expect(forHollow("straight_blade_flat")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("curved blade scorp uses curved pull edge", () => {
    expect(bladeProfile("curved_blade_scorp")).toBe("curved_pull_edge");
  });
});

describe("bestUse", () => {
  it("inshave deep hollow best for seat hollow carve", () => {
    expect(bestUse("inshave_deep_hollow")).toBe("seat_hollow_carve");
  });
});

describe("drawknifeBark", () => {
  it("returns 5 types", () => {
    expect(drawknifeBark()).toHaveLength(5);
  });
});
