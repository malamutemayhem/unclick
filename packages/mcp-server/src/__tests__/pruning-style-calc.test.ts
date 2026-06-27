import { describe, it, expect } from "vitest";
import {
  skillRequired, maintenanceFrequency, yearsToMature,
  aestheticValue, productiveYield, fruitBearing,
  indoorSuitable, bestTreeType, toolComplexity, pruningStyles,
} from "../pruning-style-calc.js";

describe("skillRequired", () => {
  it("bonsai needs most skill", () => {
    expect(skillRequired("bonsai")).toBeGreaterThan(
      skillRequired("coppice")
    );
  });
});

describe("maintenanceFrequency", () => {
  it("bonsai needs most maintenance", () => {
    expect(maintenanceFrequency("bonsai")).toBeGreaterThan(
      maintenanceFrequency("coppice")
    );
  });
});

describe("yearsToMature", () => {
  it("bonsai takes longest", () => {
    expect(yearsToMature("bonsai")).toBeGreaterThan(
      yearsToMature("pollard")
    );
  });
});

describe("aestheticValue", () => {
  it("topiary has high aesthetic value", () => {
    expect(aestheticValue("topiary")).toBeGreaterThan(
      aestheticValue("coppice")
    );
  });
});

describe("productiveYield", () => {
  it("coppice has highest yield", () => {
    expect(productiveYield("coppice")).toBeGreaterThan(
      productiveYield("topiary")
    );
  });
});

describe("fruitBearing", () => {
  it("espalier bears fruit", () => {
    expect(fruitBearing("espalier")).toBe(true);
  });
  it("topiary does not", () => {
    expect(fruitBearing("topiary")).toBe(false);
  });
});

describe("indoorSuitable", () => {
  it("bonsai is indoor suitable", () => {
    expect(indoorSuitable("bonsai")).toBe(true);
  });
  it("pollard is not", () => {
    expect(indoorSuitable("pollard")).toBe(false);
  });
});

describe("bestTreeType", () => {
  it("bonsai uses juniper", () => {
    expect(bestTreeType("bonsai")).toBe("juniper");
  });
});

describe("toolComplexity", () => {
  it("bonsai needs most complex tools", () => {
    expect(toolComplexity("bonsai")).toBeGreaterThan(
      toolComplexity("coppice")
    );
  });
});

describe("pruningStyles", () => {
  it("returns 5 types", () => {
    expect(pruningStyles()).toHaveLength(5);
  });
});
