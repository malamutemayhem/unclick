import { describe, it, expect } from "vitest";
import {
  tspToG, gToTsp, tbspToTsp, ozToG, scaleBatch, totalWeight,
  percentages, shelfLifeMonths, scovilleCategory, toastingTime,
  substitutionRatio, curryPowder, garamMasala, heatLevels,
} from "../spice-blend.js";

describe("tspToG", () => {
  it("1 tsp = 2.5g", () => {
    expect(tspToG(1)).toBe(2.5);
  });
});

describe("gToTsp", () => {
  it("round trips", () => {
    expect(gToTsp(tspToG(4))).toBe(4);
  });
});

describe("tbspToTsp", () => {
  it("1 tbsp = 3 tsp", () => {
    expect(tbspToTsp(1)).toBe(3);
  });
});

describe("ozToG", () => {
  it("1 oz ~= 28.35g", () => {
    expect(ozToG(1)).toBeCloseTo(28.35, 0);
  });
});

describe("scaleBatch", () => {
  it("doubles amounts", () => {
    const ingredients = [{ name: "cumin", amount: 2, unit: "tsp" as const }];
    const scaled = scaleBatch(ingredients, 2);
    expect(scaled[0].amount).toBe(4);
  });
});

describe("totalWeight", () => {
  it("sums all ingredients in grams", () => {
    const ingredients = [
      { name: "cumin", amount: 2, unit: "tsp" as const },
      { name: "salt", amount: 5, unit: "g" as const },
    ];
    expect(totalWeight(ingredients)).toBeGreaterThan(0);
  });
});

describe("percentages", () => {
  it("sums to 100", () => {
    const ingredients = [
      { name: "cumin", amount: 2, unit: "tsp" as const },
      { name: "coriander", amount: 2, unit: "tsp" as const },
    ];
    const pcts = percentages(ingredients);
    const total = pcts.reduce((s, p) => s + p.percent, 0);
    expect(total).toBeCloseTo(100, 0);
  });
});

describe("shelfLifeMonths", () => {
  it("ground is shorter", () => {
    expect(shelfLifeMonths(true)).toBeLessThan(shelfLifeMonths(false));
  });
});

describe("scovilleCategory", () => {
  it("none at 0", () => {
    expect(scovilleCategory(0)).toBe("none");
  });

  it("extreme at 100k+", () => {
    expect(scovilleCategory(150000)).toBe("extreme");
  });
});

describe("toastingTime", () => {
  it("mustard is fastest", () => {
    expect(toastingTime("mustard")).toBeLessThan(toastingTime("cumin"));
  });
});

describe("substitutionRatio", () => {
  it("dried to fresh = 3x", () => {
    expect(substitutionRatio("dried", "fresh")).toBe(3);
  });

  it("same to same = 1x", () => {
    expect(substitutionRatio("dried", "dried")).toBe(1);
  });
});

describe("curryPowder", () => {
  it("has turmeric", () => {
    expect(curryPowder().some(i => i.name === "turmeric")).toBe(true);
  });
});

describe("garamMasala", () => {
  it("has cumin", () => {
    expect(garamMasala().some(i => i.name === "cumin")).toBe(true);
  });
});

describe("heatLevels", () => {
  it("returns 5 levels", () => {
    expect(heatLevels()).toHaveLength(5);
  });
});
