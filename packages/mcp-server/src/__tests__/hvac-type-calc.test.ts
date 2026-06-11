import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, zoning, noise,
  hvCost, heatPump, forCommercial, medium,
  bestUse, hvacTypes,
} from "../hvac-type-calc.js";

describe("efficiency", () => {
  it("radiant floor most efficient", () => {
    expect(efficiency("radiant_floor_hydronic")).toBeGreaterThan(efficiency("packaged_rooftop_unit"));
  });
});

describe("capacity", () => {
  it("chilled water ahu highest capacity", () => {
    expect(capacity("chilled_water_ahu")).toBeGreaterThan(capacity("radiant_floor_hydronic"));
  });
});

describe("zoning", () => {
  it("vrf best zoning", () => {
    expect(zoning("vrf_variable_refrigerant")).toBeGreaterThan(zoning("packaged_rooftop_unit"));
  });
});

describe("noise", () => {
  it("radiant floor quietest", () => {
    expect(noise("radiant_floor_hydronic")).toBeGreaterThan(noise("packaged_rooftop_unit"));
  });
});

describe("hvCost", () => {
  it("chilled water ahu most expensive", () => {
    expect(hvCost("chilled_water_ahu")).toBeGreaterThan(hvCost("split_system_ducted"));
  });
});

describe("heatPump", () => {
  it("vrf is heat pump", () => {
    expect(heatPump("vrf_variable_refrigerant")).toBe(true);
  });
  it("chilled water not heat pump", () => {
    expect(heatPump("chilled_water_ahu")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("vrf for commercial", () => {
    expect(forCommercial("vrf_variable_refrigerant")).toBe(true);
  });
  it("split system not for commercial", () => {
    expect(forCommercial("split_system_ducted")).toBe(false);
  });
});

describe("medium", () => {
  it("radiant floor uses hot water pex tubing", () => {
    expect(medium("radiant_floor_hydronic")).toBe("hot_water_pex_tubing");
  });
});

describe("bestUse", () => {
  it("vrf best for multi zone office", () => {
    expect(bestUse("vrf_variable_refrigerant")).toBe("multi_zone_office_hotel_floor");
  });
});

describe("hvacTypes", () => {
  it("returns 5 types", () => {
    expect(hvacTypes()).toHaveLength(5);
  });
});
