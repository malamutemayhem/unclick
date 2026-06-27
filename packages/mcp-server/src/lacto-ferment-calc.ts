export type FermentVegetable = "cabbage" | "cucumber" | "carrot" | "radish" | "pepper";

export function brinePercentByWeight(veggie: FermentVegetable): number {
  const pcts: Record<FermentVegetable, number> = {
    cabbage: 2, cucumber: 5, carrot: 3.5, radish: 3, pepper: 4,
  };
  return pcts[veggie];
}

export function fermentationTempCelsius(): { min: number; max: number } {
  return { min: 18, max: 24 };
}

export function fermentationDays(veggie: FermentVegetable): number {
  const days: Record<FermentVegetable, number> = {
    cabbage: 21, cucumber: 5, carrot: 7, radish: 4, pepper: 14,
  };
  return days[veggie];
}

export function phTarget(): number {
  return 3.5;
}

export function crunchRetention(veggie: FermentVegetable): number {
  const retention: Record<FermentVegetable, number> = {
    cabbage: 3, cucumber: 4, carrot: 5, radish: 4, pepper: 3,
  };
  return retention[veggie];
}

export function probioticLevel(veggie: FermentVegetable): number {
  const levels: Record<FermentVegetable, number> = {
    cabbage: 5, cucumber: 4, carrot: 3, radish: 3, pepper: 4,
  };
  return levels[veggie];
}

export function flavorComplexity(veggie: FermentVegetable): number {
  const complexity: Record<FermentVegetable, number> = {
    cabbage: 5, cucumber: 3, carrot: 3, radish: 4, pepper: 5,
  };
  return complexity[veggie];
}

export function shelfLifeMonths(): number {
  return 12;
}

export function costPerKg(veggie: FermentVegetable): number {
  const costs: Record<FermentVegetable, number> = {
    cabbage: 2, cucumber: 3, carrot: 2.5, radish: 3, pepper: 4,
  };
  return costs[veggie];
}

export function fermentVegetables(): FermentVegetable[] {
  return ["cabbage", "cucumber", "carrot", "radish", "pepper"];
}
