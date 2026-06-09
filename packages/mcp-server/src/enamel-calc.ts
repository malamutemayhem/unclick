export type EnamelType = "cloisonne" | "champleve" | "plique_a_jour" | "basse_taille" | "guilloche" | "painted";

export function metalArea(widthMm: number, heightMm: number): number {
  return parseFloat((widthMm * heightMm).toFixed(1));
}

export function enamelWeight(areaMm2: number, thicknessMm: number = 0.5, densityGPerCm3: number = 2.6): number {
  const volumeCm3 = areaMm2 * thicknessMm / 1000;
  return parseFloat((volumeCm3 * densityGPerCm3).toFixed(2));
}

export function firingTemp(type: EnamelType): { minC: number; maxC: number } {
  const temps: Record<EnamelType, { minC: number; maxC: number }> = {
    cloisonne: { minC: 750, maxC: 850 },
    champleve: { minC: 750, maxC: 850 },
    plique_a_jour: { minC: 780, maxC: 830 },
    basse_taille: { minC: 750, maxC: 820 },
    guilloche: { minC: 750, maxC: 820 },
    painted: { minC: 700, maxC: 780 },
  };
  return temps[type];
}

export function firingDuration(thicknessMm: number): number {
  return Math.round(thicknessMm * 3 + 1);
}

export function layerCount(type: EnamelType): number {
  const layers: Record<EnamelType, number> = {
    cloisonne: 4,
    champleve: 3,
    plique_a_jour: 5,
    basse_taille: 3,
    guilloche: 2,
    painted: 6,
  };
  return layers[type];
}

export function totalFirings(layers: number): number {
  return layers + 1;
}

export function counterEnamelWeight(frontWeight: number): number {
  return parseFloat((frontWeight * 0.8).toFixed(2));
}

export function wireLength(perimeterMm: number, cells: number): number {
  return parseFloat((perimeterMm + cells * 20).toFixed(0));
}

export function wireWeight(lengthMm: number, widthMm: number = 0.5, heightMm: number = 1.0): number {
  const volumeMm3 = lengthMm * widthMm * heightMm;
  const densityGPerMm3 = 0.0089;
  return parseFloat((volumeMm3 * densityGPerMm3).toFixed(2));
}

export function grindingGrits(): number[] {
  return [220, 400, 600, 800];
}

export function stoneTime(areaMm2: number, grits: number = 4): number {
  return parseFloat((areaMm2 / 100 * grits * 5).toFixed(0));
}

export function coolingRate(thicknessMm: number): string {
  if (thicknessMm < 0.3) return "fast";
  if (thicknessMm < 0.8) return "medium";
  return "slow";
}

export function crackRisk(coolingRate: "fast" | "medium" | "slow", metalThickness: number): string {
  if (coolingRate === "fast" && metalThickness < 0.5) return "high";
  if (coolingRate === "slow") return "low";
  return "moderate";
}

export function enamelTypes(): EnamelType[] {
  return ["cloisonne", "champleve", "plique_a_jour", "basse_taille", "guilloche", "painted"];
}
