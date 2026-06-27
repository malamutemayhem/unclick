import { describe, it, expect } from "vitest";
import { NutritionCalc } from "../nutrition-calc.js";

describe("NutritionCalc", () => {
  it("macroCalories calculates from macros", () => {
    expect(NutritionCalc.macroCalories(30, 50, 20)).toBe(500);
  });

  it("macroPercentages calculates macro split", () => {
    const pct = NutritionCalc.macroPercentages({ calories: 500, protein: 30, carbs: 50, fat: 20 });
    expect(pct.protein + pct.carbs + pct.fat).toBeCloseTo(100, 0);
  });

  it("bmr calculates basal metabolic rate", () => {
    const male = NutritionCalc.bmr(80, 180, 30, true);
    const female = NutritionCalc.bmr(60, 165, 25, false);
    expect(male).toBeGreaterThan(1500);
    expect(female).toBeGreaterThan(1200);
    expect(male).toBeGreaterThan(female);
  });

  it("tdee applies activity multiplier", () => {
    const bmr = 1800;
    const sedentary = NutritionCalc.tdee(bmr, "sedentary");
    const active = NutritionCalc.tdee(bmr, "active");
    expect(active).toBeGreaterThan(sedentary);
  });

  it("dailyTargets adjusts for goals", () => {
    const maintain = NutritionCalc.dailyTargets(2500, "maintain");
    const lose = NutritionCalc.dailyTargets(2500, "lose");
    const gain = NutritionCalc.dailyTargets(2500, "gain");
    expect(lose.calories).toBeLessThan(maintain.calories);
    expect(gain.calories).toBeGreaterThan(maintain.calories);
  });

  it("scaleServings scales proportionally", () => {
    const base = { calories: 200, protein: 10, carbs: 30, fat: 5, fiber: 3 };
    const doubled = NutritionCalc.scaleServings(base, 1, 2);
    expect(doubled.calories).toBe(400);
    expect(doubled.protein).toBe(20);
  });

  it("combineMeals sums nutrients", () => {
    const meals = [
      { calories: 400, protein: 20, carbs: 50, fat: 10 },
      { calories: 600, protein: 30, carbs: 70, fat: 20 },
    ];
    const total = NutritionCalc.combineMeals(meals);
    expect(total.calories).toBe(1000);
    expect(total.protein).toBe(50);
  });

  it("remaining calculates what is left", () => {
    const consumed = { calories: 1500, protein: 80, carbs: 150, fat: 50 };
    const target = { calories: 2000, protein: 120, carbs: 250, fat: 70 };
    const left = NutritionCalc.remaining(consumed, target);
    expect(left.calories).toBe(500);
    expect(left.protein).toBe(40);
  });

  it("bmi calculates correctly", () => {
    const result = NutritionCalc.bmi(70, 170);
    expect(result.bmi).toBeCloseTo(24.2, 0);
    expect(result.category).toBe("Normal");
  });

  it("bmi classifies categories", () => {
    expect(NutritionCalc.bmi(50, 180).category).toBe("Underweight");
    expect(NutritionCalc.bmi(100, 170).category).toBe("Obese");
  });
});
