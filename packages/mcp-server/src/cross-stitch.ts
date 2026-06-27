export type FabricCount = 11 | 14 | 16 | 18 | 22 | 28;
export type ThreadBrand = "dmc" | "anchor" | "weeks" | "classic_colorworks";

const STITCHES_PER_CM: Record<FabricCount, number> = {
  11: 4.3, 14: 5.5, 16: 6.3, 18: 7.1, 22: 8.7, 28: 11,
};

export function stitchesPerCm(count: FabricCount): number {
  return STITCHES_PER_CM[count];
}

export function designSizeCm(stitchCount: number, fabricCount: FabricCount): number {
  return parseFloat((stitchCount / STITCHES_PER_CM[fabricCount]).toFixed(1));
}

export function fabricNeeded(widthStitches: number, heightStitches: number, fabricCount: FabricCount, marginCm: number = 7): number {
  const widthCm = widthStitches / STITCHES_PER_CM[fabricCount] + marginCm * 2;
  const heightCm = heightStitches / STITCHES_PER_CM[fabricCount] + marginCm * 2;
  return parseFloat((widthCm * heightCm / 10000).toFixed(3));
}

export function totalStitches(widthStitches: number, heightStitches: number, coverage: number = 0.7): number {
  return Math.round(widthStitches * heightStitches * coverage);
}

export function threadLength(stitchCount: number, fabricCount: FabricCount, strands: number = 2): number {
  const cmPerStitch = 2.5 / (fabricCount / 14);
  return parseFloat((stitchCount * cmPerStitch * strands / 100).toFixed(1));
}

export function skeinsNeeded(lengthM: number, skeinLengthM: number = 8): number {
  return Math.ceil(lengthM / skeinLengthM);
}

export function recommendedStrands(fabricCount: FabricCount): number {
  if (fabricCount <= 14) return 3;
  if (fabricCount <= 18) return 2;
  return 1;
}

export function estimateHours(totalStitchCount: number, stitchesPerHour: number = 150): number {
  return parseFloat((totalStitchCount / stitchesPerHour).toFixed(1));
}

export function hoopSize(widthCm: number, heightCm: number): number {
  const maxDim = Math.max(widthCm, heightCm);
  const sizes = [10, 15, 20, 25, 30];
  for (const s of sizes) {
    if (s >= maxDim + 2) return s;
  }
  return 30;
}

export function gridLines(widthStitches: number, heightStitches: number, interval: number = 10): { horizontal: number; vertical: number } {
  return {
    horizontal: Math.floor(heightStitches / interval),
    vertical: Math.floor(widthStitches / interval),
  };
}

export function backstitchLength(segments: number, avgLengthMm: number): number {
  return parseFloat((segments * avgLengthMm / 10).toFixed(1));
}

export function colorCount(palette: string[]): number {
  return new Set(palette).size;
}

export function framingCost(widthCm: number, heightCm: number, pricePerCm: number = 1.5): number {
  const perimeter = 2 * (widthCm + heightCm);
  return parseFloat((perimeter * pricePerCm).toFixed(2));
}

export function washingTemp(fabricCount: FabricCount): number {
  return fabricCount >= 22 ? 20 : 30;
}

export function fabricCounts(): FabricCount[] {
  return [11, 14, 16, 18, 22, 28];
}
