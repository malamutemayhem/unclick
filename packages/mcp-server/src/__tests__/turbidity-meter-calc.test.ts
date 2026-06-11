import { describe, it, expect } from "vitest";
import {
  accuracy, range, strayLightReject, maintenance,
  tmCost, inline, forLowTurb, optic,
  bestUse, turbidityMeterTypes,
} from "../turbidity-meter-calc.js";

describe("accuracy", () => {
  it("laser nephelometric most accurate", () => {
    expect(accuracy("laser_nephelometric")).toBeGreaterThan(accuracy("backscatter_high_range"));
  });
});

describe("range", () => {
  it("backscatter widest range", () => {
    expect(range("backscatter_high_range")).toBeGreaterThan(range("laser_nephelometric"));
  });
});

describe("strayLightReject", () => {
  it("laser nephelometric best stray light rejection", () => {
    expect(strayLightReject("laser_nephelometric")).toBeGreaterThan(strayLightReject("absorption_inline"));
  });
});

describe("maintenance", () => {
  it("backscatter lowest maintenance needs", () => {
    expect(maintenance("backscatter_high_range")).toBeGreaterThan(maintenance("laser_nephelometric"));
  });
});

describe("tmCost", () => {
  it("laser nephelometric most expensive", () => {
    expect(tmCost("laser_nephelometric")).toBeGreaterThan(tmCost("absorption_inline"));
  });
});

describe("inline", () => {
  it("nephelometric is inline", () => {
    expect(inline("nephelometric_90_degree")).toBe(true);
  });
  it("laser nephelometric not inline", () => {
    expect(inline("laser_nephelometric")).toBe(false);
  });
});

describe("forLowTurb", () => {
  it("nephelometric for low turbidity", () => {
    expect(forLowTurb("nephelometric_90_degree")).toBe(true);
  });
  it("backscatter not for low turbidity", () => {
    expect(forLowTurb("backscatter_high_range")).toBe(false);
  });
});

describe("optic", () => {
  it("ratio uses four beam", () => {
    expect(optic("ratio_four_beam")).toBe("four_beam_ratio_color_compensate");
  });
});

describe("bestUse", () => {
  it("nephelometric for drinking water", () => {
    expect(bestUse("nephelometric_90_degree")).toBe("drinking_water_regulatory_epa_180_1");
  });
});

describe("turbidityMeterTypes", () => {
  it("returns 5 types", () => {
    expect(turbidityMeterTypes()).toHaveLength(5);
  });
});
