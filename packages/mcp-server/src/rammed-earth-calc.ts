export type SoilMix = "sandy_loam" | "clay_loam" | "laterite" | "stabilized" | "chalky";

export function wallThicknessCm(heightM: number): number {
  return Math.round(heightM * 15 + 30);
}

export function compactionLayers(heightM: number): number {
  return Math.round(heightM * 100 / 15);
}

export function moistureContentPercent(mix: SoilMix): number {
  const moisture: Record<SoilMix, number> = {
    sandy_loam: 10, clay_loam: 14, laterite: 12, stabilized: 11, chalky: 13,
  };
  return moisture[mix];
}

export function compressiveStrengthMpa(mix: SoilMix): number {
  const strength: Record<SoilMix, number> = {
    sandy_loam: 1.5, clay_loam: 2.0, laterite: 2.5, stabilized: 4.0, chalky: 1.0,
  };
  return strength[mix];
}

export function dryingTimeDays(wallThicknessCmVal: number): number {
  return Math.round(wallThicknessCmVal * 2);
}

export function thermalMassKjPerM3K(mix: SoilMix): number {
  const mass: Record<SoilMix, number> = {
    sandy_loam: 1500, clay_loam: 1800, laterite: 1700, stabilized: 1600, chalky: 1400,
  };
  return mass[mix];
}

export function shrinkagePercent(mix: SoilMix): number {
  const shrinkage: Record<SoilMix, number> = {
    sandy_loam: 1, clay_loam: 3, laterite: 2, stabilized: 0.5, chalky: 2,
  };
  return shrinkage[mix];
}

export function erosionResistance(mix: SoilMix): number {
  const ratings: Record<SoilMix, number> = {
    sandy_loam: 2, clay_loam: 3, laterite: 4, stabilized: 5, chalky: 1,
  };
  return ratings[mix];
}

export function costPerM3(mix: SoilMix): number {
  const costs: Record<SoilMix, number> = {
    sandy_loam: 30, clay_loam: 35, laterite: 40, stabilized: 60, chalky: 25,
  };
  return costs[mix];
}

export function soilMixes(): SoilMix[] {
  return ["sandy_loam", "clay_loam", "laterite", "stabilized", "chalky"];
}
