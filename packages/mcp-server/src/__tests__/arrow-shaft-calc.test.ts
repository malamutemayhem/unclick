import { describe, it, expect } from "vitest";
import {
  stiffnessSpine, weightConsistency, durability, costPerDozen,
  speedRating, naturalMaterial, competitionLegal, bestPairedBow,
  failureMode, arrowShafts,
} from "../arrow-shaft-calc.js";

describe("stiffnessSpine", () => {
  it("carbon stiffest", () => {
    expect(stiffnessSpine("carbon")).toBeGreaterThan(stiffnessSpine("bamboo"));
  });
});

describe("weightConsistency", () => {
  it("carbon most consistent", () => {
    expect(weightConsistency("carbon")).toBeGreaterThan(weightConsistency("wood"));
  });
});

describe("durability", () => {
  it("carbon most durable", () => {
    expect(durability("carbon")).toBeGreaterThan(durability("bamboo"));
  });
});

describe("costPerDozen", () => {
  it("carbon most expensive", () => {
    expect(costPerDozen("carbon")).toBeGreaterThan(costPerDozen("bamboo"));
  });
});

describe("speedRating", () => {
  it("carbon fastest", () => {
    expect(speedRating("carbon")).toBeGreaterThan(speedRating("wood"));
  });
});

describe("naturalMaterial", () => {
  it("wood is natural", () => {
    expect(naturalMaterial("wood")).toBe(true);
  });
  it("carbon is not natural", () => {
    expect(naturalMaterial("carbon")).toBe(false);
  });
});

describe("competitionLegal", () => {
  it("all shafts are competition legal", () => {
    for (const s of arrowShafts()) {
      expect(competitionLegal(s)).toBe(true);
    }
  });
});

describe("bestPairedBow", () => {
  it("wood pairs with longbow traditional", () => {
    expect(bestPairedBow("wood")).toBe("longbow_traditional");
  });
});

describe("failureMode", () => {
  it("aluminum bends", () => {
    expect(failureMode("aluminum")).toBe("bend_dent");
  });
});

describe("arrowShafts", () => {
  it("returns 5 shafts", () => {
    expect(arrowShafts()).toHaveLength(5);
  });
});
