export type ReredosMaterial = "stone" | "wood" | "alabaster" | "marble" | "painted";

export function heightM(chancelHeightM: number): number {
  return parseFloat((chancelHeightM * 0.6).toFixed(2));
}

export function widthM(altarWidthM: number): number {
  return parseFloat((altarWidthM * 1.5).toFixed(2));
}

export function panelCount(widthM: number, panelWidthCm: number): number {
  if (panelWidthCm <= 0) return 0;
  return Math.floor(widthM * 100 / panelWidthCm);
}

export function nicheCount(panelCount: number): number {
  return Math.ceil(panelCount / 3);
}

export function figureCount(nicheCount: number): number {
  return nicheCount;
}

export function gildingAreaM2(totalAreaM2: number, gildingPercent: number): number {
  return parseFloat((totalAreaM2 * gildingPercent / 100).toFixed(2));
}

export function weightKg(widthM: number, heightM: number, thicknessCm: number, material: ReredosMaterial): number {
  const densityKgPerM3: Record<ReredosMaterial, number> = {
    stone: 2500, wood: 500, alabaster: 2300, marble: 2700, painted: 600,
  };
  return parseFloat((widthM * heightM * thicknessCm / 100 * densityKgPerM3[material]).toFixed(0));
}

export function carvingHoursPerPanel(material: ReredosMaterial): number {
  const hours: Record<ReredosMaterial, number> = {
    stone: 40, wood: 20, alabaster: 35, marble: 50, painted: 10,
  };
  return hours[material];
}

export function totalCarvingHours(panelCount: number, material: ReredosMaterial): number {
  return panelCount * carvingHoursPerPanel(material);
}

export function restorationBudget(areaM2: number, material: ReredosMaterial): number {
  const costPerM2: Record<ReredosMaterial, number> = {
    stone: 3000, wood: 1500, alabaster: 4000, marble: 5000, painted: 2000,
  };
  return parseFloat((areaM2 * costPerM2[material]).toFixed(0));
}

export function reredosMaterials(): ReredosMaterial[] {
  return ["stone", "wood", "alabaster", "marble", "painted"];
}
