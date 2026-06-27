import { describe, it, expect } from "vitest";
import {
  tensileStrengthMpa, corrosionResistance, densityGCm3,
  machinability, costPerTon, magnetic,
  weldable, primaryElement, commonUse, alloyTypes,
} from "../alloy-type-calc.js";

describe("tensileStrengthMpa", () => {
  it("titanium is strongest", () => {
    expect(tensileStrengthMpa("titanium")).toBeGreaterThan(
      tensileStrengthMpa("aluminum")
    );
  });
});

describe("corrosionResistance", () => {
  it("titanium most corrosion resistant", () => {
    expect(corrosionResistance("titanium")).toBeGreaterThan(
      corrosionResistance("steel")
    );
  });
});

describe("densityGCm3", () => {
  it("brass is densest", () => {
    expect(densityGCm3("brass")).toBeGreaterThan(
      densityGCm3("aluminum")
    );
  });
});

describe("machinability", () => {
  it("brass most machinable", () => {
    expect(machinability("brass")).toBeGreaterThan(
      machinability("titanium")
    );
  });
});

describe("costPerTon", () => {
  it("titanium most expensive", () => {
    expect(costPerTon("titanium")).toBeGreaterThan(
      costPerTon("steel")
    );
  });
});

describe("magnetic", () => {
  it("steel is magnetic", () => {
    expect(magnetic("steel")).toBe(true);
  });
  it("aluminum is not", () => {
    expect(magnetic("aluminum")).toBe(false);
  });
});

describe("weldable", () => {
  it("steel is weldable", () => {
    expect(weldable("steel")).toBe(true);
  });
  it("brass is not", () => {
    expect(weldable("brass")).toBe(false);
  });
});

describe("primaryElement", () => {
  it("brass is copper based", () => {
    expect(primaryElement("brass")).toBe("copper");
  });
});

describe("commonUse", () => {
  it("titanium for jet engines", () => {
    expect(commonUse("titanium")).toBe("jet_engines");
  });
});

describe("alloyTypes", () => {
  it("returns 5 types", () => {
    expect(alloyTypes()).toHaveLength(5);
  });
});
