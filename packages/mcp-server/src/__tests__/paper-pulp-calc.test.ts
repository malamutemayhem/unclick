import { describe, it, expect } from "vitest";
import {
  fiberLengthMm, strengthRating, opacityRating,
  absorbencyRating, archivalYears, acidFree,
  beatingTimeMinutes, sheetFormingDifficulty, costPerKg, paperFibers,
} from "../paper-pulp-calc.js";

describe("fiberLengthMm", () => {
  it("flax has longest fibers", () => {
    expect(fiberLengthMm("flax")).toBeGreaterThan(
      fiberLengthMm("recycled")
    );
  });
});

describe("strengthRating", () => {
  it("abaca is strongest", () => {
    expect(strengthRating("abaca")).toBeGreaterThan(
      strengthRating("recycled")
    );
  });
});

describe("opacityRating", () => {
  it("flax is most opaque", () => {
    expect(opacityRating("flax")).toBeGreaterThan(
      opacityRating("abaca")
    );
  });
});

describe("absorbencyRating", () => {
  it("cotton rag is most absorbent", () => {
    expect(absorbencyRating("cotton_rag")).toBeGreaterThan(
      absorbencyRating("abaca")
    );
  });
});

describe("archivalYears", () => {
  it("kozo lasts longest", () => {
    expect(archivalYears("kozo")).toBeGreaterThan(
      archivalYears("recycled")
    );
  });
});

describe("acidFree", () => {
  it("cotton rag is acid free", () => {
    expect(acidFree("cotton_rag")).toBe(true);
  });
  it("recycled is not", () => {
    expect(acidFree("recycled")).toBe(false);
  });
});

describe("beatingTimeMinutes", () => {
  it("flax needs longest beating", () => {
    expect(beatingTimeMinutes("flax")).toBeGreaterThan(
      beatingTimeMinutes("recycled")
    );
  });
});

describe("sheetFormingDifficulty", () => {
  it("kozo is hardest to form", () => {
    expect(sheetFormingDifficulty("kozo")).toBeGreaterThan(
      sheetFormingDifficulty("recycled")
    );
  });
});

describe("costPerKg", () => {
  it("kozo is most expensive", () => {
    expect(costPerKg("kozo")).toBeGreaterThan(
      costPerKg("recycled")
    );
  });
});

describe("paperFibers", () => {
  it("returns 5 fibers", () => {
    expect(paperFibers()).toHaveLength(5);
  });
});
