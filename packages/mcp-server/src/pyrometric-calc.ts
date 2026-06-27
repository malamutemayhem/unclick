export type ConeType = "orton" | "seger" | "bullers" | "stafford" | "holdcroft";

export function peakTempCelsius(cone: ConeType, coneNumber: number): number {
  const bases: Record<ConeType, number> = {
    orton: 600, seger: 590, bullers: 580, stafford: 570, holdcroft: 575,
  };
  return bases[cone] + coneNumber * 30;
}

export function bendAngleDeg(heatworkPercent: number): number {
  return Math.min(90, Math.round(heatworkPercent * 0.9));
}

export function soakTimeMinutes(coneNumber: number): number {
  return Math.max(5, Math.round(coneNumber * 2.5));
}

export function rampRateCelsiusPerHour(coneNumber: number): number {
  if (coneNumber <= 0) return 100;
  return Math.round(150 - coneNumber * 5);
}

export function placementDepthMm(coneType: ConeType): number {
  const depths: Record<ConeType, number> = {
    orton: 25, seger: 20, bullers: 15, stafford: 22, holdcroft: 18,
  };
  return depths[coneType];
}

export function mountingAngleDeg(): number {
  return 8;
}

export function conesPerFiring(): number {
  return 3;
}

export function accuracyPlusMinus(coneType: ConeType): number {
  const accuracy: Record<ConeType, number> = {
    orton: 5, seger: 8, bullers: 10, stafford: 12, holdcroft: 10,
  };
  return accuracy[coneType];
}

export function costPerBox(coneType: ConeType): number {
  const costs: Record<ConeType, number> = {
    orton: 15, seger: 20, bullers: 18, stafford: 12, holdcroft: 14,
  };
  return costs[coneType];
}

export function coneTypes(): ConeType[] {
  return ["orton", "seger", "bullers", "stafford", "holdcroft"];
}
