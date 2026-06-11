import { describe, it, expect } from "vitest";
import {
  weldStrength, throughput, crossSection, heatAffected,
  fwCost, portable, forRail, welderConfig,
  bestUse, flashWelderTypes,
} from "../flash-welder-calc.js";

describe("weldStrength", () => {
  it("dc flash best weld strength", () => {
    expect(weldStrength("dc_flash")).toBeGreaterThan(weldStrength("ac_flash"));
  });
});

describe("throughput", () => {
  it("continuous flash highest throughput", () => {
    expect(throughput("continuous_flash")).toBeGreaterThan(throughput("mobile_flash"));
  });
});

describe("crossSection", () => {
  it("continuous flash best cross section", () => {
    expect(crossSection("continuous_flash")).toBeGreaterThan(crossSection("upset_flash"));
  });
});

describe("heatAffected", () => {
  it("dc flash best heat affected control", () => {
    expect(heatAffected("dc_flash")).toBeGreaterThan(heatAffected("upset_flash"));
  });
});

describe("fwCost", () => {
  it("mobile flash most expensive", () => {
    expect(fwCost("mobile_flash")).toBeGreaterThan(fwCost("upset_flash"));
  });
});

describe("portable", () => {
  it("mobile flash is portable", () => {
    expect(portable("mobile_flash")).toBe(true);
  });
  it("ac flash not portable", () => {
    expect(portable("ac_flash")).toBe(false);
  });
});

describe("forRail", () => {
  it("continuous flash for rail", () => {
    expect(forRail("continuous_flash")).toBe(true);
  });
  it("ac flash not for rail", () => {
    expect(forRail("ac_flash")).toBe(false);
  });
});

describe("welderConfig", () => {
  it("mobile flash uses track mount field rail join generator power", () => {
    expect(welderConfig("mobile_flash")).toBe("mobile_flash_welder_track_mount_field_rail_join_generator_power");
  });
});

describe("bestUse", () => {
  it("continuous flash for rail plant high output pre heat forge", () => {
    expect(bestUse("continuous_flash")).toBe("rail_plant_continuous_flash_welder_high_output_pre_heat_forge");
  });
});

describe("flashWelderTypes", () => {
  it("returns 5 types", () => {
    expect(flashWelderTypes()).toHaveLength(5);
  });
});
