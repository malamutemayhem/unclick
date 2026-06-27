export type TypeUnit = "point" | "pica" | "cicero" | "didot";

export function pointsToMm(points: number): number {
  return parseFloat((points * 0.3528).toFixed(2));
}

export function mmToPoints(mm: number): number {
  return parseFloat((mm / 0.3528).toFixed(1));
}

export function leadingPt(fontSizePt: number, ratio: number): number {
  return parseFloat((fontSizePt * ratio).toFixed(1));
}

export function charsPerLine(lineWidthMm: number, charWidthMm: number): number {
  if (charWidthMm <= 0) return 0;
  return Math.floor(lineWidthMm / charWidthMm);
}

export function linesPerPage(pageHeightMm: number, leadingMm: number, marginMm: number): number {
  if (leadingMm <= 0) return 0;
  return Math.floor((pageHeightMm - marginMm * 2) / leadingMm);
}

export function wordCount(chars: number, avgWordLength: number): number {
  if (avgWordLength <= 0) return 0;
  return Math.floor(chars / (avgWordLength + 1));
}

export function pageCount(totalWords: number, wordsPerPage: number): number {
  if (wordsPerPage <= 0) return 0;
  return Math.ceil(totalWords / wordsPerPage);
}

export function kerning(fontSizePt: number, tightness: string): number {
  const factors: Record<string, number> = {
    loose: 0.05, normal: 0, tight: -0.03, very_tight: -0.06,
  };
  return parseFloat((fontSizePt * (factors[tightness] || 0)).toFixed(2));
}

export function sortCaseCompartments(fontCharacters: number, casesCount: number): number {
  return Math.ceil(fontCharacters / casesCount);
}

export function inkCoveragePercent(boldPercent: number, italicPercent: number): number {
  return parseFloat((30 + boldPercent * 0.2 + italicPercent * 0.05).toFixed(1));
}

export function typeUnits(): TypeUnit[] {
  return ["point", "pica", "cicero", "didot"];
}
