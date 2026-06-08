export interface NutrientProfile {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface DailyTarget {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export class NutritionCalc {
  static macroCalories(protein: number, carbs: number, fat: number): number {
    return Math.round((protein * 4 + carbs * 4 + fat * 9) * 100) / 100;
  }

  static macroPercentages(profile: NutrientProfile): { protein: number; carbs: number; fat: number } {
    const total = NutritionCalc.macroCalories(profile.protein, profile.carbs, profile.fat);
    if (total === 0) return { protein: 0, carbs: 0, fat: 0 };
    return {
      protein: Math.round((profile.protein * 4 / total) * 1000) / 10,
      carbs: Math.round((profile.carbs * 4 / total) * 1000) / 10,
      fat: Math.round((profile.fat * 9 / total) * 1000) / 10,
    };
  }

  static bmr(weightKg: number, heightCm: number, age: number, isMale: boolean): number {
    if (isMale) {
      return Math.round(88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age);
    }
    return Math.round(447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age);
  }

  static tdee(bmr: number, activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active"): number {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    return Math.round(bmr * multipliers[activityLevel]);
  }

  static dailyTargets(
    tdee: number,
    goal: "maintain" | "lose" | "gain",
    proteinPerKg: number = 1.6,
    weightKg: number = 70,
  ): DailyTarget {
    const adjustments = { maintain: 0, lose: -500, gain: 500 };
    const calories = tdee + adjustments[goal];
    const protein = Math.round(proteinPerKg * weightKg);
    const fat = Math.round(calories * 0.25 / 9);
    const remainingCals = calories - protein * 4 - fat * 9;
    const carbs = Math.round(Math.max(0, remainingCals) / 4);
    return { calories, protein, carbs, fat };
  }

  static scaleServings(profile: NutrientProfile, originalServings: number, targetServings: number): NutrientProfile {
    const ratio = targetServings / originalServings;
    return {
      calories: Math.round(profile.calories * ratio * 100) / 100,
      protein: Math.round(profile.protein * ratio * 100) / 100,
      carbs: Math.round(profile.carbs * ratio * 100) / 100,
      fat: Math.round(profile.fat * ratio * 100) / 100,
      fiber: profile.fiber ? Math.round(profile.fiber * ratio * 100) / 100 : undefined,
    };
  }

  static combineMeals(meals: NutrientProfile[]): NutrientProfile {
    return {
      calories: Math.round(meals.reduce((s, m) => s + m.calories, 0) * 100) / 100,
      protein: Math.round(meals.reduce((s, m) => s + m.protein, 0) * 100) / 100,
      carbs: Math.round(meals.reduce((s, m) => s + m.carbs, 0) * 100) / 100,
      fat: Math.round(meals.reduce((s, m) => s + m.fat, 0) * 100) / 100,
      fiber: Math.round(meals.reduce((s, m) => s + (m.fiber || 0), 0) * 100) / 100,
    };
  }

  static remaining(consumed: NutrientProfile, target: DailyTarget): DailyTarget {
    return {
      calories: Math.round(target.calories - consumed.calories),
      protein: Math.round(target.protein - consumed.protein),
      carbs: Math.round(target.carbs - consumed.carbs),
      fat: Math.round(target.fat - consumed.fat),
    };
  }

  static bmi(weightKg: number, heightCm: number): { bmi: number; category: string } {
    const heightM = heightCm / 100;
    const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;
    let category: string;
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
    return { bmi, category };
  }
}
