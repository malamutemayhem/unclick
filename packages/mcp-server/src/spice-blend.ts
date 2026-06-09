export type SpiceUnit = "tsp" | "tbsp" | "g" | "oz";
export type HeatLevel = "none" | "mild" | "medium" | "hot" | "extreme";

export interface SpiceIngredient {
  name: string;
  amount: number;
  unit: SpiceUnit;
}

export function tspToG(tsp: number): number {
  return parseFloat((tsp * 2.5).toFixed(1));
}

export function gToTsp(grams: number): number {
  return parseFloat((grams / 2.5).toFixed(1));
}

export function tbspToTsp(tbsp: number): number {
  return tbsp * 3;
}

export function ozToG(oz: number): number {
  return parseFloat((oz * 28.35).toFixed(1));
}

export function scaleBatch(ingredients: SpiceIngredient[], multiplier: number): SpiceIngredient[] {
  return ingredients.map(i => ({
    ...i,
    amount: parseFloat((i.amount * multiplier).toFixed(2)),
  }));
}

export function totalWeight(ingredients: SpiceIngredient[]): number {
  let totalG = 0;
  for (const i of ingredients) {
    switch (i.unit) {
      case "tsp": totalG += tspToG(i.amount); break;
      case "tbsp": totalG += tspToG(tbspToTsp(i.amount)); break;
      case "g": totalG += i.amount; break;
      case "oz": totalG += ozToG(i.amount); break;
    }
  }
  return parseFloat(totalG.toFixed(1));
}

export function percentages(ingredients: SpiceIngredient[]): { name: string; percent: number }[] {
  const total = totalWeight(ingredients);
  if (total === 0) return ingredients.map(i => ({ name: i.name, percent: 0 }));
  return ingredients.map(i => {
    let g: number;
    switch (i.unit) {
      case "tsp": g = tspToG(i.amount); break;
      case "tbsp": g = tspToG(tbspToTsp(i.amount)); break;
      case "g": g = i.amount; break;
      case "oz": g = ozToG(i.amount); break;
    }
    return { name: i.name, percent: parseFloat((g / total * 100).toFixed(1)) };
  });
}

export function shelfLifeMonths(isGround: boolean): number {
  return isGround ? 6 : 24;
}

export function scovilleCategory(shu: number): HeatLevel {
  if (shu === 0) return "none";
  if (shu < 2500) return "mild";
  if (shu < 30000) return "medium";
  if (shu < 100000) return "hot";
  return "extreme";
}

export function toastingTime(spice: "cumin" | "coriander" | "mustard" | "fennel" | "cardamom"): number {
  const seconds: Record<string, number> = {
    cumin: 120,
    coriander: 90,
    mustard: 60,
    fennel: 120,
    cardamom: 90,
  };
  return seconds[spice];
}

export function substitutionRatio(from: "dried" | "fresh", to: "dried" | "fresh"): number {
  if (from === "dried" && to === "fresh") return 3;
  if (from === "fresh" && to === "dried") return 0.33;
  return 1;
}

export function curryPowder(): SpiceIngredient[] {
  return [
    { name: "turmeric", amount: 2, unit: "tbsp" },
    { name: "coriander", amount: 2, unit: "tbsp" },
    { name: "cumin", amount: 1, unit: "tbsp" },
    { name: "fenugreek", amount: 1, unit: "tsp" },
    { name: "chili", amount: 1, unit: "tsp" },
    { name: "ginger", amount: 1, unit: "tsp" },
    { name: "black pepper", amount: 1, unit: "tsp" },
  ];
}

export function garamMasala(): SpiceIngredient[] {
  return [
    { name: "cumin", amount: 2, unit: "tbsp" },
    { name: "coriander", amount: 2, unit: "tbsp" },
    { name: "cardamom", amount: 1, unit: "tbsp" },
    { name: "cinnamon", amount: 1, unit: "tsp" },
    { name: "cloves", amount: 0.5, unit: "tsp" },
    { name: "black pepper", amount: 1, unit: "tsp" },
    { name: "nutmeg", amount: 0.5, unit: "tsp" },
  ];
}

export function heatLevels(): HeatLevel[] {
  return ["none", "mild", "medium", "hot", "extreme"];
}
