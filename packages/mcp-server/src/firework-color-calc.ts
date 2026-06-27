export type FireworkColor = "red" | "green" | "blue" | "gold" | "white";

export function visibilityRange(c: FireworkColor): number {
  const m: Record<FireworkColor, number> = {
    red: 9, green: 7, blue: 5, gold: 8, white: 10,
  };
  return m[c];
}

export function productionDifficulty(c: FireworkColor): number {
  const m: Record<FireworkColor, number> = {
    red: 3, green: 6, blue: 9, gold: 4, white: 2,
  };
  return m[c];
}

export function chemicalStability(c: FireworkColor): number {
  const m: Record<FireworkColor, number> = {
    red: 8, green: 5, blue: 4, gold: 9, white: 10,
  };
  return m[c];
}

export function intensityRating(c: FireworkColor): number {
  const m: Record<FireworkColor, number> = {
    red: 8, green: 7, blue: 6, gold: 9, white: 10,
  };
  return m[c];
}

export function costFactor(c: FireworkColor): number {
  const m: Record<FireworkColor, number> = {
    red: 3, green: 5, blue: 8, gold: 4, white: 2,
  };
  return m[c];
}

export function environmentallySafe(c: FireworkColor): boolean {
  const m: Record<FireworkColor, boolean> = {
    red: true, green: false, blue: false, gold: true, white: true,
  };
  return m[c];
}

export function traditionalUse(c: FireworkColor): boolean {
  const m: Record<FireworkColor, boolean> = {
    red: true, green: true, blue: true, gold: true, white: true,
  };
  return m[c];
}

export function metalSalt(c: FireworkColor): string {
  const m: Record<FireworkColor, string> = {
    red: "strontium_carbonate", green: "barium_chlorate",
    blue: "copper_chloride", gold: "iron_charcoal",
    white: "titanium_magnesium",
  };
  return m[c];
}

export function culturalMeaning(c: FireworkColor): string {
  const m: Record<FireworkColor, string> = {
    red: "luck_celebration", green: "nature_renewal",
    blue: "peace_calm", gold: "wealth_prosperity",
    white: "purity_new_beginning",
  };
  return m[c];
}

export function fireworkColors(): FireworkColor[] {
  return ["red", "green", "blue", "gold", "white"];
}
