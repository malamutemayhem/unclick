export type StarterType = "white_flour" | "whole_wheat" | "rye" | "spelt" | "rice";

export function hydrationPercent(starter: StarterType): number {
  const h: Record<StarterType, number> = {
    white_flour: 100, whole_wheat: 100, rye: 80, spelt: 100, rice: 120,
  };
  return h[starter];
}

export function riseTimeHours(starter: StarterType): number {
  const r: Record<StarterType, number> = {
    white_flour: 6, whole_wheat: 5, rye: 4, spelt: 5, rice: 8,
  };
  return r[starter];
}

export function flavorIntensity(starter: StarterType): number {
  const f: Record<StarterType, number> = {
    white_flour: 5, whole_wheat: 7, rye: 9, spelt: 6, rice: 3,
  };
  return f[starter];
}

export function sourness(starter: StarterType): number {
  const s: Record<StarterType, number> = {
    white_flour: 5, whole_wheat: 7, rye: 10, spelt: 6, rice: 3,
  };
  return s[starter];
}

export function feedFrequencyDays(starter: StarterType): number {
  const f: Record<StarterType, number> = {
    white_flour: 7, whole_wheat: 5, rye: 3, spelt: 5, rice: 4,
  };
  return f[starter];
}

export function glutenFree(starter: StarterType): boolean {
  const g: Record<StarterType, boolean> = {
    white_flour: false, whole_wheat: false, rye: false, spelt: false, rice: true,
  };
  return g[starter];
}

export function bestBreadType(starter: StarterType): string {
  const b: Record<StarterType, string> = {
    white_flour: "country_loaf", whole_wheat: "sandwich_bread", rye: "pumpernickel",
    spelt: "artisan_rolls", rice: "flatbread",
  };
  return b[starter];
}

export function maturityDays(starter: StarterType): number {
  const m: Record<StarterType, number> = {
    white_flour: 10, whole_wheat: 7, rye: 5, spelt: 8, rice: 14,
  };
  return m[starter];
}

export function costPerMonth(starter: StarterType): number {
  const c: Record<StarterType, number> = {
    white_flour: 3, whole_wheat: 4, rye: 5, spelt: 6, rice: 4,
  };
  return c[starter];
}

export function starterTypes(): StarterType[] {
  return ["white_flour", "whole_wheat", "rye", "spelt", "rice"];
}
