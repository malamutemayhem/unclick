export type ApseShape = "semicircular" | "polygonal" | "trefoil" | "rectangular" | "horseshoe";

export function radiusM(naveWidthM: number): number {
  return parseFloat((naveWidthM / 2).toFixed(2));
}

export function floorAreaM2(radiusM: number, shape: ApseShape): number {
  const factors: Record<ApseShape, number> = {
    semicircular: 1.57, polygonal: 1.3, trefoil: 2.1, rectangular: 2.0, horseshoe: 1.8,
  };
  return parseFloat((radiusM * radiusM * factors[shape]).toFixed(1));
}

export function wallLength(radiusM: number, shape: ApseShape): number {
  const factors: Record<ApseShape, number> = {
    semicircular: 3.14, polygonal: 3.0, trefoil: 4.7, rectangular: 4.0, horseshoe: 3.5,
  };
  return parseFloat((radiusM * factors[shape]).toFixed(1));
}

export function vaultHeight(radiusM: number): number {
  return parseFloat((radiusM * 0.8).toFixed(2));
}

export function windowCount(shape: ApseShape): number {
  const counts: Record<ApseShape, number> = {
    semicircular: 3, polygonal: 5, trefoil: 6, rectangular: 2, horseshoe: 3,
  };
  return counts[shape];
}

export function mosaicAreaM2(wallLengthM: number, wallHeightM: number, coveragePercent: number): number {
  return parseFloat((wallLengthM * wallHeightM * coveragePercent / 100).toFixed(1));
}

export function altarPositionM(radiusM: number): number {
  return parseFloat((radiusM * 0.6).toFixed(2));
}

export function acousticFocus(radiusM: number): number {
  return parseFloat((radiusM / 2).toFixed(2));
}

export function stoneVolumeM3(wallLengthM: number, wallHeightM: number, thicknessM: number): number {
  return parseFloat((wallLengthM * wallHeightM * thicknessM).toFixed(1));
}

export function lightIntensity(windowCount: number, windowAreaM2: number): number {
  return parseFloat((windowCount * windowAreaM2 * 800).toFixed(0));
}

export function apseShapes(): ApseShape[] {
  return ["semicircular", "polygonal", "trefoil", "rectangular", "horseshoe"];
}
