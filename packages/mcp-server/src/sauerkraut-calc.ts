export type CabbageType = "green" | "red" | "savoy" | "napa" | "pointed";

export function saltPercentByWeight(): number {
  return 2;
}

export function saltGrams(cabbageKg: number): number {
  return Math.round(cabbageKg * 20);
}

export function fermentationTempCelsius(): number {
  return 20;
}

export function fermentationDays(cabbageType: CabbageType): number {
  const days: Record<CabbageType, number> = {
    green: 21, red: 28, savoy: 18, napa: 14, pointed: 16,
  };
  return days[cabbageType];
}

export function crunchRetention(cabbageType: CabbageType): number {
  const ratings: Record<CabbageType, number> = {
    green: 4, red: 3, savoy: 2, napa: 3, pointed: 4,
  };
  return ratings[cabbageType];
}

export function flavorComplexity(cabbageType: CabbageType): number {
  const ratings: Record<CabbageType, number> = {
    green: 3, red: 4, savoy: 3, napa: 4, pointed: 3,
  };
  return ratings[cabbageType];
}

export function jarSizeLiters(cabbageKg: number): number {
  return parseFloat((cabbageKg * 1.5).toFixed(1));
}

export function shelfLifeMonths(): number {
  return 12;
}

export function costPerKg(cabbageType: CabbageType): number {
  const costs: Record<CabbageType, number> = {
    green: 1, red: 1.5, savoy: 2, napa: 2.5, pointed: 1.5,
  };
  return costs[cabbageType];
}

export function cabbageTypes(): CabbageType[] {
  return ["green", "red", "savoy", "napa", "pointed"];
}
