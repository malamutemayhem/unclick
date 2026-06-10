import { describe, it, expect } from "vitest";
import {
  agingMonths, fatContentPercent, flavorIntensity,
  meltability, caloriesPer100g, softTexture,
  moldRipened, originCountry, pairsWith, cheeseTypes,
} from "../cheese-type-calc.js";

describe("agingMonths", () => {
  it("parmesan ages longest", () => {
    expect(agingMonths("parmesan")).toBeGreaterThan(
      agingMonths("brie")
    );
  });
});

describe("fatContentPercent", () => {
  it("cheddar has highest fat", () => {
    expect(fatContentPercent("cheddar")).toBeGreaterThan(
      fatContentPercent("parmesan")
    );
  });
});

describe("flavorIntensity", () => {
  it("blue is most intense", () => {
    expect(flavorIntensity("blue")).toBeGreaterThan(
      flavorIntensity("brie")
    );
  });
});

describe("meltability", () => {
  it("cheddar melts best", () => {
    expect(meltability("cheddar")).toBeGreaterThan(
      meltability("parmesan")
    );
  });
});

describe("caloriesPer100g", () => {
  it("parmesan has most calories", () => {
    expect(caloriesPer100g("parmesan")).toBeGreaterThan(
      caloriesPer100g("brie")
    );
  });
});

describe("softTexture", () => {
  it("brie is soft", () => {
    expect(softTexture("brie")).toBe(true);
  });
  it("cheddar is not", () => {
    expect(softTexture("cheddar")).toBe(false);
  });
});

describe("moldRipened", () => {
  it("blue is mold ripened", () => {
    expect(moldRipened("blue")).toBe(true);
  });
  it("gouda is not", () => {
    expect(moldRipened("gouda")).toBe(false);
  });
});

describe("originCountry", () => {
  it("parmesan from italy", () => {
    expect(originCountry("parmesan")).toBe("italy");
  });
});

describe("pairsWith", () => {
  it("blue pairs with port", () => {
    expect(pairsWith("blue")).toBe("port");
  });
});

describe("cheeseTypes", () => {
  it("returns 5 types", () => {
    expect(cheeseTypes()).toHaveLength(5);
  });
});
