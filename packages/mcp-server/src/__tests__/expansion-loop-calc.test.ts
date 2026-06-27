import { describe, it, expect } from "vitest";
import {
  movement, pressure, space, maintenance,
  elCost, guided, forSteam, method,
  bestUse, expansionLoopTypes,
} from "../expansion-loop-calc.js";

describe("movement", () => {
  it("bellows best movement", () => {
    expect(movement("bellows_expansion_joint")).toBeGreaterThan(movement("l_bend_corner_change"));
  });
});

describe("pressure", () => {
  it("u bend best pressure", () => {
    expect(pressure("u_bend_loop_natural_flex")).toBeGreaterThan(pressure("bellows_expansion_joint"));
  });
});

describe("space", () => {
  it("bellows least space needed", () => {
    expect(space("bellows_expansion_joint")).toBeGreaterThan(space("u_bend_loop_natural_flex"));
  });
});

describe("maintenance", () => {
  it("l bend lowest maintenance", () => {
    expect(maintenance("l_bend_corner_change")).toBeGreaterThan(maintenance("slip_joint_packing_gland"));
  });
});

describe("elCost", () => {
  it("bellows most expensive", () => {
    expect(elCost("bellows_expansion_joint")).toBeGreaterThan(elCost("l_bend_corner_change"));
  });
});

describe("guided", () => {
  it("bellows is guided", () => {
    expect(guided("bellows_expansion_joint")).toBe(true);
  });
  it("u bend not guided", () => {
    expect(guided("u_bend_loop_natural_flex")).toBe(false);
  });
});

describe("forSteam", () => {
  it("u bend for steam", () => {
    expect(forSteam("u_bend_loop_natural_flex")).toBe(true);
  });
  it("slip joint not for steam", () => {
    expect(forSteam("slip_joint_packing_gland")).toBe(false);
  });
});

describe("method", () => {
  it("bellows uses metal bellows convolution", () => {
    expect(method("bellows_expansion_joint")).toBe("metal_bellows_convolution_flex");
  });
});

describe("bestUse", () => {
  it("u bend for long run steam", () => {
    expect(bestUse("u_bend_loop_natural_flex")).toBe("long_run_steam_hot_water_outdoor");
  });
});

describe("expansionLoopTypes", () => {
  it("returns 5 types", () => {
    expect(expansionLoopTypes()).toHaveLength(5);
  });
});
