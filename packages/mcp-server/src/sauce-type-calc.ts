export type SauceType = "bechamel" | "veloute" | "espagnole" | "hollandaise" | "tomato";

export function richness(s: SauceType): number {
  const m: Record<SauceType, number> = {
    bechamel: 8, veloute: 6, espagnole: 7, hollandaise: 10, tomato: 4,
  };
  return m[s];
}

export function preparationTime(s: SauceType): number {
  const m: Record<SauceType, number> = {
    bechamel: 3, veloute: 4, espagnole: 10, hollandaise: 5, tomato: 6,
  };
  return m[s];
}

export function versatility(s: SauceType): number {
  const m: Record<SauceType, number> = {
    bechamel: 9, veloute: 7, espagnole: 6, hollandaise: 4, tomato: 10,
  };
  return m[s];
}

export function difficultyLevel(s: SauceType): number {
  const m: Record<SauceType, number> = {
    bechamel: 3, veloute: 5, espagnole: 8, hollandaise: 9, tomato: 2,
  };
  return m[s];
}

export function caloriesPerServing(s: SauceType): number {
  const m: Record<SauceType, number> = {
    bechamel: 150, veloute: 100, espagnole: 80, hollandaise: 200, tomato: 50,
  };
  return m[s];
}

export function butterBased(s: SauceType): boolean {
  const m: Record<SauceType, boolean> = {
    bechamel: true, veloute: true, espagnole: false, hollandaise: true, tomato: false,
  };
  return m[s];
}

export function usesRoux(s: SauceType): boolean {
  const m: Record<SauceType, boolean> = {
    bechamel: true, veloute: true, espagnole: true, hollandaise: false, tomato: false,
  };
  return m[s];
}

export function baseLiquid(s: SauceType): string {
  const m: Record<SauceType, string> = {
    bechamel: "milk", veloute: "white_stock",
    espagnole: "brown_stock", hollandaise: "egg_yolk",
    tomato: "tomato_puree",
  };
  return m[s];
}

export function classicPairing(s: SauceType): string {
  const m: Record<SauceType, string> = {
    bechamel: "lasagna", veloute: "chicken",
    espagnole: "roast_beef", hollandaise: "eggs_benedict",
    tomato: "pasta",
  };
  return m[s];
}

export function sauceTypes(): SauceType[] {
  return ["bechamel", "veloute", "espagnole", "hollandaise", "tomato"];
}
