import { describe, it, expect } from "vitest";
import {
  roastTempCelsius, caffeineContentMg, acidity,
  bodyFullness, bitterness, oilOnSurface,
  originFlavorRetained, bestBrewMethod, flavorNotes, coffeeRoasts,
} from "../coffee-roast-calc.js";

describe("roastTempCelsius", () => {
  it("espresso roasts hottest", () => {
    expect(roastTempCelsius("espresso")).toBeGreaterThan(
      roastTempCelsius("light")
    );
  });
});

describe("caffeineContentMg", () => {
  it("light has most caffeine", () => {
    expect(caffeineContentMg("light")).toBeGreaterThan(
      caffeineContentMg("dark")
    );
  });
});

describe("acidity", () => {
  it("light is most acidic", () => {
    expect(acidity("light")).toBeGreaterThan(
      acidity("dark")
    );
  });
});

describe("bodyFullness", () => {
  it("espresso has fullest body", () => {
    expect(bodyFullness("espresso")).toBeGreaterThan(
      bodyFullness("light")
    );
  });
});

describe("bitterness", () => {
  it("espresso is most bitter", () => {
    expect(bitterness("espresso")).toBeGreaterThan(
      bitterness("light")
    );
  });
});

describe("oilOnSurface", () => {
  it("dark has oil on surface", () => {
    expect(oilOnSurface("dark")).toBe(true);
  });
  it("light does not", () => {
    expect(oilOnSurface("light")).toBe(false);
  });
});

describe("originFlavorRetained", () => {
  it("light retains origin flavor", () => {
    expect(originFlavorRetained("light")).toBe(true);
  });
  it("dark does not", () => {
    expect(originFlavorRetained("dark")).toBe(false);
  });
});

describe("bestBrewMethod", () => {
  it("espresso for espresso machine", () => {
    expect(bestBrewMethod("espresso")).toBe("espresso_machine");
  });
});

describe("flavorNotes", () => {
  it("light has fruity floral notes", () => {
    expect(flavorNotes("light")).toBe("fruity_floral");
  });
});

describe("coffeeRoasts", () => {
  it("returns 5 types", () => {
    expect(coffeeRoasts()).toHaveLength(5);
  });
});
