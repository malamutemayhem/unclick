export type ParquetPattern = "herringbone" | "chevron" | "basketweave" | "versailles" | "brick";

export function piecesPerM2(pieceWidthCm: number, pieceLengthCm: number): number {
  if (pieceWidthCm <= 0 || pieceLengthCm <= 0) return 0;
  return Math.ceil(10000 / (pieceWidthCm * pieceLengthCm));
}

export function wastePercent(pattern: ParquetPattern): number {
  const waste: Record<ParquetPattern, number> = {
    herringbone: 10, chevron: 15, basketweave: 5, versailles: 20, brick: 5,
  };
  return waste[pattern];
}

export function totalPieces(areaM2: number, piecesPerM2: number, wastePercent: number): number {
  return Math.ceil(areaM2 * piecesPerM2 * (1 + wastePercent / 100));
}

export function adhesiveKg(areaM2: number): number {
  return parseFloat((areaM2 * 1.2).toFixed(1));
}

export function sandingGrit(coatNumber: number): number {
  if (coatNumber <= 1) return 60;
  if (coatNumber === 2) return 100;
  return 150;
}

export function finishCoats(traffic: string): number {
  const coats: Record<string, number> = {
    light: 2, moderate: 3, heavy: 4,
  };
  return coats[traffic] || 3;
}

export function expansionGapMm(roomLengthM: number): number {
  return parseFloat((roomLengthM * 1.5).toFixed(1));
}

export function acclimatizationDays(humidityDiff: number): number {
  return Math.ceil(humidityDiff * 0.2 + 2);
}

export function thicknessAfterSanding(originalMm: number, sandings: number): number {
  return parseFloat((originalMm - sandings * 0.5).toFixed(1));
}

export function installTimeHours(areaM2: number, pattern: ParquetPattern): number {
  const factors: Record<ParquetPattern, number> = {
    herringbone: 1.5, chevron: 1.8, basketweave: 1.2, versailles: 2.5, brick: 1.0,
  };
  return parseFloat((areaM2 * factors[pattern]).toFixed(0));
}

export function parquetPatterns(): ParquetPattern[] {
  return ["herringbone", "chevron", "basketweave", "versailles", "brick"];
}
