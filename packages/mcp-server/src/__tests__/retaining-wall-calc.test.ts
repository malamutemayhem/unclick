import { describe, it, expect } from "vitest";
import {
  heightCapacity, lateralResistance, constructionSpeed, materialVolume,
  projectCost, requiresDeepFoundation, allowsDrainage, primaryMaterial,
  bestScenario, retainingWalls,
} from "../retaining-wall-calc.js";

describe("heightCapacity", () => {
  it("anchored highest capacity", () => {
    expect(heightCapacity("anchored")).toBeGreaterThan(heightCapacity("gravity"));
  });
});

describe("lateralResistance", () => {
  it("anchored best lateral resistance", () => {
    expect(lateralResistance("anchored")).toBeGreaterThan(lateralResistance("sheet_pile"));
  });
});

describe("constructionSpeed", () => {
  it("sheet pile fastest construction", () => {
    expect(constructionSpeed("sheet_pile")).toBeGreaterThan(constructionSpeed("anchored"));
  });
});

describe("materialVolume", () => {
  it("gravity most material volume", () => {
    expect(materialVolume("gravity")).toBeGreaterThan(materialVolume("sheet_pile"));
  });
});

describe("projectCost", () => {
  it("anchored most expensive", () => {
    expect(projectCost("anchored")).toBeGreaterThan(projectCost("gravity"));
  });
});

describe("requiresDeepFoundation", () => {
  it("cantilever requires deep foundation", () => {
    expect(requiresDeepFoundation("cantilever")).toBe(true);
  });
  it("gravity does not", () => {
    expect(requiresDeepFoundation("gravity")).toBe(false);
  });
});

describe("allowsDrainage", () => {
  it("gravity allows drainage", () => {
    expect(allowsDrainage("gravity")).toBe(true);
  });
  it("sheet pile does not", () => {
    expect(allowsDrainage("sheet_pile")).toBe(false);
  });
});

describe("primaryMaterial", () => {
  it("mechanically stabilized uses geogrid reinforced fill", () => {
    expect(primaryMaterial("mechanically_stabilized")).toBe("geogrid_reinforced_fill");
  });
});

describe("bestScenario", () => {
  it("sheet pile for waterfront cofferdam", () => {
    expect(bestScenario("sheet_pile")).toBe("waterfront_cofferdam");
  });
});

describe("retainingWalls", () => {
  it("returns 5 wall types", () => {
    expect(retainingWalls()).toHaveLength(5);
  });
});
