export type TransomStyle = "fixed" | "operable" | "structural" | "decorative" | "mullioned";

export function barWidthCm(windowWidthCm: number): number {
  return parseFloat((windowWidthCm * 0.05).toFixed(1));
}

export function barHeightCm(windowHeightCm: number, position: number): number {
  return parseFloat((windowHeightCm * position).toFixed(1));
}

export function upperPaneArea(windowWidthCm: number, windowHeightCm: number, barPositionRatio: number): number {
  return parseFloat((windowWidthCm * windowHeightCm * (1 - barPositionRatio) / 10000).toFixed(3));
}

export function lowerPaneArea(windowWidthCm: number, windowHeightCm: number, barPositionRatio: number): number {
  return parseFloat((windowWidthCm * windowHeightCm * barPositionRatio / 10000).toFixed(3));
}

export function structuralLoadKn(windowWidthM: number, wallAboveKgPerM: number): number {
  return parseFloat((windowWidthM * wallAboveKgPerM * 9.81 / 1000).toFixed(2));
}

export function ventilationGap(style: TransomStyle): number {
  const gaps: Record<TransomStyle, number> = {
    fixed: 0, operable: 5, structural: 0, decorative: 0, mullioned: 2,
  };
  return gaps[style];
}

export function glazingBarsCount(paneCountAbove: number, paneCountBelow: number): number {
  return Math.max(0, paneCountAbove - 1) + Math.max(0, paneCountBelow - 1) + 1;
}

export function weatherSealLengthM(windowWidthCm: number, barCount: number): number {
  return parseFloat((windowWidthCm / 100 * barCount * 2).toFixed(2));
}

export function thermalBreakMm(style: TransomStyle): number {
  const mm: Record<TransomStyle, number> = {
    fixed: 20, operable: 15, structural: 25, decorative: 10, mullioned: 18,
  };
  return mm[style];
}

export function costPerWindow(style: TransomStyle, windowWidthCm: number): number {
  const pricePerCm: Record<TransomStyle, number> = {
    fixed: 1.5, operable: 3, structural: 4, decorative: 5, mullioned: 3.5,
  };
  return parseFloat((windowWidthCm * pricePerCm[style]).toFixed(2));
}

export function transomStyles(): TransomStyle[] {
  return ["fixed", "operable", "structural", "decorative", "mullioned"];
}
