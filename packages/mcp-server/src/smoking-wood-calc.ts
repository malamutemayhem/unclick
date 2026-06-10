export type SmokingWood = "hickory" | "mesquite" | "apple" | "cherry" | "oak";

export function heatOutputBtu(wood: SmokingWood): number {
  const h: Record<SmokingWood, number> = {
    hickory: 28, mesquite: 32, apple: 24, cherry: 20, oak: 26,
  };
  return h[wood];
}

export function flavorIntensity(wood: SmokingWood): number {
  const f: Record<SmokingWood, number> = {
    hickory: 8, mesquite: 10, apple: 4, cherry: 5, oak: 7,
  };
  return f[wood];
}

export function sweetnessRating(wood: SmokingWood): number {
  const s: Record<SmokingWood, number> = {
    hickory: 3, mesquite: 1, apple: 8, cherry: 9, oak: 2,
  };
  return s[wood];
}

export function burnDurationHours(wood: SmokingWood): number {
  const d: Record<SmokingWood, number> = {
    hickory: 4, mesquite: 3, apple: 5, cherry: 4, oak: 6,
  };
  return d[wood];
}

export function sparkResistance(wood: SmokingWood): number {
  const s: Record<SmokingWood, number> = {
    hickory: 7, mesquite: 5, apple: 8, cherry: 9, oak: 6,
  };
  return s[wood];
}

export function bestForMeat(wood: SmokingWood): string {
  const m: Record<SmokingWood, string> = {
    hickory: "pork", mesquite: "beef", apple: "poultry",
    cherry: "game", oak: "brisket",
  };
  return m[wood];
}

export function smokeColor(wood: SmokingWood): string {
  const c: Record<SmokingWood, string> = {
    hickory: "dark_amber", mesquite: "dark_brown", apple: "light_gold",
    cherry: "rose_tint", oak: "medium_amber",
  };
  return c[wood];
}

export function ashContent(wood: SmokingWood): number {
  const a: Record<SmokingWood, number> = {
    hickory: 5, mesquite: 3, apple: 4, cherry: 4, oak: 6,
  };
  return a[wood];
}

export function costPerKg(wood: SmokingWood): number {
  const c: Record<SmokingWood, number> = {
    hickory: 4, mesquite: 5, apple: 6, cherry: 7, oak: 3,
  };
  return c[wood];
}

export function smokingWoods(): SmokingWood[] {
  return ["hickory", "mesquite", "apple", "cherry", "oak"];
}
