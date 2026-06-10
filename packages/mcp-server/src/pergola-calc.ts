export type PostMaterial = "cedar" | "redwood" | "pressure_treated" | "steel" | "aluminum";

export function postCount(lengthM: number, widthM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  const lengthPosts = Math.ceil(lengthM / spacingM) + 1;
  const widthPosts = Math.ceil(widthM / spacingM) + 1;
  return lengthPosts * 2 + (widthPosts - 2) * 0;
}

export function rafterCount(lengthM: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil((lengthM * 100) / spacingCm) + 1;
}

export function beamSize(spanM: number, loadKgPerM: number): number {
  return parseFloat((Math.sqrt(spanM * loadKgPerM) * 2).toFixed(0));
}

export function shadePercent(rafterWidthCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 100;
  return parseFloat(((rafterWidthCm / spacingCm) * 100).toFixed(0));
}

export function vineCoverage(yearsGrown: number, vigour: string): number {
  const rates: Record<string, number> = {
    slow: 10, moderate: 20, fast: 35,
  };
  const rate = rates[vigour] || 20;
  return Math.min(100, rate * yearsGrown);
}

export function footingDepthCm(frostLineM: number): number {
  return parseFloat(((frostLineM + 0.15) * 100).toFixed(0));
}

export function concreteLiters(postCount: number, footingSizeCm: number, depthCm: number): number {
  const volumePerFooting = Math.PI * Math.pow(footingSizeCm / 2, 2) * depthCm / 1000;
  return parseFloat((postCount * volumePerFooting).toFixed(0));
}

export function lifespanYears(material: PostMaterial): number {
  const years: Record<PostMaterial, number> = {
    cedar: 15, redwood: 20, pressure_treated: 25, steel: 40, aluminum: 50,
  };
  return years[material];
}

export function snowLoad(roofAreaM2: number, snowDepthCm: number): number {
  return parseFloat((roofAreaM2 * snowDepthCm * 0.005).toFixed(0));
}

export function postMaterials(): PostMaterial[] {
  return ["cedar", "redwood", "pressure_treated", "steel", "aluminum"];
}
