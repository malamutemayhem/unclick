import { describe, it, expect } from "vitest";
import {
  fiberLengthMm, cookingTimeHours, beatingMinutes, sheetThicknessMm,
  tensileStrength, translucency, archivalLifeYears, dryingTimeHours,
  costPerSheet, washiFibers,
} from "../washi-paper-calc.js";

describe("fiberLengthMm", () => {
  it("kozo has longest fibers", () => {
    expect(fiberLengthMm("kozo")).toBeGreaterThan(fiberLengthMm("bamboo"));
  });
});

describe("cookingTimeHours", () => {
  it("bamboo takes longest to cook", () => {
    expect(cookingTimeHours("bamboo")).toBeGreaterThan(
      cookingTimeHours("gampi")
    );
  });
});

describe("beatingMinutes", () => {
  it("hemp needs most beating", () => {
    expect(beatingMinutes("hemp")).toBeGreaterThan(
      beatingMinutes("gampi")
    );
  });
});

describe("sheetThicknessMm", () => {
  it("more layers is thicker", () => {
    expect(sheetThicknessMm(10)).toBeGreaterThan(sheetThicknessMm(5));
  });
});

describe("tensileStrength", () => {
  it("kozo is strongest", () => {
    expect(tensileStrength("kozo")).toBeGreaterThan(
      tensileStrength("bamboo")
    );
  });
});

describe("translucency", () => {
  it("gampi is most translucent", () => {
    expect(translucency("gampi")).toBeGreaterThan(translucency("hemp"));
  });
});

describe("archivalLifeYears", () => {
  it("kozo lasts longest", () => {
    expect(archivalLifeYears("kozo")).toBeGreaterThan(
      archivalLifeYears("bamboo")
    );
  });
});

describe("dryingTimeHours", () => {
  it("hemp takes longest to dry", () => {
    expect(dryingTimeHours("hemp")).toBeGreaterThan(
      dryingTimeHours("gampi")
    );
  });
});

describe("costPerSheet", () => {
  it("gampi is most expensive", () => {
    expect(costPerSheet("gampi")).toBeGreaterThan(costPerSheet("bamboo"));
  });
});

describe("washiFibers", () => {
  it("returns 5 fibers", () => {
    expect(washiFibers()).toHaveLength(5);
  });
});
