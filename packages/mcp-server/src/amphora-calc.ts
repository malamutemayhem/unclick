export type ClayType = "terracotta" | "stoneware" | "earthenware" | "porcelain";

export function volumeLiters(heightCm: number, maxDiameterCm: number): number {
  return parseFloat((Math.PI * Math.pow(maxDiameterCm / 2, 2) * heightCm * 0.6 / 1000).toFixed(1));
}

export function wallThicknessCm(heightCm: number, clay: ClayType): number {
  const base: Record<ClayType, number> = { terracotta: 0.8, stoneware: 0.6, earthenware: 1.0, porcelain: 0.4 };
  return parseFloat((base[clay] + heightCm * 0.005).toFixed(2));
}

export function dryWeightKg(volumeLiters: number, clay: ClayType): number {
  const density: Record<ClayType, number> = { terracotta: 1.8, stoneware: 2.2, earthenware: 1.6, porcelain: 2.4 };
  return parseFloat((volumeLiters * 0.15 * density[clay]).toFixed(1));
}

export function handleCount(volumeLiters: number): number {
  if (volumeLiters < 5) return 0;
  if (volumeLiters < 20) return 1;
  return 2;
}

export function neckDiameterCm(maxDiameterCm: number): number {
  return parseFloat((maxDiameterCm * 0.3).toFixed(1));
}

export function firingTemp(clay: ClayType): number {
  const temps: Record<ClayType, number> = { terracotta: 1000, stoneware: 1250, earthenware: 1100, porcelain: 1400 };
  return temps[clay];
}

export function firingHours(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 8 + 4).toFixed(0));
}

export function sealantCoats(porosity: string): number {
  const coats: Record<string, number> = { high: 3, medium: 2, low: 1, none: 0 };
  return coats[porosity] || 2;
}

export function stackingCapacity(baseDiameterCm: number, pointedBase: boolean): number {
  if (pointedBase) return 0;
  return Math.floor(baseDiameterCm / 5);
}

export function ageEstimate(patina: string): string {
  const ages: Record<string, string> = { none: "modern", light: "decades", moderate: "centuries", heavy: "ancient" };
  return ages[patina] || "unknown";
}

export function clayTypes(): ClayType[] {
  return ["terracotta", "stoneware", "earthenware", "porcelain"];
}
