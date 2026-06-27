export type ThatchMaterial = "reed" | "straw" | "heather" | "palm" | "sedge";

export function bundlesNeeded(roofAreaM2: number, material: ThatchMaterial): number {
  const perM2: Record<ThatchMaterial, number> = {
    reed: 8, straw: 10, heather: 12, palm: 6, sedge: 9,
  };
  return Math.ceil(roofAreaM2 * perM2[material]);
}

export function thicknessInches(material: ThatchMaterial): number {
  const inches: Record<ThatchMaterial, number> = {
    reed: 12, straw: 14, heather: 10, palm: 8, sedge: 11,
  };
  return inches[material];
}

export function ridgeLength(roofLengthM: number): number {
  return parseFloat((roofLengthM + 0.6).toFixed(1));
}

export function lifespanYears(material: ThatchMaterial): number {
  const years: Record<ThatchMaterial, number> = {
    reed: 30, straw: 20, heather: 25, palm: 15, sedge: 18,
  };
  return years[material];
}

export function sparsPerBundle(bundleDiameter: number): number {
  return Math.ceil(bundleDiameter * 3);
}

export function layersRequired(pitch: number): number {
  if (pitch < 40) return 4;
  if (pitch < 50) return 3;
  return 2;
}

export function laborDays(roofAreaM2: number, thatchers: number): number {
  if (thatchers <= 0) return 0;
  return Math.ceil((roofAreaM2 * 0.8) / thatchers);
}

export function fixingWireM(roofAreaM2: number): number {
  return parseFloat((roofAreaM2 * 3).toFixed(0));
}

export function weightPerM2(material: ThatchMaterial): number {
  const kgs: Record<ThatchMaterial, number> = {
    reed: 35, straw: 30, heather: 40, palm: 20, sedge: 32,
  };
  return kgs[material];
}

export function fireRetardantL(roofAreaM2: number): number {
  return parseFloat((roofAreaM2 * 0.5).toFixed(1));
}

export function thatchMaterials(): ThatchMaterial[] {
  return ["reed", "straw", "heather", "palm", "sedge"];
}
