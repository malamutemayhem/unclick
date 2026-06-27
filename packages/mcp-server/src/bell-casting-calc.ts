export type BellAlloy = "bell_bronze" | "brass" | "steel" | "iron" | "aluminum";

export function tinPercent(alloy: BellAlloy): number {
  const t: Record<BellAlloy, number> = {
    bell_bronze: 22, brass: 0, steel: 0, iron: 0, aluminum: 0,
  };
  return t[alloy];
}

export function pouringTempCelsius(alloy: BellAlloy): number {
  const t: Record<BellAlloy, number> = {
    bell_bronze: 1100, brass: 950, steel: 1550, iron: 1400, aluminum: 700,
  };
  return t[alloy];
}

export function resonanceRating(alloy: BellAlloy): number {
  const r: Record<BellAlloy, number> = {
    bell_bronze: 10, brass: 6, steel: 7, iron: 5, aluminum: 4,
  };
  return r[alloy];
}

export function sustainSeconds(alloy: BellAlloy): number {
  const s: Record<BellAlloy, number> = {
    bell_bronze: 60, brass: 30, steel: 45, iron: 25, aluminum: 15,
  };
  return s[alloy];
}

export function harmonicPurity(alloy: BellAlloy): number {
  const h: Record<BellAlloy, number> = {
    bell_bronze: 10, brass: 5, steel: 6, iron: 4, aluminum: 3,
  };
  return h[alloy];
}

export function tunable(alloy: BellAlloy): boolean {
  return alloy === "bell_bronze" || alloy === "steel";
}

export function weightKgPerLiter(alloy: BellAlloy): number {
  const w: Record<BellAlloy, number> = {
    bell_bronze: 8.8, brass: 8.5, steel: 7.8, iron: 7.2, aluminum: 2.7,
  };
  return w[alloy];
}

export function corrosionResistance(alloy: BellAlloy): number {
  const c: Record<BellAlloy, number> = {
    bell_bronze: 9, brass: 7, steel: 3, iron: 2, aluminum: 6,
  };
  return c[alloy];
}

export function costPerKg(alloy: BellAlloy): number {
  const c: Record<BellAlloy, number> = {
    bell_bronze: 25, brass: 12, steel: 5, iron: 3, aluminum: 8,
  };
  return c[alloy];
}

export function bellAlloys(): BellAlloy[] {
  return ["bell_bronze", "brass", "steel", "iron", "aluminum"];
}
