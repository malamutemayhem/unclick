import { describe, it, expect } from "vitest";
import {
  gritNumber, materialRemoval, surfaceQuality,
  durability, dustProduction, usedByHand,
  suitableForFinishPrep, primaryTask, backingType, sandpaperGrits,
} from "../sandpaper-grit-calc.js";

describe("gritNumber", () => {
  it("ultra fine highest grit", () => {
    expect(gritNumber("ultra_fine")).toBeGreaterThan(
      gritNumber("coarse")
    );
  });
});

describe("materialRemoval", () => {
  it("coarse removes most material", () => {
    expect(materialRemoval("coarse")).toBeGreaterThan(
      materialRemoval("ultra_fine")
    );
  });
});

describe("surfaceQuality", () => {
  it("ultra fine best surface quality", () => {
    expect(surfaceQuality("ultra_fine")).toBeGreaterThan(
      surfaceQuality("coarse")
    );
  });
});

describe("durability", () => {
  it("coarse most durable", () => {
    expect(durability("coarse")).toBeGreaterThan(
      durability("ultra_fine")
    );
  });
});

describe("dustProduction", () => {
  it("coarse most dust", () => {
    expect(dustProduction("coarse")).toBeGreaterThan(
      dustProduction("ultra_fine")
    );
  });
});

describe("usedByHand", () => {
  it("fine used by hand", () => {
    expect(usedByHand("fine")).toBe(true);
  });
  it("coarse not typically", () => {
    expect(usedByHand("coarse")).toBe(false);
  });
});

describe("suitableForFinishPrep", () => {
  it("fine suitable for finish prep", () => {
    expect(suitableForFinishPrep("fine")).toBe(true);
  });
  it("coarse is not", () => {
    expect(suitableForFinishPrep("coarse")).toBe(false);
  });
});

describe("primaryTask", () => {
  it("ultra fine for polishing", () => {
    expect(primaryTask("ultra_fine")).toBe("polishing_buffing");
  });
});

describe("backingType", () => {
  it("coarse has cloth heavy backing", () => {
    expect(backingType("coarse")).toBe("cloth_heavy");
  });
});

describe("sandpaperGrits", () => {
  it("returns 5 grits", () => {
    expect(sandpaperGrits()).toHaveLength(5);
  });
});
