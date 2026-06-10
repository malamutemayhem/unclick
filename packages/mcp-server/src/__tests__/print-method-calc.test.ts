import { describe, it, expect } from "vitest";
import {
  qualityScore, setupCost, perUnitCostLargeRun,
  colorAccuracy, speedPagesPerHour, variableDataCapable,
  tactiletexture, bestApplication, inkSystem, printMethods,
} from "../print-method-calc.js";

describe("qualityScore", () => {
  it("letterpress highest quality", () => {
    expect(qualityScore("letterpress")).toBeGreaterThan(
      qualityScore("flexography")
    );
  });
});

describe("setupCost", () => {
  it("letterpress highest setup cost", () => {
    expect(setupCost("letterpress")).toBeGreaterThan(
      setupCost("digital")
    );
  });
});

describe("perUnitCostLargeRun", () => {
  it("flexography cheapest per unit at scale", () => {
    expect(perUnitCostLargeRun("flexography")).toBeLessThan(
      perUnitCostLargeRun("letterpress")
    );
  });
});

describe("colorAccuracy", () => {
  it("offset best color accuracy", () => {
    expect(colorAccuracy("offset")).toBeGreaterThan(
      colorAccuracy("flexography")
    );
  });
});

describe("speedPagesPerHour", () => {
  it("flexography fastest", () => {
    expect(speedPagesPerHour("flexography")).toBeGreaterThan(
      speedPagesPerHour("letterpress")
    );
  });
});

describe("variableDataCapable", () => {
  it("digital supports variable data", () => {
    expect(variableDataCapable("digital")).toBe(true);
  });
  it("offset does not", () => {
    expect(variableDataCapable("offset")).toBe(false);
  });
});

describe("tactiletexture", () => {
  it("letterpress has tactile texture", () => {
    expect(tactiletexture("letterpress")).toBe(true);
  });
  it("digital does not", () => {
    expect(tactiletexture("digital")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("flexography for packaging", () => {
    expect(bestApplication("flexography")).toBe("packaging_labels");
  });
});

describe("inkSystem", () => {
  it("offset uses oil based cmyk", () => {
    expect(inkSystem("offset")).toBe("oil_based_cmyk");
  });
});

describe("printMethods", () => {
  it("returns 5 methods", () => {
    expect(printMethods()).toHaveLength(5);
  });
});
