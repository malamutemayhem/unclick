import { describe, it, expect } from "vitest";
import {
  penetrationForce, fabricRange, skipResistance,
  precisionLevel, durabilityHours, preventsFabricDamage,
  specialtyUse, bestFabric, pointGeometry, needleTypes,
} from "../needle-type-calc.js";

describe("penetrationForce", () => {
  it("leather needle has highest force", () => {
    expect(penetrationForce("leather")).toBeGreaterThan(
      penetrationForce("ballpoint")
    );
  });
});

describe("fabricRange", () => {
  it("universal handles widest range", () => {
    expect(fabricRange("universal")).toBeGreaterThan(
      fabricRange("leather")
    );
  });
});

describe("skipResistance", () => {
  it("ballpoint resists skips best", () => {
    expect(skipResistance("ballpoint")).toBeGreaterThan(
      skipResistance("twin")
    );
  });
});

describe("precisionLevel", () => {
  it("sharp is most precise", () => {
    expect(precisionLevel("sharp")).toBeGreaterThan(
      precisionLevel("ballpoint")
    );
  });
});

describe("durabilityHours", () => {
  it("universal lasts longest", () => {
    expect(durabilityHours("universal")).toBeGreaterThan(
      durabilityHours("twin")
    );
  });
});

describe("preventsFabricDamage", () => {
  it("ballpoint prevents damage", () => {
    expect(preventsFabricDamage("ballpoint")).toBe(true);
  });
  it("sharp does not", () => {
    expect(preventsFabricDamage("sharp")).toBe(false);
  });
});

describe("specialtyUse", () => {
  it("leather is specialty", () => {
    expect(specialtyUse("leather")).toBe(true);
  });
  it("universal is not", () => {
    expect(specialtyUse("universal")).toBe(false);
  });
});

describe("bestFabric", () => {
  it("ballpoint for jersey knit", () => {
    expect(bestFabric("ballpoint")).toBe("jersey_knit");
  });
});

describe("pointGeometry", () => {
  it("sharp has acute point", () => {
    expect(pointGeometry("sharp")).toBe("acute");
  });
});

describe("needleTypes", () => {
  it("returns 5 types", () => {
    expect(needleTypes()).toHaveLength(5);
  });
});
