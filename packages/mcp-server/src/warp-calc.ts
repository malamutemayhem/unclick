export type WarpPattern = "plain" | "twill" | "satin" | "leno" | "rep";

export function endsPerCm(pattern: WarpPattern): number {
  const epc: Record<WarpPattern, number> = {
    plain: 12, twill: 16, satin: 20, leno: 8, rep: 24,
  };
  return epc[pattern];
}

export function totalEnds(widthCm: number, endsPerCm: number, selvageEnds: number): number {
  return Math.round(widthCm * endsPerCm + selvageEnds);
}

export function warpLengthM(weaveLengthM: number, loomWasteM: number, takeUpPercent: number): number {
  const adjustedLength = weaveLengthM / (1 - takeUpPercent / 100);
  return parseFloat((adjustedLength + loomWasteM).toFixed(2));
}

export function yarnWeightG(lengthM: number, yarnCountNm: number): number {
  if (yarnCountNm <= 0) return 0;
  return parseFloat((lengthM * 1000 / yarnCountNm).toFixed(1));
}

export function tensionGramsPerEnd(pattern: WarpPattern): number {
  const tension: Record<WarpPattern, number> = {
    plain: 30, twill: 25, satin: 20, leno: 40, rep: 35,
  };
  return tension[pattern];
}

export function beamWindingTimeMinutes(totalEnds: number): number {
  return Math.round(totalEnds * 0.1 + 15);
}

export function threadingTimeMinutes(totalEnds: number): number {
  return Math.round(totalEnds * 0.2);
}

export function tieUpCount(pattern: WarpPattern): number {
  const tieups: Record<WarpPattern, number> = {
    plain: 2, twill: 4, satin: 5, leno: 2, rep: 4,
  };
  return tieups[pattern];
}

export function takeUpPercent(pattern: WarpPattern): number {
  const takeup: Record<WarpPattern, number> = {
    plain: 8, twill: 10, satin: 5, leno: 12, rep: 6,
  };
  return takeup[pattern];
}

export function warpPatterns(): WarpPattern[] {
  return ["plain", "twill", "satin", "leno", "rep"];
}
