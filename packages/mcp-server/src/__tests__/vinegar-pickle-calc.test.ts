import { describe, it, expect } from "vitest";
import {
  acidityPercent, processingDays, crunchRetention,
  shelfLifeMonths, fermented, sugarAdded,
  bestVegetable, probioticBenefit, difficultyRating, pickleMethods,
} from "../vinegar-pickle-calc.js";

describe("acidityPercent", () => {
  it("quick pickle has highest acidity", () => {
    expect(acidityPercent("quick_pickle")).toBeGreaterThan(
      acidityPercent("half_sour")
    );
  });
});

describe("processingDays", () => {
  it("full sour takes longest", () => {
    expect(processingDays("full_sour")).toBeGreaterThan(
      processingDays("quick_pickle")
    );
  });
});

describe("crunchRetention", () => {
  it("refrigerator retains most crunch", () => {
    expect(crunchRetention("refrigerator")).toBeGreaterThan(
      crunchRetention("full_sour")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("quick pickle lasts longest", () => {
    expect(shelfLifeMonths("quick_pickle")).toBeGreaterThan(
      shelfLifeMonths("half_sour")
    );
  });
});

describe("fermented", () => {
  it("full sour is fermented", () => {
    expect(fermented("full_sour")).toBe(true);
  });
  it("quick pickle is not", () => {
    expect(fermented("quick_pickle")).toBe(false);
  });
});

describe("sugarAdded", () => {
  it("bread and butter has sugar", () => {
    expect(sugarAdded("bread_butter")).toBe(true);
  });
  it("full sour does not", () => {
    expect(sugarAdded("full_sour")).toBe(false);
  });
});

describe("bestVegetable", () => {
  it("refrigerator pickle is best for carrots", () => {
    expect(bestVegetable("refrigerator")).toBe("carrots");
  });
});

describe("probioticBenefit", () => {
  it("full sour has probiotic benefit", () => {
    expect(probioticBenefit("full_sour")).toBe(true);
  });
  it("quick pickle does not", () => {
    expect(probioticBenefit("quick_pickle")).toBe(false);
  });
});

describe("difficultyRating", () => {
  it("full sour is hardest", () => {
    expect(difficultyRating("full_sour")).toBeGreaterThan(
      difficultyRating("quick_pickle")
    );
  });
});

describe("pickleMethods", () => {
  it("returns 5 methods", () => {
    expect(pickleMethods()).toHaveLength(5);
  });
});
