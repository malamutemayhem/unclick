export type VaneStyle = "arrow" | "rooster" | "banner" | "ship" | "horse";

export function tailArea(headArea: number): number {
  return parseFloat((headArea * 1.5).toFixed(1));
}

export function balancePoint(totalLength: number): number {
  return parseFloat((totalLength * 0.33).toFixed(1));
}

export function pivotFriction(weight: number, bearingType: string): number {
  const coefficients: Record<string, number> = {
    ball: 0.002, sleeve: 0.01, plain: 0.05,
  };
  const c = coefficients[bearingType] || 0.05;
  return parseFloat((weight * c).toFixed(3));
}

export function responseSpeed(momentArm: number, windSpeed: number): number {
  if (momentArm <= 0) return 0;
  return parseFloat((windSpeed / momentArm * 10).toFixed(1));
}

export function mountHeight(buildingHeight: number): number {
  return parseFloat((buildingHeight + 1.5).toFixed(1));
}

export function cardinalDirection(degrees: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % 8;
  return dirs[index];
}

export function beaufortScale(windSpeedKmh: number): number {
  if (windSpeedKmh < 1) return 0;
  if (windSpeedKmh < 6) return 1;
  if (windSpeedKmh < 12) return 2;
  if (windSpeedKmh < 20) return 3;
  if (windSpeedKmh < 29) return 4;
  if (windSpeedKmh < 39) return 5;
  if (windSpeedKmh < 50) return 6;
  if (windSpeedKmh < 62) return 7;
  if (windSpeedKmh < 75) return 8;
  if (windSpeedKmh < 89) return 9;
  if (windSpeedKmh < 103) return 10;
  if (windSpeedKmh < 118) return 11;
  return 12;
}

export function materialWeight(style: VaneStyle): number {
  const kgs: Record<VaneStyle, number> = {
    arrow: 2, rooster: 4, banner: 1.5, ship: 5, horse: 6,
  };
  return kgs[style];
}

export function rustProtectionYears(coating: string): number {
  const years: Record<string, number> = {
    galvanized: 25, painted: 5, copper: 50, stainless: 40,
  };
  return years[coating] || 5;
}

export function vaneStyles(): VaneStyle[] {
  return ["arrow", "rooster", "banner", "ship", "horse"];
}
