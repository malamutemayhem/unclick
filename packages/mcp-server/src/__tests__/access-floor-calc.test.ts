import { describe, it, expect } from "vitest";
import {
  loadCapacity, acoustic, fireRating, adjustability,
  afCost, conductive, forDataCenter, pedestal,
  bestUse, accessFloorTypes,
} from "../access-floor-calc.js";

describe("loadCapacity", () => {
  it("calcium sulphate highest load", () => {
    expect(loadCapacity("calcium_sulphate_heavy")).toBeGreaterThan(loadCapacity("aluminum_die_cast_light"));
  });
});

describe("acoustic", () => {
  it("calcium sulphate best acoustic", () => {
    expect(acoustic("calcium_sulphate_heavy")).toBeGreaterThan(acoustic("aluminum_die_cast_light"));
  });
});

describe("fireRating", () => {
  it("calcium sulphate best fire rating", () => {
    expect(fireRating("calcium_sulphate_heavy")).toBeGreaterThan(fireRating("wood_core_laminate_finish"));
  });
});

describe("adjustability", () => {
  it("aluminum most adjustable", () => {
    expect(adjustability("aluminum_die_cast_light")).toBeGreaterThan(adjustability("wood_core_laminate_finish"));
  });
});

describe("afCost", () => {
  it("calcium sulphate most expensive", () => {
    expect(afCost("calcium_sulphate_heavy")).toBeGreaterThan(afCost("wood_core_laminate_finish"));
  });
});

describe("conductive", () => {
  it("steel bare is conductive", () => {
    expect(conductive("steel_bare_conductive")).toBe(true);
  });
  it("cementitious not conductive", () => {
    expect(conductive("steel_cementitious_panel")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("steel cementitious for data center", () => {
    expect(forDataCenter("steel_cementitious_panel")).toBe(true);
  });
  it("wood core not for data center", () => {
    expect(forDataCenter("wood_core_laminate_finish")).toBe(false);
  });
});

describe("pedestal", () => {
  it("aluminum uses snap fit low profile", () => {
    expect(pedestal("aluminum_die_cast_light")).toBe("aluminum_snap_fit_low_profile");
  });
});

describe("bestUse", () => {
  it("calcium sulphate for trading floor", () => {
    expect(bestUse("calcium_sulphate_heavy")).toBe("trading_floor_heavy_equipment_load");
  });
});

describe("accessFloorTypes", () => {
  it("returns 5 types", () => {
    expect(accessFloorTypes()).toHaveLength(5);
  });
});
