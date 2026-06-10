export type LeatherType = "full_grain" | "top_grain" | "bonded" | "suede" | "patent";

export function durabilityYears(leather: LeatherType): number {
  const m: Record<LeatherType, number> = {
    full_grain: 50, top_grain: 30, bonded: 5, suede: 15, patent: 10,
  };
  return m[leather];
}

export function softness(leather: LeatherType): number {
  const m: Record<LeatherType, number> = {
    full_grain: 6, top_grain: 8, bonded: 4, suede: 10, patent: 5,
  };
  return m[leather];
}

export function waterResistance(leather: LeatherType): number {
  const m: Record<LeatherType, number> = {
    full_grain: 8, top_grain: 7, bonded: 3, suede: 1, patent: 10,
  };
  return m[leather];
}

export function breathability(leather: LeatherType): number {
  const m: Record<LeatherType, number> = {
    full_grain: 10, top_grain: 7, bonded: 2, suede: 8, patent: 1,
  };
  return m[leather];
}

export function patinaRating(leather: LeatherType): number {
  const m: Record<LeatherType, number> = {
    full_grain: 10, top_grain: 6, bonded: 0, suede: 3, patent: 0,
  };
  return m[leather];
}

export function glossy(leather: LeatherType): boolean {
  const m: Record<LeatherType, boolean> = {
    full_grain: false, top_grain: false, bonded: false, suede: false, patent: true,
  };
  return m[leather];
}

export function napped(leather: LeatherType): boolean {
  const m: Record<LeatherType, boolean> = {
    full_grain: false, top_grain: false, bonded: false, suede: true, patent: false,
  };
  return m[leather];
}

export function bestApplication(leather: LeatherType): string {
  const m: Record<LeatherType, string> = {
    full_grain: "boots", top_grain: "handbags", bonded: "bookbinding",
    suede: "jackets", patent: "formal_shoes",
  };
  return m[leather];
}

export function pricePerSqFt(leather: LeatherType): number {
  const m: Record<LeatherType, number> = {
    full_grain: 15, top_grain: 10, bonded: 3, suede: 8, patent: 12,
  };
  return m[leather];
}

export function leatherTypes(): LeatherType[] {
  return ["full_grain", "top_grain", "bonded", "suede", "patent"];
}
