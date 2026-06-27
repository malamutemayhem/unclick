export type AnimalHide = "calf" | "sheep" | "goat" | "deer" | "pig";

export function hideYieldSheets(hideSizeCm2: number, sheetSizeCm2: number): number {
  if (sheetSizeCm2 <= 0) return 0;
  return Math.floor(hideSizeCm2 / sheetSizeCm2);
}

export function soakingDays(hide: AnimalHide): number {
  const days: Record<AnimalHide, number> = { calf: 3, sheep: 2, goat: 2, deer: 4, pig: 5 };
  return days[hide];
}

export function limeBathDays(thickness: string): number {
  const days: Record<string, number> = { thin: 5, medium: 8, thick: 12 };
  return days[thickness] || 8;
}

export function scrapingPasses(quality: string): number {
  const passes: Record<string, number> = { rough: 2, standard: 4, fine: 8, vellum: 12 };
  return passes[quality] || 4;
}

export function stretchingTension(sheetWidthCm: number): number {
  return parseFloat((sheetWidthCm * 0.3).toFixed(1));
}

export function dryingTimeHours(humidity: number, thicknessMm: number): number {
  return parseFloat((thicknessMm * 12 * (1 + humidity / 100)).toFixed(0));
}

export function inkAbsorbency(hide: AnimalHide): string {
  const abs: Record<AnimalHide, string> = { calf: "high", sheep: "medium", goat: "medium", deer: "low", pig: "high" };
  return abs[hide];
}

export function writingAreaCm2(sheetWidth: number, sheetHeight: number, marginCm: number): number {
  return parseFloat(((sheetWidth - 2 * marginCm) * (sheetHeight - 2 * marginCm)).toFixed(0));
}

export function foldingSections(sheetWidth: number, sectionWidth: number): number {
  if (sectionWidth <= 0) return 0;
  return Math.floor(sheetWidth / sectionWidth);
}

export function costPerSheet(hide: AnimalHide, quality: string): number {
  const base: Record<AnimalHide, number> = { calf: 50, sheep: 30, goat: 25, deer: 60, pig: 20 };
  const mult: Record<string, number> = { rough: 0.5, standard: 1, fine: 2, vellum: 4 };
  return parseFloat((base[hide] * (mult[quality] || 1)).toFixed(0));
}

export function animalHides(): AnimalHide[] {
  return ["calf", "sheep", "goat", "deer", "pig"];
}
