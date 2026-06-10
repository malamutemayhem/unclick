import { describe, it, expect } from "vitest";
import {
  storageCapacity, spaceWhenEmpty, spillContain, itemSecurity,
  organizerCost, washable, insulated, baseMaterial,
  bestCar, trunkOrganizers,
} from "../trunk-organizer-calc.js";

describe("storageCapacity", () => {
  it("rigid bin divider largest capacity", () => {
    expect(storageCapacity("rigid_bin_divider")).toBeGreaterThan(storageCapacity("hanging_seat_back"));
  });
});

describe("spaceWhenEmpty", () => {
  it("cargo net stretch takes least space empty", () => {
    expect(spaceWhenEmpty("cargo_net_stretch")).toBeGreaterThan(spaceWhenEmpty("rigid_bin_divider"));
  });
});

describe("spillContain", () => {
  it("cooler combo insulated best spill contain", () => {
    expect(spillContain("cooler_combo_insulated")).toBeGreaterThan(spillContain("cargo_net_stretch"));
  });
});

describe("itemSecurity", () => {
  it("rigid bin divider best item security", () => {
    expect(itemSecurity("rigid_bin_divider")).toBeGreaterThan(itemSecurity("hanging_seat_back"));
  });
});

describe("organizerCost", () => {
  it("rigid bin divider most expensive", () => {
    expect(organizerCost("rigid_bin_divider")).toBeGreaterThan(organizerCost("cargo_net_stretch"));
  });
});

describe("washable", () => {
  it("collapsible multi is washable", () => {
    expect(washable("collapsible_multi")).toBe(true);
  });
  it("cooler combo insulated is also washable", () => {
    expect(washable("cooler_combo_insulated")).toBe(true);
  });
});

describe("insulated", () => {
  it("cooler combo insulated is insulated", () => {
    expect(insulated("cooler_combo_insulated")).toBe(true);
  });
  it("collapsible multi is not", () => {
    expect(insulated("collapsible_multi")).toBe(false);
  });
});

describe("baseMaterial", () => {
  it("cargo net stretch uses elastic nylon mesh", () => {
    expect(baseMaterial("cargo_net_stretch")).toBe("elastic_nylon_mesh");
  });
});

describe("bestCar", () => {
  it("cooler combo insulated for road trip picnic cold", () => {
    expect(bestCar("cooler_combo_insulated")).toBe("road_trip_picnic_cold");
  });
});

describe("trunkOrganizers", () => {
  it("returns 5 types", () => {
    expect(trunkOrganizers()).toHaveLength(5);
  });
});
