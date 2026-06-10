export type VellumGrade = "uterine" | "calf" | "goat" | "sheep" | "split";

export function sheetsPerHide(hideAreaSqFt: number, sheetWidthCm: number, sheetHeightCm: number): number {
  if (sheetWidthCm <= 0 || sheetHeightCm <= 0) return 0;
  const hideAreaCm2 = hideAreaSqFt * 929;
  return Math.floor(hideAreaCm2 / (sheetWidthCm * sheetHeightCm));
}

export function thicknessMm(grade: VellumGrade): number {
  const thicknesses: Record<VellumGrade, number> = {
    uterine: 0.1, calf: 0.2, goat: 0.25, sheep: 0.15, split: 0.3,
  };
  return thicknesses[grade];
}

export function preparationDays(grade: VellumGrade): number {
  const days: Record<VellumGrade, number> = {
    uterine: 14, calf: 10, goat: 8, sheep: 9, split: 6,
  };
  return days[grade];
}

export function limeSoakingDays(grade: VellumGrade): number {
  const days: Record<VellumGrade, number> = {
    uterine: 5, calf: 7, goat: 6, sheep: 5, split: 4,
  };
  return days[grade];
}

export function scrapingPasses(grade: VellumGrade): number {
  const passes: Record<VellumGrade, number> = {
    uterine: 8, calf: 6, goat: 5, sheep: 5, split: 3,
  };
  return passes[grade];
}

export function stretchingTensionKg(areaM2: number): number {
  return parseFloat((areaM2 * 15).toFixed(1));
}

export function inkAbsorptionRating(grade: VellumGrade): number {
  const ratings: Record<VellumGrade, number> = {
    uterine: 10, calf: 8, goat: 6, sheep: 7, split: 4,
  };
  return ratings[grade];
}

export function durabilityYears(grade: VellumGrade): number {
  const years: Record<VellumGrade, number> = {
    uterine: 1000, calf: 800, goat: 600, sheep: 700, split: 400,
  };
  return years[grade];
}

export function costPerSheet(grade: VellumGrade, baseCost: number): number {
  const mult: Record<VellumGrade, number> = {
    uterine: 10.0, calf: 3.0, goat: 1.5, sheep: 2.0, split: 1.0,
  };
  return parseFloat((baseCost * mult[grade]).toFixed(2));
}

export function vellumGrades(): VellumGrade[] {
  return ["uterine", "calf", "goat", "sheep", "split"];
}
