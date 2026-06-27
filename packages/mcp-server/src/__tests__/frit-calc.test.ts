import { describe, it, expect } from "vitest";
import {
  particleSizeMm, meltingTempCelsius, firingTimeMinutes, applicationGPerM2,
  transparencyPercent, textureRating, compatibilityCoeff, washingRequired,
  costPerKg, fritMeshes,
} from "../frit-calc.js";

describe("particleSizeMm", () => {
  it("coarse is largest", () => {
    expect(particleSizeMm("coarse")).toBeGreaterThan(particleSizeMm("ultra_fine"));
  });
});

describe("meltingTempCelsius", () => {
  it("coarse melts at highest temp", () => {
    expect(meltingTempCelsius("coarse")).toBeGreaterThan(
      meltingTempCelsius("ultra_fine")
    );
  });
});

describe("firingTimeMinutes", () => {
  it("coarse takes longest", () => {
    expect(firingTimeMinutes("coarse")).toBeGreaterThan(
      firingTimeMinutes("ultra_fine")
    );
  });
});

describe("applicationGPerM2", () => {
  it("coarse needs most material", () => {
    expect(applicationGPerM2("coarse")).toBeGreaterThan(
      applicationGPerM2("ultra_fine")
    );
  });
});

describe("transparencyPercent", () => {
  it("ultra fine is most transparent", () => {
    expect(transparencyPercent("ultra_fine")).toBeGreaterThan(
      transparencyPercent("coarse")
    );
  });
});

describe("textureRating", () => {
  it("coarse has highest texture", () => {
    expect(textureRating("coarse")).toBeGreaterThan(textureRating("ultra_fine"));
  });
});

describe("compatibilityCoeff", () => {
  it("returns 96", () => {
    expect(compatibilityCoeff()).toBe(96);
  });
});

describe("washingRequired", () => {
  it("coarse requires washing", () => {
    expect(washingRequired("coarse")).toBe(true);
  });
  it("fine does not require washing", () => {
    expect(washingRequired("fine")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("ultra fine is most expensive", () => {
    expect(costPerKg("ultra_fine")).toBeGreaterThan(costPerKg("coarse"));
  });
});

describe("fritMeshes", () => {
  it("returns 5 meshes", () => {
    expect(fritMeshes()).toHaveLength(5);
  });
});
