export type Unit = "pt" | "px" | "em" | "rem" | "mm" | "in";

export function ptToPx(pt: number): number {
  return parseFloat((pt * 4 / 3).toFixed(2));
}

export function pxToPt(px: number): number {
  return parseFloat((px * 3 / 4).toFixed(2));
}

export function pxToEm(px: number, basePx: number = 16): number {
  return parseFloat((px / basePx).toFixed(4));
}

export function emToPx(em: number, basePx: number = 16): number {
  return parseFloat((em * basePx).toFixed(2));
}

export function ptToMm(pt: number): number {
  return parseFloat((pt * 0.3528).toFixed(2));
}

export function mmToPt(mm: number): number {
  return parseFloat((mm / 0.3528).toFixed(2));
}

export function pxToRem(px: number, rootPx: number = 16): number {
  return parseFloat((px / rootPx).toFixed(4));
}

export function remToPx(rem: number, rootPx: number = 16): number {
  return parseFloat((rem * rootPx).toFixed(2));
}

export function modularScale(baseSize: number, ratio: number, steps: number): number[] {
  const sizes: number[] = [];
  for (let i = -2; i <= steps; i++) {
    sizes.push(parseFloat((baseSize * Math.pow(ratio, i)).toFixed(2)));
  }
  return sizes;
}

export const SCALES: Record<string, number> = {
  minor_second: 1.067,
  major_second: 1.125,
  minor_third: 1.2,
  major_third: 1.25,
  perfect_fourth: 1.333,
  augmented_fourth: 1.414,
  perfect_fifth: 1.5,
  golden_ratio: 1.618,
};

export function lineHeight(fontSizePx: number, ratio: number = 1.5): number {
  return parseFloat((fontSizePx * ratio).toFixed(1));
}

export function optimalLineLength(fontSizePx: number): { minCh: number; maxCh: number } {
  return { minCh: 45, maxCh: 75 };
}

export function paragraphSpacing(lineHeightPx: number): number {
  return parseFloat((lineHeightPx * 0.75).toFixed(1));
}

export function baselineGrid(lineHeightPx: number, multiplier: number = 1): number {
  return parseFloat((lineHeightPx * multiplier).toFixed(1));
}

export function letterSpacing(fontSizePx: number, tracking: number): number {
  return parseFloat((fontSizePx * tracking / 1000).toFixed(3));
}

export function wordSpacing(fontSizePx: number, percentOfEm: number = 25): number {
  return parseFloat((fontSizePx * percentOfEm / 100).toFixed(2));
}

export function capHeight(fontSizePx: number, ratio: number = 0.7): number {
  return parseFloat((fontSizePx * ratio).toFixed(1));
}

export function xHeight(fontSizePx: number, ratio: number = 0.5): number {
  return parseFloat((fontSizePx * ratio).toFixed(1));
}

export function fluidFontSize(
  minPx: number,
  maxPx: number,
  minVw: number = 320,
  maxVw: number = 1200,
): string {
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const intercept = minPx - slope * minVw;
  const slopeVw = parseFloat((slope * 100).toFixed(4));
  const interceptRem = parseFloat((intercept / 16).toFixed(4));
  return `clamp(${(minPx / 16).toFixed(4)}rem, ${interceptRem}rem + ${slopeVw}vw, ${(maxPx / 16).toFixed(4)}rem)`;
}

export function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function meetsWCAG(ratio: number, level: "AA" | "AAA", isLargeText: boolean = false): boolean {
  if (level === "AAA") return isLargeText ? ratio >= 4.5 : ratio >= 7;
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

export function readingTime(wordCount: number, wpm: number = 200): number {
  return Math.ceil(wordCount / wpm);
}

export function wordsPerPage(fontSizePt: number, leadingPt: number, pageWidthMm: number, pageHeightMm: number, marginMm: number = 25): number {
  const textWidthMm = pageWidthMm - 2 * marginMm;
  const textHeightMm = pageHeightMm - 2 * marginMm;
  const charWidthMm = fontSizePt * 0.3528 * 0.5;
  const lineHeightMm = leadingPt * 0.3528;
  const charsPerLine = Math.floor(textWidthMm / charWidthMm);
  const lines = Math.floor(textHeightMm / lineHeightMm);
  return Math.floor(charsPerLine * lines / 5);
}

export function iconSize(basePx: number, scale: "small" | "medium" | "large" | "xlarge"): number {
  const multipliers: Record<string, number> = { small: 0.75, medium: 1, large: 1.5, xlarge: 2 };
  return Math.round(basePx * multipliers[scale]);
}
