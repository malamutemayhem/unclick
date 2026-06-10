export type JuteGrade = "tossa" | "white_jute" | "mesta" | "kenaf" | "roselle";

export function fiberStrengthMpa(grade: JuteGrade): number {
  const s: Record<JuteGrade, number> = {
    tossa: 400, white_jute: 350, mesta: 300, kenaf: 280, roselle: 260,
  };
  return s[grade];
}

export function fiberLengthCm(grade: JuteGrade): number {
  const l: Record<JuteGrade, number> = {
    tossa: 200, white_jute: 180, mesta: 150, kenaf: 250, roselle: 120,
  };
  return l[grade];
}

export function lusterRating(grade: JuteGrade): number {
  const l: Record<JuteGrade, number> = {
    tossa: 8, white_jute: 6, mesta: 5, kenaf: 4, roselle: 3,
  };
  return l[grade];
}

export function moistureAbsorption(grade: JuteGrade): number {
  const m: Record<JuteGrade, number> = {
    tossa: 12, white_jute: 13, mesta: 10, kenaf: 9, roselle: 11,
  };
  return m[grade];
}

export function biodegradable(grade: JuteGrade): boolean {
  return true;
}

export function rettingDays(grade: JuteGrade): number {
  const r: Record<JuteGrade, number> = {
    tossa: 12, white_jute: 14, mesta: 10, kenaf: 8, roselle: 11,
  };
  return r[grade];
}

export function primaryUse(grade: JuteGrade): string {
  const u: Record<JuteGrade, string> = {
    tossa: "burlap_sacking", white_jute: "carpet_backing", mesta: "packing_twine",
    kenaf: "paper_pulp", roselle: "food_wrapping",
  };
  return u[grade];
}

export function yieldKgPerHectare(grade: JuteGrade): number {
  const y: Record<JuteGrade, number> = {
    tossa: 2000, white_jute: 1800, mesta: 1500, kenaf: 2500, roselle: 1200,
  };
  return y[grade];
}

export function costPerKg(grade: JuteGrade): number {
  const c: Record<JuteGrade, number> = {
    tossa: 0.8, white_jute: 0.6, mesta: 0.5, kenaf: 0.4, roselle: 0.7,
  };
  return c[grade];
}

export function juteGrades(): JuteGrade[] {
  return ["tossa", "white_jute", "mesta", "kenaf", "roselle"];
}
