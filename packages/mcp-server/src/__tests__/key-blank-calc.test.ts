import { describe, it, expect } from "vitest";
import {
  duplicationDifficulty, securityRating, availabilityScore,
  precisionRequired, costPerKey, patentProtected, cuttableBySelf,
  typicalLockType, bittingStyle, keyBlanks,
} from "../key-blank-calc.js";

describe("duplicationDifficulty", () => {
  it("restricted hardest to duplicate", () => {
    expect(duplicationDifficulty("restricted")).toBeGreaterThan(
      duplicationDifficulty("standard")
    );
  });
});

describe("securityRating", () => {
  it("restricted highest security", () => {
    expect(securityRating("restricted")).toBeGreaterThan(securityRating("skeleton"));
  });
});

describe("availabilityScore", () => {
  it("standard most available", () => {
    expect(availabilityScore("standard")).toBeGreaterThan(availabilityScore("restricted"));
  });
});

describe("precisionRequired", () => {
  it("restricted needs most precision", () => {
    expect(precisionRequired("restricted")).toBeGreaterThan(precisionRequired("skeleton"));
  });
});

describe("costPerKey", () => {
  it("restricted most expensive", () => {
    expect(costPerKey("restricted")).toBeGreaterThan(costPerKey("standard"));
  });
});

describe("patentProtected", () => {
  it("restricted is patent protected", () => {
    expect(patentProtected("restricted")).toBe(true);
  });
  it("standard is not", () => {
    expect(patentProtected("standard")).toBe(false);
  });
});

describe("cuttableBySelf", () => {
  it("standard can be self cut", () => {
    expect(cuttableBySelf("standard")).toBe(true);
  });
  it("dimple cannot", () => {
    expect(cuttableBySelf("dimple")).toBe(false);
  });
});

describe("typicalLockType", () => {
  it("tubular for vending bike locks", () => {
    expect(typicalLockType("tubular")).toBe("vending_bike_locks");
  });
});

describe("bittingStyle", () => {
  it("dimple uses surface dimples", () => {
    expect(bittingStyle("dimple")).toBe("surface_dimples");
  });
});

describe("keyBlanks", () => {
  it("returns 5 types", () => {
    expect(keyBlanks()).toHaveLength(5);
  });
});
