export type GildingMethod = "water" | "oil" | "mordant" | "fire" | "electro";

export function leafSheets(areaM2: number, overlapPercent: number): number {
  const sheetAreaM2 = 0.08 * 0.08;
  return Math.ceil(areaM2 * (1 + overlapPercent / 100) / sheetAreaM2);
}

export function leafThicknessMicrons(karatGold: number): number {
  if (karatGold >= 23) return 0.1;
  if (karatGold >= 22) return 0.15;
  return 0.2;
}

export function sizeCoats(method: GildingMethod): number {
  const coats: Record<GildingMethod, number> = {
    water: 8, oil: 1, mordant: 2, fire: 0, electro: 0,
  };
  return coats[method];
}

export function boleClay(areaM2: number): number {
  return parseFloat((areaM2 * 50).toFixed(0));
}

export function burnishTime(areaM2: number, quality: string): number {
  const factors: Record<string, number> = {
    rough: 1, fine: 3, mirror: 6,
  };
  return parseFloat((areaM2 * (factors[quality] || 3) * 60).toFixed(0));
}

export function goldWeightG(areaM2: number, thicknessMicrons: number): number {
  return parseFloat((areaM2 * thicknessMicrons * 19.3).toFixed(3));
}

export function tackTime(method: GildingMethod, tempC: number): number {
  const base: Record<GildingMethod, number> = {
    water: 0, oil: 720, mordant: 240, fire: 0, electro: 0,
  };
  const tempFactor = tempC > 25 ? 0.8 : tempC < 15 ? 1.3 : 1;
  return parseFloat((base[method] * tempFactor).toFixed(0));
}

export function skewings(areaM2: number): number {
  return parseFloat((areaM2 * 0.15).toFixed(2));
}

export function durabilityYears(method: GildingMethod): number {
  const years: Record<GildingMethod, number> = {
    water: 100, oil: 30, mordant: 50, fire: 200, electro: 20,
  };
  return years[method];
}

export function gildingMethods(): GildingMethod[] {
  return ["water", "oil", "mordant", "fire", "electro"];
}
