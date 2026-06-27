export type HeadMaterial = "calfskin" | "goatskin" | "deerskin" | "synthetic" | "kangaroo";

export function thicknessMm(material: HeadMaterial): number {
  const thickness: Record<HeadMaterial, number> = {
    calfskin: 0.5, goatskin: 0.3, deerskin: 0.4, synthetic: 0.25, kangaroo: 0.35,
  };
  return thickness[material];
}

export function tensionKgPerCm(material: HeadMaterial): number {
  const tension: Record<HeadMaterial, number> = {
    calfskin: 8, goatskin: 6, deerskin: 5, synthetic: 10, kangaroo: 7,
  };
  return tension[material];
}

export function stretchPercent(material: HeadMaterial): number {
  const stretch: Record<HeadMaterial, number> = {
    calfskin: 15, goatskin: 20, deerskin: 25, synthetic: 5, kangaroo: 18,
  };
  return stretch[material];
}

export function weatherSensitivity(material: HeadMaterial): number {
  const sensitivity: Record<HeadMaterial, number> = {
    calfskin: 4, goatskin: 3, deerskin: 4, synthetic: 1, kangaroo: 3,
  };
  return sensitivity[material];
}

export function tuckingDepthMm(diameterCm: number): number {
  return Math.round(diameterCm * 0.5 + 10);
}

export function soakTimeMinutes(material: HeadMaterial): number {
  const times: Record<HeadMaterial, number> = {
    calfskin: 30, goatskin: 20, deerskin: 25, synthetic: 0, kangaroo: 15,
  };
  return times[material];
}

export function toneWarmthRating(material: HeadMaterial): number {
  const ratings: Record<HeadMaterial, number> = {
    calfskin: 5, goatskin: 4, deerskin: 4, synthetic: 2, kangaroo: 3,
  };
  return ratings[material];
}

export function durabilityRating(material: HeadMaterial): number {
  const ratings: Record<HeadMaterial, number> = {
    calfskin: 3, goatskin: 3, deerskin: 2, synthetic: 5, kangaroo: 4,
  };
  return ratings[material];
}

export function costPerHead(material: HeadMaterial): number {
  const costs: Record<HeadMaterial, number> = {
    calfskin: 40, goatskin: 25, deerskin: 35, synthetic: 15, kangaroo: 50,
  };
  return costs[material];
}

export function headMaterials(): HeadMaterial[] {
  return ["calfskin", "goatskin", "deerskin", "synthetic", "kangaroo"];
}
