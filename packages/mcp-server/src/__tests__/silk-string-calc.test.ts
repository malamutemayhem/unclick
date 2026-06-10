import { describe, it, expect } from "vitest";
import {
  tensileStrengthMpa, toneClarity, sustainSeconds,
  volumeLevel, humiditySensitive, lifespanMonths,
  bestForInstrument, strandCount, costPerMeter, silkStringTypes,
} from "../silk-string-calc.js";

describe("tensileStrengthMpa", () => {
  it("metal wound is strongest", () => {
    expect(tensileStrengthMpa("metal_wound")).toBeGreaterThan(
      tensileStrengthMpa("raw_silk")
    );
  });
});

describe("toneClarity", () => {
  it("lacquered has best clarity", () => {
    expect(toneClarity("lacquered")).toBeGreaterThan(
      toneClarity("metal_wound")
    );
  });
});

describe("sustainSeconds", () => {
  it("metal wound sustains longest", () => {
    expect(sustainSeconds("metal_wound")).toBeGreaterThan(
      sustainSeconds("raw_silk")
    );
  });
});

describe("volumeLevel", () => {
  it("metal wound is loudest", () => {
    expect(volumeLevel("metal_wound")).toBeGreaterThan(
      volumeLevel("raw_silk")
    );
  });
});

describe("humiditySensitive", () => {
  it("raw silk is sensitive", () => {
    expect(humiditySensitive("raw_silk")).toBe(true);
  });
  it("lacquered is not", () => {
    expect(humiditySensitive("lacquered")).toBe(false);
  });
});

describe("lifespanMonths", () => {
  it("metal wound lasts longest", () => {
    expect(lifespanMonths("metal_wound")).toBeGreaterThan(
      lifespanMonths("raw_silk")
    );
  });
});

describe("bestForInstrument", () => {
  it("raw silk is best for guqin", () => {
    expect(bestForInstrument("raw_silk")).toBe("guqin");
  });
});

describe("strandCount", () => {
  it("wound silk has most strands", () => {
    expect(strandCount("wound_silk")).toBeGreaterThan(
      strandCount("raw_silk")
    );
  });
});

describe("costPerMeter", () => {
  it("metal wound is most expensive", () => {
    expect(costPerMeter("metal_wound")).toBeGreaterThan(
      costPerMeter("raw_silk")
    );
  });
});

describe("silkStringTypes", () => {
  it("returns 5 types", () => {
    expect(silkStringTypes()).toHaveLength(5);
  });
});
