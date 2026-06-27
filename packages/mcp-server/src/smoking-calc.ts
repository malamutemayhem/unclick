export type WoodChip = "hickory" | "mesquite" | "apple" | "cherry" | "oak";

export function smokeTempCelsius(cold: boolean): number {
  return cold ? 25 : 110;
}

export function smokeTimeHoursPerKg(cold: boolean): number {
  return cold ? 24 : 1.5;
}

export function flavorIntensity(wood: WoodChip): number {
  const intensity: Record<WoodChip, number> = {
    hickory: 5, mesquite: 5, apple: 2, cherry: 3, oak: 4,
  };
  return intensity[wood];
}

export function sweetness(wood: WoodChip): number {
  const sweet: Record<WoodChip, number> = {
    hickory: 2, mesquite: 1, apple: 5, cherry: 4, oak: 2,
  };
  return sweet[wood];
}

export function woodChipsGPerHour(wood: WoodChip): number {
  const gph: Record<WoodChip, number> = {
    hickory: 50, mesquite: 40, apple: 60, cherry: 55, oak: 45,
  };
  return gph[wood];
}

export function internalTempTargetCelsius(poultry: boolean): number {
  return poultry ? 74 : 63;
}

export function moistureLossPercent(cold: boolean): number {
  return cold ? 15 : 30;
}

export function shelfLifeDays(cold: boolean): number {
  return cold ? 14 : 7;
}

export function costPerKg(wood: WoodChip): number {
  const costs: Record<WoodChip, number> = {
    hickory: 8, mesquite: 10, apple: 12, cherry: 14, oak: 7,
  };
  return costs[wood];
}

export function woodChips(): WoodChip[] {
  return ["hickory", "mesquite", "apple", "cherry", "oak"];
}
