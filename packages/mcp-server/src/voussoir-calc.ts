export type VoussoirBond = "radial" | "parallel" | "stepped" | "joggled" | "keyed";

export function count(archAngleDeg: number, stoneWidthCm: number, archRadiusCm: number): number {
  if (stoneWidthCm <= 0) return 0;
  const arcLengthCm = archRadiusCm * archAngleDeg * Math.PI / 180;
  return Math.ceil(arcLengthCm / stoneWidthCm);
}

export function taperAngle(archAngleDeg: number, voussoirCount: number): number {
  if (voussoirCount <= 0) return 0;
  return parseFloat((archAngleDeg / voussoirCount).toFixed(2));
}

export function innerWidthCm(outerWidthCm: number, depthCm: number, taperAngleDeg: number): number {
  const rad = taperAngleDeg * Math.PI / 180;
  return parseFloat((outerWidthCm - 2 * depthCm * Math.tan(rad / 2)).toFixed(1));
}

export function stoneVolumesCm3(outerWidthCm: number, innerWidthCm: number, depthCm: number, heightCm: number): number {
  const avgWidth = (outerWidthCm + innerWidthCm) / 2;
  return parseFloat((avgWidth * depthCm * heightCm).toFixed(0));
}

export function totalWeightKg(volumeCm3: number, count: number, densityGPerCm3: number): number {
  return parseFloat((volumeCm3 * count * densityGPerCm3 / 1000).toFixed(1));
}

export function jointThicknessMm(bond: VoussoirBond): number {
  const mm: Record<VoussoirBond, number> = {
    radial: 3, parallel: 5, stepped: 4, joggled: 2, keyed: 1,
  };
  return mm[bond];
}

export function mortarVolumeMl(jointThicknessMm: number, jointAreaCm2: number, count: number): number {
  return parseFloat((jointThicknessMm / 10 * jointAreaCm2 * count).toFixed(0));
}

export function compressionStressMpa(loadKn: number, areaCm2: number): number {
  if (areaCm2 <= 0) return 0;
  return parseFloat((loadKn * 1000 / (areaCm2 / 10000) / 1e6).toFixed(2));
}

export function cuttingTimeHours(voussoirCount: number, complexityFactor: number): number {
  return parseFloat((voussoirCount * complexityFactor * 0.5).toFixed(1));
}

export function centeringRemovalDays(archSpanM: number): number {
  return Math.ceil(archSpanM * 14);
}

export function voussoirBonds(): VoussoirBond[] {
  return ["radial", "parallel", "stepped", "joggled", "keyed"];
}
