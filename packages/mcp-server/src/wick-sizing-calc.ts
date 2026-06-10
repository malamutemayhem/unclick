export type WickMaterial = "cotton_braided" | "paper_core" | "zinc_core" | "hemp" | "wood_wick";

export function diameterMm(containerDiameterCm: number): number {
  return Math.round(containerDiameterCm * 0.3);
}

export function burnPoolDiameterCm(wickDiameterMm: number): number {
  return Math.round(wickDiameterMm * 3);
}

export function trimLengthMm(material: WickMaterial): number {
  const lengths: Record<WickMaterial, number> = {
    cotton_braided: 6, paper_core: 6, zinc_core: 8, hemp: 10, wood_wick: 5,
  };
  return lengths[material];
}

export function mushroomingRisk(material: WickMaterial): number {
  const risk: Record<WickMaterial, number> = {
    cotton_braided: 2, paper_core: 3, zinc_core: 4, hemp: 3, wood_wick: 1,
  };
  return risk[material];
}

export function sootLevel(material: WickMaterial): number {
  const soot: Record<WickMaterial, number> = {
    cotton_braided: 2, paper_core: 2, zinc_core: 3, hemp: 3, wood_wick: 1,
  };
  return soot[material];
}

export function crackleEffect(material: WickMaterial): boolean {
  return material === "wood_wick";
}

export function selfTrimming(material: WickMaterial): boolean {
  return material === "cotton_braided" || material === "paper_core";
}

export function burnRateRating(material: WickMaterial): number {
  const rate: Record<WickMaterial, number> = {
    cotton_braided: 3, paper_core: 3, zinc_core: 4, hemp: 2, wood_wick: 3,
  };
  return rate[material];
}

export function costPerMeter(material: WickMaterial): number {
  const costs: Record<WickMaterial, number> = {
    cotton_braided: 0.3, paper_core: 0.4, zinc_core: 0.5, hemp: 0.6, wood_wick: 1.5,
  };
  return costs[material];
}

export function wickMaterials(): WickMaterial[] {
  return ["cotton_braided", "paper_core", "zinc_core", "hemp", "wood_wick"];
}
