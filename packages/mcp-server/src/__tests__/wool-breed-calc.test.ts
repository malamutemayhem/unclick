import { describe, it, expect } from "vitest";
import {
  fiberDiameterMicrons, stapleLengthCm, softnessRating,
  durability, luster, feltability,
  lanolin, bestUse, costPerKg, woolBreeds,
} from "../wool-breed-calc.js";

describe("fiberDiameterMicrons", () => {
  it("merino is finest", () => {
    expect(fiberDiameterMicrons("merino")).toBeLessThan(
      fiberDiameterMicrons("lincoln")
    );
  });
});

describe("stapleLengthCm", () => {
  it("lincoln has longest staple", () => {
    expect(stapleLengthCm("lincoln")).toBeGreaterThan(
      stapleLengthCm("merino")
    );
  });
});

describe("softnessRating", () => {
  it("merino is softest", () => {
    expect(softnessRating("merino")).toBeGreaterThan(
      softnessRating("lincoln")
    );
  });
});

describe("durability", () => {
  it("lincoln is most durable", () => {
    expect(durability("lincoln")).toBeGreaterThan(
      durability("alpaca")
    );
  });
});

describe("luster", () => {
  it("lincoln has most luster", () => {
    expect(luster("lincoln")).toBeGreaterThan(
      luster("merino")
    );
  });
});

describe("feltability", () => {
  it("merino felts best", () => {
    expect(feltability("merino")).toBeGreaterThan(
      feltability("alpaca")
    );
  });
});

describe("lanolin", () => {
  it("merino has lanolin", () => {
    expect(lanolin("merino")).toBe(true);
  });
  it("alpaca has no lanolin", () => {
    expect(lanolin("alpaca")).toBe(false);
  });
});

describe("bestUse", () => {
  it("shetland best for lace", () => {
    expect(bestUse("shetland")).toBe("lace");
  });
});

describe("costPerKg", () => {
  it("alpaca costs most", () => {
    expect(costPerKg("alpaca")).toBeGreaterThan(
      costPerKg("lincoln")
    );
  });
});

describe("woolBreeds", () => {
  it("returns 5 breeds", () => {
    expect(woolBreeds()).toHaveLength(5);
  });
});
