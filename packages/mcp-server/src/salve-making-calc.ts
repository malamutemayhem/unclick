export type SalveBase = "beeswax" | "shea_butter" | "cocoa_butter" | "lanolin" | "tallow";

export function meltingPointCelsius(base: SalveBase): number {
  const m: Record<SalveBase, number> = {
    beeswax: 64, shea_butter: 36, cocoa_butter: 34, lanolin: 40, tallow: 45,
  };
  return m[base];
}

export function absorptionRate(base: SalveBase): number {
  const a: Record<SalveBase, number> = {
    beeswax: 3, shea_butter: 8, cocoa_butter: 7, lanolin: 9, tallow: 6,
  };
  return a[base];
}

export function moisturizingRating(base: SalveBase): number {
  const m: Record<SalveBase, number> = {
    beeswax: 5, shea_butter: 9, cocoa_butter: 8, lanolin: 10, tallow: 7,
  };
  return m[base];
}

export function barrierStrength(base: SalveBase): number {
  const b: Record<SalveBase, number> = {
    beeswax: 10, shea_butter: 6, cocoa_butter: 7, lanolin: 8, tallow: 9,
  };
  return b[base];
}

export function veganFriendly(base: SalveBase): boolean {
  const v: Record<SalveBase, boolean> = {
    beeswax: false, shea_butter: true, cocoa_butter: true, lanolin: false, tallow: false,
  };
  return v[base];
}

export function allergenRisk(base: SalveBase): number {
  const a: Record<SalveBase, number> = {
    beeswax: 2, shea_butter: 1, cocoa_butter: 1, lanolin: 7, tallow: 3,
  };
  return a[base];
}

export function bestApplication(base: SalveBase): string {
  const b: Record<SalveBase, string> = {
    beeswax: "lip_balm", shea_butter: "body_butter", cocoa_butter: "stretch_marks",
    lanolin: "cracked_skin", tallow: "all_purpose",
  };
  return b[base];
}

export function shelfLifeMonths(base: SalveBase): number {
  const s: Record<SalveBase, number> = {
    beeswax: 24, shea_butter: 18, cocoa_butter: 24, lanolin: 12, tallow: 12,
  };
  return s[base];
}

export function costPerKg(base: SalveBase): number {
  const c: Record<SalveBase, number> = {
    beeswax: 30, shea_butter: 15, cocoa_butter: 20, lanolin: 25, tallow: 8,
  };
  return c[base];
}

export function salveBases(): SalveBase[] {
  return ["beeswax", "shea_butter", "cocoa_butter", "lanolin", "tallow"];
}
