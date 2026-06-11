import { describe, it, expect } from "vitest";
import {
  speed, stretch, complexity, waste,
  ktCost, tubular, forActivewear, gauge,
  bestUse, knittingTypes,
} from "../knitting-type-calc.js";

describe("speed", () => {
  it("single jersey fastest", () => {
    expect(speed("single_jersey_circular")).toBeGreaterThan(speed("flatbed_fully_fashioned"));
  });
});

describe("stretch", () => {
  it("seamless 3d most stretch", () => {
    expect(stretch("seamless_3d_knit")).toBeGreaterThan(stretch("warp_tricot_raschel"));
  });
});

describe("complexity", () => {
  it("seamless 3d most complex", () => {
    expect(complexity("seamless_3d_knit")).toBeGreaterThan(complexity("single_jersey_circular"));
  });
});

describe("waste", () => {
  it("seamless 3d least waste", () => {
    expect(waste("seamless_3d_knit")).toBeGreaterThan(waste("flatbed_fully_fashioned"));
  });
});

describe("ktCost", () => {
  it("seamless 3d most expensive", () => {
    expect(ktCost("seamless_3d_knit")).toBeGreaterThan(ktCost("single_jersey_circular"));
  });
});

describe("tubular", () => {
  it("single jersey is tubular", () => {
    expect(tubular("single_jersey_circular")).toBe(true);
  });
  it("flatbed not tubular", () => {
    expect(tubular("flatbed_fully_fashioned")).toBe(false);
  });
});

describe("forActivewear", () => {
  it("seamless 3d for activewear", () => {
    expect(forActivewear("seamless_3d_knit")).toBe(true);
  });
  it("flatbed not for activewear", () => {
    expect(forActivewear("flatbed_fully_fashioned")).toBe(false);
  });
});

describe("gauge", () => {
  it("warp tricot uses 28-32 gauge", () => {
    expect(gauge("warp_tricot_raschel")).toBe("28_32_gauge_tricot_warp");
  });
});

describe("bestUse", () => {
  it("double jersey rib best for polo cuff collar", () => {
    expect(bestUse("double_jersey_rib")).toBe("polo_shirt_cuff_collar_rib");
  });
});

describe("knittingTypes", () => {
  it("returns 5 types", () => {
    expect(knittingTypes()).toHaveLength(5);
  });
});
