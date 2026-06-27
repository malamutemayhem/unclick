export type LancetTracery = "plain" | "cusped" | "trefoiled" | "cinquefoiled" | "intersecting";

export function heightM(widthCm: number): number {
  return parseFloat((widthCm * 3 / 100).toFixed(2));
}

export function archRadiusCm(widthCm: number): number {
  return parseFloat((widthCm * 0.75).toFixed(1));
}

export function areaCm2(widthCm: number, heightM: number): number {
  const heightCm = heightM * 100;
  const rectArea = widthCm * (heightCm - widthCm * 0.75);
  const archArea = Math.PI * (widthCm / 2) ** 2 * 0.5;
  return parseFloat((rectArea + archArea).toFixed(1));
}

export function glazingPanelCount(heightM: number): number {
  return Math.max(1, Math.ceil(heightM / 0.6));
}

export function leadCameLengthCm(widthCm: number, panelCount: number): number {
  return parseFloat((widthCm * panelCount * 2.5).toFixed(1));
}

export function sillHeightCm(wallHeightM: number): number {
  return parseFloat((wallHeightM * 100 * 0.3).toFixed(1));
}

export function lightTransmissionPercent(tracery: LancetTracery): number {
  const transmission: Record<LancetTracery, number> = {
    plain: 85, cusped: 72, trefoiled: 65, cinquefoiled: 55, intersecting: 60,
  };
  return transmission[tracery];
}

export function stoneFrameWeightKg(widthCm: number, heightM: number, frameCm: number): number {
  const perimeterCm = 2 * (heightM * 100) + widthCm;
  const volumeCm3 = perimeterCm * frameCm * frameCm;
  return parseFloat((volumeCm3 * 2.5 / 1000).toFixed(1));
}

export function windLoadKpa(heightM: number, widthCm: number, windSpeedKph: number): number {
  const areaMsq = heightM * (widthCm / 100);
  const pressurePa = 0.613 * (windSpeedKph / 3.6) ** 2;
  return parseFloat((pressurePa * areaMsq / 1000).toFixed(2));
}

export function restorationCostPerWindow(tracery: LancetTracery, baseCost: number): number {
  const multipliers: Record<LancetTracery, number> = {
    plain: 1.0, cusped: 1.5, trefoiled: 2.0, cinquefoiled: 2.8, intersecting: 2.3,
  };
  return parseFloat((baseCost * multipliers[tracery]).toFixed(2));
}

export function lancetTraceryTypes(): LancetTracery[] {
  return ["plain", "cusped", "trefoiled", "cinquefoiled", "intersecting"];
}
