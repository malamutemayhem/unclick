export type SpringerType = "skewback" | "impost" | "tas-de-charge" | "springing" | "haunch";

export function angleFromVertical(archSpanCm: number, archRiseCm: number): number {
  if (archRiseCm <= 0) return 0;
  return parseFloat((Math.atan(archSpanCm / (2 * archRiseCm)) * 180 / Math.PI).toFixed(1));
}

export function bedAngle(type: SpringerType, archAngleDeg: number): number {
  const factors: Record<SpringerType, number> = {
    skewback: 1.0, impost: 0.0, "tas-de-charge": 0.5, springing: 0.8, haunch: 0.6,
  };
  return parseFloat((archAngleDeg * factors[type]).toFixed(1));
}

export function blockWidthCm(archWidthCm: number): number {
  return parseFloat((archWidthCm * 0.12).toFixed(1));
}

export function blockDepthCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.9).toFixed(1));
}

export function blockHeightCm(voussoirHeightCm: number): number {
  return parseFloat((voussoirHeightCm * 1.2).toFixed(1));
}

export function weightKg(widthCm: number, depthCm: number, heightCm: number, densityGPerCm3: number): number {
  return parseFloat((widthCm * depthCm * heightCm * densityGPerCm3 / 1000).toFixed(1));
}

export function bearingAreaCm2(widthCm: number, depthCm: number): number {
  return parseFloat((widthCm * depthCm).toFixed(0));
}

export function bearingStressKpa(loadKn: number, areaCm2: number): number {
  if (areaCm2 <= 0) return 0;
  return parseFloat((loadKn * 1000 / (areaCm2 / 10000)).toFixed(1));
}

export function tasDeChargeCount(archRiseCm: number, courseHeightCm: number): number {
  if (courseHeightCm <= 0) return 0;
  return Math.ceil(archRiseCm * 0.3 / courseHeightCm);
}

export function cuttingAccuracyMm(type: SpringerType): number {
  const mm: Record<SpringerType, number> = {
    skewback: 1, impost: 3, "tas-de-charge": 0.5, springing: 2, haunch: 2,
  };
  return mm[type];
}

export function springerTypes(): SpringerType[] {
  return ["skewback", "impost", "tas-de-charge", "springing", "haunch"];
}
