import { describe, it, expect } from "vitest";
import {
  efficiency, landUse, installCost, reliability,
  glCost, closedLoop, forSmallLot, fluid,
  bestUse, geothermalLoopTypes,
} from "../geothermal-loop-calc.js";

describe("efficiency", () => {
  it("open well most efficient", () => {
    expect(efficiency("open_well_standing_column")).toBeGreaterThan(efficiency("horizontal_trench_slinky"));
  });
});

describe("landUse", () => {
  it("vertical borehole least land use", () => {
    expect(landUse("vertical_borehole_closed")).toBeGreaterThan(landUse("horizontal_trench_slinky"));
  });
});

describe("installCost", () => {
  it("pond lake cheapest install", () => {
    expect(installCost("pond_lake_submerged")).toBeGreaterThan(installCost("vertical_borehole_closed"));
  });
});

describe("reliability", () => {
  it("vertical borehole most reliable", () => {
    expect(reliability("vertical_borehole_closed")).toBeGreaterThan(reliability("open_well_standing_column"));
  });
});

describe("glCost", () => {
  it("vertical borehole most expensive", () => {
    expect(glCost("vertical_borehole_closed")).toBeGreaterThan(glCost("pond_lake_submerged"));
  });
});

describe("closedLoop", () => {
  it("vertical borehole is closed loop", () => {
    expect(closedLoop("vertical_borehole_closed")).toBe(true);
  });
  it("open well not closed loop", () => {
    expect(closedLoop("open_well_standing_column")).toBe(false);
  });
});

describe("forSmallLot", () => {
  it("vertical borehole for small lot", () => {
    expect(forSmallLot("vertical_borehole_closed")).toBe(true);
  });
  it("horizontal trench not for small lot", () => {
    expect(forSmallLot("horizontal_trench_slinky")).toBe(false);
  });
});

describe("fluid", () => {
  it("direct exchange uses refrigerant in copper", () => {
    expect(fluid("direct_exchange_copper")).toBe("refrigerant_direct_copper_tube");
  });
});

describe("bestUse", () => {
  it("vertical borehole for commercial urban", () => {
    expect(bestUse("vertical_borehole_closed")).toBe("commercial_urban_limited_land");
  });
});

describe("geothermalLoopTypes", () => {
  it("returns 5 types", () => {
    expect(geothermalLoopTypes()).toHaveLength(5);
  });
});
