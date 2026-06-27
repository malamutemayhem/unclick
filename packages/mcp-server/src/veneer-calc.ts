export type VeneerMatch = "book" | "slip" | "random" | "radial" | "diamond";

export function sheetAreaM2(widthCm: number, lengthCm: number): number {
  return parseFloat((widthCm * lengthCm / 10000).toFixed(3));
}

export function sheetsNeeded(coverageM2: number, sheetAreaM2: number, wasteFactor: number): number {
  if (sheetAreaM2 <= 0) return 0;
  return Math.ceil(coverageM2 / sheetAreaM2 * wasteFactor);
}

export function pressurePsi(technique: "vacuum" | "mechanical" | "hammer"): number {
  const pressures: Record<string, number> = { vacuum: 12, mechanical: 100, hammer: 5 };
  return pressures[technique];
}

export function openTimeMins(glueType: "pva" | "hide" | "contact" | "epoxy"): number {
  const times: Record<string, number> = { pva: 15, hide: 5, contact: 0, epoxy: 45 };
  return times[glueType];
}

export function cureTimeHours(glueType: "pva" | "hide" | "contact" | "epoxy"): number {
  const times: Record<string, number> = { pva: 24, hide: 12, contact: 0, epoxy: 72 };
  return times[glueType];
}

export function grainMatchSheets(match: VeneerMatch): number {
  const sheets: Record<VeneerMatch, number> = {
    book: 2, slip: 2, random: 1, radial: 4, diamond: 4,
  };
  return sheets[match];
}

export function edgeBandingLengthM(perimeterCm: number): number {
  return parseFloat((perimeterCm / 100 * 1.1).toFixed(2));
}

export function flatteningTimeHours(sheetCount: number): number {
  return parseFloat((sheetCount * 0.5).toFixed(1));
}

export function qualityGrade(match: VeneerMatch): number {
  const grades: Record<VeneerMatch, number> = {
    book: 9, slip: 7, random: 5, radial: 10, diamond: 10,
  };
  return grades[match];
}

export function costMultiplier(match: VeneerMatch): number {
  const mult: Record<VeneerMatch, number> = {
    book: 1.5, slip: 1.3, random: 1.0, radial: 2.0, diamond: 2.5,
  };
  return mult[match];
}

export function veneerMatches(): VeneerMatch[] {
  return ["book", "slip", "random", "radial", "diamond"];
}
