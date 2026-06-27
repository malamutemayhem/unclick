export interface FabricPiece {
  widthCm: number;
  heightCm: number;
  quantity: number;
}

export interface PatternLayout {
  fabricLengthCm: number;
  fabricWidthCm: number;
  pieces: FabricPiece[];
  wastePercent: number;
}

export function yardsToCm(yards: number): number {
  return parseFloat((yards * 91.44).toFixed(1));
}

export function cmToYards(cm: number): number {
  return parseFloat((cm / 91.44).toFixed(2));
}

export function inchesToCm(inches: number): number {
  return parseFloat((inches * 2.54).toFixed(1));
}

export function cmToInches(cm: number): number {
  return parseFloat((cm / 2.54).toFixed(2));
}

export function fabricArea(widthCm: number, lengthCm: number): number {
  return parseFloat((widthCm * lengthCm / 10000).toFixed(3));
}

export function fabricNeeded(pieces: FabricPiece[], fabricWidthCm: number, seamAllowanceCm = 1.5): number {
  let totalLength = 0;
  for (const piece of pieces) {
    const w = piece.widthCm + seamAllowanceCm * 2;
    const h = piece.heightCm + seamAllowanceCm * 2;
    const piecesAcross = Math.floor(fabricWidthCm / w);
    if (piecesAcross <= 0) {
      totalLength += h * piece.quantity;
    } else {
      const rows = Math.ceil(piece.quantity / piecesAcross);
      totalLength += rows * h;
    }
  }
  return parseFloat(totalLength.toFixed(1));
}

export function threadLength(seamLengthCm: number, stitchesPerCm = 3): number {
  return parseFloat((seamLengthCm * 2.5 * stitchesPerCm / stitchesPerCm).toFixed(0));
}

export function bobbinFills(threadLengthCm: number, bobbinCapacityCm = 5000): number {
  return Math.ceil(threadLengthCm / bobbinCapacityCm);
}

export function stitchCount(lengthCm: number, stitchesPerCm = 3): number {
  return Math.round(lengthCm * stitchesPerCm);
}

export function seamAllowance(pieces: FabricPiece[], allowanceCm = 1.5): FabricPiece[] {
  return pieces.map(p => ({
    widthCm: p.widthCm + allowanceCm * 2,
    heightCm: p.heightCm + allowanceCm * 2,
    quantity: p.quantity,
  }));
}

export function shrinkageAdjust(measurement: number, shrinkagePercent: number): number {
  return parseFloat((measurement / (1 - shrinkagePercent / 100)).toFixed(1));
}

export function grainlineAngle(warpDirection: number, desiredAngle: number): number {
  return ((desiredAngle - warpDirection) + 360) % 360;
}

export function buttonSpacing(totalLength: number, buttonCount: number): number {
  if (buttonCount <= 1) return totalLength;
  return parseFloat((totalLength / (buttonCount - 1)).toFixed(1));
}

export function zipherLength(openingCm: number, addCm = 2.5): number {
  return parseFloat((openingCm + addCm).toFixed(1));
}

export function elasticLength(measurement: number, stretchFactor = 0.85): number {
  return parseFloat((measurement * stretchFactor).toFixed(1));
}

export function biasBinding(edgeLengthCm: number, width: number = 5): { stripLength: number; fabricSqCm: number } {
  const stripLength = parseFloat((edgeLengthCm + 10).toFixed(0));
  const fabricSqCm = stripLength * width;
  return { stripLength, fabricSqCm };
}

export function gatherRatio(finishedWidth: number, fullness: "light" | "medium" | "heavy" = "medium"): number {
  const ratios = { light: 1.5, medium: 2, heavy: 3 };
  return parseFloat((finishedWidth * ratios[fullness]).toFixed(1));
}

export function curtainFabric(windowWidthCm: number, windowHeightCm: number, fullness = 2, hemCm = 15, headerCm = 10): { widthCm: number; lengthCm: number } {
  return {
    widthCm: parseFloat((windowWidthCm * fullness).toFixed(0)),
    lengthCm: parseFloat((windowHeightCm + hemCm + headerCm).toFixed(0)),
  };
}

export function quiltSize(blockSizeCm: number, blocksWide: number, blocksHigh: number, sashingCm = 0, borderCm = 0): { width: number; height: number } {
  const w = blocksWide * blockSizeCm + (blocksWide - 1) * sashingCm + 2 * borderCm;
  const h = blocksHigh * blockSizeCm + (blocksHigh - 1) * sashingCm + 2 * borderCm;
  return { width: parseFloat(w.toFixed(0)), height: parseFloat(h.toFixed(0)) };
}

export function battingArea(widthCm: number, heightCm: number, overlapCm = 5): number {
  return parseFloat(((widthCm + overlapCm * 2) * (heightCm + overlapCm * 2) / 10000).toFixed(3));
}
