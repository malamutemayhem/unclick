export type PickleMethod = "quick_pickle" | "full_sour" | "half_sour" | "bread_butter" | "refrigerator";

export function acidityPercent(method: PickleMethod): number {
  const a: Record<PickleMethod, number> = {
    quick_pickle: 5, full_sour: 3.5, half_sour: 2, bread_butter: 5, refrigerator: 4,
  };
  return a[method];
}

export function processingDays(method: PickleMethod): number {
  const p: Record<PickleMethod, number> = {
    quick_pickle: 1, full_sour: 21, half_sour: 7, bread_butter: 1, refrigerator: 3,
  };
  return p[method];
}

export function crunchRetention(method: PickleMethod): number {
  const c: Record<PickleMethod, number> = {
    quick_pickle: 7, full_sour: 4, half_sour: 8, bread_butter: 5, refrigerator: 9,
  };
  return c[method];
}

export function shelfLifeMonths(method: PickleMethod): number {
  const s: Record<PickleMethod, number> = {
    quick_pickle: 12, full_sour: 6, half_sour: 2, bread_butter: 12, refrigerator: 2,
  };
  return s[method];
}

export function fermented(method: PickleMethod): boolean {
  const f: Record<PickleMethod, boolean> = {
    quick_pickle: false, full_sour: true, half_sour: true, bread_butter: false, refrigerator: false,
  };
  return f[method];
}

export function sugarAdded(method: PickleMethod): boolean {
  const s: Record<PickleMethod, boolean> = {
    quick_pickle: false, full_sour: false, half_sour: false, bread_butter: true, refrigerator: false,
  };
  return s[method];
}

export function bestVegetable(method: PickleMethod): string {
  const b: Record<PickleMethod, string> = {
    quick_pickle: "onions", full_sour: "cucumbers", half_sour: "cucumbers",
    bread_butter: "cucumbers", refrigerator: "carrots",
  };
  return b[method];
}

export function probioticBenefit(method: PickleMethod): boolean {
  const p: Record<PickleMethod, boolean> = {
    quick_pickle: false, full_sour: true, half_sour: true, bread_butter: false, refrigerator: false,
  };
  return p[method];
}

export function difficultyRating(method: PickleMethod): number {
  const d: Record<PickleMethod, number> = {
    quick_pickle: 1, full_sour: 5, half_sour: 4, bread_butter: 2, refrigerator: 1,
  };
  return d[method];
}

export function pickleMethods(): PickleMethod[] {
  return ["quick_pickle", "full_sour", "half_sour", "bread_butter", "refrigerator"];
}
