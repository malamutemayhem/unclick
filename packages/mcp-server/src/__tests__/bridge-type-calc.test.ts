import { describe, it, expect } from "vitest";
import {
  maxSpanM, constructionCost, maintenanceEffort,
  aestheticScore, loadCapacity, requiresCables,
  selfSupporting, famousExample, primaryMaterial, bridgeTypes,
} from "../bridge-type-calc.js";

describe("maxSpanM", () => {
  it("suspension longest span", () => {
    expect(maxSpanM("suspension")).toBeGreaterThan(
      maxSpanM("beam")
    );
  });
});

describe("constructionCost", () => {
  it("suspension most expensive", () => {
    expect(constructionCost("suspension")).toBeGreaterThan(
      constructionCost("beam")
    );
  });
});

describe("maintenanceEffort", () => {
  it("suspension most maintenance", () => {
    expect(maintenanceEffort("suspension")).toBeGreaterThan(
      maintenanceEffort("beam")
    );
  });
});

describe("aestheticScore", () => {
  it("suspension most aesthetic", () => {
    expect(aestheticScore("suspension")).toBeGreaterThan(
      aestheticScore("beam")
    );
  });
});

describe("loadCapacity", () => {
  it("truss highest load capacity", () => {
    expect(loadCapacity("truss")).toBeGreaterThan(
      loadCapacity("beam")
    );
  });
});

describe("requiresCables", () => {
  it("suspension requires cables", () => {
    expect(requiresCables("suspension")).toBe(true);
  });
  it("arch does not", () => {
    expect(requiresCables("arch")).toBe(false);
  });
});

describe("selfSupporting", () => {
  it("arch is self supporting", () => {
    expect(selfSupporting("arch")).toBe(true);
  });
  it("suspension is not", () => {
    expect(selfSupporting("suspension")).toBe(false);
  });
});

describe("famousExample", () => {
  it("suspension is golden gate", () => {
    expect(famousExample("suspension")).toBe("golden_gate");
  });
});

describe("primaryMaterial", () => {
  it("truss uses structural steel", () => {
    expect(primaryMaterial("truss")).toBe("structural_steel");
  });
});

describe("bridgeTypes", () => {
  it("returns 5 types", () => {
    expect(bridgeTypes()).toHaveLength(5);
  });
});
