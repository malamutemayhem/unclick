import { describe, it, expect } from "vitest";
import {
  uniformity, efficiency, clogResist, coverage,
  diCost, subsurface, forSlope, emitter,
  bestUse, dripIrrigTypes,
} from "../drip-irrig-calc.js";

describe("uniformity", () => {
  it("subsurface best uniformity", () => {
    expect(uniformity("subsurface_buried_drip")).toBeGreaterThan(uniformity("micro_sprinkler_fan"));
  });
});

describe("efficiency", () => {
  it("subsurface most efficient", () => {
    expect(efficiency("subsurface_buried_drip")).toBeGreaterThan(efficiency("micro_sprinkler_fan"));
  });
});

describe("clogResist", () => {
  it("micro sprinkler best clog resistance", () => {
    expect(clogResist("micro_sprinkler_fan")).toBeGreaterThan(clogResist("subsurface_buried_drip"));
  });
});

describe("coverage", () => {
  it("micro sprinkler widest coverage", () => {
    expect(coverage("micro_sprinkler_fan")).toBeGreaterThan(coverage("point_source_drip_stake"));
  });
});

describe("diCost", () => {
  it("subsurface most expensive", () => {
    expect(diCost("subsurface_buried_drip")).toBeGreaterThan(diCost("inline_emitter_tubing"));
  });
});

describe("subsurface", () => {
  it("buried is subsurface", () => {
    expect(subsurface("subsurface_buried_drip")).toBe(true);
  });
  it("inline not subsurface", () => {
    expect(subsurface("inline_emitter_tubing")).toBe(false);
  });
});

describe("forSlope", () => {
  it("pc for slope", () => {
    expect(forSlope("pressure_compensating_pc")).toBe(true);
  });
  it("inline not slope", () => {
    expect(forSlope("inline_emitter_tubing")).toBe(false);
  });
});

describe("emitter", () => {
  it("micro uses rotating head", () => {
    expect(emitter("micro_sprinkler_fan")).toBe("rotating_micro_sprinkler_head");
  });
});

describe("bestUse", () => {
  it("subsurface for turf sports field", () => {
    expect(bestUse("subsurface_buried_drip")).toBe("turf_sports_field_permanent");
  });
});

describe("dripIrrigTypes", () => {
  it("returns 5 types", () => {
    expect(dripIrrigTypes()).toHaveLength(5);
  });
});
