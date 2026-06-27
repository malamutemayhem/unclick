import { describe, it, expect } from "vitest";
import {
  insulationValue, aerodynamicFunction, waterproofing,
  sensoryFunction, barbuleDensity, visibleExternally,
  hasRachis, primaryLocation, moltFrequency, featherTypes,
} from "../feather-type-calc.js";

describe("insulationValue", () => {
  it("down has best insulation", () => {
    expect(insulationValue("down")).toBeGreaterThan(
      insulationValue("flight")
    );
  });
});

describe("aerodynamicFunction", () => {
  it("flight feather has best aerodynamics", () => {
    expect(aerodynamicFunction("flight")).toBeGreaterThan(
      aerodynamicFunction("down")
    );
  });
});

describe("waterproofing", () => {
  it("contour feather has best waterproofing", () => {
    expect(waterproofing("contour")).toBeGreaterThan(
      waterproofing("filoplume")
    );
  });
});

describe("sensoryFunction", () => {
  it("filoplume has highest sensory function", () => {
    expect(sensoryFunction("filoplume")).toBeGreaterThan(
      sensoryFunction("down")
    );
  });
});

describe("barbuleDensity", () => {
  it("flight feather has highest barbule density", () => {
    expect(barbuleDensity("flight")).toBeGreaterThan(
      barbuleDensity("filoplume")
    );
  });
});

describe("visibleExternally", () => {
  it("contour is visible", () => {
    expect(visibleExternally("contour")).toBe(true);
  });
  it("down is not", () => {
    expect(visibleExternally("down")).toBe(false);
  });
});

describe("hasRachis", () => {
  it("flight feather has rachis", () => {
    expect(hasRachis("flight")).toBe(true);
  });
  it("down does not", () => {
    expect(hasRachis("down")).toBe(false);
  });
});

describe("primaryLocation", () => {
  it("flight feather on wings and tail", () => {
    expect(primaryLocation("flight")).toBe("wings_tail");
  });
});

describe("moltFrequency", () => {
  it("contour molts most frequently", () => {
    expect(moltFrequency("contour")).toBeGreaterThan(
      moltFrequency("flight")
    );
  });
});

describe("featherTypes", () => {
  it("returns 5 types", () => {
    expect(featherTypes()).toHaveLength(5);
  });
});
