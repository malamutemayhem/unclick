export type CellariumGoods = "grain" | "wine" | "provisions" | "wool" | "tools";

export function floorAreaM2(lengthM: number, widthM: number): number {
  return parseFloat((lengthM * widthM).toFixed(1));
}

export function bayCount(lengthM: number, baySpanM: number): number {
  if (baySpanM <= 0) return 0;
  return Math.ceil(lengthM / baySpanM);
}

export function columnCount(bayCount: number, aisles: number): number {
  return Math.max(0, (bayCount - 1) * Math.max(0, aisles - 1));
}

export function storageCapacityM3(floorAreaM2: number, ceilingHeightM: number): number {
  return parseFloat((floorAreaM2 * ceilingHeightM * 0.6).toFixed(1));
}

export function ventilationOpenings(floorAreaM2: number): number {
  return Math.max(2, Math.ceil(floorAreaM2 / 8));
}

export function temperatureStabilityCelsius(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.15).toFixed(1));
}

export function loadingDoorWidthCm(goods: CellariumGoods): number {
  const widths: Record<CellariumGoods, number> = {
    grain: 150, wine: 120, provisions: 140, wool: 180, tools: 100,
  };
  return widths[goods];
}

export function shelvingLengthM(floorAreaM2: number): number {
  return parseFloat((floorAreaM2 * 0.4).toFixed(1));
}

export function drainageRequired(goods: CellariumGoods): boolean {
  return goods === "wine" || goods === "provisions";
}

export function constructionCost(floorAreaM2: number, goods: CellariumGoods, costPerM2: number): number {
  const multipliers: Record<CellariumGoods, number> = {
    grain: 1.0, wine: 1.4, provisions: 1.2, wool: 0.9, tools: 1.1,
  };
  return parseFloat((floorAreaM2 * costPerM2 * multipliers[goods]).toFixed(2));
}

export function cellariumGoods(): CellariumGoods[] {
  return ["grain", "wine", "provisions", "wool", "tools"];
}
