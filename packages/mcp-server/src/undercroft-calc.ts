export type UndercroftUse = "storage" | "burial" | "treasury" | "workshop" | "wine_cellar";

export function floorAreaM2(lengthM: number, widthM: number): number {
  return parseFloat((lengthM * widthM).toFixed(1));
}

export function ceilingHeightM(spanM: number): number {
  return parseFloat((spanM * 0.4 + 2).toFixed(2));
}

export function columnCount(floorAreaM2: number, maxSpanM: number): number {
  if (maxSpanM <= 0) return 0;
  const bays = Math.ceil(Math.sqrt(floorAreaM2) / maxSpanM);
  return Math.max(0, (bays - 1) ** 2);
}

export function vaultBayCount(lengthM: number, widthM: number, baySpanM: number): number {
  if (baySpanM <= 0) return 0;
  return Math.ceil(lengthM / baySpanM) * Math.ceil(widthM / baySpanM);
}

export function wallThicknessCm(ceilingHeightM: number): number {
  return parseFloat((ceilingHeightM * 30).toFixed(1));
}

export function ventilationOpenings(floorAreaM2: number): number {
  return Math.max(2, Math.ceil(floorAreaM2 / 10));
}

export function moistureRiskPercent(use: UndercroftUse): number {
  const risk: Record<UndercroftUse, number> = {
    storage: 40, burial: 60, treasury: 20, workshop: 35, wine_cellar: 55,
  };
  return risk[use];
}

export function lightingPoints(floorAreaM2: number): number {
  return Math.max(1, Math.ceil(floorAreaM2 / 8));
}

export function loadCapacityKgPerM2(use: UndercroftUse): number {
  const loads: Record<UndercroftUse, number> = {
    storage: 500, burial: 200, treasury: 800, workshop: 400, wine_cellar: 600,
  };
  return loads[use];
}

export function constructionCost(floorAreaM2: number, use: UndercroftUse, costPerM2: number): number {
  const multipliers: Record<UndercroftUse, number> = {
    storage: 1.0, burial: 1.3, treasury: 2.0, workshop: 1.2, wine_cellar: 1.5,
  };
  return parseFloat((floorAreaM2 * costPerM2 * multipliers[use]).toFixed(2));
}

export function undercroftUses(): UndercroftUse[] {
  return ["storage", "burial", "treasury", "workshop", "wine_cellar"];
}
