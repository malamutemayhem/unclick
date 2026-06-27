export type AmbryDoor = "iron_grille" | "wooden_panel" | "tracery" | "pierced" | "plain";

export function recessWidthCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.5).toFixed(1));
}

export function recessHeightCm(widthCm: number): number {
  return parseFloat((widthCm * 1.4).toFixed(1));
}

export function recessDepthCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.65).toFixed(1));
}

export function shelfCount(recessHeightCm: number): number {
  return Math.max(1, Math.floor(recessHeightCm / 25));
}

export function doorAreaCm2(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm).toFixed(1));
}

export function hingeCount(heightCm: number): number {
  return heightCm > 50 ? 3 : 2;
}

export function ironworkWeightKg(doorAreaCm2: number, door: AmbryDoor): number {
  const factors: Record<AmbryDoor, number> = {
    iron_grille: 0.05, wooden_panel: 0.01, tracery: 0.02, pierced: 0.03, plain: 0.008,
  };
  return parseFloat((doorAreaCm2 * factors[door] / 10).toFixed(2));
}

export function interiorVolumeCm3(widthCm: number, heightCm: number, depthCm: number): number {
  return parseFloat((widthCm * heightCm * depthCm).toFixed(1));
}

export function carvingHours(door: AmbryDoor): number {
  const hours: Record<AmbryDoor, number> = {
    iron_grille: 12, wooden_panel: 8, tracery: 20, pierced: 15, plain: 4,
  };
  return hours[door];
}

export function restorationCost(door: AmbryDoor, costPerHour: number): number {
  return parseFloat((carvingHours(door) * 1.5 * costPerHour).toFixed(2));
}

export function ambryDoors(): AmbryDoor[] {
  return ["iron_grille", "wooden_panel", "tracery", "pierced", "plain"];
}
