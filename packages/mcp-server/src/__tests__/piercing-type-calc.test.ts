import { describe, it, expect } from "vitest";
import {
  healingWeeks, painLevel, infectionRisk, rejectionRisk,
  aftercareDifficulty, canHideEasily, suitableForFirstPiercing, recommendedJewelry,
  tissueType, piercingTypes,
} from "../piercing-type-calc.js";

describe("healingWeeks", () => {
  it("navel longest healing", () => {
    expect(healingWeeks("navel")).toBeGreaterThan(healingWeeks("earlobe"));
  });
});

describe("painLevel", () => {
  it("septum most painful", () => {
    expect(painLevel("septum")).toBeGreaterThan(painLevel("earlobe"));
  });
});

describe("infectionRisk", () => {
  it("navel highest infection risk", () => {
    expect(infectionRisk("navel")).toBeGreaterThan(infectionRisk("earlobe"));
  });
});

describe("rejectionRisk", () => {
  it("navel highest rejection risk", () => {
    expect(rejectionRisk("navel")).toBeGreaterThan(rejectionRisk("earlobe"));
  });
});

describe("aftercareDifficulty", () => {
  it("navel hardest aftercare", () => {
    expect(aftercareDifficulty("navel")).toBeGreaterThan(aftercareDifficulty("earlobe"));
  });
});

describe("canHideEasily", () => {
  it("septum can hide easily", () => {
    expect(canHideEasily("septum")).toBe(true);
  });
  it("earlobe cannot", () => {
    expect(canHideEasily("earlobe")).toBe(false);
  });
});

describe("suitableForFirstPiercing", () => {
  it("earlobe suitable for first", () => {
    expect(suitableForFirstPiercing("earlobe")).toBe(true);
  });
  it("navel not suitable", () => {
    expect(suitableForFirstPiercing("navel")).toBe(false);
  });
});

describe("recommendedJewelry", () => {
  it("navel uses curved barbell", () => {
    expect(recommendedJewelry("navel")).toBe("curved_barbell");
  });
});

describe("tissueType", () => {
  it("helix is cartilage", () => {
    expect(tissueType("helix")).toBe("cartilage");
  });
});

describe("piercingTypes", () => {
  it("returns 5 types", () => {
    expect(piercingTypes()).toHaveLength(5);
  });
});
