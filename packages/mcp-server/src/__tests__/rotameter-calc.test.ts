import { describe, it, expect } from "vitest";
import {
  accuracy, rangeability, pressure, visibility,
  rmCost, magneticIndicator, forCorrosive, floatType,
  bestUse, rotameterTypes,
} from "../rotameter-calc.js";

describe("accuracy", () => {
  it("metal tube most accurate", () => {
    expect(accuracy("metal_tube_magnetic")).toBeGreaterThan(accuracy("plastic_tube_economy"));
  });
});

describe("rangeability", () => {
  it("metal tube best rangeability", () => {
    expect(rangeability("metal_tube_magnetic")).toBeGreaterThan(rangeability("purge_low_flow_precision"));
  });
});

describe("pressure", () => {
  it("metal tube highest pressure", () => {
    expect(pressure("metal_tube_magnetic")).toBeGreaterThan(pressure("glass_tube_direct_read"));
  });
});

describe("visibility", () => {
  it("glass tube best visibility", () => {
    expect(visibility("glass_tube_direct_read")).toBeGreaterThan(visibility("purge_low_flow_precision"));
  });
});

describe("rmCost", () => {
  it("metal tube most expensive", () => {
    expect(rmCost("metal_tube_magnetic")).toBeGreaterThan(rmCost("plastic_tube_economy"));
  });
});

describe("magneticIndicator", () => {
  it("metal tube has magnetic", () => {
    expect(magneticIndicator("metal_tube_magnetic")).toBe(true);
  });
  it("glass tube no magnetic", () => {
    expect(magneticIndicator("glass_tube_direct_read")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("plastic for corrosive", () => {
    expect(forCorrosive("plastic_tube_economy")).toBe(true);
  });
  it("glass not corrosive", () => {
    expect(forCorrosive("glass_tube_direct_read")).toBe(false);
  });
});

describe("floatType", () => {
  it("purge uses sapphire", () => {
    expect(floatType("purge_low_flow_precision")).toBe("precision_tapered_sapphire_jewel");
  });
});

describe("bestUse", () => {
  it("metal tube for process", () => {
    expect(bestUse("metal_tube_magnetic")).toBe("process_opaque_fluid_high_pressure");
  });
});

describe("rotameterTypes", () => {
  it("returns 5 types", () => {
    expect(rotameterTypes()).toHaveLength(5);
  });
});
