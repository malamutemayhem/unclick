import { describe, it, expect } from "vitest";
import {
  tactileFeel, moistureAbsorption, durabilityYears,
  yellowingRisk, gripWhenWet, ethicallySourced,
  whiteKey, bestPianoType, costPerKey, pianoKeyMaterials,
} from "../piano-key-calc.js";

describe("tactileFeel", () => {
  it("ivory has best tactile feel", () => {
    expect(tactileFeel("ivory")).toBeGreaterThan(
      tactileFeel("acrylic")
    );
  });
});

describe("moistureAbsorption", () => {
  it("ivory absorbs most moisture", () => {
    expect(moistureAbsorption("ivory")).toBeGreaterThan(
      moistureAbsorption("acrylic")
    );
  });
});

describe("durabilityYears", () => {
  it("ivory lasts longest", () => {
    expect(durabilityYears("ivory")).toBeGreaterThan(
      durabilityYears("spruce")
    );
  });
});

describe("yellowingRisk", () => {
  it("ivory yellows most", () => {
    expect(yellowingRisk("ivory")).toBeGreaterThan(
      yellowingRisk("ivorite")
    );
  });
});

describe("gripWhenWet", () => {
  it("ivory grips best when wet", () => {
    expect(gripWhenWet("ivory")).toBeGreaterThan(
      gripWhenWet("acrylic")
    );
  });
});

describe("ethicallySourced", () => {
  it("acrylic is ethically sourced", () => {
    expect(ethicallySourced("acrylic")).toBe(true);
  });
  it("ivory is not", () => {
    expect(ethicallySourced("ivory")).toBe(false);
  });
});

describe("whiteKey", () => {
  it("ivory is white key", () => {
    expect(whiteKey("ivory")).toBe(true);
  });
  it("ebony is not", () => {
    expect(whiteKey("ebony")).toBe(false);
  });
});

describe("bestPianoType", () => {
  it("ebony best for concert grand", () => {
    expect(bestPianoType("ebony")).toBe("concert_grand");
  });
});

describe("costPerKey", () => {
  it("ivory costs most", () => {
    expect(costPerKey("ivory")).toBeGreaterThan(
      costPerKey("acrylic")
    );
  });
});

describe("pianoKeyMaterials", () => {
  it("returns 5 materials", () => {
    expect(pianoKeyMaterials()).toHaveLength(5);
  });
});
