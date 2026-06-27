export type TypefaceCategory = "serif" | "sans_serif" | "display" | "script" | "blackletter";

export function chaseArea(widthInch: number, heightInch: number): number {
  return parseFloat((widthInch * heightInch).toFixed(2));
}

export function typeArea(chaseWidthInch: number, chaseHeightInch: number, marginInch: number = 1): number {
  return parseFloat(((chaseWidthInch - marginInch * 2) * (chaseHeightInch - marginInch * 2)).toFixed(2));
}

export function linesPerPage(typeAreaHeightInch: number, leadingPt: number): number {
  return Math.floor(typeAreaHeightInch * 72 / leadingPt);
}

export function charsPerLine(typeAreaWidthInch: number, fontSizePt: number, avgCharWidthRatio: number = 0.6): number {
  const charWidthPt = fontSizePt * avgCharWidthRatio;
  return Math.floor(typeAreaWidthInch * 72 / charWidthPt);
}

export function leadingFromFontSize(fontSizePt: number, ratio: number = 1.2): number {
  return parseFloat((fontSizePt * ratio).toFixed(1));
}

export function sortCount(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const ch of text.toLowerCase()) {
    if (ch === " " || ch === "\n") continue;
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  return counts;
}

export function inkCoverage(typeAreaSqInch: number, coveragePercent: number = 15): number {
  return parseFloat((typeAreaSqInch * coveragePercent / 100).toFixed(2));
}

export function inkAmount(coverageSqInch: number, impressions: number): number {
  const gramsPerSqInchPerImpression = 0.003;
  return parseFloat((coverageSqInch * impressions * gramsPerSqInchPerImpression).toFixed(1));
}

export function paperNeeded(copies: number, wastePercent: number = 10): number {
  return Math.ceil(copies * (1 + wastePercent / 100));
}

export function impressionTime(copies: number, impressionsPerHour: number = 200): number {
  return parseFloat((copies / impressionsPerHour).toFixed(1));
}

export function makereadyTime(colors: number): number {
  return colors * 30;
}

export function registrationMarks(colors: number): number {
  return colors > 1 ? 3 : 0;
}

export function pressurePsi(fontSizePt: number, paperType: "soft" | "medium" | "hard"): number {
  const base: Record<string, number> = { soft: 80, medium: 120, hard: 160 };
  return base[paperType] + fontSizePt * 2;
}

export function costPerPrint(paperCost: number, inkCost: number, laborHours: number, laborRate: number, copies: number): number {
  if (copies <= 0) return 0;
  return parseFloat(((paperCost + inkCost + laborHours * laborRate) / copies).toFixed(2));
}

export function typefaceCategories(): TypefaceCategory[] {
  return ["serif", "sans_serif", "display", "script", "blackletter"];
}
