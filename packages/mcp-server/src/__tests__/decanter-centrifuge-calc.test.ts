import { describe, it, expect } from "vitest";
import {
  throughput, separation, dryness, versatility,
  dcCost, threePhase, forSludge, discharge,
  bestUse, decanterCentrifugeTypes,
} from "../decanter-centrifuge-calc.js";

describe("throughput", () => {
  it("horizontal scroll highest throughput", () => {
    expect(throughput("horizontal_scroll_std")).toBeGreaterThan(throughput("high_speed_clarifier"));
  });
});

describe("separation", () => {
  it("high speed clarifier best separation", () => {
    expect(separation("high_speed_clarifier")).toBeGreaterThan(separation("horizontal_scroll_std"));
  });
});

describe("dryness", () => {
  it("vertical conic screen driest cake", () => {
    expect(dryness("vertical_conic_screen")).toBeGreaterThan(dryness("high_speed_clarifier"));
  });
});

describe("versatility", () => {
  it("tricanter most versatile", () => {
    expect(versatility("three_phase_tricanter")).toBeGreaterThan(versatility("vertical_conic_screen"));
  });
});

describe("dcCost", () => {
  it("tricanter most expensive", () => {
    expect(dcCost("three_phase_tricanter")).toBeGreaterThan(dcCost("horizontal_scroll_std"));
  });
});

describe("threePhase", () => {
  it("tricanter is three phase", () => {
    expect(threePhase("three_phase_tricanter")).toBe(true);
  });
  it("two phase separator not three phase", () => {
    expect(threePhase("two_phase_separator")).toBe(false);
  });
});

describe("forSludge", () => {
  it("horizontal scroll for sludge", () => {
    expect(forSludge("horizontal_scroll_std")).toBe(true);
  });
  it("high speed clarifier not for sludge", () => {
    expect(forSludge("high_speed_clarifier")).toBe(false);
  });
});

describe("discharge", () => {
  it("tricanter uses three phase weir", () => {
    expect(discharge("three_phase_tricanter")).toBe("three_phase_solid_light_heavy_liquid_weir");
  });
});

describe("bestUse", () => {
  it("vertical conic for sugar crystal", () => {
    expect(bestUse("vertical_conic_screen")).toBe("sugar_crystal_salt_plastic_pellet_dewatering");
  });
});

describe("decanterCentrifugeTypes", () => {
  it("returns 5 types", () => {
    expect(decanterCentrifugeTypes()).toHaveLength(5);
  });
});
