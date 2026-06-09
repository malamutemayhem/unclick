export type BubbleType = "standard" | "giant" | "frozen" | "smoke" | "cube";
export type SolutionRecipe = "dish_soap" | "glycerin_mix" | "professional" | "sugar_mix";

export function surfaceTension(recipe: SolutionRecipe): number {
  const mNPerM: Record<SolutionRecipe, number> = {
    dish_soap: 25, glycerin_mix: 30, professional: 35, sugar_mix: 28,
  };
  return mNPerM[recipe];
}

export function bubbleDiameterCm(wandDiameterCm: number, blowForce: number): number {
  return parseFloat((wandDiameterCm * blowForce * 2).toFixed(1));
}

export function bubbleVolumeMl(diameterCm: number): number {
  const r = diameterCm / 2;
  return parseFloat(((4 / 3) * Math.PI * r * r * r).toFixed(0));
}

export function filmThicknessNm(recipe: SolutionRecipe): number {
  const nm: Record<SolutionRecipe, number> = {
    dish_soap: 500, glycerin_mix: 800, professional: 1200, sugar_mix: 700,
  };
  return nm[recipe];
}

export function lifetimeSeconds(recipe: SolutionRecipe, humidityPct: number): number {
  const base: Record<SolutionRecipe, number> = {
    dish_soap: 5, glycerin_mix: 15, professional: 30, sugar_mix: 10,
  };
  const factor = 1 + humidityPct / 100;
  return parseFloat((base[recipe] * factor).toFixed(1));
}

export function solutionRatio(recipe: SolutionRecipe): { water: number; soap: number; additive: number } {
  const ratios: Record<SolutionRecipe, { water: number; soap: number; additive: number }> = {
    dish_soap: { water: 6, soap: 1, additive: 0 },
    glycerin_mix: { water: 6, soap: 1, additive: 1 },
    professional: { water: 12, soap: 1, additive: 2 },
    sugar_mix: { water: 6, soap: 1, additive: 0.5 },
  };
  return ratios[recipe];
}

export function wandSize(bubbleType: BubbleType): number {
  const cm: Record<BubbleType, number> = {
    standard: 5, giant: 50, frozen: 3, smoke: 8, cube: 10,
  };
  return cm[bubbleType];
}

export function bubblesPerLiter(avgDiameterCm: number): number {
  if (avgDiameterCm <= 0) return 0;
  const volPerBubbleMl = (4 / 3) * Math.PI * (avgDiameterCm / 2) ** 3;
  const filmMl = volPerBubbleMl * 0.0001;
  if (filmMl <= 0) return 0;
  return Math.floor(1000 / filmMl);
}

export function freezingTemp(): number {
  return -10;
}

export function iridescenceColors(): number {
  return 7;
}

export function popVolume(diameterCm: number): string {
  if (diameterCm < 5) return "quiet";
  if (diameterCm < 20) return "soft pop";
  if (diameterCm < 50) return "audible pop";
  return "loud pop";
}

export function solutionCost(liters: number, recipe: SolutionRecipe): number {
  const costPerLiter: Record<SolutionRecipe, number> = {
    dish_soap: 0.5, glycerin_mix: 2, professional: 5, sugar_mix: 1,
  };
  return parseFloat((liters * costPerLiter[recipe]).toFixed(2));
}

export function bubbleTypes(): BubbleType[] {
  return ["standard", "giant", "frozen", "smoke", "cube"];
}
