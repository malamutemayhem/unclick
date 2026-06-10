export type StoneType = "granite" | "limestone" | "sandstone" | "marble" | "basalt";

export function totalHeight(shaftHeight: number, pyramidionHeight: number): number {
  return parseFloat((shaftHeight + pyramidionHeight).toFixed(0));
}

export function baseWidth(shaftHeight: number, taper: number): number {
  return parseFloat((shaftHeight / taper).toFixed(1));
}

export function topWidth(baseWidth: number, taperRatio: number): number {
  return parseFloat((baseWidth * taperRatio).toFixed(1));
}

export function volumeM3(heightM: number, baseWidthM: number, topWidthM: number): number {
  return parseFloat((heightM / 3 * (baseWidthM * baseWidthM + topWidthM * topWidthM + baseWidthM * topWidthM)).toFixed(2));
}

export function weightTonnes(volumeM3: number, stone: StoneType): number {
  const density: Record<StoneType, number> = { granite: 2.7, limestone: 2.5, sandstone: 2.3, marble: 2.7, basalt: 3.0 };
  return parseFloat((volumeM3 * density[stone]).toFixed(1));
}

export function shadowLength(heightM: number, sunAngleDeg: number): number {
  if (sunAngleDeg <= 0 || sunAngleDeg >= 90) return 0;
  return parseFloat((heightM / Math.tan(sunAngleDeg * Math.PI / 180)).toFixed(1));
}

export function inscriptionArea(perimeterM: number, inscriptionHeightM: number): number {
  return parseFloat((perimeterM * inscriptionHeightM).toFixed(2));
}

export function quarryingDays(volumeM3: number, stone: StoneType): number {
  const factor: Record<StoneType, number> = { granite: 15, limestone: 8, sandstone: 6, marble: 12, basalt: 18 };
  return parseFloat((volumeM3 * factor[stone]).toFixed(0));
}

export function transportWorkers(weightTonnes: number): number {
  return Math.ceil(weightTonnes * 20);
}

export function foundationDepthM(heightM: number, soilType: string): number {
  const factors: Record<string, number> = { rock: 0.1, clay: 0.2, sand: 0.25, loam: 0.15 };
  return parseFloat((heightM * (factors[soilType] || 0.2)).toFixed(1));
}

export function stoneTypes(): StoneType[] {
  return ["granite", "limestone", "sandstone", "marble", "basalt"];
}
