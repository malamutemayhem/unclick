export type CobMix = "sandy_clay" | "heavy_clay" | "chalky" | "gravelly" | "loam";

export function wallThicknessCm(storeys: number): number {
  return Math.round(40 + storeys * 15);
}

export function liftHeightCm(): number {
  return 30;
}

export function dryingDaysPerLift(humidity: "low" | "medium" | "high"): number {
  const days: Record<string, number> = { low: 3, medium: 5, high: 8 };
  return days[humidity];
}

export function strawRatioPercent(mix: CobMix): number {
  const ratios: Record<CobMix, number> = {
    sandy_clay: 15, heavy_clay: 20, chalky: 10, gravelly: 12, loam: 18,
  };
  return ratios[mix];
}

export function waterContentPercent(mix: CobMix): number {
  const water: Record<CobMix, number> = {
    sandy_clay: 18, heavy_clay: 22, chalky: 15, gravelly: 14, loam: 20,
  };
  return water[mix];
}

export function compressiveStrengthMpa(mix: CobMix): number {
  const strength: Record<CobMix, number> = {
    sandy_clay: 1.2, heavy_clay: 0.8, chalky: 1.5, gravelly: 1.8, loam: 1.0,
  };
  return strength[mix];
}

export function thermalMassKjPerM3K(): number {
  return 1300;
}

export function volumePerMeterM3(thicknessCm: number, heightM: number): number {
  return parseFloat((thicknessCm / 100 * heightM * 1).toFixed(2));
}

export function costPerM3(mix: CobMix): number {
  const costs: Record<CobMix, number> = {
    sandy_clay: 30, heavy_clay: 25, chalky: 35, gravelly: 28, loam: 32,
  };
  return costs[mix];
}

export function cobMixes(): CobMix[] {
  return ["sandy_clay", "heavy_clay", "chalky", "gravelly", "loam"];
}
