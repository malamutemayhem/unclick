import { describe, it, expect } from "vitest";
import {
  surfaceRoughnessMm, passesRequired, timePerM2Hours, toolType,
  waterRequired, dustLevel, noiseLevel, slipResistance,
  costPerM2, dressingFinishes,
} from "../stone-dressing-calc.js";

describe("surfaceRoughnessMm", () => {
  it("rough picked is roughest", () => {
    expect(surfaceRoughnessMm("rough_picked")).toBeGreaterThan(
      surfaceRoughnessMm("polished")
    );
  });
});

describe("passesRequired", () => {
  it("polished needs most passes", () => {
    expect(passesRequired("polished")).toBeGreaterThan(
      passesRequired("rough_picked")
    );
  });
});

describe("timePerM2Hours", () => {
  it("polished takes longest", () => {
    expect(timePerM2Hours("polished")).toBeGreaterThan(
      timePerM2Hours("rough_picked")
    );
  });
});

describe("toolType", () => {
  it("polished uses diamond pad", () => {
    expect(toolType("polished")).toBe("diamond_pad");
  });
});

describe("waterRequired", () => {
  it("polished needs water", () => {
    expect(waterRequired("polished")).toBe(true);
  });
  it("rough picked does not need water", () => {
    expect(waterRequired("rough_picked")).toBe(false);
  });
});

describe("dustLevel", () => {
  it("rough picked is dustiest", () => {
    expect(dustLevel("rough_picked")).toBeGreaterThan(
      dustLevel("polished")
    );
  });
});

describe("noiseLevel", () => {
  it("bush hammered is noisiest", () => {
    expect(noiseLevel("bush_hammered")).toBeGreaterThan(
      noiseLevel("rubbed")
    );
  });
});

describe("slipResistance", () => {
  it("rough picked has best slip resistance", () => {
    expect(slipResistance("rough_picked")).toBeGreaterThan(
      slipResistance("polished")
    );
  });
});

describe("costPerM2", () => {
  it("polished is most expensive", () => {
    expect(costPerM2("polished")).toBeGreaterThan(
      costPerM2("rough_picked")
    );
  });
});

describe("dressingFinishes", () => {
  it("returns 5 finishes", () => {
    expect(dressingFinishes()).toHaveLength(5);
  });
});
