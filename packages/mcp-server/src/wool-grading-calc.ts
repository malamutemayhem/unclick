export type WoolGrade = "fine" | "medium" | "coarse" | "carpet" | "superfine";

export function micronRange(grade: WoolGrade): number {
  const m: Record<WoolGrade, number> = {
    superfine: 16, fine: 20, medium: 26, coarse: 33, carpet: 40,
  };
  return m[grade];
}

export function stapleLengthCm(grade: WoolGrade): number {
  const l: Record<WoolGrade, number> = {
    superfine: 7, fine: 9, medium: 12, coarse: 15, carpet: 20,
  };
  return l[grade];
}

export function crimpPerCm(grade: WoolGrade): number {
  const c: Record<WoolGrade, number> = {
    superfine: 12, fine: 8, medium: 5, coarse: 3, carpet: 1,
  };
  return c[grade];
}

export function softness(grade: WoolGrade): number {
  const s: Record<WoolGrade, number> = {
    superfine: 10, fine: 8, medium: 6, coarse: 3, carpet: 1,
  };
  return s[grade];
}

export function durability(grade: WoolGrade): number {
  const d: Record<WoolGrade, number> = {
    superfine: 3, fine: 5, medium: 7, coarse: 9, carpet: 10,
  };
  return d[grade];
}

export function feltingAbility(grade: WoolGrade): number {
  const f: Record<WoolGrade, number> = {
    superfine: 9, fine: 8, medium: 6, coarse: 4, carpet: 2,
  };
  return f[grade];
}

export function bestUse(grade: WoolGrade): string {
  const u: Record<WoolGrade, string> = {
    superfine: "next_to_skin", fine: "garments", medium: "outerwear",
    coarse: "rugs", carpet: "insulation",
  };
  return u[grade];
}

export function yieldPercent(grade: WoolGrade): number {
  const y: Record<WoolGrade, number> = {
    superfine: 45, fine: 55, medium: 60, coarse: 65, carpet: 70,
  };
  return y[grade];
}

export function pricePerKg(grade: WoolGrade): number {
  const p: Record<WoolGrade, number> = {
    superfine: 80, fine: 40, medium: 20, coarse: 10, carpet: 5,
  };
  return p[grade];
}

export function woolGrades(): WoolGrade[] {
  return ["fine", "medium", "coarse", "carpet", "superfine"];
}
