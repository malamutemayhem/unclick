import { describe, it, expect } from "vitest";
import {
  tabletsNeeded, holesPerTablet, turningSequenceLength, warpTensionRating,
  bandThicknessMm, difficultyRating, rowsPerHour, reversible,
  warpWastePercent, tabletPatterns,
} from "../tablet-weaving-calc.js";

describe("tabletsNeeded", () => {
  it("wider band needs more tablets", () => {
    expect(tabletsNeeded(10, 4)).toBeGreaterThan(tabletsNeeded(5, 4));
  });
  it("zero threads per tablet returns 0", () => {
    expect(tabletsNeeded(10, 0)).toBe(0);
  });
});

describe("holesPerTablet", () => {
  it("sulawesi has 6 holes", () => {
    expect(holesPerTablet("sulawesi")).toBe(6);
  });
  it("plain has 4 holes", () => {
    expect(holesPerTablet("plain")).toBe(4);
  });
});

describe("turningSequenceLength", () => {
  it("egyptian diagonals has longest sequence", () => {
    expect(turningSequenceLength("egyptian_diagonals")).toBeGreaterThan(
      turningSequenceLength("plain")
    );
  });
});

describe("warpTensionRating", () => {
  it("egyptian diagonals needs most tension", () => {
    expect(warpTensionRating("egyptian_diagonals")).toBeGreaterThan(
      warpTensionRating("plain")
    );
  });
});

describe("bandThicknessMm", () => {
  it("double face is thickest", () => {
    expect(bandThicknessMm("double_face")).toBeGreaterThanOrEqual(
      bandThicknessMm("plain")
    );
  });
});

describe("difficultyRating", () => {
  it("egyptian diagonals is hardest", () => {
    expect(difficultyRating("egyptian_diagonals")).toBeGreaterThan(
      difficultyRating("plain")
    );
  });
});

describe("rowsPerHour", () => {
  it("plain is fastest", () => {
    expect(rowsPerHour("plain")).toBeGreaterThan(
      rowsPerHour("egyptian_diagonals")
    );
  });
});

describe("reversible", () => {
  it("double face is reversible", () => {
    expect(reversible("double_face")).toBe(true);
  });
  it("plain is not reversible", () => {
    expect(reversible("plain")).toBe(false);
  });
});

describe("warpWastePercent", () => {
  it("returns 15", () => {
    expect(warpWastePercent()).toBe(15);
  });
});

describe("tabletPatterns", () => {
  it("returns 5 patterns", () => {
    expect(tabletPatterns()).toHaveLength(5);
  });
});
