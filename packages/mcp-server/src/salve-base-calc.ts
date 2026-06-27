export type SalveBase = "beeswax" | "shea_butter" | "coconut_oil" | "lanolin" | "tallow";

export function meltingPointCelsius(base: SalveBase): number {
  const m: Record<SalveBase, number> = {
    beeswax: 63, shea_butter: 35, coconut_oil: 24, lanolin: 40, tallow: 45,
  };
  return m[base];
}

export function skinAbsorption(base: SalveBase): number {
  const m: Record<SalveBase, number> = {
    beeswax: 3, shea_butter: 8, coconut_oil: 9, lanolin: 7, tallow: 6,
  };
  return m[base];
}

export function moistureBarrier(base: SalveBase): number {
  const m: Record<SalveBase, number> = {
    beeswax: 9, shea_butter: 6, coconut_oil: 5, lanolin: 8, tallow: 7,
  };
  return m[base];
}

export function herbCarryingCapacity(base: SalveBase): number {
  const m: Record<SalveBase, number> = {
    beeswax: 5, shea_butter: 7, coconut_oil: 8, lanolin: 6, tallow: 7,
  };
  return m[base];
}

export function shelfLifeMonths(base: SalveBase): number {
  const m: Record<SalveBase, number> = {
    beeswax: 24, shea_butter: 18, coconut_oil: 12, lanolin: 24, tallow: 12,
  };
  return m[base];
}

export function vegan(base: SalveBase): boolean {
  const m: Record<SalveBase, boolean> = {
    beeswax: false, shea_butter: true, coconut_oil: true, lanolin: false, tallow: false,
  };
  return m[base];
}

export function hypoallergenic(base: SalveBase): boolean {
  const m: Record<SalveBase, boolean> = {
    beeswax: true, shea_butter: true, coconut_oil: false, lanolin: false, tallow: true,
  };
  return m[base];
}

export function bestUse(base: SalveBase): string {
  const m: Record<SalveBase, string> = {
    beeswax: "lip_balm", shea_butter: "body_butter", coconut_oil: "hair_treatment",
    lanolin: "nipple_cream", tallow: "hand_salve",
  };
  return m[base];
}

export function costPerKg(base: SalveBase): number {
  const m: Record<SalveBase, number> = {
    beeswax: 25, shea_butter: 15, coconut_oil: 10, lanolin: 35, tallow: 8,
  };
  return m[base];
}

export function salveBases(): SalveBase[] {
  return ["beeswax", "shea_butter", "coconut_oil", "lanolin", "tallow"];
}
