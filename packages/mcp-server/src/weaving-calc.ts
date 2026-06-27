export type WeaveStructure = "plain" | "twill" | "satin" | "basket" | "leno";
export type FiberType = "cotton" | "linen" | "wool" | "silk" | "synthetic";

export function warpLength(finishedLengthCm: number, loomWasteCm: number = 45, takeUpPercent: number = 10): number {
  const takeUp = finishedLengthCm * takeUpPercent / 100;
  return parseFloat((finishedLengthCm + takeUp + loomWasteCm).toFixed(1));
}

export function warpEnds(widthCm: number, epi: number): number {
  const widthInch = widthCm / 2.54;
  return Math.round(widthInch * epi);
}

export function totalWarp(warpLengthCm: number, warpEnds: number): number {
  return parseFloat((warpLengthCm * warpEnds / 100).toFixed(1));
}

export function weftLength(widthCm: number, ppi: number, fabricLengthCm: number): number {
  const widthInch = widthCm / 2.54;
  const lengthInch = fabricLengthCm / 2.54;
  const picks = lengthInch * ppi;
  const metersPerPick = widthInch * 2.54 / 100 * 1.1;
  return parseFloat((picks * metersPerPick).toFixed(1));
}

export function sett(yarnWpi: number, structure: WeaveStructure): number {
  const factors: Record<WeaveStructure, number> = {
    plain: 0.5,
    twill: 0.6,
    satin: 0.7,
    basket: 0.45,
    leno: 0.35,
  };
  return Math.round(yarnWpi * factors[structure]);
}

export function reedSize(epi: number): number {
  const reeds = [8, 10, 12, 15, 20, 24];
  for (const r of reeds) {
    if (r >= epi) return r;
  }
  return reeds[reeds.length - 1];
}

export function heddleCount(warpEnds: number, shafts: number): number[] {
  const perShaft = Math.floor(warpEnds / shafts);
  const remainder = warpEnds % shafts;
  const result: number[] = [];
  for (let i = 0; i < shafts; i++) {
    result.push(perShaft + (i < remainder ? 1 : 0));
  }
  return result;
}

export function shaftsNeeded(structure: WeaveStructure): number {
  const shafts: Record<WeaveStructure, number> = {
    plain: 2,
    twill: 4,
    satin: 5,
    basket: 2,
    leno: 2,
  };
  return shafts[structure];
}

export function shrinkagePercent(fiber: FiberType): number {
  const shrink: Record<FiberType, number> = {
    cotton: 8,
    linen: 5,
    wool: 15,
    silk: 3,
    synthetic: 2,
  };
  return shrink[fiber];
}

export function finishedSize(warpWidthCm: number, warpLengthCm: number, fiber: FiberType): { widthCm: number; lengthCm: number } {
  const shrink = shrinkagePercent(fiber) / 100;
  return {
    widthCm: parseFloat((warpWidthCm * (1 - shrink)).toFixed(1)),
    lengthCm: parseFloat((warpLengthCm * (1 - shrink)).toFixed(1)),
  };
}

export function yarnWeight(meters: number, wrapsPerInch: number): number {
  const gramsPerMeter = 50 / wrapsPerInch;
  return Math.round(meters * gramsPerMeter);
}

export function weavingTime(widthCm: number, lengthCm: number, ppi: number): number {
  const picks = (lengthCm / 2.54) * ppi;
  const minutesPerPick = widthCm / 100;
  return parseFloat((picks * minutesPerPick / 60).toFixed(1));
}

export function costPerMeter(warpCostPerKg: number, weftCostPerKg: number, warpGPerM: number, weftGPerM: number): number {
  return parseFloat(((warpGPerM / 1000 * warpCostPerKg) + (weftGPerM / 1000 * weftCostPerKg)).toFixed(2));
}

export function weaveStructures(): WeaveStructure[] {
  return ["plain", "twill", "satin", "basket", "leno"];
}
