import { describe, it, expect } from "vitest";
import {
  precision, penetration, speed, heatAffected,
  lwCost, fiberDelivery, forMicro, source,
  bestUse, laserWelderTypes,
} from "../laser-welder-calc.js";

describe("precision", () => {
  it("nd yag pulsed most precise", () => {
    expect(precision("nd_yag_pulsed")).toBeGreaterThan(precision("diode_laser_clad"));
  });
});

describe("penetration", () => {
  it("co2 laser deepest penetration", () => {
    expect(penetration("co2_laser_deep")).toBeGreaterThan(penetration("nd_yag_pulsed"));
  });
});

describe("speed", () => {
  it("fiber laser fastest", () => {
    expect(speed("fiber_laser_fine")).toBeGreaterThan(speed("nd_yag_pulsed"));
  });
});

describe("heatAffected", () => {
  it("nd yag smallest heat affected zone", () => {
    expect(heatAffected("nd_yag_pulsed")).toBeGreaterThan(heatAffected("diode_laser_clad"));
  });
});

describe("lwCost", () => {
  it("disc laser most expensive", () => {
    expect(lwCost("disc_laser_high_power")).toBeGreaterThan(lwCost("diode_laser_clad"));
  });
});

describe("fiberDelivery", () => {
  it("fiber laser has fiber delivery", () => {
    expect(fiberDelivery("fiber_laser_fine")).toBe(true);
  });
  it("co2 laser no fiber delivery", () => {
    expect(fiberDelivery("co2_laser_deep")).toBe(false);
  });
});

describe("forMicro", () => {
  it("nd yag for micro welding", () => {
    expect(forMicro("nd_yag_pulsed")).toBe(true);
  });
  it("co2 laser not for micro", () => {
    expect(forMicro("co2_laser_deep")).toBe(false);
  });
});

describe("source", () => {
  it("fiber laser uses ytterbium", () => {
    expect(source("fiber_laser_fine")).toBe("ytterbium_fiber_laser_1070nm_single_mode");
  });
});

describe("bestUse", () => {
  it("co2 laser for thick steel shipbuilding", () => {
    expect(bestUse("co2_laser_deep")).toBe("thick_steel_shipbuilding_deep_keyhole");
  });
});

describe("laserWelderTypes", () => {
  it("returns 5 types", () => {
    expect(laserWelderTypes()).toHaveLength(5);
  });
});
