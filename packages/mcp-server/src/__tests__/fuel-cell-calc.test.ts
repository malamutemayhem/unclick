import { describe, it, expect } from "vitest";
import {
  efficiencyPercent, operatingTempC, startupTime,
  powerDensity, costScore, usesPlatinum,
  portableSize, primaryFuel, bestApplication, fuelCellTypes,
} from "../fuel-cell-calc.js";

describe("efficiencyPercent", () => {
  it("sofc most efficient", () => {
    expect(efficiencyPercent("sofc")).toBeGreaterThan(
      efficiencyPercent("direct_methanol")
    );
  });
});

describe("operatingTempC", () => {
  it("sofc runs hottest", () => {
    expect(operatingTempC("sofc")).toBeGreaterThan(
      operatingTempC("pem")
    );
  });
});

describe("startupTime", () => {
  it("sofc slowest startup", () => {
    expect(startupTime("sofc")).toBeGreaterThan(
      startupTime("pem")
    );
  });
});

describe("powerDensity", () => {
  it("pem highest power density", () => {
    expect(powerDensity("pem")).toBeGreaterThan(
      powerDensity("direct_methanol")
    );
  });
});

describe("costScore", () => {
  it("sofc most expensive", () => {
    expect(costScore("sofc")).toBeGreaterThan(
      costScore("alkaline")
    );
  });
});

describe("usesPlatinum", () => {
  it("pem uses platinum", () => {
    expect(usesPlatinum("pem")).toBe(true);
  });
  it("sofc does not", () => {
    expect(usesPlatinum("sofc")).toBe(false);
  });
});

describe("portableSize", () => {
  it("direct methanol is portable", () => {
    expect(portableSize("direct_methanol")).toBe(true);
  });
  it("sofc is not", () => {
    expect(portableSize("sofc")).toBe(false);
  });
});

describe("primaryFuel", () => {
  it("direct methanol uses methanol", () => {
    expect(primaryFuel("direct_methanol")).toBe("methanol");
  });
});

describe("bestApplication", () => {
  it("alkaline for spacecraft", () => {
    expect(bestApplication("alkaline")).toBe("spacecraft");
  });
});

describe("fuelCellTypes", () => {
  it("returns 5 types", () => {
    expect(fuelCellTypes()).toHaveLength(5);
  });
});
