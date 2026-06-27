import { describe, it, expect } from "vitest";
import {
  richness, preparationTime, versatility,
  difficultyLevel, caloriesPerServing, butterBased,
  usesRoux, baseLiquid, classicPairing, sauceTypes,
} from "../sauce-type-calc.js";

describe("richness", () => {
  it("hollandaise is richest", () => {
    expect(richness("hollandaise")).toBeGreaterThan(
      richness("tomato")
    );
  });
});

describe("preparationTime", () => {
  it("espagnole takes longest", () => {
    expect(preparationTime("espagnole")).toBeGreaterThan(
      preparationTime("bechamel")
    );
  });
});

describe("versatility", () => {
  it("tomato most versatile", () => {
    expect(versatility("tomato")).toBeGreaterThan(
      versatility("hollandaise")
    );
  });
});

describe("difficultyLevel", () => {
  it("hollandaise most difficult", () => {
    expect(difficultyLevel("hollandaise")).toBeGreaterThan(
      difficultyLevel("tomato")
    );
  });
});

describe("caloriesPerServing", () => {
  it("hollandaise most calories", () => {
    expect(caloriesPerServing("hollandaise")).toBeGreaterThan(
      caloriesPerServing("tomato")
    );
  });
});

describe("butterBased", () => {
  it("hollandaise is butter based", () => {
    expect(butterBased("hollandaise")).toBe(true);
  });
  it("tomato is not", () => {
    expect(butterBased("tomato")).toBe(false);
  });
});

describe("usesRoux", () => {
  it("bechamel uses roux", () => {
    expect(usesRoux("bechamel")).toBe(true);
  });
  it("hollandaise does not", () => {
    expect(usesRoux("hollandaise")).toBe(false);
  });
});

describe("baseLiquid", () => {
  it("bechamel base is milk", () => {
    expect(baseLiquid("bechamel")).toBe("milk");
  });
});

describe("classicPairing", () => {
  it("hollandaise with eggs benedict", () => {
    expect(classicPairing("hollandaise")).toBe("eggs_benedict");
  });
});

describe("sauceTypes", () => {
  it("returns 5 types", () => {
    expect(sauceTypes()).toHaveLength(5);
  });
});
