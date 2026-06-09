export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingSizeG: number;
}

export interface MealPlan {
  meals: { name: string; items: FoodItem[] }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface DailyTarget {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const FOODS: FoodItem[] = [
  { name: "chicken breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, servingSizeG: 100 },
  { name: "brown rice", calories: 123, protein: 2.7, carbs: 25.6, fat: 1, fiber: 1.6, servingSizeG: 100 },
  { name: "broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, servingSizeG: 100 },
  { name: "salmon", calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, servingSizeG: 100 },
  { name: "egg", calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, servingSizeG: 100 },
  { name: "banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, servingSizeG: 100 },
  { name: "oats", calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 11, servingSizeG: 100 },
  { name: "sweet potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, servingSizeG: 100 },
  { name: "greek yogurt", calories: 97, protein: 9, carbs: 3.6, fat: 5, fiber: 0, servingSizeG: 100 },
  { name: "almonds", calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, servingSizeG: 100 },
  { name: "avocado", calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, servingSizeG: 100 },
  { name: "tofu", calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, servingSizeG: 100 },
  { name: "lentils", calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, servingSizeG: 100 },
  { name: "spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, servingSizeG: 100 },
  { name: "quinoa", calories: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8, servingSizeG: 100 },
];

export function getFood(name: string): FoodItem | null {
  return FOODS.find(f => f.name.toLowerCase() === name.toLowerCase()) ?? null;
}

export function scaleServing(food: FoodItem, grams: number): FoodItem {
  const factor = grams / food.servingSizeG;
  return {
    name: food.name,
    calories: Math.round(food.calories * factor),
    protein: parseFloat((food.protein * factor).toFixed(1)),
    carbs: parseFloat((food.carbs * factor).toFixed(1)),
    fat: parseFloat((food.fat * factor).toFixed(1)),
    fiber: parseFloat((food.fiber * factor).toFixed(1)),
    servingSizeG: grams,
  };
}

export function totalCalories(items: FoodItem[]): number {
  return items.reduce((sum, item) => sum + item.calories, 0);
}

export function totalMacros(items: FoodItem[]): { protein: number; carbs: number; fat: number; fiber: number } {
  return {
    protein: parseFloat(items.reduce((s, i) => s + i.protein, 0).toFixed(1)),
    carbs: parseFloat(items.reduce((s, i) => s + i.carbs, 0).toFixed(1)),
    fat: parseFloat(items.reduce((s, i) => s + i.fat, 0).toFixed(1)),
    fiber: parseFloat(items.reduce((s, i) => s + i.fiber, 0).toFixed(1)),
  };
}

export function macroPercentages(items: FoodItem[]): { protein: number; carbs: number; fat: number } {
  const macros = totalMacros(items);
  const totalCal = macros.protein * 4 + macros.carbs * 4 + macros.fat * 9;
  if (totalCal === 0) return { protein: 0, carbs: 0, fat: 0 };
  return {
    protein: parseFloat(((macros.protein * 4 / totalCal) * 100).toFixed(1)),
    carbs: parseFloat(((macros.carbs * 4 / totalCal) * 100).toFixed(1)),
    fat: parseFloat(((macros.fat * 9 / totalCal) * 100).toFixed(1)),
  };
}

export function dailyTarget(weightKg: number, goal: "lose" | "maintain" | "gain", activityLevel: number = 1.55): DailyTarget {
  const bmr = 10 * weightKg + 625 - 5 * 30 + 5;
  const tdee = bmr * activityLevel;
  let calories: number;
  if (goal === "lose") calories = tdee - 500;
  else if (goal === "gain") calories = tdee + 300;
  else calories = tdee;
  calories = Math.round(calories);
  return {
    calories,
    protein: Math.round(weightKg * (goal === "gain" ? 2.2 : 1.8)),
    carbs: Math.round((calories * 0.45) / 4),
    fat: Math.round((calories * 0.25) / 9),
  };
}

export function remainingCalories(target: DailyTarget, consumed: FoodItem[]): number {
  return target.calories - totalCalories(consumed);
}

export function remainingMacros(target: DailyTarget, consumed: FoodItem[]): { protein: number; carbs: number; fat: number } {
  const macros = totalMacros(consumed);
  return {
    protein: parseFloat((target.protein - macros.protein).toFixed(1)),
    carbs: parseFloat((target.carbs - macros.carbs).toFixed(1)),
    fat: parseFloat((target.fat - macros.fat).toFixed(1)),
  };
}

export function caloriesFromMacros(protein: number, carbs: number, fat: number): number {
  return Math.round(protein * 4 + carbs * 4 + fat * 9);
}

export function calorieDeficit(target: number, consumed: number, burned: number): number {
  return target - consumed + burned;
}

export function weightChangePerWeek(dailyDeficit: number): number {
  return parseFloat((dailyDeficit * 7 / 7700).toFixed(2));
}

export function daysToGoal(currentKg: number, goalKg: number, dailyDeficit: number): number {
  if (dailyDeficit === 0) return Infinity;
  const totalDeficit = Math.abs(currentKg - goalKg) * 7700;
  return Math.ceil(totalDeficit / Math.abs(dailyDeficit));
}

export function mealSummary(items: FoodItem[]): string {
  const cal = totalCalories(items);
  const macros = totalMacros(items);
  return `${cal} cal | P:${macros.protein}g C:${macros.carbs}g F:${macros.fat}g`;
}
