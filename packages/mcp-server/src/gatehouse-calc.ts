export type GatehouseDefense = "portcullis" | "murder_holes" | "drawbridge" | "barbican" | "flanking_towers";

export function passageWidthM(vehicleAccess: boolean): number {
  return vehicleAccess ? 3.5 : 2.0;
}

export function passageHeightM(widthM: number): number {
  return parseFloat((widthM * 1.5).toFixed(2));
}

export function passageLengthM(wallThicknessM: number): number {
  return wallThicknessM;
}

export function guardRoomCount(floors: number): number {
  return floors * 2;
}

export function guardRoomAreaM2(passageWidthM: number): number {
  return parseFloat((passageWidthM * passageWidthM * 1.5).toFixed(1));
}

export function doorCount(): number {
  return 2;
}

export function arrowLoopCount(floors: number, facesExposed: number): number {
  return floors * facesExposed * 2;
}

export function wallThicknessCm(heightM: number): number {
  return parseFloat((heightM * 15).toFixed(1));
}

export function defenseRating(defense: GatehouseDefense): number {
  const ratings: Record<GatehouseDefense, number> = {
    portcullis: 7, murder_holes: 6, drawbridge: 8, barbican: 9, flanking_towers: 8,
  };
  return ratings[defense];
}

export function constructionCost(heightM: number, defense: GatehouseDefense, baseCost: number): number {
  const multipliers: Record<GatehouseDefense, number> = {
    portcullis: 1.3, murder_holes: 1.1, drawbridge: 1.8, barbican: 2.5, flanking_towers: 2.0,
  };
  return parseFloat((heightM * baseCost * multipliers[defense]).toFixed(2));
}

export function gatehouseDefenses(): GatehouseDefense[] {
  return ["portcullis", "murder_holes", "drawbridge", "barbican", "flanking_towers"];
}
