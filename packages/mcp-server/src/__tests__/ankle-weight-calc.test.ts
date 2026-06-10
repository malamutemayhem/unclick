import { describe, it, expect } from "vitest";
import {
  resistance, comfort, adjustability, stayPut,
  weightCost, waterproof, variableWeight, fillType,
  bestExercise, ankleWeights,
} from "../ankle-weight-calc.js";

describe("resistance", () => {
  it("magnetic bar insert most resistance", () => {
    expect(resistance("magnetic_bar_insert")).toBeGreaterThan(resistance("aquatic_water_drag"));
  });
});

describe("comfort", () => {
  it("fixed neoprene wrap most comfortable", () => {
    expect(comfort("fixed_neoprene_wrap")).toBeGreaterThan(comfort("weighted_strap_buckle"));
  });
});

describe("adjustability", () => {
  it("adjustable sand fill most adjustable", () => {
    expect(adjustability("adjustable_sand_fill")).toBeGreaterThan(adjustability("fixed_neoprene_wrap"));
  });
});

describe("stayPut", () => {
  it("weighted strap buckle stays best", () => {
    expect(stayPut("weighted_strap_buckle")).toBeGreaterThan(stayPut("aquatic_water_drag"));
  });
});

describe("weightCost", () => {
  it("magnetic bar insert more expensive than neoprene", () => {
    expect(weightCost("magnetic_bar_insert")).toBeGreaterThan(weightCost("fixed_neoprene_wrap"));
  });
});

describe("waterproof", () => {
  it("aquatic water drag is waterproof", () => {
    expect(waterproof("aquatic_water_drag")).toBe(true);
  });
  it("adjustable sand fill is not waterproof", () => {
    expect(waterproof("adjustable_sand_fill")).toBe(false);
  });
});

describe("variableWeight", () => {
  it("adjustable sand fill has variable weight", () => {
    expect(variableWeight("adjustable_sand_fill")).toBe(true);
  });
  it("fixed neoprene wrap has no variable weight", () => {
    expect(variableWeight("fixed_neoprene_wrap")).toBe(false);
  });
});

describe("fillType", () => {
  it("adjustable sand fill uses iron sand granules", () => {
    expect(fillType("adjustable_sand_fill")).toBe("iron_sand_granules");
  });
});

describe("bestExercise", () => {
  it("aquatic water drag best for pool rehab therapy", () => {
    expect(bestExercise("aquatic_water_drag")).toBe("pool_rehab_therapy");
  });
});

describe("ankleWeights", () => {
  it("returns 5 types", () => {
    expect(ankleWeights()).toHaveLength(5);
  });
});
