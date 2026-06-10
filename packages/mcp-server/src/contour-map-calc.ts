export type MapScale = "1:1000" | "1:5000" | "1:10000" | "1:25000" | "1:50000";

export function contourIntervalM(scale: MapScale): number {
  const intervals: Record<MapScale, number> = {
    "1:1000": 1, "1:5000": 5, "1:10000": 10, "1:25000": 10, "1:50000": 20,
  };
  return intervals[scale];
}

export function scaleDenominator(scale: MapScale): number {
  const denoms: Record<MapScale, number> = {
    "1:1000": 1000, "1:5000": 5000, "1:10000": 10000, "1:25000": 25000, "1:50000": 50000,
  };
  return denoms[scale];
}

export function groundDistanceM(mapDistanceMm: number, scaleDenominator: number): number {
  return parseFloat((mapDistanceMm * scaleDenominator / 1000).toFixed(1));
}

export function mapDistanceMm(groundDistanceM: number, scaleDenominator: number): number {
  if (scaleDenominator <= 0) return 0;
  return parseFloat((groundDistanceM * 1000 / scaleDenominator).toFixed(2));
}

export function slopePercent(elevationChangeM: number, horizontalDistanceM: number): number {
  if (horizontalDistanceM <= 0) return 0;
  return parseFloat((elevationChangeM / horizontalDistanceM * 100).toFixed(1));
}

export function indexContourInterval(contourIntervalM: number): number {
  return contourIntervalM * 5;
}

export function sheetCoverageKm2(scale: MapScale): number {
  const coverage: Record<MapScale, number> = {
    "1:1000": 0.25, "1:5000": 6, "1:10000": 25, "1:25000": 150, "1:50000": 600,
  };
  return coverage[scale];
}

export function spotHeightDensityPerKm2(scale: MapScale): number {
  const density: Record<MapScale, number> = {
    "1:1000": 50, "1:5000": 20, "1:10000": 10, "1:25000": 5, "1:50000": 2,
  };
  return density[scale];
}

export function gridSquareSizeMm(scale: MapScale): number {
  const sizes: Record<MapScale, number> = {
    "1:1000": 100, "1:5000": 200, "1:10000": 100, "1:25000": 40, "1:50000": 20,
  };
  return sizes[scale];
}

export function mapScales(): MapScale[] {
  return ["1:1000", "1:5000", "1:10000", "1:25000", "1:50000"];
}
