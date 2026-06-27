export type ThatchMaterial = "wheat" | "water-reed" | "rye" | "heather" | "palm";

export function bundleCount(roofAreaM2: number, bundlesPerM2: number): number {
  return Math.ceil(roofAreaM2 * bundlesPerM2);
}

export function thicknessCm(material: ThatchMaterial): number {
  const cm: Record<ThatchMaterial, number> = {
    wheat: 30, "water-reed": 25, rye: 35, heather: 20, palm: 15,
  };
  return cm[material];
}

export function weightKgPerM2(material: ThatchMaterial): number {
  const kg: Record<ThatchMaterial, number> = {
    wheat: 30, "water-reed": 40, rye: 28, heather: 35, palm: 20,
  };
  return kg[material];
}

export function totalWeightKg(areaM2: number, material: ThatchMaterial): number {
  return parseFloat((areaM2 * weightKgPerM2(material)).toFixed(1));
}

export function lifespanYears(material: ThatchMaterial): number {
  const years: Record<ThatchMaterial, number> = {
    wheat: 25, "water-reed": 40, rye: 20, heather: 15, palm: 10,
  };
  return years[material];
}

export function ridgeRollLength(roofLengthM: number, overlapPercent: number): number {
  return parseFloat((roofLengthM * (1 + overlapPercent / 100)).toFixed(1));
}

export function fixingWireMeter(areaM2: number): number {
  return parseFloat((areaM2 * 3.5).toFixed(1));
}

export function installDays(areaM2: number, crewSize: number): number {
  if (crewSize <= 0) return 0;
  return Math.ceil(areaM2 * 0.5 / crewSize);
}

export function fireRetardantLiters(areaM2: number, coats: number): number {
  return parseFloat((areaM2 * 0.3 * coats).toFixed(1));
}

export function insulationRValue(thicknessCm: number): number {
  return parseFloat((thicknessCm * 0.12).toFixed(1));
}

export function thatchMaterials(): ThatchMaterial[] {
  return ["wheat", "water-reed", "rye", "heather", "palm"];
}
