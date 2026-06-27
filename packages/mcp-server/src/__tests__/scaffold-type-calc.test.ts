import { describe, it, expect } from "vitest";
import {
  loadCapacity, assemblySpeed, versatility, rentalCost,
  safetyRating, requiresEngineer, reusableComponents, primaryMaterial,
  bestApplication, scaffoldTypes,
} from "../scaffold-type-calc.js";

describe("loadCapacity", () => {
  it("system highest load capacity", () => {
    expect(loadCapacity("system")).toBeGreaterThan(loadCapacity("suspended"));
  });
});

describe("assemblySpeed", () => {
  it("frame fastest assembly", () => {
    expect(assemblySpeed("frame")).toBeGreaterThan(assemblySpeed("tube_coupler"));
  });
});

describe("versatility", () => {
  it("tube coupler most versatile", () => {
    expect(versatility("tube_coupler")).toBeGreaterThan(versatility("frame"));
  });
});

describe("rentalCost", () => {
  it("cantilever most expensive", () => {
    expect(rentalCost("cantilever")).toBeGreaterThan(rentalCost("frame"));
  });
});

describe("safetyRating", () => {
  it("system safest", () => {
    expect(safetyRating("system")).toBeGreaterThan(safetyRating("cantilever"));
  });
});

describe("requiresEngineer", () => {
  it("suspended requires engineer", () => {
    expect(requiresEngineer("suspended")).toBe(true);
  });
  it("frame does not", () => {
    expect(requiresEngineer("frame")).toBe(false);
  });
});

describe("reusableComponents", () => {
  it("tube coupler is reusable", () => {
    expect(reusableComponents("tube_coupler")).toBe(true);
  });
  it("suspended is not", () => {
    expect(reusableComponents("suspended")).toBe(false);
  });
});

describe("primaryMaterial", () => {
  it("system is modular rosette node", () => {
    expect(primaryMaterial("system")).toBe("modular_rosette_node");
  });
});

describe("bestApplication", () => {
  it("frame for simple facade residential", () => {
    expect(bestApplication("frame")).toBe("simple_facade_residential");
  });
});

describe("scaffoldTypes", () => {
  it("returns 5 types", () => {
    expect(scaffoldTypes()).toHaveLength(5);
  });
});
