export type FluxType = "borax" | "sal_ammoniac" | "rosin" | "zinc_chloride" | "fluoride";

export function activeTempCelsius(type: FluxType): { min: number; max: number } {
  const ranges: Record<FluxType, { min: number; max: number }> = {
    borax: { min: 750, max: 1100 }, sal_ammoniac: { min: 300, max: 500 },
    rosin: { min: 180, max: 300 }, zinc_chloride: { min: 200, max: 400 },
    fluoride: { min: 500, max: 900 },
  };
  return ranges[type];
}

export function corrosiveRating(type: FluxType): number {
  const r: Record<FluxType, number> = {
    borax: 2, sal_ammoniac: 7, rosin: 1, zinc_chloride: 8, fluoride: 9,
  };
  return r[type];
}

export function cleaningRequired(type: FluxType): boolean {
  return type !== "rosin";
}

export function fumesLevel(type: FluxType): number {
  const f: Record<FluxType, number> = {
    borax: 3, sal_ammoniac: 8, rosin: 4, zinc_chloride: 7, fluoride: 9,
  };
  return f[type];
}

export function shelfLifeMonths(type: FluxType): number {
  const s: Record<FluxType, number> = {
    borax: 60, sal_ammoniac: 36, rosin: 24, zinc_chloride: 18, fluoride: 12,
  };
  return s[type];
}

export function bestForMetal(type: FluxType): string {
  const m: Record<FluxType, string> = {
    borax: "steel", sal_ammoniac: "tin", rosin: "copper",
    zinc_chloride: "galvanized", fluoride: "aluminum",
  };
  return m[type];
}

export function waterSoluble(type: FluxType): boolean {
  return type === "borax" || type === "sal_ammoniac" || type === "zinc_chloride";
}

export function foodSafe(type: FluxType): boolean {
  return type === "rosin";
}

export function costPerKg(type: FluxType): number {
  const c: Record<FluxType, number> = {
    borax: 8, sal_ammoniac: 15, rosin: 20, zinc_chloride: 12, fluoride: 35,
  };
  return c[type];
}

export function fluxTypes(): FluxType[] {
  return ["borax", "sal_ammoniac", "rosin", "zinc_chloride", "fluoride"];
}
