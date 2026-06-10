import { describe, it, expect } from "vitest";
import {
  soundInsulation, naturalLight, spaceEfficiency,
  aestheticImpact, durabilityYears, requiresTrack,
  doubleDoor, bestLocation, costMultiplier, doorTypes,
} from "../door-type-calc.js";

describe("soundInsulation", () => {
  it("pivot insulates most", () => {
    expect(soundInsulation("pivot")).toBeGreaterThan(
      soundInsulation("french")
    );
  });
});

describe("naturalLight", () => {
  it("french admits most light", () => {
    expect(naturalLight("french")).toBeGreaterThan(
      naturalLight("flush")
    );
  });
});

describe("spaceEfficiency", () => {
  it("barn is most space efficient", () => {
    expect(spaceEfficiency("barn")).toBeGreaterThan(
      spaceEfficiency("french")
    );
  });
});

describe("aestheticImpact", () => {
  it("pivot has most impact", () => {
    expect(aestheticImpact("pivot")).toBeGreaterThan(
      aestheticImpact("flush")
    );
  });
});

describe("durabilityYears", () => {
  it("pivot lasts longest", () => {
    expect(durabilityYears("pivot")).toBeGreaterThan(
      durabilityYears("flush")
    );
  });
});

describe("requiresTrack", () => {
  it("barn requires track", () => {
    expect(requiresTrack("barn")).toBe(true);
  });
  it("panel does not", () => {
    expect(requiresTrack("panel")).toBe(false);
  });
});

describe("doubleDoor", () => {
  it("french is double door", () => {
    expect(doubleDoor("french")).toBe(true);
  });
  it("barn is not", () => {
    expect(doubleDoor("barn")).toBe(false);
  });
});

describe("bestLocation", () => {
  it("pivot for grand entrance", () => {
    expect(bestLocation("pivot")).toBe("grand_entrance");
  });
});

describe("costMultiplier", () => {
  it("pivot costs most", () => {
    expect(costMultiplier("pivot")).toBeGreaterThan(
      costMultiplier("panel")
    );
  });
});

describe("doorTypes", () => {
  it("returns 5 types", () => {
    expect(doorTypes()).toHaveLength(5);
  });
});
