export type KefirType = "milk_kefir" | "water_kefir" | "coconut_kefir" | "goat_kefir" | "cream_kefir";

export function fermentationHours(ktype: KefirType): number {
  const h: Record<KefirType, number> = {
    milk_kefir: 24, water_kefir: 48, coconut_kefir: 24, goat_kefir: 18, cream_kefir: 12,
  };
  return h[ktype];
}

export function idealTempCelsius(ktype: KefirType): number {
  const t: Record<KefirType, number> = {
    milk_kefir: 22, water_kefir: 24, coconut_kefir: 25, goat_kefir: 20, cream_kefir: 20,
  };
  return t[ktype];
}

export function probioticStrains(ktype: KefirType): number {
  const s: Record<KefirType, number> = {
    milk_kefir: 30, water_kefir: 15, coconut_kefir: 12, goat_kefir: 28, cream_kefir: 25,
  };
  return s[ktype];
}

export function tanginess(ktype: KefirType): number {
  const t: Record<KefirType, number> = {
    milk_kefir: 7, water_kefir: 4, coconut_kefir: 5, goat_kefir: 8, cream_kefir: 6,
  };
  return t[ktype];
}

export function carbonation(ktype: KefirType): number {
  const c: Record<KefirType, number> = {
    milk_kefir: 3, water_kefir: 8, coconut_kefir: 5, goat_kefir: 3, cream_kefir: 1,
  };
  return c[ktype];
}

export function grainGrowthRate(ktype: KefirType): number {
  const g: Record<KefirType, number> = {
    milk_kefir: 8, water_kefir: 5, coconut_kefir: 3, goat_kefir: 7, cream_kefir: 6,
  };
  return g[ktype];
}

export function dairyFree(ktype: KefirType): boolean {
  return ktype === "water_kefir" || ktype === "coconut_kefir";
}

export function proteinGPerServing(ktype: KefirType): number {
  const p: Record<KefirType, number> = {
    milk_kefir: 11, water_kefir: 0, coconut_kefir: 1, goat_kefir: 9, cream_kefir: 6,
  };
  return p[ktype];
}

export function costPerLiter(ktype: KefirType): number {
  const c: Record<KefirType, number> = {
    milk_kefir: 3, water_kefir: 2, coconut_kefir: 6, goat_kefir: 5, cream_kefir: 7,
  };
  return c[ktype];
}

export function kefirTypes(): KefirType[] {
  return ["milk_kefir", "water_kefir", "coconut_kefir", "goat_kefir", "cream_kefir"];
}
