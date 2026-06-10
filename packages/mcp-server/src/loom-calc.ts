export type LoomType = "rigid_heddle" | "table" | "floor" | "jacquard" | "backstrap" | "tapestry";

export function warpThreads(widthCm: number, sett: number): number {
  return Math.ceil(widthCm * sett / 2.54);
}

export function weftPicks(lengthCm: number, ppi: number): number {
  return Math.ceil(lengthCm * ppi / 2.54);
}

export function warpLength(finishedLengthCm: number, loomWaste: number, takeUp: number): number {
  return parseFloat((finishedLengthCm * (1 + takeUp / 100) + loomWaste).toFixed(1));
}

export function threadWeight(lengthM: number, texCount: number): number {
  return parseFloat((lengthM * texCount / 1000).toFixed(1));
}

export function reedDent(sett: number): number {
  if (sett <= 8) return 1;
  if (sett <= 16) return 2;
  return 3;
}

export function shaftCount(type: LoomType): number {
  const shafts: Record<LoomType, number> = {
    rigid_heddle: 2, table: 4, floor: 8, jacquard: 24, backstrap: 2, tapestry: 1,
  };
  return shafts[type];
}

export function treadleCount(shafts: number): number {
  return Math.min(shafts * 2, 14);
}

export function weavingTime(picks: number, ppm: number): number {
  if (ppm <= 0) return 0;
  return parseFloat((picks / ppm).toFixed(1));
}

export function shrinkage(material: string): number {
  const rates: Record<string, number> = {
    cotton: 5, wool: 10, linen: 3, silk: 2, synthetic: 1,
  };
  return rates[material] || 5;
}

export function yarnMetersNeeded(threads: number, lengthCm: number): number {
  return parseFloat((threads * lengthCm / 100).toFixed(0));
}

export function loomTypes(): LoomType[] {
  return ["rigid_heddle", "table", "floor", "jacquard", "backstrap", "tapestry"];
}
