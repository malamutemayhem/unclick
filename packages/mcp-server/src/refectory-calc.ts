export type RefectoryLayout = "single_aisle" | "double_aisle" | "cruciform" | "apsed" | "vaulted";

export function floorAreaM2(lengthM: number, widthM: number): number {
  return parseFloat((lengthM * widthM).toFixed(1));
}

export function seatingCapacity(floorAreaM2: number): number {
  return Math.floor(floorAreaM2 / 1.5);
}

export function tableCount(seatingCapacity: number, seatsPerTable: number): number {
  if (seatsPerTable <= 0) return 0;
  return Math.ceil(seatingCapacity / seatsPerTable);
}

export function pulpitHeightM(ceilingHeightM: number): number {
  return parseFloat((ceilingHeightM * 0.5).toFixed(2));
}

export function servingHatchCount(tableCount: number): number {
  return Math.max(1, Math.ceil(tableCount / 4));
}

export function windowAreaM2(floorAreaM2: number): number {
  return parseFloat((floorAreaM2 * 0.12).toFixed(2));
}

export function hearthCount(floorAreaM2: number): number {
  return Math.max(1, Math.ceil(floorAreaM2 / 40));
}

export function lavaboPairCount(seatingCapacity: number): number {
  return Math.max(1, Math.ceil(seatingCapacity / 30));
}

export function wallPaintingAreaM2(lengthM: number, ceilingHeightM: number): number {
  return parseFloat((lengthM * 2 * ceilingHeightM * 0.3).toFixed(1));
}

export function constructionCost(floorAreaM2: number, layout: RefectoryLayout, costPerM2: number): number {
  const multipliers: Record<RefectoryLayout, number> = {
    single_aisle: 1.0, double_aisle: 1.4, cruciform: 1.6, apsed: 1.5, vaulted: 1.8,
  };
  return parseFloat((floorAreaM2 * costPerM2 * multipliers[layout]).toFixed(2));
}

export function refectoryLayouts(): RefectoryLayout[] {
  return ["single_aisle", "double_aisle", "cruciform", "apsed", "vaulted"];
}
