export type InlayMetal = "gold" | "silver" | "copper" | "platinum";

export function grooveDepthMm(baseMetal: string): number {
  const depths: Record<string, number> = { steel: 0.5, iron: 0.6, bronze: 0.4, brass: 0.3 };
  return depths[baseMetal] || 0.5;
}

export function wireGaugeMm(grooveDepthMm: number): number {
  return parseFloat((grooveDepthMm * 1.1).toFixed(2));
}

export function goldWeightG(areaCm2: number, thicknessMm: number): number {
  return parseFloat((areaCm2 * (thicknessMm / 10) * 19.3).toFixed(2));
}

export function silverWeightG(areaCm2: number, thicknessMm: number): number {
  return parseFloat((areaCm2 * (thicknessMm / 10) * 10.5).toFixed(2));
}

export function crosshatchLines(areaCm2: number, spacingMm: number): number {
  if (spacingMm <= 0) return 0;
  const sideLength = Math.sqrt(areaCm2) * 10;
  return parseFloat((2 * sideLength / spacingMm).toFixed(0));
}

export function hammerBlows(wireLength: number, blowSpacingMm: number): number {
  if (blowSpacingMm <= 0) return 0;
  return Math.ceil((wireLength * 10) / blowSpacingMm);
}

export function annealingTemp(metal: InlayMetal): number {
  const temps: Record<InlayMetal, number> = { gold: 650, silver: 600, copper: 500, platinum: 800 };
  return temps[metal];
}

export function patternComplexity(elements: number, layers: number): number {
  return parseFloat((elements * layers * 1.5).toFixed(0));
}

export function polishStages(finishQuality: string): number {
  const stages: Record<string, number> = { rough: 2, standard: 4, mirror: 7, museum: 10 };
  return stages[finishQuality] || 4;
}

export function costEstimate(metalG: number, pricePerG: number, laborHours: number, laborRate: number): number {
  return parseFloat((metalG * pricePerG + laborHours * laborRate).toFixed(2));
}

export function inlayMetals(): InlayMetal[] {
  return ["gold", "silver", "copper", "platinum"];
}
