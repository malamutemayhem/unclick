export type SmokeType = "cold" | "hot" | "liquid" | "pit" | "hanging";

export function temperatureCelsius(type: SmokeType): { min: number; max: number } {
  const temps: Record<SmokeType, { min: number; max: number }> = {
    cold: { min: 15, max: 30 },
    hot: { min: 50, max: 90 },
    liquid: { min: 20, max: 25 },
    pit: { min: 80, max: 120 },
    hanging: { min: 20, max: 35 },
  };
  return temps[type];
}

export function smokingTimeHours(type: SmokeType): number {
  const hours: Record<SmokeType, number> = {
    cold: 48, hot: 6, liquid: 0.5, pit: 12, hanging: 72,
  };
  return hours[type];
}

export function woodChipsKg(productKg: number): number {
  return parseFloat((productKg * 0.3).toFixed(1));
}

export function bestWoodSpecies(type: SmokeType): string {
  const species: Record<SmokeType, string> = {
    cold: "oak", hot: "hickory", liquid: "mesquite", pit: "apple", hanging: "beech",
  };
  return species[type];
}

export function moistureLossPercent(type: SmokeType): number {
  const loss: Record<SmokeType, number> = {
    cold: 15, hot: 25, liquid: 5, pit: 30, hanging: 20,
  };
  return loss[type];
}

export function shelfLifeDays(type: SmokeType): number {
  const days: Record<SmokeType, number> = {
    cold: 60, hot: 14, liquid: 7, pit: 10, hanging: 90,
  };
  return days[type];
}

export function saltPretreatmentG(productKg: number): number {
  return Math.round(productKg * 25);
}

export function chamberVolumeLiters(productKg: number): number {
  return Math.round(productKg * 5);
}

export function costPerKg(type: SmokeType): number {
  const costs: Record<SmokeType, number> = {
    cold: 8, hot: 5, liquid: 3, pit: 6, hanging: 10,
  };
  return costs[type];
}

export function smokeTypes(): SmokeType[] {
  return ["cold", "hot", "liquid", "pit", "hanging"];
}
