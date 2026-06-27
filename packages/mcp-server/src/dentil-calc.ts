export type DentilMaterial = "stone" | "wood" | "plaster" | "terracotta" | "composite";

export function blockWidth(cornicHeightCm: number): number {
  return parseFloat((cornicHeightCm * 0.08).toFixed(1));
}

export function blockHeight(blockWidthCm: number): number {
  return parseFloat((blockWidthCm * 1.5).toFixed(1));
}

export function blockDepth(blockWidthCm: number): number {
  return parseFloat((blockWidthCm * 0.8).toFixed(1));
}

export function gapWidth(blockWidthCm: number): number {
  return parseFloat((blockWidthCm * 0.6).toFixed(1));
}

export function count(lengthCm: number, blockWidthCm: number, gapWidthCm: number): number {
  const unit = blockWidthCm + gapWidthCm;
  if (unit <= 0) return 0;
  return Math.floor(lengthCm / unit);
}

export function totalLength(blockCount: number, blockWidthCm: number, gapWidthCm: number): number {
  return parseFloat((blockCount * (blockWidthCm + gapWidthCm) - gapWidthCm).toFixed(1));
}

export function weightKg(blockCount: number, blockWidthCm: number, blockHeightCm: number, blockDepthCm: number, material: DentilMaterial): number {
  const densityGPerCm3: Record<DentilMaterial, number> = {
    stone: 2.5, wood: 0.6, plaster: 1.8, terracotta: 2.0, composite: 1.2,
  };
  const volumePerBlock = blockWidthCm * blockHeightCm * blockDepthCm;
  return parseFloat((blockCount * volumePerBlock * densityGPerCm3[material] / 1000).toFixed(1));
}

export function shadowDepthCm(blockDepthCm: number, sunAngleDeg: number): number {
  if (sunAngleDeg <= 0) return 0;
  const rad = sunAngleDeg * Math.PI / 180;
  return parseFloat((blockDepthCm / Math.tan(rad)).toFixed(1));
}

export function carvingHoursPerBlock(material: DentilMaterial): number {
  const hours: Record<DentilMaterial, number> = {
    stone: 0.5, wood: 0.2, plaster: 0.1, terracotta: 0.3, composite: 0.15,
  };
  return hours[material];
}

export function paintVolumeMl(blockCount: number, surfaceAreaPerBlockCm2: number, coats: number): number {
  return parseFloat((blockCount * surfaceAreaPerBlockCm2 / 100 * coats * 0.12).toFixed(1));
}

export function dentilMaterials(): DentilMaterial[] {
  return ["stone", "wood", "plaster", "terracotta", "composite"];
}
