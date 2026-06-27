import { describe, it, expect } from "vitest";
import {
  surfaceArea, curvatureCorrection, inkPenetration, lineWidth,
  engravingDepth, hardness, workTime, sandingGrit,
  sealerCoats, collectibleValue, scrimshawMedia,
} from "../scrimshaw-calc.js";

describe("surfaceArea", () => {
  it("correct area", () => {
    expect(surfaceArea(10, 5)).toBe(50);
  });
});

describe("curvatureCorrection", () => {
  it("larger than flat area", () => {
    expect(curvatureCorrection(3, 50)).toBeGreaterThan(50);
  });
  it("zero radius = flat", () => {
    expect(curvatureCorrection(0, 50)).toBe(50);
  });
});

describe("inkPenetration", () => {
  it("antler deepest", () => {
    expect(inkPenetration("antler")).toBeGreaterThan(inkPenetration("shell"));
  });
});

describe("lineWidth", () => {
  it("needle finest", () => {
    expect(lineWidth("needle")).toBeLessThan(lineWidth("dremel"));
  });
});

describe("engravingDepth", () => {
  it("positive mm", () => {
    expect(engravingDepth("bone")).toBeGreaterThan(0);
  });
});

describe("hardness", () => {
  it("shell hardest", () => {
    expect(hardness("shell")).toBeGreaterThan(hardness("synthetic"));
  });
});

describe("workTime", () => {
  it("high detail takes longer", () => {
    expect(workTime(50, "high")).toBeGreaterThan(workTime(50, "low"));
  });
});

describe("sandingGrit", () => {
  it("fine = 600", () => {
    expect(sandingGrit("fine")).toBe(600);
  });
});

describe("sealerCoats", () => {
  it("ivory_nut = 3", () => {
    expect(sealerCoats("ivory_nut")).toBe(3);
  });
});

describe("collectibleValue", () => {
  it("increases with age", () => {
    expect(collectibleValue(3650, "high")).toBeGreaterThan(collectibleValue(0, "high"));
  });
});

describe("scrimshawMedia", () => {
  it("returns 5 media", () => {
    expect(scrimshawMedia()).toHaveLength(5);
  });
});
