import { describe, it, expect } from "vitest";
import {
  thermalEfficiency, safetyRating, fuelUtilization,
  constructionCost, proliferationRisk, requiresEnrichedFuel,
  passiveSafety, coolant, generationClass, reactorTypes,
} from "../nuclear-reactor-calc.js";

describe("thermalEfficiency", () => {
  it("molten salt most efficient", () => {
    expect(thermalEfficiency("molten_salt")).toBeGreaterThan(
      thermalEfficiency("pwr")
    );
  });
});

describe("safetyRating", () => {
  it("molten salt safest", () => {
    expect(safetyRating("molten_salt")).toBeGreaterThan(
      safetyRating("fast_breeder")
    );
  });
});

describe("fuelUtilization", () => {
  it("fast breeder best fuel use", () => {
    expect(fuelUtilization("fast_breeder")).toBeGreaterThan(
      fuelUtilization("pwr")
    );
  });
});

describe("constructionCost", () => {
  it("fast breeder most expensive", () => {
    expect(constructionCost("fast_breeder")).toBeGreaterThan(
      constructionCost("bwr")
    );
  });
});

describe("proliferationRisk", () => {
  it("fast breeder highest risk", () => {
    expect(proliferationRisk("fast_breeder")).toBeGreaterThan(
      proliferationRisk("molten_salt")
    );
  });
});

describe("requiresEnrichedFuel", () => {
  it("pwr requires enriched fuel", () => {
    expect(requiresEnrichedFuel("pwr")).toBe(true);
  });
  it("candu does not", () => {
    expect(requiresEnrichedFuel("candu")).toBe(false);
  });
});

describe("passiveSafety", () => {
  it("molten salt has passive safety", () => {
    expect(passiveSafety("molten_salt")).toBe(true);
  });
  it("pwr does not", () => {
    expect(passiveSafety("pwr")).toBe(false);
  });
});

describe("coolant", () => {
  it("fast breeder uses liquid sodium", () => {
    expect(coolant("fast_breeder")).toBe("liquid_sodium");
  });
});

describe("generationClass", () => {
  it("molten salt is gen iv", () => {
    expect(generationClass("molten_salt")).toBe("generation_iv");
  });
});

describe("reactorTypes", () => {
  it("returns 5 types", () => {
    expect(reactorTypes()).toHaveLength(5);
  });
});
