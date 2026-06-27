import { describe, it, expect } from "vitest";
import {
  applicationTimeMinutes, colorRange, metalCompatibility, sealerRequired,
  durabilityRating, reversibility, toxicityRating, temperatureCelsius,
  costRating, patinaMethods,
} from "../patina-calc.js";

describe("applicationTimeMinutes", () => {
  it("burial takes longest", () => {
    expect(applicationTimeMinutes("burial")).toBeGreaterThan(
      applicationTimeMinutes("vinegar_salt")
    );
  });
});

describe("colorRange", () => {
  it("liver sulfur gives black/brown", () => {
    expect(colorRange("liver_sulfur")).toBe("black_brown");
  });
});

describe("metalCompatibility", () => {
  it("liver sulfur works with most metals", () => {
    expect(metalCompatibility("liver_sulfur").length).toBeGreaterThan(
      metalCompatibility("ammonia").length
    );
  });
});

describe("sealerRequired", () => {
  it("heat patina needs no sealer", () => {
    expect(sealerRequired("heat")).toBe(false);
  });
  it("chemical patina needs sealer", () => {
    expect(sealerRequired("liver_sulfur")).toBe(true);
  });
});

describe("durabilityRating", () => {
  it("burial is most durable", () => {
    expect(durabilityRating("burial")).toBeGreaterThanOrEqual(durabilityRating("heat"));
  });
});

describe("reversibility", () => {
  it("liver sulfur is reversible", () => {
    expect(reversibility("liver_sulfur")).toBe(true);
  });
  it("burial is not reversible", () => {
    expect(reversibility("burial")).toBe(false);
  });
});

describe("toxicityRating", () => {
  it("ammonia is most toxic", () => {
    expect(toxicityRating("ammonia")).toBeGreaterThan(toxicityRating("vinegar_salt"));
  });
});

describe("temperatureCelsius", () => {
  it("heat method is hottest", () => {
    expect(temperatureCelsius("heat")).toBeGreaterThan(temperatureCelsius("liver_sulfur"));
  });
});

describe("costRating", () => {
  it("vinegar salt is cheapest", () => {
    expect(costRating("vinegar_salt")).toBeLessThanOrEqual(costRating("liver_sulfur"));
  });
});

describe("patinaMethods", () => {
  it("returns 5 methods", () => {
    expect(patinaMethods()).toHaveLength(5);
  });
});
