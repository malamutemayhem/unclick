export type TesseraeMaterial = "marble" | "smalti" | "ceramic" | "gold_leaf" | "stone";

export function tesseraePerM2(tesseraSizeMm: number): number {
  if (tesseraSizeMm <= 0) return 0;
  const tesseraM = tesseraSizeMm / 1000;
  return Math.ceil(1 / (tesseraM * tesseraM));
}

export function groutWeightKgPerM2(tesseraSizeMm: number, groutGapMm: number): number {
  const gapRatio = groutGapMm / (tesseraSizeMm + groutGapMm);
  return parseFloat((gapRatio * 5).toFixed(2));
}

export function adhesiveLitersPerM2(material: TesseraeMaterial): number {
  const rates: Record<TesseraeMaterial, number> = {
    marble: 0.8, smalti: 1.0, ceramic: 0.6, gold_leaf: 1.2, stone: 0.9,
  };
  return rates[material];
}

export function weightKgPerM2(material: TesseraeMaterial, thicknessMm: number): number {
  const densities: Record<TesseraeMaterial, number> = {
    marble: 2.7, smalti: 2.5, ceramic: 2.0, gold_leaf: 2.8, stone: 2.6,
  };
  return parseFloat((densities[material] * thicknessMm).toFixed(1));
}

export function cuttingWastePercent(material: TesseraeMaterial): number {
  const waste: Record<TesseraeMaterial, number> = {
    marble: 15, smalti: 20, ceramic: 10, gold_leaf: 5, stone: 18,
  };
  return waste[material];
}

export function layingHoursPerM2(material: TesseraeMaterial): number {
  const hours: Record<TesseraeMaterial, number> = {
    marble: 8, smalti: 12, ceramic: 6, gold_leaf: 20, stone: 10,
  };
  return hours[material];
}

export function designComplexityMultiplier(figurative: boolean): number {
  return figurative ? 2.5 : 1.0;
}

export function sealerCoats(location: "interior" | "exterior"): number {
  return location === "exterior" ? 3 : 1;
}

export function lifespanYears(material: TesseraeMaterial): number {
  const years: Record<TesseraeMaterial, number> = {
    marble: 500, smalti: 300, ceramic: 100, gold_leaf: 1000, stone: 400,
  };
  return years[material];
}

export function costPerM2(material: TesseraeMaterial, baseCost: number): number {
  const multipliers: Record<TesseraeMaterial, number> = {
    marble: 1.5, smalti: 2.0, ceramic: 1.0, gold_leaf: 10.0, stone: 1.2,
  };
  return parseFloat((baseCost * multipliers[material]).toFixed(2));
}

export function tesseraeMaterials(): TesseraeMaterial[] {
  return ["marble", "smalti", "ceramic", "gold_leaf", "stone"];
}
