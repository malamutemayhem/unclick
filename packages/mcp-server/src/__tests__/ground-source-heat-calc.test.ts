import { describe, it, expect } from "vitest";
import {
  efficiency, installCost, landRequired, reliability,
  gsCost, heatingAndCooling, forResidential, loop,
  bestUse, groundSourceHeatTypes,
} from "../ground-source-heat-calc.js";

describe("efficiency", () => {
  it("open loop well most efficient", () => {
    expect(efficiency("open_loop_well")).toBeGreaterThan(efficiency("horizontal_closed_loop"));
  });
});

describe("installCost", () => {
  it("vertical closed loop highest install cost", () => {
    expect(installCost("vertical_closed_loop")).toBeGreaterThan(installCost("pond_lake_loop"));
  });
});

describe("landRequired", () => {
  it("standing column well least land required", () => {
    expect(landRequired("standing_column_well")).toBeGreaterThan(landRequired("horizontal_closed_loop"));
  });
});

describe("reliability", () => {
  it("vertical closed loop most reliable", () => {
    expect(reliability("vertical_closed_loop")).toBeGreaterThan(reliability("open_loop_well"));
  });
});

describe("gsCost", () => {
  it("vertical closed loop most expensive", () => {
    expect(gsCost("vertical_closed_loop")).toBeGreaterThan(gsCost("pond_lake_loop"));
  });
});

describe("heatingAndCooling", () => {
  it("all types support heating and cooling", () => {
    expect(heatingAndCooling("horizontal_closed_loop")).toBe(true);
    expect(heatingAndCooling("vertical_closed_loop")).toBe(true);
  });
});

describe("forResidential", () => {
  it("horizontal closed loop for residential", () => {
    expect(forResidential("horizontal_closed_loop")).toBe(true);
  });
  it("standing column well not for residential", () => {
    expect(forResidential("standing_column_well")).toBe(false);
  });
});

describe("loop", () => {
  it("pond lake uses coiled pipe submerged", () => {
    expect(loop("pond_lake_loop")).toBe("coiled_pipe_submerged_in_pond_or_lake_bottom_closed_loop");
  });
});

describe("bestUse", () => {
  it("vertical closed loop for commercial school", () => {
    expect(bestUse("vertical_closed_loop")).toBe("commercial_school_limited_land_urban_multi_story_building");
  });
});

describe("groundSourceHeatTypes", () => {
  it("returns 5 types", () => {
    expect(groundSourceHeatTypes()).toHaveLength(5);
  });
});
