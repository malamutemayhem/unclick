export type GlobeSize = "mini" | "standard" | "large" | "musical" | "custom";
export type LiquidType = "water" | "glycerin_mix" | "mineral_oil" | "baby_oil";

export function globeVolumeMl(diameterCm: number): number {
  const r = diameterCm / 2;
  return parseFloat(((4 / 3) * Math.PI * r * r * r).toFixed(0));
}

export function waterAmount(volumeMl: number, liquidType: LiquidType): number {
  const waterPct: Record<LiquidType, number> = {
    water: 1, glycerin_mix: 0.7, mineral_oil: 0, baby_oil: 0,
  };
  return parseFloat((volumeMl * waterPct[liquidType]).toFixed(0));
}

export function glycerinAmount(volumeMl: number): number {
  return parseFloat((volumeMl * 0.3).toFixed(0));
}

export function glitterAmount(volumeMl: number, densityLevel: number = 2): number {
  return parseFloat((volumeMl * densityLevel * 0.001).toFixed(2));
}

export function settleTime(liquidType: LiquidType): number {
  const seconds: Record<LiquidType, number> = {
    water: 3, glycerin_mix: 15, mineral_oil: 30, baby_oil: 25,
  };
  return seconds[liquidType];
}

export function sealantRing(diameterCm: number): number {
  return parseFloat((Math.PI * diameterCm).toFixed(1));
}

export function baseHeight(globeDiameterCm: number): number {
  return parseFloat((globeDiameterCm * 0.4).toFixed(1));
}

export function figurineMaxHeight(globeDiameterCm: number): number {
  return parseFloat((globeDiameterCm * 0.6).toFixed(1));
}

export function distilledWaterNeeded(volumeMl: number): boolean {
  return true;
}

export function musicBoxFits(globeDiameterCm: number): boolean {
  return globeDiameterCm >= 10;
}

export function shakeForce(volumeMl: number): string {
  if (volumeMl < 200) return "gentle";
  if (volumeMl < 500) return "moderate";
  return "vigorous";
}

export function airBubbleRemoval(liquidType: LiquidType): string {
  if (liquidType === "water") return "let stand 24 hours";
  if (liquidType === "glycerin_mix") return "warm slightly, tap gently";
  return "seal and wait 48 hours";
}

export function costEstimate(size: GlobeSize): number {
  const costs: Record<GlobeSize, number> = {
    mini: 5, standard: 12, large: 25, musical: 35, custom: 50,
  };
  return costs[size];
}

export function globeSizes(): GlobeSize[] {
  return ["mini", "standard", "large", "musical", "custom"];
}
