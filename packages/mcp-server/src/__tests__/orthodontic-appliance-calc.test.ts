import { describe, it, expect } from "vitest";
import {
  treatmentSpeed, aestheticScore, comfortLevel, costRange,
  maintenanceDifficulty, removable, suitableForComplex,
  materialComposition, typicalDuration, orthodonticAppliances,
} from "../orthodontic-appliance-calc.js";

describe("treatmentSpeed", () => {
  it("metal braces fastest treatment", () => {
    expect(treatmentSpeed("metal_braces")).toBeGreaterThan(treatmentSpeed("clear_aligners"));
  });
});

describe("aestheticScore", () => {
  it("clear aligners most aesthetic", () => {
    expect(aestheticScore("clear_aligners")).toBeGreaterThan(aestheticScore("metal_braces"));
  });
});

describe("comfortLevel", () => {
  it("retainer most comfortable", () => {
    expect(comfortLevel("retainer")).toBeGreaterThan(comfortLevel("lingual_braces"));
  });
});

describe("costRange", () => {
  it("lingual braces most expensive", () => {
    expect(costRange("lingual_braces")).toBeGreaterThan(costRange("metal_braces"));
  });
});

describe("maintenanceDifficulty", () => {
  it("lingual braces hardest to maintain", () => {
    expect(maintenanceDifficulty("lingual_braces")).toBeGreaterThan(
      maintenanceDifficulty("clear_aligners")
    );
  });
});

describe("removable", () => {
  it("clear aligners are removable", () => {
    expect(removable("clear_aligners")).toBe(true);
  });
  it("metal braces are not removable", () => {
    expect(removable("metal_braces")).toBe(false);
  });
});

describe("suitableForComplex", () => {
  it("metal braces suitable for complex cases", () => {
    expect(suitableForComplex("metal_braces")).toBe(true);
  });
  it("clear aligners not for complex", () => {
    expect(suitableForComplex("clear_aligners")).toBe(false);
  });
});

describe("materialComposition", () => {
  it("clear aligners use thermoplastic", () => {
    expect(materialComposition("clear_aligners")).toBe("thermoplastic_polyurethane");
  });
});

describe("typicalDuration", () => {
  it("retainer is ongoing", () => {
    expect(typicalDuration("retainer")).toBe("ongoing_nightly");
  });
});

describe("orthodonticAppliances", () => {
  it("returns 5 appliances", () => {
    expect(orthodonticAppliances()).toHaveLength(5);
  });
});
