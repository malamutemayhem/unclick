export type LintelMaterial = "stone" | "timber" | "steel" | "concrete" | "brick";

export function spanM(openingWidthM: number, bearingM: number): number {
  return parseFloat((openingWidthM + 2 * bearingM).toFixed(2));
}

export function bearingLengthCm(openingWidthCm: number): number {
  return parseFloat((openingWidthCm * 0.1).toFixed(1));
}

export function depthCm(spanCm: number, material: LintelMaterial): number {
  const ratios: Record<LintelMaterial, number> = {
    stone: 0.12, timber: 0.08, steel: 0.04, concrete: 0.06, brick: 0.15,
  };
  return parseFloat((spanCm * ratios[material]).toFixed(1));
}

export function widthCm(wallThicknessCm: number): number {
  return wallThicknessCm;
}

export function weightKg(lengthCm: number, widthCm: number, depthCm: number, densityKgPerM3: number): number {
  const volumeM3 = lengthCm / 100 * widthCm / 100 * depthCm / 100;
  return parseFloat((volumeM3 * densityKgPerM3).toFixed(1));
}

export function bendingMomentKnm(loadKnPerM: number, spanM: number): number {
  return parseFloat((loadKnPerM * spanM * spanM / 8).toFixed(2));
}

export function shearForceKn(loadKnPerM: number, spanM: number): number {
  return parseFloat((loadKnPerM * spanM / 2).toFixed(2));
}

export function deflectionMm(loadKnPerM: number, spanM: number, eI: number): number {
  if (eI <= 0) return 0;
  return parseFloat((5 * loadKnPerM * Math.pow(spanM, 4) / (384 * eI) * 1000).toFixed(2));
}

export function fireResistanceMinutes(material: LintelMaterial): number {
  const minutes: Record<LintelMaterial, number> = {
    stone: 240, timber: 30, steel: 15, concrete: 120, brick: 180,
  };
  return minutes[material];
}

export function costEstimate(spanM: number, material: LintelMaterial): number {
  const pricePerM: Record<LintelMaterial, number> = {
    stone: 200, timber: 50, steel: 120, concrete: 80, brick: 60,
  };
  return parseFloat((spanM * pricePerM[material]).toFixed(2));
}

export function lintelMaterials(): LintelMaterial[] {
  return ["stone", "timber", "steel", "concrete", "brick"];
}
