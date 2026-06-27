export type SaffronGrade = "sargol" | "negin" | "pushal" | "bunch" | "konj";

export function crocetinPercent(grade: SaffronGrade): number {
  const c: Record<SaffronGrade, number> = {
    sargol: 8, negin: 7, pushal: 5, bunch: 3, konj: 2,
  };
  return c[grade];
}

export function coloringStrength(grade: SaffronGrade): number {
  const s: Record<SaffronGrade, number> = {
    sargol: 260, negin: 240, pushal: 180, bunch: 120, konj: 80,
  };
  return s[grade];
}

export function stigmasPerGram(grade: SaffronGrade): number {
  const s: Record<SaffronGrade, number> = {
    sargol: 450, negin: 400, pushal: 350, bunch: 300, konj: 250,
  };
  return s[grade];
}

export function lighfastness(grade: SaffronGrade): number {
  const l: Record<SaffronGrade, number> = {
    sargol: 4, negin: 4, pushal: 3, bunch: 2, konj: 2,
  };
  return l[grade];
}

export function dyeBathMinutes(grade: SaffronGrade): number {
  const m: Record<SaffronGrade, number> = {
    sargol: 30, negin: 35, pushal: 45, bunch: 60, konj: 60,
  };
  return m[grade];
}

export function mordantFree(grade: SaffronGrade): boolean {
  return true;
}

export function flowersPer100g(grade: SaffronGrade): number {
  const f: Record<SaffronGrade, number> = {
    sargol: 15000, negin: 12000, pushal: 10000, bunch: 8000, konj: 6000,
  };
  return f[grade];
}

export function primaryUse(grade: SaffronGrade): string {
  const u: Record<SaffronGrade, string> = {
    sargol: "luxury_textile", negin: "fine_textile", pushal: "general_dye",
    bunch: "food_dye", konj: "bulk_coloring",
  };
  return u[grade];
}

export function costPerGram(grade: SaffronGrade): number {
  const c: Record<SaffronGrade, number> = {
    sargol: 12, negin: 10, pushal: 7, bunch: 4, konj: 2,
  };
  return c[grade];
}

export function saffronGrades(): SaffronGrade[] {
  return ["sargol", "negin", "pushal", "bunch", "konj"];
}
