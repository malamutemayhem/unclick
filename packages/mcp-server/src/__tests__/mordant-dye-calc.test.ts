import { describe, it, expect } from "vitest";
import {
  colorfastnessRating, toxicity, colorShift,
  concentrationPercent, soakTimeHours, fiberDamage,
  ecoFriendly, bestFiber, costPerKg, mordantTypes,
} from "../mordant-dye-calc.js";

describe("colorfastnessRating", () => {
  it("chrome has best colorfastness", () => {
    expect(colorfastnessRating("chrome")).toBeGreaterThan(
      colorfastnessRating("tin")
    );
  });
});

describe("toxicity", () => {
  it("chrome is most toxic", () => {
    expect(toxicity("chrome")).toBeGreaterThan(
      toxicity("alum")
    );
  });
});

describe("colorShift", () => {
  it("iron darkens", () => {
    expect(colorShift("iron")).toBe("darkens");
  });
});

describe("concentrationPercent", () => {
  it("alum needs highest concentration", () => {
    expect(concentrationPercent("alum")).toBeGreaterThan(
      concentrationPercent("iron")
    );
  });
});

describe("soakTimeHours", () => {
  it("copper soaks longest", () => {
    expect(soakTimeHours("copper")).toBeGreaterThan(
      soakTimeHours("iron")
    );
  });
});

describe("fiberDamage", () => {
  it("tin causes most fiber damage", () => {
    expect(fiberDamage("tin")).toBeGreaterThan(
      fiberDamage("alum")
    );
  });
});

describe("ecoFriendly", () => {
  it("alum is eco friendly", () => {
    expect(ecoFriendly("alum")).toBe(true);
  });
  it("chrome is not", () => {
    expect(ecoFriendly("chrome")).toBe(false);
  });
});

describe("bestFiber", () => {
  it("alum best for wool", () => {
    expect(bestFiber("alum")).toBe("wool");
  });
});

describe("costPerKg", () => {
  it("chrome costs most", () => {
    expect(costPerKg("chrome")).toBeGreaterThan(
      costPerKg("iron")
    );
  });
});

describe("mordantTypes", () => {
  it("returns 5 types", () => {
    expect(mordantTypes()).toHaveLength(5);
  });
});
