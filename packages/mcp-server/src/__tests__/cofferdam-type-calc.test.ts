import { describe, it, expect } from "vitest";
import {
  depth, waterTight, strength, speed,
  cfCost, reusable, forBridge, construction,
  bestUse, cofferdamTypes,
} from "../cofferdam-type-calc.js";

describe("depth", () => {
  it("double wall deepest", () => {
    expect(depth("double_wall_cellular")).toBeGreaterThan(depth("inflatable_rubber_bladder"));
  });
});

describe("waterTight", () => {
  it("double wall most watertight", () => {
    expect(waterTight("double_wall_cellular")).toBeGreaterThan(waterTight("earth_fill_diversion"));
  });
});

describe("strength", () => {
  it("double wall strongest", () => {
    expect(strength("double_wall_cellular")).toBeGreaterThan(strength("inflatable_rubber_bladder"));
  });
});

describe("speed", () => {
  it("inflatable fastest deploy", () => {
    expect(speed("inflatable_rubber_bladder")).toBeGreaterThan(speed("double_wall_cellular"));
  });
});

describe("cfCost", () => {
  it("double wall most expensive", () => {
    expect(cfCost("double_wall_cellular")).toBeGreaterThan(cfCost("earth_fill_diversion"));
  });
});

describe("reusable", () => {
  it("single wall is reusable", () => {
    expect(reusable("single_wall_sheet_pile")).toBe(true);
  });
  it("double wall not reusable", () => {
    expect(reusable("double_wall_cellular")).toBe(false);
  });
});

describe("forBridge", () => {
  it("single wall for bridge", () => {
    expect(forBridge("single_wall_sheet_pile")).toBe(true);
  });
  it("earth fill not for bridge", () => {
    expect(forBridge("earth_fill_diversion")).toBe(false);
  });
});

describe("construction", () => {
  it("inflatable uses rubber bladder", () => {
    expect(construction("inflatable_rubber_bladder")).toBe("rubber_fabric_bladder_air_water");
  });
});

describe("bestUse", () => {
  it("double wall for deep water dam", () => {
    expect(bestUse("double_wall_cellular")).toBe("deep_water_dam_foundation_heavy");
  });
});

describe("cofferdamTypes", () => {
  it("returns 5 types", () => {
    expect(cofferdamTypes()).toHaveLength(5);
  });
});
