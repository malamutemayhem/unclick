export type WallMaterial = "stone" | "brick" | "earth" | "timber" | "concrete";

export function wallLength(perimeterM: number, gateWidthM: number, gates: number): number {
  return parseFloat((perimeterM - gateWidthM * gates).toFixed(1));
}

export function wallThickness(heightM: number, material: WallMaterial): number {
  const ratio: Record<WallMaterial, number> = { stone: 0.4, brick: 0.35, earth: 0.6, timber: 0.3, concrete: 0.25 };
  return parseFloat((heightM * ratio[material]).toFixed(1));
}

export function walkwayWidth(wallThicknessM: number): number {
  return parseFloat((wallThicknessM * 0.6).toFixed(1));
}

export function merlonCount(wallLengthM: number, merlonWidthCm: number, crenelWidthCm: number): number {
  if (merlonWidthCm + crenelWidthCm <= 0) return 0;
  return Math.floor(wallLengthM * 100 / (merlonWidthCm + crenelWidthCm));
}

export function towerCount(perimeterM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.ceil(perimeterM / spacingM);
}

export function earthworkVolume(lengthM: number, heightM: number, thicknessM: number): number {
  return parseFloat((lengthM * heightM * thicknessM).toFixed(1));
}

export function garrisonSize(wallLengthM: number, soldiersPerM: number): number {
  return Math.ceil(wallLengthM * soldiersPerM);
}

export function constructionDays(volumeM3: number, workersPerDay: number): number {
  if (workersPerDay <= 0) return 0;
  return Math.ceil(volumeM3 * 2 / workersPerDay);
}

export function gatehouseWidth(gateWidthM: number): number {
  return parseFloat((gateWidthM + 2).toFixed(1));
}

export function defensiveRating(heightM: number, thicknessM: number, towers: number): string {
  const score = heightM * 2 + thicknessM * 3 + towers;
  if (score > 30) return "formidable";
  if (score > 15) return "strong";
  return "basic";
}

export function wallMaterials(): WallMaterial[] {
  return ["stone", "brick", "earth", "timber", "concrete"];
}
