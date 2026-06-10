import { describe, it, expect } from "vitest";
import {
  strengthRating, aestheticRating, longevityYears, costFactor,
  toothPreservation, metalFree, sameDay, idealPlacement,
  fabricationMethod, dentalCrowns,
} from "../dental-crown-calc.js";

describe("strengthRating", () => {
  it("metal strongest", () => {
    expect(strengthRating("metal")).toBeGreaterThan(strengthRating("resin"));
  });
});

describe("aestheticRating", () => {
  it("porcelain most aesthetic", () => {
    expect(aestheticRating("porcelain")).toBeGreaterThan(aestheticRating("metal"));
  });
});

describe("longevityYears", () => {
  it("metal lasts longest", () => {
    expect(longevityYears("metal")).toBeGreaterThan(longevityYears("resin"));
  });
});

describe("costFactor", () => {
  it("zirconia most expensive", () => {
    expect(costFactor("zirconia")).toBeGreaterThan(costFactor("resin"));
  });
});

describe("toothPreservation", () => {
  it("resin preserves most tooth", () => {
    expect(toothPreservation("resin")).toBeGreaterThan(toothPreservation("porcelain_fused"));
  });
});

describe("metalFree", () => {
  it("porcelain is metal free", () => {
    expect(metalFree("porcelain")).toBe(true);
  });
  it("metal is not metal free", () => {
    expect(metalFree("metal")).toBe(false);
  });
});

describe("sameDay", () => {
  it("zirconia can be same day", () => {
    expect(sameDay("zirconia")).toBe(true);
  });
  it("metal cannot be same day", () => {
    expect(sameDay("metal")).toBe(false);
  });
});

describe("idealPlacement", () => {
  it("porcelain for front teeth", () => {
    expect(idealPlacement("porcelain")).toBe("front_teeth");
  });
});

describe("fabricationMethod", () => {
  it("zirconia uses cad cam", () => {
    expect(fabricationMethod("zirconia")).toBe("cad_cam_milled");
  });
});

describe("dentalCrowns", () => {
  it("returns 5 types", () => {
    expect(dentalCrowns()).toHaveLength(5);
  });
});
