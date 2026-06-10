import { describe, it, expect } from "vitest";
import {
  tanninLevel, acidityLevel, bodyWeight,
  agingPotentialYears, globalAcreage, isRed,
  coldClimateAdapted, classicRegion, flavorProfile, grapeVarieties,
} from "../grape-variety-calc.js";

describe("tanninLevel", () => {
  it("cabernet sauvignon most tannic", () => {
    expect(tanninLevel("cabernet_sauvignon")).toBeGreaterThan(
      tanninLevel("riesling")
    );
  });
});

describe("acidityLevel", () => {
  it("riesling highest acidity", () => {
    expect(acidityLevel("riesling")).toBeGreaterThan(
      acidityLevel("syrah")
    );
  });
});

describe("bodyWeight", () => {
  it("cabernet sauvignon fullest body", () => {
    expect(bodyWeight("cabernet_sauvignon")).toBeGreaterThan(
      bodyWeight("riesling")
    );
  });
});

describe("agingPotentialYears", () => {
  it("riesling longest aging potential", () => {
    expect(agingPotentialYears("riesling")).toBeGreaterThan(
      agingPotentialYears("chardonnay")
    );
  });
});

describe("globalAcreage", () => {
  it("cabernet sauvignon most planted", () => {
    expect(globalAcreage("cabernet_sauvignon")).toBeGreaterThan(
      globalAcreage("riesling")
    );
  });
});

describe("isRed", () => {
  it("syrah is red", () => {
    expect(isRed("syrah")).toBe(true);
  });
  it("chardonnay is not", () => {
    expect(isRed("chardonnay")).toBe(false);
  });
});

describe("coldClimateAdapted", () => {
  it("riesling is cold climate adapted", () => {
    expect(coldClimateAdapted("riesling")).toBe(true);
  });
  it("cabernet sauvignon is not", () => {
    expect(coldClimateAdapted("cabernet_sauvignon")).toBe(false);
  });
});

describe("classicRegion", () => {
  it("pinot noir from burgundy oregon", () => {
    expect(classicRegion("pinot_noir")).toBe("burgundy_oregon");
  });
});

describe("flavorProfile", () => {
  it("syrah is blackberry pepper", () => {
    expect(flavorProfile("syrah")).toBe("blackberry_pepper");
  });
});

describe("grapeVarieties", () => {
  it("returns 5 varieties", () => {
    expect(grapeVarieties()).toHaveLength(5);
  });
});
