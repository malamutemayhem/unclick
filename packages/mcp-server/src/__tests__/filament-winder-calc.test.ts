import { describe, it, expect } from "vitest";
import {
  fiberPlacement, throughput, angleControl, tensionControl,
  fwCost_, multiAxis, forPressureVessel, winderConfig,
  bestUse, filamentWinderTypes,
} from "../filament-winder-calc.js";

describe("fiberPlacement", () => {
  it("multi axis wind best fiber placement", () => {
    expect(fiberPlacement("multi_axis_wind")).toBeGreaterThan(fiberPlacement("hoop_wind"));
  });
});

describe("throughput", () => {
  it("hoop wind highest throughput", () => {
    expect(throughput("hoop_wind")).toBeGreaterThan(throughput("multi_axis_wind"));
  });
});

describe("angleControl", () => {
  it("multi axis wind best angle control", () => {
    expect(angleControl("multi_axis_wind")).toBeGreaterThan(angleControl("hoop_wind"));
  });
});

describe("tensionControl", () => {
  it("multi axis wind best tension control", () => {
    expect(tensionControl("multi_axis_wind")).toBeGreaterThan(tensionControl("polar_wind"));
  });
});

describe("fwCost_", () => {
  it("multi axis wind most expensive", () => {
    expect(fwCost_("multi_axis_wind")).toBeGreaterThan(fwCost_("hoop_wind"));
  });
});

describe("multiAxis", () => {
  it("multi axis wind is multi axis", () => {
    expect(multiAxis("multi_axis_wind")).toBe(true);
  });
  it("helical wind not multi axis", () => {
    expect(multiAxis("helical_wind")).toBe(false);
  });
});

describe("forPressureVessel", () => {
  it("helical wind for pressure vessel", () => {
    expect(forPressureVessel("helical_wind")).toBe(true);
  });
  it("hoop wind not for pressure vessel", () => {
    expect(forPressureVessel("hoop_wind")).toBe(false);
  });
});

describe("winderConfig", () => {
  it("towpreg wind uses pre impregnate tape slit lay no bath", () => {
    expect(winderConfig("towpreg_wind")).toBe("towpreg_filament_winder_pre_impregnate_tape_slit_lay_no_bath");
  });
});

describe("bestUse", () => {
  it("multi axis wind for aerospace duct robot non geodesic", () => {
    expect(bestUse("multi_axis_wind")).toBe("aerospace_duct_multi_axis_filament_winder_robot_non_geodesic");
  });
});

describe("filamentWinderTypes", () => {
  it("returns 5 types", () => {
    expect(filamentWinderTypes()).toHaveLength(5);
  });
});
