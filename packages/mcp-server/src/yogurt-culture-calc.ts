export type YogurtCulture = "thermophilic" | "mesophilic" | "heirloom" | "bifido" | "kefir_grain";

export function fermentationTempCelsius(culture: YogurtCulture): number {
  const t: Record<YogurtCulture, number> = {
    thermophilic: 43, mesophilic: 25, heirloom: 22, bifido: 38, kefir_grain: 22,
  };
  return t[culture];
}

export function fermentationHours(culture: YogurtCulture): number {
  const h: Record<YogurtCulture, number> = {
    thermophilic: 6, mesophilic: 12, heirloom: 24, bifido: 8, kefir_grain: 18,
  };
  return h[culture];
}

export function strainCount(culture: YogurtCulture): number {
  const s: Record<YogurtCulture, number> = {
    thermophilic: 2, mesophilic: 4, heirloom: 6, bifido: 3, kefir_grain: 30,
  };
  return s[culture];
}

export function tanginess(culture: YogurtCulture): number {
  const t: Record<YogurtCulture, number> = {
    thermophilic: 6, mesophilic: 4, heirloom: 7, bifido: 3, kefir_grain: 8,
  };
  return t[culture];
}

export function thickness(culture: YogurtCulture): number {
  const t: Record<YogurtCulture, number> = {
    thermophilic: 8, mesophilic: 5, heirloom: 6, bifido: 7, kefir_grain: 4,
  };
  return t[culture];
}

export function reusable(culture: YogurtCulture): boolean {
  return culture === "heirloom" || culture === "kefir_grain";
}

export function probioticDiversity(culture: YogurtCulture): number {
  const d: Record<YogurtCulture, number> = {
    thermophilic: 4, mesophilic: 6, heirloom: 7, bifido: 5, kefir_grain: 10,
  };
  return d[culture];
}

export function shelfStability(culture: YogurtCulture): number {
  const s: Record<YogurtCulture, number> = {
    thermophilic: 8, mesophilic: 7, heirloom: 3, bifido: 8, kefir_grain: 2,
  };
  return s[culture];
}

export function costPerDose(culture: YogurtCulture): number {
  const c: Record<YogurtCulture, number> = {
    thermophilic: 2, mesophilic: 3, heirloom: 5, bifido: 4, kefir_grain: 8,
  };
  return c[culture];
}

export function yogurtCultures(): YogurtCulture[] {
  return ["thermophilic", "mesophilic", "heirloom", "bifido", "kefir_grain"];
}
