import { describe, it, expect } from "vitest";
import {
  meltRate, efficiency, installEase, operating,
  smCost, automatic, forDriveway, heat,
  bestUse, snowMeltTypes,
} from "../snow-melt-calc.js";

describe("meltRate", () => {
  it("hydronic fastest melt rate", () => {
    expect(meltRate("hydronic_glycol_tube")).toBeGreaterThan(meltRate("solar_thermal_hybrid"));
  });
});

describe("efficiency", () => {
  it("geothermal most efficient", () => {
    expect(efficiency("geothermal_ground_loop")).toBeGreaterThan(efficiency("infrared_overhead_radiant"));
  });
});

describe("installEase", () => {
  it("infrared easiest install", () => {
    expect(installEase("infrared_overhead_radiant")).toBeGreaterThan(installEase("geothermal_ground_loop"));
  });
});

describe("operating", () => {
  it("geothermal best operating cost", () => {
    expect(operating("geothermal_ground_loop")).toBeGreaterThan(operating("electric_cable_mat"));
  });
});

describe("smCost", () => {
  it("geothermal most expensive", () => {
    expect(smCost("geothermal_ground_loop")).toBeGreaterThan(smCost("infrared_overhead_radiant"));
  });
});

describe("automatic", () => {
  it("hydronic is automatic", () => {
    expect(automatic("hydronic_glycol_tube")).toBe(true);
  });
  it("infrared not automatic", () => {
    expect(automatic("infrared_overhead_radiant")).toBe(false);
  });
});

describe("forDriveway", () => {
  it("electric for driveway", () => {
    expect(forDriveway("electric_cable_mat")).toBe(true);
  });
  it("infrared not driveway", () => {
    expect(forDriveway("infrared_overhead_radiant")).toBe(false);
  });
});

describe("heat", () => {
  it("geothermal uses ground loop", () => {
    expect(heat("geothermal_ground_loop")).toBe("ground_source_loop_heat_exchange");
  });
});

describe("bestUse", () => {
  it("hydronic for commercial parking", () => {
    expect(bestUse("hydronic_glycol_tube")).toBe("commercial_parking_ramp_deck");
  });
});

describe("snowMeltTypes", () => {
  it("returns 5 types", () => {
    expect(snowMeltTypes()).toHaveLength(5);
  });
});
