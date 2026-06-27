import { describe, it, expect } from "vitest";
import {
  honeyPerLiter, fermentationWeeks, agingMonths,
  abvPercent, additiveRequired, clarityRating,
  sweetnessLevel, keyIngredient, costPerLiter, meadStyles,
} from "../mead-making-calc.js";

describe("honeyPerLiter", () => {
  it("traditional uses most honey", () => {
    expect(honeyPerLiter("traditional")).toBeGreaterThan(
      honeyPerLiter("braggot")
    );
  });
});

describe("fermentationWeeks", () => {
  it("traditional ferments longest", () => {
    expect(fermentationWeeks("traditional")).toBeGreaterThan(
      fermentationWeeks("braggot")
    );
  });
});

describe("agingMonths", () => {
  it("traditional ages longest", () => {
    expect(agingMonths("traditional")).toBeGreaterThan(
      agingMonths("braggot")
    );
  });
});

describe("abvPercent", () => {
  it("traditional has highest abv", () => {
    expect(abvPercent("traditional")).toBeGreaterThan(
      abvPercent("braggot")
    );
  });
});

describe("additiveRequired", () => {
  it("traditional needs no additives", () => {
    expect(additiveRequired("traditional")).toBe(false);
  });
  it("melomel requires additives", () => {
    expect(additiveRequired("melomel")).toBe(true);
  });
});

describe("clarityRating", () => {
  it("traditional is clearest", () => {
    expect(clarityRating("traditional")).toBeGreaterThan(
      clarityRating("braggot")
    );
  });
});

describe("sweetnessLevel", () => {
  it("cyser is sweetest", () => {
    expect(sweetnessLevel("cyser")).toBeGreaterThan(
      sweetnessLevel("braggot")
    );
  });
});

describe("keyIngredient", () => {
  it("cyser uses apple juice", () => {
    expect(keyIngredient("cyser")).toBe("apple_juice");
  });
});

describe("costPerLiter", () => {
  it("metheglin costs most", () => {
    expect(costPerLiter("metheglin")).toBeGreaterThan(
      costPerLiter("braggot")
    );
  });
});

describe("meadStyles", () => {
  it("returns 5 styles", () => {
    expect(meadStyles()).toHaveLength(5);
  });
});
