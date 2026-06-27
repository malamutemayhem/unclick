import { describe, it, expect } from "vitest";
import {
  rarityFactor, mintageVolume, proofProduction, collectorPremium,
  historicalSignificance, stillOperating, producesCirculation,
  markLetter, foundedYear, mintMarks,
} from "../mint-mark-calc.js";

describe("rarityFactor", () => {
  it("carson city rarest", () => {
    expect(rarityFactor("carson_city")).toBeGreaterThan(rarityFactor("philadelphia"));
  });
});

describe("mintageVolume", () => {
  it("philadelphia highest volume", () => {
    expect(mintageVolume("philadelphia")).toBeGreaterThan(mintageVolume("west_point"));
  });
});

describe("proofProduction", () => {
  it("san francisco most proof production", () => {
    expect(proofProduction("san_francisco")).toBeGreaterThan(proofProduction("denver"));
  });
});

describe("collectorPremium", () => {
  it("carson city highest premium", () => {
    expect(collectorPremium("carson_city")).toBeGreaterThan(collectorPremium("denver"));
  });
});

describe("historicalSignificance", () => {
  it("philadelphia most historically significant", () => {
    expect(historicalSignificance("philadelphia")).toBeGreaterThan(
      historicalSignificance("west_point")
    );
  });
});

describe("stillOperating", () => {
  it("philadelphia still operating", () => {
    expect(stillOperating("philadelphia")).toBe(true);
  });
  it("carson city not operating", () => {
    expect(stillOperating("carson_city")).toBe(false);
  });
});

describe("producesCirculation", () => {
  it("denver produces circulation", () => {
    expect(producesCirculation("denver")).toBe(true);
  });
  it("san francisco does not", () => {
    expect(producesCirculation("san_francisco")).toBe(false);
  });
});

describe("markLetter", () => {
  it("carson city is CC", () => {
    expect(markLetter("carson_city")).toBe("CC");
  });
});

describe("foundedYear", () => {
  it("philadelphia founded 1792", () => {
    expect(foundedYear("philadelphia")).toBe("1792");
  });
});

describe("mintMarks", () => {
  it("returns 5 marks", () => {
    expect(mintMarks()).toHaveLength(5);
  });
});
