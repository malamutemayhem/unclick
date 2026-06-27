import { describe, it, expect } from "vitest";
import {
  depthMeters, stepsCount, storageCapacityM3,
  ornamentalLevel, constructionYears, coolingEffect,
  communalGathering, primaryRegion, restorationDifficulty, stepwellStyles,
} from "../stepwell-calc.js";

describe("depthMeters", () => {
  it("bawdi is deepest", () => {
    expect(depthMeters("bawdi")).toBeGreaterThan(
      depthMeters("kalyani")
    );
  });
});

describe("stepsCount", () => {
  it("bawdi has most steps", () => {
    expect(stepsCount("bawdi")).toBeGreaterThan(
      stepsCount("kalyani")
    );
  });
});

describe("storageCapacityM3", () => {
  it("pushkarani stores most water", () => {
    expect(storageCapacityM3("pushkarani")).toBeGreaterThan(
      storageCapacityM3("kalyani")
    );
  });
});

describe("ornamentalLevel", () => {
  it("vav is most ornamental", () => {
    expect(ornamentalLevel("vav")).toBeGreaterThan(
      ornamentalLevel("pushkarani")
    );
  });
});

describe("constructionYears", () => {
  it("bawdi takes longest to build", () => {
    expect(constructionYears("bawdi")).toBeGreaterThan(
      constructionYears("kalyani")
    );
  });
});

describe("coolingEffect", () => {
  it("vav has cooling effect", () => {
    expect(coolingEffect("vav")).toBe(true);
  });
  it("pushkarani does not", () => {
    expect(coolingEffect("pushkarani")).toBe(false);
  });
});

describe("communalGathering", () => {
  it("all stepwells serve as gathering places", () => {
    expect(communalGathering("vav")).toBe(true);
    expect(communalGathering("kalyani")).toBe(true);
  });
});

describe("primaryRegion", () => {
  it("vav is from gujarat", () => {
    expect(primaryRegion("vav")).toBe("gujarat");
  });
});

describe("restorationDifficulty", () => {
  it("bawdi is hardest to restore", () => {
    expect(restorationDifficulty("bawdi")).toBeGreaterThan(
      restorationDifficulty("kalyani")
    );
  });
});

describe("stepwellStyles", () => {
  it("returns 5 styles", () => {
    expect(stepwellStyles()).toHaveLength(5);
  });
});
