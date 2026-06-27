export type ColumnOrder = "doric" | "ionic" | "corinthian" | "tuscan" | "composite";

export function projectionCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.25).toFixed(1));
}

export function heightFromOrder(order: ColumnOrder, baseDiameterCm: number): number {
  const ratios: Record<ColumnOrder, number> = { doric: 8, ionic: 9, corinthian: 10, tuscan: 7, composite: 10 };
  return parseFloat((baseDiameterCm * ratios[order]).toFixed(0));
}

export function flutingCount(order: ColumnOrder): number {
  const flutes: Record<ColumnOrder, number> = { doric: 20, ionic: 24, corinthian: 24, tuscan: 0, composite: 24 };
  return flutes[order];
}

export function entasisMm(heightCm: number): number {
  return parseFloat((heightCm * 0.03).toFixed(1));
}

export function capitalHeight(order: ColumnOrder, diameterCm: number): number {
  const ratio: Record<ColumnOrder, number> = { doric: 0.5, ionic: 0.7, corinthian: 1.2, tuscan: 0.4, composite: 1.1 };
  return parseFloat((diameterCm * ratio[order]).toFixed(1));
}

export function baseHeight(order: ColumnOrder, diameterCm: number): number {
  if (order === "doric") return 0;
  return parseFloat((diameterCm * 0.5).toFixed(1));
}

export function loadCapacityKn(widthCm: number, depthCm: number, heightCm: number): number {
  if (heightCm <= 0) return 0;
  return parseFloat((widthCm * depthCm * 0.5 / (heightCm / 100)).toFixed(1));
}

export function spacingCm(wallLengthCm: number, count: number): number {
  if (count <= 1) return 0;
  return parseFloat((wallLengthCm / (count - 1)).toFixed(1));
}

export function stoneBlocksNeeded(heightCm: number, blockHeightCm: number): number {
  if (blockHeightCm <= 0) return 0;
  return Math.ceil(heightCm / blockHeightCm);
}

export function carvingHours(order: ColumnOrder): number {
  const hours: Record<ColumnOrder, number> = { doric: 20, ionic: 40, corinthian: 80, tuscan: 10, composite: 70 };
  return hours[order];
}

export function columnOrders(): ColumnOrder[] {
  return ["doric", "ionic", "corinthian", "tuscan", "composite"];
}
