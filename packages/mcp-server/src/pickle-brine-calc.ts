export type PickleBrine = "salt_water" | "vinegar" | "rice_vinegar" | "lime_juice" | "whey";

export function acidityPh(brine: PickleBrine): number {
  const m: Record<PickleBrine, number> = {
    salt_water: 4.6, vinegar: 2.4, rice_vinegar: 3.0, lime_juice: 2.2, whey: 4.0,
  };
  return m[brine];
}

export function shelfLifeMonths(brine: PickleBrine): number {
  const m: Record<PickleBrine, number> = {
    salt_water: 6, vinegar: 12, rice_vinegar: 8, lime_juice: 3, whey: 2,
  };
  return m[brine];
}

export function flavorIntensity(brine: PickleBrine): number {
  const m: Record<PickleBrine, number> = {
    salt_water: 4, vinegar: 8, rice_vinegar: 5, lime_juice: 7, whey: 6,
  };
  return m[brine];
}

export function crunchRetention(brine: PickleBrine): number {
  const m: Record<PickleBrine, number> = {
    salt_water: 8, vinegar: 6, rice_vinegar: 7, lime_juice: 5, whey: 9,
  };
  return m[brine];
}

export function probioticContent(brine: PickleBrine): number {
  const m: Record<PickleBrine, number> = {
    salt_water: 8, vinegar: 1, rice_vinegar: 2, lime_juice: 1, whey: 9,
  };
  return m[brine];
}

export function fermented(brine: PickleBrine): boolean {
  const m: Record<PickleBrine, boolean> = {
    salt_water: true, vinegar: false, rice_vinegar: false, lime_juice: false, whey: true,
  };
  return m[brine];
}

export function heatProcessed(brine: PickleBrine): boolean {
  const m: Record<PickleBrine, boolean> = {
    salt_water: false, vinegar: true, rice_vinegar: true, lime_juice: false, whey: false,
  };
  return m[brine];
}

export function bestVegetable(brine: PickleBrine): string {
  const m: Record<PickleBrine, string> = {
    salt_water: "cucumber", vinegar: "onion", rice_vinegar: "ginger",
    lime_juice: "ceviche_fish", whey: "cabbage",
  };
  return m[brine];
}

export function costPerLiter(brine: PickleBrine): number {
  const m: Record<PickleBrine, number> = {
    salt_water: 0.5, vinegar: 2, rice_vinegar: 4, lime_juice: 6, whey: 1,
  };
  return m[brine];
}

export function pickleBrines(): PickleBrine[] {
  return ["salt_water", "vinegar", "rice_vinegar", "lime_juice", "whey"];
}
