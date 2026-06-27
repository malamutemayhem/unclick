import { describe, it, expect } from "vitest";
import {
  weightGsm, opacity, inkAbsorption,
  smoothness, durability, translucent,
  coated, bestApplication, costPerSheet, paperTypes,
} from "../paper-type-calc.js";

describe("weightGsm", () => {
  it("cardstock is heaviest", () => {
    expect(weightGsm("cardstock")).toBeGreaterThan(
      weightGsm("newsprint")
    );
  });
});

describe("opacity", () => {
  it("cardstock is most opaque", () => {
    expect(opacity("cardstock")).toBeGreaterThan(
      opacity("vellum")
    );
  });
});

describe("inkAbsorption", () => {
  it("newsprint absorbs most ink", () => {
    expect(inkAbsorption("newsprint")).toBeGreaterThan(
      inkAbsorption("glossy")
    );
  });
});

describe("smoothness", () => {
  it("glossy is smoothest", () => {
    expect(smoothness("glossy")).toBeGreaterThan(
      smoothness("newsprint")
    );
  });
});

describe("durability", () => {
  it("cardstock is most durable", () => {
    expect(durability("cardstock")).toBeGreaterThan(
      durability("newsprint")
    );
  });
});

describe("translucent", () => {
  it("vellum is translucent", () => {
    expect(translucent("vellum")).toBe(true);
  });
  it("bond is not", () => {
    expect(translucent("bond")).toBe(false);
  });
});

describe("coated", () => {
  it("glossy is coated", () => {
    expect(coated("glossy")).toBe(true);
  });
  it("newsprint is not", () => {
    expect(coated("newsprint")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("glossy for photography", () => {
    expect(bestApplication("glossy")).toBe("photography");
  });
});

describe("costPerSheet", () => {
  it("vellum costs most", () => {
    expect(costPerSheet("vellum")).toBeGreaterThan(
      costPerSheet("newsprint")
    );
  });
});

describe("paperTypes", () => {
  it("returns 5 types", () => {
    expect(paperTypes()).toHaveLength(5);
  });
});
