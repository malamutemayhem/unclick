import { describe, it, expect } from "vitest";
import {
  lengthMm, strengthToWeight, elytraHardness,
  ecologicalImportance, speciesCount, bioluminescent,
  beneficialToFarmers, primaryRole, collectorsValue, beetleTypes,
} from "../beetle-type-calc.js";

describe("lengthMm", () => {
  it("rhinoceros is largest", () => {
    expect(lengthMm("rhinoceros")).toBeGreaterThan(
      lengthMm("ladybug")
    );
  });
});

describe("strengthToWeight", () => {
  it("rhinoceros has best strength to weight", () => {
    expect(strengthToWeight("rhinoceros")).toBeGreaterThan(
      strengthToWeight("firefly")
    );
  });
});

describe("elytraHardness", () => {
  it("rhinoceros has hardest elytra", () => {
    expect(elytraHardness("rhinoceros")).toBeGreaterThan(
      elytraHardness("firefly")
    );
  });
});

describe("ecologicalImportance", () => {
  it("dung beetle is most ecologically important", () => {
    expect(ecologicalImportance("dung")).toBeGreaterThan(
      ecologicalImportance("jewel")
    );
  });
});

describe("speciesCount", () => {
  it("jewel has most species", () => {
    expect(speciesCount("jewel")).toBeGreaterThan(
      speciesCount("rhinoceros")
    );
  });
});

describe("bioluminescent", () => {
  it("firefly is bioluminescent", () => {
    expect(bioluminescent("firefly")).toBe(true);
  });
  it("ladybug is not", () => {
    expect(bioluminescent("ladybug")).toBe(false);
  });
});

describe("beneficialToFarmers", () => {
  it("ladybug is beneficial", () => {
    expect(beneficialToFarmers("ladybug")).toBe(true);
  });
  it("rhinoceros is not", () => {
    expect(beneficialToFarmers("rhinoceros")).toBe(false);
  });
});

describe("primaryRole", () => {
  it("ladybug role is pest control", () => {
    expect(primaryRole("ladybug")).toBe("pest_control");
  });
});

describe("collectorsValue", () => {
  it("jewel beetle is most collectible", () => {
    expect(collectorsValue("jewel")).toBeGreaterThan(
      collectorsValue("ladybug")
    );
  });
});

describe("beetleTypes", () => {
  it("returns 5 types", () => {
    expect(beetleTypes()).toHaveLength(5);
  });
});
