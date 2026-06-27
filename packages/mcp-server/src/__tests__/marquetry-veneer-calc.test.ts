import { describe, it, expect } from "vitest";
import {
  thicknessMm, cuttingDifficulty, colorIntensity,
  grainPattern, gluingEase, lightColored,
  bestDesignRole, availabilityRating, costPerSheet, veneerTypes,
} from "../marquetry-veneer-calc.js";

describe("thicknessMm", () => {
  it("maple burl is thickest", () => {
    expect(thicknessMm("maple_burl")).toBeGreaterThan(
      thicknessMm("holly")
    );
  });
});

describe("cuttingDifficulty", () => {
  it("maple burl is hardest to cut", () => {
    expect(cuttingDifficulty("maple_burl")).toBeGreaterThan(
      cuttingDifficulty("holly")
    );
  });
});

describe("colorIntensity", () => {
  it("ebony has most intense color", () => {
    expect(colorIntensity("ebony")).toBeGreaterThan(
      colorIntensity("holly")
    );
  });
});

describe("grainPattern", () => {
  it("maple burl has most grain pattern", () => {
    expect(grainPattern("maple_burl")).toBeGreaterThan(
      grainPattern("holly")
    );
  });
});

describe("gluingEase", () => {
  it("holly is easiest to glue", () => {
    expect(gluingEase("holly")).toBeGreaterThan(
      gluingEase("rosewood")
    );
  });
});

describe("lightColored", () => {
  it("holly is light colored", () => {
    expect(lightColored("holly")).toBe(true);
  });
  it("ebony is not light colored", () => {
    expect(lightColored("ebony")).toBe(false);
  });
});

describe("bestDesignRole", () => {
  it("holly best for highlights", () => {
    expect(bestDesignRole("holly")).toBe("highlights");
  });
});

describe("availabilityRating", () => {
  it("holly is most available", () => {
    expect(availabilityRating("holly")).toBeGreaterThan(
      availabilityRating("ebony")
    );
  });
});

describe("costPerSheet", () => {
  it("maple burl costs most", () => {
    expect(costPerSheet("maple_burl")).toBeGreaterThan(
      costPerSheet("holly")
    );
  });
});

describe("veneerTypes", () => {
  it("returns 5 types", () => {
    expect(veneerTypes()).toHaveLength(5);
  });
});
