import { describe, it, expect } from "vitest";
import {
  heightMm, charactersPerKg, sortBinsNeeded, linesPerPage,
  setWidthMultiplier, readabilityRating, bestUseCase,
  composingStickFits, costPerFont, typeSizes,
} from "../type-case-calc.js";

describe("heightMm", () => {
  it("18pt is tallest", () => {
    expect(heightMm("18pt")).toBeGreaterThan(heightMm("6pt"));
  });
});

describe("charactersPerKg", () => {
  it("6pt has most characters per kg", () => {
    expect(charactersPerKg("6pt")).toBeGreaterThan(
      charactersPerKg("18pt")
    );
  });
});

describe("sortBinsNeeded", () => {
  it("all sizes use same bin count", () => {
    expect(sortBinsNeeded("6pt")).toBe(sortBinsNeeded("18pt"));
  });
});

describe("linesPerPage", () => {
  it("smaller type fits more lines", () => {
    expect(linesPerPage("6pt", 25)).toBeGreaterThan(
      linesPerPage("18pt", 25)
    );
  });
});

describe("setWidthMultiplier", () => {
  it("18pt has widest set", () => {
    expect(setWidthMultiplier("18pt")).toBeGreaterThan(
      setWidthMultiplier("6pt")
    );
  });
});

describe("readabilityRating", () => {
  it("12pt is most readable", () => {
    expect(readabilityRating("12pt")).toBeGreaterThan(
      readabilityRating("6pt")
    );
  });
});

describe("bestUseCase", () => {
  it("10pt is for body text", () => {
    expect(bestUseCase("10pt")).toBe("body_text");
  });
});

describe("composingStickFits", () => {
  it("all sizes fit composing stick", () => {
    expect(composingStickFits("18pt")).toBe(true);
  });
});

describe("costPerFont", () => {
  it("18pt is most expensive", () => {
    expect(costPerFont("18pt")).toBeGreaterThan(costPerFont("6pt"));
  });
});

describe("typeSizes", () => {
  it("returns 5 sizes", () => {
    expect(typeSizes()).toHaveLength(5);
  });
});
