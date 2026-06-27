import { describe, it, expect } from "vitest";
import {
  powerOutput, temperatureRequired, capitalCost, environmentalImpact,
  siteAvailability, closedLoop, electricityGeneration, workingFluid,
  famousInstallation, geothermalSystems,
} from "../geothermal-system-calc.js";

describe("powerOutput", () => {
  it("flash steam highest power", () => {
    expect(powerOutput("flash_steam")).toBeGreaterThan(powerOutput("direct_use"));
  });
});

describe("temperatureRequired", () => {
  it("dry steam highest temperature", () => {
    expect(temperatureRequired("dry_steam")).toBeGreaterThan(temperatureRequired("direct_use"));
  });
});

describe("capitalCost", () => {
  it("enhanced most expensive", () => {
    expect(capitalCost("enhanced")).toBeGreaterThan(capitalCost("direct_use"));
  });
});

describe("environmentalImpact", () => {
  it("enhanced highest environmental impact", () => {
    expect(environmentalImpact("enhanced")).toBeGreaterThan(environmentalImpact("direct_use"));
  });
});

describe("siteAvailability", () => {
  it("enhanced most available sites", () => {
    expect(siteAvailability("enhanced")).toBeGreaterThan(siteAvailability("dry_steam"));
  });
});

describe("closedLoop", () => {
  it("binary cycle is closed loop", () => {
    expect(closedLoop("binary_cycle")).toBe(true);
  });
  it("dry steam is not", () => {
    expect(closedLoop("dry_steam")).toBe(false);
  });
});

describe("electricityGeneration", () => {
  it("flash steam generates electricity", () => {
    expect(electricityGeneration("flash_steam")).toBe(true);
  });
  it("direct use does not", () => {
    expect(electricityGeneration("direct_use")).toBe(false);
  });
});

describe("workingFluid", () => {
  it("binary cycle uses isobutane isopentane", () => {
    expect(workingFluid("binary_cycle")).toBe("isobutane_isopentane");
  });
});

describe("famousInstallation", () => {
  it("direct use is reykjavik district heating", () => {
    expect(famousInstallation("direct_use")).toBe("reykjavik_district_heating");
  });
});

describe("geothermalSystems", () => {
  it("returns 5 systems", () => {
    expect(geothermalSystems()).toHaveLength(5);
  });
});
