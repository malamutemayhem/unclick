import { describe, it, expect } from "vitest";
import {
  holdStrength, garmentCare, spaceEfficiency, nonSlip,
  hangerCost, hasClips, shapeRetaining, hangerMaterial,
  bestGarment, clothesHangers,
} from "../clothes-hanger-calc.js";

describe("holdStrength", () => {
  it("wooden contoured suit strongest hold", () => {
    expect(holdStrength("wooden_contoured_suit")).toBeGreaterThan(holdStrength("padded_satin_delicate"));
  });
});

describe("garmentCare", () => {
  it("padded satin delicate best garment care", () => {
    expect(garmentCare("padded_satin_delicate")).toBeGreaterThan(garmentCare("wire_thin_basic"));
  });
});

describe("spaceEfficiency", () => {
  it("velvet slim nonslip most space efficient", () => {
    expect(spaceEfficiency("velvet_slim_nonslip")).toBeGreaterThan(spaceEfficiency("wooden_contoured_suit"));
  });
});

describe("nonSlip", () => {
  it("velvet slim nonslip best non slip", () => {
    expect(nonSlip("velvet_slim_nonslip")).toBeGreaterThan(nonSlip("wire_thin_basic"));
  });
});

describe("hangerCost", () => {
  it("wooden contoured suit most expensive", () => {
    expect(hangerCost("wooden_contoured_suit")).toBeGreaterThan(hangerCost("wire_thin_basic"));
  });
});

describe("hasClips", () => {
  it("clip trouser skirt has clips", () => {
    expect(hasClips("clip_trouser_skirt")).toBe(true);
  });
  it("velvet slim nonslip does not", () => {
    expect(hasClips("velvet_slim_nonslip")).toBe(false);
  });
});

describe("shapeRetaining", () => {
  it("wooden contoured suit is shape retaining", () => {
    expect(shapeRetaining("wooden_contoured_suit")).toBe(true);
  });
  it("wire thin basic is not", () => {
    expect(shapeRetaining("wire_thin_basic")).toBe(false);
  });
});

describe("hangerMaterial", () => {
  it("velvet slim nonslip uses abs core velvet flocked", () => {
    expect(hangerMaterial("velvet_slim_nonslip")).toBe("abs_core_velvet_flocked");
  });
});

describe("bestGarment", () => {
  it("wooden contoured suit best for suit jacket coat heavy", () => {
    expect(bestGarment("wooden_contoured_suit")).toBe("suit_jacket_coat_heavy");
  });
});

describe("clothesHangers", () => {
  it("returns 5 types", () => {
    expect(clothesHangers()).toHaveLength(5);
  });
});
