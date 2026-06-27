export type NarthexType = "outer" | "inner" | "double" | "lateral" | "galilee";

export function depthM(naveWidthM: number): number {
  return parseFloat((naveWidthM * 0.25).toFixed(2));
}

export function widthM(facadeWidthM: number): number {
  return facadeWidthM;
}

export function floorAreaM2(widthM: number, depthM: number): number {
  return parseFloat((widthM * depthM).toFixed(1));
}

export function ceilingHeightM(naveHeightM: number, type: NarthexType): number {
  const ratios: Record<NarthexType, number> = {
    outer: 0.5, inner: 0.6, double: 0.55, lateral: 0.45, galilee: 0.65,
  };
  return parseFloat((naveHeightM * ratios[type]).toFixed(2));
}

export function columnCount(widthM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.ceil(widthM / spacingM) + 1;
}

export function doorCount(type: NarthexType): number {
  const doors: Record<NarthexType, number> = {
    outer: 3, inner: 1, double: 3, lateral: 2, galilee: 3,
  };
  return doors[type];
}

export function seatingCapacity(floorAreaM2: number): number {
  return Math.floor(floorAreaM2 / 0.8);
}

export function fontPosition(depthM: number): number {
  return parseFloat((depthM * 0.5).toFixed(2));
}

export function lightLevel(windowAreaM2: number, floorAreaM2: number): number {
  if (floorAreaM2 <= 0) return 0;
  return parseFloat((windowAreaM2 / floorAreaM2 * 100).toFixed(1));
}

export function acousticSeparation(wallThicknessM: number): number {
  return parseFloat((wallThicknessM * 25).toFixed(0));
}

export function narthexTypes(): NarthexType[] {
  return ["outer", "inner", "double", "lateral", "galilee"];
}
