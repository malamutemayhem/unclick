import { describe, it, expect } from "vitest";
import {
  firingTempC, surfaceSmoothness, colorVariation,
  durability, historicalSignificance, foodSafe,
  requiresReduction, originRegion, characteristicLook, glazeTypes,
} from "../glaze-type-calc.js";

describe("firingTempC", () => {
  it("ash highest firing temp", () => {
    expect(firingTempC("ash")).toBeGreaterThan(
      firingTempC("raku")
    );
  });
});

describe("surfaceSmoothness", () => {
  it("celadon smoothest surface", () => {
    expect(surfaceSmoothness("celadon")).toBeGreaterThan(
      surfaceSmoothness("salt")
    );
  });
});

describe("colorVariation", () => {
  it("raku most color variation", () => {
    expect(colorVariation("raku")).toBeGreaterThan(
      colorVariation("celadon")
    );
  });
});

describe("durability", () => {
  it("celadon most durable", () => {
    expect(durability("celadon")).toBeGreaterThan(
      durability("raku")
    );
  });
});

describe("historicalSignificance", () => {
  it("celadon most historically significant", () => {
    expect(historicalSignificance("celadon")).toBeGreaterThan(
      historicalSignificance("salt")
    );
  });
});

describe("foodSafe", () => {
  it("celadon is food safe", () => {
    expect(foodSafe("celadon")).toBe(true);
  });
  it("raku is not", () => {
    expect(foodSafe("raku")).toBe(false);
  });
});

describe("requiresReduction", () => {
  it("celadon requires reduction", () => {
    expect(requiresReduction("celadon")).toBe(true);
  });
  it("ash does not", () => {
    expect(requiresReduction("ash")).toBe(false);
  });
});

describe("originRegion", () => {
  it("raku from japan", () => {
    expect(originRegion("raku")).toBe("japan");
  });
});

describe("characteristicLook", () => {
  it("celadon is jade green translucent", () => {
    expect(characteristicLook("celadon")).toBe("jade_green_translucent");
  });
});

describe("glazeTypes", () => {
  it("returns 5 types", () => {
    expect(glazeTypes()).toHaveLength(5);
  });
});
