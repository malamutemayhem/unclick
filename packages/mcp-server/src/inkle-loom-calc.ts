export type InklePattern = "plain_weave" | "pickup" | "baltic" | "andean" | "inkle_card_hybrid";

export function maxBandWidthCm(loomSizeCm: number): number {
  return Math.round(loomSizeCm * 0.15);
}

export function warpThreadCount(widthCm: number, sett: number): number {
  return Math.ceil(widthCm * sett);
}

export function warpLengthM(loomSizeCm: number): number {
  return Math.round(loomSizeCm * 2.5) / 100;
}

export function heddles(threadCount: number): number {
  return Math.ceil(threadCount / 2);
}

export function beatsPerCm(pattern: InklePattern): number {
  const bpc: Record<InklePattern, number> = {
    plain_weave: 8, pickup: 6, baltic: 7, andean: 5, inkle_card_hybrid: 6,
  };
  return bpc[pattern];
}

export function difficultyRating(pattern: InklePattern): number {
  const diff: Record<InklePattern, number> = {
    plain_weave: 1, pickup: 3, baltic: 4, andean: 5, inkle_card_hybrid: 4,
  };
  return diff[pattern];
}

export function speedCmPerHour(pattern: InklePattern): number {
  const speed: Record<InklePattern, number> = {
    plain_weave: 30, pickup: 15, baltic: 12, andean: 10, inkle_card_hybrid: 14,
  };
  return speed[pattern];
}

export function weftVisible(pattern: InklePattern): boolean {
  return pattern === "plain_weave";
}

export function costEstimateLoom(): number {
  return 45;
}

export function inklePatterns(): InklePattern[] {
  return ["plain_weave", "pickup", "baltic", "andean", "inkle_card_hybrid"];
}
