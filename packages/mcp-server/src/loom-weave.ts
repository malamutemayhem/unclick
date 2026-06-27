export type LoomType = "rigid_heddle" | "floor" | "table" | "tapestry" | "inkle" | "backstrap";
export type FiberType = "cotton" | "wool" | "linen" | "silk" | "acrylic" | "hemp";

export function warpThreads(widthCm: number, epiPerCm: number): number {
  return Math.round(widthCm * epiPerCm);
}

export function warpLength(projectLengthCm: number, loomWasteCm: number = 60): number {
  return projectLengthCm + loomWasteCm;
}

export function totalWarpYards(threads: number, lengthCm: number): number {
  return parseFloat((threads * lengthCm / 91.44).toFixed(0));
}

export function weftYards(widthCm: number, lengthCm: number, ppiPerCm: number): number {
  const picks = lengthCm * ppiPerCm;
  return parseFloat((picks * widthCm / 91.44).toFixed(0));
}

export function sett(fiberType: FiberType): number {
  const epi: Record<FiberType, number> = {
    cotton: 6, wool: 5, linen: 7, silk: 8, acrylic: 5, hemp: 6,
  };
  return epi[fiberType];
}

export function reedDent(epiPerCm: number): number {
  return Math.round(epiPerCm * 2.54);
}

export function shafts(pattern: "plain" | "twill" | "satin" | "overshot"): number {
  const s: Record<string, number> = { plain: 2, twill: 4, satin: 5, overshot: 4 };
  return s[pattern];
}

export function treadles(pattern: "plain" | "twill" | "satin" | "overshot"): number {
  const t: Record<string, number> = { plain: 2, twill: 4, satin: 5, overshot: 6 };
  return t[pattern];
}

export function weavingSpeed(experienceLevel: number): number {
  return parseFloat((2 + experienceLevel * 0.5).toFixed(1));
}

export function projectTime(totalPicks: number, speedPicksPerMin: number): number {
  if (speedPicksPerMin <= 0) return 0;
  return parseFloat((totalPicks / speedPicksPerMin / 60).toFixed(1));
}

export function shrinkage(fiberType: FiberType): number {
  const pct: Record<FiberType, number> = {
    cotton: 8, wool: 12, linen: 5, silk: 3, acrylic: 2, hemp: 4,
  };
  return pct[fiberType];
}

export function finishedWidth(loomWidthCm: number, shrinkagePct: number): number {
  return parseFloat((loomWidthCm * (1 - shrinkagePct / 100)).toFixed(1));
}

export function yarnCost(totalYards: number, costPerYard: number): number {
  return parseFloat((totalYards * costPerYard).toFixed(2));
}

export function loomTypes(): LoomType[] {
  return ["rigid_heddle", "floor", "table", "tapestry", "inkle", "backstrap"];
}
