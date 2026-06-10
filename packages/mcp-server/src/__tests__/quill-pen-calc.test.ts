import { describe, it, expect } from "vitest";
import {
  barrelLengthCm, nibWidthMm, temperingTempCelsius, temperingTimeMinutes,
  cutsPerSharpening, inkCapacityMl, wordsPerDip, flexibilityRating,
  costPerQuill, quillFeathers,
} from "../quill-pen-calc.js";

describe("barrelLengthCm", () => {
  it("ostrich is longest", () => {
    expect(barrelLengthCm("ostrich")).toBeGreaterThan(barrelLengthCm("crow"));
  });
});

describe("nibWidthMm", () => {
  it("crow is finest nib", () => {
    expect(nibWidthMm("crow")).toBeLessThan(nibWidthMm("goose"));
  });
});

describe("temperingTempCelsius", () => {
  it("returns 60", () => {
    expect(temperingTempCelsius()).toBe(60);
  });
});

describe("temperingTimeMinutes", () => {
  it("returns 15", () => {
    expect(temperingTimeMinutes()).toBe(15);
  });
});

describe("cutsPerSharpening", () => {
  it("crow needs most cuts", () => {
    expect(cutsPerSharpening("crow")).toBeGreaterThanOrEqual(
      cutsPerSharpening("swan")
    );
  });
});

describe("inkCapacityMl", () => {
  it("ostrich holds most ink", () => {
    expect(inkCapacityMl("ostrich")).toBeGreaterThan(inkCapacityMl("crow"));
  });
});

describe("wordsPerDip", () => {
  it("ostrich writes most per dip", () => {
    expect(wordsPerDip("ostrich")).toBeGreaterThan(wordsPerDip("crow"));
  });
});

describe("flexibilityRating", () => {
  it("crow is most flexible", () => {
    expect(flexibilityRating("crow")).toBeGreaterThan(
      flexibilityRating("ostrich")
    );
  });
});

describe("costPerQuill", () => {
  it("ostrich is most expensive", () => {
    expect(costPerQuill("ostrich")).toBeGreaterThan(costPerQuill("turkey"));
  });
});

describe("quillFeathers", () => {
  it("returns 5 feathers", () => {
    expect(quillFeathers()).toHaveLength(5);
  });
});
