import { describe, it, expect } from "vitest";
import {
  currentRating, sealRating, cycleLife, sizeCompact,
  switchCost, illuminated, sealed, mountType,
  bestUse, rockerSwitches,
} from "../rocker-switch-calc.js";

describe("currentRating", () => {
  it("dpst 20a appliance highest current rating", () => {
    expect(currentRating("dpst_20a_appliance")).toBeGreaterThan(currentRating("mini_spst_panel"));
  });
});

describe("sealRating", () => {
  it("sealed dpdt marine highest seal rating", () => {
    expect(sealRating("sealed_dpdt_marine")).toBeGreaterThan(sealRating("mini_spst_panel"));
  });
});

describe("cycleLife", () => {
  it("sealed dpdt marine longest cycle life", () => {
    expect(cycleLife("sealed_dpdt_marine")).toBeGreaterThan(cycleLife("illuminated_spst_power"));
  });
});

describe("sizeCompact", () => {
  it("mini spst panel most compact", () => {
    expect(sizeCompact("mini_spst_panel")).toBeGreaterThan(sizeCompact("dpst_20a_appliance"));
  });
});

describe("switchCost", () => {
  it("sealed dpdt marine most expensive", () => {
    expect(switchCost("sealed_dpdt_marine")).toBeGreaterThan(switchCost("mini_spst_panel"));
  });
});

describe("illuminated", () => {
  it("illuminated spst is illuminated", () => {
    expect(illuminated("illuminated_spst_power")).toBe(true);
  });
  it("mini spst not illuminated", () => {
    expect(illuminated("mini_spst_panel")).toBe(false);
  });
});

describe("sealed", () => {
  it("sealed dpdt marine is sealed", () => {
    expect(sealed("sealed_dpdt_marine")).toBe(true);
  });
  it("round snap in not sealed", () => {
    expect(sealed("round_snap_in")).toBe(false);
  });
});

describe("mountType", () => {
  it("round snap in uses round hole snap", () => {
    expect(mountType("round_snap_in")).toBe("round_hole_snap");
  });
});

describe("bestUse", () => {
  it("dpst 20a appliance best for heater main switch", () => {
    expect(bestUse("dpst_20a_appliance")).toBe("heater_main_switch");
  });
});

describe("rockerSwitches", () => {
  it("returns 5 types", () => {
    expect(rockerSwitches()).toHaveLength(5);
  });
});
