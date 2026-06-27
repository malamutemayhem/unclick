export type MantletMaterial = "timber" | "wicker" | "rawhide" | "iron_faced" | "earth_filled";

export function heightCm(shielderHeightCm: number): number {
  return parseFloat((shielderHeightCm * 1.2).toFixed(1));
}

export function widthCm(protectedCount: number): number {
  return parseFloat((protectedCount * 60).toFixed(1));
}

export function thicknessCm(material: MantletMaterial): number {
  const thickness: Record<MantletMaterial, number> = {
    timber: 8, wicker: 12, rawhide: 5, iron_faced: 3, earth_filled: 20,
  };
  return thickness[material];
}

export function weightKg(heightCm: number, widthCm: number, material: MantletMaterial): number {
  const densities: Record<MantletMaterial, number> = {
    timber: 0.008, wicker: 0.004, rawhide: 0.006, iron_faced: 0.025, earth_filled: 0.015,
  };
  return parseFloat((heightCm * widthCm * thicknessCm(material) * densities[material]).toFixed(1));
}

export function wheelRequired(weightKg: number): boolean {
  return weightKg > 50;
}

export function arrowResistance(material: MantletMaterial): number {
  const resistance: Record<MantletMaterial, number> = {
    timber: 6, wicker: 3, rawhide: 5, iron_faced: 9, earth_filled: 8,
  };
  return resistance[material];
}

export function fireResistance(material: MantletMaterial): number {
  const resistance: Record<MantletMaterial, number> = {
    timber: 3, wicker: 2, rawhide: 4, iron_faced: 9, earth_filled: 7,
  };
  return resistance[material];
}

export function viewSlotCount(widthCm: number): number {
  return Math.max(1, Math.floor(widthCm / 80));
}

export function constructionHours(material: MantletMaterial): number {
  const hours: Record<MantletMaterial, number> = {
    timber: 8, wicker: 4, rawhide: 6, iron_faced: 16, earth_filled: 12,
  };
  return hours[material];
}

export function costEstimate(material: MantletMaterial, baseCost: number): number {
  const multipliers: Record<MantletMaterial, number> = {
    timber: 1.0, wicker: 0.5, rawhide: 0.8, iron_faced: 3.0, earth_filled: 1.5,
  };
  return parseFloat((baseCost * multipliers[material]).toFixed(2));
}

export function mantletMaterials(): MantletMaterial[] {
  return ["timber", "wicker", "rawhide", "iron_faced", "earth_filled"];
}
