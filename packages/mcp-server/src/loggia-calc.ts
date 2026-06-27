export type LoggiaStyle = "renaissance" | "romanesque" | "gothic" | "baroque" | "neoclassical";

export function columnCount(lengthM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.ceil(lengthM / spacingM) + 1;
}

export function archSpanM(columnSpacingM: number, columnDiameterCm: number): number {
  return parseFloat((columnSpacingM - columnDiameterCm / 100).toFixed(2));
}

export function archHeightM(spanM: number, style: LoggiaStyle): number {
  const ratios: Record<LoggiaStyle, number> = {
    renaissance: 0.5, romanesque: 0.5, gothic: 0.75, baroque: 0.55, neoclassical: 0.45,
  };
  return parseFloat((spanM * ratios[style]).toFixed(2));
}

export function floorArea(lengthM: number, depthM: number): number {
  return parseFloat((lengthM * depthM).toFixed(1));
}

export function ceilingHeight(archHeightM: number, columnHeightM: number): number {
  return parseFloat((columnHeightM + archHeightM).toFixed(2));
}

export function shadePercent(depthM: number, heightM: number, sunAngleDeg: number): number {
  if (sunAngleDeg <= 0) return 100;
  const shadowDepth = heightM / Math.tan(sunAngleDeg * Math.PI / 180);
  const pct = Math.min(100, shadowDepth / depthM * 100);
  return parseFloat(pct.toFixed(1));
}

export function balustradeLength(lengthM: number, openBays: number, bayWidthM: number): number {
  return parseFloat((lengthM - openBays * bayWidthM).toFixed(1));
}

export function ventilationFactor(openPercent: number): number {
  return parseFloat((openPercent / 100 * 1.8).toFixed(2));
}

export function stoneVolumeM3(columnCount: number, columnHeightM: number, columnDiameterCm: number): number {
  const radiusM = columnDiameterCm / 200;
  const singleVolume = Math.PI * radiusM * radiusM * columnHeightM;
  return parseFloat((singleVolume * columnCount).toFixed(2));
}

export function lightLevel(depthM: number, openPercent: number): number {
  return parseFloat((openPercent / 100 * 100 / (1 + depthM * 0.3)).toFixed(1));
}

export function loggiaStyles(): LoggiaStyle[] {
  return ["renaissance", "romanesque", "gothic", "baroque", "neoclassical"];
}
