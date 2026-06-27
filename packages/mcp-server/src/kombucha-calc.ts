export type FlavorCategory = "fruit" | "herb" | "spice" | "floral" | "citrus";

export interface BrewSpec {
  batchLiters: number;
  teaGrams: number;
  sugarGrams: number;
  starterMl: number;
  fermentDays: number;
  tempC: number;
}

export function teaAmount(batchLiters: number): number {
  return parseFloat((batchLiters * 8).toFixed(0));
}

export function sugarAmount(batchLiters: number): number {
  return parseFloat((batchLiters * 70).toFixed(0));
}

export function starterLiquid(batchLiters: number): number {
  return parseFloat((batchLiters * 0.1 * 1000).toFixed(0));
}

export function waterAmount(batchLiters: number, starterMl: number): number {
  return parseFloat((batchLiters * 1000 - starterMl).toFixed(0));
}

export function fermentTemp(): { min: number; max: number; ideal: number } {
  return { min: 20, max: 30, ideal: 24 };
}

export function firstFermentDays(tempC: number): number {
  if (tempC < 20) return 14;
  if (tempC < 24) return 10;
  if (tempC < 28) return 7;
  return 5;
}

export function secondFermentDays(): { min: number; max: number } {
  return { min: 2, max: 4 };
}

export function carbonationPressure(sugarGPerBottle: number, tempC: number): number {
  const base = sugarGPerBottle * 0.5;
  const tempFactor = 1 + (tempC - 20) * 0.05;
  return parseFloat((base * tempFactor).toFixed(1));
}

export function bottlesNeeded(batchMl: number, bottleMl: number = 500): number {
  return Math.ceil(batchMl / bottleMl);
}

export function flavorAmount(bottleMl: number, category: FlavorCategory): number {
  const percent: Record<FlavorCategory, number> = {
    fruit: 20,
    herb: 5,
    spice: 3,
    floral: 5,
    citrus: 10,
  };
  return parseFloat((bottleMl * percent[category] / 100).toFixed(0));
}

export function sugarPerBottle(bottleMl: number, tspPerBottle: number = 1): number {
  return parseFloat((tspPerBottle * 4).toFixed(0));
}

export function phTarget(): { min: number; max: number; ready: number } {
  return { min: 2.5, max: 3.5, ready: 3.0 };
}

export function alcoholEstimate(startingSugarG: number, batchMl: number): number {
  const sugarConsumed = startingSugarG * 0.6;
  const alcoholG = sugarConsumed * 0.51;
  const abv = alcoholG / (batchMl * 0.789) * 100;
  return parseFloat(abv.toFixed(1));
}

export function scobyHealth(thicknessCm: number, color: "cream" | "brown" | "dark" | "green"): string {
  if (color === "green") return "contaminated";
  if (color === "dark") return "old";
  if (thicknessCm < 0.3) return "thin";
  if (thicknessCm > 2) return "thick";
  return "healthy";
}

export function brewCycle(): { stepDays: { step: string; days: number }[] } {
  return {
    stepDays: [
      { step: "brew tea", days: 0 },
      { step: "cool and add starter", days: 0 },
      { step: "first ferment", days: 7 },
      { step: "bottle with flavoring", days: 7 },
      { step: "second ferment", days: 10 },
      { step: "refrigerate", days: 11 },
    ],
  };
}

export function costPerLiter(teaCostPerG: number, sugarCostPerG: number, batchLiters: number): number {
  const tea = teaAmount(batchLiters) * teaCostPerG;
  const sugar = sugarAmount(batchLiters) * sugarCostPerG;
  return parseFloat(((tea + sugar) / batchLiters).toFixed(2));
}

export function batchScale(currentLiters: number, targetLiters: number, ingredientAmount: number): number {
  if (currentLiters === 0) return 0;
  return parseFloat((ingredientAmount * targetLiters / currentLiters).toFixed(1));
}

export function flavorCategories(): FlavorCategory[] {
  return ["fruit", "herb", "spice", "floral", "citrus"];
}
