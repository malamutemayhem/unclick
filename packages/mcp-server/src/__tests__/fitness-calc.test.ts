import { describe, it, expect } from "vitest";
import {
  bmi, bmiCategory, bmr, tdee, caloriesForGoal, macroSplit,
  oneRepMax, trainingMax, percentOfMax,
  heartRateZones, maxHeartRate, caloriesBurned,
  paceToSpeed, speedToPace, bodyFatNavy,
  idealWeight, waterIntake, MET_VALUES,
} from "../fitness-calc.js";

describe("bmi", () => {
  it("computes BMI", () => {
    expect(bmi(70, 1.75)).toBeCloseTo(22.9, 0);
  });
});

describe("bmiCategory", () => {
  it("categorizes BMI", () => {
    expect(bmiCategory(17)).toBe("underweight");
    expect(bmiCategory(22)).toBe("normal");
    expect(bmiCategory(27)).toBe("overweight");
    expect(bmiCategory(32)).toBe("obese");
  });
});

describe("bmr", () => {
  it("computes male BMR", () => {
    const result = bmr(80, 180, 30, "male");
    expect(result).toBeGreaterThan(1500);
    expect(result).toBeLessThan(2500);
  });

  it("computes female BMR", () => {
    const result = bmr(60, 165, 28, "female");
    expect(result).toBeGreaterThan(1200);
    expect(result).toBeLessThan(2000);
  });
});

describe("tdee", () => {
  it("increases with activity", () => {
    const base = bmr(75, 175, 30, "male");
    const sedentary = tdee(base, "sedentary");
    const active = tdee(base, "active");
    expect(active).toBeGreaterThan(sedentary);
  });
});

describe("caloriesForGoal", () => {
  it("reduces for weight loss", () => {
    expect(caloriesForGoal(2000, "lose")).toBe(1500);
  });

  it("increases for weight gain", () => {
    expect(caloriesForGoal(2000, "gain")).toBe(2500);
  });
});

describe("macroSplit", () => {
  it("splits calories into macros", () => {
    const macros = macroSplit(2000);
    expect(macros.proteinG).toBeGreaterThan(100);
    expect(macros.carbG).toBeGreaterThan(150);
    expect(macros.fatG).toBeGreaterThan(50);
  });
});

describe("oneRepMax", () => {
  it("estimates 1RM from reps", () => {
    expect(oneRepMax(100, 5)).toBeCloseTo(116.7, 0);
  });

  it("returns weight for 1 rep", () => {
    expect(oneRepMax(100, 1)).toBe(100);
  });
});

describe("trainingMax", () => {
  it("90% of 1RM", () => {
    expect(trainingMax(200)).toBeCloseTo(180);
  });
});

describe("percentOfMax", () => {
  it("computes percentage", () => {
    expect(percentOfMax(200, 75)).toBe(150);
  });
});

describe("heartRateZones", () => {
  it("creates 5 zones", () => {
    const zones = heartRateZones(190);
    expect(zones.length).toBe(5);
    expect(zones[0].zone).toBe("Recovery");
    expect(zones[4].max).toBe(190);
  });
});

describe("maxHeartRate", () => {
  it("computes from age", () => {
    expect(maxHeartRate(30)).toBe(190);
  });
});

describe("caloriesBurned", () => {
  it("computes from MET", () => {
    const cal = caloriesBurned(MET_VALUES.running, 70, 1);
    expect(cal).toBeGreaterThan(500);
  });
});

describe("paceToSpeed / speedToPace", () => {
  it("converts pace to speed", () => {
    expect(paceToSpeed(5)).toBeCloseTo(12);
  });

  it("converts speed to pace", () => {
    expect(speedToPace(12)).toBeCloseTo(5);
  });
});

describe("bodyFatNavy", () => {
  it("estimates male body fat", () => {
    const bf = bodyFatNavy("male", 85, 38, 180);
    expect(bf).toBeGreaterThan(10);
    expect(bf).toBeLessThan(40);
  });
});

describe("idealWeight", () => {
  it("computes weight range", () => {
    const range = idealWeight(175);
    expect(range.min).toBeLessThan(range.max);
    expect(range.min).toBeGreaterThan(50);
  });
});

describe("waterIntake", () => {
  it("computes daily water", () => {
    expect(waterIntake(70)).toBeCloseTo(2.3, 0);
  });
});
