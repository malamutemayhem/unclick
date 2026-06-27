import { describe, it, expect } from "vitest";
import {
  accuracy, range, stability, response,
  tsCost, selfCleaning, forDrinkingWater, principle,
  bestUse, turbiditySensorTypes,
} from "../turbidity-sensor-calc.js";

describe("accuracy", () => {
  it("laser most accurate", () => {
    expect(accuracy("laser_low_range_ntu")).toBeGreaterThan(accuracy("backscatter_high_range"));
  });
});

describe("range", () => {
  it("backscatter widest range", () => {
    expect(range("backscatter_high_range")).toBeGreaterThan(range("laser_low_range_ntu"));
  });
});

describe("stability", () => {
  it("ratio most stable", () => {
    expect(stability("ratio_4_beam_modulated")).toBeGreaterThan(stability("absorption_inline_uv"));
  });
});

describe("response", () => {
  it("absorption fastest response", () => {
    expect(response("absorption_inline_uv")).toBeGreaterThan(response("backscatter_high_range"));
  });
});

describe("tsCost", () => {
  it("laser most expensive", () => {
    expect(tsCost("laser_low_range_ntu")).toBeGreaterThan(tsCost("nephelometric_90_degree"));
  });
});

describe("selfCleaning", () => {
  it("ratio is self cleaning", () => {
    expect(selfCleaning("ratio_4_beam_modulated")).toBe(true);
  });
  it("nephelometric not self cleaning", () => {
    expect(selfCleaning("nephelometric_90_degree")).toBe(false);
  });
});

describe("forDrinkingWater", () => {
  it("nephelometric for drinking water", () => {
    expect(forDrinkingWater("nephelometric_90_degree")).toBe(true);
  });
  it("backscatter not drinking water", () => {
    expect(forDrinkingWater("backscatter_high_range")).toBe(false);
  });
});

describe("principle", () => {
  it("absorption uses uv vis", () => {
    expect(principle("absorption_inline_uv")).toBe("uv_vis_absorption_inline_photometer");
  });
});

describe("bestUse", () => {
  it("backscatter for wastewater", () => {
    expect(bestUse("backscatter_high_range")).toBe("wastewater_sludge_blanket_detection");
  });
});

describe("turbiditySensorTypes", () => {
  it("returns 5 types", () => {
    expect(turbiditySensorTypes()).toHaveLength(5);
  });
});
