export type TrellisMaterial = "wood" | "bamboo" | "metal" | "plastic" | "wire";

export function panelArea(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm / 10000).toFixed(2));
}

export function openingPercent(latWidth: number, latSpacing: number): number {
  if (latWidth + latSpacing <= 0) return 0;
  return parseFloat((latSpacing / (latWidth + latSpacing) * 100).toFixed(1));
}

export function latCount(panelLengthCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil(panelLengthCm / spacingCm) + 1;
}

export function totalLatLength(horizontalCount: number, verticalCount: number, widthCm: number, heightCm: number): number {
  return parseFloat(((horizontalCount * widthCm + verticalCount * heightCm) / 100).toFixed(1));
}

export function jointCount(horizontalLats: number, verticalLats: number): number {
  return horizontalLats * verticalLats;
}

export function weightKg(totalLengthM: number, material: TrellisMaterial): number {
  const kgPerM: Record<TrellisMaterial, number> = {
    wood: 0.8, bamboo: 0.3, metal: 1.5, plastic: 0.4, wire: 0.2,
  };
  return parseFloat((totalLengthM * kgPerM[material]).toFixed(1));
}

export function windLoadN(areaCm2: number, windSpeedKph: number): number {
  const areaM2 = areaCm2 / 10000;
  const speedMps = windSpeedKph / 3.6;
  return parseFloat((0.5 * 1.225 * speedMps * speedMps * areaM2 * 0.6).toFixed(1));
}

export function plantCoverageYears(growthRateCmPerYear: number, heightCm: number): number {
  if (growthRateCmPerYear <= 0) return 0;
  return parseFloat((heightCm / growthRateCmPerYear).toFixed(1));
}

export function lifespanYears(material: TrellisMaterial): number {
  const years: Record<TrellisMaterial, number> = {
    wood: 8, bamboo: 5, metal: 20, plastic: 15, wire: 12,
  };
  return years[material];
}

export function costEstimate(totalLengthM: number, pricePerM: number, jointCount: number, fastenerCost: number): number {
  return parseFloat((totalLengthM * pricePerM + jointCount * fastenerCost).toFixed(2));
}

export function trellisMaterials(): TrellisMaterial[] {
  return ["wood", "bamboo", "metal", "plastic", "wire"];
}
