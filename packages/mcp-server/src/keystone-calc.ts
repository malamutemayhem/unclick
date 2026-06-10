export type KeystoneStyle = "plain" | "rusticated" | "carved" | "scrolled" | "mask";

export function widthCm(archSpanCm: number): number {
  return parseFloat((archSpanCm * 0.08).toFixed(1));
}

export function heightCm(archDepthCm: number): number {
  return parseFloat((archDepthCm * 1.2).toFixed(1));
}

export function taperAngle(voussoirCount: number): number {
  if (voussoirCount <= 0) return 0;
  return parseFloat((180 / voussoirCount).toFixed(1));
}

export function projectionCm(archDepthCm: number, style: KeystoneStyle): number {
  const factors: Record<KeystoneStyle, number> = {
    plain: 0, rusticated: 0.05, carved: 0.08, scrolled: 0.1, mask: 0.12,
  };
  return parseFloat((archDepthCm * factors[style]).toFixed(1));
}

export function weightKg(widthCm: number, heightCm: number, depthCm: number, densityGPerCm3: number): number {
  return parseFloat((widthCm * heightCm * depthCm * densityGPerCm3 / 1000).toFixed(1));
}

export function compressionForceKn(archLoadKn: number, voussoirCount: number): number {
  if (voussoirCount <= 0) return 0;
  return parseFloat((archLoadKn / Math.sin(Math.PI / voussoirCount)).toFixed(1));
}

export function carvingHours(style: KeystoneStyle): number {
  const hours: Record<KeystoneStyle, number> = {
    plain: 2, rusticated: 4, carved: 12, scrolled: 16, mask: 24,
  };
  return hours[style];
}

export function placementOrder(voussoirCount: number): number {
  return voussoirCount;
}

export function settlingTimeDays(archSpanM: number): number {
  return Math.ceil(archSpanM * 7);
}

export function restorationCost(damagePercent: number, replacementCost: number): number {
  if (damagePercent > 60) return replacementCost;
  return parseFloat((damagePercent / 100 * replacementCost * 1.5).toFixed(2));
}

export function keystoneStyles(): KeystoneStyle[] {
  return ["plain", "rusticated", "carved", "scrolled", "mask"];
}
