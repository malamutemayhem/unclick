export type RoodScreenStyle = "perpendicular" | "decorated" | "early_english" | "flamboyant" | "renaissance";

export function heightM(chancelArchHeightM: number): number {
  return parseFloat((chancelArchHeightM * 0.7).toFixed(2));
}

export function widthM(naveWidthM: number): number {
  return naveWidthM;
}

export function bayCount(widthM: number, bayWidthCm: number): number {
  if (bayWidthCm <= 0) return 0;
  return Math.max(1, Math.round(widthM * 100 / bayWidthCm));
}

export function traceryPanelCount(bayCount: number, tiers: number): number {
  return bayCount * tiers;
}

export function loftDepthCm(heightM: number): number {
  return parseFloat((heightM * 100 * 0.2).toFixed(1));
}

export function crucifixHeightM(screenHeightM: number): number {
  return parseFloat((screenHeightM * 0.6).toFixed(2));
}

export function timberVolumeM3(widthM: number, heightM: number, depthCm: number): number {
  return parseFloat((widthM * heightM * (depthCm / 100) * 0.3).toFixed(3));
}

export function paintedPanelCount(bayCount: number): number {
  return bayCount * 2;
}

export function carvingHours(style: RoodScreenStyle, widthM: number): number {
  const ratesPerM: Record<RoodScreenStyle, number> = {
    perpendicular: 40, decorated: 55, early_english: 30, flamboyant: 65, renaissance: 45,
  };
  return parseFloat((ratesPerM[style] * widthM).toFixed(1));
}

export function restorationBudget(style: RoodScreenStyle, widthM: number, costPerHour: number): number {
  const hours = carvingHours(style, widthM) * 1.5;
  return parseFloat((hours * costPerHour).toFixed(2));
}

export function roodScreenStyles(): RoodScreenStyle[] {
  return ["perpendicular", "decorated", "early_english", "flamboyant", "renaissance"];
}
