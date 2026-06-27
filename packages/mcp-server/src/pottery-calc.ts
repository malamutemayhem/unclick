export type ClayType = "earthenware" | "stoneware" | "porcelain" | "raku" | "terracotta";

export interface PotterySpec {
  clayType: ClayType;
  heightCm: number;
  diameterCm: number;
  wallThicknessCm: number;
  volumeMl: number;
  clayWeightG: number;
  shrinkagePercent: number;
  firingTemp: number;
}

const CLAY_DENSITY: Record<ClayType, number> = {
  earthenware: 1.8, stoneware: 2.0, porcelain: 2.3, raku: 1.9, terracotta: 1.7,
};

const SHRINKAGE: Record<ClayType, number> = {
  earthenware: 8, stoneware: 12, porcelain: 15, raku: 10, terracotta: 7,
};

const FIRING_TEMP: Record<ClayType, { bisque: number; glaze: number }> = {
  earthenware: { bisque: 900, glaze: 1060 },
  stoneware: { bisque: 900, glaze: 1260 },
  porcelain: { bisque: 1000, glaze: 1300 },
  raku: { bisque: 900, glaze: 1000 },
  terracotta: { bisque: 950, glaze: 1050 },
};

export function cylinderVolume(diameterCm: number, heightCm: number): number {
  const r = diameterCm / 2;
  return parseFloat((Math.PI * r * r * heightCm).toFixed(1));
}

export function innerVolume(diameterCm: number, heightCm: number, wallCm: number): number {
  const innerD = diameterCm - 2 * wallCm;
  const innerH = heightCm - wallCm;
  if (innerD <= 0 || innerH <= 0) return 0;
  return cylinderVolume(innerD, innerH);
}

export function clayWeight(diameterCm: number, heightCm: number, wallCm: number, clay: ClayType): number {
  const outer = cylinderVolume(diameterCm, heightCm);
  const inner = innerVolume(diameterCm, heightCm, wallCm);
  const shellVol = outer - inner;
  return parseFloat((shellVol * CLAY_DENSITY[clay]).toFixed(0));
}

export function shrinkage(clay: ClayType): number {
  return SHRINKAGE[clay];
}

export function firedSize(greenSizeCm: number, clay: ClayType): number {
  return parseFloat((greenSizeCm * (1 - SHRINKAGE[clay] / 100)).toFixed(1));
}

export function greenSizeNeeded(firedSizeCm: number, clay: ClayType): number {
  return parseFloat((firedSizeCm / (1 - SHRINKAGE[clay] / 100)).toFixed(1));
}

export function bisqueTemp(clay: ClayType): number {
  return FIRING_TEMP[clay].bisque;
}

export function glazeTemp(clay: ClayType): number {
  return FIRING_TEMP[clay].glaze;
}

export function coneFromTemp(tempC: number): string {
  if (tempC <= 600) return "022";
  if (tempC <= 800) return "015";
  if (tempC <= 950) return "010";
  if (tempC <= 1060) return "06";
  if (tempC <= 1120) return "02";
  if (tempC <= 1180) return "2";
  if (tempC <= 1220) return "5";
  if (tempC <= 1260) return "8";
  if (tempC <= 1300) return "10";
  return "12";
}

export function glazeAmount(surfaceAreaCm2: number, coats: number = 2): number {
  const mlPerCm2 = 0.02;
  return parseFloat((surfaceAreaCm2 * mlPerCm2 * coats).toFixed(1));
}

export function surfaceArea(diameterCm: number, heightCm: number): number {
  const r = diameterCm / 2;
  const sides = Math.PI * diameterCm * heightCm;
  const bottom = Math.PI * r * r;
  return parseFloat((sides + bottom).toFixed(1));
}

export function dryingTime(wallCm: number, humidityPercent: number): number {
  const baseDays = wallCm * 3;
  const humidityFactor = humidityPercent > 60 ? 1.5 : humidityPercent > 40 ? 1.2 : 1.0;
  return Math.ceil(baseDays * humidityFactor);
}

export function firingDuration(loadKg: number, maxTempC: number): number {
  const baseHours = maxTempC > 1200 ? 10 : maxTempC > 1000 ? 8 : 6;
  const loadFactor = loadKg > 20 ? 1.3 : 1.0;
  return Math.round(baseHours * loadFactor);
}

export function calculatePottery(diameterCm: number, heightCm: number, wallCm: number, clay: ClayType): PotterySpec {
  return {
    clayType: clay,
    heightCm,
    diameterCm,
    wallThicknessCm: wallCm,
    volumeMl: innerVolume(diameterCm, heightCm, wallCm),
    clayWeightG: clayWeight(diameterCm, heightCm, wallCm, clay),
    shrinkagePercent: SHRINKAGE[clay],
    firingTemp: FIRING_TEMP[clay].glaze,
  };
}

export function wedgingTime(weightKg: number): number {
  return Math.ceil(weightKg * 5);
}

export function clayTypes(): ClayType[] {
  return ["earthenware", "stoneware", "porcelain", "raku", "terracotta"];
}
