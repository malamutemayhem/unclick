import { describe, it, expect } from "vitest";
import {
  output, reach, pressure, mobility,
  cpCost, selfPropelled, forHighRise, mechanism,
  bestUse, concretePumpTypes,
} from "../concrete-pump-calc.js";

describe("output", () => {
  it("boom pump highest output", () => {
    expect(output("boom_pump_truck_mounted")).toBeGreaterThan(output("squeeze_pump_peristaltic"));
  });
});

describe("reach", () => {
  it("placing boom greatest reach", () => {
    expect(reach("placing_boom_tower_crane")).toBeGreaterThan(reach("squeeze_pump_peristaltic"));
  });
});

describe("pressure", () => {
  it("line pump highest pressure", () => {
    expect(pressure("line_pump_trailer_mounted")).toBeGreaterThan(pressure("squeeze_pump_peristaltic"));
  });
});

describe("mobility", () => {
  it("boom pump most mobile", () => {
    expect(mobility("boom_pump_truck_mounted")).toBeGreaterThan(mobility("placing_boom_tower_crane"));
  });
});

describe("cpCost", () => {
  it("boom pump most expensive", () => {
    expect(cpCost("boom_pump_truck_mounted")).toBeGreaterThan(cpCost("squeeze_pump_peristaltic"));
  });
});

describe("selfPropelled", () => {
  it("boom pump is self propelled", () => {
    expect(selfPropelled("boom_pump_truck_mounted")).toBe(true);
  });
  it("line pump not self propelled", () => {
    expect(selfPropelled("line_pump_trailer_mounted")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("placing boom for high rise", () => {
    expect(forHighRise("placing_boom_tower_crane")).toBe(true);
  });
  it("boom pump not for high rise", () => {
    expect(forHighRise("boom_pump_truck_mounted")).toBe(false);
  });
});

describe("mechanism", () => {
  it("squeeze uses roller tube", () => {
    expect(mechanism("squeeze_pump_peristaltic")).toBe("roller_squeeze_flexible_tube");
  });
});

describe("bestUse", () => {
  it("boom pump for commercial slab", () => {
    expect(bestUse("boom_pump_truck_mounted")).toBe("commercial_slab_pour_fast_place");
  });
});

describe("concretePumpTypes", () => {
  it("returns 5 types", () => {
    expect(concretePumpTypes()).toHaveLength(5);
  });
});
