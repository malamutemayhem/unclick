export type GlazingType = "plain" | "stained" | "tracery" | "rose" | "lancet";

export function windowCount(wallLengthM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.floor(wallLengthM / spacingM);
}

export function windowHeight(wallHeightM: number, sillRatio: number): number {
  return parseFloat((wallHeightM * (1 - sillRatio)).toFixed(2));
}

export function windowArea(widthM: number, heightM: number, count: number): number {
  return parseFloat((widthM * heightM * count).toFixed(1));
}

export function lightGainPercent(windowAreaM2: number, floorAreaM2: number): number {
  if (floorAreaM2 <= 0) return 0;
  return parseFloat((windowAreaM2 / floorAreaM2 * 100).toFixed(1));
}

export function glazingWeight(areaM2: number, glazingType: GlazingType): number {
  const kgPerM2: Record<GlazingType, number> = {
    plain: 10, stained: 18, tracery: 25, rose: 22, lancet: 15,
  };
  return parseFloat((areaM2 * kgPerM2[glazingType]).toFixed(1));
}

export function heatLossWatts(areaM2: number, uValue: number, tempDiffC: number): number {
  return parseFloat((areaM2 * uValue * tempDiffC).toFixed(1));
}

export function structuralLoadKn(windowWidthM: number, wallAboveKgPerM: number): number {
  return parseFloat((windowWidthM * wallAboveKgPerM * 9.81 / 1000).toFixed(2));
}

export function ventilationCfm(openableAreaM2: number, windSpeedMps: number): number {
  return parseFloat((openableAreaM2 * windSpeedMps * 35.3 * 0.5).toFixed(1));
}

export function rainProtectionAngle(overhangCm: number, windowHeightCm: number): number {
  if (windowHeightCm <= 0) return 0;
  return parseFloat((Math.atan(overhangCm / windowHeightCm) * 180 / Math.PI).toFixed(1));
}

export function maintenanceCostPerYear(windowCount: number, glazingType: GlazingType): number {
  const costMultiplier: Record<GlazingType, number> = {
    plain: 20, stained: 80, tracery: 120, rose: 100, lancet: 50,
  };
  return windowCount * costMultiplier[glazingType];
}

export function glazingTypes(): GlazingType[] {
  return ["plain", "stained", "tracery", "rose", "lancet"];
}
