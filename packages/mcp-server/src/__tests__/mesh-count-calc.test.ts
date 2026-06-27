import { describe, it, expect } from "vitest";
import {
  detailFine, inkDeposit, durability, tensionRange,
  meshCost, forHalftone, forTextile, threadDiameter,
  bestUse, meshCounts,
} from "../mesh-count-calc.js";

describe("detailFine", () => {
  it("ultra mesh 305 finest detail", () => {
    expect(detailFine("ultra_mesh_305")).toBeGreaterThan(detailFine("low_mesh_60"));
  });
});

describe("inkDeposit", () => {
  it("low mesh 60 heaviest ink deposit", () => {
    expect(inkDeposit("low_mesh_60")).toBeGreaterThan(inkDeposit("ultra_mesh_305"));
  });
});

describe("durability", () => {
  it("standard mesh 156 most durable", () => {
    expect(durability("standard_mesh_156")).toBeGreaterThan(durability("ultra_mesh_305"));
  });
});

describe("tensionRange", () => {
  it("ultra mesh 305 widest tension range", () => {
    expect(tensionRange("ultra_mesh_305")).toBeGreaterThan(tensionRange("low_mesh_60"));
  });
});

describe("meshCost", () => {
  it("ultra mesh 305 most expensive", () => {
    expect(meshCost("ultra_mesh_305")).toBeGreaterThan(meshCost("low_mesh_60"));
  });
});

describe("forHalftone", () => {
  it("high mesh 230 is for halftone", () => {
    expect(forHalftone("high_mesh_230")).toBe(true);
  });
  it("low mesh 60 not for halftone", () => {
    expect(forHalftone("low_mesh_60")).toBe(false);
  });
});

describe("forTextile", () => {
  it("medium mesh 110 is for textile", () => {
    expect(forTextile("medium_mesh_110")).toBe(true);
  });
  it("ultra mesh 305 not for textile", () => {
    expect(forTextile("ultra_mesh_305")).toBe(false);
  });
});

describe("threadDiameter", () => {
  it("ultra mesh 305 uses ultra fine thread", () => {
    expect(threadDiameter("ultra_mesh_305")).toBe("ultra_fine_thread");
  });
});

describe("bestUse", () => {
  it("standard mesh 156 best for versatile all purpose", () => {
    expect(bestUse("standard_mesh_156")).toBe("versatile_all_purpose");
  });
});

describe("meshCounts", () => {
  it("returns 5 types", () => {
    expect(meshCounts()).toHaveLength(5);
  });
});
