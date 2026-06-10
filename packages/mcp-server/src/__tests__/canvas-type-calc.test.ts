import { describe, it, expect } from "vitest";
import {
  textureGrade, tensileStrength, absorbency,
  weightGsm, dimensionalStability, primingRequired,
  bestMedium, archivalYears, costPerM2, canvasTypes,
} from "../canvas-type-calc.js";

describe("textureGrade", () => {
  it("jute has roughest texture", () => {
    expect(textureGrade("jute")).toBeGreaterThan(
      textureGrade("panel")
    );
  });
});

describe("tensileStrength", () => {
  it("panel is strongest", () => {
    expect(tensileStrength("panel")).toBeGreaterThan(
      tensileStrength("jute")
    );
  });
});

describe("absorbency", () => {
  it("cotton is most absorbent", () => {
    expect(absorbency("cotton")).toBeGreaterThan(
      absorbency("synthetic")
    );
  });
});

describe("weightGsm", () => {
  it("panel is heaviest", () => {
    expect(weightGsm("panel")).toBeGreaterThan(
      weightGsm("synthetic")
    );
  });
});

describe("dimensionalStability", () => {
  it("panel is most stable", () => {
    expect(dimensionalStability("panel")).toBeGreaterThan(
      dimensionalStability("jute")
    );
  });
});

describe("primingRequired", () => {
  it("linen needs priming", () => {
    expect(primingRequired("linen")).toBe(true);
  });
  it("synthetic does not", () => {
    expect(primingRequired("synthetic")).toBe(false);
  });
});

describe("bestMedium", () => {
  it("linen best for oil", () => {
    expect(bestMedium("linen")).toBe("oil");
  });
});

describe("archivalYears", () => {
  it("panel lasts longest", () => {
    expect(archivalYears("panel")).toBeGreaterThan(
      archivalYears("jute")
    );
  });
});

describe("costPerM2", () => {
  it("panel costs most", () => {
    expect(costPerM2("panel")).toBeGreaterThan(
      costPerM2("jute")
    );
  });
});

describe("canvasTypes", () => {
  it("returns 5 types", () => {
    expect(canvasTypes()).toHaveLength(5);
  });
});
