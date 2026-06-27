import { describe, it, expect } from "vitest";
import {
  wingspanCm, colorIntensity, iridescence,
  migrationDistanceKm, lifespanWeeks, transparentWings,
  migratory, habitat, conservationConcern, butterflyWings,
} from "../butterfly-wing-calc.js";

describe("wingspanCm", () => {
  it("morpho has largest wingspan", () => {
    expect(wingspanCm("morpho")).toBeGreaterThan(
      wingspanCm("glasswing")
    );
  });
});

describe("colorIntensity", () => {
  it("morpho has most intense color", () => {
    expect(colorIntensity("morpho")).toBeGreaterThan(
      colorIntensity("glasswing")
    );
  });
});

describe("iridescence", () => {
  it("morpho is most iridescent", () => {
    expect(iridescence("morpho")).toBeGreaterThan(
      iridescence("painted_lady")
    );
  });
});

describe("migrationDistanceKm", () => {
  it("painted lady migrates farthest", () => {
    expect(migrationDistanceKm("painted_lady")).toBeGreaterThan(
      migrationDistanceKm("monarch")
    );
  });
});

describe("lifespanWeeks", () => {
  it("morpho lives longest", () => {
    expect(lifespanWeeks("morpho")).toBeGreaterThan(
      lifespanWeeks("swallowtail")
    );
  });
});

describe("transparentWings", () => {
  it("glasswing has transparent wings", () => {
    expect(transparentWings("glasswing")).toBe(true);
  });
  it("monarch does not", () => {
    expect(transparentWings("monarch")).toBe(false);
  });
});

describe("migratory", () => {
  it("monarch is migratory", () => {
    expect(migratory("monarch")).toBe(true);
  });
  it("morpho is not", () => {
    expect(migratory("morpho")).toBe(false);
  });
});

describe("habitat", () => {
  it("morpho lives in tropical rainforest", () => {
    expect(habitat("morpho")).toBe("tropical_rainforest");
  });
});

describe("conservationConcern", () => {
  it("monarch has highest conservation concern", () => {
    expect(conservationConcern("monarch")).toBeGreaterThan(
      conservationConcern("painted_lady")
    );
  });
});

describe("butterflyWings", () => {
  it("returns 5 types", () => {
    expect(butterflyWings()).toHaveLength(5);
  });
});
