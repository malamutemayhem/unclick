export type AnchorType = "admiralty" | "danforth" | "plow" | "mushroom" | "grapnel";

export function weightKg(displacementTonnes: number, type: AnchorType): number {
  const ratios: Record<AnchorType, number> = {
    admiralty: 1.5, danforth: 0.8, plow: 1.0, mushroom: 2.0, grapnel: 0.6,
  };
  return parseFloat((displacementTonnes * ratios[type]).toFixed(1));
}

export function flukeAreaCm2(weightKg: number): number {
  return parseFloat((weightKg * 40).toFixed(1));
}

export function chainLengthM(depthM: number): number {
  return parseFloat((depthM * 5).toFixed(1));
}

export function chainLinkSizeMm(chainLengthM: number): number {
  return parseFloat((Math.sqrt(chainLengthM) * 4 + 10).toFixed(1));
}

export function holdingPowerKn(weightKg: number, type: AnchorType): number {
  const multipliers: Record<AnchorType, number> = {
    admiralty: 3, danforth: 10, plow: 6, mushroom: 2, grapnel: 1.5,
  };
  return parseFloat((weightKg * 9.81 * multipliers[type] / 1000).toFixed(1));
}

export function scopeRatio(depthM: number, conditionsSevere: boolean): number {
  return conditionsSevere ? 7 : 5;
}

export function rodeLength(depthM: number, scopeRatio: number): number {
  return parseFloat((depthM * scopeRatio).toFixed(1));
}

export function swingRadiusM(rodeLengthM: number, boatLengthM: number): number {
  return parseFloat((rodeLengthM + boatLengthM).toFixed(1));
}

export function retrievalForceKn(weightKg: number, depthM: number): number {
  return parseFloat((weightKg * 9.81 / 1000 + depthM * 0.05).toFixed(1));
}

export function costEstimate(type: AnchorType, weightKg: number, costPerKg: number): number {
  const multipliers: Record<AnchorType, number> = {
    admiralty: 1.0, danforth: 1.2, plow: 1.3, mushroom: 0.8, grapnel: 1.5,
  };
  return parseFloat((weightKg * costPerKg * multipliers[type]).toFixed(2));
}

export function anchorTypes(): AnchorType[] {
  return ["admiralty", "danforth", "plow", "mushroom", "grapnel"];
}
