import { describe, it, expect } from "vitest";
import {
  maxTempC, controlPrecision, resultUniqueness,
  fuelCost, firingDuration, electricCompatible,
  atmosphereControlled, surfaceEffect, bestSuitedWare, firingMethods,
} from "../firing-method-calc.js";

describe("maxTempC", () => {
  it("wood highest max temp", () => {
    expect(maxTempC("wood")).toBeGreaterThan(
      maxTempC("pit")
    );
  });
});

describe("controlPrecision", () => {
  it("oxidation most precise control", () => {
    expect(controlPrecision("oxidation")).toBeGreaterThan(
      controlPrecision("pit")
    );
  });
});

describe("resultUniqueness", () => {
  it("wood most unique results", () => {
    expect(resultUniqueness("wood")).toBeGreaterThan(
      resultUniqueness("oxidation")
    );
  });
});

describe("fuelCost", () => {
  it("wood highest fuel cost", () => {
    expect(fuelCost("wood")).toBeGreaterThan(
      fuelCost("pit")
    );
  });
});

describe("firingDuration", () => {
  it("wood longest firing", () => {
    expect(firingDuration("wood")).toBeGreaterThan(
      firingDuration("pit")
    );
  });
});

describe("electricCompatible", () => {
  it("oxidation is electric compatible", () => {
    expect(electricCompatible("oxidation")).toBe(true);
  });
  it("wood is not", () => {
    expect(electricCompatible("wood")).toBe(false);
  });
});

describe("atmosphereControlled", () => {
  it("reduction is atmosphere controlled", () => {
    expect(atmosphereControlled("reduction")).toBe(true);
  });
  it("pit is not", () => {
    expect(atmosphereControlled("pit")).toBe(false);
  });
});

describe("surfaceEffect", () => {
  it("wood produces ash deposits", () => {
    expect(surfaceEffect("wood")).toBe("ash_deposits_flashing");
  });
});

describe("bestSuitedWare", () => {
  it("pit for primitive decorative", () => {
    expect(bestSuitedWare("pit")).toBe("primitive_decorative");
  });
});

describe("firingMethods", () => {
  it("returns 5 methods", () => {
    expect(firingMethods()).toHaveLength(5);
  });
});
