import { describe, it, expect } from "vitest";
import {
  hardnessJanka, densityKgM3, workability,
  grainBeauty, costPerBoardFoot, isHardwood,
  darkensWithAge, bestProject, grainPattern, woodSpeciesList,
} from "../wood-species-calc.js";

describe("hardnessJanka", () => {
  it("maple hardest", () => {
    expect(hardnessJanka("maple")).toBeGreaterThan(
      hardnessJanka("pine")
    );
  });
});

describe("densityKgM3", () => {
  it("oak densest", () => {
    expect(densityKgM3("oak")).toBeGreaterThan(
      densityKgM3("pine")
    );
  });
});

describe("workability", () => {
  it("pine most workable", () => {
    expect(workability("pine")).toBeGreaterThan(
      workability("maple")
    );
  });
});

describe("grainBeauty", () => {
  it("walnut most beautiful grain", () => {
    expect(grainBeauty("walnut")).toBeGreaterThan(
      grainBeauty("pine")
    );
  });
});

describe("costPerBoardFoot", () => {
  it("walnut most expensive", () => {
    expect(costPerBoardFoot("walnut")).toBeGreaterThan(
      costPerBoardFoot("pine")
    );
  });
});

describe("isHardwood", () => {
  it("oak is hardwood", () => {
    expect(isHardwood("oak")).toBe(true);
  });
  it("pine is not", () => {
    expect(isHardwood("pine")).toBe(false);
  });
});

describe("darkensWithAge", () => {
  it("cherry darkens with age", () => {
    expect(darkensWithAge("cherry")).toBe(true);
  });
  it("walnut does not", () => {
    expect(darkensWithAge("walnut")).toBe(false);
  });
});

describe("bestProject", () => {
  it("walnut for fine furniture", () => {
    expect(bestProject("walnut")).toBe("fine_furniture_gunstocks");
  });
});

describe("grainPattern", () => {
  it("maple has fine curly birdseye", () => {
    expect(grainPattern("maple")).toBe("fine_curly_birdseye");
  });
});

describe("woodSpeciesList", () => {
  it("returns 5 species", () => {
    expect(woodSpeciesList()).toHaveLength(5);
  });
});
