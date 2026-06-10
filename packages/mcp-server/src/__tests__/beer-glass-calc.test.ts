import { describe, it, expect } from "vitest";
import {
  aromaCapture, headRetention, capacity, durability,
  glassCost, stackable, nucleated, glassShape,
  bestBeer, beerGlasses,
} from "../beer-glass-calc.js";

describe("aromaCapture", () => {
  it("tulip goblet best aroma capture", () => {
    expect(aromaCapture("tulip_goblet")).toBeGreaterThan(aromaCapture("pint_shaker"));
  });
});

describe("headRetention", () => {
  it("weizen tall best head retention", () => {
    expect(headRetention("weizen_tall")).toBeGreaterThan(headRetention("pint_shaker"));
  });
});

describe("capacity", () => {
  it("weizen tall largest capacity", () => {
    expect(capacity("weizen_tall")).toBeGreaterThan(capacity("snifter_brandy"));
  });
});

describe("durability", () => {
  it("pint shaker most durable", () => {
    expect(durability("pint_shaker")).toBeGreaterThan(durability("pilsner_flute"));
  });
});

describe("glassCost", () => {
  it("snifter brandy most expensive", () => {
    expect(glassCost("snifter_brandy")).toBeGreaterThan(glassCost("pint_shaker"));
  });
});

describe("stackable", () => {
  it("pint shaker is stackable", () => {
    expect(stackable("pint_shaker")).toBe(true);
  });
  it("tulip goblet is not", () => {
    expect(stackable("tulip_goblet")).toBe(false);
  });
});

describe("nucleated", () => {
  it("tulip goblet is nucleated", () => {
    expect(nucleated("tulip_goblet")).toBe(true);
  });
  it("pint shaker is not", () => {
    expect(nucleated("pint_shaker")).toBe(false);
  });
});

describe("glassShape", () => {
  it("tulip goblet uses bulb flare stem foot", () => {
    expect(glassShape("tulip_goblet")).toBe("bulb_flare_stem_foot");
  });
});

describe("bestBeer", () => {
  it("weizen tall best for hefeweizen wheat beer", () => {
    expect(bestBeer("weizen_tall")).toBe("hefeweizen_wheat_beer");
  });
});

describe("beerGlasses", () => {
  it("returns 5 types", () => {
    expect(beerGlasses()).toHaveLength(5);
  });
});
