import { describe, it, expect } from "vitest";
import {
  capacity, liftHeight, maneuver, speed,
  fkCost, electric, forIndoor, mast,
  bestUse, forkliftTypes,
} from "../forklift-type-calc.js";

describe("capacity", () => {
  it("rough terrain highest capacity", () => {
    expect(capacity("rough_terrain_diesel")).toBeGreaterThan(capacity("order_picker_elevated"));
  });
});

describe("liftHeight", () => {
  it("reach truck highest lift", () => {
    expect(liftHeight("reach_truck_narrow_aisle")).toBeGreaterThan(liftHeight("pallet_jack_walkie"));
  });
});

describe("maneuver", () => {
  it("pallet jack best maneuver", () => {
    expect(maneuver("pallet_jack_walkie")).toBeGreaterThan(maneuver("rough_terrain_diesel"));
  });
});

describe("speed", () => {
  it("rough terrain fastest", () => {
    expect(speed("rough_terrain_diesel")).toBeGreaterThan(speed("pallet_jack_walkie"));
  });
});

describe("fkCost", () => {
  it("reach truck most expensive", () => {
    expect(fkCost("reach_truck_narrow_aisle")).toBeGreaterThan(fkCost("pallet_jack_walkie"));
  });
});

describe("electric", () => {
  it("counterbalance is electric", () => {
    expect(electric("counterbalance_electric")).toBe(true);
  });
  it("rough terrain not electric", () => {
    expect(electric("rough_terrain_diesel")).toBe(false);
  });
});

describe("forIndoor", () => {
  it("reach truck for indoor", () => {
    expect(forIndoor("reach_truck_narrow_aisle")).toBe(true);
  });
  it("rough terrain not for indoor", () => {
    expect(forIndoor("rough_terrain_diesel")).toBe(false);
  });
});

describe("mast", () => {
  it("pallet jack uses hydraulic fork ground level", () => {
    expect(mast("pallet_jack_walkie")).toBe("hydraulic_fork_ground_level");
  });
});

describe("bestUse", () => {
  it("reach truck best for vna high rack", () => {
    expect(bestUse("reach_truck_narrow_aisle")).toBe("vna_high_rack_storage_pick");
  });
});

describe("forkliftTypes", () => {
  it("returns 5 types", () => {
    expect(forkliftTypes()).toHaveLength(5);
  });
});
