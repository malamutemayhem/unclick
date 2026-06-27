export type LyeSource = "wood_ash" | "sodium_hydroxide" | "potassium_hydroxide" | "barilla" | "kelp_ash";

export function concentrationPercent(source: LyeSource): number {
  const c: Record<LyeSource, number> = {
    wood_ash: 3, sodium_hydroxide: 50, potassium_hydroxide: 45, barilla: 8, kelp_ash: 5,
  };
  return c[source];
}

export function preparationHours(source: LyeSource): number {
  const p: Record<LyeSource, number> = {
    wood_ash: 48, sodium_hydroxide: 0.5, potassium_hydroxide: 0.5, barilla: 24, kelp_ash: 36,
  };
  return p[source];
}

export function phLevel(source: LyeSource): number {
  const p: Record<LyeSource, number> = {
    wood_ash: 11, sodium_hydroxide: 14, potassium_hydroxide: 14, barilla: 12, kelp_ash: 11,
  };
  return p[source];
}

export function hardSoap(source: LyeSource): boolean {
  const h: Record<LyeSource, boolean> = {
    wood_ash: false, sodium_hydroxide: true, potassium_hydroxide: false, barilla: false, kelp_ash: false,
  };
  return h[source];
}

export function historicalAvailability(source: LyeSource): boolean {
  const h: Record<LyeSource, boolean> = {
    wood_ash: true, sodium_hydroxide: false, potassium_hydroxide: false, barilla: true, kelp_ash: true,
  };
  return h[source];
}

export function consistencyRating(source: LyeSource): number {
  const c: Record<LyeSource, number> = {
    wood_ash: 3, sodium_hydroxide: 10, potassium_hydroxide: 10, barilla: 5, kelp_ash: 4,
  };
  return c[source];
}

export function safetyRisk(source: LyeSource): number {
  const s: Record<LyeSource, number> = {
    wood_ash: 3, sodium_hydroxide: 9, potassium_hydroxide: 9, barilla: 4, kelp_ash: 3,
  };
  return s[source];
}

export function bestProduct(source: LyeSource): string {
  const b: Record<LyeSource, string> = {
    wood_ash: "soft_soap", sodium_hydroxide: "bar_soap", potassium_hydroxide: "liquid_soap",
    barilla: "glass_making", kelp_ash: "soft_soap",
  };
  return b[source];
}

export function costPerKg(source: LyeSource): number {
  const c: Record<LyeSource, number> = {
    wood_ash: 2, sodium_hydroxide: 5, potassium_hydroxide: 8, barilla: 6, kelp_ash: 3,
  };
  return c[source];
}

export function lyeSources(): LyeSource[] {
  return ["wood_ash", "sodium_hydroxide", "potassium_hydroxide", "barilla", "kelp_ash"];
}
