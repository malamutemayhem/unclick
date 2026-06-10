import { describe, it, expect } from "vitest";
import {
  reflectivity, refractiveIndex, gemUseFrequency,
  identificationEase, commonness, isOpaque,
  associatedWithGems, exampleMineral, surfaceAppearance, lusterTypes,
} from "../luster-type-calc.js";

describe("reflectivity", () => {
  it("metallic most reflective", () => {
    expect(reflectivity("metallic")).toBeGreaterThan(
      reflectivity("silky")
    );
  });
});

describe("refractiveIndex", () => {
  it("adamantine highest refractive index", () => {
    expect(refractiveIndex("adamantine")).toBeGreaterThan(
      refractiveIndex("vitreous")
    );
  });
});

describe("gemUseFrequency", () => {
  it("vitreous most used in gems", () => {
    expect(gemUseFrequency("vitreous")).toBeGreaterThan(
      gemUseFrequency("metallic")
    );
  });
});

describe("identificationEase", () => {
  it("metallic easiest to identify", () => {
    expect(identificationEase("metallic")).toBeGreaterThan(
      identificationEase("vitreous")
    );
  });
});

describe("commonness", () => {
  it("vitreous most common", () => {
    expect(commonness("vitreous")).toBeGreaterThan(
      commonness("adamantine")
    );
  });
});

describe("isOpaque", () => {
  it("metallic is opaque", () => {
    expect(isOpaque("metallic")).toBe(true);
  });
  it("vitreous is not", () => {
    expect(isOpaque("vitreous")).toBe(false);
  });
});

describe("associatedWithGems", () => {
  it("adamantine associated with gems", () => {
    expect(associatedWithGems("adamantine")).toBe(true);
  });
  it("metallic is not", () => {
    expect(associatedWithGems("metallic")).toBe(false);
  });
});

describe("exampleMineral", () => {
  it("adamantine is diamond zircon", () => {
    expect(exampleMineral("adamantine")).toBe("diamond_zircon");
  });
});

describe("surfaceAppearance", () => {
  it("vitreous is glass like", () => {
    expect(surfaceAppearance("vitreous")).toBe("glass_like");
  });
});

describe("lusterTypes", () => {
  it("returns 5 types", () => {
    expect(lusterTypes()).toHaveLength(5);
  });
});
