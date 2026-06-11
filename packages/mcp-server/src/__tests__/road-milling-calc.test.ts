import { describe, it, expect } from "vitest";
import {
  cuttingWidth, cuttingDepth, speed, surfaceFinish,
  rmCost, fullLane, forPrecision, drum,
  bestUse, roadMillingTypes,
} from "../road-milling-calc.js";

describe("cuttingWidth", () => {
  it("cold milling large widest cut", () => {
    expect(cuttingWidth("cold_milling_large")).toBeGreaterThan(cuttingWidth("cold_milling_compact"));
  });
});

describe("cuttingDepth", () => {
  it("cold milling large deepest cut", () => {
    expect(cuttingDepth("cold_milling_large")).toBeGreaterThan(cuttingDepth("micro_milling"));
  });
});

describe("speed", () => {
  it("half lane fastest", () => {
    expect(speed("half_lane")).toBeGreaterThan(speed("micro_milling"));
  });
});

describe("surfaceFinish", () => {
  it("micro milling best surface finish", () => {
    expect(surfaceFinish("micro_milling")).toBeGreaterThan(surfaceFinish("cold_milling_large"));
  });
});

describe("rmCost", () => {
  it("cold milling large most expensive", () => {
    expect(rmCost("cold_milling_large")).toBeGreaterThan(rmCost("cold_milling_compact"));
  });
});

describe("fullLane", () => {
  it("cold milling large is full lane", () => {
    expect(fullLane("cold_milling_large")).toBe(true);
  });
  it("cold milling compact not full lane", () => {
    expect(fullLane("cold_milling_compact")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("micro milling for precision", () => {
    expect(forPrecision("micro_milling")).toBe(true);
  });
  it("cold milling large not for precision", () => {
    expect(forPrecision("cold_milling_large")).toBe(false);
  });
});

describe("drum", () => {
  it("rotary stabilizer uses mixing chamber drum", () => {
    expect(drum("rotary_stabilizer")).toBe("mixing_chamber_drum_cement_foam_bitumen_injection_recycle");
  });
});

describe("bestUse", () => {
  it("micro milling for surface retexture", () => {
    expect(bestUse("micro_milling")).toBe("surface_retexture_rumble_strip_removal_skid_resistance");
  });
});

describe("roadMillingTypes", () => {
  it("returns 5 types", () => {
    expect(roadMillingTypes()).toHaveLength(5);
  });
});
