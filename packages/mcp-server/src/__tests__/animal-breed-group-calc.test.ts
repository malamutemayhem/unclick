import { describe, it, expect } from "vitest";
import {
  avgWeightKg, exerciseNeedHours, trainabilityScore,
  groomingNeed, avgLifespanYears, goodWithChildren,
  apartmentSuitable, originalPurpose, exampleBreed, animalBreedGroups,
} from "../animal-breed-group-calc.js";

describe("avgWeightKg", () => {
  it("working group heaviest", () => {
    expect(avgWeightKg("working")).toBeGreaterThan(
      avgWeightKg("toy")
    );
  });
});

describe("exerciseNeedHours", () => {
  it("sporting needs most exercise", () => {
    expect(exerciseNeedHours("sporting")).toBeGreaterThan(
      exerciseNeedHours("toy")
    );
  });
});

describe("trainabilityScore", () => {
  it("herding most trainable", () => {
    expect(trainabilityScore("herding")).toBeGreaterThan(
      trainabilityScore("hound")
    );
  });
});

describe("groomingNeed", () => {
  it("toy needs most grooming", () => {
    expect(groomingNeed("toy")).toBeGreaterThan(
      groomingNeed("hound")
    );
  });
});

describe("avgLifespanYears", () => {
  it("toy lives longest", () => {
    expect(avgLifespanYears("toy")).toBeGreaterThan(
      avgLifespanYears("working")
    );
  });
});

describe("goodWithChildren", () => {
  it("sporting good with children", () => {
    expect(goodWithChildren("sporting")).toBe(true);
  });
  it("toy is not", () => {
    expect(goodWithChildren("toy")).toBe(false);
  });
});

describe("apartmentSuitable", () => {
  it("toy is apartment suitable", () => {
    expect(apartmentSuitable("toy")).toBe(true);
  });
  it("herding is not", () => {
    expect(apartmentSuitable("herding")).toBe(false);
  });
});

describe("originalPurpose", () => {
  it("herding for livestock management", () => {
    expect(originalPurpose("herding")).toBe("livestock_management");
  });
});

describe("exampleBreed", () => {
  it("sporting example is golden retriever", () => {
    expect(exampleBreed("sporting")).toBe("golden_retriever");
  });
});

describe("animalBreedGroups", () => {
  it("returns 5 groups", () => {
    expect(animalBreedGroups()).toHaveLength(5);
  });
});
