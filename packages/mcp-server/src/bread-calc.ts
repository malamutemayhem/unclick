export type BreadType = "sourdough" | "baguette" | "ciabatta" | "brioche" | "rye" | "whole_wheat" | "focaccia";

export function flourWeight(doughWeightG: number, hydrationPercent: number): number {
  return Math.round(doughWeightG / (1 + hydrationPercent / 100));
}

export function waterWeight(flourG: number, hydrationPercent: number): number {
  return Math.round(flourG * hydrationPercent / 100);
}

export function saltWeight(flourG: number, saltPercent: number = 2): number {
  return parseFloat((flourG * saltPercent / 100).toFixed(1));
}

export function yeastWeight(flourG: number, type: "instant" | "active" | "fresh"): number {
  const percent: Record<string, number> = { instant: 0.8, active: 1.0, fresh: 2.5 };
  return parseFloat((flourG * (percent[type] ?? 1) / 100).toFixed(1));
}

export function starterWeight(flourG: number, starterPercent: number = 20): number {
  return Math.round(flourG * starterPercent / 100);
}

export function hydrationPercent(type: BreadType): number {
  const hydration: Record<BreadType, number> = {
    sourdough: 75,
    baguette: 65,
    ciabatta: 80,
    brioche: 55,
    rye: 70,
    whole_wheat: 72,
    focaccia: 78,
  };
  return hydration[type];
}

export function bulkFermentTime(tempC: number, type: "yeast" | "sourdough"): number {
  const baseHours = type === "sourdough" ? 4 : 1.5;
  const factor = Math.pow(2, (25 - tempC) / 8);
  return parseFloat((baseHours * factor).toFixed(1));
}

export function proofTime(tempC: number): number {
  const baseMinutes = 60;
  const factor = Math.pow(2, (25 - tempC) / 8);
  return Math.round(baseMinutes * factor);
}

export function ovenTemp(type: BreadType): number {
  const temps: Record<BreadType, number> = {
    sourdough: 240,
    baguette: 250,
    ciabatta: 230,
    brioche: 190,
    rye: 200,
    whole_wheat: 210,
    focaccia: 220,
  };
  return temps[type];
}

export function bakeTime(doughWeightG: number, type: BreadType): number {
  const baseMinutes: Record<BreadType, number> = {
    sourdough: 40,
    baguette: 25,
    ciabatta: 25,
    brioche: 30,
    rye: 45,
    whole_wheat: 35,
    focaccia: 20,
  };
  const weightFactor = doughWeightG / 500;
  return Math.round(baseMinutes[type] * Math.sqrt(weightFactor));
}

export function scaleBatch(originalG: number, servings: number, originalServings: number = 1): number {
  return Math.round(originalG * servings / originalServings);
}

export function bakersPercent(ingredientG: number, flourG: number): number {
  if (flourG === 0) return 0;
  return parseFloat((ingredientG / flourG * 100).toFixed(1));
}

export function doughTemperature(flourTempC: number, waterTempC: number, roomTempC: number): number {
  return parseFloat(((flourTempC + waterTempC + roomTempC) / 3).toFixed(1));
}

export function desiredWaterTemp(targetDoughC: number, flourC: number, roomC: number): number {
  return parseFloat((targetDoughC * 3 - flourC - roomC).toFixed(1));
}

export function loafCount(totalDoughG: number, loafG: number): number {
  return Math.floor(totalDoughG / loafG);
}

export function steamDuration(): number {
  return 15;
}

export function breadTypes(): BreadType[] {
  return ["sourdough", "baguette", "ciabatta", "brioche", "rye", "whole_wheat", "focaccia"];
}
