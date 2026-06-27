export type StitchType = "cross" | "backstitch" | "satin" | "french_knot" | "chain" | "stem";
export type FabricCount = 14 | 16 | 18 | 22 | 28 | 32;

export interface DesignSpec {
  widthStitches: number;
  heightStitches: number;
  fabricCount: FabricCount;
  strandCount: number;
  colors: number;
}

export function designSizeCm(stitches: number, fabricCount: FabricCount): number {
  return parseFloat((stitches / fabricCount * 2.54).toFixed(2));
}

export function designSizeInch(stitches: number, fabricCount: FabricCount): number {
  return parseFloat((stitches / fabricCount).toFixed(2));
}

export function fabricNeeded(designCm: number, marginCm: number = 7.5): number {
  return parseFloat((designCm + marginCm * 2).toFixed(1));
}

export function totalStitchCount(widthStitches: number, heightStitches: number, coverage: number = 0.7): number {
  return Math.round(widthStitches * heightStitches * coverage);
}

export function threadLength(stitchCount: number, fabricCount: FabricCount, strandCount: number): number {
  const stitchLengthCm = 2.54 / fabricCount * 4;
  const totalCm = stitchCount * stitchLengthCm * (strandCount / 2);
  return parseFloat((totalCm / 100).toFixed(1));
}

export function skeinsNeeded(lengthMeters: number, skeinLengthM: number = 8): number {
  return Math.ceil(lengthMeters / skeinLengthM);
}

export function stitchesPerHour(stitchType: StitchType): number {
  const rates: Record<StitchType, number> = {
    cross: 150,
    backstitch: 200,
    satin: 120,
    french_knot: 100,
    chain: 180,
    stem: 160,
  };
  return rates[stitchType];
}

export function estimateHours(stitchCount: number, stitchType: StitchType): number {
  return parseFloat((stitchCount / stitchesPerHour(stitchType)).toFixed(1));
}

export function hoopSize(designWidthCm: number, designHeightCm: number): number {
  const maxDim = Math.max(designWidthCm, designHeightCm);
  const hoops = [10, 13, 15, 18, 20, 23, 25, 28, 30];
  for (const h of hoops) {
    if (h >= maxDim + 2) return h;
  }
  return hoops[hoops.length - 1];
}

export function gridLines(stitches: number, interval: number = 10): number {
  return Math.floor(stitches / interval);
}

export function colorChanges(colors: number, sectionsPerColor: number = 3): number {
  return (colors - 1) * sectionsPerColor;
}

export function backstitchLength(widthStitches: number, heightStitches: number, ratio: number = 0.3): number {
  const perimeter = 2 * (widthStitches + heightStitches);
  const diagonals = Math.sqrt(widthStitches * widthStitches + heightStitches * heightStitches);
  return Math.round((perimeter + diagonals) * ratio);
}

export function wasteFactor(lengthM: number, startStopCount: number): number {
  const wastePerStartStop = 0.05;
  return parseFloat((lengthM * (1 + startStopCount * wastePerStartStop / lengthM)).toFixed(1));
}

export function aidasPerMeter(fabricCount: FabricCount): number {
  return Math.round(fabricCount / 2.54 * 100);
}

export function recommendedStrands(fabricCount: FabricCount): number {
  if (fabricCount <= 14) return 3;
  if (fabricCount <= 18) return 2;
  return 1;
}

export function projectCost(skeins: number, pricePerSkein: number, fabricCostPerM2: number, fabricM2: number): number {
  return parseFloat((skeins * pricePerSkein + fabricCostPerM2 * fabricM2).toFixed(2));
}

export function stitchTypes(): StitchType[] {
  return ["cross", "backstitch", "satin", "french_knot", "chain", "stem"];
}
