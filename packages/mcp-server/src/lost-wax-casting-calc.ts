export type CastingMetal = "bronze" | "gold" | "silver" | "brass" | "pewter";

export function pouringTempCelsius(metal: CastingMetal): number {
  const t: Record<CastingMetal, number> = {
    bronze: 1100, gold: 1100, silver: 1000, brass: 950, pewter: 280,
  };
  return t[metal];
}

export function shrinkagePercent(metal: CastingMetal): number {
  const s: Record<CastingMetal, number> = {
    bronze: 1.5, gold: 1.6, silver: 1.7, brass: 1.4, pewter: 0.5,
  };
  return s[metal];
}

export function detailResolution(metal: CastingMetal): number {
  const d: Record<CastingMetal, number> = {
    bronze: 8, gold: 10, silver: 9, brass: 7, pewter: 5,
  };
  return d[metal];
}

export function burnoutTempCelsius(metal: CastingMetal): number {
  const b: Record<CastingMetal, number> = {
    bronze: 730, gold: 730, silver: 700, brass: 730, pewter: 400,
  };
  return b[metal];
}

export function investmentLayers(metal: CastingMetal): number {
  const i: Record<CastingMetal, number> = {
    bronze: 6, gold: 8, silver: 7, brass: 5, pewter: 3,
  };
  return i[metal];
}

export function chasingRequired(metal: CastingMetal): boolean {
  return metal !== "pewter";
}

export function patinaPossible(metal: CastingMetal): boolean {
  return metal === "bronze" || metal === "brass";
}

export function finishingHours(metal: CastingMetal): number {
  const h: Record<CastingMetal, number> = {
    bronze: 8, gold: 12, silver: 10, brass: 6, pewter: 3,
  };
  return h[metal];
}

export function costPerKg(metal: CastingMetal): number {
  const c: Record<CastingMetal, number> = {
    bronze: 20, gold: 60000, silver: 800, brass: 12, pewter: 15,
  };
  return c[metal];
}

export function castingMetals(): CastingMetal[] {
  return ["bronze", "gold", "silver", "brass", "pewter"];
}
