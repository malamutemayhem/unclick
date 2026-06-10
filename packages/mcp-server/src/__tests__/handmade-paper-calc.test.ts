import { describe, it, expect } from "vitest";
import {
  sheetWeightGsm, fiberLengthMm, tearStrength,
  opacity, absorbency, archivalQuality,
  bestUse, processingHours, costPerKg, paperFibers,
} from "../handmade-paper-calc.js";

describe("sheetWeightGsm", () => {
  it("flax is heaviest", () => {
    expect(sheetWeightGsm("flax")).toBeGreaterThan(
      sheetWeightGsm("kozo")
    );
  });
});

describe("fiberLengthMm", () => {
  it("flax has longest fibers", () => {
    expect(fiberLengthMm("flax")).toBeGreaterThan(
      fiberLengthMm("abaca")
    );
  });
});

describe("tearStrength", () => {
  it("kozo has best tear strength", () => {
    expect(tearStrength("kozo")).toBeGreaterThan(
      tearStrength("hemp")
    );
  });
});

describe("opacity", () => {
  it("flax is most opaque", () => {
    expect(opacity("flax")).toBeGreaterThan(
      opacity("kozo")
    );
  });
});

describe("absorbency", () => {
  it("cotton is most absorbent", () => {
    expect(absorbency("cotton")).toBeGreaterThan(
      absorbency("abaca")
    );
  });
});

describe("archivalQuality", () => {
  it("cotton has highest archival quality", () => {
    expect(archivalQuality("cotton")).toBeGreaterThan(
      archivalQuality("hemp")
    );
  });
});

describe("bestUse", () => {
  it("kozo is best for shoji screens", () => {
    expect(bestUse("kozo")).toBe("shoji_screens");
  });
});

describe("processingHours", () => {
  it("kozo takes longest to process", () => {
    expect(processingHours("kozo")).toBeGreaterThan(
      processingHours("abaca")
    );
  });
});

describe("costPerKg", () => {
  it("kozo costs most", () => {
    expect(costPerKg("kozo")).toBeGreaterThan(
      costPerKg("hemp")
    );
  });
});

describe("paperFibers", () => {
  it("returns 5 fibers", () => {
    expect(paperFibers()).toHaveLength(5);
  });
});
