export type LogSpecies = "cedar" | "pine" | "spruce" | "oak" | "poplar";

export function logLengthCm(wallThicknessCm: number): number {
  return wallThicknessCm;
}

export function logDiameterRangeCm(): { min: number; max: number } {
  return { min: 5, max: 25 };
}

export function mortarThicknessCm(): number {
  return 2.5;
}

export function insulationCavityWidthCm(wallThicknessCm: number): number {
  return Math.round(wallThicknessCm * 0.4);
}

export function rValuePerCm(species: LogSpecies): number {
  const r: Record<LogSpecies, number> = {
    cedar: 0.12, pine: 0.09, spruce: 0.10, oak: 0.06, poplar: 0.08,
  };
  return r[species];
}

export function shrinkagePercent(species: LogSpecies): number {
  const s: Record<LogSpecies, number> = {
    cedar: 2, pine: 4, spruce: 3.5, oak: 5, poplar: 4.5,
  };
  return s[species];
}

export function seasoningMonths(species: LogSpecies): number {
  const months: Record<LogSpecies, number> = {
    cedar: 6, pine: 12, spruce: 10, oak: 24, poplar: 8,
  };
  return months[species];
}

export function logsPerM2Wall(avgDiameterCm: number): number {
  if (avgDiameterCm <= 0) return 0;
  const areaPerLog = Math.PI * (avgDiameterCm / 200) ** 2;
  return Math.ceil(1 / areaPerLog);
}

export function costPerM2(species: LogSpecies): number {
  const costs: Record<LogSpecies, number> = {
    cedar: 45, pine: 25, spruce: 30, oak: 60, poplar: 20,
  };
  return costs[species];
}

export function logSpeciesList(): LogSpecies[] {
  return ["cedar", "pine", "spruce", "oak", "poplar"];
}
