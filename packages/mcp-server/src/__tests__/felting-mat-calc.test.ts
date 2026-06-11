import { describe, it, expect } from "vitest";
import {
  needleProtect, surfaceGrip, durability, portability,
  matCost, natural, multiSurface, padMaterial,
  bestUse, feltingMats,
} from "../felting-mat-calc.js";

describe("needleProtect", () => {
  it("brush mat dense best needle protect", () => {
    expect(needleProtect("brush_mat_dense")).toBeGreaterThan(needleProtect("foam_pad_standard"));
  });
});

describe("surfaceGrip", () => {
  it("wool pad natural best surface grip", () => {
    expect(surfaceGrip("wool_pad_natural")).toBeGreaterThan(surfaceGrip("foam_pad_standard"));
  });
});

describe("durability", () => {
  it("rice pad firm most durable", () => {
    expect(durability("rice_pad_firm")).toBeGreaterThan(durability("foam_pad_standard"));
  });
});

describe("portability", () => {
  it("multi surface flip most portable", () => {
    expect(portability("multi_surface_flip")).toBeGreaterThan(portability("rice_pad_firm"));
  });
});

describe("matCost", () => {
  it("multi surface flip most expensive", () => {
    expect(matCost("multi_surface_flip")).toBeGreaterThan(matCost("foam_pad_standard"));
  });
});

describe("natural", () => {
  it("wool pad natural is natural", () => {
    expect(natural("wool_pad_natural")).toBe(true);
  });
  it("foam pad standard not natural", () => {
    expect(natural("foam_pad_standard")).toBe(false);
  });
});

describe("multiSurface", () => {
  it("multi surface flip is multi surface", () => {
    expect(multiSurface("multi_surface_flip")).toBe(true);
  });
  it("foam pad standard not multi surface", () => {
    expect(multiSurface("foam_pad_standard")).toBe(false);
  });
});

describe("padMaterial", () => {
  it("brush mat dense uses nylon bristle mat", () => {
    expect(padMaterial("brush_mat_dense")).toBe("nylon_bristle_mat");
  });
});

describe("bestUse", () => {
  it("foam pad standard best for general needle base", () => {
    expect(bestUse("foam_pad_standard")).toBe("general_needle_base");
  });
});

describe("feltingMats", () => {
  it("returns 5 types", () => {
    expect(feltingMats()).toHaveLength(5);
  });
});
