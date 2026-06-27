export type SacristyLayout = "rectangular" | "apsidal" | "polygonal" | "tower" | "annex";

export function floorAreaM2(lengthM: number, widthM: number): number {
  return parseFloat((lengthM * widthM).toFixed(1));
}

export function ceilingHeightM(floorAreaM2: number): number {
  return parseFloat((Math.sqrt(floorAreaM2) * 0.8 + 2).toFixed(2));
}

export function vestmentCabinetCount(clergyCount: number): number {
  return Math.max(1, Math.ceil(clergyCount / 2));
}

export function safeDimensionsCm(vesselCount: number): { width: number; height: number; depth: number } {
  const width = Math.max(30, vesselCount * 8);
  const height = Math.max(40, vesselCount * 10);
  const depth = Math.max(25, vesselCount * 6);
  return { width, height, depth };
}

export function windowArea(floorAreaM2: number): number {
  return parseFloat((floorAreaM2 * 0.1).toFixed(2));
}

export function doorCount(layout: SacristyLayout): number {
  const doors: Record<SacristyLayout, number> = {
    rectangular: 2, apsidal: 1, polygonal: 2, tower: 1, annex: 2,
  };
  return doors[layout];
}

export function lavaboDrainRequired(): boolean {
  return true;
}

export function storageShelvingM(floorAreaM2: number): number {
  return parseFloat((floorAreaM2 * 0.6).toFixed(1));
}

export function lightingFixtures(floorAreaM2: number): number {
  return Math.max(1, Math.ceil(floorAreaM2 / 4));
}

export function constructionCost(floorAreaM2: number, layout: SacristyLayout, costPerM2: number): number {
  const multipliers: Record<SacristyLayout, number> = {
    rectangular: 1.0, apsidal: 1.4, polygonal: 1.3, tower: 1.6, annex: 1.1,
  };
  return parseFloat((floorAreaM2 * costPerM2 * multipliers[layout]).toFixed(2));
}

export function sacristyLayouts(): SacristyLayout[] {
  return ["rectangular", "apsidal", "polygonal", "tower", "annex"];
}
