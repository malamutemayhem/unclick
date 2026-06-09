import { describe, it, expect } from "vitest";
import {
  getFood, scaleServing, totalCalories, totalMacros,
  macroPercentages, dailyTarget, remainingCalories,
  remainingMacros, caloriesFromMacros, calorieDeficit,
  weightChangePerWeek, daysToGoal, mealSummary, FOODS,
} from "../calorie-counter.js";

describe("getFood", () => {
  it("finds food by name", () => {
    const food = getFood("chicken breast");
    expect(food).not.toBeNull();
    expect(food!.calories).toBe(165);
  });

  it("case insensitive", () => {
    expect(getFood("BANANA")).not.toBeNull();
  });

  it("null for unknown", () => {
    expect(getFood("unicorn steak")).toBeNull();
  });
});

describe("scaleServing", () => {
  it("scales to different grams", () => {
    const food = getFood("chicken breast")!;
    const scaled = scaleServing(food, 200);
    expect(scaled.calories).toBe(330);
    expect(scaled.protein).toBeCloseTo(62, 0);
  });
});

describe("totalCalories / totalMacros", () => {
  it("sums calories", () => {
    const items = [getFood("egg")!, getFood("banana")!];
    expect(totalCalories(items)).toBe(244);
  });

  it("sums macros", () => {
    const items = [getFood("chicken breast")!, getFood("brown rice")!];
    const macros = totalMacros(items);
    expect(macros.protein).toBeCloseTo(33.7, 0);
  });
});

describe("macroPercentages", () => {
  it("percentages sum to ~100", () => {
    const items = [getFood("chicken breast")!, getFood("brown rice")!];
    const pct = macroPercentages(items);
    expect(pct.protein + pct.carbs + pct.fat).toBeCloseTo(100, 0);
  });
});

describe("dailyTarget", () => {
  it("lose weight has fewer calories", () => {
    const lose = dailyTarget(80, "lose");
    const maintain = dailyTarget(80, "maintain");
    expect(lose.calories).toBeLessThan(maintain.calories);
  });

  it("gain has more calories", () => {
    const gain = dailyTarget(80, "gain");
    const maintain = dailyTarget(80, "maintain");
    expect(gain.calories).toBeGreaterThan(maintain.calories);
  });
});

describe("remainingCalories / remainingMacros", () => {
  it("reduces by consumed", () => {
    const target = dailyTarget(70, "maintain");
    const consumed = [getFood("chicken breast")!];
    expect(remainingCalories(target, consumed)).toBe(target.calories - 165);
  });

  it("remaining macros decrease", () => {
    const target = dailyTarget(70, "maintain");
    const consumed = [getFood("chicken breast")!];
    const remaining = remainingMacros(target, consumed);
    expect(remaining.protein).toBeLessThan(target.protein);
  });
});

describe("caloriesFromMacros", () => {
  it("protein*4 + carbs*4 + fat*9", () => {
    expect(caloriesFromMacros(25, 50, 10)).toBe(390);
  });
});

describe("calorieDeficit", () => {
  it("computes daily deficit", () => {
    expect(calorieDeficit(2000, 1500, 300)).toBe(800);
  });
});

describe("weightChangePerWeek", () => {
  it("500 cal deficit = ~0.45 kg/week", () => {
    const change = weightChangePerWeek(500);
    expect(change).toBeCloseTo(0.45, 1);
  });
});

describe("daysToGoal", () => {
  it("computes days to reach target", () => {
    const days = daysToGoal(80, 75, 500);
    expect(days).toBeGreaterThan(50);
  });
});

describe("mealSummary", () => {
  it("formats summary string", () => {
    const summary = mealSummary([getFood("egg")!]);
    expect(summary).toContain("155 cal");
  });
});

describe("FOODS", () => {
  it("has multiple items", () => {
    expect(FOODS.length).toBeGreaterThan(10);
  });
});
