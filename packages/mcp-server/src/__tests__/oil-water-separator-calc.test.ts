import { describe, it, expect } from "vitest";
import {
  separationEfficiency, flowCapacity, oilDropletSize, maintenanceInterval,
  owsCost, passive, forEmulsion, mechanism,
  bestUse, oilWaterSeparatorTypes,
} from "../oil-water-separator-calc.js";

describe("separationEfficiency", () => {
  it("membrane ultrafiltration highest separation efficiency", () => {
    expect(separationEfficiency("membrane_ultrafiltration")).toBeGreaterThan(separationEfficiency("gravity_api"));
  });
});

describe("flowCapacity", () => {
  it("gravity api highest flow capacity", () => {
    expect(flowCapacity("gravity_api")).toBeGreaterThan(flowCapacity("membrane_ultrafiltration"));
  });
});

describe("oilDropletSize", () => {
  it("membrane ultrafiltration finest droplet capture", () => {
    expect(oilDropletSize("membrane_ultrafiltration")).toBeGreaterThan(oilDropletSize("gravity_api"));
  });
});

describe("maintenanceInterval", () => {
  it("gravity api longest maintenance interval", () => {
    expect(maintenanceInterval("gravity_api")).toBeGreaterThan(maintenanceInterval("membrane_ultrafiltration"));
  });
});

describe("owsCost", () => {
  it("membrane ultrafiltration most expensive", () => {
    expect(owsCost("membrane_ultrafiltration")).toBeGreaterThan(owsCost("gravity_api"));
  });
});

describe("passive", () => {
  it("gravity api is passive", () => {
    expect(passive("gravity_api")).toBe(true);
  });
  it("centrifugal disc not passive", () => {
    expect(passive("centrifugal_disc")).toBe(false);
  });
});

describe("forEmulsion", () => {
  it("centrifugal disc handles emulsions", () => {
    expect(forEmulsion("centrifugal_disc")).toBe(true);
  });
  it("gravity api not for emulsions", () => {
    expect(forEmulsion("gravity_api")).toBe(false);
  });
});

describe("mechanism", () => {
  it("coalescing plate uses corrugated oleophilic plates", () => {
    expect(mechanism("coalescing_plate")).toBe("corrugated_oleophilic_plate_pack_merge_small_drops_rise_fast");
  });
});

describe("bestUse", () => {
  it("centrifugal disc for bilge water marine", () => {
    expect(bestUse("centrifugal_disc")).toBe("bilge_water_marine_fuel_purification_lube_oil_reclaim");
  });
});

describe("oilWaterSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(oilWaterSeparatorTypes()).toHaveLength(5);
  });
});
