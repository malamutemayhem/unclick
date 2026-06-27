import { describe, it, expect } from "vitest";
import {
  capacityMw, thermalEfficiency, co2EmissionsPerMwh,
  constructionTimeYears, dispatchability, requiresFuel,
  baseloadCapable, coolantType, primeDriver, powerPlants,
} from "../power-plant-calc.js";

describe("capacityMw", () => {
  it("nuclear highest capacity", () => {
    expect(capacityMw("nuclear")).toBeGreaterThan(
      capacityMw("natural_gas")
    );
  });
});

describe("thermalEfficiency", () => {
  it("hydroelectric most efficient", () => {
    expect(thermalEfficiency("hydroelectric")).toBeGreaterThan(
      thermalEfficiency("coal")
    );
  });
});

describe("co2EmissionsPerMwh", () => {
  it("coal highest emissions", () => {
    expect(co2EmissionsPerMwh("coal")).toBeGreaterThan(
      co2EmissionsPerMwh("nuclear")
    );
  });
});

describe("constructionTimeYears", () => {
  it("nuclear longest construction", () => {
    expect(constructionTimeYears("nuclear")).toBeGreaterThan(
      constructionTimeYears("natural_gas")
    );
  });
});

describe("dispatchability", () => {
  it("hydroelectric most dispatchable", () => {
    expect(dispatchability("hydroelectric")).toBeGreaterThan(
      dispatchability("nuclear")
    );
  });
});

describe("requiresFuel", () => {
  it("coal requires fuel", () => {
    expect(requiresFuel("coal")).toBe(true);
  });
  it("hydroelectric does not", () => {
    expect(requiresFuel("hydroelectric")).toBe(false);
  });
});

describe("baseloadCapable", () => {
  it("nuclear is baseload", () => {
    expect(baseloadCapable("nuclear")).toBe(true);
  });
  it("natural_gas is not", () => {
    expect(baseloadCapable("natural_gas")).toBe(false);
  });
});

describe("coolantType", () => {
  it("hydroelectric uses river flow", () => {
    expect(coolantType("hydroelectric")).toBe("river_flow");
  });
});

describe("primeDriver", () => {
  it("combined_cycle uses gas plus steam", () => {
    expect(primeDriver("combined_cycle")).toBe("gas_plus_steam_turbine");
  });
});

describe("powerPlants", () => {
  it("returns 5 plants", () => {
    expect(powerPlants()).toHaveLength(5);
  });
});
