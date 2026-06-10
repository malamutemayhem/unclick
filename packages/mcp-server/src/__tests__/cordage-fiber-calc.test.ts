import { describe, it, expect } from "vitest";
import {
  breakingStrengthKg, stretchPercent, uvResistance,
  waterResistance, abrasionResistance, gripRating,
  biodegradable, spliceability, costPerMeter, cordageFibers,
} from "../cordage-fiber-calc.js";

describe("breakingStrengthKg", () => {
  it("manila is strongest", () => {
    expect(breakingStrengthKg("manila")).toBeGreaterThan(
      breakingStrengthKg("jute")
    );
  });
});

describe("stretchPercent", () => {
  it("manila stretches most", () => {
    expect(stretchPercent("manila")).toBeGreaterThan(
      stretchPercent("jute")
    );
  });
});

describe("uvResistance", () => {
  it("hemp resists UV best", () => {
    expect(uvResistance("hemp")).toBeGreaterThan(
      uvResistance("jute")
    );
  });
});

describe("waterResistance", () => {
  it("manila resists water best", () => {
    expect(waterResistance("manila")).toBeGreaterThan(
      waterResistance("jute")
    );
  });
});

describe("abrasionResistance", () => {
  it("manila resists abrasion best", () => {
    expect(abrasionResistance("manila")).toBeGreaterThan(
      abrasionResistance("jute")
    );
  });
});

describe("gripRating", () => {
  it("sisal has best grip", () => {
    expect(gripRating("sisal")).toBeGreaterThan(
      gripRating("jute")
    );
  });
});

describe("biodegradable", () => {
  it("all fibers are biodegradable", () => {
    expect(biodegradable("manila")).toBe(true);
    expect(biodegradable("cotton")).toBe(true);
  });
});

describe("spliceability", () => {
  it("cotton splices easiest", () => {
    expect(spliceability("cotton")).toBeGreaterThan(
      spliceability("jute")
    );
  });
});

describe("costPerMeter", () => {
  it("hemp is most expensive", () => {
    expect(costPerMeter("hemp")).toBeGreaterThan(
      costPerMeter("jute")
    );
  });
});

describe("cordageFibers", () => {
  it("returns 5 fibers", () => {
    expect(cordageFibers()).toHaveLength(5);
  });
});
