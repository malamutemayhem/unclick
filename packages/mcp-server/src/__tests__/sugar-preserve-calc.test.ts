import { describe, it, expect } from "vitest";
import {
  sugarToFruitRatio, cookingMinutes, pectinRequired,
  textureThickness, fruitChunks, shelfLifeMonths,
  bestFruit, canningRequired, difficultyRating, preserveTypes,
} from "../sugar-preserve-calc.js";

describe("sugarToFruitRatio", () => {
  it("jelly has highest sugar ratio", () => {
    expect(sugarToFruitRatio("jelly")).toBeGreaterThan(
      sugarToFruitRatio("fruit_butter")
    );
  });
});

describe("cookingMinutes", () => {
  it("fruit butter takes longest", () => {
    expect(cookingMinutes("fruit_butter")).toBeGreaterThan(
      cookingMinutes("jam")
    );
  });
});

describe("pectinRequired", () => {
  it("jam requires pectin", () => {
    expect(pectinRequired("jam")).toBe(true);
  });
  it("conserve does not", () => {
    expect(pectinRequired("conserve")).toBe(false);
  });
});

describe("textureThickness", () => {
  it("jelly is thickest", () => {
    expect(textureThickness("jelly")).toBeGreaterThan(
      textureThickness("conserve")
    );
  });
});

describe("fruitChunks", () => {
  it("jam has fruit chunks", () => {
    expect(fruitChunks("jam")).toBe(true);
  });
  it("jelly does not", () => {
    expect(fruitChunks("jelly")).toBe(false);
  });
});

describe("shelfLifeMonths", () => {
  it("jelly lasts longest", () => {
    expect(shelfLifeMonths("jelly")).toBeGreaterThan(
      shelfLifeMonths("fruit_butter")
    );
  });
});

describe("bestFruit", () => {
  it("marmalade is best with orange", () => {
    expect(bestFruit("marmalade")).toBe("orange");
  });
});

describe("canningRequired", () => {
  it("all preserves require canning", () => {
    expect(canningRequired("jam")).toBe(true);
  });
});

describe("difficultyRating", () => {
  it("marmalade is hardest", () => {
    expect(difficultyRating("marmalade")).toBeGreaterThan(
      difficultyRating("conserve")
    );
  });
});

describe("preserveTypes", () => {
  it("returns 5 types", () => {
    expect(preserveTypes()).toHaveLength(5);
  });
});
