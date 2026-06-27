import { describe, it, expect } from "vitest";
import {
  fireRating, burglaryRating, weightKg, concealability,
  storageCapacity, boltDown, ulListed, primaryContent,
  lockOptions, safeTypes,
} from "../safe-type-calc.js";

describe("fireRating", () => {
  it("fire resistant best fire rating", () => {
    expect(fireRating("fire_resistant")).toBeGreaterThan(fireRating("wall"));
  });
});

describe("burglaryRating", () => {
  it("burglary safe best burglary rating", () => {
    expect(burglaryRating("burglary")).toBeGreaterThan(burglaryRating("fire_resistant"));
  });
});

describe("weightKg", () => {
  it("floor safe heaviest", () => {
    expect(weightKg("floor")).toBeGreaterThan(weightKg("wall"));
  });
});

describe("concealability", () => {
  it("wall safe most concealable", () => {
    expect(concealability("wall")).toBeGreaterThan(concealability("fire_resistant"));
  });
});

describe("storageCapacity", () => {
  it("gun safe largest capacity", () => {
    expect(storageCapacity("gun")).toBeGreaterThan(storageCapacity("wall"));
  });
});

describe("boltDown", () => {
  it("burglary safe bolts down", () => {
    expect(boltDown("burglary")).toBe(true);
  });
  it("wall safe does not bolt down", () => {
    expect(boltDown("wall")).toBe(false);
  });
});

describe("ulListed", () => {
  it("fire resistant is UL listed", () => {
    expect(ulListed("fire_resistant")).toBe(true);
  });
  it("wall safe is not UL listed", () => {
    expect(ulListed("wall")).toBe(false);
  });
});

describe("primaryContent", () => {
  it("fire resistant for documents media", () => {
    expect(primaryContent("fire_resistant")).toBe("documents_media");
  });
});

describe("lockOptions", () => {
  it("gun safe uses biometric", () => {
    expect(lockOptions("gun")).toBe("biometric_electronic");
  });
});

describe("safeTypes", () => {
  it("returns 5 types", () => {
    expect(safeTypes()).toHaveLength(5);
  });
});
