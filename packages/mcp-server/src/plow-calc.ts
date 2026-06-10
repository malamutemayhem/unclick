export type PlowType = "ard" | "moldboard" | "chisel" | "disc" | "reversible";

export function furrowDepthCm(type: PlowType): number {
  const depths: Record<PlowType, number> = {
    ard: 10, moldboard: 25, chisel: 35, disc: 20, reversible: 25,
  };
  return depths[type];
}

export function furrowWidthCm(type: PlowType): number {
  const widths: Record<PlowType, number> = {
    ard: 15, moldboard: 35, chisel: 5, disc: 30, reversible: 35,
  };
  return widths[type];
}

export function draftForceKn(type: PlowType, soilResistanceKpa: number): number {
  const areas: Record<PlowType, number> = {
    ard: 150, moldboard: 875, chisel: 175, disc: 600, reversible: 875,
  };
  return parseFloat((areas[type] * soilResistanceKpa / 10000).toFixed(1));
}

export function oxenRequired(draftForceKn: number): number {
  return Math.max(1, Math.ceil(draftForceKn / 0.8));
}

export function areaPerDayHectares(type: PlowType, hoursWorked: number): number {
  const ratesPerHour: Record<PlowType, number> = {
    ard: 0.05, moldboard: 0.1, chisel: 0.15, disc: 0.2, reversible: 0.12,
  };
  return parseFloat((ratesPerHour[type] * hoursWorked).toFixed(2));
}

export function turningRadiusM(type: PlowType): number {
  const radii: Record<PlowType, number> = {
    ard: 3, moldboard: 5, chisel: 4, disc: 6, reversible: 2,
  };
  return radii[type];
}

export function shareWeightKg(type: PlowType): number {
  const weights: Record<PlowType, number> = {
    ard: 5, moldboard: 15, chisel: 8, disc: 25, reversible: 18,
  };
  return weights[type];
}

export function sharpeningIntervalHours(type: PlowType): number {
  const hours: Record<PlowType, number> = {
    ard: 20, moldboard: 40, chisel: 30, disc: 60, reversible: 40,
  };
  return hours[type];
}

export function seedbedQuality(type: PlowType): number {
  const quality: Record<PlowType, number> = {
    ard: 4, moldboard: 8, chisel: 5, disc: 7, reversible: 9,
  };
  return quality[type];
}

export function costEstimate(type: PlowType, baseCost: number): number {
  const multipliers: Record<PlowType, number> = {
    ard: 0.5, moldboard: 1.0, chisel: 1.2, disc: 2.0, reversible: 2.5,
  };
  return parseFloat((baseCost * multipliers[type]).toFixed(2));
}

export function plowTypes(): PlowType[] {
  return ["ard", "moldboard", "chisel", "disc", "reversible"];
}
