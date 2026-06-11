import { describe, it, expect } from "vitest";
import {
  accuracy, range, dustImmunity, foamHandling,
  lrCost, contactFree, forSolids, signal,
  bestUse, levelSensorRadarTypes,
} from "../level-sensor-radar-calc.js";

describe("accuracy", () => {
  it("guided wave most accurate", () => {
    expect(accuracy("fmcw_guided_wave")).toBeGreaterThanOrEqual(accuracy("radar_tank_gauging"));
  });
});

describe("range", () => {
  it("pulse radar longest range", () => {
    expect(range("pulse_radar_tof")).toBeGreaterThan(range("fmcw_guided_wave"));
  });
});

describe("dustImmunity", () => {
  it("guided wave best dust immunity", () => {
    expect(dustImmunity("fmcw_guided_wave")).toBeGreaterThanOrEqual(dustImmunity("mimo_array_3d_scan"));
  });
});

describe("foamHandling", () => {
  it("guided wave best foam handling", () => {
    expect(foamHandling("fmcw_guided_wave")).toBeGreaterThan(foamHandling("pulse_radar_tof"));
  });
});

describe("lrCost", () => {
  it("mimo array most expensive", () => {
    expect(lrCost("mimo_array_3d_scan")).toBeGreaterThan(lrCost("pulse_radar_tof"));
  });
});

describe("contactFree", () => {
  it("fmcw non contact is contact free", () => {
    expect(contactFree("fmcw_non_contact")).toBe(true);
  });
  it("guided wave not contact free", () => {
    expect(contactFree("fmcw_guided_wave")).toBe(false);
  });
});

describe("forSolids", () => {
  it("pulse radar for solids", () => {
    expect(forSolids("pulse_radar_tof")).toBe(true);
  });
  it("radar tank gauging not for solids", () => {
    expect(forSolids("radar_tank_gauging")).toBe(false);
  });
});

describe("signal", () => {
  it("mimo uses phased array", () => {
    expect(signal("mimo_array_3d_scan")).toBe("mimo_phased_array_3d_surface_mapping_volume");
  });
});

describe("bestUse", () => {
  it("radar tank gauging for oil terminal", () => {
    expect(bestUse("radar_tank_gauging")).toBe("oil_terminal_tank_farm_custody_transfer_level");
  });
});

describe("levelSensorRadarTypes", () => {
  it("returns 5 types", () => {
    expect(levelSensorRadarTypes()).toHaveLength(5);
  });
});
