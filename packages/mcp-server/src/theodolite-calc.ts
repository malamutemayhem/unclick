export type TheodoliteType = "transit" | "repeating" | "direction" | "total_station" | "gyro";

export function horizontalAccuracyArcSec(type: TheodoliteType): number {
  const acc: Record<TheodoliteType, number> = {
    transit: 30, repeating: 10, direction: 5, total_station: 1, gyro: 15,
  };
  return acc[type];
}

export function verticalAccuracyArcSec(type: TheodoliteType): number {
  const acc: Record<TheodoliteType, number> = {
    transit: 30, repeating: 15, direction: 5, total_station: 1, gyro: 20,
  };
  return acc[type];
}

export function magnification(type: TheodoliteType): number {
  const mag: Record<TheodoliteType, number> = {
    transit: 20, repeating: 25, direction: 30, total_station: 30, gyro: 20,
  };
  return mag[type];
}

export function stationSetupMinutes(type: TheodoliteType): number {
  const mins: Record<TheodoliteType, number> = {
    transit: 10, repeating: 15, direction: 20, total_station: 5, gyro: 30,
  };
  return mins[type];
}

export function readingsPerStation(type: TheodoliteType): number {
  const readings: Record<TheodoliteType, number> = {
    transit: 2, repeating: 6, direction: 4, total_station: 1, gyro: 3,
  };
  return readings[type];
}

export function distanceByStadiaCm(upperReading: number, lowerReading: number, multiplier: number): number {
  return parseFloat(((upperReading - lowerReading) * multiplier).toFixed(1));
}

export function angleFromBearingDeg(bearing: number): number {
  return ((bearing % 360) + 360) % 360;
}

export function closureErrorMm(perimeterM: number, accuracyArcSec: number): number {
  const errorRad = accuracyArcSec * Math.PI / (180 * 3600);
  return parseFloat((perimeterM * 1000 * errorRad).toFixed(2));
}

export function weightKg(type: TheodoliteType): number {
  const weights: Record<TheodoliteType, number> = {
    transit: 5, repeating: 6, direction: 7, total_station: 4, gyro: 12,
  };
  return weights[type];
}

export function costEstimate(type: TheodoliteType, baseCost: number): number {
  const mult: Record<TheodoliteType, number> = {
    transit: 1.0, repeating: 2.0, direction: 3.0, total_station: 10.0, gyro: 15.0,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function theodoliteTypes(): TheodoliteType[] {
  return ["transit", "repeating", "direction", "total_station", "gyro"];
}
