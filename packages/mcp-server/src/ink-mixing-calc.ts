export type InkBase = "oil" | "rubber" | "soy" | "water" | "uv_cure";

export function viscosityPoise(base: InkBase): number {
  const v: Record<InkBase, number> = {
    oil: 40, rubber: 25, soy: 30, water: 15, uv_cure: 50,
  };
  return v[base];
}

export function dryingTimeMinutes(base: InkBase): number {
  const t: Record<InkBase, number> = {
    oil: 120, rubber: 60, soy: 180, water: 30, uv_cure: 1,
  };
  return t[base];
}

export function tackRating(base: InkBase): number {
  const t: Record<InkBase, number> = {
    oil: 7, rubber: 5, soy: 6, water: 3, uv_cure: 8,
  };
  return t[base];
}

export function colorDensity(base: InkBase): number {
  const d: Record<InkBase, number> = {
    oil: 8, rubber: 7, soy: 6, water: 5, uv_cure: 9,
  };
  return d[base];
}

export function fadeResistance(base: InkBase): number {
  const f: Record<InkBase, number> = {
    oil: 6, rubber: 5, soy: 4, water: 3, uv_cure: 9,
  };
  return f[base];
}

export function foodSafe(base: InkBase): boolean {
  return base === "soy" || base === "water";
}

export function vocLevel(base: InkBase): number {
  const v: Record<InkBase, number> = {
    oil: 8, rubber: 6, soy: 2, water: 1, uv_cure: 3,
  };
  return v[base];
}

export function cleanupSolvent(base: InkBase): string {
  const s: Record<InkBase, string> = {
    oil: "mineral_spirits", rubber: "blanket_wash", soy: "vegetable_solvent",
    water: "water", uv_cure: "specialized_cleaner",
  };
  return s[base];
}

export function costPerKg(base: InkBase): number {
  const c: Record<InkBase, number> = {
    oil: 25, rubber: 30, soy: 35, water: 20, uv_cure: 60,
  };
  return c[base];
}

export function inkBases(): InkBase[] {
  return ["oil", "rubber", "soy", "water", "uv_cure"];
}
