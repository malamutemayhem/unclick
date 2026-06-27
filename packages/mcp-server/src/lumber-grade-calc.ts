export type LumberGrade = "FAS" | "select" | "no1_common" | "no2_common" | "no3_common";

export function clearFacePercent(grade: LumberGrade): number {
  const c: Record<LumberGrade, number> = {
    FAS: 83, select: 83, no1_common: 66, no2_common: 50, no3_common: 33,
  };
  return c[grade];
}

export function minBoardWidthInches(grade: LumberGrade): number {
  const w: Record<LumberGrade, number> = {
    FAS: 6, select: 4, no1_common: 3, no2_common: 3, no3_common: 3,
  };
  return w[grade];
}

export function minBoardLengthFeet(grade: LumberGrade): number {
  const l: Record<LumberGrade, number> = {
    FAS: 8, select: 6, no1_common: 4, no2_common: 4, no3_common: 4,
  };
  return l[grade];
}

export function knotAllowance(grade: LumberGrade): number {
  const k: Record<LumberGrade, number> = {
    FAS: 0, select: 1, no1_common: 3, no2_common: 5, no3_common: 8,
  };
  return k[grade];
}

export function priceMultiplier(grade: LumberGrade): number {
  const p: Record<LumberGrade, number> = {
    FAS: 2.5, select: 2.0, no1_common: 1.5, no2_common: 1.0, no3_common: 0.6,
  };
  return p[grade];
}

export function furnitureSuitable(grade: LumberGrade): boolean {
  const f: Record<LumberGrade, boolean> = {
    FAS: true, select: true, no1_common: true, no2_common: false, no3_common: false,
  };
  return f[grade];
}

export function typicalUse(grade: LumberGrade): string {
  const u: Record<LumberGrade, string> = {
    FAS: "fine_furniture", select: "cabinetry", no1_common: "general_woodwork",
    no2_common: "shelving", no3_common: "crating",
  };
  return u[grade];
}

export function wastePercent(grade: LumberGrade): number {
  const w: Record<LumberGrade, number> = {
    FAS: 5, select: 10, no1_common: 20, no2_common: 35, no3_common: 55,
  };
  return w[grade];
}

export function availabilityRating(grade: LumberGrade): number {
  const a: Record<LumberGrade, number> = {
    FAS: 3, select: 5, no1_common: 8, no2_common: 9, no3_common: 10,
  };
  return a[grade];
}

export function lumberGrades(): LumberGrade[] {
  return ["FAS", "select", "no1_common", "no2_common", "no3_common"];
}
