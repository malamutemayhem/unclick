import { describe, it, expect } from "vitest";
import {
  speed, coverage, precision, driftControl,
  csCost, gpsGuided, forRowCrop, nozzle,
  bestUse, cropSprayerTypes,
} from "../crop-sprayer-calc.js";

describe("speed", () => {
  it("self propelled fastest", () => {
    expect(speed("self_propelled")).toBeGreaterThan(speed("knapsack_manual"));
  });
});

describe("coverage", () => {
  it("self propelled widest coverage", () => {
    expect(coverage("self_propelled")).toBeGreaterThan(coverage("drone_uav"));
  });
});

describe("precision", () => {
  it("drone uav most precise", () => {
    expect(precision("drone_uav")).toBeGreaterThan(precision("knapsack_manual"));
  });
});

describe("driftControl", () => {
  it("self propelled best drift control", () => {
    expect(driftControl("self_propelled")).toBeGreaterThan(driftControl("knapsack_manual"));
  });
});

describe("csCost", () => {
  it("self propelled most expensive", () => {
    expect(csCost("self_propelled")).toBeGreaterThan(csCost("knapsack_manual"));
  });
});

describe("gpsGuided", () => {
  it("self propelled is gps guided", () => {
    expect(gpsGuided("self_propelled")).toBe(true);
  });
  it("knapsack manual not gps guided", () => {
    expect(gpsGuided("knapsack_manual")).toBe(false);
  });
});

describe("forRowCrop", () => {
  it("self propelled for row crop", () => {
    expect(forRowCrop("self_propelled")).toBe(true);
  });
  it("drone uav not for row crop", () => {
    expect(forRowCrop("drone_uav")).toBe(false);
  });
});

describe("nozzle", () => {
  it("orchard airblast uses axial fan", () => {
    expect(nozzle("orchard_airblast")).toBe("axial_fan_airblast_hollow_cone_nozzle_canopy_penetration");
  });
});

describe("bestUse", () => {
  it("drone uav for spot spray steep terrain", () => {
    expect(bestUse("drone_uav")).toBe("spot_spray_steep_terrain_small_field_precision_target");
  });
});

describe("cropSprayerTypes", () => {
  it("returns 5 types", () => {
    expect(cropSprayerTypes()).toHaveLength(5);
  });
});
