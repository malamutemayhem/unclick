export type TileShape = "square" | "rectangle" | "hexagon" | "triangle" | "diamond" | "octagon";
export type PatternType = "grid" | "brick" | "herringbone" | "basketweave" | "pinwheel" | "chevron";

export function tileArea(shape: TileShape, sizeMm: number): number {
  switch (shape) {
    case "square":
      return parseFloat((sizeMm * sizeMm).toFixed(1));
    case "rectangle":
      return parseFloat((sizeMm * sizeMm * 0.5).toFixed(1));
    case "hexagon":
      return parseFloat((3 * Math.sqrt(3) / 2 * (sizeMm / 2) * (sizeMm / 2)).toFixed(1));
    case "triangle":
      return parseFloat((Math.sqrt(3) / 4 * sizeMm * sizeMm).toFixed(1));
    case "diamond":
      return parseFloat((sizeMm * sizeMm * 0.5).toFixed(1));
    case "octagon":
      return parseFloat((2 * (1 + Math.sqrt(2)) * (sizeMm / 2) * (sizeMm / 2)).toFixed(1));
  }
}

export function tilesNeeded(areaMm2: number, tileAreaMm2: number, wastePercent: number = 10): number {
  if (tileAreaMm2 <= 0) return 0;
  const base = Math.ceil(areaMm2 / tileAreaMm2);
  return Math.ceil(base * (1 + wastePercent / 100));
}

export function floorArea(widthMm: number, lengthMm: number): number {
  return parseFloat((widthMm * lengthMm).toFixed(0));
}

export function groutArea(tileCount: number, tileSizeMm: number, groutWidthMm: number): number {
  const tilePerimeter = tileSizeMm * 4;
  const groutPerTile = tilePerimeter * groutWidthMm / 2;
  return parseFloat((tileCount * groutPerTile).toFixed(0));
}

export function groutWeight(groutAreaMm2: number, depthMm: number = 3, densityGPerMl: number = 1.8): number {
  const volumeMl = groutAreaMm2 * depthMm / 1000;
  return parseFloat((volumeMl * densityGPerMl / 1000).toFixed(2));
}

export function adhesiveAmount(areaMm2: number, combSizeMm: number = 6): number {
  const coverageM2PerKg = combSizeMm <= 6 ? 4 : 3;
  const areaM2 = areaMm2 / 1000000;
  return parseFloat((areaM2 / coverageM2PerKg).toFixed(1));
}

export function boxesNeeded(tilesNeeded: number, tilesPerBox: number): number {
  return Math.ceil(tilesNeeded / tilesPerBox);
}

export function wastePercent(pattern: PatternType): number {
  const waste: Record<PatternType, number> = {
    grid: 5,
    brick: 8,
    herringbone: 15,
    basketweave: 10,
    pinwheel: 12,
    chevron: 18,
  };
  return waste[pattern];
}

export function layoutTime(tileCount: number, pattern: PatternType): number {
  const minutesPerTile: Record<PatternType, number> = {
    grid: 2,
    brick: 2.5,
    herringbone: 4,
    basketweave: 3,
    pinwheel: 5,
    chevron: 4.5,
  };
  return parseFloat((tileCount * minutesPerTile[pattern] / 60).toFixed(1));
}

export function costEstimate(boxes: number, pricePerBox: number, groutKg: number, groutPricePerKg: number, adhesiveKg: number, adhesivePricePerKg: number): number {
  return parseFloat((boxes * pricePerBox + groutKg * groutPricePerKg + adhesiveKg * adhesivePricePerKg).toFixed(2));
}

export function spacerSize(groutWidthMm: number): number {
  return groutWidthMm;
}

export function cuttingCount(tileCount: number, pattern: PatternType): number {
  const cutPercent: Record<PatternType, number> = {
    grid: 10,
    brick: 20,
    herringbone: 30,
    basketweave: 15,
    pinwheel: 25,
    chevron: 35,
  };
  return Math.ceil(tileCount * cutPercent[pattern] / 100);
}

export function tileShapes(): TileShape[] {
  return ["square", "rectangle", "hexagon", "triangle", "diamond", "octagon"];
}

export function patternTypes(): PatternType[] {
  return ["grid", "brick", "herringbone", "basketweave", "pinwheel", "chevron"];
}
