export type MerlonShape = "rectangular" | "swallowtail" | "rounded" | "stepped" | "pointed";

export function merlonWidth(wallThickness: number): number {
  return parseFloat((wallThickness * 0.6).toFixed(1));
}

export function merlonHeight(wallHeight: number): number {
  return parseFloat((wallHeight * 0.15).toFixed(1));
}

export function crenelWidth(merlonWidth: number): number {
  return parseFloat((merlonWidth * 0.8).toFixed(1));
}

export function totalCount(wallLengthM: number, merlonWidthCm: number, crenelWidthCm: number): number {
  if (merlonWidthCm + crenelWidthCm <= 0) return 0;
  return Math.floor(wallLengthM * 100 / (merlonWidthCm + crenelWidthCm));
}

export function stoneBlocks(merlonWidthCm: number, merlonHeightCm: number, blockSize: number): number {
  if (blockSize <= 0) return 0;
  return Math.ceil(merlonWidthCm * merlonHeightCm / (blockSize * blockSize));
}

export function coverPercent(merlonWidth: number, crenelWidth: number): number {
  if (merlonWidth + crenelWidth <= 0) return 0;
  return parseFloat((merlonWidth / (merlonWidth + crenelWidth) * 100).toFixed(1));
}

export function swallowtailAngle(merlonWidth: number, notchDepth: number): number {
  if (merlonWidth <= 0) return 0;
  return parseFloat((Math.atan(2 * notchDepth / merlonWidth) * 180 / Math.PI).toFixed(1));
}

export function arrowLoopFit(crenelWidthCm: number, loopWidthCm: number): boolean {
  return crenelWidthCm >= loopWidthCm + 10;
}

export function weatheringRate(shape: MerlonShape, exposureLevel: string): number {
  const base: Record<MerlonShape, number> = { rectangular: 1, swallowtail: 1.3, rounded: 0.8, stepped: 1.5, pointed: 1.2 };
  const exposure: Record<string, number> = { sheltered: 0.5, moderate: 1, exposed: 2, coastal: 3 };
  return parseFloat((base[shape] * (exposure[exposureLevel] || 1)).toFixed(1));
}

export function merlonShapes(): MerlonShape[] {
  return ["rectangular", "swallowtail", "rounded", "stepped", "pointed"];
}
