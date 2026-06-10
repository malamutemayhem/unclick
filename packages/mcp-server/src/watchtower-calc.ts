export type TowerShape = "round" | "square" | "hexagonal" | "octagonal";

export function visibilityKm(heightM: number): number {
  return parseFloat((3.57 * Math.sqrt(heightM)).toFixed(1));
}

export function floorArea(shape: TowerShape, dimensionM: number): number {
  if (shape === "round") {
    return parseFloat((Math.PI * (dimensionM / 2) * (dimensionM / 2)).toFixed(1));
  }
  if (shape === "hexagonal") {
    return parseFloat((2.598 * (dimensionM / 2) * (dimensionM / 2)).toFixed(1));
  }
  if (shape === "octagonal") {
    return parseFloat((2 * (1 + Math.SQRT2) * (dimensionM / 2) * (dimensionM / 2)).toFixed(1));
  }
  return parseFloat((dimensionM * dimensionM).toFixed(1));
}

export function wallThicknessCm(heightM: number, material: string): number {
  const factors: Record<string, number> = {
    stone: 10, brick: 7, timber: 5, concrete: 6,
  };
  const f = factors[material] || 8;
  return parseFloat((heightM * f).toFixed(0));
}

export function stairCount(heightM: number, riserCm: number): number {
  if (riserCm <= 0) return 0;
  return Math.ceil((heightM * 100) / riserCm);
}

export function beaconRange(fuelKg: number, heightM: number): number {
  const baseFire = Math.sqrt(fuelKg) * 2;
  return parseFloat((baseFire + visibilityKm(heightM)).toFixed(1));
}

export function garrisonSize(floorCount: number, areaPerFloorM2: number): number {
  return Math.floor(floorCount * areaPerFloorM2 / 4);
}

export function waterStorageLiters(garrisonSize: number, daysSiege: number): number {
  return parseFloat((garrisonSize * 3 * daysSiege).toFixed(0));
}

export function arrowSlits(perimeterM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.floor(perimeterM / spacingM);
}

export function windLoad(heightM: number, widthM: number, windSpeedKmh: number): number {
  const speedMs = windSpeedKmh / 3.6;
  return parseFloat((0.5 * 1.225 * speedMs * speedMs * heightM * widthM).toFixed(0));
}

export function towerShapes(): TowerShape[] {
  return ["round", "square", "hexagonal", "octagonal"];
}
