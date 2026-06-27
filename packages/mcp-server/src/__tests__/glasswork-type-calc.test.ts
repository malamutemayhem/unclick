import { describe, it, expect } from "vitest";
import {
  temperatureCelsius, skillLevel, colorControl,
  shapeVersatility, productionTime, hollow,
  flatForm, bestApplication, collectorsValue, glassworkTypes,
} from "../glasswork-type-calc.js";

describe("temperatureCelsius", () => {
  it("blown requires highest temp", () => {
    expect(temperatureCelsius("blown")).toBeGreaterThan(
      temperatureCelsius("stained")
    );
  });
});

describe("skillLevel", () => {
  it("blown needs most skill", () => {
    expect(skillLevel("blown")).toBeGreaterThan(
      skillLevel("fused")
    );
  });
});

describe("colorControl", () => {
  it("stained has best color control", () => {
    expect(colorControl("stained")).toBeGreaterThan(
      colorControl("cast")
    );
  });
});

describe("shapeVersatility", () => {
  it("blown is most versatile", () => {
    expect(shapeVersatility("blown")).toBeGreaterThan(
      shapeVersatility("stained")
    );
  });
});

describe("productionTime", () => {
  it("stained takes longest", () => {
    expect(productionTime("stained")).toBeGreaterThan(
      productionTime("fused")
    );
  });
});

describe("hollow", () => {
  it("blown is hollow", () => {
    expect(hollow("blown")).toBe(true);
  });
  it("stained is not", () => {
    expect(hollow("stained")).toBe(false);
  });
});

describe("flatForm", () => {
  it("stained is flat", () => {
    expect(flatForm("stained")).toBe(true);
  });
  it("blown is not", () => {
    expect(flatForm("blown")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("stained for windows", () => {
    expect(bestApplication("stained")).toBe("windows");
  });
});

describe("collectorsValue", () => {
  it("stained has highest value", () => {
    expect(collectorsValue("stained")).toBeGreaterThan(
      collectorsValue("fused")
    );
  });
});

describe("glassworkTypes", () => {
  it("returns 5 types", () => {
    expect(glassworkTypes()).toHaveLength(5);
  });
});
