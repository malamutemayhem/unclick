export type TesseraMaterial = "glass" | "marble" | "ceramic" | "gold_leaf" | "stone";

export function tesseraeCount(areaCm2: number, tesseraSizeMm: number): number {
  if (tesseraSizeMm <= 0) return 0;
  return Math.ceil(areaCm2 / Math.pow(tesseraSizeMm / 10, 2));
}

export function groutKg(areaCm2: number, gapMm: number, depthMm: number): number {
  if (gapMm <= 0) return 0;
  return parseFloat((areaCm2 * gapMm * depthMm * 0.0000018).toFixed(2));
}

export function adhesiveLiters(areaCm2: number, bedThicknessMm: number): number {
  return parseFloat((areaCm2 * bedThicknessMm * 0.0001).toFixed(2));
}

export function colorCount(complexity: string): number {
  const counts: Record<string, number> = { simple: 3, moderate: 8, complex: 20, photorealistic: 50 };
  return counts[complexity] || 8;
}

export function cuttingWaste(material: TesseraMaterial): number {
  const waste: Record<TesseraMaterial, number> = { glass: 15, marble: 20, ceramic: 10, gold_leaf: 5, stone: 25 };
  return waste[material];
}

export function installTimeHours(tesseraeCount: number, experience: string): number {
  const rate: Record<string, number> = { novice: 20, skilled: 50, master: 100 };
  const r = rate[experience] || 50;
  return parseFloat((tesseraeCount / r).toFixed(1));
}

export function weightKg(areaCm2: number, material: TesseraMaterial, thicknessMm: number): number {
  const density: Record<TesseraMaterial, number> = { glass: 2.5, marble: 2.7, ceramic: 2.0, gold_leaf: 0.5, stone: 2.6 };
  return parseFloat((areaCm2 * thicknessMm / 10 * density[material] / 1000).toFixed(2));
}

export function sealerCoats(location: string): number {
  const coats: Record<string, number> = { indoor: 1, outdoor: 3, underwater: 5, floor: 2 };
  return coats[location] || 2;
}

export function patternRepeatCm(designWidth: number, symmetry: number): number {
  if (symmetry <= 0) return designWidth;
  return parseFloat((designWidth / symmetry).toFixed(1));
}

export function tesseraMaterials(): TesseraMaterial[] {
  return ["glass", "marble", "ceramic", "gold_leaf", "stone"];
}
