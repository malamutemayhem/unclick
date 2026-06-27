export type PsalteryShape = "trapezoid" | "triangular" | "rectangular" | "wing" | "pig_snout";

export function stringCount(lowestNote: number, highestNote: number): number {
  if (lowestNote <= 0 || highestNote <= 0 || highestNote <= lowestNote) return 0;
  return Math.round(12 * Math.log2(highestNote / lowestNote)) + 1;
}

export function stringLength(noteHz: number, tension: number, linearDensity: number): number {
  if (noteHz <= 0 || linearDensity <= 0) return 0;
  return parseFloat((Math.sqrt(tension / linearDensity) / (2 * noteHz) * 100).toFixed(1));
}

export function bridgeAngle(shortestStringCm: number, longestStringCm: number, boardWidthCm: number): number {
  if (boardWidthCm <= 0) return 0;
  return parseFloat((Math.atan((longestStringCm - shortestStringCm) / boardWidthCm) * 180 / Math.PI).toFixed(1));
}

export function soundboardThicknessMm(boardAreaCm2: number): number {
  return parseFloat((2 + boardAreaCm2 * 0.001).toFixed(1));
}

export function tuningPinCount(strings: number): number {
  return strings * 2;
}

export function hitchPinCount(strings: number): number {
  return strings;
}

export function soundholeDiameterCm(boardAreaCm2: number): number {
  return parseFloat((Math.sqrt(boardAreaCm2 * 0.05 / Math.PI) * 2).toFixed(1));
}

export function plectrumSize(stringSpacingMm: number): number {
  return parseFloat((stringSpacingMm * 0.6).toFixed(1));
}

export function resonanceFrequency(boardLengthCm: number, thicknessMm: number): number {
  if (boardLengthCm <= 0) return 0;
  return parseFloat((thicknessMm * 500 / boardLengthCm).toFixed(1));
}

export function psalteryShapes(): PsalteryShape[] {
  return ["trapezoid", "triangular", "rectangular", "wing", "pig_snout"];
}
