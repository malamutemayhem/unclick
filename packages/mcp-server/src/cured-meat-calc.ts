export type CuredMeatType = "prosciutto" | "bresaola" | "pancetta" | "guanciale" | "coppa";

export function curingWeeks(meat: CuredMeatType): number {
  const w: Record<CuredMeatType, number> = {
    prosciutto: 52, bresaola: 12, pancetta: 8, guanciale: 12, coppa: 16,
  };
  return w[meat];
}

export function saltPercent(meat: CuredMeatType): number {
  const s: Record<CuredMeatType, number> = {
    prosciutto: 4, bresaola: 5, pancetta: 6, guanciale: 5, coppa: 4,
  };
  return s[meat];
}

export function fatContentPercent(meat: CuredMeatType): number {
  const f: Record<CuredMeatType, number> = {
    prosciutto: 25, bresaola: 5, pancetta: 50, guanciale: 70, coppa: 30,
  };
  return f[meat];
}

export function curingTempCelsius(meat: CuredMeatType): number {
  const t: Record<CuredMeatType, number> = {
    prosciutto: 14, bresaola: 12, pancetta: 10, guanciale: 12, coppa: 13,
  };
  return t[meat];
}

export function moistureLossPercent(meat: CuredMeatType): number {
  const m: Record<CuredMeatType, number> = {
    prosciutto: 35, bresaola: 40, pancetta: 20, guanciale: 15, coppa: 30,
  };
  return m[meat];
}

export function slicingThicknessMm(meat: CuredMeatType): number {
  const s: Record<CuredMeatType, number> = {
    prosciutto: 1, bresaola: 2, pancetta: 3, guanciale: 5, coppa: 2,
  };
  return s[meat];
}

export function bestServingMethod(meat: CuredMeatType): string {
  const m: Record<CuredMeatType, string> = {
    prosciutto: "raw_sliced", bresaola: "raw_sliced", pancetta: "cooked",
    guanciale: "rendered", coppa: "raw_sliced",
  };
  return m[meat];
}

export function proteinPercent(meat: CuredMeatType): number {
  const p: Record<CuredMeatType, number> = {
    prosciutto: 26, bresaola: 34, pancetta: 14, guanciale: 8, coppa: 22,
  };
  return p[meat];
}

export function costPerKg(meat: CuredMeatType): number {
  const c: Record<CuredMeatType, number> = {
    prosciutto: 45, bresaola: 55, pancetta: 25, guanciale: 35, coppa: 40,
  };
  return c[meat];
}

export function curedMeatTypes(): CuredMeatType[] {
  return ["prosciutto", "bresaola", "pancetta", "guanciale", "coppa"];
}
