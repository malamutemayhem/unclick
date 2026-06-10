import { describe, it, expect } from "vitest";
import {
  warmth, breathability, weight, moistureWicking,
  duvetCost, veganFriendly, machineWash, fillPower,
  bestSeason, duvets,
} from "../duvet-calc.js";

describe("warmth", () => {
  it("goose down luxury warmest", () => {
    expect(warmth("goose_down_luxury")).toBeGreaterThan(warmth("silk_lightweight_drape"));
  });
});

describe("breathability", () => {
  it("wool natural temp most breathable", () => {
    expect(breathability("wool_natural_temp")).toBeGreaterThan(breathability("synthetic_poly_fill"));
  });
});

describe("weight", () => {
  it("silk lightweight drape lightest weight", () => {
    expect(weight("silk_lightweight_drape")).toBeGreaterThan(weight("wool_natural_temp"));
  });
});

describe("moistureWicking", () => {
  it("wool natural temp best moisture wicking", () => {
    expect(moistureWicking("wool_natural_temp")).toBeGreaterThan(moistureWicking("synthetic_poly_fill"));
  });
});

describe("duvetCost", () => {
  it("goose down luxury most expensive", () => {
    expect(duvetCost("goose_down_luxury")).toBeGreaterThan(duvetCost("synthetic_poly_fill"));
  });
});

describe("veganFriendly", () => {
  it("synthetic poly fill is vegan friendly", () => {
    expect(veganFriendly("synthetic_poly_fill")).toBe(true);
  });
  it("goose down luxury is not", () => {
    expect(veganFriendly("goose_down_luxury")).toBe(false);
  });
});

describe("machineWash", () => {
  it("synthetic poly fill is machine washable", () => {
    expect(machineWash("synthetic_poly_fill")).toBe(true);
  });
  it("goose down luxury is not", () => {
    expect(machineWash("goose_down_luxury")).toBe(false);
  });
});

describe("fillPower", () => {
  it("silk lightweight drape uses mulberry silk long strand", () => {
    expect(fillPower("silk_lightweight_drape")).toBe("mulberry_silk_long_strand");
  });
});

describe("bestSeason", () => {
  it("wool natural temp best for all season temp regulate", () => {
    expect(bestSeason("wool_natural_temp")).toBe("all_season_temp_regulate");
  });
});

describe("duvets", () => {
  it("returns 5 types", () => {
    expect(duvets()).toHaveLength(5);
  });
});
