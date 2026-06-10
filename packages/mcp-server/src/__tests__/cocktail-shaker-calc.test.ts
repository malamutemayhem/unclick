import { describe, it, expect } from "vitest";
import {
  shakePower, sealReliability, pourControl, speedService,
  shakerCost, builtInStrainer, dishwasherSafe, bodyMaterial,
  bestBartender, cocktailShakers,
} from "../cocktail-shaker-calc.js";

describe("shakePower", () => {
  it("tin on tin most shake power", () => {
    expect(shakePower("tin_on_tin")).toBeGreaterThan(shakePower("cobbler_three_piece"));
  });
});

describe("sealReliability", () => {
  it("electric auto most reliable seal", () => {
    expect(sealReliability("electric_auto")).toBeGreaterThan(sealReliability("french_parisian"));
  });
});

describe("pourControl", () => {
  it("cobbler three piece best pour control", () => {
    expect(pourControl("cobbler_three_piece")).toBeGreaterThan(pourControl("tin_on_tin"));
  });
});

describe("speedService", () => {
  it("tin on tin fastest service", () => {
    expect(speedService("tin_on_tin")).toBeGreaterThan(speedService("cobbler_three_piece"));
  });
});

describe("shakerCost", () => {
  it("electric auto most expensive", () => {
    expect(shakerCost("electric_auto")).toBeGreaterThan(shakerCost("boston_two_piece"));
  });
});

describe("builtInStrainer", () => {
  it("cobbler three piece has built in strainer", () => {
    expect(builtInStrainer("cobbler_three_piece")).toBe(true);
  });
  it("boston two piece does not", () => {
    expect(builtInStrainer("boston_two_piece")).toBe(false);
  });
});

describe("dishwasherSafe", () => {
  it("boston two piece is dishwasher safe", () => {
    expect(dishwasherSafe("boston_two_piece")).toBe(true);
  });
  it("electric auto is not", () => {
    expect(dishwasherSafe("electric_auto")).toBe(false);
  });
});

describe("bodyMaterial", () => {
  it("french parisian uses brushed steel elegant", () => {
    expect(bodyMaterial("french_parisian")).toBe("brushed_steel_elegant");
  });
});

describe("bestBartender", () => {
  it("cobbler three piece for home bar beginner", () => {
    expect(bestBartender("cobbler_three_piece")).toBe("home_bar_beginner");
  });
});

describe("cocktailShakers", () => {
  it("returns 5 types", () => {
    expect(cocktailShakers()).toHaveLength(5);
  });
});
