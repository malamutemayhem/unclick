export type GrapeVariety = "cabernet" | "chardonnay" | "pinot_noir" | "riesling" | "shiraz" | "merlot";

export function vinesPerHectare(rowSpacingM: number, vineSpacingM: number): number {
  if (rowSpacingM <= 0 || vineSpacingM <= 0) return 0;
  return Math.floor(10000 / (rowSpacingM * vineSpacingM));
}

export function yieldKgPerHa(vines: number, kgPerVine: number): number {
  return parseFloat((vines * kgPerVine).toFixed(0));
}

export function litersPerHa(yieldKg: number, extractionRate: number): number {
  return parseFloat((yieldKg * extractionRate).toFixed(0));
}

export function bottlesPerHa(liters: number): number {
  return Math.floor(liters / 0.75);
}

export function trellisPostCount(rowLength: number, postSpacingM: number): number {
  if (postSpacingM <= 0) return 0;
  return Math.ceil(rowLength / postSpacingM) + 1;
}

export function wireLength(rows: number, rowLengthM: number, wiresPerRow: number): number {
  return parseFloat((rows * rowLengthM * wiresPerRow).toFixed(0));
}

export function pruningWeight(variety: GrapeVariety): number {
  const weights: Record<GrapeVariety, number> = {
    cabernet: 1.2, chardonnay: 1.0, pinot_noir: 0.8,
    riesling: 0.7, shiraz: 1.5, merlot: 1.1,
  };
  return weights[variety];
}

export function harvestDay(budbreakDay: number, variety: GrapeVariety): number {
  const growingDays: Record<GrapeVariety, number> = {
    cabernet: 180, chardonnay: 155, pinot_noir: 145,
    riesling: 150, shiraz: 175, merlot: 165,
  };
  return budbreakDay + growingDays[variety];
}

export function sugarBrix(initialBrix: number, daysToHarvest: number): number {
  return parseFloat((initialBrix + daysToHarvest * 0.1).toFixed(1));
}

export function waterLitersPerVine(tempC: number, rainfallMm: number): number {
  const base = Math.max(0, (tempC - 15) * 0.5);
  const rainCredit = rainfallMm * 0.3;
  return parseFloat(Math.max(0, base - rainCredit).toFixed(1));
}

export function grapeVarieties(): GrapeVariety[] {
  return ["cabernet", "chardonnay", "pinot_noir", "riesling", "shiraz", "merlot"];
}
