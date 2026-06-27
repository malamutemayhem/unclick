export type ClayBody = "earthenware" | "stoneware" | "porcelain" | "terracotta" | "raku";
export type FiringMethod = "electric_kiln" | "gas_kiln" | "wood_kiln" | "pit_fire" | "raku_kiln";

export function shrinkagePercent(clay: ClayBody): number {
  const s: Record<ClayBody, number> = {
    earthenware: 5, stoneware: 10, porcelain: 15, terracotta: 7, raku: 8,
  };
  return s[clay];
}

export function firedSize(greenSizeCm: number, clay: ClayBody): number {
  return parseFloat((greenSizeCm * (1 - shrinkagePercent(clay) / 100)).toFixed(1));
}

export function firingTempC(clay: ClayBody): number {
  const t: Record<ClayBody, number> = {
    earthenware: 1000, stoneware: 1250, porcelain: 1300, terracotta: 1050, raku: 900,
  };
  return t[clay];
}

export function firingTimeHours(clay: ClayBody): number {
  const h: Record<ClayBody, number> = {
    earthenware: 8, stoneware: 10, porcelain: 12, terracotta: 8, raku: 2,
  };
  return h[clay];
}

export function dryingDays(thicknessCm: number): number {
  return Math.ceil(thicknessCm * 3);
}

export function clayAmountKg(volumeCc: number, densityGcc: number): number {
  return parseFloat((volumeCc * densityGcc / 1000).toFixed(2));
}

export function slabThicknessCm(purpose: string): number {
  if (purpose === "tile") return 0.6;
  if (purpose === "plate") return 0.8;
  if (purpose === "pot") return 1.0;
  return 1.2;
}

export function coilDiameterCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 1.5).toFixed(1));
}

export function wheelSpeed(diameterCm: number): number {
  if (diameterCm <= 0) return 0;
  return parseFloat(Math.min(300, 3000 / diameterCm).toFixed(0));
}

export function glazeVolumeMl(surfaceAreaCm2: number): number {
  return parseFloat((surfaceAreaCm2 * 0.05).toFixed(1));
}

export function absorptionPercent(clay: ClayBody): number {
  const a: Record<ClayBody, number> = {
    earthenware: 15, stoneware: 2, porcelain: 0.5, terracotta: 12, raku: 10,
  };
  return a[clay];
}

export function clayBodies(): ClayBody[] {
  return ["earthenware", "stoneware", "porcelain", "terracotta", "raku"];
}
