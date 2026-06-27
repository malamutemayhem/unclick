export type BaldachinMaterial = "marble" | "bronze" | "wood" | "stone" | "fabric";

export function canopyHeight(columnHeightM: number): number {
  return parseFloat((columnHeightM * 1.15).toFixed(2));
}

export function canopyAreaM2(widthM: number, depthM: number): number {
  return parseFloat((widthM * depthM).toFixed(2));
}

export function columnCount(): number {
  return 4;
}

export function columnDiameterCm(heightM: number, material: BaldachinMaterial): number {
  const ratios: Record<BaldachinMaterial, number> = {
    marble: 0.08, bronze: 0.06, wood: 0.1, stone: 0.09, fabric: 0.04,
  };
  return parseFloat((heightM * 100 * ratios[material]).toFixed(1));
}

export function totalWeightKg(canopyAreaM2: number, heightM: number, material: BaldachinMaterial): number {
  const densityFactor: Record<BaldachinMaterial, number> = {
    marble: 2700, bronze: 800, wood: 200, stone: 2500, fabric: 20,
  };
  return parseFloat((canopyAreaM2 * heightM * densityFactor[material] * 0.1).toFixed(0));
}

export function gildingAreaM2(canopyAreaM2: number, columnCount: number, columnHeightM: number, columnDiameterCm: number): number {
  const columnArea = columnCount * Math.PI * (columnDiameterCm / 100) * columnHeightM;
  return parseFloat((canopyAreaM2 * 2 + columnArea).toFixed(1));
}

export function lightFixtures(canopyAreaM2: number): number {
  return Math.ceil(canopyAreaM2 * 2);
}

export function fabricDrapeLength(heightM: number, drapeFactor: number): number {
  return parseFloat((heightM * drapeFactor).toFixed(2));
}

export function foundationLoadKn(totalWeightKg: number): number {
  return parseFloat((totalWeightKg * 9.81 / 1000 / 4).toFixed(2));
}

export function maintenanceCostPerYear(material: BaldachinMaterial, areaM2: number): number {
  const costPerM2: Record<BaldachinMaterial, number> = {
    marble: 30, bronze: 50, wood: 20, stone: 25, fabric: 40,
  };
  return parseFloat((areaM2 * costPerM2[material]).toFixed(2));
}

export function baldachinMaterials(): BaldachinMaterial[] {
  return ["marble", "bronze", "wood", "stone", "fabric"];
}
