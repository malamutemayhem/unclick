export type CheeseType = "cheddar" | "brie" | "parmesan" | "gouda" | "blue";

export function agingMonths(cheese: CheeseType): number {
  const m: Record<CheeseType, number> = {
    cheddar: 12, brie: 1, parmesan: 24, gouda: 6, blue: 3,
  };
  return m[cheese];
}

export function fatContentPercent(cheese: CheeseType): number {
  const m: Record<CheeseType, number> = {
    cheddar: 33, brie: 28, parmesan: 25, gouda: 30, blue: 29,
  };
  return m[cheese];
}

export function flavorIntensity(cheese: CheeseType): number {
  const m: Record<CheeseType, number> = {
    cheddar: 7, brie: 5, parmesan: 9, gouda: 6, blue: 10,
  };
  return m[cheese];
}

export function meltability(cheese: CheeseType): number {
  const m: Record<CheeseType, number> = {
    cheddar: 9, brie: 8, parmesan: 3, gouda: 8, blue: 5,
  };
  return m[cheese];
}

export function caloriesPer100g(cheese: CheeseType): number {
  const m: Record<CheeseType, number> = {
    cheddar: 403, brie: 334, parmesan: 431, gouda: 356, blue: 353,
  };
  return m[cheese];
}

export function softTexture(cheese: CheeseType): boolean {
  const m: Record<CheeseType, boolean> = {
    cheddar: false, brie: true, parmesan: false, gouda: false, blue: false,
  };
  return m[cheese];
}

export function moldRipened(cheese: CheeseType): boolean {
  const m: Record<CheeseType, boolean> = {
    cheddar: false, brie: true, parmesan: false, gouda: false, blue: true,
  };
  return m[cheese];
}

export function originCountry(cheese: CheeseType): string {
  const m: Record<CheeseType, string> = {
    cheddar: "england", brie: "france", parmesan: "italy",
    gouda: "netherlands", blue: "france",
  };
  return m[cheese];
}

export function pairsWith(cheese: CheeseType): string {
  const m: Record<CheeseType, string> = {
    cheddar: "ale", brie: "champagne", parmesan: "chianti",
    gouda: "riesling", blue: "port",
  };
  return m[cheese];
}

export function cheeseTypes(): CheeseType[] {
  return ["cheddar", "brie", "parmesan", "gouda", "blue"];
}
