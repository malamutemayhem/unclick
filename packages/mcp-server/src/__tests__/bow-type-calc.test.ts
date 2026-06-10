import { describe, it, expect } from "vitest";
import {
  drawWeight, accuracy, portability, letoff, historicalAge,
  usesCams, olympicSport, bestUse, materialTypical, bowTypes,
} from "../bow-type-calc.js";

describe("drawWeight", () => {
  it("crossbow highest draw weight", () => {
    expect(drawWeight("crossbow")).toBeGreaterThan(drawWeight("flatbow"));
  });
});

describe("accuracy", () => {
  it("compound most accurate", () => {
    expect(accuracy("compound")).toBeGreaterThan(accuracy("longbow"));
  });
});

describe("portability", () => {
  it("recurve most portable", () => {
    expect(portability("recurve")).toBeGreaterThan(portability("compound"));
  });
});

describe("letoff", () => {
  it("compound has high letoff", () => {
    expect(letoff("compound")).toBeGreaterThan(letoff("recurve"));
  });
  it("recurve has zero letoff", () => {
    expect(letoff("recurve")).toBe(0);
  });
});

describe("historicalAge", () => {
  it("longbow oldest", () => {
    expect(historicalAge("longbow")).toBeGreaterThan(historicalAge("compound"));
  });
});

describe("usesCams", () => {
  it("compound uses cams", () => {
    expect(usesCams("compound")).toBe(true);
  });
  it("recurve does not", () => {
    expect(usesCams("recurve")).toBe(false);
  });
});

describe("olympicSport", () => {
  it("recurve is olympic", () => {
    expect(olympicSport("recurve")).toBe(true);
  });
  it("compound is not", () => {
    expect(olympicSport("compound")).toBe(false);
  });
});

describe("bestUse", () => {
  it("longbow for traditional", () => {
    expect(bestUse("longbow")).toBe("traditional_historical");
  });
});

describe("materialTypical", () => {
  it("compound uses aluminum carbon", () => {
    expect(materialTypical("compound")).toBe("aluminum_carbon");
  });
});

describe("bowTypes", () => {
  it("returns 5 types", () => {
    expect(bowTypes()).toHaveLength(5);
  });
});
