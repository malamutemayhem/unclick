import { describe, it, expect } from "vitest";
import {
  firingTempCelsius, durability, translucency,
  craftDifficulty, waterAbsorption, vitrified,
  needsGlaze, originRegion, collectorsValue, potteryTypes,
} from "../pottery-type-calc.js";

describe("firingTempCelsius", () => {
  it("porcelain fires hottest", () => {
    expect(firingTempCelsius("porcelain")).toBeGreaterThan(
      firingTempCelsius("raku")
    );
  });
});

describe("durability", () => {
  it("stoneware is most durable", () => {
    expect(durability("stoneware")).toBeGreaterThan(
      durability("raku")
    );
  });
});

describe("translucency", () => {
  it("bone china is most translucent", () => {
    expect(translucency("bone_china")).toBeGreaterThan(
      translucency("stoneware")
    );
  });
});

describe("craftDifficulty", () => {
  it("porcelain is hardest to craft", () => {
    expect(craftDifficulty("porcelain")).toBeGreaterThan(
      craftDifficulty("earthenware")
    );
  });
});

describe("waterAbsorption", () => {
  it("earthenware absorbs most", () => {
    expect(waterAbsorption("earthenware")).toBeGreaterThan(
      waterAbsorption("porcelain")
    );
  });
});

describe("vitrified", () => {
  it("porcelain is vitrified", () => {
    expect(vitrified("porcelain")).toBe(true);
  });
  it("earthenware is not", () => {
    expect(vitrified("earthenware")).toBe(false);
  });
});

describe("needsGlaze", () => {
  it("earthenware needs glaze", () => {
    expect(needsGlaze("earthenware")).toBe(true);
  });
  it("porcelain does not", () => {
    expect(needsGlaze("porcelain")).toBe(false);
  });
});

describe("originRegion", () => {
  it("raku from japan", () => {
    expect(originRegion("raku")).toBe("japan");
  });
});

describe("collectorsValue", () => {
  it("porcelain has highest value", () => {
    expect(collectorsValue("porcelain")).toBeGreaterThan(
      collectorsValue("earthenware")
    );
  });
});

describe("potteryTypes", () => {
  it("returns 5 types", () => {
    expect(potteryTypes()).toHaveLength(5);
  });
});
