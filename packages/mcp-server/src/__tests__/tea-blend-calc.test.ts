import { describe, it, expect } from "vitest";
import {
  steepTempCelsius, steepTimeMinutes, caffeineLevel,
  antioxidantLevel, resteepCount, oxidationPercent,
  bestPairing, shelfLifeMonths, costPerGram, teaBases,
} from "../tea-blend-calc.js";

describe("steepTempCelsius", () => {
  it("black tea uses hottest water", () => {
    expect(steepTempCelsius("black")).toBeGreaterThan(
      steepTempCelsius("white")
    );
  });
});

describe("steepTimeMinutes", () => {
  it("herbal steeps longest", () => {
    expect(steepTimeMinutes("herbal")).toBeGreaterThan(
      steepTimeMinutes("green")
    );
  });
});

describe("caffeineLevel", () => {
  it("black has most caffeine", () => {
    expect(caffeineLevel("black")).toBeGreaterThan(
      caffeineLevel("herbal")
    );
  });
});

describe("antioxidantLevel", () => {
  it("green has most antioxidants", () => {
    expect(antioxidantLevel("green")).toBeGreaterThan(
      antioxidantLevel("herbal")
    );
  });
});

describe("resteepCount", () => {
  it("oolong resteeps most", () => {
    expect(resteepCount("oolong")).toBeGreaterThan(
      resteepCount("black")
    );
  });
});

describe("oxidationPercent", () => {
  it("black is most oxidized", () => {
    expect(oxidationPercent("black")).toBeGreaterThan(
      oxidationPercent("green")
    );
  });
});

describe("bestPairing", () => {
  it("green pairs best with sushi", () => {
    expect(bestPairing("green")).toBe("sushi");
  });
});

describe("shelfLifeMonths", () => {
  it("black lasts longest", () => {
    expect(shelfLifeMonths("black")).toBeGreaterThan(
      shelfLifeMonths("green")
    );
  });
});

describe("costPerGram", () => {
  it("white costs most", () => {
    expect(costPerGram("white")).toBeGreaterThan(
      costPerGram("black")
    );
  });
});

describe("teaBases", () => {
  it("returns 5 bases", () => {
    expect(teaBases()).toHaveLength(5);
  });
});
