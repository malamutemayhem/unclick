export type LeatherType = "vegetable_tan" | "chrome_tan" | "latigo" | "suede" | "patent" | "exotic";
export type OzWeight = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export function ozToMm(oz: OzWeight): number {
  return parseFloat((oz * 0.4).toFixed(1));
}

export function mmToOz(mm: number): number {
  return Math.round(mm / 0.4);
}

export function sqFtToSqDm(sqFt: number): number {
  return parseFloat((sqFt * 9.29).toFixed(1));
}

export function sqDmToSqFt(sqDm: number): number {
  return parseFloat((sqDm / 9.29).toFixed(1));
}

export function hideArea(type: LeatherType): { avgSqFt: number; minSqFt: number; maxSqFt: number } {
  const areas: Record<LeatherType, { avgSqFt: number; minSqFt: number; maxSqFt: number }> = {
    vegetable_tan: { avgSqFt: 24, minSqFt: 18, maxSqFt: 30 },
    chrome_tan: { avgSqFt: 22, minSqFt: 16, maxSqFt: 28 },
    latigo: { avgSqFt: 20, minSqFt: 15, maxSqFt: 25 },
    suede: { avgSqFt: 12, minSqFt: 8, maxSqFt: 16 },
    patent: { avgSqFt: 18, minSqFt: 14, maxSqFt: 22 },
    exotic: { avgSqFt: 6, minSqFt: 3, maxSqFt: 10 },
  };
  return areas[type];
}

export function piecesFromHide(hideSqFt: number, pieceSqFt: number, wastePercent: number = 20): number {
  const usable = hideSqFt * (1 - wastePercent / 100);
  return Math.floor(usable / pieceSqFt);
}

export function stitchingLength(seamLengthCm: number, stitchesPerCm: number = 3): number {
  const threadMultiplier = 3.5;
  return parseFloat((seamLengthCm * stitchesPerCm * threadMultiplier / 100).toFixed(1));
}

export function needleSize(leatherMm: number): number {
  if (leatherMm <= 1.0) return 0;
  if (leatherMm <= 2.0) return 1;
  if (leatherMm <= 3.0) return 2;
  if (leatherMm <= 4.0) return 4;
  return 5;
}

export function punchSize(leatherMm: number): number {
  return parseFloat((leatherMm * 0.8).toFixed(1));
}

export function edgeFinishTime(perimeterCm: number, technique: "burnish" | "paint" | "fold"): number {
  const minutesPerCm: Record<string, number> = { burnish: 0.5, paint: 0.3, fold: 0.8 };
  return parseFloat((perimeterCm * (minutesPerCm[technique] ?? 0.5)).toFixed(0));
}

export function dyeAmount(areaSqFt: number, coats: number = 2): number {
  const mlPerSqFtPerCoat = 15;
  return parseFloat((areaSqFt * coats * mlPerSqFtPerCoat).toFixed(0));
}

export function conditionerAmount(areaSqFt: number): number {
  return parseFloat((areaSqFt * 10).toFixed(0));
}

export function beltLength(waistCm: number): number {
  return Math.round(waistCm + 20);
}

export function beltHoles(count: number = 5, spacingCm: number = 2.5): number[] {
  const holes: number[] = [];
  for (let i = 0; i < count; i++) {
    holes.push(parseFloat((spacingCm * i).toFixed(1)));
  }
  return holes;
}

export function walletPanels(style: "bifold" | "trifold" | "cardholder"): number {
  const panels: Record<string, number> = { bifold: 4, trifold: 6, cardholder: 3 };
  return panels[style] ?? 4;
}

export function costPerPiece(hidePrice: number, piecesPerHide: number, hardwareCost: number = 0, laborMinutes: number = 0, laborRate: number = 0): number {
  const materialCost = hidePrice / piecesPerHide + hardwareCost;
  const labor = laborMinutes / 60 * laborRate;
  return parseFloat((materialCost + labor).toFixed(2));
}

export function leatherTypes(): LeatherType[] {
  return ["vegetable_tan", "chrome_tan", "latigo", "suede", "patent", "exotic"];
}
