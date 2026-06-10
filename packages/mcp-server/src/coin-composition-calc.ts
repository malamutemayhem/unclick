export type CoinComposition = "copper" | "silver" | "gold" | "clad" | "nickel";

export function intrinsicValue(c: CoinComposition): number {
  const m: Record<CoinComposition, number> = {
    copper: 3, silver: 8, gold: 10, clad: 1, nickel: 2,
  };
  return m[c];
}

export function corrosionResistance(c: CoinComposition): number {
  const m: Record<CoinComposition, number> = {
    copper: 4, silver: 6, gold: 10, clad: 7, nickel: 8,
  };
  return m[c];
}

export function strikeQuality(c: CoinComposition): number {
  const m: Record<CoinComposition, number> = {
    copper: 8, silver: 9, gold: 10, clad: 6, nickel: 7,
  };
  return m[c];
}

export function tonePotential(c: CoinComposition): number {
  const m: Record<CoinComposition, number> = {
    copper: 10, silver: 9, gold: 2, clad: 3, nickel: 4,
  };
  return m[c];
}

export function productionCost(c: CoinComposition): number {
  const m: Record<CoinComposition, number> = {
    copper: 3, silver: 7, gold: 10, clad: 2, nickel: 4,
  };
  return m[c];
}

export function preciousMetal(c: CoinComposition): boolean {
  const m: Record<CoinComposition, boolean> = {
    copper: false, silver: true, gold: true, clad: false, nickel: false,
  };
  return m[c];
}

export function magneticProperty(c: CoinComposition): boolean {
  const m: Record<CoinComposition, boolean> = {
    copper: false, silver: false, gold: false, clad: false, nickel: true,
  };
  return m[c];
}

export function historicalUsage(c: CoinComposition): string {
  const m: Record<CoinComposition, string> = {
    copper: "cents_ancient_coins", silver: "dimes_quarters_pre_1965",
    gold: "eagles_sovereigns", clad: "modern_circulation",
    nickel: "five_cent_pieces",
  };
  return m[c];
}

export function colorAppearance(c: CoinComposition): string {
  const m: Record<CoinComposition, string> = {
    copper: "reddish_brown", silver: "bright_white",
    gold: "yellow_lustre", clad: "silver_toned",
    nickel: "grey_silver",
  };
  return m[c];
}

export function coinCompositions(): CoinComposition[] {
  return ["copper", "silver", "gold", "clad", "nickel"];
}
