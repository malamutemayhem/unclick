export type CheeseType = "cheddar" | "brie" | "parmesan" | "gouda" | "blue";

export function agingMonthsMin(type: CheeseType): number {
  const m: Record<CheeseType, number> = {
    cheddar: 3, brie: 1, parmesan: 12, gouda: 2, blue: 2,
  };
  return m[type];
}

export function agingTempCelsius(type: CheeseType): number {
  const t: Record<CheeseType, number> = {
    cheddar: 12, brie: 10, parmesan: 16, gouda: 13, blue: 10,
  };
  return t[type];
}

export function humidityPercent(type: CheeseType): number {
  const h: Record<CheeseType, number> = {
    cheddar: 85, brie: 95, parmesan: 80, gouda: 85, blue: 95,
  };
  return h[type];
}

export function turningFrequencyDays(type: CheeseType): number {
  const f: Record<CheeseType, number> = {
    cheddar: 7, brie: 1, parmesan: 7, gouda: 14, blue: 3,
  };
  return f[type];
}

export function rindType(type: CheeseType): string {
  const r: Record<CheeseType, string> = {
    cheddar: "cloth_bound", brie: "bloomy", parmesan: "natural",
    gouda: "wax", blue: "natural",
  };
  return r[type];
}

export function moistureLossPercent(type: CheeseType): number {
  const m: Record<CheeseType, number> = {
    cheddar: 15, brie: 5, parmesan: 30, gouda: 20, blue: 10,
  };
  return m[type];
}

export function flavorIntensity(type: CheeseType): number {
  const f: Record<CheeseType, number> = {
    cheddar: 6, brie: 5, parmesan: 9, gouda: 5, blue: 10,
  };
  return f[type];
}

export function piercingRequired(type: CheeseType): boolean {
  return type === "blue";
}

export function costPerKg(type: CheeseType): number {
  const c: Record<CheeseType, number> = {
    cheddar: 15, brie: 20, parmesan: 35, gouda: 18, blue: 25,
  };
  return c[type];
}

export function cheeseTypes(): CheeseType[] {
  return ["cheddar", "brie", "parmesan", "gouda", "blue"];
}
