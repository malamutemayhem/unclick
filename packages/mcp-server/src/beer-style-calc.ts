export type BeerStyle = "ipa" | "stout" | "pilsner" | "wheat" | "sour";

export function ibuRange(b: BeerStyle): number {
  const m: Record<BeerStyle, number> = {
    ipa: 60, stout: 35, pilsner: 30, wheat: 15, sour: 10,
  };
  return m[b];
}

export function abvTypical(b: BeerStyle): number {
  const m: Record<BeerStyle, number> = {
    ipa: 7, stout: 6, pilsner: 5, wheat: 5, sour: 4,
  };
  return m[b];
}

export function colorSrm(b: BeerStyle): number {
  const m: Record<BeerStyle, number> = {
    ipa: 8, stout: 35, pilsner: 3, wheat: 4, sour: 5,
  };
  return m[b];
}

export function carbonationLevel(b: BeerStyle): number {
  const m: Record<BeerStyle, number> = {
    ipa: 5, stout: 3, pilsner: 7, wheat: 8, sour: 6,
  };
  return m[b];
}

export function bodyWeight(b: BeerStyle): number {
  const m: Record<BeerStyle, number> = {
    ipa: 6, stout: 9, pilsner: 4, wheat: 5, sour: 3,
  };
  return m[b];
}

export function isAle(b: BeerStyle): boolean {
  const m: Record<BeerStyle, boolean> = {
    ipa: true, stout: true, pilsner: false, wheat: true, sour: true,
  };
  return m[b];
}

export function sessionable(b: BeerStyle): boolean {
  const m: Record<BeerStyle, boolean> = {
    ipa: false, stout: false, pilsner: true, wheat: true, sour: true,
  };
  return m[b];
}

export function dominantFlavor(b: BeerStyle): string {
  const m: Record<BeerStyle, string> = {
    ipa: "hop_citrus_pine", stout: "roast_chocolate_coffee",
    pilsner: "crisp_malt_balanced", wheat: "banana_clove_bread",
    sour: "tart_fruity_funky",
  };
  return m[b];
}

export function servingTempC(b: BeerStyle): string {
  const m: Record<BeerStyle, string> = {
    ipa: "7_10_cool", stout: "10_13_cellar",
    pilsner: "3_5_cold", wheat: "5_8_cool",
    sour: "7_10_cool",
  };
  return m[b];
}

export function beerStyles(): BeerStyle[] {
  return ["ipa", "stout", "pilsner", "wheat", "sour"];
}
