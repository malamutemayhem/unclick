import { describe, it, expect } from "vitest";
import {
  beamQuality, throughput, tensionControl, patternFlexibility,
  wbCost, automated, forDenim, beamerConfig,
  bestUse, warpBeamerTypes,
} from "../warp-beamer-calc.js";

describe("beamQuality", () => {
  it("sample warper best beam quality", () => {
    expect(beamQuality("sample_warper")).toBeGreaterThan(beamQuality("beam_to_beam"));
  });
});

describe("throughput", () => {
  it("direct warper highest throughput", () => {
    expect(throughput("direct_warper")).toBeGreaterThanOrEqual(throughput("high_speed_warper"));
  });
});

describe("tensionControl", () => {
  it("sample warper best tension control", () => {
    expect(tensionControl("sample_warper")).toBeGreaterThan(tensionControl("beam_to_beam"));
  });
});

describe("patternFlexibility", () => {
  it("sectional warper best pattern flexibility", () => {
    expect(patternFlexibility("sectional_warper")).toBeGreaterThanOrEqual(patternFlexibility("sample_warper"));
  });
});

describe("wbCost", () => {
  it("high speed warper most expensive", () => {
    expect(wbCost("high_speed_warper")).toBeGreaterThan(wbCost("beam_to_beam"));
  });
});

describe("automated", () => {
  it("direct warper is automated", () => {
    expect(automated("direct_warper")).toBe(true);
  });
  it("sectional warper not automated", () => {
    expect(automated("sectional_warper")).toBe(false);
  });
});

describe("forDenim", () => {
  it("direct warper for denim", () => {
    expect(forDenim("direct_warper")).toBe(true);
  });
  it("sectional warper not for denim", () => {
    expect(forDenim("sectional_warper")).toBe(false);
  });
});

describe("beamerConfig", () => {
  it("sample warper uses single end precise pattern", () => {
    expect(beamerConfig("sample_warper")).toBe("sample_warper_beam_single_end_precise_pattern_prototype_short");
  });
});

describe("bestUse", () => {
  it("sectional warper for pattern weaving stripe plaid", () => {
    expect(bestUse("sectional_warper")).toBe("pattern_weaving_sectional_warper_stripe_plaid_color_sequence");
  });
});

describe("warpBeamerTypes", () => {
  it("returns 5 types", () => {
    expect(warpBeamerTypes()).toHaveLength(5);
  });
});
