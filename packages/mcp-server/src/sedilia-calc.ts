export type SediliaStyle = "trefoil" | "ogee" | "cinquefoil" | "cusped" | "plain";

export function seatCount(): number {
  return 3;
}

export function seatWidthCm(recessWidthCm: number): number {
  return parseFloat((recessWidthCm / 3).toFixed(1));
}

export function seatHeightCm(stepNumber: number, baseCm: number): number {
  return parseFloat((baseCm + stepNumber * 5).toFixed(1));
}

export function canopyHeightCm(seatHeightCm: number): number {
  return parseFloat((seatHeightCm * 2.5).toFixed(1));
}

export function recessDepthCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.6).toFixed(1));
}

export function archHeightCm(canopyHeightCm: number, style: SediliaStyle): number {
  const ratios: Record<SediliaStyle, number> = {
    trefoil: 0.4, ogee: 0.45, cinquefoil: 0.38, cusped: 0.42, plain: 0.35,
  };
  return parseFloat((canopyHeightCm * ratios[style]).toFixed(1));
}

export function shaftDiameterCm(canopyHeightCm: number): number {
  return parseFloat((canopyHeightCm * 0.06).toFixed(1));
}

export function carvingHours(style: SediliaStyle): number {
  const hours: Record<SediliaStyle, number> = {
    trefoil: 40, ogee: 50, cinquefoil: 55, cusped: 45, plain: 20,
  };
  return hours[style];
}

export function paintLayers(polychrome: boolean): number {
  return polychrome ? 5 : 2;
}

export function restorationCost(style: SediliaStyle, baseRate: number): number {
  const multipliers: Record<SediliaStyle, number> = {
    trefoil: 2.0, ogee: 2.5, cinquefoil: 3.0, cusped: 2.2, plain: 1.0,
  };
  return parseFloat((baseRate * multipliers[style]).toFixed(2));
}

export function sediliaStyles(): SediliaStyle[] {
  return ["trefoil", "ogee", "cinquefoil", "cusped", "plain"];
}
