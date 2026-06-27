export type GarretRoof = "gable" | "hip" | "mansard" | "gambrel" | "shed";

export function usableArea(floorAreaM2: number, roofType: GarretRoof): number {
  const factors: Record<GarretRoof, number> = {
    gable: 0.6, hip: 0.5, mansard: 0.85, gambrel: 0.75, shed: 0.7,
  };
  return parseFloat((floorAreaM2 * factors[roofType]).toFixed(1));
}

export function headroomPercent(peakHeightM: number, minHeadroomM: number, spanM: number): number {
  if (spanM <= 0 || peakHeightM <= 0) return 0;
  const usableSpan = spanM * (1 - minHeadroomM / peakHeightM);
  return parseFloat((usableSpan / spanM * 100).toFixed(1));
}

export function dormerCount(wallLengthM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.floor(wallLengthM / spacingM);
}

export function dormerArea(widthM: number, heightM: number): number {
  return parseFloat((widthM * heightM).toFixed(2));
}

export function insulationThicknessCm(roofType: GarretRoof): number {
  const cm: Record<GarretRoof, number> = {
    gable: 20, hip: 22, mansard: 15, gambrel: 18, shed: 25,
  };
  return cm[roofType];
}

export function ventilationOpenings(floorAreaM2: number): number {
  return Math.ceil(floorAreaM2 / 15);
}

export function stairwellArea(headroomM: number): number {
  return parseFloat((headroomM * 0.9 + 1.2).toFixed(1));
}

export function floorLoadKgPerM2(residential: boolean): number {
  return residential ? 150 : 250;
}

export function lightLevel(windowAreaM2: number, floorAreaM2: number): number {
  if (floorAreaM2 <= 0) return 0;
  return parseFloat((windowAreaM2 / floorAreaM2 * 100).toFixed(1));
}

export function conversionCost(floorAreaM2: number, roofType: GarretRoof): number {
  const costPerM2: Record<GarretRoof, number> = {
    gable: 800, hip: 900, mansard: 600, gambrel: 700, shed: 750,
  };
  return parseFloat((floorAreaM2 * costPerM2[roofType]).toFixed(0));
}

export function garretRoofs(): GarretRoof[] {
  return ["gable", "hip", "mansard", "gambrel", "shed"];
}
