export type SlateGrade = "s1_standard" | "s2_moderate" | "s3_rough" | "salvaged" | "synthetic";

export function lifespanYears(grade: SlateGrade): number {
  const l: Record<SlateGrade, number> = {
    s1_standard: 150, s2_moderate: 100, s3_rough: 75, salvaged: 50, synthetic: 50,
  };
  return l[grade];
}

export function thicknessMm(grade: SlateGrade): number {
  const t: Record<SlateGrade, number> = {
    s1_standard: 7, s2_moderate: 9, s3_rough: 12, salvaged: 10, synthetic: 6,
  };
  return t[grade];
}

export function weightKgPerM2(grade: SlateGrade): number {
  const w: Record<SlateGrade, number> = {
    s1_standard: 45, s2_moderate: 55, s3_rough: 70, salvaged: 60, synthetic: 20,
  };
  return w[grade];
}

export function frostResistance(grade: SlateGrade): number {
  const f: Record<SlateGrade, number> = {
    s1_standard: 10, s2_moderate: 7, s3_rough: 5, salvaged: 4, synthetic: 8,
  };
  return f[grade];
}

export function installationDifficulty(grade: SlateGrade): number {
  const i: Record<SlateGrade, number> = {
    s1_standard: 6, s2_moderate: 7, s3_rough: 8, salvaged: 9, synthetic: 3,
  };
  return i[grade];
}

export function naturalMaterial(grade: SlateGrade): boolean {
  const n: Record<SlateGrade, boolean> = {
    s1_standard: true, s2_moderate: true, s3_rough: true, salvaged: true, synthetic: false,
  };
  return n[grade];
}

export function bestClimate(grade: SlateGrade): string {
  const b: Record<SlateGrade, string> = {
    s1_standard: "any", s2_moderate: "temperate", s3_rough: "mild",
    salvaged: "mild", synthetic: "any",
  };
  return b[grade];
}

export function repairDifficulty(grade: SlateGrade): number {
  const r: Record<SlateGrade, number> = {
    s1_standard: 5, s2_moderate: 6, s3_rough: 7, salvaged: 9, synthetic: 2,
  };
  return r[grade];
}

export function costPerM2(grade: SlateGrade): number {
  const c: Record<SlateGrade, number> = {
    s1_standard: 120, s2_moderate: 90, s3_rough: 70, salvaged: 150, synthetic: 40,
  };
  return c[grade];
}

export function slateGrades(): SlateGrade[] {
  return ["s1_standard", "s2_moderate", "s3_rough", "salvaged", "synthetic"];
}
