import { describe, it, expect } from "vitest";
import {
  capacity, flexibility, safety, efficiency,
  bwCost, plugIn, forDistribution, conductor,
  bestUse, buswayTypeTypes,
} from "../busway-type-calc.js";

describe("capacity", () => {
  it("isolated phase highest capacity", () => {
    expect(capacity("isolated_phase_bus_high")).toBeGreaterThan(capacity("lighting_busway_track"));
  });
});

describe("flexibility", () => {
  it("trolley most flexible", () => {
    expect(flexibility("trolley_busway_sliding")).toBeGreaterThan(flexibility("isolated_phase_bus_high"));
  });
});

describe("safety", () => {
  it("isolated phase safest", () => {
    expect(safety("isolated_phase_bus_high")).toBeGreaterThan(safety("trolley_busway_sliding"));
  });
});

describe("efficiency", () => {
  it("isolated phase most efficient", () => {
    expect(efficiency("isolated_phase_bus_high")).toBeGreaterThan(efficiency("trolley_busway_sliding"));
  });
});

describe("bwCost", () => {
  it("isolated phase most expensive", () => {
    expect(bwCost("isolated_phase_bus_high")).toBeGreaterThan(bwCost("lighting_busway_track"));
  });
});

describe("plugIn", () => {
  it("plug in busway has plug in", () => {
    expect(plugIn("plug_in_busway_tap_off")).toBe(true);
  });
  it("feeder busway no plug in", () => {
    expect(plugIn("feeder_busway_sandwich")).toBe(false);
  });
});

describe("forDistribution", () => {
  it("feeder for distribution", () => {
    expect(forDistribution("feeder_busway_sandwich")).toBe(true);
  });
  it("trolley not for distribution", () => {
    expect(forDistribution("trolley_busway_sliding")).toBe(false);
  });
});

describe("conductor", () => {
  it("isolated phase uses aluminum tube", () => {
    expect(conductor("isolated_phase_bus_high")).toBe("aluminum_tube_isolated_phase");
  });
});

describe("bestUse", () => {
  it("plug in for manufacturing floor", () => {
    expect(bestUse("plug_in_busway_tap_off")).toBe("manufacturing_floor_flexible_power");
  });
});

describe("buswayTypeTypes", () => {
  it("returns 5 types", () => {
    expect(buswayTypeTypes()).toHaveLength(5);
  });
});
