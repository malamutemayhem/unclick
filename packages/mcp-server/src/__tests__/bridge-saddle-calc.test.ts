import { describe, it, expect } from "vitest";
import {
  densityGPerCm3, hardnessRating, toneCharacter, sustainRating,
  frictionCoefficient, selfLubricating, shapingDifficulty,
  consistencyRating, costEstimate, saddleMaterials,
} from "../bridge-saddle-calc.js";

describe("densityGPerCm3", () => {
  it("brass is densest", () => {
    expect(densityGPerCm3("brass")).toBeGreaterThan(
      densityGPerCm3("ivory_nut")
    );
  });
});

describe("hardnessRating", () => {
  it("brass is hardest", () => {
    expect(hardnessRating("brass")).toBeGreaterThan(
      hardnessRating("graphite")
    );
  });
});

describe("toneCharacter", () => {
  it("bone is warm bright", () => {
    expect(toneCharacter("bone")).toBe("warm_bright");
  });
});

describe("sustainRating", () => {
  it("brass has best sustain", () => {
    expect(sustainRating("brass")).toBeGreaterThan(
      sustainRating("graphite")
    );
  });
});

describe("frictionCoefficient", () => {
  it("graphite has lowest friction", () => {
    expect(frictionCoefficient("graphite")).toBeLessThan(
      frictionCoefficient("bone")
    );
  });
});

describe("selfLubricating", () => {
  it("graphite is self lubricating", () => {
    expect(selfLubricating("graphite")).toBe(true);
  });
  it("bone is not self lubricating", () => {
    expect(selfLubricating("bone")).toBe(false);
  });
});

describe("shapingDifficulty", () => {
  it("brass is hardest to shape", () => {
    expect(shapingDifficulty("brass")).toBeGreaterThan(
      shapingDifficulty("ivory_nut")
    );
  });
});

describe("consistencyRating", () => {
  it("tusq is most consistent", () => {
    expect(consistencyRating("tusq")).toBeGreaterThan(
      consistencyRating("bone")
    );
  });
});

describe("costEstimate", () => {
  it("tusq is most expensive", () => {
    expect(costEstimate("tusq")).toBeGreaterThan(costEstimate("ivory_nut"));
  });
});

describe("saddleMaterials", () => {
  it("returns 5 materials", () => {
    expect(saddleMaterials()).toHaveLength(5);
  });
});
