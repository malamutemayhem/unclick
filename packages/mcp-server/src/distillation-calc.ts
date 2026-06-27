export type StillType = "alembic" | "retort" | "pot" | "column" | "steam";

export function boilingPointCelsius(substance: "water" | "ethanol" | "essential_oil"): number {
  const temps: Record<string, number> = { water: 100, ethanol: 78.4, essential_oil: 150 };
  return temps[substance];
}

export function yieldPercent(stillType: StillType): number {
  const yields: Record<StillType, number> = {
    alembic: 15, retort: 12, pot: 18, column: 25, steam: 2,
  };
  return yields[stillType];
}

export function heatingTimeMinutes(volumeLiters: number): number {
  return Math.round(volumeLiters * 8);
}

export function condenserLengthCm(stillType: StillType): number {
  const lengths: Record<StillType, number> = {
    alembic: 80, retort: 60, pot: 100, column: 150, steam: 120,
  };
  return lengths[stillType];
}

export function coolingWaterLitersPerHour(stillType: StillType): number {
  const liters: Record<StillType, number> = {
    alembic: 30, retort: 20, pot: 40, column: 60, steam: 50,
  };
  return liters[stillType];
}

export function foreshotsPercent(): number {
  return 5;
}

export function headsPercent(): number {
  return 20;
}

export function heartsPercent(): number {
  return 30;
}

export function tailsPercent(): number {
  return 45;
}

export function stillTypes(): StillType[] {
  return ["alembic", "retort", "pot", "column", "steam"];
}
